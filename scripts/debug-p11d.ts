import { initialBoard, squareName } from "../src/lib/makruk.js";
import { applyOne, generatePseudoMoves, boardToString } from "./validate-games.js";

const moves = [
  { from: [5, 3], to: [4, 3], comment: "" },
  { from: [2, 3], to: [3, 3], comment: "" },
  { from: [5, 4], to: [4, 4], comment: "" },
  { from: [2, 4], to: [3, 4], comment: "" },
  { from: [7, 1], to: [6, 3], comment: "" },
  { from: [0, 1], to: [1, 3], comment: "" },
  { from: [7, 6], to: [6, 4], comment: "" },
  { from: [0, 2], to: [1, 1], comment: "" },
  { from: [5, 1], to: [4, 1], comment: "" },
];

let board = initialBoard();
for (const m of moves) board = applyOne(board, m);
console.log(boardToString(board));

const piece = board[1][3];
console.log("Piece at d7:", piece);
console.log("Cell at f6:", board[2][5]);

const offsets = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];
for (const [dr, dc] of offsets) {
  const r = 1 + dr;
  const c = 3 + dc;
  const cell = r >= 0 && r < 8 && c >= 0 && c < 8 ? board[r][c] : null;
  console.log(`d7 + [${dr},${dc}] = ${squareName(r, c)}: ${cell ? `${cell.side} ${cell.type}` : "empty"}`);
}

console.log("\nPseudo moves from d7:");
for (const m of generatePseudoMoves(board, 1, 3)) {
  console.log(`${squareName(m.from[0], m.from[1])}-${squareName(m.to[0], m.to[1])}`);
}
