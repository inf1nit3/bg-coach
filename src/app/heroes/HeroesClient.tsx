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
        Tier-Bewertung für <strong>{tieredCount}</strong> von {totalHeroes}{" "}
        Heroes (Patch 27.6, manuell kuratiert). Heroes ohne Tier-Eintrag sind
        im aktuellen Meta nicht relevant — filtere nach Tier um nur Meta-Heroes
        zu sehen.
      </p>

      <div className="grid grid-hero">
        {filtered.map((h) => (
          <HeroCard key={h.id} hero={h} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="lead">Keine Heroes passen zum Filter.</p>
      )}

      <h2>Hinweis zu Hero-Tiers</h2>
      <p className="lead">
        Tier-Liste ist <strong>manuell kuratiert</strong> aus r/BobsTavern + HSReplay-Public. Bei
        neuem Patch können sich Werte verschieben. Heroes ohne Tier-Eintrag
        sind im aktuellen Meta <strong>nicht relevant</strong> — filtere nach Tier um nur
        Meta-Heroes zu sehen.
      </p>
    </>
  );
}