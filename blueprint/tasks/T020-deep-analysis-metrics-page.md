# T020 - Halaman Analisis Risiko, Metrik & Sharpe Ratio (/analysis)

**Depends on:** T005, T008  
**Estimasi:** sedang

## Tujuan
Membangun halaman analisis kuantitatif (`app/analysis/page.tsx`) yang menampilkan metrik statistik portofolio profesional: Sharpe Ratio, Beta pasar, Volatilitas Tahunan, Maximum Drawdown, dan analisis proyeksi pertumbuhan bertenaga AI.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md

## File yang dibuat / diubah
- `app/analysis/page.tsx` : Halaman rute analisis performa kuantitatif dan manajemen risiko

## Langkah
1. Buat folder `app/analysis/` dan berkas `app/analysis/page.tsx`.
2. Header Halaman:
   - Judul: "Portfolio Risk & Quantitative Analysis".
   - Subjudul: "Deep dive statistical metrics, market correlation, and stress testing."
3. Grid Kartu Metrik Kuantitatif (4 Kartu):
   - **Sharpe Ratio:** `2.14` (Kategori: Excellent risk-adjusted returns).
   - **Portfolio Beta:** `1.12` (Agresif moderat relatif terhadap S&P 500).
   - **Annualized Volatility:** `14.8%` (Risiko terukur).
   - **Max Drawdown:** `-8.4%` (Buffer proteksi modal kuat).
4. Section Stress Testing & Simulasi Skenario Pasar:
   - Simulasi performa portofolio Nadia jika terjadi: Kenaikan Suku Bunga Fed (+50 bps), Tech Sector Rally (+15%), atau Resesi Global (-10%).
5. Rekomendasi Optimasi Portofolio dari Helios AI:
   - Rekomendasi alokasi kuantitatif untuk meminimalisir volatilitas tanpa mengorbankan alpha.

## Kriteria selesai
- [ ] Halaman `/analysis` menampilkan seluruh metrik statistik finansial dengan visualisasi bersih.
- [ ] Tersedia simulasi skenario stres pasar yang interaktif.
- [ ] Navigasi dari Sidebar menuju `/analysis` berfungsi sempurna.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Gunakan visual badge indikator (hijau untuk metrik sehat, kuning untuk moderat) agar data angka mudah dipahami.
