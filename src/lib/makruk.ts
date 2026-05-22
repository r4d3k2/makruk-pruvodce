export type PieceType =
  | "K"
  | "M"
  | "B"
  | "N"
  | "R"
  | "P"
  | "P+";

export type Side = "white" | "black";

export interface Piece {
  type: PieceType;
  side: Side;
}

export type Cell = Piece | null;
export type Board = Cell[][];

export interface Coord {
  row: number;
  col: number;
}

export interface MoveDef {
  from: [number, number];
  to: [number, number];
  comment: string;
  promotes?: true;
}

export interface PieceOnBoard {
  id: string;
  piece: Piece;
  row: number;
  col: number;
}

export const ROWS = 8;
export const COLS = 8;

export function emptyBoard(): Board {
  const board: Board = [];
  for (let r = 0; r < ROWS; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < COLS; c++) row.push(null);
    board.push(row);
  }
  return board;
}

export function initialBoard(): Board {
  const board = emptyBoard();

  // Black back rank (row 0): R N B M K B N R
  board[0][0] = { type: "R", side: "black" };
  board[0][1] = { type: "N", side: "black" };
  board[0][2] = { type: "B", side: "black" };
  board[0][3] = { type: "M", side: "black" };
  board[0][4] = { type: "K", side: "black" };
  board[0][5] = { type: "B", side: "black" };
  board[0][6] = { type: "N", side: "black" };
  board[0][7] = { type: "R", side: "black" };

  // Black pawns on row 2
  for (let c = 0; c < COLS; c++) board[2][c] = { type: "P", side: "black" };

  // White pawns on row 5
  for (let c = 0; c < COLS; c++) board[5][c] = { type: "P", side: "white" };

  // White back rank (row 7): R N B K M B N R
  board[7][0] = { type: "R", side: "white" };
  board[7][1] = { type: "N", side: "white" };
  board[7][2] = { type: "B", side: "white" };
  board[7][3] = { type: "K", side: "white" };
  board[7][4] = { type: "M", side: "white" };
  board[7][5] = { type: "B", side: "white" };
  board[7][6] = { type: "N", side: "white" };
  board[7][7] = { type: "R", side: "white" };

  return board;
}

function cloneBoard(board: Board): Board {
  return board.map(row => row.map(cell => (cell ? { ...cell } : null)));
}

function applyOne(board: Board, move: MoveDef): Board {
  const next = cloneBoard(board);
  const [fr, fc] = move.from;
  const [tr, tc] = move.to;
  const piece = next[fr][fc];
  if (!piece) return next;
  next[fr][fc] = null;
  if (move.promotes && piece.type === "P") {
    next[tr][tc] = { type: "P+", side: piece.side };
  } else {
    next[tr][tc] = piece;
  }
  return next;
}

export function applyMoves(moves: MoveDef[]): Board {
  let board = initialBoard();
  for (const m of moves) board = applyOne(board, m);
  return board;
}

export function applyMovesUpTo(moves: MoveDef[], index: number): Board {
  let board = initialBoard();
  if (index < 0) return board;
  const limit = Math.min(index + 1, moves.length);
  for (let i = 0; i < limit; i++) board = applyOne(board, moves[i]);
  return board;
}

export function moveSide(index: number): Side {
  return index % 2 === 0 ? "white" : "black";
}

export function moveLabel(index: number): string {
  const moveNumber = Math.floor(index / 2) + 1;
  return moveSide(index) === "white" ? `${moveNumber}.` : `${moveNumber}…`;
}

const FILE_LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function squareName(row: number, col: number): string {
  return `${FILE_LETTERS[col]}${ROWS - row}`;
}

export function pieceLetter(type: PieceType): string {
  if (type === "P+") return "P+";
  return type;
}

export function moveNotation(move: MoveDef, sideWhoPlayed: Side, promoted = false): string {
  const piece = pieceLetter(getPieceTypeAfter(move, promoted, sideWhoPlayed));
  const from = squareName(move.from[0], move.from[1]);
  const to = squareName(move.to[0], move.to[1]);
  return `${piece}${from}-${to}`;
}

function getPieceTypeAfter(move: MoveDef, _promoted: boolean, _side: Side): PieceType {
  return move.promotes ? "P+" : "P";
}

export interface TrackedPiece {
  id: string;
  type: PieceType;
  side: Side;
  row: number;
  col: number;
}

export function pieceTraceUpTo(moves: MoveDef[], index: number): TrackedPiece[] {
  const board = initialBoard();
  const positions = new Map<string, { type: PieceType; side: Side; row: number; col: number }>();

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (cell) {
        const id = `init-${r}-${c}`;
        positions.set(id, { type: cell.type, side: cell.side, row: r, col: c });
      }
    }
  }

  const findIdAt = (row: number, col: number): string | null => {
    for (const [id, entry] of positions) {
      if (entry.row === row && entry.col === col) return id;
    }
    return null;
  };

  const limit = Math.min(index + 1, moves.length);
  for (let i = 0; i < limit; i++) {
    const move = moves[i];
    const [fr, fc] = move.from;
    const [tr, tc] = move.to;
    const capturedId = findIdAt(tr, tc);
    if (capturedId) positions.delete(capturedId);
    const movingId = findIdAt(fr, fc);
    if (!movingId) continue;
    const entry = positions.get(movingId)!;
    if (move.promotes && entry.type === "P") {
      entry.type = "P+";
    }
    entry.row = tr;
    entry.col = tc;
  }

  const result: TrackedPiece[] = [];
  for (const [id, entry] of positions) {
    result.push({ id, type: entry.type, side: entry.side, row: entry.row, col: entry.col });
  }
  return result;
}
