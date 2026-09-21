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

// Try to get longer mates by starting pieces further away / less coordinated
testSetup("2N+K vs K (king c4, knights a4/g4 vs king a8)", () => {
  const b = emptyBoard();
  b[4][2] = { type: "K", side: "white" }; // Kc4
  b[4][0] = { type: "N", side: "white" }; // Na4
  b[4][6] = { type: "N", side: "white" }; // Ng4
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 16);

testSetup("2N+K vs K (king e5, knights b1/g1 vs king a8)", () => {
  const b = emptyBoard();
  b[3][4] = { type: "K", side: "white" }; // Ke5
  b[7][1] = { type: "N", side: "white" }; // Nb1
  b[7][6] = { type: "N", side: "white" }; // Ng1
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 18);

testSetup("2N+K vs K (king d5, knights b4/g4 vs king a8)", () => {
  const b = emptyBoard();
  b[3][3] = { type: "K", side: "white" }; // Kd5
  b[4][1] = { type: "N", side: "white" }; // Nb4
  b[4][6] = { type: "N", side: "white" }; // Ng4
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 16);

// R+N+K: start further back for longer mate
testSetup("R+N+K vs K (rook a3, knight c3, king e3 vs king h8)", () => {
  const b = emptyBoard();
  b[5][4] = { type: "K", side: "white" }; // Ke3
  b[5][2] = { type: "N", side: "white" }; // Nc3
  b[5][0] = { type: "R", side: "white" }; // Ra3
  b[0][7] = { type: "K", side: "black" }; // Kh8
  return b;
}, "white", 14);

testSetup("R+N+K vs K (rook h3, knight f3, king d3 vs king a8)", () => {
  const b = emptyBoard();
  b[5][3] = { type: "K", side: "white" }; // Kd3
  b[5][5] = { type: "N", side: "white" }; // Nf3
  b[5][7] = { type: "R", side: "white" }; // Rh3
  b[0][0] = { type: "K", side: "black" }; // Ka8
  return b;
}, "white", 14);

testSetup("R+N+K vs K (rook a2, knight c2, king e2 vs king h8)", () => {
  const b = emptyBoard();
  b[6][4] = { type: "K", side: "white" }; // Ke2
  b[6][2] = { type: "N", side: "white" }; // Nc2
  b[6][0] = { type: "R", side: "white" }; // Ra2
  b[0][7] = { type: "K", side: "black" }; // Kh8
  return b;
}, "white", 16);
