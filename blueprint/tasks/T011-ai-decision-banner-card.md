# T011 - Banner Decisions Powered by Data & Tombol Explore AI Insights

**Depends on:** T002, T005  
**Estimasi:** kecil

## Tujuan
Membangun kartu banner promosi fitur AI (`components/dashboard/ai-decision-banner.tsx`) dengan headline "Decisions Powered by Data", teks penjelasan, efek pendaran radial lembut ungu/mauve di bagian bawah, dan tombol CTA "Explore AI Insights".

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/dashboard/ai-decision-banner.tsx` : Komponen banner promosi keputusan cerdas bertenaga AI

## Langkah
1. Buat `components/dashboard/ai-decision-banner.tsx`.
2. Struktur Komponen:
   - Wrapper: `bg-helios-card border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between`.
   - Judul Headline: `<h3 className="text-base font-bold text-white tracking-tight">Decisions Powered by Data</h3>`.
   - Paragraf Deskripsi: `<p className="text-xs text-white/60 mt-2 leading-relaxed">Move beyond guesswork with AI-driven investment insights tailored to your strategy.</p>`.
   - Bagian Bawah Kartu:
     - Terapkan background radial gradient aura: `.glow-ai-radial` yang memancarkan pendaran ungu/pink halus dari bagian bawah.
     - Tombol CTA Tengah: `<button className="rounded-full px-6 py-2.5 bg-gradient-to-r from-fuchsia-400/80 to-purple-400/80 text-black font-semibold text-xs shadow-lg hover:opacity-95 transition-all">Explore AI Insights</button>`.
3. Event Handler:
   - Klik pada tombol CTA memicu pembukaan drawer asisten Helios AI.

## Kriteria selesai
- [ ] Efek pendaran radial (ambient mauve glow) terlihat nyata di bawah kartu seperti di mockup.
- [ ] Tombol "Explore AI Insights" memiliki bentuk pill membulat penuh dan merespon klik pengguna.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan buat gradasi latar belakang terlalu terang; pertahankan nuansa gelap mewah (*dark luxury*) dengan opacity halus.
