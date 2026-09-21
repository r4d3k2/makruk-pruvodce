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

// Longer 2N+K vs King: pieces further back so mate takes more moves
testSetup("2N+K vs K (king d4, knights c2/d2 vs king a8)", () => {
  const b = emptyBoard();
  b[4][3] = { type: "K", side: "white" }; // Kd4
  b[6][2] = { type: "N", side: "white" }; // Nc2
  b[6][3] = { type: "N", side: "white" }; // Nd2
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 16);

// Rook + Knight + King vs King
testSetup("R+N+K vs K (rook h1, knight f5, king e5 vs king a8)", () => {
  const b = emptyBoard();
  b[3][4] = { type: "K", side: "white" }; // Ke5
  b[3][5] = { type: "N", side: "white" }; // Nf5
  b[7][7] = { type: "R", side: "white" }; // Rh1
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 12);

// Another 2N+K vs K: knights far apart
testSetup("2N+K vs K (king e3, knights a4/g4 vs king a8)", () => {
  const b = emptyBoard();
  b[5][4] = { type: "K", side: "white" }; // Ke3
  b[4][0] = { type: "N", side: "white" }; // Na4
  b[4][6] = { type: "N", side: "white" }; // Ng4
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 16);
