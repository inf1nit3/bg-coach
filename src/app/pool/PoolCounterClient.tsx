"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllMinions } from "@/lib/minions";
import {
  createEmptyState,
  computePoolCounters,
  saveState,
  loadState,
  clearState,
  type PoolCounterState,
  type BoardEntry,
  type ShopLogEntry,
} from "@/lib/pool-counter";

export default function PoolCounterClient() {
  const minions = useMemo(() => getAllMinions(), []);
  const [state, setState] = useState<PoolCounterState>(() => createEmptyState());
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from LocalStorage
  useEffect(() => {
    const loaded = loadState();
    if (loaded) setState(loaded);
    setHydrated(true);
  }, []);

  // Verhindere Save-Race: erst nach Hydration persistieren
  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

  const counters = useMemo(
    () => computePoolCounters(state, minions),
    [state, minions]
  );

  // Vor Hydration: Skeleton rendern, kein leeres Board zeigen (vermeidet Flicker)
  if (!hydrated) {
    return (
      <p className="lead" role="status" aria-live="polite">
        Lade gespeichertes Spiel…
      </p>
    );
  }

  function reset() {
    if (confirm("Aktuelles Spiel zurücksetzen?")) {
      setState(createEmptyState());
      clearState();
    }
  }

  function logShop(offered: string[]) {
    setState((s) => ({
      ...s,
      turn: s.turn + 1,
      shopLog: [
        ...s.shopLog,
        { turn: s.turn, offered, bought: null, sold: null, discovered: null },
      ],
    }));
  }

  function buyMinion(entry: ShopLogEntry, minionId: string) {
    setState((s) => ({
      ...s,
      shopLog: s.shopLog.map((e) =>
        e === entry ? { ...e, bought: minionId } : e
      ),
    }));
  }

  function sellMinion(entry: ShopLogEntry, minionId: string) {
    setState((s) => ({
      ...s,
      shopLog: s.shopLog.map((e) =>
        e === entry ? { ...e, sold: minionId } : e
      ),
    }));
  }

  function addBoardMinion(minionId: string) {
    setState((s) => {
      const existing = s.board.find((b) => b.minionId === minionId && !b.golden);
      if (existing) {
        // Defense: falls existing.copies bereits >= 3 ist (korrupter State),
        // clampen statt auf copies: 4 zu gehen — direkt zu Golden konvertieren.
        const newCopies = Math.max(existing.copies + 1, 3);
        if (newCopies >= 3) {
          // Triple! Entferne ALLE non-golden Einträge dieses Minions, damit kein
          // copies: 4 Straggler zurückbleibt, dann zu golden konvertieren.
          const others = s.board.filter(
            (b) => !(b.minionId === minionId && !b.golden)
          );
          return {
            ...s,
            board: [...others, { minionId, golden: true, copies: 1 }],
          };
        }
        return {
          ...s,
          board: s.board.map((b) =>
            b === existing ? { ...b, copies: newCopies } : b
          ),
        };
      }
      return {
        ...s,
        board: [...s.board, { minionId, golden: false, copies: 1 }],
      };
    });
  }

  function removeBoardMinion(index: number) {
    setState((s) => ({
      ...s,
      board: s.board.filter((_, i) => i !== index),
    }));
  }

  return (
    <>
      <div className="pool-meta">
        <input
          type="text"
          placeholder="Hero"
          value={state.hero}
          onChange={(e) => setState((s) => ({ ...s, hero: e.target.value }))}
          className="filter-input"
          style={{ maxWidth: 180 }}
        />
        <select
          value={state.tavernTier}
          onChange={(e) =>
            setState((s) => ({
            ...s,
            tavernTier: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 | 7,
          }))
          }
          className="filter-select"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((t) => (
            <option key={t} value={t}>
              Tier {t}
            </option>
          ))}
        </select>
        <span className="winrate">Runde: {state.turn}</span>
        <button onClick={reset} className="btn-danger">
          Reset
        </button>
      </div>

      <section>
        <h2>Board ({state.board.length})</h2>
        <div className="board-grid">
          {state.board.map((b, i) => {
            const minion = minions.find((m) => m.id === b.minionId);
            if (!minion) return null;
            return (
              <div key={i} className={`board-card ${b.golden ? "golden" : ""}`}>
                <div className="board-name">
                  {minion.name}
                  {b.golden && " ⭐"}
                </div>
                <div className="board-stats">
                  {b.golden ? "×2" : `×${b.copies}`} · {minion.attack}/{minion.health}
                </div>
                <button
                  onClick={() => removeBoardMinion(i)}
                  className="btn-tiny"
                  aria-label={`Entfernen ${minion.name}`}
                >
                  ×
                </button>
              </div>
            );
          })}
          {state.board.length === 0 && (
            <p className="lead" style={{ gridColumn: "1 / -1" }}>
              Board ist leer. Füge unten Minions hinzu.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2>Minion hinzufügen</h2>
        <select
          onChange={(e) => {
            if (e.target.value) {
              addBoardMinion(e.target.value);
              e.target.value = "";
            }
          }}
          className="filter-select"
          defaultValue=""
        >
          <option value="" disabled>
            Minion wählen…
          </option>
          {minions
            .filter((m) => m.tier <= state.tavernTier)
            .map((m) => (
              <option key={m.id} value={m.id}>
                T{m.tier} · {m.name} ({m.attack}/{m.health})
              </option>
            ))}
        </select>
      </section>

      <section>
        <h2>Shop-Log</h2>
        <button
          onClick={() => {
            // Mock: leere Shop-Rolle zum manuellen Ausfüllen
            logShop([]);
          }}
          className="btn-primary"
        >
          + Neue Runde (Shop-Eintrag)
        </button>
        {state.shopLog.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            {state.shopLog.slice().reverse().map((entry, idx) => (
              <div key={idx} className="shop-entry">
                <strong>Runde {entry.turn}</strong>
                <div style={{ marginTop: "0.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                    Shop-Angebot:
                  </label>
                  <ShopOfferedEditor
                    entry={entry}
                    minions={minions}
                    state={state}
                    onUpdate={(offered) =>
                      setState((s) => ({
                        ...s,
                        shopLog: s.shopLog.map((e) =>
                          e === entry ? { ...e, offered } : e
                        ),
                      }))
                    }
                  />
                </div>
                <div className="shop-actions">
                  <select
                    value={entry.bought ?? ""}
                    onChange={(e) => {
                      const v = e.target.value || null;
                      setState((s) => ({
                        ...s,
                        shopLog: s.shopLog.map((e2) =>
                          e2 === entry ? { ...e2, bought: v } : e2
                        ),
                      }));
                    }}
                    className="filter-select"
                    style={{ fontSize: "0.8rem", padding: "0.25rem 0.4rem" }}
                  >
                    <option value="">— Gekauft: —</option>
                    {entry.offered.map((id) => {
                      const m = minions.find((mm) => mm.id === id);
                      return m ? (
                        <option key={id} value={id}>
                          {m.name}
                        </option>
                      ) : null;
                    })}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Pool-Counter (Triangulation)</h2>
        <p className="lead">
          Schätzung aus deinen Drafts. <strong>Andere Spieler sind unsichtbar</strong> —
          Counter ist daher Mindest-Wert. Rote Zeilen sind wahrscheinlich ausverkauft.
        </p>
        <div className="counter-table">
          <div className="counter-row counter-head">
            <div>Minion</div>
            <div>Tier</div>
            <div>Pool total</div>
            <div>Gezogen</div>
            <div>Im Board</div>
            <div>Rest</div>
          </div>
          {counters.map((c) => (
            <div key={c.minion.id} className={`counter-row counter-${c.status}`}>
              <div>{c.minion.name}</div>
              <div>T{c.minion.tier}</div>
              <div>{c.totalPool}</div>
              <div>{c.playerDrawn}</div>
              <div>{c.playerHas}</div>
              <div>
                <strong>{c.estimatedRemaining}</strong>
                {c.status === "red" && " ⚠"}
                {c.status === "yellow" && " ⚡"}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Hinweis</h2>
        <p className="lead">
          Pool-Counter ist eine <strong>Schätzung</strong>, kein Insider-Tool.
          Blizzard zeigt dir nur den eigenen Shop-Slice. Andere 7 Spieler
          können Minions gezogen haben, die du nie siehst. Nutze den Counter
          als groben Indikator, nicht als Wahrheit.
        </p>
      </section>
    </>
  );
}

function ShopOfferedEditor({
  entry,
  minions,
  state,
  onUpdate,
}: {
  entry: ShopLogEntry;
  minions: ReturnType<typeof getAllMinions>;
  state: PoolCounterState;
  onUpdate: (offered: string[]) => void;
}) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="shop-offer-editor">
      {entry.offered.map((id, i) => {
        const m = minions.find((mm) => mm.id === id);
        return (
          <span key={i} className="tag tag-strong" style={{ marginRight: "0.25rem" }}>
            {m?.name ?? id}
            <button
              onClick={() =>
                onUpdate(entry.offered.filter((_, idx) => idx !== i))
              }
              className="btn-tiny"
              style={{ marginLeft: "0.3rem" }}
              aria-label={`Entfernen ${m?.name ?? id}`}
            >
              ×
            </button>
          </span>
        );
      })}
      <select
        value={selected}
        onChange={(e) => {
          if (e.target.value) {
            onUpdate([...entry.offered, e.target.value]);
            setSelected("");
          }
        }}
        className="filter-select"
        style={{ fontSize: "0.8rem", padding: "0.25rem 0.4rem" }}
      >
        <option value="" disabled>
          + Minion
        </option>
        {minions
          .filter((m) => m.tier <= state.tavernTier)
          .map((m) => (
            <option key={m.id} value={m.id}>
              T{m.tier} · {m.name}
            </option>
          ))}
      </select>
    </div>
  );
}