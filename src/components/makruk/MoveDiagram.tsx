import type { PieceType, Side } from "../../lib/makruk";
import type { MoveDiagram as MoveDiagramData } from "../../data/pieces";
import { PieceSilhouette } from "./PieceSilhouettes";

interface Props {
  diagram: MoveDiagramData;
  parentPiece: PieceType;
  side?: Side;
  cell?: number;
  /** If true, the central piece silhouette is hidden and a "?" is shown — used by the quiz. */
  hideCenter?: boolean;
  /** Hide the optional caption (used in quiz so the text doesn't leak the answer). */
  hideCaption?: boolean;
}

const KIND_COLORS: Record<"move" | "blocked" | "capture", string> = {
  move: "var(--accent)",
  blocked: "var(--text-muted)",
  capture: "var(--bad)",
};

export function MoveDiagram({
  diagram,
  parentPiece,
  side = "white",
  cell = 30,
  hideCenter = false,
  hideCaption = false,
}: Props) {
  const pieceType = diagram.pieceType ?? parentPiece;
  const padding = 6;
  const width = diagram.cols * cell + padding * 2;
  const height = diagram.rows * cell + padding * 2;

  return (
    <div style={{ textAlign: "center" }}>
      {diagram.caption && !hideCaption && (
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            margin: "0 0 6px",
            fontStyle: "italic",
          }}
        >
          {diagram.caption}
        </p>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        style={{ display: "inline-block" }}
        role="img"
        aria-label={`Diagram pohybu pro ${parentPiece}`}
      >
        {/* squares */}
        {Array.from({ length: diagram.rows }).flatMap((_, r) =>
          Array.from({ length: diagram.cols }).map((_, c) => {
            const isDark = (r + c) % 2 === 1;
            return (
              <rect
                key={`${r}-${c}`}
                x={padding + c * cell}
                y={padding + r * cell}
                width={cell}
                height={cell}
                fill={isDark ? "var(--board-dark)" : "var(--board-light)"}
                stroke="var(--border-soft)"
                strokeWidth={0.5}
              />
            );
          }),
        )}

        {/* target indicators */}
        {diagram.targets.map((t, i) => {
          const cx = padding + t.col * cell + cell / 2;
          const cy = padding + t.row * cell + cell / 2;
          if (t.kind === "capture") {
            return (
              <g key={i}>
                <rect
                  x={padding + t.col * cell + 2}
                  y={padding + t.row * cell + 2}
                  width={cell - 4}
                  height={cell - 4}
                  fill="none"
                  stroke={KIND_COLORS.capture}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fill={KIND_COLORS.capture}
                  fontFamily="'Noto Serif', Georgia, serif"
                >
                  ×
                </text>
              </g>
            );
          }
          if (t.kind === "blocked") {
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={cell * 0.18}
                fill={KIND_COLORS.blocked}
                opacity={0.5}
              />
            );
          }
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={cell * 0.18}
              fill={KIND_COLORS.move}
            />
          );
        })}

        {/* central piece (or "?" placeholder for quiz) */}
        {hideCenter ? (
          <g>
            <circle
              cx={padding + diagram.pieceCol * cell + cell / 2}
              cy={padding + diagram.pieceRow * cell + cell / 2}
              r={cell * 0.32}
              fill="var(--surface-2)"
              stroke="var(--text-soft)"
              strokeWidth={1.5}
            />
            <text
              x={padding + diagram.pieceCol * cell + cell / 2}
              y={padding + diagram.pieceRow * cell + cell / 2 + cell * 0.14}
              textAnchor="middle"
              fontSize={cell * 0.5}
              fontFamily="'Playfair Display', Georgia, serif"
              fill="var(--text-soft)"
            >
              ?
            </text>
          </g>
        ) : (
          <g
            transform={`translate(${padding + diagram.pieceCol * cell + cell / 2}, ${
              padding + diagram.pieceRow * cell + cell / 2
            })`}
          >
            <PieceSilhouette type={pieceType} side={side} size={cell * 0.85} />
          </g>
        )}
      </svg>
    </div>
  );
}
