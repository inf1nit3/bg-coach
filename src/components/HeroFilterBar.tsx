import { ALL_TRIBES, type MMRBucket, type Tier } from "@/lib/types";

const MMR_OPTIONS: { value: MMRBucket; label: string }[] = [
  { value: "low", label: "Low (BGS 0-4000)" },
  { value: "mid", label: "Mid (BGS 4000-7000)" },
  { value: "high", label: "High (BGS 7000+)" },
];

const TIERS: Tier[] = ["S", "A", "B", "C", "D"];

interface HeroFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  tribeFilter: string;
  setTribeFilter: (val: string) => void;
  mmrFilter: MMRBucket | "all";
  setMmrFilter: (val: MMRBucket | "all") => void;
  tierFilter: Tier | "all";
  setTierFilter: (val: Tier | "all") => void;
  filteredCount: number;
  totalCount: number;
}

export function HeroFilterBar({
  search,
  setSearch,
  tribeFilter,
  setTribeFilter,
  mmrFilter,
  setMmrFilter,
  tierFilter,
  setTierFilter,
  filteredCount,
  totalCount,
}: HeroFilterBarProps) {
  return (
    <div
      className="filter-bar"
      role="search"
      aria-label="Hero-Filter"
    >
      <label className="sr-only" htmlFor="heroes-search">
        Hero suchen
      </label>
      <input
        id="heroes-search"
        type="text"
        placeholder="Hero suchen…"
        className="filter-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label className="sr-only" htmlFor="heroes-tribe">
        Tribe filtern
      </label>
      <select
        id="heroes-tribe"
        className="filter-select"
        value={tribeFilter}
        onChange={(e) => setTribeFilter(e.target.value)}
      >
        <option value="All">Alle Tribes</option>
        {ALL_TRIBES.filter((t) => t !== "All").map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <label className="sr-only" htmlFor="heroes-mmr">
        MMR-Bucket filtern
      </label>
      <select
        id="heroes-mmr"
        className="filter-select"
        value={mmrFilter}
        onChange={(e) => setMmrFilter(e.target.value as MMRBucket | "all")}
      >
        <option value="all">Alle MMR</option>
        {MMR_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <label className="sr-only" htmlFor="heroes-tier">
        Tier filtern
      </label>
      <select
        id="heroes-tier"
        className="filter-select"
        value={tierFilter}
        onChange={(e) => setTierFilter(e.target.value as Tier | "all")}
      >
        <option value="all">Alle Tiers</option>
        {TIERS.map((t) => (
          <option key={t} value={t}>
            Tier {t}
          </option>
        ))}
      </select>
      <span className="filter-count" aria-live="polite">
        {filteredCount} / {totalCount}
      </span>
    </div>
  );
}
