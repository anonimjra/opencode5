# BLUEPRINT GENERATOR V5 (Helios Investments - AI FinTech & Wealth Intelligence Edition)

Kamu adalah **arsitek & planner**, BUKAN coder. Tugasmu: baca brief di bawah, lalu buat folder `blueprint/` berisi puluhan file `.md` yang nantinya dieksekusi oleh agen lain (opencode) secara otonom, tanpa konfirmasi.

**Jangan tulis kode aplikasi.** Yang kamu hasilkan hanya dokumen perencanaan (`.md`) dan satu `AGENTS.md`.

---

## 1. BRIEF (HELIOS INVESTMENTS - AI WEALTH & PORTFOLIO INTELLIGENCE)

- **Nama project:** Helios Investments — AI-Driven Portfolio & Multi-Asset Wealth Intelligence Dashboard (Brand: "Helios Investments", User Profile Mock: "Nadia Rachel - rachel_helios@gmail.com")
- **Tujuan:** Dashboard manajemen portofolio investasi multi-aset (Saham US/NYSE/NASDAQ, ETF, Big Tech, Crypto) berbasis web yang menggabungkan visualisasi performa portofolio berkelas enterprise, tracking watchlist realtime, kartu posisi kepemilikan aset (AAPL, AMZN, MSFT, NVDA), kartu metrik "Total Holding", serta asisten AI interaktif ("Helios AI Insights") untuk analisis risiko, rebalancing portofolio, dan rekomendasi beli/jual bertenaga data. Beroperasi client-side local-first dengan persistensi LocalStorage dan siap diexport statis ke GitHub Pages.
- **Target pengguna:**
  - Investor ritel modern, tech-savvy wealth builder, dan trader yang mengutamakan visual estetik dark luxury (mauve/obsidian theme), kemudahan memantau portofolio, dan saran berbasis AI tanpa harus setup backend rumit.
- **Fitur utama (mengacu visual presisi UI referensi):**
  - **Sidebar Navigasi Kiri (Dark Obsidian Pill Navigation):**
    - Logo & Identitas Brand: Stylized geometric "H" Icon + "Helios Investments".
    - Menu Navigasi Utama:
      - **Dashboard** (State aktif: pill gradasi soft mauve glow).
      - **Portfolio** (Detail alokasi aset, tabel breakdown, return per ticker).
      - **Analysis** (Matriks risiko, Sharpe ratio, dividen yield, drawdown).
      - **Market** (Screener bursa NYSE/NASDAQ, top gainer/loser, tren sektor).
      - **Community** (Sentimen investor komunitas, feeds diskusi, polling bullish/bearish).
    - Menu Bawah:
      - **Settings** (Pengaturan mata uang USD/IDR, toggle simulator harga live, tema visual).
      - **Support** (Bantuan 24/7, FAQ, panduan integrasi bursa).
  - **Header Navigasi Atas (Top Header Shell):**
    - Greeting Dinamis: "Welcome, Nadia" + Subteks "Here's your investment portfolio overview".
    - Sub-navigasi Tab Segmen: **Market**, **Wallet** (Active pill dengan soft purple glow), **Tools**.
    - Global AI Prompt / Command Bar: "Ask helios.ai anything" dilengkapi ikon microphone & sparkle. Mengetik query atau mengklik akan membuka drawer asisten AI cerdas.
    - User Controls: Ikon Notifikasi (Bell dengan indikator badge unread), Ikon Settings cepat, dan Chip Profil Pengguna (Avatar, "Nadia Rachel", "rachel_helios@gmail.com").
  - **Grid Utama Bagian Atas (3 Kolom Seimbang):**
    - **Kolom 1 - Total Holding & AI Decisions Banner:**
      - Kartu "Total Holding":
        - Dropdown filter periode holding: **6M** (opsi: 1M, 3M, 6M, 1Y, ALL).
        - Angka saldo portofolio besar: **$ 12,304.11**.
        - Indikator performa mini: +$1,240.50 (+11.2%).
      - Kartu Promosi "Decisions Powered by Data":
        - Copywriting: *"Move beyond guesswork with AI-driven investment insights tailored to your strategy."*
        - Efek visual ambient glowing aura mauve di bagian bawah kartu.
        - Tombol CTA: **"Explore AI Insights"** yang memicu modal/drawer strategi rebalancing cerdas.
    - **Kolom 2 - Watchlist Interaktif:**
      - Filter Tabs: **Most Viewed** (Aktif), **Gain**, **Lose**.
      - List Aset Watchlist dengan data ticker, bursa, harga, dan persentase kenaikan/penurunan:
        - **Spotify** (`NYSE: SPOT`) — $11,770.3 (`+16.31%` hijau cerah).
        - **Amazon** (`NYSE: AMZN`) — $10,280.8 (`+8.11%` hijau cerah).
        - **Microsoft** (`NYSE: MSFT`) — $8,510.2 (`+4.89%` hijau cerah).
        - **NVIDIA** (`NYSE: NVDA`) — $2,110.2 (`+2.12%` hijau cerah).
      - Interaktivitas: Tambah ticker ke watchlist, modal quick transaction (Simulasi Buy/Sell).
    - **Kolom 3 - My Portfolio Position Cards:**
      - Header "My Portfolio" dengan tombol "See all" dan ikon panah diagonal.
      - 2x2 Grid Kartu Posisi Saham:
        - **AAPL**: $ 1,721.3 (+12.31 / +0.7%), Units: 104
        - **AMZN**: $ 1,721.3 (+12.31 / +0.7%), Units: 12
        - **MSFT**: $ 1,721.3 (+12.31 / +0.7%), Units: 41
        - **NVDA**: $ 1,721.3 (+12.31 / +0.7%), Units: 16
      - Klik kartu membuka modal drilldown detail aset: harga beli rata-rata, unrealized PnL, alokasi %.
  - **Section Bawah - Portfolio Performance Interactive Chart (Area Full-Width):**
    - Header: Judul "Portfolio Performance" dan Filter Timeframe Pill di pojok kanan: **1D**, **1W**, **1M**, **6M**, **1Y** (1Y aktif terpilih).
    - Interactive Milestone Marker & Custom Tooltip:
      - Titik pin interaktif pada grafik (contoh visual: *"1st Jun 2025"*, valuation *" $ 16,500"*, badge gain *"+25%"*).
      - Garis panduan vertikal putus-putus (*dashed line*) menuju titik koordinat pink glowing dot pada kurva.
    - Visual Chart Recharts AreaChart:
      - Monotone smooth curve dengan garis stroke mauve cerah (`#c084fc` / `#d8b4fe`) dan area fill gradasi memudar lembut ke transparan (`#c084fc` to `transparent`).
      - Skala Sumbu Y: 10k, 50k, 100k, 150k, 200k.
      - Skala Sumbu X: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec.
      - Hover responsif menampilkan kursus valuation realtime sesuai titik waktu.
  - **Fitur Interaktif & Ekstensi Enterprise:**
    - **Helios AI Copilot Drawer / Modal:** Drawer chat AI interaktif yang menyediakan simulasi analisis portofolio otomatis (Diversifikasi, Risk Assessment, Proyeksi Yield, Saran Take-Profit).
    - **Simulasi Transaksi (Buy / Sell Modal):** Pengguna dapat menambah/mengurangi unit saham secara instan; saldo dan portofolio langsung terupdate otomatis di LocalStorage.
    - **Live Market Price Ticker Simulator:** Toggle opsional untuk mensimulasikan pergerakan harga saham live (fluktuasi + / - 0.2% secara berkala dengan efek flash hijau/merah).
    - **Export Laporan Portofolio ke Excel (.xlsx):** Menggunakan `exceljs` client-side untuk mengunduh rekap portofolio, riwayat transaksi, dan kalkulasi PnL dalam format spreadsheet profesional.
    - **GitHub Pages Ready:** Konfigurasi `next.config.ts` dengan `output: 'export'`, `basePath`, `.nojekyll`, dan deployment static tanpa butuh server Node.js.
- **Tech stack:**
  - Next.js (App Router) + TypeScript Strict Mode.
  - Tailwind CSS v4 (`@import "tailwindcss";`) dengan konfigurasi warna custom obsidian/mauve dark luxury.
  - Lucide React (ikon konsisten).
  - Framer Motion (transisi mulus, modal popup, ambient glow pulse).
  - Recharts (AreaChart responsif, custom tooltip, custom active dot marker).
  - Zustand + LocalStorage (manajemen state terpusat, reaktif, tanpa ketergantungan backend server).
  - ExcelJS (pembuatan file laporan spreadsheet Excel client-side).
  - Canvas-Confetti (efek perayaan saat transaksi sukses atau target portofolio tercapai).
- **Batasan:**
  - 100% Client-side local-first: data tersimpan di LocalStorage dengan seed mock awal yang kaya, realistis, dan presisi sesuai gambar referensi.
  - Zero build errors / Zero TypeScript errors.
  - Sepenuhnya kompatibel dengan GitHub Pages static export (`output: 'export'`).

---

## 2. STRUKTUR OUTPUT YANG HARUS DIBUAT

Di root project (`opencode5`), buat:

```text
AGENTS.md                      <- aturan kerja untuk opencode (dibaca otomatis)
blueprint/
  00-README.md                 <- index + urutan eksekusi
  02-PROJECT-BRIEF.md          <- ringkasan, sasaran, scope & non-scope
  03-ARCHITECTURE.md           <- struktur folder kode, state management, alur data
  04-TECH-STACK.md             <- library + versi + alasan arsitektural
  05-CONVENTIONS.md            <- penamaan, standardisasi kode, struktur commit
  06-DATA-MODEL.md             <- TypeScript interfaces, data mock seeds, LocalStorage state
  07-DESIGN-SYSTEM.md          <- token warna mauve/obsidian, tipografi, efek glow, Recharts styling
  tasks/
    T001-setup-nextjs-project.md
    T002-configure-tailwind-and-theme.md
    T003-typescript-types-and-interfaces.md
    T004-mock-seed-data.md
    T005-localstorage-zustand-store.md
    T006-utility-formatters-and-math.md
    T007-app-root-shell-and-layout.md
    T008-sidebar-navigation.md
    T009-top-header-and-search-bar.md
    T010-total-holding-card.md
    T011-ai-decision-banner-card.md
    T012-watchlist-card-and-tabs.md
    T013-portfolio-holding-grid-card.md
    T014-portfolio-performance-area-chart.md
    T015-assemble-dashboard-page.md
    T016-helios-ai-chat-assistant-drawer.md
    T017-asset-drilldown-and-order-modal.md
    T018-portfolio-detail-view-page.md
    T019-market-explorer-page.md
    T020-deep-analysis-metrics-page.md
    T021-community-sentiment-page.md
    T022-exceljs-portfolio-export.md
    T023-live-market-ticker-simulator.md
    T024-notification-toast-and-dialogs.md
    T025-github-pages-export-configuration.md
    T026-documentation-and-build-verification.md
  PROGRESS.md                  <- checklist semua task (semua [ ] di awal)
  BLOCKERS.md                  <- log kendala teknis (kosong di awal)
  99-FINAL-CHECKLIST.md        <- verifikasi build, typecheck, static export, visual QA
```

---

## 3. PROMPT SATU BARIS UNTUK EKSEKUSI OPENCODE

> Baca `AGENTS.md` dan `blueprint/00-README.md`, lalu kerjakan semua task di `blueprint/tasks/` berurutan sampai selesai tanpa bertanya. Update `blueprint/PROGRESS.md` setiap task selesai.
