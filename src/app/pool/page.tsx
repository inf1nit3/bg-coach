import PoolCounterClient from "./PoolCounterClient";

export const metadata = {
  title: "Pool-Counter — BG Coach",
  description:
    "Manuelle Draft-Eingabe und triangulierte Pool-Schätzung für Hearthstone Battlegrounds.",
};

export default function PoolCounterPage() {
  return (
    <div>
      <h1>Pool-Counter</h1>
      <p className="lead">
        Trag dein Board + Shop-Angebote manuell ein. Das Tool schätzt, wie viele
        Kopien jedes Minions noch im Pool sind. <strong>LocalStorage-Speicherung</strong> —
        deine Daten verlassen den Browser nicht.
      </p>

      <PoolCounterClient />
    </div>
  );
}