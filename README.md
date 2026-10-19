# Jogja Investor Club (JIC) 🏠

> Platform investasi properti eksklusif di Yogyakarta — dari lahan kosong hingga passive income.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity)](https://sanity.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

**Live:** [jic.webjoz.com](https://jic.webjoz.com) · **CMS Studio:** [jic.webjoz.com/studio](https://jic.webjoz.com/studio)

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Tech Stack](#tech-stack)
- [Fitur Utama](#fitur-utama)
- [Struktur Proyek](#struktur-proyek)
- [Sanity CMS Schema](#sanity-cms-schema)
- [Memulai Pengembangan](#memulai-pengembangan)
- [Environment Variables](#environment-variables)
- [SEO & Structured Data](#seo--structured-data)
- [Deployment](#deployment)

---

## Tentang Proyek

**Jogja Investor Club (JIC)** adalah landing page dan platform investasi properti untuk jaringan investor eksklusif di Daerah Istimewa Yogyakarta. Aplikasi ini dibangun sebagai **marketing site** + **lead generation platform** dengan fitur:

- Presentasi layanan investasi properti (kos eksklusif, villa, rumah)
- GIS Spatial Intelligence — peta interaktif kawasan investasi DIY
- Kalkulator potensi lahan & estimasi ROI
- Manajemen konten penuh via Sanity Studio
- SEO teroptimasi dengan structured data JSON-LD

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router + ISR) |
| Bahasa | TypeScript 5.x |
| Styling | Tailwind CSS 4.x + CSS Variables |
| CMS | [Sanity v3](https://sanity.io) (dengan custom Studio) |
| Animasi | [Motion (Framer Motion)](https://motion.dev) |
| Peta | [Leaflet.js](https://leafletjs.com) + OpenStreetMap |
| AI | Google Gemini API (`@google/genai`) |
| Analytics | Vercel Analytics |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Plus Jakarta Sans · Playfair Display · DM Sans |
| Deploy | [Vercel](https://vercel.com) |

---

## Fitur Utama

### 🏘️ Halaman Utama
- **Hero Section** — Cinematic full-bleed dengan data dari Sanity
- **Property Archetypes** — Kartu interaktif (Kos Eksklusif, Villa, Rumah)
- **Strategic Areas (GIS)** — Peta kawasan investasi DIY dengan data NJOP & yield
- **Process Steps** — Alur layanan JIC
- **Portfolio Proyek** — Galeri proyek selesai dengan lightbox
- **Testimonials** — Ulasan klien & investor
- **FAQ** — Accordion interaktif dengan filter kategori & pencarian
- **Lead Calculator** — Kalkulator potensi lahan & ROI

### 🎛️ Sanity Studio (`/studio`)
- Dashboard custom dengan branding JIC
- Manajemen konten: Hero, Proyek, Arketipe Properti, FAQ, Testimoni
- Data kawasan investasi & cluster investasi DIY

### 🔍 SEO
- `sitemap.xml` otomatis
- `robots.txt` dengan blokir `/studio/`
- JSON-LD: `RealEstateAgent`, `WebSite`, `FAQPage`
- Geo meta tags untuk local SEO Yogyakarta
- Open Graph + Twitter Cards

---

## Struktur Proyek

```
jogja-investor-club/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout + metadata global
│   ├── page.tsx             # Homepage (server component + ISR)
│   ├── manifest.ts          # Web App Manifest (PWA)
│   ├── robots.ts            # robots.txt generator
│   ├── sitemap.ts           # sitemap.xml generator
│   └── studio/              # Sanity Studio embedded
│       └── [[...tool]]/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── PropertyArchetypes.tsx
│   │   ├── StrategicAreas.tsx
│   │   ├── ProcessSteps.tsx
│   │   ├── Projects.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── LeadCalculatorBanner.tsx
│   │   ├── JogjaRealMap.tsx  # Leaflet GIS Map
│   │   ├── JsonLd.tsx        # Structured data / SEO
│   │   ├── Footer.tsx
│   │   ├── WhatsAppFloatingCTA.tsx
│   │   └── PageClient.tsx    # Client boundary
│   ├── data/                # Static data & GIS data
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── sanity/
│   ├── schemas/             # Sanity content schemas
│   ├── components/          # Custom Studio components
│   ├── queries.ts           # GROQ queries
│   ├── client.ts            # Sanity client
│   └── theme.ts             # Custom Studio theme
├── public/
│   └── images/              # Static assets & logos
├── scripts/
│   └── seed.ts              # Sanity data seeder
├── sanity.config.ts         # Sanity Studio configuration
└── next.config.js
```

---

## Sanity CMS Schema

| Schema | Deskripsi |
|---|---|
| `hero` | Konten Hero Section (headline, subheadline, CTA, gambar) |
| `siteSettings` | Pengaturan global (brand, WhatsApp, alamat) |
| `propertyArchetype` | Kartu tipe properti (Kos, Villa, Rumah) |
| `project` | Portofolio proyek selesai (galeri, lokasi, yield) |
| `processStep` | Langkah-langkah proses layanan JIC |
| `testimonial` | Ulasan & testimoni klien / investor |
| `faq` | Pertanyaan & jawaban (dengan kategori) |
| `investmentCluster` | Cluster investasi DIY (Sleman, Bantul, dll) |
| `yogyakartaRegion` | Data kecamatan: NJOP, yield, KDB, RTRW |
| `teamMember` | Profil anggota tim JIC |

---

## Memulai Pengembangan

### Prasyarat

- Node.js ≥ 20
- npm atau bun
- Akun [Sanity.io](https://sanity.io) (project sudah ada, lihat env vars)

### Instalasi

```bash
# Clone repository
git clone https://github.com/kanjengadipati/jogja-investor-club.git
cd jogja-investor-club

# Install dependencies
npm install

# Salin file environment
cp .env.example .env.local
# → Isi nilai di .env.local (lihat bagian Environment Variables)

# Jalankan dev server
npm run dev
```

Aplikasi berjalan di: **http://localhost:3002**
Sanity Studio di: **http://localhost:3002/studio**

### Seed Data Awal (Opsional)

Untuk mengisi Sanity dengan data contoh:

```bash
npm run seed
```

---

## Environment Variables

Buat file `.env.local` di root project:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="fxrpr0tm"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your_sanity_api_token_here"

# Site URL — untuk SEO canonical, sitemap, OG tags
NEXT_PUBLIC_SITE_URL="https://jic.webjoz.com"

# Google Gemini AI (untuk fitur AI)
GEMINI_API_KEY="your_gemini_api_key_here"
```

> **Catatan:** `SANITY_API_TOKEN` bisa didapatkan dari Sanity Dashboard → API → Tokens. Gunakan token dengan permission `editor` untuk seeder, `viewer` untuk production.

---

## SEO & Structured Data

Aplikasi ini mengimplementasikan SEO lengkap:

### File Otomatis (Next.js)
- **`/sitemap.xml`** — Dihasilkan dari `app/sitemap.ts`
- **`/robots.txt`** — Dihasilkan dari `app/robots.ts` (memblokir `/studio/`)
- **`/manifest.webmanifest`** — Dihasilkan dari `app/manifest.ts`

### Structured Data JSON-LD (`src/components/JsonLd.tsx`)
Diinjeksikan server-side di `app/page.tsx`:

1. **`RealEstateAgent` + `ProfessionalService`** — Data organisasi JIC, geo, areaServed, dan katalog layanan
2. **`WebSite`** — Identitas situs
3. **`FAQPage`** — Aktifkan **Google FAQ Rich Results** di SERP

### Geo Local SEO
```
geo.region: ID-YO
geo.placename: Yogyakarta, Sleman, Bantul
geo.position: -7.7956;110.3695
```

### Setelah Deploy
Submit sitemap ke **Google Search Console**:
```
https://jic.webjoz.com/sitemap.xml
```

---

## Deployment

Project ini di-deploy di **Vercel**. Setiap push ke `main` akan trigger auto-deployment.

### Environment Variables di Vercel

Tambahkan semua env vars dari `.env.local` ke Vercel Dashboard:
`Project → Settings → Environment Variables`

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `fxrpr0tm` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | *(from Sanity Dashboard)* |
| `NEXT_PUBLIC_SITE_URL` | `https://jic.webjoz.com` |
| `GEMINI_API_KEY` | *(from Google AI Studio)* |

### Build Commands

```bash
npm run dev        # Development server (port 3002)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
npm run seed       # Seed Sanity CMS with sample data
```

---

## Lisensi

© 2025 Jogja Investor Club. All rights reserved. — Properti milik tim JIC, tidak untuk didistribusikan.
