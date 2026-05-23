import { Pill } from "./Pill";
import { Stars } from "./Stars";

interface ResultCardProps {
  stars: 1 | 2 | 3;
  mistakes: number;
  totalMoves: number;
  hasNextVariant: boolean;
  onRetry: () => void;
  onNextVariant: () => void;
}

const FEEDBACK_BY_STARS: Record<1 | 2 | 3, string> = {
  3: "Perfektní výkon — žádná chyba, plný počet hvězdiček.",
  2: "Dobré! Pár drobností, ale variantu znáš.",
  1: "Hotovo. Variantu se vyplatí projít ještě jednou — tentokrát klidněji.",
};

export function ResultCard({
  stars,
  mistakes,
  totalMoves,
  hasNextVariant,
  onRetry,
  onNextVariant,
}: ResultCardProps) {
  return (
    <div
      className="surface"
      style={{
        padding: 24,
        textAlign: "center",
        marginBottom: 16,
      }}
    >
      <h2
        className="font-display"
        style={{
          margin: 0,
          fontSize: 22,
          color: "var(--text)",
        }}
      >
        Hotovo!
      </h2>

      <div style={{ margin: "14px 0 8px" }}>
        <Stars count={stars} size={32} />
      </div>

      <div
        style={{
          fontSize: 14,
          color: "var(--text-soft)",
          lineHeight: 1.55,
          marginBottom: 16,
        }}
      >
        <div>
          Chyby: <strong style={{ color: "var(--text)" }}>{mistakes}</strong>
          {" · "}
          Tahů zahráno:{" "}
          <strong style={{ color: "var(--text)" }}>{totalMoves}</strong>
        </div>
        <p
          style={{
            margin: "10px 0 0",
            fontStyle: "italic",
            color: "var(--text-muted)",
          }}
        >
          {FEEDBACK_BY_STARS[stars]}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <Pill onClick={onRetry}>Zkusit znovu</Pill>
        <Pill onClick={onNextVariant} disabled={!hasNextVariant}>
          Další varianta ▶
        </Pill>
      </div>
    </div>
  );
}
