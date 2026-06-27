"use client";

import { useState, useMemo, useEffect } from "react";
import { getAllMinions } from "@/lib/minions";
import {
  computeTripleEV,
  detectPairs,
  type TripleResult,
  type BoardPair,
} from "@/lib/triple-ev";
import type { BoardEntry } from "@/lib/pool-counter";
import type { Minion } from "@/lib/minions";

// Statische Modul-Scope-Daten: sortiert einmalig beim Import, nicht pro Render.
const MINIONS: Minion[] = getAllMinions();

export default function TripleEvClient() {
  // Triple-EV hat eigene Board-State — entkoppelt von Pool-Counter localStorage
  // (User kann beide unabhängig nutzen ohne Cross-Page-Korruption).
  const [board, setBoard] = useState<BoardEntry[]>([]);
  const [tavernTier, setTavernTier] = useState(3);
  const [compTribeLocked, setCompTribeLocked] = useState(false);
  const [anomalyBoostsTriple, setAnomalyBoostsTriple] = useState(false);
  const [discoverTierBonus, setDiscoverTierBonus] = useState(0);
  const [pairSelection, setPairSelection] = useState<string>("");

  const pairs = useMemo(() => detectPairs(board, MINIONS), [board]);

  const boardStrength = useMemo(
    () =>
      board.reduce((sum, b) => {
        const m = MINIONS.find((mm) => mm.id === b.minionId);
        if (!m) return sum;
        return sum + m.attack * (b.golden ? 2 : b.copies) + m.health * (b.golden ? 2 : b.copies);
      }, 0),
    [board]
  );

  // Auto-select first pair wenn nichts ausgewählt
  useEffect(() => {
    if (pairs.length > 0 && !pairs.find((p) => p.minion.id === pairSelection)) {
      setPairSelection(pairs[0].minion.id);
    }
  }, [pairs, pairSelection]);

  const selectedPair: BoardPair | undefined = useMemo(
    () => pairs.find((p) => p.minion.id === pairSelection),
    [pairs, pairSelection]
  );

  const result: TripleResult | null = useMemo(() => {
    if (!selectedPair) return null;
    return computeTripleEV({
      tavernTier,
      pairMinion: selectedPair.minion,
      compTribeLocked,
      anomalyBoostsTriple,
      discoverTierBonus,
    });
  }, [selectedPair, tavernTier, compTribeLocked, anomalyBoostsTriple, discoverTierBonus]);

  function addPairMinion(minionId: string) {
    setBoard((b) => {
      const existing = b.find((x) => x.minionId === minionId && !x.golden);
      if (existing) {
        const newCopies = existing.copies + 1;
        if (newCopies >= 3) {
          return [
            ...b.filter((x) => x !== existing),
            { minionId, golden: true, copies: 1 },
          ];
        }
        return b.map((x) => (x === existing ? { ...x, copies: newCopies } : x));
      }
      return [...b, { minionId, golden: false, copies: 1 }];
    });
  }

  function removeAt(idx: number) {
    setBoard((b) => b.filter((_, i) => i !== idx));
  }

  function clearBoard() {
    if (confirm("Board löschen?")) setBoard([]);
  }

  return (
    <>
      <section>
        <h2>Board ({board.length} Minions · Stärke {boardStrength})</h2>
        <div className="board-grid">
          {board.map((b, i) => {
            const m = MINIONS.find((mm) => mm.id === b.minionId);
            if (!m) return null;
            return (
              <div key={i} className={`board-card ${b.golden ? "golden" : ""}`}>
                {m.picture && (
                  <img
                    src={m.picture}
                    alt={m.name}
                    width={32}
                    height={32}
                    className="minion-icon"
                  />
                )}
                <div className="board-name">
                  {m.name}
                  {b.golden && " ⭐"}
                </div>
                <div className="board-stats">
                  {b.golden ? "×2" : `×${b.copies}`} · {m.attack}/{m.health}
                </div>
                <button
                  onClick={() => removeAt(i)}
                  className="btn-tiny"
                  aria-label={`Entfernen ${m.name}`}
                >
                  ×
                </button>
              </div>
            );
          })}
          {board.length === 0 && (
            <p className="lead" style={{ gridColumn: "1 / -1" }}>
              Füge unten 2+ Kopien desselben Minions hinzu (= ein Paar), um eine Empfehlung zu sehen.
            </p>
          )}
        </div>
        <button onClick={clearBoard} className="btn-danger">
          Board leeren
        </button>
      </section>

      <section>
        <h2>Minion hinzufügen (für Paar-Test)</h2>
        <select
          onChange={(e) => {
            if (e.target.value) {
              addPairMinion(e.target.value);
              e.target.value = "";
            }
          }}
          className="filter-select"
          defaultValue=""
        >
          <option value="" disabled>
            Minion wählen…
          </option>
          {MINIONS.filter((m) => !m.isToken).map((m) => (
            <option key={m.id} value={m.id}>
              T{m.tier} · {m.name} ({m.attack}/{m.health})
            </option>
          ))}
        </select>
      </section>

      <section>
        <h2>Triple-Bedingungen</h2>
        <div className="filter-bar">
          <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
              Tavern-Tier
            </span>
            <select
              value={tavernTier}
              onChange={(e) => setTavernTier(Number(e.target.value))}
              className="filter-select"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                <option key={t} value={t}>
                  T{t}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={compTribeLocked}
              onChange={(e) => setCompTribeLocked(e.target.checked)}
            />
            Comp tribe-locked
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={anomalyBoostsTriple}
              onChange={(e) => setAnomalyBoostsTriple(e.target.checked)}
            />
            Anomalie boostet Triple (z.B. Arcane Fortune)
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem" }}>
            Discover +1 (Trinket):
            <select
              value={discoverTierBonus}
              onChange={(e) => setDiscoverTierBonus(Number(e.target.value))}
              className="filter-select"
              style={{ padding: "0.2rem 0.4rem" }}
            >
              <option value={0}>—</option>
              <option value={1}>+1</option>
              <option value={2}>+2</option>
            </select>
          </label>
        </div>
      </section>

      <section>
        <h2>Paare im Board</h2>
        {pairs.length === 0 ? (
          <p className="lead">Keine Paare erkannt. Mindestens 2 Kopien vom selben Minion nötig.</p>
        ) : (
          <>
            <select
              value={pairSelection}
              onChange={(e) => setPairSelection(e.target.value)}
              className="filter-select"
              style={{ marginBottom: "1rem" }}
            >
              {pairs.map((p) => (
                <option key={p.minion.id} value={p.minion.id}>
                  {p.minion.name} ×{p.copies} · {p.minion.attack}/{p.minion.health}
                </option>
              ))}
            </select>

            {result && selectedPair && (
              <div className={`triple-result triple-${result.recommendation.toLowerCase()}`}>
                <div className="triple-headline">
                  Empfehlung: <strong>{result.recommendation.replace("_", " ")}</strong>
                </div>
                <div className="triple-stats">
                  <div>
                    <span className="winrate">EV Triple</span>
                    <strong>{result.evTriple.toFixed(1)}</strong>
                  </div>
                  <div>
                    <span className="winrate">EV Hold</span>
                    <strong>{result.evHold.toFixed(1)}</strong>
                  </div>
                  <div>
                    <span className="winrate">Δ</span>
                    <strong className={result.delta >= 0 ? "positive" : "negative"}>
                      {result.delta >= 0 ? "+" : ""}
                      {result.delta.toFixed(1)}
                    </strong>
                  </div>
                  <div>
                    <span className="winrate">Discover</span>
                    <strong>T{result.discoverTier}</strong>
                  </div>
                </div>
                <p className="triple-reason">{result.reason}</p>
                <details style={{ marginTop: "1rem" }}>
                  <summary style={{ cursor: "pointer", color: "var(--text-dim)" }}>
                    Berechnung anzeigen
                  </summary>
                  <dl className="triple-formula">
                    <dt>Pair</dt>
                    <dd>
                      {selectedPair.minion.name} ({selectedPair.minion.attack}/
                      {selectedPair.minion.health})
                    </dd>
                    <dt>Golden</dt>
                    <dd>
                      {selectedPair.minion.attack * 2 + 1}/
                      {selectedPair.minion.health * 2 + 1}
                    </dd>
                    <dt>Board-Strength-Beitrag (Hold)</dt>
                    <dd>
                      {selectedPair.minion.attack + selectedPair.minion.health}
                    </dd>
                    <dt>Triple-EV: Golden</dt>
                    <dd>
                      ({selectedPair.minion.attack * 2 + 1} +
                      {selectedPair.minion.health * 2 + 1}) + Discover T
                      {result.discoverTier} (
                      {(
                        result.evTriple -
                        (selectedPair.minion.attack * 2 + 1) -
                        (selectedPair.minion.health * 2 + 1)
                      ).toFixed(1)}
                      )
                      {anomalyBoostsTriple ? " + Anomalie-Bonus (+3)" : ""}
                    </dd>
                    <dt>Δ</dt>
                    <dd>
                      {result.evTriple.toFixed(1)} − {result.evHold.toFixed(1)} ={" "}
                      {result.delta.toFixed(1)}
                    </dd>
                  </dl>
                </details>
              </div>
            )}
          </>
        )}
      </section>

      <section>
        <h2>Hinweise zum Triple-EV-Modell</h2>
        <p className="lead">
          Das Modell ist eine <strong>vereinfachte Heuristik</strong>, kein
          präziser Solver. EV-Schätzungen basieren auf Tier-Mittelwerten — ein
          Discover auf T5 ist nicht garantiert stärker als T4 (RNG-abhängig).
          Nutze die Empfehlung als <strong>eine Meinung</strong>, nicht als Befehl.
        </p>
        <p className="lead">
          <strong>Was das Modell NICHT berücksichtigt</strong>:
        </p>
        <ul style={{ paddingLeft: "1.5rem", color: "var(--text-dim)", lineHeight: 1.7 }}>
          <li>Lobby-Comp-Density (wie viele andere Spieler denselben Tribe spielen)</li>
          <li>Board-Order / Deathrattle-Chain-Risiken</li>
          <li>Z-Spell-Comp-Synergien (Soul-Juggler etc.)</li>
          <li>Konkrete Discover-Resultate (immer noch RNG)</li>
        </ul>
      </section>
    </>
  );
}