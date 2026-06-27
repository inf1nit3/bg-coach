import HeroesClient from "./HeroesClient";

export const metadata = {
  title: "Hero Tier-Liste — BG Coach",
  description:
    "BG-Heroes mit Tier-Bewertung pro MMR-Bucket. Patch-frisch für Hearthstone Battlegrounds.",
};

export default function HeroesPage() {
  return (
    <div>
      <h1>Hero Tier-Liste</h1>
      <p className="lead">
        Alle 111 aktiven BG-Heroes mit Tier-Bewertung pro MMR-Bucket. Filter
        nach Tribe um Comp-Plan einzugrenzen, nach Tier um nur Meta-Heroes zu
        sehen, nach MMR um deine Spielstärke zu matchen.
      </p>

      <HeroesClient />
    </div>
  );
}