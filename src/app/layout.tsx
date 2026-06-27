import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BG Coach — Hearthstone Battlegrounds Companion",
  description:
    "Patch-frische Anomalie-Matrizen, Quest Tier-Lists und Battlegrounds-Coach-Tools. Skill-Tool, kein Auto-Pilot.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="BG Coach Home">
              <span className="brand-mark">BG</span>
              <span className="brand-name">Coach</span>
            </Link>
            <nav className="nav" aria-label="Main Navigation">
              <Link href="/anomalies">Anomalien</Link>
              <Link href="/quests">Quests</Link>
              <Link href="/heroes">Heroes</Link>
              <Link href="/pool">Pool-Counter</Link>
              <Link href="/triple-ev">Triple-EV</Link>
            </nav>
          </div>
        </header>
        <main className="container main">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>
              BG Coach — Community-Tool. Daten manuell kuratiert + HSReplay-Referenz.
              Patch: 27.6 (Juni 2026).
            </p>
            <p className="disclaimer">
              Kein Blizzard-Produkt. Kein Overlay. Kein Auto-Pilot. Skill &gt; Cheat.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}