import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Selection-pill hierarchy:
 *  - 1: mode tabs (strongest highlight)
 *  - 2: strategy category (medium highlight)
 *  - 3: specific variant (lightest highlight)
 *  Action buttons and navigation pills can omit this prop; an active
 *  state then falls back to level-1 styling. */
export type PillLevel = 1 | 2 | 3;

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  ghost?: boolean;
  square?: boolean;
  level?: PillLevel;
  children: ReactNode;
}

export function Pill({
  active,
  ghost,
  square,
  level,
  className = "",
  children,
  ...rest
}: PillProps) {
  const classes = [
    "pill",
    active ? "is-active" : "",
    ghost ? "is-ghost" : "",
    square ? "is-square" : "",
    level === 1 ? "is-l1" : "",
    level === 2 ? "is-l2" : "",
    level === 3 ? "is-l3" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
