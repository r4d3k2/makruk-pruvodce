import type { Side } from "./makruk";

export type ThemeId = "thai-sunset" | "teak-day" | "midnight-teak";

const THEME_KEY = "makruk-theme";
const PROGRESS_KEY = "makruk-progress";
const PLAYER_SIDE_KEY = "makruk-player-side";
const DEFAULT_THEME: ThemeId = "thai-sunset";
const DEFAULT_PLAYER_SIDE: Side = "white";

const VALID_THEMES: ThemeId[] = ["thai-sunset", "teak-day", "midnight-teak"];

export function loadTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    if (raw && VALID_THEMES.includes(raw as ThemeId)) {
      return raw as ThemeId;
    }
  } catch {
    // ignore
  }
  return DEFAULT_THEME;
}

export function saveTheme(theme: ThemeId): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

export function applyTheme(theme: ThemeId): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

export function loadPlayerSide(): Side {
  if (typeof window === "undefined") return DEFAULT_PLAYER_SIDE;
  try {
    const raw = window.localStorage.getItem(PLAYER_SIDE_KEY);
    if (raw === "white" || raw === "black") return raw;
  } catch {
    // ignore
  }
  return DEFAULT_PLAYER_SIDE;
}

export function savePlayerSide(side: Side): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PLAYER_SIDE_KEY, side);
  } catch {
    // ignore
  }
}

export interface ProgressEntry {
  mistakes: number;
  stars: 1 | 2 | 3;
  plays: number;
  lastPlayedAt: number;
}

export type Progress = Record<string, ProgressEntry>;

export function progressKey(strategyId: string, variantId: string): string {
  return `${strategyId}/${variantId}`;
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as Progress;
  } catch {
    // ignore
  }
  return {};
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function starsFromMistakes(mistakes: number): 1 | 2 | 3 {
  if (mistakes === 0) return 3;
  if (mistakes <= 2) return 2;
  return 1;
}

export function recordResult(
  strategyId: string,
  variantId: string,
  mistakes: number,
): ProgressEntry {
  const progress = loadProgress();
  const key = progressKey(strategyId, variantId);
  const previous = progress[key];
  const stars = starsFromMistakes(mistakes);
  const entry: ProgressEntry = {
    mistakes,
    stars: previous && previous.stars > stars ? previous.stars : stars,
    plays: (previous?.plays ?? 0) + 1,
    lastPlayedAt: Date.now(),
  };
  progress[key] = entry;
  saveProgress(progress);
  return entry;
}
