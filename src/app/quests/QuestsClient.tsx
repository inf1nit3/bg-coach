"use client";

import { useState, useMemo } from "react";
import { getAllQuests, ALL_TRIBES } from "@/lib/quests";
import type { Tier } from "@/lib/types";

const TIERS: Tier[] = ["S", "A", "B", "C", "D"];

export default function QuestsClient() {
  const allQuests = getAllQuests();
  const [tribeFilter, setTribeFilter] = useState<string>("All");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return allQuests.filter((q) => {
      if (tribeFilter !== "All" && !q.favoredTribes.includes(tribeFilter as never)) {
        return false;
      }
      if (tierFilter !== "all" && q.tier !== tierFilter) {
        return false;
      }
      if (search && !q.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [allQuests, tribeFilter, tierFilter, search]);

  return (
    <>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Quest suchen…"
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
          {filtered.length} / {allQuests.length}
        </span>
      </div>

      <div className="grid">
        {filtered.map((q) => (
          <article key={q.id} className="card">
            <div className="card-head">
              <div className="card-title">{q.name}</div>
              <span className={`tier-badge tier-${q.tier}`}>{q.tier}</span>
            </div>
            <p className="card-desc">{q.description}</p>

            <div className="winrate-row">
              {q.topFourRate !== undefined && (
                <span className="winrate">
                  Top-4: <strong>{q.topFourRate}%</strong>
                </span>
              )}
              {q.topOneRate !== undefined && (
                <span className="winrate">
                  Top-1: <strong>{q.topOneRate}%</strong>
                </span>
              )}
            </div>

            {q.favoredTribes.length > 0 && (
              <div style={{ marginTop: "0.6rem" }}>
                <strong style={{ fontSize: "0.85rem" }}>Pusht:</strong>
                <div className="tag-list">
                  {q.favoredTribes.map((t) => (
                    <span key={t} className="tag tag-strong">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {q.notes && <div className="notes">{q.notes}</div>}
          </article>
        ))}
      </div>

      {filtered.length === 0 && <p className="lead">Keine Quests passen zum Filter.</p>}

      <h2>Hinweis zu den Winrates</h2>
      <p className="lead">
        Die Top-4/Top-1-Raten sind grobe Schätzungen basierend auf
        Community-Konsens und HSReplay-Snapshots. Bei neuem Patch können sich
        die Werte innerhalb von 48 Stunden verschieben.{" "}
        <strong>Daten sind Entscheidungshilfe, keine Garantie.</strong>
      </p>
    </>
  );
}