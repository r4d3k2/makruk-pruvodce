/**
 * validate-moves.ts — projde každý tah v src/data/strategies.ts a src/data/games.ts
 * enginem Fairy-Stockfish (varianta makruk) a vygeneruje reports/engine-validation.md
 * (+ strojově čitelný reports/engine-validation.json).
 *
 * Spuštění:  npm run validate   (= npx tsx scripts/validate-moves.ts)
 *            npm run validate -- --only strategy:rua-on-7th/h-file-rook   (jen vybrané položky)
 *
 * Env:
 *   VALIDATE_MOVETIME=<ms>     čas na jednu pozici (výchozí 1000)
 *   VALIDATE_ONLY=<a,b,...>    totéž co --only: zpracovat jen položky, jejichž id obsahuje některý
 *                              z řetězců (volitelný prefix `strategy:` / `game:` omezí zdroj)
 *
 * Nic v src/ nemění. Engine (tools/fairy-stockfish/) není součástí repozitáře.
 */
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { STRATEGIES } from "../src/data/strategies";
import { GAMES, boardFromSetup } from "../src/data/games";
import {
  initialBoard,
  type Board,
  type MoveDef,
  type Piece,
  type PieceType,
  type Side,
} from "../src/lib/makruk";

// ---------------------------------------------------------------------------
// Konfigurace
// ---------------------------------------------------------------------------

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENGINE_EXE = path.join(ROOT, "tools", "fairy-stockfish", "fairy-stockfish_x86-64-bmi2.exe");
const ALLOWLIST_PATH = path.join(ROOT, "scripts", "validate-allowlist.json");
const REPORT_DIR = path.join(ROOT, "reports");
const REPORT_MD = path.join(REPORT_DIR, "engine-validation.md");
const REPORT_JSON = path.join(REPORT_DIR, "engine-validation.json");

const MOVETIME = Number(process.env.VALIDATE_MOVETIME ?? 1000);
const GO_CMD = `go movetime ${MOVETIME}`;
const THREADS = os.cpus().length;
const HASH_MB = 256;

/**
 * Prahy klasifikace (cp z pohledu strany, která táhla).
 *
 * Kalibrace enginu z výchozí pozice (depth 16): Rua ≈ 730, Ma ≈ 490, Khon ≈ 370,
 * Met ≈ 250, Bia ≈ 160–190 cp. Škála je tedy „nafouklá" oproti šachovému
 * 1 pěšec = 100 cp. Výchozí odhad byl chyba ≥ 300 / nepřesnost ≥ 150; práh chyby
 * je snížen na 250, aby ztráta Met (nejslabší figury) už počítala jako chyba.
 * Nepřesnost ≥ 150 zůstává — odpovídá zhruba ztrátě jednoho Bia.
 */
const THRESH_ERROR = 250;
const THRESH_INACCURACY = 150;

/** Zmeškané braní: minimální zisk materiálu na konci PV (cp-ekvivalent), pokud ztráta tahu nedosahuje chyby. */
const MISSED_CAPTURE_MATERIAL = 100;

/**
 * Rozhodnutá pozice: |eval| ≥ DECISIVE z pohledu táhnoucího před i po tahu, stejným směrem.
 * K+R vs K hodnotí engine ≈ +5500 a mat v N = 10000 − 10·N; tah, po kterém engine v 1 s mat
 * „ztratí z dohledu" (M11 → +5900), by jinak vyšel jako chyba 4000 cp, ačkoli výhra trvá.
 * Takové tahy dostanou klasifikaci „rozhodnuto": nepočítají se jako chyby, v detailu se uvedou
 * jen při ztrátě ≥ práh chyby (u vítězné strany = pomalejší cesta, u poražené = volba mezi prohrami).
 */
const DECISIVE = 2500;

/** score mate N → ±(MATE_BASE − |N|·10) */
const MATE_BASE = 10000;

const EXPECTED_START_FEN = "rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w";
const EXPECTED_PERFT4 = 273026;

/** Kalibrační pozice (bílý na tahu): výchozí + „bílý má navíc X" (odebrána černá figura). */
const CALIBRATION: { label: string; fen: string }[] = [
  { label: "výchozí pozice", fen: "rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1" },
  { label: "bílý má navíc Rua (chybí r a8)", fen: "1nsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1" },
  { label: "černý má navíc Rua (chybí R a1)", fen: "rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/1NSKMSNR w - - 0 1" },
  { label: "bílý má navíc Ma (chybí n b8)", fen: "r1smksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1" },
  { label: "bílý má navíc Khon (chybí s c8)", fen: "rn1mksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1" },
  { label: "bílý má navíc Met (chybí m d8)", fen: "rns1ksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1" },
  { label: "bílý má navíc Bia (chybí p d6)", fen: "rnsmksnr/8/ppp1pppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1" },
];

/** Kontrolní případy z ruční revize — v reportu se u nich vypíše, co engine říká. */
const CONTROL_CASES: {
  n: number;
  source: Source;
  id: string;
  ply: number;
  hypothesis: string;
  /** tah soupeře, u kterého se čeká zmeškané braní */
  missedCapturePly?: number;
}[] = [
  { n: 1, source: "strategy", id: "khon-wall/khon-wall-central-hit", ply: 12, hypothesis: "poslední tah černého Ma na g4 — kůň visí za Bia f3" },
  { n: 2, source: "strategy", id: "rua-on-7th/h-file-rook", ply: 5, hypothesis: "Rua h1→h7 visí za černou Rua h8; navazující tah černého je zmeškané braní", missedCapturePly: 6 },
  { n: 3, source: "strategy", id: "rua-on-7th/a-file-active-knights", ply: 5, hypothesis: "Rua a1→a7 visí za černou Rua a8; navazující tah černého je zmeškané braní", missedCapturePly: 6 },
  { n: 4, source: "game", id: "met-trap", ply: 17, hypothesis: "závěrečné braní Met (Ma b3×c5) je kryté černým koněm z d7" },
  { n: 5, source: "game", id: "symmetric-opening", ply: 19, hypothesis: "koncového pěšce na e5 jde vzít f6×e5" },
];

// ---------------------------------------------------------------------------
// Typy
// ---------------------------------------------------------------------------

type Source = "strategy" | "game";
type Classification = "ok" | "nepřesnost" | "chyba" | "rozhodnuto";

interface AllowlistEntry {
  source: Source;
  id: string;
  ply: number;
  reason: string;
}

interface Analysis {
  scoreType: "cp" | "mate";
  scoreValue: number;
  /** normalizované cp z pohledu strany na tahu (mat převeden na ±(10000 − |N|·10)) */
  score: number;
  bestmove: string;
  pv: string[];
  depth: number;
  /** bestmove (none) — strana na tahu nemá legální tah */
  noMoves: boolean;
  /** engine hlásí mat strany na tahu (score mate 0 + bestmove (none)) */
  mated: boolean;
}

interface MissedCapture {
  bestmove: string;
  bestmoveDesc: string;
  capturedPiece: string;
  evalIfCaptured: number;
  evalAfterPlayed: number;
  loss: number;
  /** změna materiálu (cp-ekvivalent) na konci PV enginu, z pohledu strany na tahu */
  pvMaterialSwing: number;
  pv: string;
}

interface MoveRecord {
  ply: number;
  side: Side;
  uci: string;
  desc: string;
  dataFrom: [number, number];
  dataTo: [number, number];
  legal: boolean;
  illegalReason?: string;
  dataPromotes: boolean;
  enginePromotes: boolean;
  promoMismatch: boolean;
  evalBefore: number | null;
  evalAfter: number | null;
  loss: number | null;
  classification: Classification | null;
  bestBefore: string | null;
  bestBeforeDesc: string | null;
  bestBeforePv: string | null;
  bestReply: string | null;
  bestReplyDesc: string | null;
  bestReplyEval: number | null;
  missedCapture: MissedCapture | null;
  allowlisted: AllowlistEntry | null;
  comment: string;
}

interface ItemResult {
  source: Source;
  id: string;
  title: string;
  startFen: string;
  moves: MoveRecord[];
  finalSide: Side;
  finalEval: number | null;
  finalEvalRaw: string;
  finalBest: string | null;
  finalBestDesc: string | null;
  finalMated: boolean;
  finalNoMoves: boolean;
  claimsMate: boolean;
  result?: string;
  lastComment: string;
  illegalCount: number;
  errorCount: number;
  inaccuracyCount: number;
  allowlistedCount: number;
}

interface WorkItem {
  source: Source;
  id: string;
  title: string;
  moves: MoveDef[];
  startBoard: Board;
  startSide: Side;
  /** null → startpos */
  startFen: string | null;
  result?: string;
}

// ---------------------------------------------------------------------------
// Souřadnice, FEN, deska
// ---------------------------------------------------------------------------

const FILES = "abcdefgh";

/** [row, col] z dat → pole v šachové notaci; [7,3] = d1, [0,4] = e8, [5,3] = d3 */
function square(row: number, col: number): string {
  return FILES[col] + (8 - row);
}

function parseSquare(sq: string): [number, number] {
  return [8 - Number(sq[1]), FILES.indexOf(sq[0])];
}

const FEN_LETTER: Record<PieceType, string> = {
  K: "K",
  M: "M",
  B: "S", // Khon = v enginu "s"
  N: "N",
  R: "R",
  P: "P",
  "P+": "M", // povýšený pěšec je v enginu Met
};

const CZ_NAME: Record<PieceType, string> = {
  K: "Khun",
  M: "Met",
  B: "Khon",
  N: "Ma",
  R: "Rua",
  P: "Bia",
  "P+": "P+",
};

/** Hodnoty figur v cp podle kalibrace enginu (pro odhad materiálu na konci PV). */
const MATERIAL: Record<PieceType, number> = {
  K: 0,
  R: 730,
  N: 490,
  B: 370,
  M: 250,
  "P+": 250,
  P: 175,
};

function boardToFen(board: Board, sideToMove: Side): string {
  const rows: string[] = [];
  for (let r = 0; r < 8; r++) {
    let row = "";
    let empty = 0;
    for (let c = 0; c < 8; c++) {
      const cell = board[r][c];
      if (!cell) {
        empty++;
        continue;
      }
      if (empty) {
        row += empty;
        empty = 0;
      }
      const letter = FEN_LETTER[cell.type];
      row += cell.side === "white" ? letter : letter.toLowerCase();
    }
    if (empty) row += empty;
    rows.push(row);
  }
  return `${rows.join("/")} ${sideToMove === "white" ? "w" : "b"} - - 0 1`;
}

function cloneBoard(board: Board): Board {
  return board.map(row => row.map(cell => (cell ? { ...cell } : null)));
}

function pieceAt(board: Board, sq: string): Piece | null {
  const [r, c] = parseSquare(sq);
  return board[r]?.[c] ?? null;
}

/** Aplikuje UCI tah (from+to[+m]) na desku; braní = přepsání cílového pole. */
function applyUci(board: Board, uci: string): Board {
  const next = cloneBoard(board);
  const [fr, fc] = parseSquare(uci.slice(0, 2));
  const [tr, tc] = parseSquare(uci.slice(2, 4));
  const piece = next[fr][fc];
  if (!piece) return next;
  next[fr][fc] = null;
  next[tr][tc] =
    uci.length > 4 && piece.type === "P" ? { type: "P+", side: piece.side } : piece;
  return next;
}

function other(side: Side): Side {
  return side === "white" ? "black" : "white";
}

function sideCz(side: Side): string {
  return side === "white" ? "bílý" : "černý";
}

/** genitiv: „z pohledu bílého / černého" */
function sideGen(side: Side): string {
  return side === "white" ? "bílého" : "černého";
}

/** Popis tahu: „Rua h1→h7" / „Bia f3×g4 (Ma)" / „Bia d5→d6=P+" */
function describeUci(board: Board, uci: string): string {
  if (!uci || uci === "(none)") return "—";
  const from = uci.slice(0, 2);
  const to = uci.slice(2, 4);
  const mover = pieceAt(board, from);
  const target = pieceAt(board, to);
  const name = mover ? CZ_NAME[mover.type] : "?";
  const cap = target ? `×${to} (${CZ_NAME[target.type]})` : `→${to}`;
  const promo = uci.length > 4 ? "=P+" : "";
  return `${name} ${from}${cap}${promo}`;
}

function materialOf(board: Board, side: Side): number {
  let sum = 0;
  for (const row of board) for (const cell of row) if (cell && cell.side === side) sum += MATERIAL[cell.type];
  return sum;
}

/** Změna materiálové bilance (mover − soupeř) po přehrání PV, z pohledu mover. */
function pvMaterialSwing(board: Board, pv: string[], mover: Side): number {
  const before = materialOf(board, mover) - materialOf(board, other(mover));
  let b = board;
  for (const m of pv) b = applyUci(b, m);
  const after = materialOf(b, mover) - materialOf(b, other(mover));
  return after - before;
}

function fmtEval(score: number | null): string {
  if (score === null) return "—";
  if (Math.abs(score) >= MATE_BASE - 1000) {
    const n = Math.round((MATE_BASE - Math.abs(score)) / 10);
    if (n === 0) return score > 0 ? "M0" : "-M0 (mat)";
    return score > 0 ? `M${n}` : `-M${n}`;
  }
  return (score > 0 ? "+" : "") + score;
}

function shorten(text: string, max = 140): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

// ---------------------------------------------------------------------------
// UCI engine
// ---------------------------------------------------------------------------

class Engine {
  private proc: ChildProcessWithoutNullStreams;
  private buf = "";
  private pending: {
    until: (line: string) => boolean;
    lines: string[];
    resolve: (lines: string[]) => void;
    reject: (err: Error) => void;
  } | null = null;

  constructor(exe: string) {
    this.proc = spawn(exe, [], { stdio: ["pipe", "pipe", "pipe"] });
    this.proc.stdout.setEncoding("utf8");
    this.proc.stdout.on("data", (chunk: string) => this.onData(chunk));
    this.proc.stderr.setEncoding("utf8");
    this.proc.stderr.on("data", (chunk: string) => process.stderr.write(`[engine stderr] ${chunk}`));
    this.proc.on("exit", code => {
      if (this.pending) {
        const p = this.pending;
        this.pending = null;
        p.reject(new Error(`engine skončil (kód ${code}) uprostřed příkazu`));
      }
    });
  }

  private onData(chunk: string): void {
    this.buf += chunk;
    let i: number;
    while ((i = this.buf.indexOf("\n")) >= 0) {
      const line = this.buf.slice(0, i).replace(/\r$/, "");
      this.buf = this.buf.slice(i + 1);
      const p = this.pending;
      if (!p) continue;
      p.lines.push(line);
      if (p.until(line)) {
        this.pending = null;
        p.resolve(p.lines);
      }
    }
  }

  send(cmd: string): void {
    this.proc.stdin.write(cmd + "\n");
  }

  /** Pošle příkaz a sbírá výstup, dokud `until` nevrátí true (včetně toho řádku). */
  exec(cmd: string, until: (line: string) => boolean): Promise<string[]> {
    if (this.pending) return Promise.reject(new Error("engine je zaneprázdněn"));
    return new Promise((resolve, reject) => {
      this.pending = { until, lines: [], resolve, reject };
      this.send(cmd);
    });
  }

  async uci(): Promise<string> {
    const lines = await this.exec("uci", l => l === "uciok");
    return lines.find(l => l.startsWith("id name "))?.slice(8) ?? "?";
  }

  setOption(name: string, value: string | number): void {
    this.send(`setoption name ${name} value ${value}`);
  }

  async isReady(): Promise<void> {
    await this.exec("isready", l => l === "readyok");
  }

  /** FEN pozice podle enginu (příkaz `d`). */
  async fen(posCmd: string): Promise<string> {
    this.send(posCmd);
    const lines = await this.exec("d", l => l.startsWith("Checkers"));
    return lines.find(l => l.startsWith("Fen: "))?.slice(5) ?? "";
  }

  async perft(posCmd: string, depth: number): Promise<{ moves: Map<string, number>; nodes: number }> {
    this.send(posCmd);
    const lines = await this.exec(`go perft ${depth}`, l => l.startsWith("Nodes searched"));
    const moves = new Map<string, number>();
    let nodes = -1;
    for (const l of lines) {
      const m = /^([a-h][1-8][a-h][1-8][a-z]?): (\d+)$/.exec(l);
      if (m) moves.set(m[1], Number(m[2]));
      const n = /^Nodes searched: (\d+)/.exec(l);
      if (n) nodes = Number(n[1]);
    }
    return { moves, nodes };
  }

  async analyse(posCmd: string): Promise<Analysis> {
    this.send(posCmd);
    const lines = await this.exec(GO_CMD, l => l.startsWith("bestmove"));
    let last: string | null = null;
    for (const l of lines) {
      if (!l.startsWith("info ") || !/ score /.test(l) || /bound/.test(l)) continue;
      if (/ multipv /.test(l) && !/ multipv 1 /.test(l)) continue;
      last = l;
    }
    const bestLine = lines[lines.length - 1];
    const bestmove = /^bestmove (\S+)/.exec(bestLine)?.[1] ?? "(none)";
    if (!last) throw new Error(`engine nevrátil skóre pro: ${posCmd}\n${lines.join("\n")}`);
    const sc = / score (cp|mate) (-?\d+)/.exec(last)!;
    const scoreType = sc[1] as "cp" | "mate";
    const scoreValue = Number(sc[2]);
    const score =
      scoreType === "cp"
        ? scoreValue
        : scoreValue > 0
          ? MATE_BASE - scoreValue * 10
          : -(MATE_BASE - Math.abs(scoreValue) * 10);
    const depth = Number(/ depth (\d+)/.exec(last)?.[1] ?? 0);
    const pv = (/ pv (.+)$/.exec(last)?.[1] ?? "").split(" ").filter(Boolean);
    const noMoves = bestmove === "(none)";
    return {
      scoreType,
      scoreValue,
      score,
      bestmove,
      pv,
      depth,
      noMoves,
      mated: noMoves && scoreType === "mate" && scoreValue === 0,
    };
  }

  quit(): void {
    this.send("quit");
  }
}

// ---------------------------------------------------------------------------
// Sanity testy
// ---------------------------------------------------------------------------

interface SanityResult {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
}

async function runSanity(engine: Engine): Promise<{ results: SanityResult[]; engineName: string }> {
  const results: SanityResult[] = [];

  // a) uci → uciok, nastavení varianty
  const engineName = await engine.uci();
  engine.setOption("UCI_Variant", "makruk");
  await engine.isReady();
  results.push({ id: "a", label: "uci → uciok, UCI_Variant=makruk, isready → readyok", ok: true, detail: engineName });

  // b) startpos FEN
  const fen = await engine.fen("position startpos");
  results.push({
    id: "b",
    label: "position startpos → FEN",
    ok: fen.startsWith(EXPECTED_START_FEN),
    detail: fen,
  });

  // c) perft 4
  const { nodes } = await engine.perft("position startpos", 4);
  results.push({
    id: "c",
    label: "go perft 4 = 273026",
    ok: nodes === EXPECTED_PERFT4,
    detail: `Nodes searched: ${nodes}`,
  });

  // d) initialBoard() → FEN + kontrola převodu souřadnic
  const ours = boardToFen(initialBoard(), "white");
  const board = initialBoard();
  const coordChecks =
    square(7, 3) === "d1" &&
    square(0, 4) === "e8" &&
    square(5, 3) === "d3" &&
    board[7][3]?.type === "K" &&
    board[7][3]?.side === "white" &&
    board[0][4]?.type === "K" &&
    board[0][4]?.side === "black" &&
    board[5][3]?.type === "P" &&
    board[5][3]?.side === "white";
  results.push({
    id: "d",
    label: "initialBoard() → FEN shodný s b) + square(7,3)=d1, (0,4)=e8, (5,3)=d3",
    ok: ours.startsWith(EXPECTED_START_FEN) && fen.startsWith(EXPECTED_START_FEN) && coordChecks,
    detail: ours,
  });

  return { results, engineName };
}

// ---------------------------------------------------------------------------
// Sestavení pracovních položek
// ---------------------------------------------------------------------------

function buildItems(): WorkItem[] {
  const items: WorkItem[] = [];
  for (const s of STRATEGIES) {
    for (const v of s.variants) {
      items.push({
        source: "strategy",
        id: `${s.id}/${v.id}`,
        title: `${s.name} — ${v.name}`,
        moves: v.moves,
        startBoard: initialBoard(),
        startSide: "white",
        startFen: null,
      });
    }
  }
  for (const g of GAMES) {
    const board = g.setup ? boardFromSetup(g.setup) : initialBoard();
    let side: Side = "white";
    if (g.setup) {
      const first = g.moves[0];
      const piece = first ? board[first.from[0]][first.from[1]] : null;
      side = piece?.side ?? "white";
    }
    items.push({
      source: "game",
      id: g.id,
      title: g.title,
      moves: g.moves,
      startBoard: board,
      startSide: side,
      startFen: g.setup ? boardToFen(board, side) : null,
      result: g.result,
    });
  }
  const only = parseOnlyFilter();
  return only.length
    ? items.filter(it => only.some(o => (!o.source || o.source === it.source) && it.id.includes(o.id)))
    : items;
}

/**
 * Filtr položek: `--only <filtr>[,<filtr>…]` (lze opakovat) nebo env VALIDATE_ONLY.
 * Filtr je podřetězec id, volitelně s prefixem zdroje: `strategy:rua-on-7th/h-file-rook`, `game:met-trap`.
 * Bez filtru běží plná validace.
 */
function parseOnlyFilter(): { source: Source | null; id: string }[] {
  const raw: string[] = [];
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--only" && argv[i + 1]) raw.push(argv[++i]);
    else if (argv[i].startsWith("--only=")) raw.push(argv[i].slice("--only=".length));
  }
  if (process.env.VALIDATE_ONLY) raw.push(process.env.VALIDATE_ONLY);
  return raw
    .flatMap(r => r.split(","))
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      const m = /^(strategy|game):(.+)$/.exec(s);
      return m ? { source: m[1] as Source, id: m[2] } : { source: null, id: s };
    });
}

// ---------------------------------------------------------------------------
// Validace jedné položky
// ---------------------------------------------------------------------------

function classify(evalBefore: number, evalAfter: number): Classification {
  const loss = evalBefore - evalAfter;
  const decided =
    (evalBefore >= DECISIVE && evalAfter >= DECISIVE) || (evalBefore <= -DECISIVE && evalAfter <= -DECISIVE);
  if (decided) return loss >= THRESH_ERROR ? "rozhodnuto" : "ok";
  if (loss >= THRESH_ERROR) return "chyba";
  if (loss >= THRESH_INACCURACY) return "nepřesnost";
  return "ok";
}

async function validateItem(engine: Engine, item: WorkItem, allowlist: AllowlistEntry[]): Promise<ItemResult> {
  let board = cloneBoard(item.startBoard);
  let side = item.startSide;
  let baseCmd = item.startFen ? `position fen ${item.startFen}` : "position startpos";
  let played: string[] = [];
  const posCmd = () => baseCmd + (played.length ? " moves " + played.join(" ") : "");

  const records: MoveRecord[] = [];
  let cur = await engine.analyse(posCmd());

  for (let i = 0; i < item.moves.length; i++) {
    const m = item.moves[i];
    const ply = i + 1;
    const mover = side;
    const fromSq = square(m.from[0], m.from[1]);
    const toSq = square(m.to[0], m.to[1]);
    const piece = board[m.from[0]][m.from[1]];
    const allow = allowlist.find(a => a.source === item.source && a.id === item.id && a.ply === ply) ?? null;

    const { moves: legalMoves } = await engine.perft(posCmd(), 1);
    let uci = fromSq + toSq;
    // promoce má v UCI suffix „m" (Bia → Met); bez něj engine tah nezná
    const enginePromotes = legalMoves.has(uci + "m");
    if (enginePromotes) uci += "m";
    const legal = enginePromotes || legalMoves.has(uci);
    const dataPromotes = m.promotes === true;

    const rec: MoveRecord = {
      ply,
      side: mover,
      uci,
      desc: describeUci(board, uci),
      dataFrom: m.from,
      dataTo: m.to,
      legal,
      dataPromotes,
      enginePromotes,
      promoMismatch: legal && dataPromotes !== enginePromotes,
      evalBefore: null,
      evalAfter: null,
      loss: null,
      classification: null,
      bestBefore: cur.bestmove,
      bestBeforeDesc: describeUci(board, cur.bestmove),
      bestBeforePv: cur.pv.slice(0, 6).join(" "),
      bestReply: null,
      bestReplyDesc: null,
      bestReplyEval: null,
      missedCapture: null,
      allowlisted: allow,
      comment: m.comment,
    };

    if (!legal) {
      if (!piece) rec.illegalReason = `na poli ${fromSq} nestojí žádná figura`;
      else if (piece.side !== mover) rec.illegalReason = `na ${fromSq} stojí figura soupeře (${CZ_NAME[piece.type]}), na tahu je ${sideCz(mover)}`;
      else if (legalMoves.size === 0) rec.illegalReason = `${sideCz(mover)} nemá žádný legální tah (mat/pat)`;
      else rec.illegalReason = `engine nezná tah ${uci} pro ${CZ_NAME[piece.type]} na ${fromSq}`;
      records.push(rec);
      // pokračujeme z pozice podle datového modelu (tah aplikován „naslepo" jako v aplikaci)
      if (piece) board = applyUci(board, uci + (dataPromotes && piece.type === "P" ? "m" : ""));
      side = other(side);
      baseCmd = `position fen ${boardToFen(board, side)}`;
      played = [];
      cur = await engine.analyse(posCmd());
      continue;
    }

    const boardBefore = board;
    played.push(uci);
    board = applyUci(board, uci);
    side = other(side);
    const next = await engine.analyse(posCmd());

    rec.evalBefore = cur.score;
    rec.evalAfter = -next.score;
    rec.loss = cur.score + next.score;
    rec.classification = classify(rec.evalBefore, rec.evalAfter);
    rec.bestReply = next.bestmove;
    rec.bestReplyDesc = describeUci(board, next.bestmove);
    rec.bestReplyEval = next.score;

    // zmeškané braní: engine chtěl brát (a nebrala se tatáž figura jinou figurou), hráč táhl jinak
    // a buď to podle PV vynáší materiál (≥ MISSED_CAPTURE_MATERIAL), nebo je ztráta na úrovni chyby
    const bmTarget = cur.bestmove.length >= 4 ? pieceAt(boardBefore, cur.bestmove.slice(2, 4)) : null;
    if (
      bmTarget &&
      bmTarget.side !== mover &&
      cur.bestmove !== uci &&
      cur.bestmove.slice(2, 4) !== uci.slice(2, 4) &&
      (rec.classification === "chyba" || rec.classification === "nepřesnost")
    ) {
      const swing = pvMaterialSwing(boardBefore, cur.pv, mover);
      if (swing >= MISSED_CAPTURE_MATERIAL || rec.loss >= THRESH_ERROR) {
        rec.missedCapture = {
          bestmove: cur.bestmove,
          bestmoveDesc: describeUci(boardBefore, cur.bestmove),
          capturedPiece: CZ_NAME[bmTarget.type],
          evalIfCaptured: cur.score,
          evalAfterPlayed: -next.score,
          loss: rec.loss,
          pvMaterialSwing: swing,
          pv: cur.pv.slice(0, 8).join(" "),
        };
      }
    }

    records.push(rec);
    cur = next;
  }

  const lastComment = item.moves[item.moves.length - 1]?.comment ?? "";
  const claimsMate = /matuje/i.test(item.result ?? "") || /\bMAT\b/.test(lastComment);

  const counted = records.filter(r => !r.allowlisted);
  return {
    source: item.source,
    id: item.id,
    title: item.title,
    startFen: item.startFen ?? "startpos",
    moves: records,
    finalSide: side,
    finalEval: cur.score,
    finalEvalRaw: `${cur.scoreType} ${cur.scoreValue}`,
    finalBest: cur.bestmove,
    finalBestDesc: describeUci(board, cur.bestmove),
    finalMated: cur.mated,
    finalNoMoves: cur.noMoves,
    claimsMate,
    result: item.result,
    lastComment,
    illegalCount: records.filter(r => !r.legal).length,
    errorCount: counted.filter(r => r.classification === "chyba").length,
    inaccuracyCount: counted.filter(r => r.classification === "nepřesnost").length,
    allowlistedCount: records.filter(r => r.allowlisted).length,
  };
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function mdEscape(s: string): string {
  return s.replace(/\|/g, "\\|");
}

function coords(rec: MoveRecord): string {
  return `[${rec.dataFrom[0]},${rec.dataFrom[1]}]→[${rec.dataTo[0]},${rec.dataTo[1]}]`;
}

function buildReport(opts: {
  engineName: string;
  sanity: SanityResult[];
  calibration: { label: string; score: number; depth: number }[];
  results: ItemResult[];
  elapsedMs: number;
}): string {
  const { engineName, sanity, calibration, results, elapsedMs } = opts;
  const L: string[] = [];
  const now = new Date();

  L.push("# Engine validace tahů — makruk-pruvodce");
  L.push("");
  L.push(`Vygenerováno: ${now.toISOString().slice(0, 16).replace("T", " ")} UTC · \`npm run validate\``);
  L.push("");
  L.push("## Nastavení");
  L.push("");
  L.push(`- **Engine:** ${engineName} (\`tools/fairy-stockfish/fairy-stockfish_x86-64-bmi2.exe\`, release \`fairy_sf_14\`), varianta \`makruk\`, klasické hodnocení (release neobsahuje makruk NNUE)`);
  L.push(`- **Hledání:** \`${GO_CMD}\` na každou pozici (před i po tahu), Hash ${HASH_MB} MB, Threads ${THREADS}; legalita přes \`go perft 1\``);
  L.push(`- **Pozice:** vždy \`position startpos|fen <setup> moves …\` — engine tak sám vede makruk counting rules (u koncovek bez pěšců)`);
  L.push(`- **Prahy:** chyba ≥ ${THRESH_ERROR} cp, nepřesnost ${THRESH_INACCURACY}–${THRESH_ERROR - 1} cp (ztráta = eval před tahem − eval po tahu, obojí z pohledu strany, která táhla; \`mate N\` → ±(${MATE_BASE} − |N|·10))`);
  L.push(`- **Rozhodnuté pozice:** je-li |eval| ≥ ${DECISIVE} cp před i po tahu (stejným směrem), tah se klasifikuje „rozhodnuto" a nepočítá se jako chyba — typicky matové studie, kde engine v 1 s mat v N „ztratí z dohledu" (M11 → +5900 by jinak vyšlo jako chyba 4000 cp), nebo tahy už poražené strany; v detailu jsou uvedeny při ztrátě ≥ ${THRESH_ERROR} cp`);
  L.push(`- **Doba běhu:** ${(elapsedMs / 60000).toFixed(1)} min`);
  L.push("");
  L.push("### Kalibrace škály hodnocení");
  L.push("");
  L.push("Bílý na tahu, výchozí pozice bez jedné figury (stejné hledání jako u validace):");
  L.push("");
  L.push("| pozice | eval (cp) | depth |");
  L.push("|---|---:|---:|");
  for (const c of calibration) L.push(`| ${c.label} | ${fmtEval(c.score)} | ${c.depth} |`);
  L.push("");
  L.push(
    `Škála enginu je oproti šachovému „1 pěšec = 100 cp" nafouklá: Bia ≈ 160–190, Met ≈ 250, Khon ≈ 370, Ma ≈ 490, Rua ≈ 730 cp. ` +
      `Výchozí odhad prahů byl chyba ≥ 300 / nepřesnost ≥ 150. **Práh chyby je snížen na ${THRESH_ERROR} cp**, aby ztráta Met (nejslabší figury) už počítala jako chyba; ` +
      `práh nepřesnosti ${THRESH_INACCURACY} cp odpovídá zhruba ztrátě jednoho Bia a zůstává.`,
  );
  L.push("");
  L.push("### Sanity testy");
  L.push("");
  for (const s of sanity) L.push(`- ${s.ok ? "✅" : "❌"} **${s.id})** ${s.label} — \`${s.detail}\``);
  L.push("");

  // Souhrn
  L.push("## Souhrn");
  L.push("");
  L.push("| zdroj | id | tahů | nelegálních | chyb | nepřesností | eval na konci |");
  L.push("|---|---|---:|---:|---:|---:|---:|");
  for (const r of results) {
    const allow = r.allowlistedCount ? ` (+${r.allowlistedCount} allowlist)` : "";
    L.push(
      `| ${r.source} | ${r.id} | ${r.moves.length} | ${r.illegalCount} | ${r.errorCount}${allow} | ${r.inaccuracyCount} | ${fmtEval(r.finalEval)} (${sideCz(r.finalSide)} na tahu) |`,
    );
  }
  const totals = results.reduce(
    (a, r) => ({
      moves: a.moves + r.moves.length,
      illegal: a.illegal + r.illegalCount,
      errors: a.errors + r.errorCount,
      inacc: a.inacc + r.inaccuracyCount,
      allow: a.allow + r.allowlistedCount,
      decided: a.decided + r.moves.filter(m => m.classification === "rozhodnuto").length,
    }),
    { moves: 0, illegal: 0, errors: 0, inacc: 0, allow: 0, decided: 0 },
  );
  L.push(`| **celkem** | ${results.length} položek | **${totals.moves}** | **${totals.illegal}** | **${totals.errors}** | **${totals.inacc}** | |`);
  L.push("");
  if (totals.allow) L.push(`Tahů na allowlistu: ${totals.allow} (uvedeny v detailu, nepočítají se).`);
  if (totals.decided) L.push(`Tahů „rozhodnuto" (ztráta ≥ ${THRESH_ERROR} cp v už rozhodnuté pozici, nepočítají se): ${totals.decided} — viz detail.`);
  L.push("");

  // Detail
  L.push("## Detail problémů");
  L.push("");
  let any = false;
  for (const r of results) {
    const problems = r.moves.filter(
      m => !m.legal || m.promoMismatch || m.classification === "chyba" || m.classification === "nepřesnost" || m.classification === "rozhodnuto",
    );
    if (!problems.length) continue;
    any = true;
    L.push(`### ${r.source} · ${r.id}`);
    L.push("");
    L.push(`*${r.title}*`);
    L.push("");
    for (const m of problems) {
      const tags: string[] = [];
      if (!m.legal) tags.push("**NELEGÁLNÍ**");
      if (m.promoMismatch) tags.push(`**PROMOCE NESEDÍ** (data \`promotes: ${m.dataPromotes}\`, engine ${m.enginePromotes ? "povyšuje" : "nepovyšuje"})`);
      if (m.classification === "chyba" || m.classification === "nepřesnost") tags.push(`**${m.classification.toUpperCase()}**`);
      if (m.classification === "rozhodnuto") tags.push("_rozhodnuto (nepočítá se)_");
      if (m.allowlisted) tags.push(`_allowlist: ${m.allowlisted.reason}_`);
      L.push(`#### tah ${m.ply} (${sideCz(m.side)}) — \`${m.uci}\` ${m.desc} · data ${coords(m)} — ${tags.join(" · ")}`);
      L.push("");
      if (m.classification === "rozhodnuto" && m.legal && !m.promoMismatch) {
        const kind = (m.evalBefore ?? 0) > 0 ? "pomalejší cesta k výhře" : "volba mezi prohrávajícími tahy";
        const pref =
          m.bestBefore === m.uci
            ? "engine hrál totéž — rozdíl je jen horizont matu (mat v N ↔ cp)"
            : `engine preferuje ${"`"}${m.bestBefore}${"`"} ${m.bestBeforeDesc}`;
        L.push(`- pozice už rozhodnutá (${kind}): eval ${fmtEval(m.evalBefore)} → ${fmtEval(m.evalAfter)} z pohledu ${sideGen(m.side)}; ${pref}`);
        L.push("");
        continue;
      }
      if (!m.legal) {
        L.push(`- důvod: ${m.illegalReason}`);
        L.push(`- další tahy této položky jsou hodnoceny z pozice podle datového modelu (tah aplikován naslepo)`);
      } else {
        L.push(`- ztráta: **${m.loss} cp** (eval před tahem ${fmtEval(m.evalBefore)} → po tahu ${fmtEval(m.evalAfter)}, z pohledu ${sideGen(m.side)})`);
        L.push(`- engine preferuje: \`${m.bestBefore}\` ${m.bestBeforeDesc} (eval ${fmtEval(m.evalBefore)}), PV: \`${m.bestBeforePv}\``);
        L.push(`- po zahraném tahu soupeř může: \`${m.bestReply}\` ${m.bestReplyDesc} (eval ${fmtEval(m.bestReplyEval)} pro ${sideGen(other(m.side))})`);
      }
      L.push(`- komentář z dat: „${mdEscape(shorten(m.comment))}"`);
      L.push("");
    }
  }
  if (!any) L.push("Žádné problémy.");
  L.push("");

  // Zmeškaná braní
  L.push("## Zmeškaná braní");
  L.push("");
  L.push(
    `Tahy, kde engine jako nejlepší tah vidí braní, hráč táhl jinak (a nebral tutéž figuru jinou figurou) a buď to podle PV vynáší materiál ≥ ${MISSED_CAPTURE_MATERIAL} cp, ` +
      `nebo je ztráta tahu na úrovni chyby (≥ ${THRESH_ERROR} cp). „Materiál po PV" = změna materiální bilance na konci hlavní varianty enginu ` +
      `(odhad podle kalibrovaných hodnot figur, z pohledu strany na tahu). Visící figura v koncové pozici je vidět v sekci „Tvrzení na konci" (nejlepší tah = braní).`,
  );
  L.push("");
  L.push("| zdroj | id | tah | strana | engine: brát | eval po braní | zahráno | eval po zahraném | ztráta | materiál po PV | PV enginu |");
  L.push("|---|---|---:|---|---|---:|---|---:|---:|---:|---|");
  let anyMissed = false;
  for (const r of results) {
    for (const m of r.moves) {
      const mc = m.missedCapture;
      if (!mc) continue;
      anyMissed = true;
      L.push(
        `| ${r.source} | ${r.id} | ${m.ply} | ${sideCz(m.side)} | \`${mc.bestmove}\` ${mc.bestmoveDesc} | ${fmtEval(mc.evalIfCaptured)} | \`${m.uci}\` ${m.desc} | ${fmtEval(mc.evalAfterPlayed)} | ${mc.loss} | ${mc.pvMaterialSwing > 0 ? "+" : ""}${mc.pvMaterialSwing} | \`${mc.pv}\` |`,
      );
    }
  }
  if (!anyMissed) L.push("| — | | | | | | | | | | |");
  L.push("");

  // Tvrzení na konci
  L.push("## Tvrzení na konci");
  L.push("");
  L.push("Eval koncové pozice (z pohledu strany na tahu) a nejlepší tah enginu — k porovnání se závěrečným komentářem / `result`.");
  L.push("");
  L.push("| zdroj | id | na tahu | eval | nejlepší tah | mat? | result / poslední komentář |");
  L.push("|---|---|---|---:|---|---|---|");
  for (const r of results) {
    let mate: string;
    if (r.claimsMate) mate = r.finalMated ? "✅ mat potvrzen" : `❌ **tvrzen mat, engine: ${r.finalEvalRaw}, ${r.finalBest}**`;
    else if (r.finalMated) mate = "engine: mat (data netvrdí)";
    else if (r.finalNoMoves) mate = "bez legálního tahu (pat?)";
    else mate = "—";
    const claim = r.result ? `**${mdEscape(r.result)}** — ` : "";
    L.push(
      `| ${r.source} | ${r.id} | ${sideCz(r.finalSide)} | ${fmtEval(r.finalEval)} | \`${r.finalBest}\` ${r.finalBestDesc} | ${mate} | ${claim}„${mdEscape(shorten(r.lastComment, 110))}" |`,
    );
  }
  L.push("");

  // Kontrolní případy
  L.push("## Kontrolní případy z ruční revize");
  L.push("");
  for (const c of CONTROL_CASES) {
    const r = results.find(x => x.source === c.source && x.id === c.id);
    L.push(`### ${c.n}. ${c.source} · ${c.id}, tah ${c.ply}`);
    L.push("");
    L.push(`Podezření: ${c.hypothesis}`);
    L.push("");
    const m = r?.moves[c.ply - 1];
    if (!r || !m) {
      L.push("- ⚠️ položka/tah nenalezen (spuštěno s VALIDATE_ONLY?)");
      L.push("");
      continue;
    }
    L.push(`- tah v datech: \`${m.uci}\` ${m.desc} (${sideCz(m.side)}), data ${coords(m)}`);
    if (!m.legal) L.push(`- **NELEGÁLNÍ** — ${m.illegalReason}`);
    else {
      L.push(`- eval před tahem ${fmtEval(m.evalBefore)} → po tahu ${fmtEval(m.evalAfter)} (z pohledu ${sideGen(m.side)}); ztráta **${m.loss} cp** → **${m.classification}**${m.allowlisted ? " (allowlist)" : ""}`);
      L.push(`- engine místo toho preferuje: \`${m.bestBefore}\` ${m.bestBeforeDesc}, PV \`${m.bestBeforePv}\``);
      L.push(`- po zahraném tahu soupeř může: \`${m.bestReply}\` ${m.bestReplyDesc} (eval ${fmtEval(m.bestReplyEval)} pro ${sideGen(other(m.side))})`);
    }
    if (c.missedCapturePly) {
      const f = r.moves[c.missedCapturePly - 1];
      if (!f) L.push(`- tah ${c.missedCapturePly}: nenalezen`);
      else if (f.missedCapture)
        L.push(`- tah ${c.missedCapturePly} (${sideCz(f.side)}) \`${f.uci}\` ${f.desc}: **zmeškané braní potvrzeno** — engine chtěl \`${f.missedCapture.bestmove}\` ${f.missedCapture.bestmoveDesc}, ztráta ${f.missedCapture.loss} cp`);
      else L.push(`- tah ${c.missedCapturePly} (${sideCz(f.side)}) \`${f.uci}\` ${f.desc}: zmeškané braní **nezachyceno** (engine preferuje \`${f.bestBefore}\` ${f.bestBeforeDesc}, ztráta ${f.loss} cp)`);
    }
    if (c.ply === r.moves.length) {
      L.push(`- koncová pozice (${sideCz(r.finalSide)} na tahu): eval ${fmtEval(r.finalEval)}, nejlepší tah \`${r.finalBest}\` ${r.finalBestDesc}${r.result ? ` — data tvrdí: „${r.result}"` : ""}`);
    }
    L.push("");
  }

  return L.join("\n");
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  if (!existsSync(ENGINE_EXE)) {
    console.error(`Engine nenalezen: ${ENGINE_EXE}\nStáhni fairy-stockfish_x86-64-bmi2.exe z https://github.com/fairy-stockfish/Fairy-Stockfish/releases/tag/fairy_sf_14 do tools/fairy-stockfish/.`);
    process.exit(1);
  }
  const allowlist: AllowlistEntry[] = existsSync(ALLOWLIST_PATH)
    ? (JSON.parse(readFileSync(ALLOWLIST_PATH, "utf8")) as AllowlistEntry[])
    : [];

  const t0 = Date.now();
  const engine = new Engine(ENGINE_EXE);

  // Sanity
  const { results: sanity, engineName } = await runSanity(engine);
  console.log("Sanity testy:");
  for (const s of sanity) console.log(`  ${s.ok ? "OK  " : "FAIL"} ${s.id}) ${s.label} — ${s.detail}`);
  if (sanity.some(s => !s.ok)) {
    console.error("\nSanity test selhal — STOP.");
    engine.quit();
    process.exit(1);
  }

  engine.setOption("Hash", HASH_MB);
  engine.setOption("Threads", THREADS);
  await engine.isReady();
  console.log(`\nEngine: ${engineName}, Threads ${THREADS}, Hash ${HASH_MB} MB, ${GO_CMD}`);

  // Kalibrace
  const calibration: { label: string; score: number; depth: number }[] = [];
  for (const c of CALIBRATION) {
    const a = await engine.analyse(`position fen ${c.fen}`);
    calibration.push({ label: c.label, score: a.score, depth: a.depth });
  }
  console.log("\nKalibrace:");
  for (const c of calibration) console.log(`  ${fmtEval(c.score).padStart(6)}  ${c.label} (depth ${c.depth})`);

  // Validace
  const items = buildItems();
  const totalMoves = items.reduce((a, it) => a + it.moves.length, 0);
  console.log(`\nValidace: ${items.length} položek, ${totalMoves} tahů, odhad ~${(((totalMoves + items.length) * (MOVETIME + 60)) / 60000).toFixed(1)} min\n`);
  const results: ItemResult[] = [];
  for (const item of items) {
    const r = await validateItem(engine, item, allowlist);
    results.push(r);
    const flags = [
      r.illegalCount ? `NELEGÁLNÍ ${r.illegalCount}` : "",
      r.errorCount ? `chyb ${r.errorCount}` : "",
      r.inaccuracyCount ? `nepřesností ${r.inaccuracyCount}` : "",
      r.moves.some(m => m.promoMismatch) ? "PROMOCE NESEDÍ" : "",
    ].filter(Boolean);
    console.log(
      `  ${r.source.padEnd(8)} ${r.id.padEnd(40)} ${String(r.moves.length).padStart(2)} tahů  konec ${fmtEval(r.finalEval).padStart(6)}  ${flags.join(", ") || "ok"}`,
    );
  }
  engine.quit();

  const elapsedMs = Date.now() - t0;
  mkdirSync(REPORT_DIR, { recursive: true });
  const md = buildReport({ engineName, sanity, calibration, results, elapsedMs });
  writeFileSync(REPORT_MD, md, "utf8");
  writeFileSync(
    REPORT_JSON,
    JSON.stringify(
      {
        engine: engineName,
        go: GO_CMD,
        threads: THREADS,
        hash: HASH_MB,
        thresholds: { error: THRESH_ERROR, inaccuracy: THRESH_INACCURACY },
        calibration,
        sanity,
        results,
      },
      null,
      2,
    ),
    "utf8",
  );

  const totalErrors = results.reduce((a, r) => a + r.errorCount, 0);
  const totalInacc = results.reduce((a, r) => a + r.inaccuracyCount, 0);
  const totalIllegal = results.reduce((a, r) => a + r.illegalCount, 0);
  console.log(`\nCelkem: ${totalMoves} tahů, nelegálních ${totalIllegal}, chyb ${totalErrors}, nepřesností ${totalInacc}; doba ${(elapsedMs / 60000).toFixed(1)} min`);
  console.log(`Report: ${path.relative(ROOT, REPORT_MD)} (+ ${path.relative(ROOT, REPORT_JSON)})`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
