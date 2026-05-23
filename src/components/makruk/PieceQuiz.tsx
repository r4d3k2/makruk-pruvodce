import { useMemo, useState } from "react";
import { PIECES, type PieceInfo } from "../../data/pieces";
import { MoveDiagram } from "./MoveDiagram";
import { Pill } from "./Pill";
import { StaticPiece } from "./PieceSilhouettes";

type QuestionKind = "movement-to-name" | "name-to-silhouette";

interface Question {
  kind: QuestionKind;
  correctPieceType: string;
  /** 4 options, by piece type. */
  options: string[];
  /** Index of the correct answer within options. */
  correctIndex: number;
}

const QUESTION_COUNT = 10;

function shuffle<T>(array: T[]): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correct: PieceInfo, count: number): PieceInfo[] {
  const pool = PIECES.filter((p) => p.type !== correct.type);
  return shuffle(pool).slice(0, count);
}

function makeQuestion(): Question {
  const kind: QuestionKind = Math.random() < 0.5 ? "movement-to-name" : "name-to-silhouette";
  const correct = PIECES[Math.floor(Math.random() * PIECES.length)];
  const distractors = pickDistractors(correct, 3);
  const optionPieces = shuffle([correct, ...distractors]);
  const correctIndex = optionPieces.findIndex((p) => p.type === correct.type);
  return {
    kind,
    correctPieceType: correct.type,
    options: optionPieces.map((p) => p.type),
    correctIndex,
  };
}

function makeQuiz(): Question[] {
  return Array.from({ length: QUESTION_COUNT }, () => makeQuestion());
}

function feedbackForScore(score: number): string {
  if (score === QUESTION_COUNT) return "Perfektně! Všechny figury znáš dokonale.";
  if (score >= 8) return "Skvělé skóre. Pár drobností a budeš mít plný počet.";
  if (score >= 5) return "Dobré skóre. Karty figur se vyplatí ještě jednou projít.";
  return "Začátek je vždy nejtěžší — projdi si karty a zkus to znova.";
}

export function PieceQuiz() {
  const [seed, setSeed] = useState(0);
  const questions = useMemo<Question[]>(() => makeQuiz(), [seed]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[questionIndex];
  const correctPiece = PIECES.find((p) => p.type === current.correctPieceType)!;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 >= QUESTION_COUNT) {
      setDone(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setSeed((s) => s + 1);
  };

  if (done) {
    return (
      <div
        className="surface"
        style={{
          padding: 24,
          textAlign: "center",
        }}
      >
        <h2
          className="font-display"
          style={{ margin: 0, fontSize: 22, color: "var(--text)" }}
        >
          Kvíz dokončen
        </h2>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "var(--accent)",
            margin: "12px 0 6px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {score} / {QUESTION_COUNT}
        </div>
        <p
          style={{
            color: "var(--text-muted)",
            fontStyle: "italic",
            margin: "0 0 18px",
          }}
        >
          {feedbackForScore(score)}
        </p>
        <Pill onClick={handleReset}>Zkusit znovu</Pill>
      </div>
    );
  }

  return (
    <div className="surface" style={{ padding: 18 }}>
      <div
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          textAlign: "center",
          marginBottom: 10,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Otázka {questionIndex + 1} z {QUESTION_COUNT} · skóre {score}
      </div>

      {current.kind === "movement-to-name" ? (
        <MovementQuestion correctPiece={correctPiece} />
      ) : (
        <NameQuestion correctPiece={correctPiece} />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 14,
        }}
      >
        {current.options.map((optType, idx) => {
          const optPiece = PIECES.find((p) => p.type === optType)!;
          const isCorrect = idx === current.correctIndex;
          const isSelected = idx === selected;
          const showAsCorrect = selected !== null && isCorrect;
          const showAsWrong = selected !== null && isSelected && !isCorrect;

          let bg = "var(--surface-2)";
          let border = "var(--border-soft)";
          let textColor = "var(--text)";
          if (showAsCorrect) {
            bg = "rgba(90, 138, 58, 0.18)";
            border = "var(--good)";
            textColor = "var(--good)";
          } else if (showAsWrong) {
            bg = "rgba(193, 74, 58, 0.18)";
            border = "var(--bad)";
            textColor = "var(--bad)";
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 12,
                padding:
                  current.kind === "name-to-silhouette" ? "12px 6px" : "10px 12px",
                cursor: selected === null ? "pointer" : "default",
                color: textColor,
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                minHeight: 64,
                transition: "background 0.18s ease, border-color 0.18s ease",
              }}
            >
              {current.kind === "movement-to-name" ? (
                <>
                  <span>{optPiece.csName}</span>
                  <span
                    className="font-thai"
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                    }}
                  >
                    {optPiece.thaiName}
                  </span>
                </>
              ) : (
                <StaticPiece type={optPiece.type} side="white" size={50} />
              )}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            background:
              selected === current.correctIndex
                ? "rgba(90, 138, 58, 0.10)"
                : "rgba(193, 74, 58, 0.10)",
            border: `1px solid ${
              selected === current.correctIndex ? "var(--good)" : "var(--bad)"
            }`,
            borderRadius: 10,
            fontSize: 14,
            color: "var(--text-soft)",
            textAlign: "center",
          }}
        >
          {selected === current.correctIndex ? (
            <span>
              Správně — <strong>{correctPiece.csName}</strong> ({correctPiece.thaiName}).
            </span>
          ) : (
            <span>
              Špatně. Správná odpověď: <strong>{correctPiece.csName}</strong> ({correctPiece.thaiName}).
            </span>
          )}
          <div style={{ marginTop: 10 }}>
            <Pill onClick={handleNext}>
              {questionIndex + 1 >= QUESTION_COUNT ? "Výsledek" : "Další ▶"}
            </Pill>
          </div>
        </div>
      )}
    </div>
  );
}

function MovementQuestion({ correctPiece }: { correctPiece: PieceInfo }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          margin: "0 0 10px",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 17,
          color: "var(--text)",
        }}
      >
        Která figura se hýbe takto?
      </p>
      <MoveDiagram
        diagram={correctPiece.diagrams[0]}
        parentPiece={correctPiece.type}
        hideCenter
        hideCaption
        cell={34}
      />
    </div>
  );
}

function NameQuestion({ correctPiece }: { correctPiece: PieceInfo }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          margin: 0,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 17,
          color: "var(--text)",
        }}
      >
        Jak vypadá{" "}
        <span style={{ color: "var(--accent)" }}>{correctPiece.csName}</span>?
      </p>
      <p
        className="font-thai"
        style={{
          fontSize: 16,
          color: "var(--text-muted)",
          margin: "4px 0 0",
        }}
      >
        {correctPiece.thaiName}
      </p>
    </div>
  );
}
