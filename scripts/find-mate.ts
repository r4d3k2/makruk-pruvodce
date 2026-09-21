import {
  type Board,
  type MoveDef,
  type Side,
  emptyBoard,
  initialBoard,
  squareName,
} from "../src/lib/makruk.js";
import {
  applyOne,
  legalMoves,
  isCheckmate,
  isInCheck,
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
  const mate = findMateBFS(board, attacker, maxDepth);
  if (mate) {
    console.log(`Mate found (${mate.length} half-moves):`);
    console.log(movesToString(mate));
    let b = board;
    for (const m of mate) b = applyOne(b, m);
    console.log(boardToString(b));
  } else {
    console.log("No mate found.");
  }
}

// Rook vs Knight + King - try to win the knight
testSetup("Rook vs Knight+King (corner knight)", () => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" };
  b[7][7] = { type: "R", side: "white" };
  b[0][7] = { type: "K", side: "black" };
  b[2][7] = { type: "N", side: "black" };
  return b;
}, "white", 10);

// Rook vs Knight + King - knight further out
testSetup("Rook vs Knight+King (knight f6)", () => {
  const b = emptyBoard();
  b[7][4] = { type: "K", side: "white" };
  b[7][7] = { type: "R", side: "white" };
  b[0][4] = { type: "K", side: "black" };
  b[2][5] = { type: "N", side: "black" };
  return b;
}, "white", 10);

// King + 2 promoted pawns vs King - corner setup
testSetup("King + 2 P+ vs King (corner)", () => {
  const b = emptyBoard();
  b[2][3] = { type: "K", side: "white" };
  b[2][2] = { type: "P+", side: "white" };
  b[2][4] = { type: "P+", side: "white" };
  b[0][0] = { type: "K", side: "black" };
  return b;
}, "white", 10);

// King + P+ vs King
testSetup("King + P+ vs King (close)", () => {
  const b = emptyBoard();
  b[3][3] = { type: "K", side: "white" };
  b[3][4] = { type: "P+", side: "white" };
  b[0][7] = { type: "K", side: "black" };
  return b;
}, "white", 12);

// Rook + Knight vs King - better setup
testSetup("Rook + Knight vs King (corner drive)", () => {
  const b = emptyBoard();
  b[3][6] = { type: "K", side: "white" };
  b[7][7] = { type: "R", side: "white" };
  b[2][5] = { type: "N", side: "white" };
  b[0][7] = { type: "K", side: "black" };
  return b;
}, "white", 10);

// 2 Knights + King vs King - composed study
testSetup("2 Knights + King vs King (study)", () => {
  const b = emptyBoard();
  b[2][1] = { type: "K", side: "white" };
  b[3][2] = { type: "N", side: "white" };
  b[2][0] = { type: "N", side: "white" };
  b[0][0] = { type: "K", side: "black" };
  return b;
}, "white", 8);
