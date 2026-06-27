# BG Coach

**Hearthstone Battlegrounds Companion — Patch-frische Daten, kein Auto-Pilot.**

Ein Community-Tool für BG-Spieler das zeigt, welche Tribes mit welcher Lobby-Anomalie broken sind, welche Quest-Wahlen am Spielstart die höchste Power haben, und wie viele Minions noch im Pool sind.

## Was BG Coach macht

- **Anomalie-Matrix** (`/anomalies`) — Lobby-Anomalie → Top-Comps in 5 Sekunden, mit Tribe/MMR-Filter
- **Quest Tier-List** (`/quests`) — 16+ Quests → S/A/B/C-Tier-Empfehlung mit Top-4-Raten, mit Tribe/Tier-Filter
- **Pool-Counter** (`/pool`) — Manuelle Board- und Shop-Eingabe → triangulierte Pool-Schätzung mit LocalStorage
- **Triple-EV Helper** (bald) — Triple jetzt oder Hold? Pre-Combat-Empfehlung

## Was BG Coach NICHT ist

- Kein Overlay
- Kein Auto-Play
- Kein Live-Combat-Read
- Kein Blizzard-Produkt
- Skill-Tool, nicht Cheat

## Setup

```bash
npm install
npm run dev      # localhost:3000
npm run build    # Production-Build
npm run typecheck
```

## Stack

- **Next.js 14** (App Router, Static Export)
- **TypeScript** (strict)
- **CSS Variables** (kein Framework, dunkles Theme, `prefers-reduced-motion`-aware)

## Datenquellen

- **HearthstoneJSON** (geplant) — Minion-DB sobald API-Quelle verfügbar
- **HSReplay.net** (Public Stats) — Winrate-Referenz für Quests/Heroes
- **Manuell kuratiert** — Anomalie-Bewertungen, Quest-Tier-Listen, Minion-DB (Stand 27.6)

Aktuell: **Patch 27.6 (Juni 2026)**.

## Pool-Counter Funktionsweise

Das Tool **sieht nicht** den Pool der anderen Spieler — das ist technisch nicht möglich ohne Blizzard-API-Zugriff oder illegalen Memory-Scan. Was es tut:

1. Du gibst manuell deinen Board-State und die Shop-Angebote ein
2. Es berechnet aus deinen Drafts/Sells den **eigenen** Pool-Drain
3. Es subtrahiert diesen von der **Standard-Pool-Größe** pro Minion
4. Es zeigt dir Rest-Pool-Schätzungen mit **grün/gelb/rot**-Status

**Limitation**: Wenn 3 andere Spieler z.B. T6-Minions gezogen haben, siehst du das nicht. Counter ist daher ein **Mindest-Wert** ("auf jeden Fall noch so viele da"), nie ein exakter Wert.

## Roadmap

**Phase 1 (Wochen 1–2)** ✅
- Anomalie-Synergie-Matrix
- Quest Tier-List
- Filter (Tribe, MMR, Tier)

**Phase 2 (Wochen 3–5)** ✅
- Pool-Counter (PWA, manuelle Board-Eingabe)
- LocalStorage-Persistenz
- Triangulations-Engine

**Phase 3 (Wochen 6–9)**
- Triple-EV Decision Helper
- Discover-Pool-Modell

**Phase 4 (Wochen 10–16)**
- Combat-Outcome-Predictor v2 (Trinket + Anomalie mid-combat)

## Projekt-Struktur

```
src/
├── app/
│   ├── layout.tsx        # Root-Layout, Header, Footer
│   ├── page.tsx          # Home mit Feature-Übersicht
│   ├── globals.css       # Theme + Components
│   ├── anomalies/        # Anomalie-Matrix mit Filter
│   ├── quests/           # Quest Tier-List mit Filter
│   └── pool/             # Pool-Counter (manuell + Triangulation)
└── lib/
    ├── types.ts          # Domain-Types (Tribe, Tier, Anomaly, Quest, Minion)
    ├── anomalies.ts      # Anomalie-DB + Helpers
    ├── quests.ts         # Quest-DB + Helpers
    ├── minions.ts        # Minion-DB (handkuratiert, 130+ Minions Tier 1-6)
    └── pool-counter.ts   # Triangulations-Engine + LocalStorage
```

## Disclaimer

BG Coach ist ein Fan-Projekt. Alle Hearthstone-Marken und -Inhalte sind Eigentum von Blizzard Entertainment. Dieses Tool ist nicht mit Blizzard verbunden oder von ihnen unterstützt. Daten werden manuell gepflegt — keine Garantie auf Vollständigkeit oder Aktualität.