import TripleEvClient from "./TripleEvClient";

export const metadata = {
  title: "Triple-EV Helper — BG Coach",
  description:
    "Triple jetzt oder Hold? Pre-Combat-Empfehlung mit EV-Berechnung für Hearthstone Battlegrounds.",
};

export default function TripleEvPage() {
  return (
    <div>
      <h1>Triple-EV Helper</h1>
      <p className="lead">
        Du hast ein Paar im Board. Triple jetzt oder Hold für Board-Strength? Das
        Tool schätzt den Expected Value beider Optionen und gibt eine Empfehlung
        — du entscheidest selbst.
      </p>

      <TripleEvClient />
    </div>
  );
}