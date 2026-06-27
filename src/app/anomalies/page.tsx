import { getAllAnomalies } from "@/lib/anomalies";

export const metadata = {
  title: "Anomalie-Matrix — BG Coach",
  description:
    "Welche Tribes mit welcher Lobby-Anomalie broken sind. Patch-frisch für Hearthstone Battlegrounds.",
};

export default function AnomaliesPage() {
  const anomalies = getAllAnomalies();

  return (
    <div>
      <h1>Anomalie-Matrix</h1>
      <p className="lead">
        Lobby-Anomalie sehen → hier nachschlagen → Tribe-Wahl in 5 Sekunden.
        S-Tier Tribes sind mit dieser Anomalie Meta-definierend.
      </p>

      <div className="grid">
        {anomalies.map((a) => (
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

            {a.notes && <div className="notes">{a.notes}</div>}
          </article>
        ))}
      </div>
    </div>
  );
}