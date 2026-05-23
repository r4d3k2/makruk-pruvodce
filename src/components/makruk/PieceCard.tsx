import type { PieceInfo } from "../../data/pieces";
import { StaticPiece } from "./PieceSilhouettes";
import { MoveDiagram } from "./MoveDiagram";

interface Props {
  piece: PieceInfo;
}

export function PieceCard({ piece }: Props) {
  return (
    <article
      className="surface"
      style={{
        padding: 18,
        marginBottom: 16,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--surface-2)",
            borderRadius: 12,
            border: "1px solid var(--border-soft)",
          }}
        >
          <StaticPiece type={piece.type} side="white" size={60} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            className="font-display"
            style={{
              fontSize: 22,
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            {piece.csName}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginTop: 4,
              flexWrap: "wrap",
            }}
          >
            <span
              className="font-thai"
              style={{
                fontSize: 18,
                color: "var(--accent)",
              }}
            >
              {piece.thaiName}
            </span>
            {piece.thaiTransliteration && (
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  fontSize: 13,
                }}
              >
                ({piece.thaiTransliteration})
              </span>
            )}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              color: "var(--text-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            Hodnota: <strong style={{ color: "var(--text-soft)" }}>{piece.value}</strong>
            {" · "}
            Písmeno notace: <strong style={{ color: "var(--text-soft)" }}>{piece.letter}</strong>
          </div>
        </div>
      </header>

      <p
        style={{
          color: "var(--text-soft)",
          lineHeight: 1.55,
          margin: "0 0 14px",
        }}
      >
        {piece.movement}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {piece.diagrams.map((d, i) => (
          <MoveDiagram key={i} diagram={d} parentPiece={piece.type} />
        ))}
      </div>
    </article>
  );
}
