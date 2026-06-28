import { type MinionPoolCounter } from "@/lib/pool-counter";

interface CounterTableProps {
  counters: MinionPoolCounter[];
}

export function CounterTable({ counters }: CounterTableProps) {
  return (
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
              {c.status === "red" && (
                <>
                  {" "}
                  <span aria-hidden="true">⚠</span>
                  <span className="sr-only">Wahrscheinlich ausverkauft</span>
                </>
              )}
              {c.status === "yellow" && (
                <>
                  {" "}
                  <span aria-hidden="true">⚡</span>
                  <span className="sr-only">Knapp</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
