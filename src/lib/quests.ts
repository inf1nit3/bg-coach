import type { Quest } from "./types";

/**
 * Initial kuratierte Quest Tier-List.
 *
 * Stand: Patch 27.6 (Juni 2026).
 * Winrates sind grobe Schätzungen basierend auf Community-Konsens + HSReplay-Snapshots.
 */
export const QUESTS: Quest[] = [
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
    id: "quest-bloodlust",
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
    description: "Kaufe 15 Tavern-Tavern-Rolls. Belohnung: Entdecke goldenes Tier-6.",
    favoredTribes: ["All"],
    topFourRate: 55,
    topOneRate: 14,
    tier: "A",
    patch: "27.6",
    notes: "Sehr stark wenn man eh roll-heavy spielt.",
  },
  {
    id: "quest-elemental-elements",
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
    description: "Spiele 5 Mech-Tribe-Karten. Belohnung: Alle Mechs haben +2/+2.",
    favoredTribes: ["Mechs"],
    topFourRate: 48,
    topOneRate: 11,
    tier: "B",
    patch: "27.6",
  },
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
    notes: "Zu langsam in Patch 27.6 — Triple-Comp ist gedroppt.",
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
];

export function getAllQuests(): Quest[] {
  return [...QUESTS].sort((a, b) => {
    const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
    return tierOrder[a.tier] - tierOrder[b.tier];
  });
}