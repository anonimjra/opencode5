# T021 - Halaman Community Sentiment & Indeks Sentimen Pasar (/community)

**Depends on:** T005, T008  
**Estimasi:** sedang

## Tujuan
Membangun halaman komunitas dan sentimen pasar modal (`app/community/page.tsx`) yang menyajikan Fear & Greed Index, polling sentimen bullish/bearish investor untuk saham portofolio (NVDA, AAPL, AMZN, MSFT), dan feed opini analis.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md

## File yang dibuat / diubah
- `app/community/page.tsx` : Halaman rute sentimen komunitas dan opini investor

## Langkah
1. Buat folder `app/community/` dan berkas `app/community/page.tsx`.
2. Header Halaman:
   - Judul: "Market Pulse & Community Sentiment".
   - Subjudul: "Real-time trader sentiment, consensus analyst ratings, and crowd insights."
3. Widget Gauge / Meter Sentimen Pasar:
   - **Fear & Greed Index:** Nilai `72` — *Greed* (berwarna hijau emerald).
   - Indikator sentimen 7 hari terakhir (Tren konsisten optimis).
4. Polling Sentimen Komunitas untuk Saham Utama:
   - **NVDA:** 84% Bullish / 16% Bearish (Target konsensus: $140).
   - **AAPL:** 68% Bullish / 32% Bearish (Target konsensus: $240).
   - **AMZN:** 78% Bullish / 22% Bearish (Target konsensus: $210).
   - **MSFT:** 81% Bullish / 19% Bearish (Target konsensus: $490).
   - Pengguna dapat mengklik tombol vote untuk ikut memberikan suara sentimen.
5. Feed Diskusi Komunitas Terverifikasi:
   - Menampilkan feed ulasan singkat dari analis dan manajer investasi terkemuka.

## Kriteria selesai
- [ ] Halaman `/community` aktif dan terhubung ke menu Sidebar.
- [ ] Indikator Fear & Greed dan visual polling sentimen tampil menarik dan interaktif.
- [ ] Tombol vote sentimen memberikan feedback reaktif instan.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Simpan hasil polling lokal di state agar pilihan pengguna tidak hilang saat berpindah halaman.
