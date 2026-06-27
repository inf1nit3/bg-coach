/**
 * Winrate-Loader — liest manuell kuratierte Winrates aus /data/winrates.json.
 *
 * Wichtig: Winrates kommen NICHT aus Auto-Scraping (HSReplay Cloudflare-Challenge).
 * Stattdessen: Community-Konsens aus r/BobsTavern, Top-MMR-Discords, eigene Erfahrung.
 *
 * PR-Workflow: Spieler öffnet ein PR mit aktualisiertem winrates.json nach neuem Patch.
 */

// JSON-Import via Next.js + resolveJsonModule in tsconfig.json
import winrates from "@/../data/winrates.json";

interface RawWinrateJson {
  patch: string;
  lastUpdated: string;
  source: string;
  quests: Record<string, { top4: number; top1: number }>;
  heroes: Record<string, { top4: number; top1: number }>;
}

const w = winrates as RawWinrateJson;

export interface WinrateData {
  top4: number;
  top1: number;
}

export interface WinrateMeta {
  patch: string;
  lastUpdated: string;
  source: string;
}

export const QUEST_WINRATES: Record<string, WinrateData> = w.quests;
export const HERO_WINRATES: Record<string, WinrateData> = w.heroes;
export const WINRATE_META: WinrateMeta = {
  patch: w.patch,
  lastUpdated: w.lastUpdated,
  source: w.source,
};

/**
 * Holt Winrate für eine Quest-ID. Gibt undefined zurück wenn keine Daten vorhanden.
 */
export function getQuestWinrate(questId: string): WinrateData | undefined {
  return QUEST_WINRATES[questId];
}

/**
 * Berechnet eine Tier-Empfehlung basierend auf Top-4-Rate.
 */
export function tierFromWinrate(top4: number): "S" | "A" | "B" | "C" {
  if (top4 >= 60) return "S";
  if (top4 >= 52) return "A";
  if (top4 >= 46) return "B";
  return "C";
}