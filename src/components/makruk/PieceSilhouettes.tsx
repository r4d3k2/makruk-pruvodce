import wk from "../../assets/pieces/wk.svg";
import wq from "../../assets/pieces/wq.svg";
import wb from "../../assets/pieces/wb.svg";
import wn from "../../assets/pieces/wn.svg";
import wr from "../../assets/pieces/wr.svg";
import wp from "../../assets/pieces/wp.svg";
import wpp from "../../assets/pieces/wpp.svg";
import bk from "../../assets/pieces/bk.svg";
import bq from "../../assets/pieces/bq.svg";
import bb from "../../assets/pieces/bb.svg";
import bn from "../../assets/pieces/bn.svg";
import br from "../../assets/pieces/br.svg";
import bp from "../../assets/pieces/bp.svg";
import bpp from "../../assets/pieces/bpp.svg";

import type { PieceType, Side } from "../../lib/makruk";

const URLS: Record<Side, Record<PieceType, string>> = {
  white: {
    K: wk,
    M: wq,
    B: wb,
    N: wn,
    R: wr,
    P: wp,
    "P+": wpp,
  },
  black: {
    K: bk,
    M: bq,
    B: bb,
    N: bn,
    R: br,
    P: bp,
    "P+": bpp,
  },
};

interface Props {
  type: PieceType;
  side: Side;
  /** Side length in SVG units. The silhouette is centered on (0, 0). */
  size: number;
}

/**
 * Renders a single makruk piece as an SVG <image> element, sized and centered
 * on (0, 0). Must be used INSIDE a parent <svg> (typically MakrukBoard).
 * Promoted pawns (P+) use a dedicated silhouette (Met-like dome with the
 * concentric rings of a Bia) — no rotation tricks.
 */
export function PieceSilhouette({ type, side, size }: Props) {
  const href = URLS[side][type];
  const half = size / 2;

  return (
    <g>
      <image
        href={href}
        x={-half}
        y={-half}
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: "none" }}
      />
    </g>
  );
}

/**
 * Stand-alone preview, used in piece cards. Renders inside its own SVG
 * with a transparent background.
 */
export function StaticPiece({
  type,
  side,
  size = 48,
}: {
  type: PieceType;
  side: Side;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <PieceSilhouette type={type} side={side} size={size * 0.95} />
    </svg>
  );
}
