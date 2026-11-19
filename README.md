# Helios Investments — AI-Driven Wealth & Multi-Asset Portfolio Management Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/State-Zustand-764abc)
![Recharts](https://img.shields.io/badge/Charts-Recharts-c084fc)
![License](https://img.shields.io/badge/Local--First-Offline--Ready-34d399)

A dark-luxury **Mauve Obsidian** portfolio intelligence dashboard. Track multi-asset valuations, explore high-precision Recharts performance curves with milestone markers, monitor a live watchlist, execute instant Buy/Sell simulations, consult the **Helios AI** copilot for rebalancing, and export professional Excel reports — all 100% client-side and offline-ready.

---

## Visual Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar        │  Welcome, Nadia                           │
│  Helios  ◇ H    │  Market · [Wallet] · Tools   Ask helios.ai │
│  ▸ Dashboard    ├───────────────┬──────────────┬────────────┤
│    Portfolio    │ Total Holding │  Watchlist   │ My         │
│    Analysis     │ $ 12,304.11   │  SPOT +16%   │ Portfolio  │
│    Market       │ Decisions     │  AMZN +8%    │ 2×2 grid   │
│    Community    │ Powered by AI │  MSFT +5%    │ AAPL…NVDA  │
│  Settings       ├───────────────┴──────────────┴────────────┤
│  Support        │  Portfolio Performance (AreaChart 1Y)     │
│                 │  milestone ▸ 1st Jun 2025 · $16,500 +25%  │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Features

- **Dark Luxury Mauve Obsidian UI** — deep plum glassmorphic panels, mauve radial glows, and emerald gain accents.
- **Total Holding Card** — live portfolio valuation with a 1M/3M/6M/1Y/ALL range selector.
- **Interactive Watchlist** — SPOT, AMZN, MSFT and NVDA with Most Viewed / Gain / Lose filters.
- **Portfolio Grid** — AAPL, AMZN, MSFT, NVDA position cards that open a detail + order modal.
- **Recharts Performance AreaChart** — smooth monotone mauve curve with a static milestone pin, dashed guide line, and glowing pink dot at June 2025.
- **Helios AI Copilot Drawer** — slide-over assistant with rebalancing recommendations, quick actions, and simulated intelligent replies (`Ctrl+K`).
- **Order Simulation** — buy/sell with cash-balance and unit validation plus canvas-confetti celebration.
- **Market Explorer, Risk Analysis & Community Sentiment** — dedicated `/market`, `/analysis`, `/community` views.
- **ExcelJS Export** — generate `Holdings & Valuation` and `Transaction History` sheets fully in-browser.
- **Live Market Ticker Simulator** — toggle in Settings; prices fluctuate every 3s with green/red price flashes.
- **Local-First Persistence** — Zustand `persist` to `localStorage` with safe hydration (`helios_investments_store_v1`).

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript 5.6 (strict, no `any`) |
| Styling | Tailwind CSS 3.4 + PostCSS |
| State | Zustand 5 (`persist` middleware) |
| Charts | Recharts 2 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Reporting | ExcelJS 4 + File-Saver |
| FX | Canvas Confetti |

---

## Getting Started (Local)

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Type-Check & Production Build

```bash
npx tsc --noEmit   # 0 errors required
npm run build      # static export → ./out
```

## Deploy to GitHub Pages

The app is configured for static export (`output: 'export'`, `images.unoptimized`, `trailingSlash`) and ships a `public/.nojekyll` so `_next/` assets are served correctly.

```bash
npm run deploy     # builds and publishes ./out to the gh-pages branch
```

To host under a repository sub-path (e.g. `https://user.github.io/helios`), set the base path before building:

```bash
NEXT_PUBLIC_BASE_PATH=/helios npm run build
```

---

## Project Structure

```text
app/            App Router pages (dashboard, portfolio, market, analysis, community, settings)
components/     layout / dashboard / ai / modals / ui / portfolio components
lib/            store, seeds, formatters, excel-export, ticker-simulator, toast, ui-store
types/          Shared TypeScript contracts
public/         Static assets incl. .nojekyll
blueprint/      Specification, tasks and progress tracking
```

---

## Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build + static export to `out/` |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run `tsc --noEmit` |
| `npm run export` | Alias for static production build |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

Built as an offline-first, enterprise-grade FinTech dashboard for the Helios Investments blueprint.
