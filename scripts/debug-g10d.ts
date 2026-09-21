import { initialBoard } from "../src/lib/makruk.js";
import { applyOne, legalMoves, boardToString } from "./validate-games.js";

let board = initialBoard();
const moves = [
  { from: [5, 3], to: [4, 3] },
  { from: [2, 3], to: [3, 3] },
  { from: [5, 4], to: [4, 4] },
  { from: [2, 4], to: [3, 4] },
  { from: [7, 1], to: [6, 3] },
  { from: [0, 1], to: [1, 3] },
  { from: [7, 6], to: [6, 4] },
  { from: [0, 6], to: [1, 4] },
  { from: [7, 2], to: [6, 1] },
  { from: [0, 2], to: [1, 1] },
  { from: [7, 5], to: [6, 6] },
  { from: [0, 5], to: [1, 6] },
  { from: [5, 5], to: [4, 5] },
  { from: [3, 4], to: [4, 5] },
  { from: [6, 4], to: [4, 5] },
];
for (const m of moves) board = applyOne(board, m);
console.log(boardToString(board));
console.log("White legal moves from f4:");
for (const m of legalMoves(board, "white")) {
  if (m.from[0] === 4 && m.from[1] === 5) {
    console.log(`f4-${String.fromCharCode(97 + m.to[1])}${8 - m.to[0]}`);
  }
}
console.log("Is Ng6 legal?", legalMoves(board, "white").some(m => m.from[0] === 4 && m.from[1] === 5 && m.to[0] === 2 && m.to[1] === 6));
console.log("Is Nxe5 legal?", legalMoves(board, "white").some(m => m.from[0] === 4 && m.from[1] === 5 && m.to[0] === 3 && m.to[1] === 4));
