import { initialBoard, squareName } from "../src/lib/makruk.js";
import { applyOne, legalMoves, boardToString } from "./validate-games.js";

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
console.log("\nBlack legal moves:");
for (const m of legalMoves(board, "black")) {
  console.log(`${squareName(m.from[0], m.from[1])}-${squareName(m.to[0], m.to[1])}`);
}
console.log("\nIs d7-f6 legal?", legalMoves(board, "black").some(m => m.from[0] === 1 && m.from[1] === 3 && m.to[0] === 2 && m.to[1] === 5));
