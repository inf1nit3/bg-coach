import Image from "next/image";
import { type Tier } from "@/lib/types";

// Die genauen Felder hängen davon ab, was 'useHeroesData' für ein Hero-Objekt liefert.
// Wir definieren ein Interface, das den aufbereiteten Hero widerspiegelt.
export interface EnrichedHero {
  id: string;
  name: string;
  nameShort: string | null;
  armor: number;
  armorHighMMR: number;
  armorDuos: number | null;
  buddy: string | null;
  heroPowerText: string;
  tribe: string;
  pictureSmall: string | null;
  picturePortrait: string | null;
  pictureWhole: string | null;
  pictureFull: string | null;
  tier: Tier | null;
  tierReason: string | null;
  topFourRate?: number;
  topOneRate?: number;
  hasTierEntry: boolean;
}

interface HeroCardProps {
  hero: EnrichedHero;
}

export function HeroCard({ hero }: HeroCardProps) {
  return (
    <article
      className={`card card-hero ${!hero.hasTierEntry ? "card-dim" : ""} ${hero.tier ? `card-tier-${hero.tier}` : ""}`}
    >
      <div className="card-head">
        {hero.picturePortrait && (
          <div className="card-art-wrapper">
            <Image
              src={hero.picturePortrait}
              alt={hero.name}
              className="card-art"
              width={96}
              height={96}
            />
            {hero.pictureWhole && (
              <Image
                src={hero.pictureWhole}
                alt=""
                className="card-art-hover"
                width={96}
                height={96}
              />
            )}
          </div>
        )}
        <div className="card-title-block">
          <div className="card-title-row">
            <div className="card-title">
              {hero.name}
              {hero.nameShort && (
                <span className="hero-short"> ({hero.nameShort})</span>
              )}
            </div>
            {hero.tier && (
              <span className={`tier-badge tier-${hero.tier}`}>{hero.tier}</span>
            )}
          </div>
        </div>
      </div>
      <p className="card-desc">{hero.heroPowerText || "—"}</p>

      <div className="hero-stats">
        <span className="winrate">
          Armor: <strong>{hero.armor}</strong>
          {hero.armorHighMMR !== hero.armor && (
            <> · High-MMR: <strong>{hero.armorHighMMR}</strong></>
          )}
        </span>
        {hero.armorDuos !== null && hero.armorDuos !== undefined && (
          <span className="winrate">
            Duos: <strong>{hero.armorDuos}</strong>
          </span>
        )}
      </div>

      {hero.tribe !== "All" && (
        <div className="tag-list" style={{ marginTop: "0.5rem" }}>
          <span className="tag tag-strong">{hero.tribe}</span>
        </div>
      )}

      {hero.buddy && (
        <div className="notes">
          <strong style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
            Buddy:
          </strong>{" "}
          {hero.buddy}
        </div>
      )}

      {hero.tierReason && (
        <div className="notes">{hero.tierReason}</div>
      )}

      {(hero.topFourRate !== undefined || hero.topOneRate !== undefined) && (
        <div className="winrate-row">
          {hero.topFourRate !== undefined && (
            <span className="winrate">
              Top-4: <strong>{hero.topFourRate}%</strong>
            </span>
          )}
          {hero.topOneRate !== undefined && (
            <span className="winrate">
              Top-1: <strong>{hero.topOneRate}%</strong>
            </span>
          )}
        </div>
      )}
    </article>
  );
}
