import AnomaliesClient from "./AnomaliesClient";

export const metadata = {
  title: "Anomalie-Matrix — BG Coach",
  description:
    "Welche Tribes mit welcher Lobby-Anomalie broken sind. Patch-frisch für Hearthstone Battlegrounds.",
};

export default function AnomaliesPage() {
  return (
    <div>
      <h1>Anomalie-Matrix</h1>
      <p className="lead">
        Lobby-Anomalie sehen → hier nachschlagen → Tribe-Wahl in 5 Sekunden.
        S-Tier Tribes sind mit dieser Anomalie Meta-definierend.
      </p>

      <AnomaliesClient />
    </div>
  );
}