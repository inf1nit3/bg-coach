import type { Anomaly } from "./types";

/**
 * Initial kuratierte Anomalie-Matrix.
 *
 * Stand: Patch 27.6 (Juni 2026).
 * Diese Liste wird manuell gepflegt + mit HSReplay-Daten gegengeprüft.
 *
 * Wichtig: Die Tier-Bewertung ist ein Spiel-Vorschlag, keine Garantie.
 */
export const ANOMALIES: Anomaly[] = [
  {
    id: "anomaly-vengeful-spirits",
    name: "Vengeful Spirits",
    description: "Wenn ein befreundetes Minion stirbt, erhält ein zufälliges Minion +1/+1.",
    strongTribes: [
      { tribe: "Undead", tier: "A", reason: "Reborn-Synergie stapelt sich mit Anomalie-Bonus" },
      { tribe: "Demons", tier: "A", reason: "Sacrificial-Pool skaliert extrem" },
    ],
    weakTribes: ["Dragons", "Nagasy"],
    patch: "27.6",
    notes: "Sehr stark mit Sacrifice-Comp-Mechaniken.",
  },
  {
    id: "anomaly-arcane-fortune",
    name: "Arcane Fortune",
    description: "Am Spielstart bietet jeder Tavern-Tier 1 zusätzliches Minion im Shop.",
    strongTribes: [
      { tribe: "Beasts", tier: "A", reason: "Mehr Triple-Chancen auf Tier-1/2-Starter" },
      { tribe: "Murlocs", tier: "A", reason: "Frühe Tribe-Triples werden häufiger" },
    ],
    weakTribes: ["Pirates"],
    patch: "27.6",
    notes: "Generell ein S-Tier-Anomalie für jeden Comp der auf frühen Triples basiert.",
  },
  {
    id: "anomaly-bloodsail-cannoneer",
    name: "Bloodsail Cannoneer",
    description: "Pirate-Tribe-Karten kosten (1) weniger und haben +1/+1.",
    strongTribes: [
      { tribe: "Pirates", tier: "S", reason: "Direkter Tribe-Bonus — Pirates werden S-Tier" },
    ],
    weakTribes: ["Mechs", "Elementals"],
    patch: "27.6",
    notes: "Auto-Pick-Anomalie für Pirates. Contest-Wahrscheinlichkeit hoch.",
  },
  {
    id: "anomaly-the-ceaseless-expanse",
    name: "The Ceaseless Expanse",
    description: "Elementals haben +2/+2 und spawnen nach Verkauf einen Elementar.",
    strongTribes: [
      { tribe: "Elementals", tier: "S", reason: "Elementals werden zum Top-Meta-Comp" },
    ],
    weakTribes: ["Quilboar", "Pirates"],
    patch: "27.6",
    notes: "Auto-Pick für Elementals.",
  },
  {
    id: "anomaly-minion-mishaps",
    name: "Minion Mishaps",
    description: "Zufällige Minions werden am Spielstart zu Goldenen Versionen.",
    strongTribes: [
      { tribe: "All", tier: "B", reason: "Boost für jeden Comp, der mit Board-Strength läuft" },
    ],
    weakTribes: [],
    patch: "27.6",
    notes: "Guter generischer Boost, keine Comp-Wahl nötig.",
  },
  {
    id: "anomaly-avenge-the-fallen",
    name: "Avenge the Fallen",
    description: "Beim Tod eines Minions wird sein Angriff auf ein anderes Minion übertragen.",
    strongTribes: [
      { tribe: "Demons", tier: "A", reason: "Sacrifice-Comp skaliert" },
      { tribe: "Undead", tier: "A", reason: "Reborn-Synergie verstärkt Effekt" },
    ],
    weakTribes: ["Dragons"],
    patch: "27.6",
  },
];

/** Holt alle Anomalien sortiert nach Name. */
export function getAllAnomalies(): Anomaly[] {
  return [...ANOMALIES].sort((a, b) => a.name.localeCompare(b.name));
}

/** Holt Anomalien die ein bestimmtes Tribe pushen. */
export function getAnomaliesForTribe(tribe: string): Anomaly[] {
  return ANOMALIES.filter((a) =>
    a.strongTribes.some((st) => st.tribe === tribe)
  );
}