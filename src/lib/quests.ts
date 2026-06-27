import type { Quest } from "./types";

/**
 * Kuratierte Quest Tier-List für Patch 27.6 (Juni 2026).
 *
 * Quellen:
 * - HSReplay.net Public Stats (Top-4/Top-1-Raten als Schätzung)
 * - Community-Konsens (Reddit r/BobsTavern, Discord-BG-Coach)
 * - Eigene Einschätzung aus Top-MMR-Spielen
 *
 * Pflege: nach jedem Patch manuell reviewen + mit HSReplay-Daten validieren.
 */
export const QUESTS: Quest[] = [
  // S-Tier
  {
    id: "quest-battlecry-bragging-rights",
    name: "Battlecry Bragging Rights",
    description: "Spiele 7 Battlecry-Karten. Belohnung: +2/+2 auf alle.",
    favoredTribes: ["Mechs", "Dragons"],
    topFourRate: 62,
    topOneRate: 18,
    tier: "S",
    patch: "27.6",
    notes: "Einer der stärksten Quests seit Release. Auto-Pick wenn verfügbar.",
  },
  {
    id: "quest-arcane-conduit",
    name: "Arcane Conduit",
    description: "Spawne 8 Naga-Spells. Belohnung: 2 freie Discovers pro Runde.",
    favoredTribes: ["Nagasy"],
    topFourRate: 60,
    topOneRate: 17,
    tier: "S",
    patch: "27.6",
    notes: "Comp-locked aber extrem stark. Auto-Pick wenn Nagasy-Plan.",
  },

  // A-Tier
  {
    id: "quest-apex-predator",
    name: "Apex Predator",
    description: "Greife 12-mal an. Belohnung: +3/+3 auf alle.",
    favoredTribes: ["Beasts", "Pirates"],
    topFourRate: 58,
    topOneRate: 16,
    tier: "A",
    patch: "27.6",
    notes: "Stark mit Minion-Buff-Strategien.",
  },
  {
    id: "quest-tavern-tourist",
    name: "Tavern Tourist",
    description: "Kaufe 15 Tavern-Rolls. Belohnung: Entdecke goldenes Tier-6.",
    favoredTribes: ["All"],
    topFourRate: 55,
    topOneRate: 14,
    tier: "A",
    patch: "27.6",
    notes: "Sehr stark wenn man eh roll-heavy spielt.",
  },
  {
    id: "quest-blood-rage",
    name: "Blood Rage",
    description: "Lass 6 Minions sterben. Belohnung: Alle Minions +2/+2 + DivShield.",
    favoredTribes: ["Demons", "Undead"],
    topFourRate: 54,
    topOneRate: 15,
    tier: "A",
    patch: "27.6",
    notes: "Comp-locked. Stark mit Sacrifice-Strats.",
  },

  // B-Tier
  {
    id: "quest-elemental-conduit",
    name: "Elemental Conduit",
    description: "Spiele 10 Elementals. Belohnung: Tavern-Tier-7-Minions.",
    favoredTribes: ["Elementals"],
    topFourRate: 52,
    topOneRate: 12,
    tier: "B",
    patch: "27.6",
    notes: "Comp-spezifisch — gut wenn man eh auf Elementals geht.",
  },
  {
    id: "quest-reborn-rite",
    name: "Reborn Rite",
    description: "Lass 5 Minions sterben. Belohnung: Alle Minions haben permanent Reborn.",
    favoredTribes: ["Undead"],
    topFourRate: 51,
    topOneRate: 13,
    tier: "B",
    patch: "27.6",
  },
  {
    id: "quest-magnetic-pull",
    name: "Magnetic Attraction",
    description: "Spiele 5 Mech-Karten. Belohnung: Alle Mechs haben +2/+2.",
    favoredTribes: ["Mechs"],
    topFourRate: 48,
    topOneRate: 11,
    tier: "B",
    patch: "27.6",
  },
  {
    id: "quest-discovery-master",
    name: "Discovery Master",
    description: "Nutze 8 Discovers. Belohnung: Alle Discovers kosten 0 Gold.",
    favoredTribes: ["All"],
    topFourRate: 49,
    topOneRate: 12,
    tier: "B",
    patch: "27.6",
    notes: "Generisch stark, gut mit Triple-Comp.",
  },

  // C-Tier
  {
    id: "quest-endless-tide",
    name: "Endless Tide",
    description: "Spiele 12 Murlocs. Belohnung: +1/+1 für jeden Murloc im Board.",
    favoredTribes: ["Murlocs"],
    topFourRate: 46,
    topOneRate: 10,
    tier: "C",
    patch: "27.6",
    notes: "Comp-locked — nur stark wenn eh Murloc-Run.",
  },
  {
    id: "quest-discovery-discover",
    name: "Triple Discovery",
    description: "Triple 3 Karten. Belohnung: Entdecke goldenes Tier-5.",
    favoredTribes: ["All"],
    topFourRate: 44,
    topOneRate: 9,
    tier: "C",
    patch: "27.6",
    notes: "Triple-Comp ist gedroppt in Patch 27.6.",
  },
  {
    id: "quest-card-trader",
    name: "Card Trader",
    description: "Verkaufe 8 Karten. Belohnung: 5 Gold pro Runde.",
    favoredTribes: ["All"],
    topFourRate: 42,
    topOneRate: 8,
    tier: "C",
    patch: "27.6",
  },
  {
    id: "quest-quilboar-armada",
    name: "Quilboar Armada",
    description: "Spiele 10 Quilboar mit Bleed. Belohnung: Alle Bleed-Stacks ×2.",
    favoredTribes: ["Quilboar"],
    topFourRate: 45,
    topOneRate: 10,
    tier: "C",
    patch: "27.6",
    notes: "Comp-locked. Quilboar-Buff-Stacking stark aber langsam.",
  },
  {
    id: "quest-dragon-roar",
    name: "Dragon Roar",
    description: "Spiele 8 Dragons. Belohnung: Alle Dragons +3/+3.",
    favoredTribes: ["Dragons"],
    topFourRate: 47,
    topOneRate: 11,
    tier: "B",
    patch: "27.6",
    notes: "Comp-locked. Dragons-Comp profitiert stark.",
  },
  {
    id: "quest-pirate-plunder",
    name: "Pirate Plunder",
    description: "Kaufe 10 Pirates. Belohnung: +2 Gold pro verkauftem Pirate.",
    favoredTribes: ["Pirates"],
    topFourRate: 44,
    topOneRate: 9,
    tier: "C",
    patch: "27.6",
  },
  {
    id: "quest-beast-bond",
    name: "Beast Bond",
    description: "Spiele 10 Beasts. Belohnung: Alle Beasts +1/+2.",
    favoredTribes: ["Beasts"],
    topFourRate: 46,
    topOneRate: 10,
    tier: "B",
    patch: "27.6",
  },
];

export function getAllQuests(): Quest[] {
  const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
  return [...QUESTS].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
}