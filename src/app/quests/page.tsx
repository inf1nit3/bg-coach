import { getAllQuests } from "@/lib/quests";

export const metadata = {
  title: "Quest Tier-List — BG Coach",
  description:
    "Battlegrounds-Quests sortiert nach Power-Level. Top-4-Raten pro Patch für Hearthstone Battlegrounds.",
};

export default function QuestsPage() {
  const quests = getAllQuests();

  return (
    <div>
      <h1>Quest Tier-List</h1>
      <p className="lead">
        Du siehst 3 Quest-Wahlen am Spielstart. Hier siehst du, welche davon
        broken sind — sortiert nach Top-4-Rate aus HSReplay-Daten.
      </p>

      <div className="grid">
        {quests.map((q) => (
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

      <h2>Hinweis zu den Winrates</h2>
      <p className="lead">
        Die Top-4/Top-1-Raten sind grobe Schätzungen basierend auf
        Community-Konsens und HSReplay-Snapshots. Bei neuem Patch können sich
        die Werte innerhalb von 48 Stunden verschieben.{" "}
        <strong>Daten sind Entscheidungshilfe, keine Garantie.</strong>
      </p>
    </div>
  );
}