/** Alle Tribes im BG-Modus (Stand 2026). */
export type Tribe =
  | "Beasts"
  | "Mechs"
  | "Demons"
  | "Dragons"
  | "Undead"
  | "Nagasy"
  | "Elementals"
  | "Quilboar"
  | "Murlocs"
  | "Pirates"
  | "All";

export const ALL_TRIBES = [
  "Beasts",
  "Mechs",
  "Demons",
  "Dragons",
  "Undead",
  "Nagasy",
  "Elementals",
  "Quilboar",
  "Murlocs",
  "Pirates",
  "All",
] as const;

export type Tier = "S" | "A" | "B" | "C" | "D";

/** MMR-Bucket für differenzierte Bewertung. */
export type MMRBucket = "low" | "mid" | "high";

export interface TribeRating {
  tribe: Tribe;
  tier: Tier;
  reason: string;
}

export interface Anomaly {
  id: string;
  name: string;
  description: string;
  strongTribes: TribeRating[];
  weakTribes: Tribe[];
  patch: string;
  /** Optionale MMR-spezifische Notizen. */
  mmrNotes?: Partial<Record<MMRBucket, string>>;
  notes?: string;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  favoredTribes: Tribe[];
  topFourRate?: number;
  topOneRate?: number;
  tier: Tier;
  patch: string;
  notes?: string;
}