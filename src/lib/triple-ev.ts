/**
 * Triple-EV Decision Helper.
 *
 * Das Tool hilft bei der Frage: "Ich habe ein Paar (2 Kopien vom selben Minion)
 * auf dem Board. Triple ich jetzt oder halte ich für Board-Strength / Triple
 * später?"
 *
 * Faktoren:
 * - Aktuelles Tavern-Tier (höher = teurer zu leveln, aber Discover-Tier ist besser)
 * - Triple-Belohnung: Discover-Pool auf Tier+1 (Standard) oder Tier+2 (Karmic/Blood-Gem)
 * - Anomalie-Modifier (manche Anomalien boosten Triple-Wert)
 * - Comp-Plan: tribe-locked vs flexibel
 * - Board-Power-Verlust: aktuelle Stats vs Triple-Belohnung
 *
 * Das Modell ist deterministisch und simpel — kein komplexes ML. Es liefert
 * eine Empfehlung mit EV-Schätzung, nicht eine Garantie.
 */

import type { Minion } from "./minions";

export interface TripleInput {
  /** Aktuelles Tavern-Tier. */
  tavernTier: number;
  /** Minion das getriplet werden soll. */
  pairMinion: Minion;
  /** Comp-Plan: tribe-locked = false → flexibel. */
  compTribeLocked: boolean;
  /** Anomalie die Triple boost (z.B. "Arcane Fortune" für Triple-freq). */
  anomalyBoostsTriple?: boolean;
  /** Trinket "Karmic" oder ähnlich das Discover-Tier um +1 erhöht. */
  discoverTierBonus?: number;
}

export interface TripleResult {
  /** Empfehlung. */
  recommendation: "TRIPLE" | "HOLD" | "TRIPLE_LATER";
  /** Erwarteter Mehrwert des Triples in board-stats (Angriff+Health-Delta). */
  evTriple: number;
  /** Erwarteter Mehrwert des Haltens (Board-Strength-Beitrag des Paars). */
  evHold: number;
  /** Differenz (positive = Triple besser). */
  delta: number;
  /** Discover-Tier bei Triple (Tier + 1, +2 mit Trinket). */
  discoverTier: number;
  /** 1-Satz-Begründung. */
  reason: string;
}

/**
 * Berechnet Triple-Empfehlung.
 *
 * Triple-Belohnung: Goldenes Minion mit +1/+1 über alle Kopien + Discover vom nächsthöheren Tier.
 * Vereinfachung: Wir schätzen den EV als
 *   EV_triple = (Golden-Stats + Discover-EV) − (Board-Strength-Verlust des Paars)
 *
 * Discover-EV ist eine grobe Schätzung basierend auf Tier (höheres Tier = stärkere Minions).
 */
export function computeTripleEV(input: TripleInput): TripleResult {
  const { tavernTier, pairMinion, compTribeLocked, anomalyBoostsTriple, discoverTierBonus = 0 } = input;

  const baseDiscoverTier = Math.min(7, tavernTier + 1);
  const discoverTier = Math.min(7, baseDiscoverTier + (discoverTierBonus ?? 0));

  // Board-Strength des Paars
  const pairStrength = pairMinion.attack + pairMinion.health;

  // Board-Strength-Beitrag entfällt beim Triple (das Paar verschwindet → goldenes Minion)
  const evHold = pairStrength; // Einfacher Wert

  // Triple: Golden-Stats + Discover-EV
  const goldenAttack = pairMinion.attack * 2 + 1;
  const goldenHealth = pairMinion.health * 2 + 1;
  const goldenStrength = goldenAttack + goldenHealth;

  // Discover-EV: grobe Schätzung pro Tier (höher = mehr Value)
  // T1: ~3 EV, T2: 5, T3: 7, T4: 10, T5: 13, T6: 16, T7: 20
  const discoverEV = [0, 3, 5, 7, 10, 13, 16, 20][discoverTier] ?? 20;

  // Comp-Flexibilität: wenn comp-locked, ist Discover wertvoller (kann zum Comp passen)
  const compMultiplier = compTribeLocked ? 1.0 : 0.7;

  // Anomalie-Boost (z.B. Arcane Fortune = mehr Triple-Rolls)
  const anomalyBonus = anomalyBoostsTriple ? 3 : 0;

  const evTriple = goldenStrength + discoverEV * compMultiplier + anomalyBonus;

  const delta = evTriple - evHold;

  let recommendation: TripleResult["recommendation"];
  let reason: string;

  if (delta >= 5) {
    recommendation = "TRIPLE";
    reason = `Triple bringt +${delta.toFixed(1)} EV. Discover auf T${discoverTier} liefert guten Comp-Fit.`;
  } else if (delta >= 0) {
    recommendation = "TRIPLE_LATER";
    reason = `Triple ist grenzwertig (+${delta.toFixed(1)} EV). Warte 1-2 Runden — wenn Discover-Tier steigt oder Board mehr leidet, triple.`;
  } else {
    recommendation = "HOLD";
    reason = `Hold bringt +${Math.abs(delta).toFixed(1)} EV mehr. Board braucht die Stats jetzt. Triple später wenn Comp-Plan klar.`;
  }

  // Wenn Pair-Strength klein ist, tendiere eher zu TRIPLE
  if (pairStrength < 6 && discoverTier >= 5) {
    recommendation = "TRIPLE";
    reason = `Pair ist schwach (${pairStrength} Stats). T${discoverTier}-Discover lohnt sich — Triple bringt Comp-Skalierung.`;
  }

  return {
    recommendation,
    evTriple,
    evHold,
    delta,
    discoverTier,
    reason,
  };
}

/**
 * Erkennt Paare im Board.
 *
 * Gibt zurück: Liste von (minionId, copies) für alle Minions mit 2+ Kopien.
 */
export interface BoardPair {
  minion: Minion;
  copies: number;
}

export function detectPairs(
  board: Array<{ minionId: string; copies: number }>,
  minions: Minion[]
): BoardPair[] {
  const pairs: BoardPair[] = [];
  for (const entry of board) {
    if (entry.copies >= 2) {
      const m = minions.find((mm) => mm.id === entry.minionId);
      if (m && !m.isToken) {
        pairs.push({ minion: m, copies: entry.copies });
      }
    }
  }
  return pairs;
}