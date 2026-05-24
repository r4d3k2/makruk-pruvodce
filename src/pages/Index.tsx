import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MakrukBoard } from "../components/makruk/MakrukBoard";
import { Pill } from "../components/makruk/Pill";
import { ThemeSwitcher } from "../components/makruk/ThemeSwitcher";
import { PieceCard } from "../components/makruk/PieceCard";
import { PieceQuiz } from "../components/makruk/PieceQuiz";
import { ResultCard } from "../components/makruk/ResultCard";
import { Stars } from "../components/makruk/Stars";
import { STRATEGIES } from "../data/strategies";
import { PIECES } from "../data/pieces";
import { GAMES, boardFromSetup } from "../data/games";
import {
  applyMovesUpTo,
  moveLabel,
  moveSide,
  pieceTraceUpTo,
  squareName,
  type Coord,
  type Side,
  type Board,
} from "../lib/makruk";
import {
  applyTheme,
  loadPlayerSide,
  loadProgress,
  loadTheme,
  recordResult,
  savePlayerSide,
  starsFromMistakes,
  progressKey,
  type ThemeId,
  type Progress,
} from "../lib/storage";
import { recommend } from "../lib/recommend";

type Mode = "study" | "practice" | "pieces" | "games";
type Tab = "strategy" | "history" | "move";
type GameTab = "topic" | "move" | "result";
type PiecesView = "cards" | "quiz";

const PROMO_FLASH_MS = 700;

const OPPONENT_DELAY_MS = 700;

interface PracticeState {
  mistakes: number;
  hintLevel: 0 | 1 | 2;
  selected: Coord | null;
  errorSquare: Coord | null;
  done: boolean;
  /** True while the 700ms opponent-reply timer is running. */
  opponentThinking: boolean;
}

const INITIAL_PRACTICE: PracticeState = {
  mistakes: 0,
  hintLevel: 0,
  selected: null,
  errorSquare: null,
  done: false,
  opponentThinking: false,
};

function findNextVariant(
  strategyId: string,
  variantId: string | null,
): { strategyId: string; variantId: string } | null {
  const sIdx = STRATEGIES.findIndex((s) => s.id === strategyId);
  if (sIdx < 0) return null;
  const strategy = STRATEGIES[sIdx];
  if (variantId) {
    const vIdx = strategy.variants.findIndex((v) => v.id === variantId);
    if (vIdx >= 0 && vIdx + 1 < strategy.variants.length) {
      return {
        strategyId,
        variantId: strategy.variants[vIdx + 1].id,
      };
    }
  }
  for (let i = sIdx + 1; i < STRATEGIES.length; i++) {
    if (STRATEGIES[i].variants.length > 0) {
      return {
        strategyId: STRATEGIES[i].id,
        variantId: STRATEGIES[i].variants[0].id,
      };
    }
  }
  return null;
}

export function Index() {
  const [theme, setThemeState] = useState<ThemeId>(() => loadTheme());
  const [playerSide, setPlayerSideState] = useState<Side>(() => loadPlayerSide());
  const [mode, setMode] = useState<Mode>("study");
  const [strategyId, setStrategyId] = useState<string>(STRATEGIES[0].id);
  const [variantId, setVariantId] = useState<string | null>(
    STRATEGIES[0].variants[0]?.id ?? null,
  );
  const [moveIndex, setMoveIndex] = useState<number>(-1);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [tab, setTab] = useState<Tab>("strategy");
  const [gameTab, setGameTab] = useState<GameTab>("topic");
  const [gameId, setGameId] = useState<string>(GAMES[0].id);
  const [piecesView, setPiecesView] = useState<PiecesView>("cards");
  const [practice, setPractice] = useState<PracticeState>(INITIAL_PRACTICE);
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [promoFlash, setPromoFlash] = useState<Coord | null>(null);

  const opponentTimerRef = useRef<number | null>(null);
  const errorTimerRef = useRef<number | null>(null);
  const promoTimerRef = useRef<number | null>(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Clear any pending timers on unmount.
  useEffect(() => {
    return () => {
      if (opponentTimerRef.current) {
        window.clearTimeout(opponentTimerRef.current);
      }
      if (errorTimerRef.current) {
        window.clearTimeout(errorTimerRef.current);
      }
      if (promoTimerRef.current) {
        window.clearTimeout(promoTimerRef.current);
      }
    };
  }, []);

  const currentStrategy = useMemo(
    () => STRATEGIES.find((s) => s.id === strategyId) ?? STRATEGIES[0],
    [strategyId],
  );

  const currentVariant = useMemo(() => {
    if (!variantId) return null;
    return currentStrategy.variants.find((v) => v.id === variantId) ?? null;
  }, [currentStrategy, variantId]);

  const currentGame = useMemo(
    () => GAMES.find((g) => g.id === gameId) ?? GAMES[0],
    [gameId],
  );

  // Pick which "track" we're showing on the board: a strategy variant
  // (study/practice) or an instructional game (games mode).
  const activeMoves =
    mode === "games" ? currentGame.moves : currentVariant?.moves ?? [];
  const activeStart: Board | undefined = useMemo(() => {
    if (mode === "games" && currentGame.setup) {
      return boardFromSetup(currentGame.setup);
    }
    return undefined;
  }, [mode, currentGame]);

  const board = useMemo(
    () => applyMovesUpTo(activeMoves, moveIndex, activeStart),
    [activeMoves, moveIndex, activeStart],
  );
  const pieces = useMemo(
    () => pieceTraceUpTo(activeMoves, moveIndex, activeStart),
    [activeMoves, moveIndex, activeStart],
  );

  const currentMove = moveIndex >= 0 ? activeMoves[moveIndex] : null;
  const fromHighlight = currentMove
    ? { row: currentMove.from[0], col: currentMove.from[1] }
    : null;
  const toHighlight = currentMove
    ? { row: currentMove.to[0], col: currentMove.to[1] }
    : null;

  // ===== Promotion blink =====
  useEffect(() => {
    if (promoTimerRef.current) {
      window.clearTimeout(promoTimerRef.current);
      promoTimerRef.current = null;
    }
    if (currentMove?.promotes) {
      setPromoFlash({ row: currentMove.to[0], col: currentMove.to[1] });
      promoTimerRef.current = window.setTimeout(() => {
        setPromoFlash(null);
        promoTimerRef.current = null;
      }, PROMO_FLASH_MS);
    } else {
      setPromoFlash(null);
    }
    // We intentionally depend on moveIndex + activeMoves identity (changing the
    // variant/game resets the track and clears the flash).
  }, [moveIndex, activeMoves, currentMove]);

  // ===== Practice helpers =====

  const resetPractice = useCallback(() => {
    if (opponentTimerRef.current) {
      window.clearTimeout(opponentTimerRef.current);
      opponentTimerRef.current = null;
    }
    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
    setMoveIndex(-1);
    setPractice(INITIAL_PRACTICE);
  }, []);

  // When mode switches, or strategy/variant/side changes, reset practice.
  // If playerSide === "black", schedule the white opponent to play move 0
  // automatically after 700 ms so the user always reacts to the first move.
  useEffect(() => {
    if (mode !== "practice") return;
    setFlipped(playerSide === "black");
    resetPractice();
    if (playerSide === "black") {
      setPractice((p) => ({ ...p, opponentThinking: true }));
      opponentTimerRef.current = window.setTimeout(() => {
        opponentTimerRef.current = null;
        setMoveIndex(0);
        setPractice((p) => ({ ...p, opponentThinking: false }));
      }, OPPONENT_DELAY_MS);
    }
  }, [mode, strategyId, variantId, playerSide, resetPractice]);

  const handleSetPlayerSide = useCallback(
    (side: Side) => {
      if (side === playerSide) return;
      savePlayerSide(side);
      setPlayerSideState(side);
    },
    [playerSide],
  );

  const nextMoveIndex = moveIndex + 1;
  const nextMove =
    mode === "practice" && nextMoveIndex < activeMoves.length
      ? activeMoves[nextMoveIndex]
      : null;
  const userTurn =
    mode === "practice" &&
    !practice.done &&
    !practice.opponentThinking &&
    !!nextMove &&
    moveSide(nextMoveIndex) === playerSide;

  const playOpponent = useCallback(() => {
    setMoveIndex((prevIdx) => {
      const next = prevIdx + 1;
      if (next >= activeMoves.length) return prevIdx;
      return next;
    });
    setPractice((p) => ({ ...p, opponentThinking: false }));
  }, [activeMoves.length]);

  const scheduleOpponent = useCallback(() => {
    setPractice((p) => ({ ...p, opponentThinking: true }));
    opponentTimerRef.current = window.setTimeout(() => {
      opponentTimerRef.current = null;
      playOpponent();
    }, OPPONENT_DELAY_MS);
  }, [playOpponent]);

  // After moveIndex advances during practice, check if the variant is done
  // and persist the result.
  useEffect(() => {
    if (mode !== "practice") return;
    if (activeMoves.length === 0) return;
    if (moveIndex !== activeMoves.length - 1) return;
    if (practice.done) return;
    if (!currentVariant) return;
    setPractice((p) => ({ ...p, done: true, opponentThinking: false }));
    const entry = recordResult(strategyId, currentVariant.id, practice.mistakes);
    setProgress((prev) => ({
      ...prev,
      [progressKey(strategyId, currentVariant.id)]: entry,
    }));
  }, [
    mode,
    moveIndex,
    activeMoves.length,
    practice.done,
    practice.mistakes,
    currentVariant,
    strategyId,
  ]);

  const flashError = useCallback((row: number, col: number) => {
    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
    }
    setPractice((p) => ({
      ...p,
      errorSquare: { row, col },
      mistakes: p.mistakes + 1,
    }));
    errorTimerRef.current = window.setTimeout(() => {
      errorTimerRef.current = null;
      setPractice((p) => ({ ...p, errorSquare: null }));
    }, 450);
  }, []);

  const handleBoardClick = useCallback(
    (row: number, col: number) => {
      if (mode !== "practice") return;
      if (!userTurn || !nextMove) return;
      const fromR = nextMove.from[0];
      const fromC = nextMove.from[1];
      const toR = nextMove.to[0];
      const toC = nextMove.to[1];

      if (practice.selected === null) {
        if (row === fromR && col === fromC) {
          setPractice((p) => ({ ...p, selected: { row, col } }));
        } else {
          flashError(row, col);
        }
        return;
      }

      // Already have a selected square.
      if (row === practice.selected.row && col === practice.selected.col) {
        // Click again on selected square — deselect, no penalty.
        setPractice((p) => ({ ...p, selected: null }));
        return;
      }

      if (row === toR && col === toC) {
        // Correct destination.
        setPractice((p) => ({ ...p, selected: null }));
        setMoveIndex((i) => i + 1);
        // After applying user's move, schedule opponent reply (if exists).
        const opponentIdx = nextMoveIndex + 1;
        if (opponentIdx < activeMoves.length) {
          scheduleOpponent();
        }
      } else {
        // Wrong destination — keep selection, flash error.
        flashError(row, col);
      }
    },
    [
      mode,
      userTurn,
      nextMove,
      practice.selected,
      flashError,
      nextMoveIndex,
      activeMoves.length,
      scheduleOpponent,
    ],
  );

  const cycleHint = useCallback(() => {
    setPractice((p) => ({
      ...p,
      hintLevel: ((p.hintLevel + 1) % 3) as 0 | 1 | 2,
    }));
  }, []);

  // ===== Selectors / handlers =====

  const handleSetStrategy = (id: string) => {
    if (id === strategyId) return;
    setStrategyId(id);
    const s = STRATEGIES.find((x) => x.id === id);
    setVariantId(s?.variants[0]?.id ?? null);
    setMoveIndex(-1);
    setTab("strategy");
    if (mode === "practice") resetPractice();
  };

  const handleSetVariant = (id: string) => {
    setVariantId(id);
    setMoveIndex(-1);
    if (mode === "practice") resetPractice();
  };

  const handleSetGame = (id: string) => {
    if (id === gameId) return;
    setGameId(id);
    setMoveIndex(-1);
    setGameTab("topic");
  };

  const goStart = () => setMoveIndex(-1);
  const goBack = () => setMoveIndex((i) => Math.max(-1, i - 1));
  const goForward = () =>
    setMoveIndex((i) => Math.min(activeMoves.length - 1, i + 1));
  const goEnd = () => setMoveIndex(activeMoves.length - 1);

  const handleSetMode = (m: Mode) => {
    if (m === "games") {
      setMode("games");
      setMoveIndex(-1);
      setGameTab("topic");
      return;
    }
    setMode(m);
  };

  const handleNextVariant = () => {
    if (!currentVariant) return;
    const next = findNextVariant(strategyId, currentVariant.id);
    if (!next) return;
    setStrategyId(next.strategyId);
    setVariantId(next.variantId);
  };

  const hasNextVariant = currentVariant
    ? !!findNextVariant(strategyId, currentVariant.id)
    : false;

  // Smart recommendation in Practice mode.
  const recommendation = useMemo(() => {
    if (mode !== "practice") return null;
    const excludeKey = currentVariant
      ? progressKey(strategyId, currentVariant.id)
      : undefined;
    return recommend(progress, excludeKey);
  }, [mode, strategyId, currentVariant, progress]);

  const handleRecommend = () => {
    if (!recommendation) return;
    setStrategyId(recommendation.strategyId);
    setVariantId(recommendation.variantId);
    // resetPractice will be triggered by the useEffect on strategy/variant change.
  };

  // ===== Move-tab content =====

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

  const gameTabContent = () => {
    if (gameTab === "topic") {
      return (
        <p style={{ color: "var(--text-soft)", lineHeight: 1.6 }}>
          {currentGame.description}
        </p>
      );
    }
    if (gameTab === "result") {
      return (
        <div>
          <div
            className="font-display"
            style={{
              fontSize: 17,
              marginBottom: 8,
              color: "var(--accent)",
            }}
          >
            Výsledek
          </div>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.6 }}>
            {currentGame.result}
          </p>
        </div>
      );
    }
    // gameTab === "move"
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
        Klikni „Vpřed ▶" pro první tah partie.
      </p>
    );
  };

  // ===== Practice hints (compute hintSquare/hintToSquare) =====

  const hintFrom: Coord | null =
    mode === "practice" && userTurn && nextMove && practice.hintLevel >= 1
      ? { row: nextMove.from[0], col: nextMove.from[1] }
      : null;
  const hintTo: Coord | null =
    mode === "practice" && userTurn && nextMove && practice.hintLevel >= 2
      ? { row: nextMove.to[0], col: nextMove.to[1] }
      : null;

  const practiceEntry =
    currentVariant && progress[progressKey(strategyId, currentVariant.id)];

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
          onClick={() => handleSetMode("practice")}
        >
          <span aria-hidden>🎯</span> Procvičovat
        </Pill>
        <Pill
          level={1}
          active={mode === "pieces"}
          onClick={() => handleSetMode("pieces")}
        >
          <span aria-hidden>♟</span> Figury
        </Pill>
        <Pill
          level={1}
          active={mode === "games"}
          onClick={() => handleSetMode("games")}
        >
          <span aria-hidden>📜</span> Partie
        </Pill>
      </nav>

      {/* PRACTICE: side toggle */}
      {mode === "practice" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          <Pill
            level={2}
            active={playerSide === "white"}
            onClick={() => handleSetPlayerSide("white")}
          >
            <span aria-hidden>♙</span> Hraj za bílého
          </Pill>
          <Pill
            level={2}
            active={playerSide === "black"}
            onClick={() => handleSetPlayerSide("black")}
          >
            <span aria-hidden>♟</span> Hraj za černého
          </Pill>
        </div>
      )}

      {/* PRACTICE: smart recommendation button */}
      {mode === "practice" && recommendation && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Pill ghost onClick={handleRecommend}>
            🎯 Doporučit slabé místo
          </Pill>
        </div>
      )}

      {/* GAMES: game selector */}
      {mode === "games" && (
        <section style={{ marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {GAMES.map((g) => (
              <Pill
                key={g.id}
                level={2}
                active={g.id === gameId}
                onClick={() => handleSetGame(g.id)}
                title={g.topic}
              >
                {g.title}
              </Pill>
            ))}
          </div>
        </section>
      )}

      {/* STUDY / PRACTICE: strategy + variant selectors */}
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
              {currentStrategy.variants.map((v) => {
                const entry = progress[progressKey(strategyId, v.id)];
                return (
                  <Pill
                    key={v.id}
                    level={3}
                    active={v.id === variantId}
                    onClick={() => handleSetVariant(v.id)}
                    title={v.description}
                  >
                    {v.name}
                    {entry && (
                      <span
                        style={{
                          marginLeft: 4,
                          display: "inline-flex",
                          verticalAlign: "middle",
                        }}
                      >
                        <Stars count={entry.stars} size={11} />
                      </span>
                    )}
                  </Pill>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* BOARD (study, practice, games) */}
      {(mode === "study" || mode === "practice" || mode === "games") && (
        <>
          <div className="board-wrap" style={{ marginBottom: 12 }}>
            <MakrukBoard
              board={board}
              pieces={pieces}
              flipped={flipped}
              fromHighlight={
                mode === "study" || mode === "games" ? fromHighlight : null
              }
              toHighlight={
                mode === "study" || mode === "games" ? toHighlight : null
              }
              selectedSquare={mode === "practice" ? practice.selected : null}
              errorSquare={mode === "practice" ? practice.errorSquare : null}
              hintSquare={hintFrom}
              hintToSquare={hintTo}
              promoFlashSquare={promoFlash}
              onCellClick={
                mode === "practice" && userTurn ? handleBoardClick : undefined
              }
            />
          </div>

          {/* NAVIGATION (study and games) */}
          {(mode === "study" || mode === "games") && (
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
                disabled={moveIndex >= activeMoves.length - 1}
              >
                Vpřed ▶
              </Pill>
              <Pill
                square
                onClick={goEnd}
                disabled={moveIndex >= activeMoves.length - 1}
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

          {/* PRACTICE controls */}
          {mode === "practice" && currentVariant && !practice.done && (() => {
            const userColor = playerSide === "white" ? "bílý" : "černý";
            const oppColor = playerSide === "white" ? "černý" : "bílý";
            const isFinal = moveIndex + 1 >= activeMoves.length;
            const playsLabel = practice.opponentThinking
              ? `soupeř (${oppColor})`
              : userTurn
              ? `vy (${userColor})`
              : isFinal
              ? "—"
              : `soupeř (${oppColor})`;
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                    flexWrap: "wrap",
                    marginTop: 12,
                    marginBottom: 10,
                  }}
                >
                  <Pill onClick={cycleHint} ghost>
                    💡 Nápověda ({practice.hintLevel}/2)
                  </Pill>
                  <Pill onClick={resetPractice} ghost>
                    ↺ Začít znovu
                  </Pill>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginBottom: 12,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  Chyby: <strong style={{ color: "var(--text)" }}>{practice.mistakes}</strong>
                  {" | "}
                  Tah:{" "}
                  <strong style={{ color: "var(--text)" }}>
                    {moveIndex + 1}/{activeMoves.length}
                  </strong>
                  {" | "}
                  Hraje:{" "}
                  <strong style={{ color: "var(--text)" }}>{playsLabel}</strong>
                </div>
              </>
            );
          })()}

          {/* Move counter (study) */}
          {mode === "study" && currentVariant && (
            <div
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 12,
              }}
            >
              Tah {moveIndex + 1} / {activeMoves.length}
            </div>
          )}

          {/* Game info (difficulty + move counter) */}
          {mode === "games" && (
            <div
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 12,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Obtížnost:{" "}
              <span style={{ color: "var(--accent)" }}>
                {"★".repeat(currentGame.difficulty)}
                <span style={{ opacity: 0.4 }}>
                  {"☆".repeat(5 - currentGame.difficulty)}
                </span>
              </span>{" "}
              · Tah {moveIndex + 1}/{activeMoves.length}
            </div>
          )}

          {/* RESULT card on done (practice) */}
          {mode === "practice" && currentVariant && practice.done && (
            <ResultCard
              stars={starsFromMistakes(practice.mistakes)}
              mistakes={practice.mistakes}
              totalMoves={activeMoves.length}
              hasNextVariant={hasNextVariant}
              onRetry={resetPractice}
              onNextVariant={handleNextVariant}
            />
          )}

          {/* TAB panel (study + practice — strategy/history/move) */}
          {(mode === "study" || mode === "practice") && currentVariant && (
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

          {/* TAB panel (games — topic/move/result) */}
          {mode === "games" && (
            <div className="surface" style={{ padding: 16, marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid var(--border-soft)",
                  marginBottom: 12,
                }}
              >
                <button
                  className={`tab ${gameTab === "topic" ? "is-active" : ""}`}
                  onClick={() => setGameTab("topic")}
                >
                  Téma
                </button>
                <button
                  className={`tab ${gameTab === "move" ? "is-active" : ""}`}
                  onClick={() => setGameTab("move")}
                >
                  Tah
                </button>
                {moveIndex + 1 >= activeMoves.length && activeMoves.length > 0 && (
                  <button
                    className={`tab ${gameTab === "result" ? "is-active" : ""}`}
                    onClick={() => setGameTab("result")}
                  >
                    Konec
                  </button>
                )}
              </div>
              <div style={{ fontSize: 15 }}>{gameTabContent()}</div>
            </div>
          )}

          {/* History entry for the active variant (study) */}
          {mode === "study" && practiceEntry && (
            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "var(--text-muted)",
                marginBottom: 8,
              }}
            >
              Z procvičování: <Stars count={practiceEntry.stars} size={12} />
              {" · "}
              {practiceEntry.plays}× zahráno
            </div>
          )}
        </>
      )}

      {/* PIECES mode */}
      {mode === "pieces" && (
        <section>
          <div
            style={{
              display: "flex",
              gap: 6,
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Pill
              level={2}
              active={piecesView === "cards"}
              onClick={() => setPiecesView("cards")}
            >
              Karty
            </Pill>
            <Pill
              level={2}
              active={piecesView === "quiz"}
              onClick={() => setPiecesView("quiz")}
            >
              Kvíz
            </Pill>
          </div>
          {piecesView === "cards" ? (
            <div>
              {PIECES.map((p) => (
                <PieceCard key={p.type} piece={p} />
              ))}
            </div>
          ) : (
            <PieceQuiz />
          )}
        </section>
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
        {mode === "pieces"
          ? "Figury · " + (piecesView === "cards" ? "Karty" : "Kvíz")
          : mode === "games"
          ? `Partie · ${currentGame.title}`
          : `${currentStrategy.name}${
              currentVariant ? ` · ${currentVariant.name}` : ""
            }`}
      </footer>
    </div>
  );
}
