import { initialBoard } from "../src/lib/makruk.js";
import { applyOne, generatePseudoMoves, boardToString } from "./validate-games.js";

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
  { from: [0, 5], to: [1, 6], comment: "" },
  { from: [5, 2], to: [4, 2], comment: "" },
  { from: [2, 2], to: [3, 2], comment: "" },
  { from: [4, 2], to: [3, 3], comment: "" },
];
for (const m of moves) board = applyOne(board, m);
console.log(boardToString(board));
console.log("Pseudo moves from d7:");
for (const m of generatePseudoMoves(board, 1, 3)) {
  console.log(`d7-${String.fromCharCode(97 + m.to[1])}${8 - m.to[0]}`);
}
console.log("Pseudo moves from e7:");
for (const m of generatePseudoMoves(board, 1, 4)) {
  console.log(`e7-${String.fromCharCode(97 + m.to[1])}${8 - m.to[0]}`);
}
