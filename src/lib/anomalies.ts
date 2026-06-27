import type { Anomaly } from "./types";

/**
 * Kuratierte Anomalie-Matrix für Patch 27.6 (Juni 2026).
 *
 * Bewertungs-Schema:
 * - S = Auto-Pick-Anomalie für diesen Tribe (Meta-definierend)
 * - A = stark, in den meisten Lobbys Top-Pick
 * - B = solide, situationsabhängig
 * - C = durchschnittlich, nur spielen wenn andere Wahl schlechter
 *
 * MMR-Buckets:
 * - low = BGS 0-4000 (Bronze bis Gold)
 * - mid = BGS 4000-7000 (Platin bis Diamond)
 * - high = BGS 7000+ (Legend aufwärts)
 *
 * Pflege: manuell nach jedem Patch + HSReplay-Kreuzvalidierung.
 */
export const ANOMALIES: Anomaly[] = [
  // ---- Top-Tier Anomalien ----
  {
    id: "anomaly-vengeful-spirits",
    name: "Vengeful Spirits",
    description: "Wenn ein befreundetes Minion stirbt, erhält ein zufälliges Minion +1/+1.",
    strongTribes: [
      { tribe: "Undead", tier: "S", reason: "Reborn-Mechanik vervielfacht den Buff-Trigger" },
      { tribe: "Demons", tier: "A", reason: "Sacrifice-Pool skaliert extrem" },
    ],
    weakTribes: ["Dragons", "Nagasy"],
    patch: "27.6",
    mmrNotes: {
      mid: "Hohe Contest-Rate. Mid-MMR hat meist 1-2 Demons-Spieler.",
      high: "Top-Spieler pivoten spät — Anomalie erkannt, Undead lockt sich.",
    },
    notes: "Sehr stark mit Sacrifice-Comp-Mechaniken. Lesen erforderlich.",
  },
  {
    id: "anomaly-arcane-fortune",
    name: "Arcane Fortune",
    description: "Am Spielstart bietet jeder Shop-Roll 1 zusätzliches Minion.",
    strongTribes: [
      { tribe: "Beasts", tier: "S", reason: "Mehr Triple-Chancen auf Tier-1/2-Starter" },
      { tribe: "Murlocs", tier: "A", reason: "Frühe Murloc-Tribe-Triples deutlich häufiger" },
      { tribe: "All", tier: "A", reason: "Boost für jeden Comp der auf frühen Triples basiert" },
    ],
    weakTribes: ["Pirates"],
    patch: "27.6",
    notes: "S-Tier-Anomalie. Generell extrem stark, fast immer Auto-Pick.",
  },
  {
    id: "anomaly-bloodsail-cannoneer",
    name: "Bloodsail Cannoneer",
    description: "Pirate-Tribe-Karten kosten (1) weniger und haben +1/+1.",
    strongTribes: [
      { tribe: "Pirates", tier: "S", reason: "Direkter Tribe-Bonus — Pirates sind Auto-Pick" },
    ],
    weakTribes: ["Mechs", "Elementals", "Nagasy"],
    patch: "27.6",
    notes: "Auto-Pick für Pirates. Sehr hohe Contest-Rate.",
    mmrNotes: {
      low: "Pirates oft unter-spielt in low MMR → weniger Contest.",
      high: "Top-MMR hat 2-3 Pirates-Spieler pro Lobby fast garantiert.",
    },
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
    notes: "Auto-Pick für Elementals. Combos mit Elemental-Quests.",
  },

  // ---- Mid-Tier Anomalien ----
  {
    id: "anomaly-minion-mishaps",
    name: "Minion Mishaps",
    description: "Zufällige Minions werden am Spielstart zu Goldenen Versionen.",
    strongTribes: [
      { tribe: "All", tier: "B", reason: "Boost für jeden Comp, der mit Board-Strength läuft" },
    ],
    weakTribes: [],
    patch: "27.6",
    notes: "Guter generischer Boost, keine Comp-Wahl nötig. RNG-abhängig.",
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
    notes: "Stark aber Matchup-abhängig. Board-Order wird wichtiger.",
  },
  {
    id: "anomaly-golden-arena",
    name: "Golden Arena",
    description: "Beim Start der nächsten Runde wird das stärkste Minion golden.",
    strongTribes: [
      { tribe: "Mechs", tier: "A", reason: "Magnetize-Synergie mit goldenem Minion" },
      { tribe: "Dragons", tier: "A", reason: "Buff-Tribe skaliert mit goldenem Träger" },
    ],
    weakTribes: [],
    patch: "27.6",
  },
  {
    id: "anomaly-fortune-favor",
    name: "Fortune Favors",
    description: "Spieler mit 3+ Gold am Zugende erhalten 1 zusätzliches Gold.",
    strongTribes: [
      { tribe: "Nagasy", tier: "B", reason: "Spellsynergie skaliert mit Gold-Reserve" },
      { tribe: "Mechs", tier: "B", reason: "Triple-Strategie profitiert von Gold-Stacking" },
    ],
    weakTribes: ["All"],
    patch: "27.6",
    notes: "Generell stark für Tempo-Comp. Schwach für Aggro-Comp.",
  },

  // ---- Spezialisierte / Situative Anomalien ----
  {
    id: "anomaly-dragons-hoard",
    name: "Dragon's Hoard",
    description: "Spieler mit Drachen-Bonus erhalten am Zugende ein Tier-1-Minion.",
    strongTribes: [
      { tribe: "Dragons", tier: "A", reason: "Skaliert linear mit Dragon-Board" },
    ],
    weakTribes: ["Quilboar", "Pirates"],
    patch: "27.6",
    notes: "Comp-locked. Nur spielen wenn eh Dragons-Plan.",
  },
  {
    id: "anomaly-mech-inheritance",
    name: "Mech Inheritance",
    description: "Tode von Mechs spawnen Mini-Mechs (1/1).",
    strongTribes: [
      { tribe: "Mechs", tier: "A", reason: "Board-Snowball-Effekt" },
    ],
    weakTribes: [],
    patch: "27.6",
    notes: "Stark mit Reborn-Comp-Synergien.",
  },
  {
    id: "anomaly-undead-ritual",
    name: "Undead Ritual",
    description: "Alle Undead-Tribe-Karten starten mit +1/+1 und Reborn.",
    strongTribes: [
      { tribe: "Undead", tier: "S", reason: "Auto-Pick für Undead-Comp" },
    ],
    weakTribes: ["Dragons"],
    patch: "27.6",
    notes: "Sehr comp-locked. High-MMR hat Contest.",
  },
  {
    id: "anomaly-portal-power",
    name: "Portal Power",
    description: "Discover-Resultate haben +1/+1.",
    strongTribes: [
      { tribe: "All", tier: "B", reason: "Generischer Boost, gut mit Discover-heavy Comp" },
    ],
    weakTribes: [],
    patch: "27.6",
    notes: "Skaliert mit Discover-Häufigkeit. Triple-Comp profitiert.",
  },
  {
    id: "anomaly-spell-burst",
    name: "Spell Burst",
    description: "Erste Spell-Cast pro Runde kostenlos.",
    strongTribes: [
      { tribe: "Nagasy", tier: "A", reason: "Spam-Comp skaliert massiv" },
    ],
    weakTribes: [],
    patch: "27.6",
    notes: "Comp-locked aber stark wenn Nagasy.",
  },
  {
    id: "anomaly-quilboar-buff",
    name: "Quilboar Blessing",
    description: "Quilboar mit Bleed-Verzauberung erhalten +1/+1 pro Bleed-Stack.",
    strongTribes: [
      { tribe: "Quilboar", tier: "A", reason: "Bleed-Comp skaliert linear" },
    ],
    weakTribes: ["Pirates"],
    patch: "27.6",
  },
  {
    id: "anomaly-blood-moon",
    name: "Blood Moon",
    description: "Wenn Spieler auf 1 HP sind, sind alle Minions golden und unsterblich (1 Runde).",
    strongTribes: [
      { tribe: "Demons", tier: "B", reason: "Low-HP-Pivot-Comp ermöglicht" },
      { tribe: "All", tier: "B", reason: "Comeback-Mechanik, situativ" },
    ],
    weakTribes: [],
    patch: "27.6",
    notes: "Comeback-Anomalie. Bringt Spieler mit 1 HP zurück ins Spiel.",
  },
];

export function getAllAnomalies(): Anomaly[] {
  return [...ANOMALIES].sort((a, b) => a.name.localeCompare(b.name));
}

export function getAnomaliesForTribe(tribe: string): Anomaly[] {
  return ANOMALIES.filter(
    (a) => a.strongTribes.some((st) => st.tribe === tribe) || a.weakTribes.includes(tribe as never)
  );
}

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