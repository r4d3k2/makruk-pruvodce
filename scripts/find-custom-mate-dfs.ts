import {
  type Board,
  type MoveDef,
  type Side,
  emptyBoard,
  squareName,
} from "../src/lib/makruk.js";
import {
  applyOne,
  legalMoves,
  isCheckmate,
  isInCheck,
  boardToString,
  findKing,
} from "./validate-games.js";

function distance(r1: number, c1: number, r2: number, c2: number): number {
  return Math.max(Math.abs(r1 - r2), Math.abs(c1 - c2));
}

function scoreMove(board: Board, m: MoveDef, side: Side): number {
  const next = applyOne(board, m);
  const defender = side === "white" ? "black" : "white";
  const defKing = findKing(next, defender);
  const attKing = findKing(next, side);
  let score = 0;
  if (isInCheck(next, defender)) score += 50;
  if (defKing && attKing) {
    score -= distance(defKing.r, defKing.c, attKing.r, attKing.c);
  }
  const piece = board[m.from[0]][m.from[1]];
  if (piece && piece.type === "N") {
    score -= Math.abs(m.to[0] - 3.5) * 0.5;
  }
  return score;
}

function findMateDFS(
  board: Board,
  side: Side,
  maxDepth: number,
  moves: MoveDef[] = [],
  seen = new Set<string>(),
): MoveDef[] | null {
  const defender = side === "white" ? "black" : "white";
  if (isCheckmate(board, defender)) return moves;
  if (moves.length >= maxDepth) return null;

  const key = boardKey(board) + "|" + side;
  if (seen.has(key)) return null;
  seen.add(key);

  const candidates = legalMoves(board, side).sort((a, b) => scoreMove(board, b, side) - scoreMove(board, a, side));

  for (const m of candidates) {
    const next = applyOne(board, m);
    const result = findMateDFS(next, defender, maxDepth, [...moves, m], seen);
    if (result) return result;
  }
  return null;
}

function boardKey(board: Board): string {
  let key = "";
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const cell = board[r][c];
      if (cell) {
        key += `${cell.side[0]}${cell.type}@${r},${c};`;
      }
    }
  }
  return key;
}

function movesToString(moves: MoveDef[]): string {
  return moves
    .map((m, i) => {
      const label = i % 2 === 0 ? `${Math.floor(i / 2) + 1}.` : "...";
      return `${label}${squareName(m.from[0], m.from[1])}-${squareName(m.to[0], m.to[1])}${m.promotes ? "=" : ""}`;
    })
    .join(" ");
}

function testSetup(label: string, setup: () => Board, attacker: Side, maxDepth: number) {
  console.log(`\n=== ${label} ===`);
  const board = setup();
  console.log(boardToString(board));
  const start = Date.now();
  const mate = findMateDFS(board, attacker, maxDepth);
  const elapsed = Date.now() - start;
  if (mate) {
    console.log(`Mate found (${mate.length} half-moves, ${elapsed}ms):`);
    console.log(movesToString(mate));
    let b = board;
    for (const m of mate) b = applyOne(b, m);
    console.log(boardToString(b));
  } else {
    console.log(`No mate found within ${maxDepth} half-moves (${elapsed}ms).`);
  }
}

// 2 Knights + King vs King — several attempts
testSetup("2N+K vs K (king d4, knights c2/d2 vs king a8)", () => {
  const b = emptyBoard();
  b[4][3] = { type: "K", side: "white" }; // Kd4
  b[6][2] = { type: "N", side: "white" }; // Nc2
  b[6][3] = { type: "N", side: "white" }; // Nd2
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 16);

testSetup("2N+K vs K (king e3, knights c3/d3 vs king a8)", () => {
  const b = emptyBoard();
  b[5][4] = { type: "K", side: "white" }; // Ke3
  b[5][2] = { type: "N", side: "white" }; // Nc3
  b[5][3] = { type: "N", side: "white" }; // Nd3
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 16);

testSetup("2N+K vs K (king e5, knights c4/d4 vs king a8)", () => {
  const b = emptyBoard();
  b[3][4] = { type: "K", side: "white" }; // Ke5
  b[4][2] = { type: "N", side: "white" }; // Nc4
  b[4][3] = { type: "N", side: "white" }; // Nd4
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 14);

// Rook + Knight + King vs King
testSetup("R+N+K vs K (rook h1, knight f5, king e5 vs king a8)", () => {
  const b = emptyBoard();
  b[3][4] = { type: "K", side: "white" }; // Ke5
  b[3][5] = { type: "N", side: "white" }; // Nf5
  b[7][7] = { type: "R", side: "white" }; // Rh1
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 12);

testSetup("R+N+K vs K (rook a1, knight d5, king e5 vs king h8)", () => {
  const b = emptyBoard();
  b[3][4] = { type: "K", side: "white" }; // Ke5
  b[3][3] = { type: "N", side: "white" }; // Nd5
  b[7][0] = { type: "R", side: "white" }; // Ra1
  b[0][7] = { type: "K", side: "black" }; // Kh8
  return b;
}, "white", 12);
