import { useState } from "react";
import { type PoolCounterState, type ShopLogEntry } from "@/lib/pool-counter";

interface ShopLogSectionProps {
  state: PoolCounterState;
  minions: any[];
  logShop: (offered: string[]) => void;
  setState: React.Dispatch<React.SetStateAction<PoolCounterState>>;
}

export function ShopLogSection({
  state,
  minions,
  logShop,
  setState,
}: ShopLogSectionProps) {
  return (
    <section>
      <h2>Shop-Log</h2>
      <button
        onClick={() => {
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
  );
}

function ShopOfferedEditor({
  entry,
  minions,
  state,
  onUpdate,
}: {
  entry: ShopLogEntry;
  minions: any[];
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
