import Image from "next/image";
import { type PoolCounterState } from "@/lib/pool-counter";
import { type Minion } from "@/lib/minions"; // assuming type Minion is exported there, let's just infer it or pass minions array

// We don't have Minion imported directly as a type, so let's define it loosely or import if it exists.
// I will just use any for the minions array or let TypeScript infer if I import it correctly.
// Let's assume Minion type from "@/lib/minions" or use generic typing for now.
// Better: export the type from the file, but I don't want to edit too many files if I don't have to.
// I will use `ReturnType<typeof getAllMinions>[0]` 

interface BoardSectionProps {
  board: PoolCounterState["board"];
  minions: any[];
  removeBoardMinion: (index: number) => void;
  tavernTier: number;
  addBoardMinion: (minionId: string) => void;
}

export function BoardSection({
  board,
  minions,
  removeBoardMinion,
  tavernTier,
  addBoardMinion,
}: BoardSectionProps) {
  return (
    <>
      <section>
        <h2>Board ({board.length})</h2>
        <div className="board-grid">
          {board.map((b, i) => {
            const minion = minions.find((m) => m.id === b.minionId);
            if (!minion) return null;
            return (
              <div key={i} className={`board-card ${b.golden ? "golden" : ""}`}>
                {minion.picture && (
                  <Image
                    src={minion.picture}
                    alt={minion.name}
                    width={32}
                    height={32}
                    className="minion-icon"
                  />
                )}
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
          {board.length === 0 && (
            <div
              className="empty-state"
              role="status"
              aria-live="polite"
              style={{ gridColumn: "1 / -1" }}
            >
              <p className="lead" style={{ marginBottom: "0.5rem" }}>
                Board ist leer.
              </p>
              <p className="text-dim">
                ↓ Wähle unten ein Minion, um dein Board aufzubauen.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 id="board-add-heading">Minion hinzufügen</h2>
        <label className="sr-only" htmlFor="board-add-select">
          Minion wählen
        </label>
        <select
          id="board-add-select"
          aria-labelledby="board-add-heading"
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
            .filter((m) => m.tier === tavernTier)
            .map((m) => (
              <option key={m.id} value={m.id}>
                T{m.tier} · {m.name} ({m.attack}/{m.health})
              </option>
            ))}
        </select>
      </section>
    </>
  );
}
