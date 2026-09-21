import {
  type Board,
  type Cell,
  type Coord,
  type MoveDef,
  type Piece,
  type PieceType,
  type Side,
  ROWS,
  COLS,
  emptyBoard,
  initialBoard,
  applyMoves,
  squareName,
} from "../src/lib/makruk.js";

const isWhite = (side: Side) => side === "white";

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}

function addMove(
  moves: MoveDef[],
  fromR: number,
  fromC: number,
  toR: number,
  toC: number,
  board: Board,
  side: Side,
): void {
  if (!inBounds(toR, toC)) return;
  const target = board[toR][toC];
  if (target && target.side === side) return;
  moves.push({ from: [fromR, fromC], to: [toR, toC], comment: "" });
}

function generatePseudoMoves(board: Board, r: number, c: number): MoveDef[] {
  const cell = board[r][c];
  if (!cell) return [];
  const { type, side } = cell;
  const moves: MoveDef[] = [];
  const dir = isWhite(side) ? -1 : 1;

  switch (type) {
    case "K": {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          addMove(moves, r, c, r + dr, c + dc, board, side);
        }
      }
      break;
    }
    case "M":
    case "P+": {
      // Met / promoted pawn: 1 square diagonally
      for (const [dr, dc] of [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ]) {
        addMove(moves, r, c, r + dr, c + dc, board, side);
      }
      break;
    }
    case "B": {
      // Khon: 1 diagonal or 1 straight forward
      for (const [dr, dc] of [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
        [dir, 0],
      ]) {
        addMove(moves, r, c, r + dr, c + dc, board, side);
      }
      break;
    }
    case "N": {
      for (const [dr, dc] of [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
      ]) {
        addMove(moves, r, c, r + dr, c + dc, board, side);
      }
      break;
    }
    case "R": {
      // Rook: orthogonal rays
      for (const [dr, dc] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        let nr = r + dr;
        let nc = c + dc;
        while (inBounds(nr, nc)) {
          const target = board[nr][nc];
          if (!target) {
            moves.push({ from: [r, c], to: [nr, nc], comment: "" });
          } else {
            if (target.side !== side) {
              moves.push({ from: [r, c], to: [nr, nc], comment: "" });
            }
            break;
          }
          nr += dr;
          nc += dc;
        }
      }
      break;
    }
    case "P": {
      // Pawn: 1 forward, capture 1 forward-diagonal; promote on last rank
      const fr = r + dir;
      if (inBounds(fr, c) && !board[fr][c]) {
        moves.push({ from: [r, c], to: [fr, c], comment: "" });
      }
      for (const dc of [-1, 1]) {
        if (inBounds(fr, c + dc)) {
          const target = board[fr][c + dc];
          if (target && target.side !== side) {
            moves.push({ from: [r, c], to: [fr, c + dc], comment: "" });
          }
        }
      }
      break;
    }
  }
  return moves;
}

function cloneBoard(board: Board): Board {
  return board.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
}

function applyOne(board: Board, move: MoveDef): Board {
  const next = cloneBoard(board);
  const piece = next[move.from[0]][move.from[1]];
  if (!piece) return next;
  next[move.from[0]][move.from[1]] = null;
  if (move.promotes && piece.type === "P") {
    next[move.to[0]][move.to[1]] = { type: "P+", side: piece.side };
  } else {
    next[move.to[0]][move.to[1]] = piece;
  }
  return next;
}

function findKing(board: Board, side: Side): Coord | null {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (cell && cell.type === "K" && cell.side === side) return { r, c };
    }
  }
  return null;
}

function isSquareAttacked(
  board: Board,
  r: number,
  c: number,
  bySide: Side,
): boolean {
  for (let rr = 0; rr < ROWS; rr++) {
    for (let cc = 0; cc < COLS; cc++) {
      const cell = board[rr][cc];
      if (!cell || cell.side !== bySide) continue;
      const pseudo = generatePseudoMoves(board, rr, cc);
      if (pseudo.some((m) => m.to[0] === r && m.to[1] === c)) return true;
    }
  }
  return false;
}

function isInCheck(board: Board, side: Side): boolean {
  const king = findKing(board, side);
  if (!king) return false;
  return isSquareAttacked(board, king.r, king.c, side === "white" ? "black" : "white");
}

function legalMoves(board: Board, side: Side): MoveDef[] {
  const result: MoveDef[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (!cell || cell.side !== side) continue;
      for (const m of generatePseudoMoves(board, r, c)) {
        const next = applyOne(board, m);
        if (!isInCheck(next, side)) result.push(m);
      }
    }
  }
  return result;
}

function isCheckmate(board: Board, side: Side): boolean {
  return isInCheck(board, side) && legalMoves(board, side).length === 0;
}

function boardToString(board: Board): string {
  const lines: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    let line = `${8 - r} `;
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (!cell) line += ". ";
      else {
        const letter =
          cell.type === "K"
            ? "K"
            : cell.type === "M"
              ? "M"
              : cell.type === "B"
                ? "B"
                : cell.type === "N"
                  ? "N"
                  : cell.type === "R"
                    ? "R"
                    : cell.type === "P"
                      ? "P"
                      : "+";
        line += (cell.side === "white" ? letter : letter.toLowerCase()) + " ";
      }
    }
    lines.push(line);
  }
  lines.push("  a b c d e f g h");
  return lines.join("\n");
}

export {
  generatePseudoMoves,
  legalMoves,
  isInCheck,
  isCheckmate,
  applyOne,
  cloneBoard,
  findKing,
  isSquareAttacked,
  boardToString,
};

// Validate GAMES from games.ts when executed as a script.
async function main() {
  const { GAMES, boardFromSetup } = await import("../src/data/games.js");
  let ok = true;
  for (const game of GAMES) {
    console.log(`\n=== ${game.id}: ${game.title} ===`);
    let board = game.setup ? boardFromSetup(game.setup) : initialBoard();
    let side: Side = "white";
    for (let i = 0; i < game.moves.length; i++) {
      const m = game.moves[i];
      const piece = board[m.from[0]][m.from[1]];
      if (!piece) {
        console.error(`Move ${i + 1}: no piece on ${squareName(m.from[0], m.from[1])}`);
        ok = false;
        break;
      }
      if (piece.side !== side) {
        console.error(
          `Move ${i + 1}: expected ${side} to move, found ${piece.side}`,
        );
        ok = false;
        break;
      }
      const legal = legalMoves(board, side);
      if (!legal.some((lm) => lm.to[0] === m.to[0] && lm.to[1] === m.to[1] && lm.from[0] === m.from[0] && lm.from[1] === m.from[1])) {
        console.error(
          `Move ${i + 1}: ILLEGAL ${squareName(m.from[0], m.from[1])}-${squareName(m.to[0], m.to[1])}`,
        );
        console.error(boardToString(board));
        ok = false;
        break;
      }
      board = applyOne(board, m);
      if (m.promotes && piece.type !== "P") {
        console.warn(`Move ${i + 1}: promotes flag but piece is ${piece.type}`);
      }
      side = side === "white" ? "black" : "white";
    }
    if (game.result.toLowerCase().includes("matuje") || game.result.toLowerCase().includes("mat")) {
      const loser = side;
      if (!isCheckmate(board, loser)) {
        console.error(`Final position is NOT checkmate for ${loser}`);
        console.error(boardToString(board));
        ok = false;
      } else {
        console.log("Checkmate verified.");
      }
    }
  }
  process.exit(ok ? 0 : 1);
}

main();
