import { STRATEGIES } from "../data/strategies";
import { progressKey, type Progress } from "./storage";

export interface Recommendation {
  strategyId: string;
  variantId: string;
}

interface Candidate {
  strategyId: string;
  variantId: string;
  key: string;
  /** "1star" / "2star" / "unplayed" / "3star". Lower priority value = higher
   * urgency. We never recommend a 3-star variant unless nothing else is left. */
  tier: 0 | 1 | 2 | 3;
  mistakes: number;
}

/**
 * Pick the variant the user should practice next.
 *
 * Priority (lowest first = recommended first):
 *   tier 0: 1★ — most recent attempt was weakest
 *   tier 1: 2★
 *   tier 2: not yet played
 *   tier 3: 3★ (already mastered, recommended only as last resort)
 *
 * Within the same tier, the variant with the highest mistake count comes
 * first. `excludeKey` is the `strategyId/variantId` of the currently active
 * variant — if provided, that one is filtered out so the recommendation is
 * always something *different* to switch to.
 *
 * Returns null when every variant has 3★ (= nothing meaningful left to
 * recommend) — the UI uses that to hide / disable the recommend button.
 */
export function recommend(
  progress: Progress,
  excludeKey?: string,
): Recommendation | null {
  const candidates: Candidate[] = [];

  for (const s of STRATEGIES) {
    for (const v of s.variants) {
      const key = progressKey(s.id, v.id);
      if (excludeKey && key === excludeKey) continue;
      const entry = progress[key];

      let tier: 0 | 1 | 2 | 3;
      if (!entry) {
        tier = 2;
      } else if (entry.stars === 1) {
        tier = 0;
      } else if (entry.stars === 2) {
        tier = 1;
      } else {
        tier = 3;
      }

      candidates.push({
        strategyId: s.id,
        variantId: v.id,
        key,
        tier,
        mistakes: entry?.mistakes ?? 0,
      });
    }
  }

  // Drop the "everything is 3★" case so the caller can hide the button.
  const meaningful = candidates.filter((c) => c.tier < 3);
  if (meaningful.length === 0) return null;

  meaningful.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    return b.mistakes - a.mistakes;
  });

  const best = meaningful[0];
  return { strategyId: best.strategyId, variantId: best.variantId };
}
