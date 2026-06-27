import { useState, useMemo } from "react";
import { getAllHeroes } from "@/lib/heroes";
import { getHeroTiers } from "@/lib/hero-tiers";
import { type MMRBucket, type Tier } from "@/lib/types";

const HEROES = getAllHeroes();
// O(1) Lookup-Map statt O(n) pro Hero pro Render
const TIER_BY_ID = new Map(getHeroTiers().map((t) => [t.heroId, t]));

export function useHeroesData() {
  const [tribeFilter, setTribeFilter] = useState<string>("All");
  const [mmrFilter, setMmrFilter] = useState<MMRBucket | "all">("all");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");
  const [search, setSearch] = useState("");

  const enriched = useMemo(() => {
    return HEROES.map((h) => {
      const tierEntry = TIER_BY_ID.get(h.id);
      const mmrRating = tierEntry?.mmrRatings[mmrFilter === "all" ? "mid" : mmrFilter]?.[0];
      return {
        ...h,
        tier: mmrRating?.tier ?? null,
        tierReason: mmrRating?.reason ?? null,
        topFourRate: tierEntry?.topFourRate,
        topOneRate: tierEntry?.topOneRate,
        hasTierEntry: !!tierEntry,
      };
    });
  }, [mmrFilter]);

  const filtered = useMemo(() => {
    return enriched.filter((h) => {
      if (tribeFilter !== "All" && h.tribe !== tribeFilter) return false;
      if (tierFilter !== "all" && h.tier !== tierFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !h.name.toLowerCase().includes(q) &&
          !(h.nameShort?.toLowerCase().includes(q) ?? false)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [enriched, tribeFilter, tierFilter, search]);

  const tieredCount = enriched.filter((h) => h.hasTierEntry).length;

  return {
    tribeFilter,
    setTribeFilter,
    mmrFilter,
    setMmrFilter,
    tierFilter,
    setTierFilter,
    search,
    setSearch,
    filtered,
    tieredCount,
    totalHeroes: HEROES.length,
  };
}
