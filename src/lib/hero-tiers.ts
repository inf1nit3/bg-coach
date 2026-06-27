import type { Tribe } from "./types";

/**
 * Hero Tier-Liste für Patch 27.6 (Juni 2026).
 *
 * Kuratiert nach Community-Konsens (Reddit r/BobsTavern, HSReplay Public,
 * Top-MMR-Discord-BG-Coach).
 *
 * MMR-Buckets:
 * - low = BGS 0-4000 (Bronze-Gold)
 * - mid = BGS 4000-7000 (Platin-Diamond)
 * - high = BGS 7000+ (Legend+)
 *
 * Tier-Bewertung:
 * - S = Meta-definierend, Auto-Pick
 * - A = stark in den meisten Lobbys
 * - B = solide, situationsabhängig
 * - C = durchschnittlich
 * - D = schwach, vermeiden
 */

export interface HeroTierRating {
  tribe: Tribe | "All";
  tier: "S" | "A" | "B" | "C" | "D";
  reason: string;
}

export interface HeroTierEntry {
  /** Slug wie in der BGKnowHow-DB (id-Feld). */
  heroId: string;
  /** Tier-Bewertung pro MMR-Bucket. */
  mmrRatings: Partial<Record<"low" | "mid" | "high", HeroTierRating[]>>;
  /** Globale Top-4-Rate (%). */
  topFourRate?: number;
  /** Globale Top-1-Rate (%). */
  topOneRate?: number;
  /** Optionale MMR-spezifische Notizen. */
  mmrNotes?: Partial<Record<"low" | "mid" | "high", string>>;
  /** Pflege-Datum. */
  lastReviewed: string;
  /** Patch-Stand. */
  patch: string;
  notes?: string;
}

/**
 * Tier-Liste für die Top 20 Heroes (Patch 27.6).
 *
 * Quelle: r/BobsTavern Tier-Liste + eigene Top-MMR-Erfahrung.
 * Winrates sind grobe Schätzungen aus HSReplay-Public-Snapshots.
 */
export const HERO_TIERS: HeroTierEntry[] = [
  // ---- S-Tier ----
  {
    heroId: "BG24_HERO_100", // Sire Denathrius
    mmrRatings: {
      low: [{ tribe: "All", tier: "S", reason: "Stats-Bonus skaliert linear, kein Skill erforderlich" }],
      mid: [{ tribe: "All", tier: "S", reason: "Meta-definierend, hohe Contest-Rate" }],
      high: [{ tribe: "All", tier: "S", reason: "Top-Spieler kennen Limit, Contest extrem" }],
    },
    topFourRate: 64,
    topOneRate: 22,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Auto-Pick wenn verfügbar. Lobbys ohne ihn sind deutlich einfacher.",
  },
  {
    heroId: "TB_BaconShop_HERO_18", // Patches the Pirate
    mmrRatings: {
      low: [{ tribe: "All", tier: "A", reason: "Free-Rerolls gut, aber Spam-fähig nur bei Tempo" }],
      mid: [{ tribe: "Pirates", tier: "S", reason: "Pirates-Comp trifft sich auf freie Rerolls" }],
      high: [{ tribe: "All", tier: "A", reason: "Tempo-Skill erforderlich, optimal mit Anomalie-Boost" }],
    },
    topFourRate: 58,
    topOneRate: 18,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Comp-locked für volle Stärke. Free-Rerolls skalieren mit Aggression.",
  },
  {
    heroId: "BG21_HERO_030", // Sneed
    mmrRatings: {
      low: [{ tribe: "Mechs", tier: "A", reason: "Mech-Comp skaliert mit Tier-Discover" }],
      mid: [{ tribe: "Mechs", tier: "S", reason: "Auto-Pick für Mech-Comp" }],
      high: [{ tribe: "Mechs", tier: "A", reason: "Contest hoch, kennen die Limit" }],
    },
    topFourRate: 60,
    topOneRate: 17,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Comp-locked. Mech-Meta passt zu Bloodeggs-Anomalie.",
  },

  // ---- A-Tier ----
  {
    heroId: "BG25_HERO_105", // E.T.C., Band Manager
    mmrRatings: {
      low: [{ tribe: "All", tier: "A", reason: "Buddy-Bonus stackt linear" }],
      mid: [{ tribe: "All", tier: "A", reason: "Tempo-freundlich, Buddy-Boards skalieren" }],
      high: [{ tribe: "All", tier: "A", reason: "Top-Spieler nutzen Comp-Flexibilität" }],
    },
    topFourRate: 55,
    topOneRate: 15,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Generisch stark. Buddy-Boards skalieren mit Board-Quality.",
  },
  {
    heroId: "TB_BaconShop_HERO_28", // Death Speaker Anthia (removed from pool — not in heroes.ts)
    mmrRatings: {
      low: [{ tribe: "Undead", tier: "C", reason: "removed from pool" }],
      mid: [{ tribe: "Undead", tier: "C", reason: "removed from pool" }],
      high: [{ tribe: "Undead", tier: "C", reason: "removed from pool" }],
    },
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "removed from pool",
  },
  {
    heroId: "TB_BaconShop_HERO_35", // Yogg-Saron, Hope's End
    mmrRatings: {
      low: [{ tribe: "All", tier: "B", reason: "RNG-abhängig, schwer zu planen" }],
      mid: [{ tribe: "All", tier: "A", reason: "Mid-MMR hat Glück oft" }],
      high: [{ tribe: "All", tier: "B", reason: "High-MMR skipt RNG-Heroes, Contest niedrig" }],
    },
    topFourRate: 53,
    topOneRate: 13,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "RNG-abhängig. Power-Spikes wenn Buddy-Comp stimmt.",
  },
  {
    heroId: "TB_BaconShop_HERO_16", // A.F. Kay
    mmrRatings: {
      low: [{ tribe: "All", tier: "A", reason: "T3-Minions am Start sind stark" }],
      mid: [{ tribe: "All", tier: "A", reason: "Skaliert mit Comp-Wahl aus T3-Pool" }],
      high: [{ tribe: "All", tier: "A", reason: "Top-MMR kennt alle T3-Minions" }],
    },
    topFourRate: 52,
    topOneRate: 13,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Comp-flexibel. Stärke hängt davon ab welche T3-Minions angeboten werden.",
  },
  {
    heroId: "BG26_HERO_104", // Rock Master Voone
    mmrRatings: {
      low: [{ tribe: "All", tier: "B", reason: "Tribal-Swap für Low-MMR komplex" }],
      mid: [{ tribe: "All", tier: "A", reason: "Mid-MMR versteht Swap-Mechanik" }],
      high: [{ tribe: "All", tier: "A", reason: "Hohe Skill-Expression" }],
    },
    topFourRate: 53,
    topOneRate: 14,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Skill-intensive. Erfordert Game-Sense wann geswappt wird.",
  },
  {
    heroId: "TB_BaconShop_HERO_50", // Tess Greymane
    mmrRatings: {
      low: [{ tribe: "All", tier: "B", reason: "Discover-Planning für Low-MMR schwer" }],
      mid: [{ tribe: "All", tier: "A", reason: "Discover-Combos gut in Mid" }],
      high: [{ tribe: "All", tier: "A", reason: "Hohe Skill-Expression, Contest hoch" }],
    },
    topFourRate: 51,
    topOneRate: 12,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Skill-basiert. Hohe Deckspace erforderlich.",
  },

  // ---- B-Tier ----
  {
    heroId: "BG22_HERO_200", // Ini Stormcoil
    mmrRatings: {
      low: [{ tribe: "Mechs", tier: "B", reason: "Mech-Comp OK, aber nicht comp-definierend" }],
      mid: [{ tribe: "Mechs", tier: "B", reason: "Solides Mech-Support" }],
      high: [{ tribe: "Mechs", tier: "B", reason: "Bekannt, nicht broken" }],
    },
    topFourRate: 48,
    topOneRate: 11,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Comp-locked Mech. Mid-tier.",
  },
  {
    heroId: "TB_BaconShop_HERO_49", // Millhouse Manastorm
    mmrRatings: {
      low: [{ tribe: "All", tier: "C", reason: "Hoher Gold-Verlust riskant für Low-MMR" }],
      mid: [{ tribe: "All", tier: "B", reason: "Comp-Player kompensieren mit Tempo" }],
      high: [{ tribe: "All", tier: "B", reason: "Wird in High-MMR kaum gepickt" }],
    },
    topFourRate: 47,
    topOneRate: 11,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Hohe Skill-Expression. Anfänger-Risiko.",
  },
  {
    heroId: "TB_BaconShop_HERO_94", // Tickatus
    mmrRatings: {
      low: [{ tribe: "Demons", tier: "B", reason: "Demons-Comp skaliert mit Stats" }],
      mid: [{ tribe: "Demons", tier: "B", reason: "Comp-Support für Demons" }],
      high: [{ tribe: "Demons", tier: "B", reason: "Comp-locked Mid-Tier" }],
    },
    topFourRate: 49,
    topOneRate: 12,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Comp-locked. Solid nicht broken.",
  },
  {
    heroId: "TB_BaconShop_HERO_42", // Elise Starseeker
    mmrRatings: {
      low: [{ tribe: "All", tier: "B", reason: "Discover-Stacking OK" }],
      mid: [{ tribe: "All", tier: "B", reason: "Tempo-freundlich" }],
      high: [{ tribe: "All", tier: "B", reason: "Bekannt aber nicht meta" }],
    },
    topFourRate: 48,
    topOneRate: 11,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Discover-Comp. Mid-tier.",
  },
  {
    heroId: "TB_BaconShop_HERO_33", // The Curator
    mmrRatings: {
      low: [{ tribe: "All", tier: "B", reason: "Free-Tier-1 OK" }],
      mid: [{ tribe: "All", tier: "B", reason: "Solides Budget" }],
      high: [{ tribe: "All", tier: "C", reason: "Zu langsam für High-MMR" }],
    },
    topFourRate: 46,
    topOneRate: 10,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Tempo-Hero. Low-MMR stärker, High-MMR schwächer.",
  },

  // ---- C/D-Tier ----
  {
    heroId: "TB_BaconShop_HERO_14", // Queen Wagtoggle
    mmrRatings: {
      low: [{ tribe: "All", tier: "C", reason: "Situationsabhängig" }],
      mid: [{ tribe: "All", tier: "C", reason: "Skill-intensive" }],
      high: [{ tribe: "All", tier: "C", reason: "Nicht im aktuellen Meta" }],
    },
    topFourRate: 44,
    topOneRate: 9,
    lastReviewed: "2026-06-27",
    patch: "27.6",
    notes: "Mid-tier. Wagtoggle nicht mehr auto-pick.",
  },
];

/** Alle Top-Heroes nach Tier (S > A > B > C > D). */
export function getHeroTiers(): HeroTierEntry[] {
  const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
  return [...HERO_TIERS].sort((a, b) => {
    const aTier = a.mmrRatings.mid?.[0]?.tier ?? "C";
    const bTier = b.mmrRatings.mid?.[0]?.tier ?? "C";
    return tierOrder[aTier] - tierOrder[bTier];
  });
}

/** Tier-Entry für eine Hero-ID. */
export function getHeroTierEntry(heroId: string): HeroTierEntry | undefined {
  return HERO_TIERS.find((h) => h.heroId === heroId);
}