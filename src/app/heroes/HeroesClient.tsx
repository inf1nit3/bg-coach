"use client";

import { useHeroesData } from "@/hooks/useHeroesData";
import { HeroFilterBar } from "@/components/HeroFilterBar";
import { HeroCard } from "@/components/HeroCard";

export default function HeroesClient() {
  const {
    search,
    setSearch,
    tribeFilter,
    setTribeFilter,
    mmrFilter,
    setMmrFilter,
    tierFilter,
    setTierFilter,
    filtered,
    tieredCount,
    totalHeroes,
  } = useHeroesData();

  return (
    <>
      <HeroFilterBar
        search={search}
        setSearch={setSearch}
        tribeFilter={tribeFilter}
        setTribeFilter={setTribeFilter}
        mmrFilter={mmrFilter}
        setMmrFilter={setMmrFilter}
        tierFilter={tierFilter}
        setTierFilter={setTierFilter}
        filteredCount={filtered.length}
        totalCount={totalHeroes}
      />

      <p className="data-meta">
        <strong style={{ color: "var(--accent-base)" }}>{tieredCount}</strong>{" "}
        von {totalHeroes} Heroes sind im aktuellen Meta bewertet — Patch 27.6,
        kuratiert aus r/BobsTavern & HSReplay. Heroes ohne Tier sind keine
        Empfehlung, sondern eine ehrliche Lücke.
      </p>

      <div className="grid grid-hero">
        {filtered.map((h) => (
          <HeroCard key={h.id} hero={h} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="lead">Keine Heroes passen zum Filter.</p>
      )}
    </>
  );
}