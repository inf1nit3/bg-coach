import QuestsClient from "./QuestsClient";

export const metadata = {
  title: "Quest Tier-List — BG Coach",
  description:
    "Battlegrounds-Quests sortiert nach Power-Level. Top-4-Raten pro Patch für Hearthstone Battlegrounds.",
};

export default function QuestsPage() {
  return (
    <div>
      <h1>Quest Tier-List</h1>
      <p className="lead">
        Du siehst 3 Quest-Wahlen am Spielstart. Hier siehst du, welche davon
        broken sind — sortiert nach Top-4-Rate aus HSReplay-Daten.
      </p>

      <QuestsClient />
    </div>
  );
}