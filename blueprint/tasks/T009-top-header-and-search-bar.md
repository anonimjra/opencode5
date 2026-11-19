# T009 - Header Navigasi Atas, Segmented Tabs & AI Search Prompt Bar

**Depends on:** T005, T008  
**Estimasi:** sedang

## Tujuan
Membangun bilah header atas (`components/layout/top-header.tsx`) yang menampilkan salam personalisasi ("Welcome, Nadia"), sub-navigasi segmen (Market, Wallet, Tools), bilah prompt pencarian global "Ask helios.ai anything", kontrol notifikasi/settings, serta kartu profil pengguna.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/layout/top-header.tsx` : Komponen header navigasi atas aplikasi

## Langkah
1. Buat `components/layout/top-header.tsx` sebagai Client Component.
2. Sisi Kiri Atas:
   - Judul sambutan: `<h1 className="text-2xl font-bold text-white tracking-tight">Welcome, Nadia</h1>`.
   - Subjudul keterangan: `<p className="text-xs text-white/50 mt-0.5">Here's your investment portfolio overview</p>`.
   - Di bawah teks, buat Segmented Control Buttons:
     - `Market`, `Wallet`, `Tools`.
     - Tombol `Wallet` dalam state aktif: rounded-full pill dengan latar belakang ungu lembut (`bg-[#2b2338] border border-white/10 text-white shadow-sm`).
3. Sisi Kanan Atas:
   - Ikon Notifikasi (Bell) dengan titik notifikasi kecil.
   - Ikon Pengaturan Cepat (Gear).
   - Chip Profil Pengguna: Foto avatar bulat Nadia Rachel, nama "Nadia Rachel", dan subteks `rachel_helios@gmail.com`.
4. Baris di Bawah Kontrol Kanan:
   - Input Bar AI Prompt: "Ask helios.ai anything"
   - Dihiasi ikon mikrofon dan ikon kilauan bintang (sparkles) di sisi kiri.
   - Mengklik input ini memicu pembukaan drawer asisten Helios AI (`usePortfolioStore`).

## Kriteria selesai
- [ ] Header atas terpasang rapi dengan tata letak flex responsif.
- [ ] Tab Wallet memiliki highlight pill aktif sesuai visual referensi.
- [ ] Bar "Ask helios.ai anything" interaktif dan dapat diklik.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pada layar mobile, sembunyikan email pengguna jika ruang terbatas agar tampilan tidak patah (*truncate or hide on small screens*).
