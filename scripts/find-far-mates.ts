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

// Black king not on same rank/file as rook, white king far away -> longer mate
testSetup("R+N+K vs K (rook a1, knight b1, king e1 vs king c8)", () => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" }; // Ke1
  b[7][1] = { type: "N", side: "white" }; // Nb1
  b[7][0] = { type: "R", side: "white" }; // Ra1
  b[0][2] = { type: "K", side: "black" }; // Kc8
  return b;
}, "white", 16);

testSetup("R+N+K vs K (rook h1, knight g1, king e1 vs king d8)", () => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" }; // Ke1
  b[7][6] = { type: "N", side: "white" }; // Ng1
  b[7][7] = { type: "R", side: "white" }; // Rh1
  b[0][3] = { type: "K", side: "black" }; // Kd8
  return b;
}, "white", 16);

testSetup("R+N+K vs K (rook a1, knight b1, king e1 vs king d8)", () => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" }; // Ke1
  b[7][1] = { type: "N", side: "white" }; // Nb1
  b[7][0] = { type: "R", side: "white" }; // Ra1
  b[0][3] = { type: "K", side: "black" }; // Kd8
  return b;
}, "white", 16);

// 2N+K from further away
testSetup("2N+K vs K (king e1, knights b1/g1 vs king c8)", () => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" }; // Ke1
  b[7][1] = { type: "N", side: "white" }; // Nb1
  b[7][6] = { type: "N", side: "white" }; // Ng1
  b[0][2] = { type: "K", side: "black" }; // Kc8
  return b;
}, "white", 18);

testSetup("2N+K vs K (king e2, knights b2/g2 vs king c8)", () => {
  const b = emptyBoard();
  b[6][4] = { type: "K", side: "white" }; // Ke2
  b[6][1] = { type: "N", side: "white" }; // Nb2
  b[6][6] = { type: "N", side: "white" }; // Ng2
  b[0][2] = { type: "K", side: "black" }; // Kc8
  return b;
}, "white", 18);
