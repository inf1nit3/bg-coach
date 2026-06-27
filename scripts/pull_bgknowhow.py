#!/usr/bin/env python3
"""
Pull BG entity data from BGKnowHow GitHub repo.

Sources:
- bg_minions_active.json (292 minions mit Abilities, Golden-Stats)
- bg_heroes_active.json (160 KB)
- bg_anomalies_all.json (78 anomalies)
- bg_quests_active.json (placeholder, manually curated)

Output:
- src/lib/minions.ts (overwrites auto-generated section)
- data/winrates.json (manual, never overwritten)

Usage:
  python3 scripts/pull_bgknowhow.py
"""

import json
import os
import sys
import urllib.request
from collections import Counter
from pathlib import Path

REPO = "O-Nemet/bgknowhow"
BRANCH = "main"
BASE = f"https://raw.githubusercontent.com/{REPO}/{BRANCH}/bgjson/output"

ROOT = Path(__file__).parent.parent
LIB = ROOT / "src" / "lib"
DATA = ROOT / "data"


def fetch(name: str) -> dict:
    url = f"{BASE}/{name}"
    print(f"  Fetching {url}...")
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.loads(r.read())


def parse_minion(m: dict, pool_size: dict) -> dict | None:
    """Parse one BGKnowHow minion entry."""
    name = (m.get("name") or "").strip()
    tier = m.get("tier")
    if not name or not isinstance(tier, int) or tier not in pool_size:
        return None
    return {
        "id": m.get("id", name),
        "name": name,
        "nameShort": m.get("nameShort"),
        "tier": tier,
        "attack": m.get("attack", 0) or 0,
        "health": m.get("health", 0) or 0,
        "attackGolden": m.get("attackGolden", 0) or 0,
        "healthGolden": m.get("healthGolden", 0) or 0,
        "tribes": m.get("tribes") or ["All"],
        "abilities": m.get("abilities") or {},
        "text": m.get("text", ""),
        "textGolden": m.get("textGolden") or m.get("text", ""),
        "isToken": m.get("isToken", False),
        "poolSize": pool_size[tier],
        "picture": m.get("pictureSmall") or m.get("picture"),
    }


def write_minions_ts(out: list, header_lines: list) -> str:
    lines = list(header_lines) + [""]
    lines.append("export const MINIONS: Minion[] = [")
    for m in out:
        abilities_json = json.dumps(m["abilities"], separators=(", ", ": "))
        name_short = json.dumps(m["nameShort"]) if m["nameShort"] else "null"
        text = json.dumps(m["text"])
        text_golden = json.dumps(m["textGolden"])
        picture = json.dumps(m["picture"]) if m["picture"] else "null"
        lines.append(
            f"  {{ id: {json.dumps(m['id'])}, name: {json.dumps(m['name'])}, "
            f"nameShort: {name_short}, tier: {m['tier']}, "
            f"attack: {m['attack']}, health: {m['health']}, "
            f"attackGolden: {m['attackGolden']}, healthGolden: {m['healthGolden']}, "
            f"tribes: {json.dumps(m['tribes'])}, abilities: {abilities_json}, "
            f"text: {text}, textGolden: {text_golden}, isToken: {str(m['isToken']).lower()}, "
            f"poolSize: {m['poolSize']}, picture: {picture} }},"
        )
    lines.append("];")
    lines.append("")
    lines.append("export function getAllMinions(): Minion[] {")
    lines.append("  return [...MINIONS].sort((a, b) => {")
    lines.append("    if (a.tier !== b.tier) return a.tier - b.tier;")
    lines.append("    return a.name.localeCompare(b.name);")
    lines.append("  });")
    lines.append("}")
    lines.append("")
    lines.append("export function getMinionsByTier(tier: number): Minion[] {")
    lines.append("  return MINIONS.filter((m) => m.tier === tier);")
    lines.append("}")
    lines.append("")
    lines.append("export function getMinionById(id: string): Minion | undefined {")
    lines.append("  return MINIONS.find((m) => m.id === id);")
    lines.append("}")
    lines.append("")
    lines.append("export function getNonTokenMinions(): Minion[] {")
    lines.append("  return MINIONS.filter((m) => !m.isToken);")
    lines.append("}")
    return "\n".join(lines) + "\n"


HEADER = """import type { Tribe } from "./types";

/**
 * Battlegrounds-Minion Database — gepullt aus BGKnowHow GitHub.
 *
 * Quelle: https://github.com/O-Nemet/bgknowhow/blob/main/bgjson/output/bg_minions_active.json
 * Aktualisierung: alle 4 Stunden upstream, wir pullen wöchentlich via Cron.
 *
 * Vorteile gegenüber HearthstoneJSON:
 * - Strukturierte Abilities (hasTaunt, hasShield, hasReborn, etc.)
 * - Golden-Stats bereits berechnet
 * - isActive/isToken-Filter
 * - WebP-Pictures
 * - 292 aktive Minions (vs 1144 aus HearthstoneJSON inkl. Tokens/History)
 *
 * Winrates sind NICHT hier — die bleiben in /data/winrates.json manuell kuratiert.
 */

export interface MinionAbility {
  hasBattlecry: boolean;
  hasDeathrattle: boolean;
  hasTaunt: boolean;
  hasShield: boolean;
  hasWindfury: boolean;
  hasVenomous: boolean;
  hasReborn: boolean;
  hasAvenge: boolean;
  hasMagnetic: boolean;
  hasSpellcraft: boolean;
}

export interface Minion {
  id: string;
  /** Offizieller Name aus Blizzard. */
  name: string;
  /** Community-Kurzname (z.B. "Tron" für Annoy-o-Tron). */
  nameShort: string | null;
  /** Tavern-Tier (1-7). */
  tier: number;
  attack: number;
  health: number;
  attackGolden: number;
  healthGolden: number;
  tribes: Tribe[];
  /** Battlecry/Deathrattle/etc. als Booleans. */
  abilities: MinionAbility;
  /** Text-Beschreibung (z.B. "Taunt Divine Shield"). */
  text: string;
  textGolden: string;
  /** Token-Spawn (z.B. Jo-E Bot von Mecharoo). */
  isToken: boolean;
  /** Total-Pool-Größe. */
  poolSize: number;
  /** Picture-URL (WebP, klein). */
  picture: string | null;
}

/** Pool-Größen pro Tier (Standard-BG, 8 Spieler). */
export const MINION_POOL_SIZE: Record<number, number> = {
  1: 16,
  2: 15,
  3: 13,
  4: 11,
  5: 9,
  6: 7,
  7: 6,
};
"""


def main():
    pool_size = {1: 16, 2: 15, 3: 13, 4: 11, 5: 9, 6: 7, 7: 6}

    print("Pulling BGMinion data from BGKnowHow...")
    d = fetch("bg_minions_active.json")
    raw_minions = d.get("data", [])
    print(f"  Source date: {d.get('meta', {}).get('date')}, version: {d.get('meta', {}).get('version')}")
    print(f"  Raw entries: {len(raw_minions)}")

    parsed = [m for m in (parse_minion(x, pool_size) for x in raw_minions) if m is not None]
    parsed.sort(key=lambda m: (m["tier"], m["name"]))

    tier_counts = Counter(m["tier"] for m in parsed)
    print(f"  Parsed: {len(parsed)} minions")
    for t in sorted(tier_counts.keys()):
        print(f"    T{t}: {tier_counts[t]}")

    header_lines = [
        "// AUTO-GENERATED from BGKnowHow bg_minions_active.json",
        "// Source: https://github.com/O-Nemet/bgknowhow/blob/main/bgjson/output/bg_minions_active.json",
        f"// Total: {len(parsed)} active BG minions (meta: {d.get('meta', {})})",
        "// Pull via: python3 scripts/pull_bgknowhow.py",
    ]

    ts = HEADER + "\n" + write_minions_ts(parsed, header_lines)
    out_path = LIB / "minions.ts"
    out_path.write_text(ts)
    print(f"  Written: {out_path}")

    # Auch ein JSON-Snapshot für Inspection / externe Tools
    DATA.mkdir(exist_ok=True)
    snapshot = {
        "meta": d.get("meta", {}),
        "source": f"https://github.com/{REPO}/blob/{BRANCH}/bgjson/output/bg_minions_active.json",
        "minions": parsed,
    }
    snap_path = DATA / "minions_snapshot.json"
    snap_path.write_text(json.dumps(snapshot, indent=2))
    print(f"  Snapshot: {snap_path}")

    print("\n✅ Done. Run `npm run typecheck` to verify.")


if __name__ == "__main__":
    main()