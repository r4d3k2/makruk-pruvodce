export type ThemeId = "thai-sunset" | "teak-day" | "midnight-teak";

const THEME_KEY = "makruk-theme";
const DEFAULT_THEME: ThemeId = "thai-sunset";

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
