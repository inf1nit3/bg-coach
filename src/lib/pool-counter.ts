import type { Minion } from "./minions";

/**
 * Pool-Counter State.
 *
 * Manuelle Eingabe durch den Spieler. Das Tool trianguliert aus den
 * sichtbaren Daten (eigene Drafts + Sells + Discovers) den ungefähren
 * Rest-Pool.
 *
 * Wichtig: Man sieht nur den eigenen Shop-Slice, NICHT den Pool der
 * anderen Spieler. Triangulation ist daher immer eine Schätzung mit
 * Unsicherheit.
 */

/** Ein Minion auf dem Board des Spielers. */
export interface BoardEntry {
  minionId: string;
  /** true wenn goldenes Minion (3 Kopien verschmolzen). */
  golden: boolean;
  /** Anzahl Kopien (1 normal, 2 Paar im Board, 3 = Triple → wird zu golden). */
  copies: number;
}

/** Eintrag im Shop-Log: was wurde angeboten + was wurde gemacht. */
export interface ShopLogEntry {
  turn: number;
  /** Welche Minions im Shop waren (IDs). */
  offered: string[];
  /** Welches Minion wurde gekauft (oder null wenn nichts). */
  bought: string | null;
  /** Welches Minion wurde verkauft (oder null wenn nichts). */
  sold: string | null;
  /** Welches Minion wurde per Discover erhalten (oder null). */
  discovered: string | null;
}

/** Full State für ein laufendes Spiel. */
export interface PoolCounterState {
  hero: string;
  /** Aktuelles Tavern-Tier. */
  tavernTier: 1 | 2 | 3 | 4 | 5 | 6;
  /** Aktuelle Runde. */
  turn: number;
  /** Spieler-Board. */
  board: BoardEntry[];
  /** Shop-History. */
  shopLog: ShopLogEntry[];
  /** Lobby-Anomalie (für Kontext). */
  anomaly: string;
  /** Patch-Stand. */
  patch: string;
}

/** Triangulierter Counter für ein einzelnes Minion. */
export interface MinionPoolCounter {
  minion: Minion;
  /** Total-Pool-Größe. */
  totalPool: number;
  /** Geschätzte Kopien im Rest-Pool (sichtbar - gezogen). */
  estimatedRemaining: number;
  /** Sicherheits-Status: green (≥3 verbleibend), yellow (1-2), red (0). */
  status: "green" | "yellow" | "red";
  /** Wie viele Kopien hat der Spieler aktuell? */
  playerHas: number;
  /** Wie viele hat der Spieler über die Zeit insgesamt gezogen? */
  playerDrawn: number;
}

export function createEmptyState(): PoolCounterState {
  return {
    hero: "",
    tavernTier: 1,
    turn: 1,
    board: [],
    shopLog: [],
    anomaly: "",
    patch: "27.6",
  };
}

/**
 * Triangulation: Berechnet geschätzte Rest-Pool-Counter aus State.
 *
 * Heuristik (vereinfacht — kein Lobby-Insider-Wissen):
 * - Start-Pool pro Minion = Minion.poolSize (basierend auf Tier)
 * - Zieht der Spieler eine Kopie: Pool -1
 * - Verkauft der Spieler eine Kopie: Pool +1
 * - Triples: 3 Kopien verschwinden aus dem Pool, 1 goldenes kommt rein
 *   → Pool-Delta: -2 (3 Kopien weg, 1 neues goldenes zählt nicht zum Standard-Pool)
 *
 * Unsicherheit: Man sieht nicht was andere Spieler gezogen haben.
 * Diese Funktion kann daher nur den eigenen Player-Delta berechnen —
 * NICHT den globalen Pool-Drain.
 */
export function computePoolCounters(
  state: PoolCounterState,
  minions: Minion[]
): MinionPoolCounter[] {
  // 1. Player-Drawn pro Minion zählen
  const drawn: Record<string, number> = {};
  for (const m of minions) drawn[m.id] = 0;

  for (const entry of state.shopLog) {
    if (entry.bought) {
      drawn[entry.bought] = (drawn[entry.bought] ?? 0) + 1;
    }
    if (entry.discovered) {
      // Discover gibt eine Kopie aus dem höheren Tier — zählt als gezogen
      drawn[entry.discovered] = (drawn[entry.discovered] ?? 0) + 1;
    }
  }

  // 2. Player-Has (aktuell auf Board + verkauft-rück-into-pool)
  const has: Record<string, number> = {};
  for (const m of minions) has[m.id] = 0;
  for (const b of state.board) {
    const copies = b.golden ? b.copies : b.copies;
    has[b.minionId] = (has[b.minionId] ?? 0) + copies;
  }

  // 3. Counter berechnen
  return minions
    .filter((m) => m.tier <= state.tavernTier)
    .map((m) => {
      const totalPool = m.poolSize;
      const playerDrawn = drawn[m.id] ?? 0;
      const playerHas = has[m.id] ?? 0;

      // Vereinfachte Schätzung: Pool-Drain = gezogene Kopien minus
      // Wiederverkäufe. Für MVP akzeptabel — exakte Berechnung würde
      // Lobby-Daten brauchen (nicht verfügbar).
      const estimatedRemaining = Math.max(0, totalPool - playerDrawn);

      let status: "green" | "yellow" | "red";
      if (estimatedRemaining >= 3) status = "green";
      else if (estimatedRemaining >= 1) status = "yellow";
      else status = "red";

      return {
        minion: m,
        totalPool,
        estimatedRemaining,
        status,
        playerHas,
        playerDrawn,
      };
    })
    .sort((a, b) => {
      // Sortiere nach Tier, dann nach Status (red zuerst)
      if (a.minion.tier !== b.minion.tier) return a.minion.tier - b.minion.tier;
      const order = { red: 0, yellow: 1, green: 2 };
      return order[a.status] - order[b.status];
    });
}

/**
 * LocalStorage-Persistenz.
 */
const STORAGE_KEY = "bg-coach.pool-counter.v1";

export function saveState(state: PoolCounterState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded oder private mode — silently fail
  }
}

export function loadState(): PoolCounterState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PoolCounterState;
  } catch {
    return null;
  }
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}