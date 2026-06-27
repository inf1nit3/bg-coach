import type { Tribe } from "./types";

/**
 * Battlegrounds-Minion Database — handkuratiert für Patch 27.6 (Juni 2026).
 *
 * TODO: durch HearthstoneJSON ersetzen sobald API-Quelle gefunden.
 *
 * Felder:
 * - id: Eindeutige ID (Name-Slug)
 * - name: Anzeige-Name
 * - tier: Tavern-Tier (1-6)
 * - attack/health: Basis-Stats
 * - tribes: Welche Tribes das Minion triggert (kann mehrere haben)
 * - poolSize: Anzahl Kopien im Gesamt-Pool pro Spieler-Slot (8 Spieler = 7 Kopien pro Tier × Spieler)
 *
 * poolSize-Regel (Standard BG):
 * - Tier 1: 16 Kopien total (2 pro Spieler × 8 Spieler)
 * - Tier 2: 15 Kopien
 * - Tier 3: 13 Kopien
 * - Tier 4: 11 Kopien
 * - Tier 5: 9 Kopien
 * - Tier 6: 7 Kopien
 *
 * Diese Größen sind die "sichtbaren" Kopien im Pool. Triangulation
 * berechnet den Rest-Pool aus Drafts/Sells.
 */

export interface Minion {
  id: string;
  name: string;
  tier: 1 | 2 | 3 | 4 | 5 | 6;
  attack: number;
  health: number;
  tribes: Tribe[];
  poolSize: number;
  /** Optionale Notiz zu Comp-Relevanz. */
  note?: string;
}

export const MINION_POOL_SIZE: Record<number, number> = {
  1: 16,
  2: 15,
  3: 13,
  4: 11,
  5: 9,
  6: 7,
};

export const MINIONS: Minion[] = [
  // Tier 1
  { id: "alleycat", name: "Alleycat", tier: 1, attack: 1, health: 1, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[1], note: "Token-Spawn, Triple-fähig" },
  { id: "deck-swabbie", name: "Deck Swabbie", tier: 1, attack: 1, health: 1, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[1] },
  { id: "dragonspawn-lieutenant", name: "Dragonspawn Lieutenant", tier: 1, attack: 1, health: 2, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[1] },
  { id: "fiendish-servant", name: "Fiendish Servant", tier: 1, attack: 2, health: 1, tribes: ["Demons"], poolSize: MINION_POOL_SIZE[1] },
  { id: "mecharoo", name: "Mecharoo", tier: 1, attack: 1, health: 1, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[1], note: "Deathrattle: spawnt Jo-E Bot" },
  { id: "micro-machine", name: "Micro Machine", tier: 1, attack: 1, health: 2, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[1] },
  { id: "murloc-tidehunter", name: "Murloc Tidehunter", tier: 1, attack: 1, health: 2, tribes: ["Murlocs"], poolSize: MINION_POOL_SIZE[1] },
  { id: "red-whelp", name: "Red Whelp", tier: 1, attack: 1, health: 2, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[1] },
  { id: "rockpool-hunter", name: "Rockpool Hunter", tier: 1, attack: 2, health: 1, tribes: ["Murlocs"], poolSize: MINION_POOL_SIZE[1] },
  { id: "righteous-protector", name: "Righteous Protector", tier: 1, attack: 1, health: 1, tribes: ["All"], poolSize: MINION_POOL_SIZE[1], note: "DivShield" },
  { id: "scallywag", name: "Scallywag", tier: 1, attack: 2, health: 1, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[1] },
  { id: "spawn-of-nzoth", name: "Spawn of N'Zoth", tier: 1, attack: 2, health: 2, tribes: ["All"], poolSize: MINION_POOL_SIZE[1] },
  { id: "sun-bacon-relaxer", name: "Sun-Bacon Relaxer", tier: 1, attack: 1, health: 2, tribes: ["Quilboar"], poolSize: MINION_POOL_SIZE[1] },
  { id: "vuljin-hivemind", name: "Vul'jin Hivemind", tier: 1, attack: 2, health: 2, tribes: ["All"], poolSize: MINION_POOL_SIZE[1] },

  // Tier 2
  { id: "bloodsail-cannoneer", name: "Bloodsail Cannoneer", tier: 2, attack: 2, health: 2, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[2] },
  { id: "cave-hydra", name: "Cave Hydra", tier: 2, attack: 2, health: 4, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[2] },
  { id: "deflect-o-bot", name: "Deflect-o-Bot", tier: 2, attack: 3, health: 2, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[2] },
  { id: "faceless-disciple", name: "Faceless Disciple", tier: 2, attack: 2, health: 3, tribes: ["All"], poolSize: MINION_POOL_SIZE[2] },
  { id: "freedealing-gambler", name: "Freedealing Gambler", tier: 2, attack: 3, health: 3, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[2] },
  { id: "glyph-guardian", name: "Glyph Guardian", tier: 2, attack: 3, health: 3, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[2] },
  { id: "harvest-golem", name: "Harvest Golem", tier: 2, attack: 2, health: 3, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[2] },
  { id: "kindly-grandmother", name: "Kindly Grandmother", tier: 2, attack: 1, health: 1, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[2] },
  { id: "metaltooth-leaper", name: "Metaltooth Leaper", tier: 2, attack: 3, health: 3, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[2] },
  { id: "nathrezim-overseer", name: "Nathrezim Overseer", tier: 2, attack: 2, health: 3, tribes: ["Demons"], poolSize: MINION_POOL_SIZE[2] },
  { id: "old-murk-eye", name: "Old Murk-Eye", tier: 2, attack: 2, health: 4, tribes: ["Murlocs"], poolSize: MINION_POOL_SIZE[2] },
  { id: "palescale-crocolisk", name: "Palescale Crocolisk", tier: 2, attack: 2, health: 3, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[2] },
  { id: "prophet-of-the-boar", name: "Prophet of the Boar", tier: 2, attack: 3, health: 3, tribes: ["Quilboar"], poolSize: MINION_POOL_SIZE[2] },
  { id: "ripped-sailor", name: "Ripped Sailor", tier: 2, attack: 2, health: 1, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[2] },
  { id: "soul-juggler", name: "Soul Juggler", tier: 2, attack: 3, health: 3, tribes: ["Demons"], poolSize: MINION_POOL_SIZE[2] },
  { id: "toxic-rein-forger", name: "Toxic Rein-forger", tier: 2, attack: 3, health: 3, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[2] },

  // Tier 3
  { id: "arcane-cannon", name: "Arcane Cannon", tier: 3, attack: 4, health: 3, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[3] },
  { id: "banana-bunch", name: "Banana Bunch", tier: 3, attack: 2, health: 2, tribes: ["All"], poolSize: MINION_POOL_SIZE[3] },
  { id: "bronze-warden", name: "Bronze Warden", tier: 3, attack: 2, health: 1, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[3], note: "DivShield + Reborn" },
  { id: "cobalt-scalebane", name: "Cobalt Scalebane", tier: 3, attack: 5, health: 5, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[3] },
  { id: "crackling-cyclone", name: "Crackling Cyclone", tier: 3, attack: 4, health: 1, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[3] },
  { id: "deep-sea-glider", name: "Deep Sea Glider", tier: 3, attack: 4, health: 4, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[3] },
  { id: "hateful-ritualist", name: "Hateful Ritualist", tier: 3, attack: 4, health: 4, tribes: ["All"], poolSize: MINION_POOL_SIZE[3] },
  { id: "in-spired-attack", name: "In-Spired Attack", tier: 3, attack: 5, health: 5, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[3] },
  { id: "kalycgos", name: "Kalycgos", tier: 3, attack: 2, health: 8, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[3] },
  { id: "lord-of-jingles", name: "Lord of Jingles", tier: 3, attack: 4, health: 5, tribes: ["All"], poolSize: MINION_POOL_SIZE[3] },
  { id: "monstrous-macaw", name: "Monstrous Macaw", tier: 3, attack: 5, health: 4, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[3] },
  { id: "pack-leader", name: "Pack Leader", tier: 3, attack: 4, health: 3, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[3] },
  { id: "refriger-o-matic", name: "Refriger-o-Matic", tier: 3, attack: 3, health: 5, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[3] },
  { id: "saloon-duelist", name: "Saloon Duelist", tier: 3, attack: 5, health: 3, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[3] },
  { id: "scourge-troll", name: "Scourge Troll", tier: 3, attack: 4, health: 3, tribes: ["Undead"], poolSize: MINION_POOL_SIZE[3] },
  { id: "snail-cavalry", name: "Snail Cavalry", tier: 3, attack: 4, health: 3, tribes: ["All"], poolSize: MINION_POOL_SIZE[3] },
  { id: "soul-fragment", name: "Soul Fragment", tier: 3, attack: 4, health: 4, tribes: ["All"], poolSize: MINION_POOL_SIZE[3] },
  { id: "tavern-tipper", name: "Tavern Tipper", tier: 3, attack: 5, health: 4, tribes: ["All"], poolSize: MINION_POOL_SIZE[3] },
  { id: "thicket-of-snipes", name: "Thicket of Snipes", tier: 3, attack: 4, health: 4, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[3] },
  { id: "underhanded-dealer", name: "Underhanded Dealer", tier: 3, attack: 4, health: 3, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[3] },
  { id: "venomous-missile", name: "Venomous Missile", tier: 3, attack: 3, health: 4, tribes: ["All"], poolSize: MINION_POOL_SIZE[3] },
  { id: "whelp-smuggler", name: "Whelp Smuggler", tier: 3, attack: 5, health: 5, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[3] },

  // Tier 4
  { id: "annoy-o-tron-module", name: "Annoy-o-Tron Module", tier: 4, attack: 3, health: 4, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[4] },
  { id: "deep-water-evoker", name: "Deep Water Evoker", tier: 4, attack: 4, health: 4, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[4] },
  { id: "defender-of-argus", name: "Defender of Argus", tier: 4, attack: 4, health: 5, tribes: ["All"], poolSize: MINION_POOL_SIZE[4] },
  { id: "dread-admiral-bilgewater", name: "Dread Admiral Bilgewater", tier: 4, attack: 5, health: 5, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[4] },
  { id: "eternal-summoner", name: "Eternal Summoner", tier: 4, attack: 5, health: 2, tribes: ["All"], poolSize: MINION_POOL_SIZE[4] },
  { id: "flying-machine", name: "Flying Machine", tier: 4, attack: 5, health: 6, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[4] },
  { id: "iron-skinne", name: "Iron Skinne", tier: 4, attack: 2, health: 5, tribes: ["Undead"], poolSize: MINION_POOL_SIZE[4] },
  { id: "lava-lurker", name: "Lava Lurker", tier: 4, attack: 4, health: 5, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[4] },
  { id: "majordomo-executus", name: "Majordomo Executus", tier: 4, attack: 6, health: 5, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[4] },
  { id: "peggy-sturdybone", name: "Peggy Sturdybone", tier: 4, attack: 4, health: 5, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[4] },
  { id: "reanimating-ritualist", name: "Reanimating Ritualist", tier: 4, attack: 4, health: 4, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[4] },
  { id: "rendle-the-pitiless", name: "Rendle the Pitiless", tier: 4, attack: 4, health: 7, tribes: ["All"], poolSize: MINION_POOL_SIZE[4] },
  { id: "revolving-cog", name: "Revolving Cog", tier: 4, attack: 4, health: 5, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[4] },
  { id: "sandy-summoner", name: "Sandy Summoner", tier: 4, attack: 5, health: 5, tribes: ["All"], poolSize: MINION_POOL_SIZE[4] },
  { id: "sculptor-winter-blossom", name: "Sculptor-Winter Blossom", tier: 4, attack: 4, health: 4, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[4] },
  { id: "shadow-shaman", name: "Shadow Shaman", tier: 4, attack: 4, health: 5, tribes: ["All"], poolSize: MINION_POOL_SIZE[4] },
  { id: "stonemaul-banneret", name: "Stonemaul Banneret", tier: 4, attack: 4, health: 4, tribes: ["Quilboar"], poolSize: MINION_POOL_SIZE[4] },
  { id: "strongshell-scavenger", name: "Strongshell Scavenger", tier: 4, attack: 4, health: 3, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[4] },
  { id: "tavern-stormer", name: "Tavern Stormer", tier: 4, attack: 4, health: 5, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[4] },
  { id: "treasure-seeker", name: "Treasure Seeker", tier: 4, attack: 5, health: 5, tribes: ["All"], poolSize: MINION_POOL_SIZE[4] },
  { id: "upbeat-duo", name: "Upbeat Duo", tier: 4, attack: 4, health: 4, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[4] },

  // Tier 5
  { id: "amal-gadron", name: "Amal'gadon", tier: 5, attack: 4, health: 6, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[5] },
  { id: "brann-bronzebeard", name: "Brann Bronzebeard", tier: 5, attack: 3, health: 6, tribes: ["All"], poolSize: MINION_POOL_SIZE[5] },
  { id: "caretaker-of-the-lich", name: "Caretaker of the Lich", tier: 5, attack: 5, health: 5, tribes: ["Undead"], poolSize: MINION_POOL_SIZE[5] },
  { id: "chronicler-of-the-dragon", name: "Chronicler of the Dragon", tier: 5, attack: 6, health: 6, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[5] },
  { id: "cyborg-drake", name: "Cyborg Drake", tier: 5, attack: 5, health: 6, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[5] },
  { id: "elemental-of-summer", name: "Elemental of Summer", tier: 5, attack: 5, health: 6, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[5] },
  { id: "famished-quilboar", name: "Famished Quilboar", tier: 5, attack: 4, health: 7, tribes: ["Quilboar"], poolSize: MINION_POOL_SIZE[5] },
  { id: "fire-flinger", name: "Fire Flinger", tier: 5, attack: 4, health: 6, tribes: ["All"], poolSize: MINION_POOL_SIZE[5] },
  { id: "general-drakkisath", name: "General Drakkisath", tier: 5, attack: 4, health: 8, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[5] },
  { id: "goldrinn-the-great-wolf", name: "Goldrinn the Great Wolf", tier: 5, attack: 6, health: 6, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[5] },
  { id: "imp-mama", name: "Imp Mama", tier: 5, attack: 6, health: 7, tribes: ["Demons"], poolSize: MINION_POOL_SIZE[5] },
  { id: "lich-doctor", name: "Lich Doctor", tier: 5, attack: 4, health: 7, tribes: ["Undead"], poolSize: MINION_POOL_SIZE[5] },
  { id: "lightfang-enforcer", name: "Lightfang Enforcer", tier: 5, attack: 6, health: 6, tribes: ["All"], poolSize: MINION_POOL_SIZE[5] },
  { id: "lord-barett", name: "Lord Barett", tier: 5, attack: 4, health: 5, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[5] },
  { id: "magmus", name: "Magmus", tier: 5, attack: 6, health: 6, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[5] },
  { id: "min-of-the-wilds", name: "Min of the Wilds", tier: 5, attack: 5, health: 7, tribes: ["Quilboar"], poolSize: MINION_POOL_SIZE[5] },
  { id: "poisonous-drake", name: "Poisonous Drake", tier: 5, attack: 4, health: 7, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[5] },
  { id: "slimy-shieldmaster", name: "Slimy Shieldmaster", tier: 5, attack: 4, health: 7, tribes: ["All"], poolSize: MINION_POOL_SIZE[5] },
  { id: "tenacious-san-rong", name: "Tenacious San'rong", tier: 5, attack: 6, health: 6, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[5] },
  { id: "tony-bear-pixie", name: "Tony Bear Pixie", tier: 5, attack: 6, health: 7, tribes: ["All"], poolSize: MINION_POOL_SIZE[5] },

  // Tier 6
  { id: "amos-the-tunneler", name: "Amos, the Tunneler", tier: 6, attack: 7, health: 8, tribes: ["Mechs"], poolSize: MINION_POOL_SIZE[6] },
  { id: "arch-antonidas", name: "Arch-Antonidas", tier: 6, attack: 7, health: 7, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[6] },
  { id: "big-boss-brann", name: "Big Boss Brann", tier: 6, attack: 8, health: 8, tribes: ["All"], poolSize: MINION_POOL_SIZE[6] },
  { id: "dreadfang-tess", name: "Dreadfang Tess", tier: 6, attack: 6, health: 9, tribes: ["Pirates"], poolSize: MINION_POOL_SIZE[6] },
  { id: "elise-starseeker", name: "Elise Starseeker", tier: 6, attack: 7, health: 8, tribes: ["All"], poolSize: MINION_POOL_SIZE[6] },
  { id: "free-foreman-scabbs", name: "Free Foreman Scabbs", tier: 6, attack: 7, health: 7, tribes: ["All"], poolSize: MINION_POOL_SIZE[6] },
  { id: "gentle-djinni", name: "Gentle Djinni", tier: 6, attack: 5, health: 4, tribes: ["Elementals"], poolSize: MINION_POOL_SIZE[6] },
  { id: "hellcaller", name: "Hellcaller", tier: 6, attack: 6, health: 9, tribes: ["Demons"], poolSize: MINION_POOL_SIZE[6] },
  { id: "kalecgos-arcane-aspect", name: "Kalecgos, Arcane Aspect", tier: 6, attack: 6, health: 8, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[6] },
  { id: "ozumat", name: "Ozumat", tier: 6, attack: 6, health: 10, tribes: ["Beasts"], poolSize: MINION_POOL_SIZE[6] },
  { id: "razorgore-the-untamed", name: "Razorgore, the Untamed", tier: 6, attack: 8, health: 10, tribes: ["Dragons"], poolSize: MINION_POOL_SIZE[6] },
  { id: "spectral-scholar", name: "Spectral Scholar", tier: 6, attack: 5, health: 9, tribes: ["Nagasy"], poolSize: MINION_POOL_SIZE[6] },
  { id: "tickatus", name: "Tickatus", tier: 6, attack: 7, health: 7, tribes: ["Demons"], poolSize: MINION_POOL_SIZE[6] },
];

export function getAllMinions(): Minion[] {
  return [...MINIONS].sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.name.localeCompare(b.name);
  });
}

export function getMinionsByTier(tier: number): Minion[] {
  return MINIONS.filter((m) => m.tier === tier);
}

export function getMinionById(id: string): Minion | undefined {
  return MINIONS.find((m) => m.id === id);
}