import { useMemo } from "react";
import type { Board, Coord, PieceType, Side, TrackedPiece } from "../../lib/makruk";
import { COLS, ROWS } from "../../lib/makruk";
import { PieceSilhouette } from "./PieceSilhouettes";

export type { TrackedPiece };

interface MakrukBoardProps {
  board: Board;
  pieces?: TrackedPiece[];
  animate?: boolean;
  flipped?: boolean;
  fromHighlight?: Coord | null;
  toHighlight?: Coord | null;
  selectedSquare?: Coord | null;
  hintSquare?: Coord | null;
  /** Optional secondary hint (target square) — used at hint level 2. */
  hintToSquare?: Coord | null;
  errorSquare?: Coord | null;
  /** Last move's destination — if set, that square pulses with a gold ring
   * (used by the promotion-blink animation). */
  promoFlashSquare?: Coord | null;
  onCellClick?: (row: number, col: number) => void;
}

const CELL = 52;
const PAD = 28;
const W = PAD * 2 + COLS * CELL;
const H = PAD * 2 + ROWS * CELL;
const PIECE_SIZE = CELL * 0.82;
const PIECE_TRANSITION_ON = "transform 300ms ease-out";
const PIECE_TRANSITION_OFF = "none";

function piecesFromBoard(board: Board): TrackedPiece[] {
  const arr: TrackedPiece[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (cell) {
        arr.push({
          id: `${cell.side[0]}${cell.type}@${r}-${c}`,
          type: cell.type as PieceType,
          side: cell.side as Side,
          row: r,
          col: c,
        });
      }
    }
  }
  return arr;
}

function squareCenter(row: number, col: number, flipped: boolean) {
  const r = flipped ? ROWS - 1 - row : row;
  const c = flipped ? COLS - 1 - col : col;
  return {
    x: PAD + c * CELL + CELL / 2,
    y: PAD + r * CELL + CELL / 2,
  };
}

function squareTopLeft(row: number, col: number, flipped: boolean) {
  const r = flipped ? ROWS - 1 - row : row;
  const c = flipped ? COLS - 1 - col : col;
  return { x: PAD + c * CELL, y: PAD + r * CELL };
}

export function MakrukBoard({
  board,
  pieces,
  animate = true,
  flipped = false,
  fromHighlight = null,
  toHighlight = null,
  selectedSquare = null,
  hintSquare = null,
  hintToSquare = null,
  errorSquare = null,
  promoFlashSquare = null,
  onCellClick,
}: MakrukBoardProps) {
  const fileLabels = useMemo(() => {
    const base = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return flipped ? [...base].reverse() : base;
  }, [flipped]);

  const rankLabels = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, r) =>
        flipped ? `${r + 1}` : `${ROWS - r}`,
      ),
    [flipped],
  );

  const renderedPieces = useMemo(
    () => pieces ?? piecesFromBoard(board),
    [pieces, board],
  );

  const at = (coord: Coord | null, r: number, c: number) =>
    !!coord && coord.row === r && coord.col === c;

  const transition = animate ? PIECE_TRANSITION_ON : PIECE_TRANSITION_OFF;

  return (
    <div className="mk-board-wrap" style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block", borderRadius: 14, overflow: "visible" }}
        role="img"
        aria-label="Makruk deska"
      >
        <defs>
          <linearGradient id="mkBoardGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--board-grad-1)" />
            <stop offset="100%" stopColor="var(--board-grad-2)" />
          </linearGradient>
          <filter id="mkPieceShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.4"
              floodColor="#000"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        <rect x={0} y={0} width={W} height={H} rx={10} fill="url(#mkBoardGrad)" />

        {Array.from({ length: ROWS }).flatMap((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const { x, y } = squareTopLeft(r, c, flipped);
            const isDark = (r + c) % 2 === 1;
            const isSelected = at(selectedSquare, r, c);
            const isError = at(errorSquare, r, c);
            const isFrom = at(fromHighlight, r, c);
            const isTo = at(toHighlight, r, c);
            const isPromoFlash = at(promoFlashSquare, r, c);
            return (
              <g key={`sq-${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  fill={isDark ? "var(--board-dark)" : "var(--board-light)"}
                  onClick={() => onCellClick?.(r, c)}
                  style={{ cursor: onCellClick ? "pointer" : "default" }}
                />
                {(isFrom || isTo) && (
                  <rect
                    x={x + 1.5}
                    y={y + 1.5}
                    width={CELL - 3}
                    height={CELL - 3}
                    fill="none"
                    stroke="var(--highlight-to)"
                    strokeWidth={isTo ? 2.5 : 1.5}
                    pointerEvents="none"
                  />
                )}
                {at(hintSquare, r, c) && (
                  <circle
                    cx={x + CELL / 2}
                    cy={y + CELL / 2}
                    r={CELL * 0.42}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    opacity={0.55}
                    className="mk-pulse"
                    pointerEvents="none"
                  />
                )}
                {at(hintToSquare, r, c) && (
                  <circle
                    cx={x + CELL / 2}
                    cy={y + CELL / 2}
                    r={CELL * 0.32}
                    fill="var(--accent)"
                    opacity={0.30}
                    className="mk-pulse"
                    pointerEvents="none"
                  />
                )}
                {isSelected && (
                  <rect
                    x={x + 1}
                    y={y + 1}
                    width={CELL - 2}
                    height={CELL - 2}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    pointerEvents="none"
                  />
                )}
                {isError && (
                  <rect
                    x={x + 1}
                    y={y + 1}
                    width={CELL - 2}
                    height={CELL - 2}
                    fill="var(--bad)"
                    opacity={0.35}
                    pointerEvents="none"
                    className="mk-error-flash"
                  />
                )}
                {isPromoFlash && (
                  <rect
                    x={x + 1}
                    y={y + 1}
                    width={CELL - 2}
                    height={CELL - 2}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    pointerEvents="none"
                    className="mk-promo-flash"
                  />
                )}
              </g>
            );
          }),
        )}

        {fileLabels.map((label, i) => {
          const x = PAD + i * CELL + CELL / 2;
          return (
            <g key={`file-${i}`}>
              <text
                x={x}
                y={PAD - 8}
                textAnchor="middle"
                fontSize={11}
                fill="var(--board-coord)"
                fontFamily="'Noto Serif', Georgia, serif"
              >
                {label}
              </text>
              <text
                x={x}
                y={H - PAD + 16}
                textAnchor="middle"
                fontSize={11}
                fill="var(--board-coord)"
                fontFamily="'Noto Serif', Georgia, serif"
              >
                {label}
              </text>
            </g>
          );
        })}

        {rankLabels.map((label, i) => {
          const y = PAD + i * CELL + CELL / 2 + 3;
          return (
            <g key={`rank-${i}`}>
              <text
                x={PAD - 10}
                y={y}
                textAnchor="middle"
                fontSize={11}
                fill="var(--board-coord)"
                fontFamily="'Noto Serif', Georgia, serif"
              >
                {label}
              </text>
              <text
                x={W - PAD + 10}
                y={y}
                textAnchor="middle"
                fontSize={11}
                fill="var(--board-coord)"
                fontFamily="'Noto Serif', Georgia, serif"
              >
                {label}
              </text>
            </g>
          );
        })}

        {renderedPieces.map((p) => {
          const { x, y } = squareCenter(p.row, p.col, flipped);
          return (
            <g
              key={p.id}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transformBox: "fill-box",
                transformOrigin: "center",
                transition,
                filter: "url(#mkPieceShadow)",
              }}
            >
              <PieceSilhouette type={p.type} side={p.side} size={PIECE_SIZE} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
