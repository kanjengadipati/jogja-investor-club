/**
 * Sanity Content Seeder — Jogja Investor Club
 *
 * Memasukkan default content + upload gambar ke Sanity dataset.
 * Jalankan dengan: npm run seed
 *
 * REQUIREMENT: SANITY_API_TOKEN di .env.local harus berisi token dengan role Editor/Write.
 * Dapatkan di: https://sanity.io/manage → project fxrpr0tm → API → Tokens
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'fxrpr0tm';
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token     = process.env.SANITY_API_TOKEN;

if (!token || token === 'PASTE_YOUR_NEW_TOKEN_HERE' || token === 'your_sanity_api_token_here') {
  console.error('\n❌  SANITY_API_TOKEN belum diset di .env.local');
  console.error('   Buka https://sanity.io/manage → project fxrpr0tm → API → Tokens');
  console.error('   Buat token baru dengan role "Editor", lalu paste ke .env.local\n');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

// ─── Helper: check if doc already exists ────────────────────────────────────
async function exists(id: string): Promise<boolean> {
  const doc = await client.getDocument(id);
  return !!doc;
}

// ─── Helper: upload image from local file, returns Sanity image reference ───
interface SanityImageRef {
  _type: 'image';
  asset: { _type: 'reference'; _ref: string };
}

async function uploadImage(filePath: string, label: string): Promise<SanityImageRef | null> {
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  Gambar tidak ditemukan: ${filePath}`);
    return null;
  }

  const fileStream = fs.createReadStream(filePath);
  const filename   = path.basename(filePath);
  const ext        = path.extname(filename).replace('.', '') as 'jpg' | 'png' | 'webp';

  try {
    const asset = await client.assets.upload('image', fileStream, {
      filename,
      contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
    });
    console.log(`  📸  Uploaded — ${label}`);
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    };
  } catch (err: any) {
    console.log(`  ⚠️  Gagal upload ${label}: ${err.message}`);
    return null;
  }
}

// ─── Image paths ─────────────────────────────────────────────────────────────
const IMG = {
  villa:   path.resolve('public/images/arch_jogja_villa_1792108231919.jpg'),
  rumah:   path.resolve('public/images/arch_jogja_rumah_1792108230130.jpg'),
  kos:     path.resolve('public/images/arch_jogja_kos_1792108231318.jpg'),
  hero:    path.resolve('public/images/hero_jogja_landscape_1792108229283.jpg'),
  prambanan: path.resolve('public/images/jogja_heritage_tugu_prambanan_1792109052483.jpg'),
  logo:    path.resolve('public/images/logo-jic-original.png'),
};

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🌱  Seeding Sanity dataset "${dataset}" (project: ${projectId})\n`);

  // ── Upload all images first ──────────────────────────────────────────────
  console.log('📦  Uploading images...\n');
  const [
    imgVilla,
    imgRumah,
    imgKos,
    imgHero,
    imgPrambanan,
    imgLogo,
  ] = await Promise.all([
    uploadImage(IMG.villa,     'Villa'),
    uploadImage(IMG.rumah,     'Rumah'),
    uploadImage(IMG.kos,       'Kos'),
    uploadImage(IMG.hero,      'Hero background'),
    uploadImage(IMG.prambanan, 'Prambanan heritage'),
    uploadImage(IMG.logo,      'Logo JIC'),
  ]);

  // ── Build documents ──────────────────────────────────────────────────────
  const siteSettings = {
    _id: 'siteSettings-singleton',
    _type: 'siteSettings',
    brandName: 'Jogja Investor',
    brandSuffix: 'Club',
    whatsappNumber: '6282137000888',
    address: 'Yogyakarta, D.I. Yogyakarta',
    tagline: 'Konsultan Finansial & Kontraktor Properti',
    defaultWhatsAppMessage:
      'Halo Tim Jogja Investor Club, saya memiliki tanah di Yogyakarta dan ingin berkonsultasi mengenai potensi pengembangan menjadi Rumah / Villa / Homestay & Kos Eksklusif. Mohon info jadwal konsultasi awal gratis. Terima kasih!',
    ...(imgLogo ? { logo: imgLogo } : {}),
  };

  const hero = {
    _id: 'hero-singleton',
    _type: 'hero',
    kicker: 'Jogja Investor Club · Private Network',
    headline: 'Investasi Properti',
    headlineAccent: 'di Jogja.',
    subheadline:
      'Bergabunglah bersama jaringan investor properti eksklusif di Yogyakarta. Akses deal terkurasi, analisis GIS presisi, dan pendampingan penuh — dari lahan hingga passive income.',
    ctaPrimaryText: 'Daftar Konsultasi Gratis',
    ctaSecondaryText: 'Analisis Peluang Lahan',
    quoteText: 'Akses eksklusif ke peluang\nproperti terbaik di Jogja',
    ...(imgHero ? { backgroundImage: imgHero } : {}),
  };

  const propertyArchetypes = [
    {
      _id: 'archetype-rumah',
      _type: 'propertyArchetype',
      id: 'rumah',
      title: 'Rumah',
      subtitle: 'Hunian syariah untuk keluarga',
      tagline: 'Aset apresiasi jangka panjang',
      description:
        'Hunian keluarga bernuansa islami dengan desain modern minimalis. Cocok untuk investor yang ingin portofolio properti residensial dengan nilai apresiasi stabil.',
      yieldInfo: 'Apresiasi 10–15% / thn',
      buildCost: 'Rp 4.5 Jt / m²',
      minArea: '120 m²',
      features: ['Desain modern minimalis', 'KPR syariah tersedia', 'Sertifikat SHM', 'Area strategis dekat fasilitas publik'],
      order: 1,
      ...(imgRumah ? { image: imgRumah } : {}),
    },
    {
      _id: 'archetype-villa',
      _type: 'propertyArchetype',
      id: 'villa',
      title: 'Villa',
      subtitle: 'Investasi properti bernilai tinggi',
      tagline: 'ROI premium dari sewa harian',
      description:
        'Villa mewah dengan kolam renang privat dan interior premium. Ideal untuk investor yang ingin ROI tinggi dari pasar sewa harian wisatawan Jogja.',
      yieldInfo: 'ROI 15–22% / thn',
      buildCost: 'Rp 6.2 Jt / m²',
      minArea: '180 m²',
      features: ['Kolam renang privat', 'Interior premium', 'Manajemen sewa terkelola', 'Dekat destinasi wisata utama'],
      order: 2,
      ...(imgVilla ? { image: imgVilla } : {}),
    },
    {
      _id: 'archetype-kos',
      _type: 'propertyArchetype',
      id: 'kos',
      title: 'Homestay & Kos',
      subtitle: 'Penghasilan stabil jangka panjang',
      tagline: 'Occupancy rate 90%+ sepanjang tahun',
      description:
        'Kos eksekutif dan homestay dekat kawasan kampus atau pusat kota. Demand tinggi dari mahasiswa dan profesional muda dengan occupancy rate konsisten.',
      yieldInfo: 'ROI 14–18% / thn',
      buildCost: 'Rp 3.8 Jt / m²',
      minArea: '200 m²',
      features: ['AC & WiFi tiap kamar', 'Kamar mandi dalam', 'Dapur bersama', 'Parkir luas'],
      order: 3,
      ...(imgKos ? { image: imgKos } : {}),
    },
  ];

  const processSteps = [
    {
      _id: 'step-1',
      _type: 'processStep',
      number: 1,
      title: 'Konsultasi Awal',
      description: 'Diskusikan kebutuhan dan rencana investasi Anda bersama konsultan kami secara gratis.',
      icon: 'MessageSquare',
    },
    {
      _id: 'step-2',
      _type: 'processStep',
      number: 2,
      title: 'Analisis Potensi',
      description: 'Pelajari nilai dan potensi lahan berdasarkan data kawasan, infrastruktur, dan regulasi setempat.',
      icon: 'Search',
    },
    {
      _id: 'step-3',
      _type: 'processStep',
      number: 3,
      title: 'Desain & Estimasi',
      description: 'Dapatkan desain konsep dan estimasi biaya yang transparan sesuai anggaran dan target ROI Anda.',
      icon: 'PenTool',
    },
    {
      _id: 'step-4',
      _type: 'processStep',
      number: 4,
      title: 'Bangun & Serah Terima',
      description: 'Proses pembangunan terpantau penuh hingga properti siap ditempati atau langsung disewakan.',
      icon: 'Check',
    },
  ];

  const projects = [
    {
      _id: 'project-villa-seturan',
      _type: 'project',
      title: 'Villa Eksklusif Seturan',
      location: 'Sleman, Yogyakarta',
      propertyType: 'Villa',
      year: 2024,
      summary:
        'Villa mewah 2 lantai dengan kolam renang privat, dirancang untuk investor yang mencari ROI tinggi dari sewa harian wisatawan.',
      specs: [
        { _key: 'spec-1', label: 'Luas Tanah',       value: '300 m²'      },
        { _key: 'spec-2', label: 'Luas Bangunan',     value: '220 m²'      },
        { _key: 'spec-3', label: 'Nilai Investasi',   value: 'Rp 2.5 M'    },
        { _key: 'spec-4', label: 'ROI',               value: '18% / tahun' },
      ],
      featured: true,
      order: 1,
      ...(imgVilla ? { coverImage: imgVilla } : {}),
      ...(imgVilla && imgRumah && imgKos
        ? { gallery: [imgVilla, imgRumah, imgKos] }
        : {}),
    },
    {
      _id: 'project-kos-kampus',
      _type: 'project',
      title: 'Kos Eksekutif Kawasan Kampus',
      location: 'Depok, Sleman',
      propertyType: 'Homestay & Kos',
      year: 2024,
      summary:
        'Kos eksekutif 20 kamar dekat kampus UGM, dengan occupancy rate 95% sejak bulan pertama operasi.',
      specs: [
        { _key: 'spec-1', label: 'Luas Tanah',      value: '500 m²'      },
        { _key: 'spec-2', label: 'Jumlah Kamar',    value: '20 kamar'    },
        { _key: 'spec-3', label: 'Nilai Investasi', value: 'Rp 1.8 M'    },
        { _key: 'spec-4', label: 'ROI',             value: '15% / tahun' },
      ],
      featured: false,
      order: 2,
      ...(imgKos ? { coverImage: imgKos } : {}),
      ...(imgKos && imgRumah
        ? { gallery: [imgKos, imgRumah] }
        : {}),
    },
    {
      _id: 'project-rumah-bantul',
      _type: 'project',
      title: 'Rumah Modern Minimalis Bantul',
      location: 'Bantul, Yogyakarta',
      propertyType: 'Rumah',
      year: 2023,
      summary:
        'Rumah hunian keluarga dengan konsep islami, 3 kamar tidur dan taman tropis di halaman belakang. Apresiasi nilai 12% dalam satu tahun pertama.',
      specs: [
        { _key: 'spec-1', label: 'Luas Tanah',     value: '150 m²'      },
        { _key: 'spec-2', label: 'Luas Bangunan',  value: '120 m²'      },
        { _key: 'spec-3', label: 'Nilai Investasi', value: 'Rp 900 Jt'  },
        { _key: 'spec-4', label: 'Apresiasi',       value: '12% / tahun' },
      ],
      featured: false,
      order: 3,
      ...(imgRumah ? { coverImage: imgRumah } : {}),
      ...(imgRumah && imgVilla
        ? { gallery: [imgRumah, imgVilla] }
        : {}),
    },
  ];

  // ── Upsert all documents ─────────────────────────────────────────────────
  console.log('\n📄  Writing documents...\n');

  const allDocs = [
    { doc: siteSettings,         label: 'Site Settings'                          },
    { doc: hero,                  label: 'Hero Section'                           },
    ...propertyArchetypes.map((d) => ({ doc: d, label: `Property Archetype: ${d.title}` })),
    ...processSteps.map((d)      => ({ doc: d, label: `Process Step ${d.number}: ${d.title}` })),
    ...projects.map((d)          => ({ doc: d, label: `Project: ${d.title}`       })),
  ];

  let created = 0;
  let updated = 0;

  for (const { doc, label } of allDocs) {
    const alreadyExists = await exists(doc._id);
    // Always createOrReplace so images get updated on re-run
    await client.createOrReplace(doc as any);
    if (alreadyExists) {
      console.log(`  🔄  Updated — ${label}`);
      updated++;
    } else {
      console.log(`  ✅  Created — ${label}`);
      created++;
    }
  }

  console.log(`\n✨  Selesai! ${created} dibuat, ${updated} diupdate.\n`);
  console.log(`📝  Buka Studio untuk review:\n    http://localhost:3002/studio\n`);
}

seed().catch((err) => {
  console.error('\n❌  Error saat seeding:', err.message);
  process.exit(1);
});
