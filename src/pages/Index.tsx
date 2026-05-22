import { useEffect, useMemo, useState } from "react";
import { MakrukBoard } from "../components/makruk/MakrukBoard";
import { Pill } from "../components/makruk/Pill";
import { ThemeSwitcher } from "../components/makruk/ThemeSwitcher";
import { STRATEGIES } from "../data/strategies";
import {
  applyMovesUpTo,
  moveLabel,
  moveSide,
  pieceTraceUpTo,
  squareName,
} from "../lib/makruk";
import { applyTheme, loadTheme, type ThemeId } from "../lib/storage";

type Mode = "study" | "practice" | "pieces" | "games";
type Tab = "strategy" | "history" | "move";

export function Index() {
  const [theme, setThemeState] = useState<ThemeId>(() => loadTheme());
  const [mode, setMode] = useState<Mode>("study");
  const [strategyId, setStrategyId] = useState<string>(STRATEGIES[0].id);
  const [variantId, setVariantId] = useState<string | null>(
    STRATEGIES[0].variants[0]?.id ?? null,
  );
  const [moveIndex, setMoveIndex] = useState<number>(-1);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [tab, setTab] = useState<Tab>("strategy");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const currentStrategy = useMemo(
    () => STRATEGIES.find((s) => s.id === strategyId) ?? STRATEGIES[0],
    [strategyId],
  );

  const currentVariant = useMemo(() => {
    if (!variantId) return null;
    return currentStrategy.variants.find((v) => v.id === variantId) ?? null;
  }, [currentStrategy, variantId]);

  const currentMoves = currentVariant?.moves ?? [];
  const board = useMemo(
    () => applyMovesUpTo(currentMoves, moveIndex),
    [currentMoves, moveIndex],
  );
  const pieces = useMemo(
    () => pieceTraceUpTo(currentMoves, moveIndex),
    [currentMoves, moveIndex],
  );

  const currentMove = moveIndex >= 0 ? currentMoves[moveIndex] : null;
  const fromHighlight = currentMove
    ? { row: currentMove.from[0], col: currentMove.from[1] }
    : null;
  const toHighlight = currentMove
    ? { row: currentMove.to[0], col: currentMove.to[1] }
    : null;

  const handleSetStrategy = (id: string) => {
    if (id === strategyId) return;
    setStrategyId(id);
    const s = STRATEGIES.find((x) => x.id === id);
    setVariantId(s?.variants[0]?.id ?? null);
    setMoveIndex(-1);
    setTab("strategy");
  };

  const handleSetVariant = (id: string) => {
    setVariantId(id);
    setMoveIndex(-1);
  };

  const goStart = () => setMoveIndex(-1);
  const goBack = () => setMoveIndex((i) => Math.max(-1, i - 1));
  const goForward = () =>
    setMoveIndex((i) => Math.min(currentMoves.length - 1, i + 1));
  const goEnd = () => setMoveIndex(currentMoves.length - 1);

  const handleSetMode = (m: Mode) => {
    if (m === "practice" || m === "pieces" || m === "games") return;
    setMode(m);
  };

  const moveNotationStr = currentMove
    ? `${moveLabel(moveIndex)} ${squareName(
        currentMove.from[0],
        currentMove.from[1],
      )}–${squareName(currentMove.to[0], currentMove.to[1])}`
    : "";

  const tabContent = () => {
    if (tab === "strategy") {
      return (
        <p style={{ color: "var(--text-soft)", lineHeight: 1.6 }}>
          {currentStrategy.intro}
        </p>
      );
    }
    if (tab === "history") {
      return (
        <p style={{ color: "var(--text-soft)", lineHeight: 1.6 }}>
          {currentStrategy.history ?? "—"}
        </p>
      );
    }
    if (currentMove) {
      return (
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 13,
              marginBottom: 8,
              color: "var(--accent)",
            }}
          >
            {moveNotationStr}{" "}
            <span style={{ color: "var(--text-muted)" }}>
              · {moveSide(moveIndex) === "white" ? "bílý" : "černý"}
            </span>
          </div>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.6 }}>
            {currentMove.comment}
          </p>
        </div>
      );
    }
    return (
      <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
        Vyber tah pro zobrazení komentáře.
      </p>
    );
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "20px 20px 80px",
        width: "100%",
      }}
    >
      {/* HEADER */}
      <header style={{ textAlign: "center", marginBottom: 16 }}>
        <div className="app-title-th">หมากรุก · MAKRUK</div>
        <h1
          className="app-title-main"
          style={{ margin: "6px 0 12px", fontSize: 22 }}
        >
          Průvodce thajskými šachy
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ThemeSwitcher theme={theme} onChange={setThemeState} />
        </div>
      </header>

      {/* MODE PILLS */}
      <nav
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <Pill
          level={1}
          active={mode === "study"}
          onClick={() => handleSetMode("study")}
        >
          <span aria-hidden>📖</span> Studovat
        </Pill>
        <Pill
          level={1}
          active={mode === "practice"}
          disabled
          title="Připravujeme"
          onClick={() => handleSetMode("practice")}
        >
          <span aria-hidden>🎯</span> Procvičovat
        </Pill>
        <Pill
          level={1}
          active={mode === "pieces"}
          disabled
          title="Připravujeme"
          onClick={() => handleSetMode("pieces")}
        >
          <span aria-hidden>♟</span> Figury
        </Pill>
        <Pill
          level={1}
          active={mode === "games"}
          disabled
          title="Připravujeme"
          onClick={() => handleSetMode("games")}
        >
          <span aria-hidden>📜</span> Partie
        </Pill>
      </nav>

      {/* STRATEGY SELECTOR */}
      {(mode === "study" || mode === "practice") && (
        <section style={{ marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            {STRATEGIES.map((s) => (
              <Pill
                key={s.id}
                level={2}
                active={s.id === strategyId}
                onClick={() => handleSetStrategy(s.id)}
              >
                {s.name}
              </Pill>
            ))}
          </div>
          {/* VARIANT SELECTOR */}
          {currentStrategy.variants.length === 0 ? (
            <p
              style={{
                fontSize: 14,
                fontStyle: "italic",
                color: "var(--text-muted)",
                textAlign: "center",
                background: "var(--surface)",
                border: "1px solid var(--border-soft)",
                borderRadius: 12,
                padding: "8px 12px",
              }}
            >
              Připravujeme — zatím není k dispozici varianta této strategie.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {currentStrategy.variants.map((v) => (
                <Pill
                  key={v.id}
                  level={3}
                  active={v.id === variantId}
                  onClick={() => handleSetVariant(v.id)}
                  title={v.description}
                >
                  {v.name}
                </Pill>
              ))}
            </div>
          )}
        </section>
      )}

      {/* BOARD */}
      <div style={{ marginBottom: 12 }}>
        <MakrukBoard
          board={board}
          pieces={pieces}
          flipped={flipped}
          fromHighlight={fromHighlight}
          toHighlight={toHighlight}
        />
      </div>

      {/* NAV BUTTONS */}
      {currentVariant && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            flexWrap: "wrap",
            marginTop: 12,
            marginBottom: 16,
          }}
        >
          <Pill
            square
            onClick={goStart}
            disabled={moveIndex < 0}
            title="Začátek"
          >
            ⏮
          </Pill>
          <Pill
            square
            onClick={goBack}
            disabled={moveIndex < 0}
            title="Zpět"
          >
            ◀
          </Pill>
          <Pill
            onClick={goForward}
            disabled={moveIndex >= currentMoves.length - 1}
          >
            Vpřed ▶
          </Pill>
          <Pill
            square
            onClick={goEnd}
            disabled={moveIndex >= currentMoves.length - 1}
            title="Konec"
          >
            ⏭
          </Pill>
          <Pill
            square
            onClick={() => setFlipped((f) => !f)}
            title="Otočit desku"
          >
            🔄
          </Pill>
        </div>
      )}

      {/* Move counter */}
      {currentVariant && (
        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          Tah {moveIndex + 1} / {currentMoves.length}
        </div>
      )}

      {/* TABS */}
      {currentVariant && (
        <div className="surface" style={{ padding: 16, marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--border-soft)",
              marginBottom: 12,
            }}
          >
            <button
              className={`tab ${tab === "strategy" ? "is-active" : ""}`}
              onClick={() => setTab("strategy")}
            >
              Strategie
            </button>
            <button
              className={`tab ${tab === "history" ? "is-active" : ""}`}
              onClick={() => setTab("history")}
            >
              Historie
            </button>
            <button
              className={`tab ${tab === "move" ? "is-active" : ""}`}
              onClick={() => setTab("move")}
            >
              Tah
            </button>
          </div>
          <div style={{ fontSize: 15 }}>{tabContent()}</div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "var(--text-muted)",
          marginTop: 24,
        }}
      >
        {currentStrategy.name}
        {currentVariant ? ` · ${currentVariant.name}` : ""}
      </footer>
    </div>
  );
}
