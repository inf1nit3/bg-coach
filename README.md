# BG Coach

**Hearthstone Battlegrounds Companion — Patch-frische Daten, kein Auto-Pilot.**

Ein Community-Tool für BG-Spieler das zeigt, welche Tribes mit welcher Lobby-Anomalie broken sind und welche Quest-Wahlen am Spielstart die höchste Power haben.

## Was BG Coach macht

- **Anomalie-Matrix** (`/anomalies`) — Lobby-Anomalie → Top-Comps in 5 Sekunden
- **Quest Tier-List** (`/quests`) — 3 Quest-Wahlen → S/A/B/C-Tier-Empfehlung mit Top-4-Raten
- **Pool-Counter** (bald) — Manuelle Draft-Eingabe → trianguliert wie viele Minions noch im Pool sind
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

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **CSS Variables** (kein Framework, dunkles Theme, `prefers-reduced-motion`-aware)

## Datenquellen

- **HearthstoneJSON** (GitHub, CC-BY-SA) — Minion-DB, geplant für Pool-Counter
- **HSReplay.net** (Public Stats) — Winrate-Referenz für Quests/Heroes
- **Manuell kuratiert** — Anomalie-Bewertungen, initiale Tier-Listen

Aktuell: **Patch 27.6 (Juni 2026)**. Daten werden manuell nach jedem Blizzard-Patch gepflegt.

## Roadmap

**Phase 1 (Wochen 1–2)** ✅
- Anomalie-Synergie-Matrix
- Quest Tier-List
- Statisches Web-Tool, SEO-ready

**Phase 2 (Wochen 3–5)**
- Pool-Counter (PWA, manuelle Board-Eingabe)
- LocalStorage-Persistenz

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
│   ├── page.tsx          # Home
│   ├── globals.css       # Theme + Components
│   ├── anomalies/        # Anomalie-Matrix
│   └── quests/           # Quest Tier-List
└── lib/
    ├── types.ts          # Domain-Types (Tribe, Tier, Anomaly, Quest)
    ├── anomalies.ts      # Anomalie-DB + Helpers
    └── quests.ts         # Quest-DB + Helpers
```

## Disclaimer

BG Coach ist ein Fan-Projekt. Alle Hearthstone-Marken und -Inhalte sind Eigentum von Blizzard Entertainment. Dieses Tool ist nicht mit Blizzard verbunden oder von ihnen unterstützt. Daten werden manuell gepflegt — keine Garantie auf Vollständigkeit oder Aktualität.