# T012 - Kartu Watchlist Interaktif dengan Tab Most Viewed, Gain, Lose

**Depends on:** T004, T005, T006  
**Estimasi:** sedang

## Tujuan
Mengembangkan kartu "Watchlist" (`components/dashboard/watchlist-card.tsx`) dengan filter tabs (Most Viewed, Gain, Lose) dan menampilkan 4 baris data saham (Spotify SPOT, Amazon AMZN, Microsoft MSFT, NVIDIA NVDA) lengkap dengan harga dan persentase keuntungan hijau cerah.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/dashboard/watchlist-card.tsx` : Komponen kartu daftar pantau saham

## Langkah
1. Buat `components/dashboard/watchlist-card.tsx`.
2. Header & Tab Filter:
   - Judul "Watchlist" (`text-base font-bold text-white`).
   - Pill Filter Group: `Most Viewed` (default aktif dengan latar `bg-[#2b2338] text-white`), `Gain`, `Lose`.
3. List Saham (Mengambil data dari `usePortfolioStore`):
   - **Spotify** (`NYSE: SPOT`):
     - Logo Spotify di sisi kiri.
     - Nama & Ticker: Spotify / `NYSE: SPOT`.
     - Harga di kanan: `$11,770.3` (teks putih tebal).
     - Persentase perubahan: `+16.31%` (teks hijau mint cerah `text-helios-gain`).
   - **Amazon** (`NYSE: AMZN`):
     - Logo Amazon di sisi kiri.
     - Nama & Ticker: Amazon / `NYSE: AMZN`.
     - Harga di kanan: `$10,280.8` | Gain: `+8.11%`.
   - **Microsoft** (`NYSE: MSFT`):
     - Logo Windows/Microsoft di sisi kiri.
     - Nama & Ticker: MSFT / `NYSE: MSFT`.
     - Harga di kanan: `$8,510.2` | Gain: `+4.89%`.
   - **NVIDIA** (`NYSE: NVDA`):
     - Logo NVIDIA di sisi kiri.
     - Nama & Ticker: NVDA / `NYSE: NVDA`.
     - Harga di kanan: `$2,110.2` | Gain: `+2.12%`.
4. Tambahkan interaktivitas:
   - Mengklik salah satu baris saham memicu pembukaan modal transaksi cepat (Buy/Sell modal).
   - Pengalihan tab memfilter saham berdasarkan kategori gain/loss atau view count.

## Kriteria selesai
- [ ] Keempat baris saham tampil lengkap dengan angka yang sesuai dengan visual referensi.
- [ ] Tab filter Most Viewed, Gain, Lose berfungsi menyaring data.
- [ ] Baris saham memiliki efek hover halus dan merespon klik.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Format angka harga pada watchlist referensi tidak memiliki spasi setelah simbol dolar (misal: `$11,770.3`), pertahankan format ini.
