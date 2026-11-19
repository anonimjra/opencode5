# 99-FINAL-CHECKLIST: Matriks Verifikasi Kualitas Akhir

Dokumen checklist audit akhir sebelum serah terima aplikasi **Helios Investments** ke pengguna.

---

## 1. Verifikasi Build & Kompilasi TypeScript

- [ ] Jalankan audit tipe: `npx tsc --noEmit` menghasilkan `0 errors`.
- [ ] Jalankan build produksi: `npm run build` sukses tanpa error dan tanpa warning fatal.
- [ ] Folder statis `out/` terbentuk dengan berkas `out/index.html` dan direktori `out/_next/`.
- [ ] Berkas `out/.nojekyll` dan `public/.nojekyll` telah dipastikan ada.

---

## 2. Verifikasi Akurasi Visual & UI Matching (Gambar Referensi)

- [ ] Latar belakang aplikasi menggunakan warna obsidian ungu gelap pekat (`#0e0c12`).
- [ ] Sidebar kiri memiliki logo Helios Investments "H", menu Dashboard dalam state pill glow, serta tautan Settings dan Support di bagian bawah.
- [ ] Header atas menampilkan "Welcome, Nadia", "Here's your investment portfolio overview", tiga tab segmen (Market, Wallet, Tools), dan input bar "Ask helios.ai anything".
- [ ] Kartu "Total Holding" menampilkan angka **$ 12,304.11** dan dropdown rentang waktu **6M**.
- [ ] Kartu "Decisions Powered by Data" memiliki teks deskripsi, efek pendaran radial ungu di bawah, dan tombol "Explore AI Insights".
- [ ] Kartu "Watchlist" memiliki tab filter (Most Viewed, Gain, Lose) dan menampilkan 4 baris saham: SPOT ($11,770.3 / +16.31%), AMZN ($10,280.8 / +8.11%), MSFT ($8,510.2 / +4.89%), NVDA ($2,110.2 / +2.12%).
- [ ] Kartu "My Portfolio" memiliki tombol "See all" dan grid 2x2: AAPL ($1,721.3 / Units 104), AMZN ($1,721.3 / Units 12), MSFT ($1,721.3 / Units 41), NVDA ($1,721.3 / Units 16).
- [ ] Kartu "Portfolio Performance" menampilkan AreaChart Recharts berwarna lavender dengan skala 10k-200k, sumbu bulan Jan-Dec, filter 1D-1Y (1Y aktif), dan milestone marker statis di titik Juni ("1st Jun 2025", "$ 16,500", "+25%") dengan garis putus-putus ke titik pink glowing.

---

## 3. Verifikasi Fungsionalitas Interaktif

- [ ] Mengetik di bar "Ask helios.ai anything" atau mengklik "Explore AI Insights" membuka laci asisten AI Helios dengan rekomendasi rebalancing.
- [ ] Mengklik kartu posisi portofolio atau saham watchlist membuka modal transaksi Buy/Sell.
- [ ] Transaksi beli/jual secara instan memperbarui jumlah unit kepemilikan dan total saldo di `localStorage`.
- [ ] Fitur unduh laporan Excel (.xlsx) menghasilkan spreadsheet berformat profesional dengan kolom Ticker, Nama Aset, Unit, Harga, Total Valuasi, dan Return.
- [ ] Simulasi Live Ticker di Settings dapat diaktifkan/dinonaktifkan dan harga berfluktuasi dengan efek visual hijau/merah.

---

## 4. Perintah Verifikasi Otomatis

```bash
# 1. Typecheck
npx tsc --noEmit

# 2. Build Production & Static Export
npm run build

# 3. Validasi Output Folder
test -f out/index.html && echo "HTML Build OK"
test -f out/.nojekyll && echo "Nojekyll OK"
```
