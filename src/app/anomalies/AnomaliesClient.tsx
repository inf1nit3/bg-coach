"use client";

import { useState, useMemo } from "react";
import { getAllAnomalies } from "@/lib/anomalies";
import { ALL_TRIBES, type MMRBucket, type Tribe } from "@/lib/types";

const ANOMALIES = getAllAnomalies();

const MMR_OPTIONS: { value: MMRBucket; label: string }[] = [
  { value: "low", label: "Low (BGS 0-4000)" },
  { value: "mid", label: "Mid (BGS 4000-7000)" },
  { value: "high", label: "High (BGS 7000+)" },
];

export default function AnomaliesClient() {
  const [tribeFilter, setTribeFilter] = useState<Tribe | "All">("All");
  const [mmrFilter, setMmrFilter] = useState<MMRBucket | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return ANOMALIES.filter((a) => {
      // Tribe-Filter: zeige Anomalie wenn sie den Tribe pusht oder schwächt
      if (
        tribeFilter !== "All" &&
        !a.strongTribes.some((st) => st.tribe === tribeFilter) &&
        !a.weakTribes.includes(tribeFilter)
      ) {
        return false;
      }
      // MMR-Filter: zeige nur Anomalien, die für das gewählte MMR eine Notiz haben
      if (mmrFilter !== "all" && !a.mmrNotes?.[mmrFilter]) {
        return false;
      }
      // Search
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [tribeFilter, mmrFilter, search]);

  return (
    <>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Anomalie suchen…"
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={tribeFilter}
          onChange={(e) => setTribeFilter(e.target.value as Tribe | "All")}
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
        <span className="filter-count">
          {filtered.length} / {ANOMALIES.length}
        </span>
      </div>

      <div className="grid">
        {filtered.map((a) => (
          <article key={a.id} className="card">
            <div className="card-head">
              <div className="card-title">{a.name}</div>
            </div>
            <p className="card-desc">{a.description}</p>

            <div>
              <strong style={{ fontSize: "0.85rem" }}>Starke Tribes:</strong>
              <div className="tag-list">
                {a.strongTribes.map((st) => (
                  <span key={st.tribe} className="tag tag-strong">
                    <span className={`tier-badge tier-${st.tier}`}>{st.tier}</span>
                    {st.tribe}
                  </span>
                ))}
              </div>
            </div>

            {a.weakTribes.length > 0 && (
              <div style={{ marginTop: "0.6rem" }}>
                <strong style={{ fontSize: "0.85rem" }}>Vermeiden:</strong>
                <div className="tag-list">
                  {a.weakTribes.map((wt) => (
                    <span key={wt} className="tag tag-weak">
                      {wt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {a.strongTribes.length > 0 && (
              <div style={{ marginTop: "0.75rem" }}>
                {a.strongTribes.map((st) => (
                  <div key={st.tribe} className="synergy-row">
                    <span className="synergy-tribe">{st.tribe}</span>
                    <span className="synergy-reason">{st.reason}</span>
                  </div>
                ))}
              </div>
            )}

            {mmrFilter !== "all" && a.mmrNotes?.[mmrFilter] && (
              <div className="notes">
                <strong style={{ fontSize: "0.8rem", color: "var(--accent)" }}>
                  {MMR_OPTIONS.find((o) => o.value === mmrFilter)?.label}:
                </strong>{" "}
                {a.mmrNotes[mmrFilter]}
              </div>
            )}

            {a.notes && <div className="notes">{a.notes}</div>}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="lead">Keine Anomalien passen zum Filter.</p>
      )}
    </>
  );
}