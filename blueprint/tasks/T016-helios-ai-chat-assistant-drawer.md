# T016 - Helios AI Copilot Chat Drawer & Rekomendasi Rebalancing

**Depends on:** T005, T011  
**Estimasi:** sedang

## Tujuan
Membangun drawer asisten interaktif "Helios AI" (`components/ai/ai-chat-drawer.tsx`) yang dapat dibuka dari tombol "Explore AI Insights" atau bilah pencarian "Ask helios.ai anything", dilengkapi simulasi rekomendasi rebalancing portofolio.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `components/ai/ai-chat-drawer.tsx` : Drawer interaktif asisten AI berbasis Framer Motion
- `components/ai/ai-insight-card.tsx` : Kartu rekomendasi rebalancing cerdas

## Langkah
1. Buat `components/ai/ai-chat-drawer.tsx` dengan memanfaatkan `framer-motion` untuk animasi slide-over dari sisi kanan.
2. Tampilkan header drawer:
   - Ikon Sparkle bercahaya ungu.
   - Judul: "Helios AI Portfolio Intelligence".
   - Tombol tutup silang (`X`).
3. Area Percakapan:
   - Render riwayat pesan `chatMessages` dari `usePortfolioStore`.
   - Bubble pesan AI menampilkan analisis diversifikasi: risiko eksposur sektor Big Tech (70%), saran take profit pada saham yang sudah gain tinggi, dan rekomendasi alokasi obligasi/cash.
   - Tombol Aksi Cepat: "Rebalance Portfolio", "Simulate NVDA Take-Profit", "Dividend Analysis".
4. Area Input:
   - Formulir input teks dengan tombol kirim.
   - Saat pengguna mengirim pesan, sistem mensimulasikan jawaban cerdas otomatis dari Helios AI setelah jeda 400ms.
5. Hubungkan state buka/tutup drawer ke store atau state lokal.

## Kriteria selesai
- [ ] Drawer meluncur mulus saat tombol "Explore AI Insights" atau input "Ask helios.ai anything" diklik.
- [ ] Pengguna dapat berinteraksi mengirim pertanyaan dan menerima respons cerdas.
- [ ] Desain drawer konsisten dengan estetika dark mauve obsidian.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `AnimatePresence` dari Framer Motion agar animasi penutupan drawer berjalan mulus tanpa terpotong tiba-tiba.
