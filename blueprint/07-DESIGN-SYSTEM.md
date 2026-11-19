# 07-DESIGN-SYSTEM: Helios Dark Luxury Mauve Obsidian Aesthetic

Dokumen sistem desain, spesifikasi token warna, efek visual pendaran (*ambient glow*), radius komponen, dan aturan Recharts untuk proyek **Helios Investments**.

---

## 1. Filosofi & Karakter Visual

Desain mengusung konsep **Dark Luxury FinTech**:
- **Background Utama:** Obsidian ungu gelap pekat yang memberikan rasa eksklusif dan fokus tinggi.
- **Permukaan Kartu (Cards):** Warna ungu kehitaman (*deep plum*) dengan border tipis transparan (`border-white/5` atau `border-[#2d2638]`).
- **Aksen Pendaran Radial (Radial Aura):** Pendaran lembut ungu mauve (`rgba(192, 132, 252, 0.2)`) di belakang tombol "Explore AI Insights" dan tab aktif.
- **Indikator Keuntungan (Gain):** Hijau mint/emerald cerah (`#34d399` atau `#10b981`) yang kontras tinggi dan mudah terbaca.
- **Kurva Grafik (Chart Curve):** Garis lavender/mauve tebal (`#c084fc`) dengan area gradasi pudar lembut ke transparan.

---

## 2. Palet Token Warna Spesifik

```css
/* Palet Warna Utama Helios Obsidian Mauve */
--bg-app: #0e0c12;               /* Latar belakang utama aplikasi */
--bg-card: #15121b;              /* Latar belakang kartu dashboard */
--bg-card-hover: #1c1824;        /* State hover kartu */
--bg-pill-active: #2b2338;       /* Latar tab aktif (Wallet, Most Viewed, 1Y) */

--border-subtle: rgba(255, 255, 255, 0.06); /* Garis batas kartu halus */
--border-active: rgba(192, 132, 252, 0.3);  /* Garis batas elemen aktif */

--accent-mauve: #c084fc;         /* Ungu mauve terang untuk kurva & aksen */
--accent-violet: #a855f7;        /* Ungu sekunder */
--accent-pink-glow: #f472b6;     /* Pink glowing dot pada milestone marker */

--gain-green: #34d399;           /* Hijau persentase profit (+16.31%) */
--loss-red: #f87171;             /* Merah persentase loss (-2.45%) */

--text-primary: #ffffff;         /* Teks putih tajam */
--text-secondary: #a19fad;       /* Teks abu-abu keunguan keterangan */
--text-muted: #6b667b;           /* Teks label kecil & sumbu grafik */
```

---

## 3. Efek Ambient Glow & Radial Gradient

Pada kartu **"Decisions Powered by Data"**, terdapat efek pendaran cahaya ungu/pink di bagian bawah tombol:

```css
/* Efek Glow Bawah Kartu AI */
.glow-ai-radial {
  background: radial-gradient(
    ellipse at 50% 100%,
    rgba(216, 180, 254, 0.35) 0%,
    rgba(168, 85, 247, 0.15) 45%,
    transparent 75%
  );
}

/* Efek Pill Glow State Aktif (Dashboard Menu, Wallet Tab) */
.pill-active-glow {
  background: linear-gradient(
    90deg,
    rgba(147, 51, 234, 0.35) 0%,
    rgba(192, 132, 252, 0.2) 100%
  );
  border: 1px solid rgba(192, 132, 252, 0.3);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.15);
}
```

---

## 4. Spesifikasi Visual Recharts AreaChart

Untuk mereplikasi grafik **Portfolio Performance** pada gambar referensi:

1. **Kurva:**
   - `<Area type="monotone" dataKey="valuation" stroke="#c084fc" strokeWidth={3} fillOpacity={1} fill="url(#performanceGradient)" />`
   - Gradasi:
     ```tsx
     <defs>
       <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
         <stop offset="5%" stopColor="#c084fc" stopOpacity={0.25} />
         <stop offset="95%" stopColor="#c084fc" stopOpacity={0.0} />
       </linearGradient>
     </defs>
     ```
2. **Sumbu X & Y:**
   - Sumbu X: label bulan (`Jan`, `Feb`, ..., `Dec`) warna teks `--text-muted` ukuran 11px, tanpa garis sumbu dominan (`axisLine={false}`, `tickLine={false}`).
   - Sumbu Y: skala nilai (`10k`, `50k`, `100k`, `150k`, `200k`), `axisLine={false}`, `tickLine={false}`.
3. **Milestone Marker Pin (Bulan Juni):**
   - Pin penanda statis yang menempel di koordinat titik Juni:
     - Kotak hitam semi-transparan dengan border putih halus.
     - Baris 1: `1st Jun 2025` + opsi menu titik tiga `...`.
     - Baris 2: `$ 16,500` di sebelah kiri dan badge hijau `+25%` di sebelah kanan.
     - Garis vertikal putus-putus (`strokeDasharray="4 4"`) memanjang ke bawah menyentuh titik lingkaran pink bercahaya (*pink glowing circle with pulse*).

---

## 5. Sudut & Radius Komponen

- Shell Kartu Dashboard: `rounded-2xl` atau `rounded-3xl` (20px – 24px).
- Tombol CTA & Pill Navigasi: `rounded-full` (Pill shape).
- Modal Pop-up: `rounded-3xl` dengan efek backdrop blur (`backdrop-blur-xl bg-[#120f17]/90`).
