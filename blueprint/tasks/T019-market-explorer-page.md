# T019 - Halaman Market Explorer & Screener Bursa NYSE/NASDAQ (/market)

**Depends on:** T005, T008  
**Estimasi:** sedang

## Tujuan
Membangun halaman penjelajah bursa saham (`app/market/page.tsx`) dengan filter kategori industri, pencarian ticker instan, daftar top gainer & loser, serta tombol cepat untuk menambahkan saham ke Watchlist.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md

## File yang dibuat / diubah
- `app/market/page.tsx` : Halaman rute bursa pasar modal dan screener saham

## Langkah
1. Buat folder `app/market/` dan berkas `app/market/page.tsx`.
2. Header Halaman:
   - Judul: "Global Market Explorer".
   - Subjudul: "Real-time market screeners, trending equities, and index overview."
   - Search bar live filter ticker (misal: cari "TSLA", "META", "GOOGL").
3. Widget Ringkasan Indeks Utama:
   - S&P 500 (+0.85%), NASDAQ (+1.24%), DOW JONES (+0.42%).
4. Tab Kategori Saham:
   - All Equities, Big Tech, AI & Chips, E-Commerce, Entertainment, Clean Energy.
5. Grid Kartu / Tabel Screener Saham:
   - Menampilkan daftar 12+ emiten terkemuka dengan data harga terkini, pergerakan 24 jam, volume perdagangan harian, tombol "Add to Watchlist", dan tombol "Trade".
6. Integrasikan tombol "Add to Watchlist" dengan action `toggleWatchlist` di Zustand store.

## Kriteria selesai
- [ ] Halaman `/market` aktif dan dapat dijelajahi dengan mulus.
- [ ] Fitur pencarian menyaring emiten saham secara langsung tanpa reload.
- [ ] Menambahkan saham dari Market langsung muncul di kartu Watchlist pada dashboard utama.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Pastikan daftar saham mencakup emiten yang ada di gambar referensi (SPOT, AMZN, MSFT, NVDA, AAPL).
