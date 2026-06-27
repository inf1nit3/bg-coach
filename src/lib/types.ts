/**
 * Hearthstone Battlegrounds — core domain types
 */

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

/** Bewertung einer Synergie/Pick. S = Meta-definierend, A = stark, B = solide, C = durchschnittlich, D = schwach. */
export type Tier = "S" | "A" | "B" | "C" | "D";

/** Anomalie-Eintrag aus der Synergie-Matrix. */
export interface Anomaly {
  /** Eindeutige ID (z.B. "anomaly-bloodsail-cannoneer"). */
  id: string;
  /** Anzeige-Name wie im Spiel. */
  name: string;
  /** Kurzbeschreibung der Anomalie (was sie tut). */
  description: string;
  /** Tribes die mit dieser Anomalie besonders stark synergieren. */
  strongTribes: TribeRating[];
  /** Tribes die mit dieser Anomalie schwach laufen (vermeiden). */
  weakTribes: Tribe[];
  /** Patch in dem die Anomalie aktiv ist / war. */
  patch: string;
  /** Optionale Notizen für Spieler. */
  notes?: string;
}

export interface TribeRating {
  tribe: Tribe;
  tier: Tier;
  /** 1-Satz-Begründung warum. */
  reason: string;
}

/** Quest-Eintrag für die Tier-List. */
export interface Quest {
  id: string;
  name: string;
  description: string;
  /** Welche Tribes/Comps die Quest pusht. */
  favoredTribes: Tribe[];
  /** Grobe Winrate-Schätzung in % Top-4 (wenn verfügbar). */
  topFourRate?: number;
  /** Top-1-Rate in %. */
  topOneRate?: number;
  /** Gesamt-Tier. */
  tier: Tier;
  patch: string;
  notes?: string;
}