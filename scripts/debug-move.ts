import { initialBoard } from "../src/lib/makruk.js";
import { applyOne, legalMoves, boardToString } from "./validate-games.js";

let board = initialBoard();
const moves = [
  { from: [5, 3], to: [4, 3], comment: "" },
  { from: [2, 3], to: [3, 3], comment: "" },
  { from: [5, 4], to: [4, 4], comment: "" },
  { from: [2, 4], to: [3, 4], comment: "" },
  { from: [7, 1], to: [6, 3], comment: "" },
  { from: [0, 1], to: [1, 3], comment: "" },
  { from: [7, 6], to: [6, 4], comment: "" },
  { from: [0, 6], to: [1, 4], comment: "" },
  { from: [7, 2], to: [6, 1], comment: "" },
  { from: [0, 2], to: [1, 1], comment: "" },
  { from: [7, 5], to: [6, 6], comment: "" },
  { from: [0, 3], to: [1, 2], comment: "" },
  { from: [5, 2], to: [4, 2], comment: "" },
  { from: [1, 2], to: [2, 1], comment: "" },
];
for (const m of moves) board = applyOne(board, m);
console.log(boardToString(board));
console.log("White legal moves from e2:");
for (const m of legalMoves(board, "white")) {
  if (m.from[0] === 6 && m.from[1] === 4) {
    console.log(`e2-${String.fromCharCode(97 + m.to[1])}${8 - m.to[0]}`);
  }
}
