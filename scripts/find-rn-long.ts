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
  boardToString,
} from "./validate-games.js";

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

function findMateBFS(
  start: Board,
  attacker: Side,
  maxDepth: number,
): MoveDef[] | null {
  type QueueItem = { board: Board; side: Side; moves: MoveDef[] };
  const queue: QueueItem[] = [{ board: start, side: attacker, moves: [] }];
  const seen = new Set<string>();

  while (queue.length > 0) {
    const { board, side, moves } = queue.shift()!;
    if (moves.length >= maxDepth) continue;

    for (const m of legalMoves(board, side)) {
      const next = applyOne(board, m);
      const defender = side === "white" ? "black" : "white";
      if (isCheckmate(next, defender)) {
        return [...moves, m];
      }
      const key = boardKey(next) + "|" + defender;
      if (seen.has(key)) continue;
      seen.add(key);
      if (legalMoves(next, defender).length > 0) {
        queue.push({ board: next, side: defender, moves: [...moves, m] });
      }
    }
  }
  return null;
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
  const mate = findMateBFS(board, attacker, maxDepth);
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

// Rook not on open file, so mate requires repositioning
testSetup("R+N+K vs K (rook h4, knight c4, king e4 vs king a8)", () => {
  const b = emptyBoard();
  b[4][4] = { type: "K", side: "white" }; // Ke4
  b[4][2] = { type: "N", side: "white" }; // Nc4
  b[4][7] = { type: "R", side: "white" }; // Rh4
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 14);

testSetup("R+N+K vs K (rook g4, knight e4, king c4 vs king a8)", () => {
  const b = emptyBoard();
  b[4][2] = { type: "K", side: "white" }; // Kc4
  b[4][4] = { type: "N", side: "white" }; // Ne4
  b[4][6] = { type: "R", side: "white" }; // Rg4
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 14);

testSetup("R+N+K vs K (rook f4, knight d4, king b4 vs king h8)", () => {
  const b = emptyBoard();
  b[4][1] = { type: "K", side: "white" }; // Kb4
  b[4][3] = { type: "N", side: "white" }; // Nd4
  b[4][5] = { type: "R", side: "white" }; // Rf4
  b[0][7] = { type: "K", side: "black" }; // Kh8
  return b;
}, "white", 14);

testSetup("R+N+K vs K (rook d4, knight f4, king h4 vs king a8)", () => {
  const b = emptyBoard();
  b[4][7] = { type: "K", side: "white" }; // Kh4
  b[4][5] = { type: "N", side: "white" }; // Nf4
  b[4][3] = { type: "R", side: "white" }; // Rd4
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 14);
