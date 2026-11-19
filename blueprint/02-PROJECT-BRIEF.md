# 02-PROJECT-BRIEF: Helios Investments Platform Specification

Dokumen spesifikasi bisnis, sasaran produk, rincian fungsional, dan visual matching untuk platform **Helios Investments**.

---

## 1. Identitas & Gambaran Produk

- **Nama Produk:** Helios Investments
- **Tipe Aplikasi:** Single-Page & Multi-View Web Application (FinTech Wealth Management & Portfolio Analytics).
- **Aesthetic Tone:** *Dark Luxury Mauve / Deep Obsidian Glassmorphic*. Memadukan background ungu gelap bergradasi halus, aksen lavender lembut, panel transparan dengan border halus, dan grafik performa Recharts kurva ungu glowing.
- **Profil Pengguna Standar (Mock Seed):**
  - Nama: Nadia Rachel
  - Email: `rachel_helios@gmail.com`
  - Total Saldo Portofolio: **$ 12,304.11** (sesuai mockup visual).
  - Alokasi Aset Inti: Big Tech US Equities (AAPL, AMZN, MSFT, NVDA) & Watchlist (SPOT, AMZN, MSFT, NVDA).

---

## 2. Sasaran & Tujuan Produk

1. **Replikasi Visual 1:1 Presisi Tinggi:** Menghadirkan antarmuka pengguna yang identik dengan visual referensi yang disediakan user, mencakup hierarki font, spacing, rounded corners (`rounded-2xl`, `rounded-3xl`), border halus (`border-white/5`), dan efek glowing radial.
2. **Zero-Backend Dependency (Local-First):** Seluruh data portofolio, histori transaksi, watchlist, dan percakapan AI disimpan secara lokal di `localStorage`. Aplikasi dapat dijalankan 100% offline tanpa perlu koneksi database cloud eksternal.
3. **Simulasi Transaksi Realistis:** Pengguna dapat melakukan order Buy dan Sell saham; unit kepemilikan dan saldo kas terhitung otomatis secara reaktif.
4. **Grafik Interaktif Recharts dengan Pin Milestone:** Kurva performa tahunan (1Y) dengan titik sorot tanggal 1 Juni 2025 bernilai $16,500 (+25%), garis bantu vertikal putus-putus, dan tooltip interaktif.
5. **AI Assistant Copilot ("Helios AI"):** Menyediakan analisis portofolio prediktif cerdas, saran rebalancing, dan rekomendasi alokasi aset yang bisa langsung dieksekusi pengguna.
6. **Ekspor Spreadsheet Excel (.xlsx):** Pembuatan file laporan portofolio dan riwayat transaksi profesional menggunakan `exceljs` langsung di peramban (client-side).
7. **Kompatibilitas Penuh Static Export (GitHub Pages):** Menghasilkan build file statis HTML/CSS/JS tanpa ketergantungan server runtime Node.js.

---

## 3. Rincian Fitur Utama Sesuai Visual Referensi

### A. Sidebar Navigasi Kiri (Dark Obsidian Dock)
- **Brand Emblem:** Logo heksagonal/geometris "H" Helios Investments dengan tipografi modern tebal.
- **Menu Navigasi Atas:**
  - `Dashboard`: Tautan utama dengan background pill gradasi ungu/mauve berpendar lembut (`bg-gradient-to-r from-purple-900/40 to-fuchsia-900/30 border border-purple-500/20 text-white`).
  - `Portfolio`: Tampilan manajemen kepemilikan saham, kalkulator bobot aset, dan rincian return.
  - `Analysis`: Visualisasi metrik risiko, volatilitas, rasio Sharpe, dan rasio dividen.
  - `Market`: Pemantau pergerakan bursa Wall Street, top gainers, top losers, dan volume transaksi.
  - `Community`: Umpan opini pasar, sentimen indeks fear & greed, dan polling analis.
- **Menu Navigasi Bawah:**
  - `Settings`: Preferensi mata uang ($ USD / Rp IDR), interval live simulator, dan tema visual.
  - `Support`: Bantuan live chat simulasi 24 jam dan glosarium istilah finansial.

### B. Header Navigasi Atas (Top Shell)
- **Greeting Section:** "Welcome, Nadia" (teks headline tebal ukuran 24px) dengan subteks abu-abu netral "Here's your investment portfolio overview".
- **Segmented Control Filter:** Tiga tombol pill: `Market`, `Wallet` (state aktif dengan glow mauve), dan `Tools`.
- **Global AI Prompt Bar:** Input pencarian cerdas *"Ask helios.ai anything"* dengan ikon mikrofon dan kilauan bintang (sparkles). Mengklik input atau menekan `Ctrl+K` langsung membuka laci asisten AI.
- **Action Controls & Profil Pengguna:**
  - Tombol Notifikasi (ikon Bell dengan notifikasi badge merah).
  - Tombol Pengaturan Cepat (ikon Gear).
  - User Badge: Foto profil bulat Nadia Rachel, nama pengguna, dan alamat email `rachel_helios@gmail.com`.

### C. Grid Konten Utama - Kolom 1 (Valuasi & Promosi AI)
- **Kartu Total Holding:**
  - Label judul "Total Holding".
  - Dropdown pemilih rentang waktu dengan nilai default **6M** (1M, 3M, 6M, 1Y, ALL).
  - Tampilan angka besar utama: **$ 12,304.11**.
  - Badge performa: `+$1,240.50 (+11.2%)` dengan warna hijau emerald cerah.
- **Kartu Decisions Powered by Data:**
  - Headline persuasif: *"Decisions Powered by Data"*.
  - Paragraf ringkas: *"Move beyond guesswork with AI-driven investment insights tailored to your strategy."*
  - Efek pencahayaan pendaran radial lembut (mauve aura) di bagian bawah kartu.
  - Tombol CTA: **"Explore AI Insights"** dengan sudut membulat penuh (*pill button*).

### D. Grid Konten Utama - Kolom 2 (Watchlist Interaktif)
- **Header Watchlist:** Label judul "Watchlist".
- **Filter Tabs:** Tab pemilih filter cepat: `Most Viewed` (state aktif), `Gain`, dan `Lose`.
- **Daftar Saham Terpantau:**
  - **Spotify** (`NYSE: SPOT`) — $11,770.3 (`+16.31%`).
  - **Amazon** (`NYSE: AMZN`) — $10,280.8 (`+8.11%`).
  - **Microsoft** (`NYSE: MSFT`) — $8,510.2 (`+4.89%`).
  - **NVIDIA** (`NYSE: NVDA`) — $2,110.2 (`+2.12%`).
- Setiap baris memiliki logo brand, kode bursa, harga terkini, persentase perubahan berwarna hijau, dan tombol aksi cepat untuk Buy/Sell.

### E. Grid Konten Utama - Kolom 3 (My Portfolio Position Grid)
- **Header Portfolio:** Judul "My Portfolio" dengan tombol "See all" dan ikon panah miring kanan-atas.
- **Grid Posisi 2x2:**
  - **AAPL (Apple Inc.):** Valuasi $ 1,721.3 | Gain +12.31 (0.7%) | Kepemilikan: Units 104
  - **AMZN (Amazon.com):** Valuasi $ 1,721.3 | Gain +12.31 (0.7%) | Kepemilikan: Units 12
  - **MSFT (Microsoft Corp.):** Valuasi $ 1,721.3 | Gain +12.31 (0.7%) | Kepemilikan: Units 41
  - **NVDA (NVIDIA Corp.):** Valuasi $ 1,721.3 | Gain +12.31 (0.7%) | Kepemilikan: Units 16
- Klik pada salah satu kartu membuka modal detail posisi aset dan formulir transaksi beli/jual cepat.

### F. Section Bawah - Portfolio Performance Area Chart
- **Header Visual:** Judul "Portfolio Performance" dan pill filter rentang waktu: `1D`, `1W`, `1M`, `6M`, `1Y` (opsi 1Y dalam state aktif).
- **Grafik Recharts AreaChart:**
  - Kurva halus jenis `monotone` dengan garis stroke warna lavender/mauve (`#c084fc`).
  - Efek bayangan gradasi ungu transparan pada area bawah kurva (`url(#colorPerformance)`).
  - Skala Sumbu Y: `10k`, `50k`, `100k`, `150k`, `200k`.
  - Skala Sumbu X: `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`.
- **Milestone Pin Penanda Khusus:**
  - Pin penunjuk khusus pada titik koordinat bulan Juni: Label tanggal *"1st Jun 2025"*, nilai valuasi *" $ 16,500"*, dan badge gain *"+25%"*.
  - Garis vertikal putus-putus (*dashed line*) yang menghubungkan kotak informasi ke titik lingkaran bercahaya (*pink glowing dot*) di atas kurva.

---

## 4. Scope & Non-Scope

### Scope (Wajib Dikerjakan):
- Seluruh antarmuka pada visual referensi direplikasi dengan akurasi tinggi.
- Navigasi antar halaman internal (`/`, `/portfolio`, `/analysis`, `/market`, `/community`, `/settings`).
- Penyimpanan lokal data portofolio, transaksi, dan histori percakapan AI menggunakan `localStorage`.
- Simulasi live market price ticker yang dapat dinyalakan/dimatikan di Settings.
- Ekspor laporan portofolio ke file spreadsheet Excel `.xlsx` menggunakan `exceljs`.
- Dukungan penuh export statis GitHub Pages (`next build` menghasilkan folder `out/`).

### Non-Scope:
- Autentikasi OAuth server backend pihak ketiga (tidak diperlukan; profil lokal Nadia Rachel aktif secara default).
- Eksekusi transaksi uang riil ke broker bursa (ini adalah dashboard simulasi & pelacak portofolio profesional).
