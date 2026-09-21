import { emptyBoard, squareName } from "../src/lib/makruk.js";
import { applyOne, legalMoves, isCheckmate, boardToString } from "./validate-games.js";

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

function testPP(kingR, kingC, pp1, pp2, bkR, bkC, depth) {
  const b = emptyBoard();
  b[kingR][kingC] = { type: "K", side: "white" };
  b[pp1[0]][pp1[1]] = { type: "P+", side: "white" };
  b[pp2[0]][pp2[1]] = { type: "P+", side: "white" };
  b[bkR][bkC] = { type: "K", side: "black" };
  console.log(`\nSetup: WK${squareName(kingR, kingC)}, P+${squareName(pp1[0], pp1[1])}, P+${squareName(pp2[0], pp2[1])}, BK${squareName(bkR, bkC)}`);
  console.log(boardToString(b));
  const mate = findMateBFS(b, "white", depth);
  if (mate) {
    console.log(`Mate: ${movesToString(mate)}`);
    let bb = b;
    for (const m of mate) bb = applyOne(bb, m);
    console.log(boardToString(bb));
  } else {
    console.log("No mate found.");
  }
}

testPP(2, 0, [3, 1], [3, 2], 0, 0, 10); // Ka6, P+b5,c5 vs Ka8
testPP(2, 1, [3, 1], [3, 2], 0, 0, 10); // Kb6, P+b5,c5 vs Ka8
testPP(3, 3, [3, 4], [3, 5], 0, 7, 12); // Kd5, P+e5,f5 vs Kh8
testPP(2, 2, [3, 2], [3, 3], 0, 0, 10); // Kc6, P+c5,d5 vs Ka8
testPP(1, 1, [2, 2], [2, 3], 0, 0, 10); // Kb7, P+c6,d6 vs Ka8
