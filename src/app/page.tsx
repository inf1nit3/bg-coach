import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>BG Coach</h1>
      <p className="lead">
        Dein Companion für Hearthstone Battlegrounds. Patch-frische Daten,
        keine Overlay-Spielerei, kein Auto-Pilot. Skill-Tool, kein Cheat.
      </p>

      <p className="trust-strip" role="note">
        Skill-Tool, kein Overlay, kein Auto-Pilot — Daten bleiben im Browser.
      </p>

      <div className="feature-grid">
        <div className="feature">
          <span className="feature-status feature-status-live">● Live</span>
          <div className="feature-title">
            <Link href="/anomalies">Anomalie-Matrix</Link>
          </div>
          <p className="card-desc">
            Welche Tribes mit welcher Lobby-Anomalie broken sind. Vor jedem
            Spiel in 5 Sekunden die Antwort.
          </p>
        </div>
        <div className="feature">
          <span className="feature-status feature-status-live">● Live</span>
          <div className="feature-title">
            <Link href="/quests">Quest Tier-List</Link>
          </div>
          <p className="card-desc">
            Die 3 Quest-Wahlen am Spielstart — Top-4-Raten pro Patch,
            sortiert nach Power-Level.
          </p>
        </div>
        <div className="feature">
          <span className="feature-status feature-status-live">● Live</span>
          <div className="feature-title">
            <Link href="/heroes">Hero Tier-Liste</Link>
          </div>
          <p className="card-desc">
            111 BG-Heroes mit Tier-Bewertung pro MMR-Bucket. Filter nach
            Comp-Tribe und deiner Spielstärke.
          </p>
        </div>
        <div className="feature">
          <span className="feature-status feature-status-live">● Live</span>
          <div className="feature-title">
            <Link href="/pool">Pool-Counter</Link>
          </div>
          <p className="card-desc">
            Manuelle Eingabe deiner Drafts/Sells — Tool trianguliert wie viele
            Minions noch im Pool sind. LocalStorage-Speicherung.
          </p>
        </div>
        <div className="feature">
          <span className="feature-status feature-status-live">● Live</span>
          <div className="feature-title">
            <Link href="/triple-ev">Triple-EV Helper</Link>
          </div>
          <p className="card-desc">
            Triple jetzt oder Hold? Pre-Combat-Empfehlung mit
            Discover-Pool-Modell.
          </p>
        </div>
      </div>

      <h2>Was BG Coach nicht ist</h2>
      <p className="lead">
        Kein Overlay das dir ins Ohr flüstert. Kein Auto-Play. Kein
        Live-Combot-Read. Du triffst die Entscheidungen — wir liefern die
        Datenbasis.
      </p>

      <h2>Patch-Stand</h2>
      <p className="lead">
        Aktuelle Daten: Patch <strong>27.6</strong> (Juni 2026).
        Aktualisierung erfolgt manuell nach jedem Blizzard-Patch + HSReplay-Snapshot.
      </p>
    </div>
  );
}