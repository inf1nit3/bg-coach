"use client";

import { useState, useMemo } from "react";
import { getAllHeroes } from "@/lib/heroes";
import { getHeroTiers } from "@/lib/hero-tiers";
import { ALL_TRIBES, type MMRBucket, type Tier } from "@/lib/types";

const HEROES = getAllHeroes();
// O(1) Lookup-Map statt O(n) pro Hero pro Render
const TIER_BY_ID = new Map(getHeroTiers().map((t) => [t.heroId, t]));

const MMR_OPTIONS: { value: MMRBucket; label: string }[] = [
  { value: "low", label: "Low (BGS 0-4000)" },
  { value: "mid", label: "Mid (BGS 4000-7000)" },
  { value: "high", label: "High (BGS 7000+)" },
];

const TIERS: Tier[] = ["S", "A", "B", "C", "D"];

export default function HeroesClient() {
  const [tribeFilter, setTribeFilter] = useState<string>("All");
  const [mmrFilter, setMmrFilter] = useState<MMRBucket | "all">("all");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");
  const [search, setSearch] = useState("");

  // Build enriched view: alle 111 Heroes + Tier-Overlay wenn vorhanden
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

  return (
    <>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Hero suchen…"
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
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
        <select
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
        <select
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
        <span className="filter-count">
          {filtered.length} / {HEROES.length}
        </span>
      </div>

      <p className="data-meta">
        Tier-Bewertung für <strong>{tieredCount}</strong> von {HEROES.length}{" "}
        Heroes (Patch 27.6, manuell kuratiert). Heroes ohne Tier-Eintrag sind
        im aktuellen Meta nicht relevant — filtere nach Tier um nur Meta-Heroes
        zu sehen.
      </p>

      <div className="grid grid-hero">
        {filtered.map((h) => (
          <article
            key={h.id}
            className={`card card-hero ${!h.hasTierEntry ? "card-dim" : ""} ${h.tier ? `card-tier-${h.tier}` : ""}`}
          >
            <div className="card-head">
              {h.picturePortrait && (
                <div className="card-art-wrapper">
                  <img
                    src={h.picturePortrait}
                    alt={h.name}
                    className="card-art"
                    loading="lazy"
                  />
                  {h.pictureWhole && (
                    <img
                      src={h.pictureWhole}
                      alt=""
                      className="card-art-hover"
                      loading="lazy"
                    />
                  )}
                </div>
              )}
              <div className="card-title-block">
                <div className="card-title-row">
                  <div className="card-title">
                    {h.name}
                    {h.nameShort && (
                      <span className="hero-short"> ({h.nameShort})</span>
                    )}
                  </div>
                  {h.tier && (
                    <span className={`tier-badge tier-${h.tier}`}>{h.tier}</span>
                  )}
                </div>
              </div>
            </div>
            <p className="card-desc">{h.heroPowerText || "—"}</p>

            <div className="hero-stats">
              <span className="winrate">
                Armor: <strong>{h.armor}</strong>
                {h.armorHighMMR !== h.armor && (
                  <> · High-MMR: <strong>{h.armorHighMMR}</strong></>
                )}
              </span>
              {h.armorDuos !== null && (
                <span className="winrate">
                  Duos: <strong>{h.armorDuos}</strong>
                </span>
              )}
            </div>

            {h.tribe !== "All" && (
              <div className="tag-list" style={{ marginTop: "0.5rem" }}>
                <span className="tag tag-strong">{h.tribe}</span>
              </div>
            )}

            {h.buddy && (
              <div className="notes">
                <strong style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                  Buddy:
                </strong>{" "}
                {h.buddy}
              </div>
            )}

            {h.tierReason && (
              <div className="notes">{h.tierReason}</div>
            )}

            {(h.topFourRate !== undefined || h.topOneRate !== undefined) && (
              <div className="winrate-row">
                {h.topFourRate !== undefined && (
                  <span className="winrate">
                    Top-4: <strong>{h.topFourRate}%</strong>
                  </span>
                )}
                {h.topOneRate !== undefined && (
                  <span className="winrate">
                    Top-1: <strong>{h.topOneRate}%</strong>
                  </span>
                )}
              </div>
            )}
          </article>
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