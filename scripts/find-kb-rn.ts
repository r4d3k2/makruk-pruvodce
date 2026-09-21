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

function testKB(label, kingR, kingC, bR, bC, bkR, bkC, depth) {
  const b = emptyBoard();
  b[kingR][kingC] = { type: "K", side: "white" };
  b[bR][bC] = { type: "B", side: "white" };
  b[bkR][bkC] = { type: "K", side: "black" };
  console.log(`\n${label}`);
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

testKB("K+B vs K corner", 3, 4, 3, 3, 0, 0, 10);
testKB("K+B vs K close", 2, 2, 3, 3, 0, 0, 10);
testKB("K+B vs K edge", 2, 4, 2, 3, 0, 4, 10);

function testRookVsKnight(label, wkR, wkC, wrR, wrC, bkR, bkC, bnR, bnC, depth) {
  const b = emptyBoard();
  b[wkR][wkC] = { type: "K", side: "white" };
  b[wrR][wrC] = { type: "R", side: "white" };
  b[bkR][bkC] = { type: "K", side: "black" };
  b[bnR][bnC] = { type: "N", side: "black" };
  console.log(`\n${label}`);
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

testRookVsKnight("R+N vs K mate", 2, 5, 7, 0, 0, 4, 1, 5, 10);
testRookVsKnight("R+N vs K corner", 3, 6, 7, 7, 0, 7, 1, 7, 10);
