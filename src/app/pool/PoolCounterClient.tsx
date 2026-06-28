"use client";

import { usePoolCounter } from "@/hooks/usePoolCounter";
import { BoardSection } from "@/components/BoardSection";
import { ShopLogSection } from "@/components/ShopLogSection";
import { CounterTable } from "@/components/CounterTable";

export default function PoolCounterClient() {
  const {
    state,
    setState,
    hydrated,
    minions,
    counters,
    reset,
    logShop,
    addBoardMinion,
    removeBoardMinion,
  } = usePoolCounter();

  if (!hydrated) {
    return (
      <p className="lead" role="status" aria-live="polite">
        Lade gespeichertes Spiel…
      </p>
    );
  }

  return (
    <>
      <div className="pool-meta">
        <label className="sr-only" htmlFor="pool-hero-input">
          Hero
        </label>
        <input
          id="pool-hero-input"
          type="text"
          placeholder="Hero"
          value={state.hero}
          onChange={(e) => setState((s) => ({ ...s, hero: e.target.value }))}
          className="filter-input"
          style={{ maxWidth: 180 }}
        />
        <label className="sr-only" htmlFor="pool-tavern-select">
          Tavern-Tier
        </label>
        <select
          id="pool-tavern-select"
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
        <span className="winrate" aria-label={`Aktuelle Runde ${state.turn}`}>
          Runde: {state.turn}
        </span>
        <button onClick={reset} className="btn-danger">
          Reset
        </button>
      </div>

      <BoardSection
        board={state.board}
        minions={minions}
        removeBoardMinion={removeBoardMinion}
        tavernTier={state.tavernTier}
        addBoardMinion={addBoardMinion}
      />

      <ShopLogSection
        state={state}
        minions={minions}
        logShop={logShop}
        setState={setState}
      />

      <CounterTable counters={counters} />

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