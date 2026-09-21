import {
  emptyBoard,
  squareName,
} from "../src/lib/makruk.js";
import {
  applyOne,
  legalMoves,
  isCheckmate,
  boardToString,
} from "./validate-games.js";

function boardKey(board) {
  let key = "";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = board[r][c];
      if (cell) key += `${cell.side[0]}${cell.type}@${r},${c};`;
    }
  }
  return key;
}

function findMateBFS(start, attacker, maxDepth) {
  const queue = [{ board: start, side: attacker, moves: [] }];
  const seen = new Set();
  while (queue.length) {
    const { board, side, moves } = queue.shift();
    if (moves.length >= maxDepth) continue;
    for (const m of legalMoves(board, side)) {
      const next = applyOne(board, m);
      const defender = side === "white" ? "black" : "white";
      if (isCheckmate(next, defender)) return [...moves, m];
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

function movesToString(moves) {
  return moves
    .map((m, i) => {
      const label = i % 2 === 0 ? `${Math.floor(i / 2) + 1}.` : "...";
      return `${label}${squareName(m.from[0], m.from[1])}-${squareName(m.to[0], m.to[1])}`;
    })
    .join(" ");
}

function test(label, setup, depth) {
  console.log(`\n=== ${label} ===`);
  console.log(boardToString(setup));
  const mate = findMateBFS(setup, "white", depth);
  if (mate) {
    console.log(`Mate: ${movesToString(mate)}`);
    let b = setup;
    for (const m of mate) b = applyOne(b, m);
    console.log(boardToString(b));
  } else {
    console.log("No forced mate found.");
  }
}

// Test rook vs knight+king setups
test("Ke1,Rh1 vs Kh8,Nf6", (() => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" };
  b[7][7] = { type: "R", side: "white" };
  b[0][7] = { type: "K", side: "black" };
  b[2][5] = { type: "N", side: "black" };
  return b;
})(), 8);

test("Ke1,Rh1 vs Kg8,Nf6", (() => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" };
  b[7][7] = { type: "R", side: "white" };
  b[0][6] = { type: "K", side: "black" };
  b[2][5] = { type: "N", side: "black" };
  return b;
})(), 8);

test("Ke1,Ra1 vs Kh8,Nh7", (() => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" };
  b[7][0] = { type: "R", side: "white" };
  b[0][7] = { type: "K", side: "black" };
  b[2][7] = { type: "N", side: "black" };
  return b;
})(), 8);
