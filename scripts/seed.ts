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

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'fxrpr0tm';
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token     = process.env.SANITY_API_TOKEN;

if (!token || token === 'PASTE_YOUR_NEW_TOKEN_HERE' || token === 'your_sanity_api_token_here') {
  console.error('\n❌  SANITY_API_TOKEN belum diset di .env.local\n');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token });

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function exists(id: string): Promise<boolean> {
  return !!(await client.getDocument(id));
}

interface ImgRef { _type: 'image'; asset: { _type: 'reference'; _ref: string } }

async function uploadImage(filePath: string, label: string): Promise<ImgRef | null> {
  if (!fs.existsSync(filePath)) { console.log(`  ⚠️  Tidak ditemukan: ${filePath}`); return null; }
  const ext = path.extname(filePath).replace('.', '') as 'jpg' | 'png';
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
    });
    console.log(`  📸  Uploaded — ${label}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (e: any) { console.log(`  ⚠️  Gagal upload ${label}: ${e.message}`); return null; }
}

function block(key: string, text: string) {
  return { _key: key, _type: 'block', style: 'normal', markDefs: [],
    children: [{ _key: `${key}-s`, _type: 'span', marks: [], text }] };
}

// ─── Image paths ─────────────────────────────────────────────────────────────
const IMG = {
  villa:     path.resolve('public/images/arch_jogja_villa_1792108231919.jpg'),
  rumah:     path.resolve('public/images/arch_jogja_rumah_1792108230130.jpg'),
  kos:       path.resolve('public/images/arch_jogja_kos_1792108231318.jpg'),
  hero:      path.resolve('public/images/hero_jogja_landscape_1792108229283.jpg'),
  prambanan: path.resolve('public/images/jogja_heritage_tugu_prambanan_1792109052483.jpg'),
  logo:      path.resolve('public/images/logo-jic-original.png'),
};

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🌱  Seeding "${dataset}" (project: ${projectId})\n`);
  console.log('📦  Uploading images...\n');

  const [imgVilla, imgRumah, imgKos, imgHero, , imgLogo] = await Promise.all([
    uploadImage(IMG.villa, 'Villa'),
    uploadImage(IMG.rumah, 'Rumah'),
    uploadImage(IMG.kos, 'Kos'),
    uploadImage(IMG.hero, 'Hero background'),
    uploadImage(IMG.prambanan, 'Prambanan'),
    uploadImage(IMG.logo, 'Logo JIC'),
  ]);

  // ── 1. Site Settings ────────────────────────────────────────────────────
  const siteSettings = {
    _id: 'siteSettings-singleton', _type: 'siteSettings',
    brandName: 'Jogja Investor', brandSuffix: 'Club',
    whatsappNumber: '6282137000888',
    address: 'Yogyakarta, D.I. Yogyakarta',
    tagline: 'Konsultan Finansial & Kontraktor Properti',
    defaultWhatsAppMessage: 'Halo Tim Jogja Investor Club, saya memiliki tanah di Yogyakarta dan ingin berkonsultasi mengenai potensi pengembangan menjadi Rumah / Villa / Homestay & Kos Eksklusif. Mohon info jadwal konsultasi awal gratis. Terima kasih!',
    showSectionHero: true,
    showSectionPropertyArchetypes: true,
    showSectionStrategicAreas: true,
    showSectionProcessSteps: true,
    showSectionProjects: true,
    showSectionTestimonials: true,
    showSectionFAQ: true,
    showSectionCalculator: true,
    ...(imgLogo ? { logo: imgLogo } : {}),
  };

  // ── 2. Hero ──────────────────────────────────────────────────────────────
  const hero = {
    _id: 'hero-singleton', _type: 'hero',
    kicker: 'Jogja Investor Club · Private Network',
    headline: 'Investasi Properti',
    headlineAccent: 'di Jogja.',
    subheadline: 'Bergabunglah bersama jaringan investor properti eksklusif di Yogyakarta. Akses deal terkurasi, analisis GIS presisi, dan pendampingan penuh — dari lahan hingga passive income.',
    ctaPrimaryText: 'Daftar Konsultasi Gratis',
    ctaSecondaryText: 'Analisis Peluang Lahan',
    quoteText: 'Akses eksklusif ke peluang\nproperti terbaik di Jogja',
    ...(imgHero ? { backgroundImage: imgHero } : {}),
  };

  // ── 3. Property Archetypes ───────────────────────────────────────────────
  const propertyArchetypes = [
    {
      _id: 'archetype-rumah', _type: 'propertyArchetype',
      id: 'rumah', title: 'Rumah', subtitle: 'Hunian syariah untuk keluarga',
      tagline: 'Aset apresiasi jangka panjang',
      description: 'Hunian keluarga bernuansa islami dengan desain modern minimalis. Cocok untuk investor yang ingin portofolio properti residensial dengan nilai apresiasi stabil.',
      yieldInfo: 'Apresiasi 10–15% / thn', buildCost: 'Rp 4.5 Jt / m²', minArea: '120 m²',
      features: ['Desain modern minimalis', 'KPR syariah tersedia', 'Sertifikat SHM', 'Area strategis dekat fasilitas publik'],
      order: 1, ...(imgRumah ? { image: imgRumah } : {}),
    },
    {
      _id: 'archetype-villa', _type: 'propertyArchetype',
      id: 'villa', title: 'Villa', subtitle: 'Investasi properti bernilai tinggi',
      tagline: 'ROI premium dari sewa harian',
      description: 'Villa mewah dengan kolam renang privat dan interior premium. Ideal untuk investor yang ingin ROI tinggi dari pasar sewa harian wisatawan Jogja.',
      yieldInfo: 'ROI 15–22% / thn', buildCost: 'Rp 6.2 Jt / m²', minArea: '180 m²',
      features: ['Kolam renang privat', 'Interior premium', 'Manajemen sewa terkelola', 'Dekat destinasi wisata utama'],
      order: 2, ...(imgVilla ? { image: imgVilla } : {}),
    },
    {
      _id: 'archetype-kos', _type: 'propertyArchetype',
      id: 'kos', title: 'Homestay & Kos', subtitle: 'Penghasilan stabil jangka panjang',
      tagline: 'Occupancy rate 90%+ sepanjang tahun',
      description: 'Kos eksekutif dan homestay dekat kawasan kampus atau pusat kota. Demand tinggi dari mahasiswa dan profesional muda dengan occupancy rate konsisten.',
      yieldInfo: 'ROI 14–18% / thn', buildCost: 'Rp 3.8 Jt / m²', minArea: '200 m²',
      features: ['AC & WiFi tiap kamar', 'Kamar mandi dalam', 'Dapur bersama', 'Parkir luas'],
      order: 3, ...(imgKos ? { image: imgKos } : {}),
    },
  ];

  // ── 4. Process Steps (Proses Kerja Kami) ─────────────────────────────────
  const processSteps = [
    {
      _id: 'step-1', _type: 'processStep', number: 1,
      title: 'Konsultasi Awal',
      description: 'Diskusikan kebutuhan dan rencana investasi Anda bersama konsultan kami secara gratis. Kami bantu identifikasi potensi lahan dan pilihan properti terbaik sesuai lokasi.',
      icon: 'MessageSquare',
    },
    {
      _id: 'step-2', _type: 'processStep', number: 2,
      title: 'Analisis Potensi',
      description: 'Pelajari nilai dan potensi lahan berdasarkan data kawasan, infrastruktur, regulasi tata ruang (RTRW), dan analisis GIS presisi dari tim kami.',
      icon: 'Search',
    },
    {
      _id: 'step-3', _type: 'processStep', number: 3,
      title: 'Desain & Estimasi',
      description: 'Dapatkan desain konsep 3D dan estimasi biaya (RAB) yang transparan sesuai anggaran dan target ROI Anda. Tidak ada biaya tersembunyi.',
      icon: 'PenTool',
    },
    {
      _id: 'step-4', _type: 'processStep', number: 4,
      title: 'Bangun & Serah Terima',
      description: 'Proses pembangunan terpantau penuh dengan laporan progres mingguan, hingga properti siap ditempati atau langsung disewakan dan menghasilkan passive income.',
      icon: 'Check',
    },
  ];

  // ── 5. Projects ──────────────────────────────────────────────────────────
  const projects = [
    {
      _id: 'project-villa-seturan', _type: 'project',
      title: 'Villa Eksklusif Seturan', location: 'Sleman, Yogyakarta',
      propertyType: 'Villa', year: 2024,
      summary: 'Villa mewah 2 lantai dengan kolam renang privat, dirancang untuk investor yang mencari ROI tinggi dari sewa harian wisatawan.',
      description: [
        block('dv1', 'Villa Eksklusif Seturan adalah proyek unggulan Jogja Investor Club yang berlokasi di kawasan premium Sleman, Yogyakarta. Dibangun di atas lahan 300 m² dengan total luas bangunan 220 m², villa ini dirancang untuk memaksimalkan potensi sewa harian dari pasar wisatawan domestik dan mancanegara.'),
        block('dv2', 'Fasilitas utama meliputi kolam renang privat berukuran 8×4 m, ruang tamu bergaya resort, dapur fully-equipped, dan 3 kamar tidur en-suite. Properti ini telah beroperasi sejak Q1 2024 dengan tingkat hunian rata-rata 78% dan ROI aktual 18% per tahun.'),
        block('dv3', 'Manajemen properti dikelola penuh oleh tim JIC termasuk listing di platform Airbnb, Traveloka Stays, dan Booking.com, sehingga investor tidak perlu terlibat langsung dalam operasional harian.'),
      ],
      specs: [
        { _key: 'sv1', label: 'Luas Tanah', value: '300 m²' },
        { _key: 'sv2', label: 'Luas Bangunan', value: '220 m²' },
        { _key: 'sv3', label: 'Nilai Investasi', value: 'Rp 2.5 M' },
        { _key: 'sv4', label: 'ROI', value: '18% / tahun' },
      ],
      featured: true, order: 1,
      ...(imgVilla ? { coverImage: imgVilla } : {}),
      ...(imgVilla && imgRumah && imgKos ? { gallery: [
        { ...imgVilla, _key: 'gv1' }, { ...imgRumah, _key: 'gv2' }, { ...imgKos, _key: 'gv3' },
      ] } : {}),
    },
    {
      _id: 'project-kos-kampus', _type: 'project',
      title: 'Kos Eksekutif Kawasan Kampus', location: 'Depok, Sleman',
      propertyType: 'Homestay & Kos', year: 2024,
      summary: 'Kos eksekutif 20 kamar dekat kampus UGM, dengan occupancy rate 95% sejak bulan pertama operasi.',
      description: [
        block('dk1', 'Proyek kos eksekutif ini hadir di jantung kawasan kampus Depok, Sleman — hanya 800 meter dari gerbang utama UGM. Dibangun di atas tanah 500 m² dengan 20 kamar berukuran 18 m² masing-masing dilengkapi AC, kamar mandi dalam, dan akses WiFi fiber optik.'),
        block('dk2', 'Sejak beroperasi pada Agustus 2024, hunian ini langsung mencapai occupancy rate 95% berkat sistem pra-booking yang sudah dibuka 3 bulan sebelum serah terima. Tarif sewa berkisar Rp 1.8–2.2 juta per kamar per bulan.'),
        block('dk3', 'ROI aktual mencapai 15% per tahun dengan proyeksi BEP (Break-Even Point) dalam 5.8 tahun. Pengelolaan operasional harian ditangani oleh manajemen properti mitra JIC.'),
      ],
      specs: [
        { _key: 'sk1', label: 'Luas Tanah', value: '500 m²' },
        { _key: 'sk2', label: 'Jumlah Kamar', value: '20 kamar' },
        { _key: 'sk3', label: 'Nilai Investasi', value: 'Rp 1.8 M' },
        { _key: 'sk4', label: 'ROI', value: '15% / tahun' },
      ],
      featured: false, order: 2,
      ...(imgKos ? { coverImage: imgKos } : {}),
      ...(imgKos && imgRumah ? { gallery: [
        { ...imgKos, _key: 'gk1' }, { ...imgRumah, _key: 'gk2' },
      ] } : {}),
    },
    {
      _id: 'project-rumah-bantul', _type: 'project',
      title: 'Rumah Modern Minimalis Bantul', location: 'Bantul, Yogyakarta',
      propertyType: 'Rumah', year: 2023,
      summary: 'Rumah hunian keluarga dengan konsep islami, 3 kamar tidur dan taman tropis di halaman belakang. Apresiasi nilai 12% dalam satu tahun pertama.',
      description: [
        block('dr1', 'Rumah Modern Minimalis Bantul adalah proyek hunian keluarga yang mengedepankan konsep islami modern dengan desain tropis kontemporer. Berlokasi di kawasan strategis Bantul, 15 menit dari pusat Kota Yogyakarta.'),
        block('dr2', 'Bangunan 2 lantai ini memiliki 3 kamar tidur, 2 kamar mandi, ruang keluarga yang luas, dan dapur semi-terbuka menghadap taman tropis di halaman belakang. Material utama menggunakan batu bata ekspos, kayu sengon, dan kaca double-pane untuk efisiensi energi.'),
        block('dr3', 'Setelah serah terima pada Desember 2023, nilai properti mengalami apresiasi 12% berdasarkan appraisal bank pada pertengahan 2024 — melampaui proyeksi awal sebesar 8–10% per tahun.'),
      ],
      specs: [
        { _key: 'sr1', label: 'Luas Tanah', value: '150 m²' },
        { _key: 'sr2', label: 'Luas Bangunan', value: '120 m²' },
        { _key: 'sr3', label: 'Nilai Investasi', value: 'Rp 900 Jt' },
        { _key: 'sr4', label: 'Apresiasi', value: '12% / tahun' },
      ],
      featured: false, order: 3,
      ...(imgRumah ? { coverImage: imgRumah } : {}),
      ...(imgRumah && imgVilla ? { gallery: [
        { ...imgRumah, _key: 'gr1' }, { ...imgVilla, _key: 'gr2' },
      ] } : {}),
    },
  ];

  // ── 6. Investment Clusters (GIS Panel) ───────────────────────────────────
  const investmentClusters = [
    {
      _id: 'cluster-semua', _type: 'investmentCluster',
      clusterId: 'semua', order: 0,
      title: 'Semua Kawasan DIY',
      subtitle: 'Lihat seluruh 5 kabupaten/kota',
      badge: '🗺️ Comprehensive',
      bestFor: 'Portfolio Diversifikasi',
      priceBadge: 'Pasar Rp 1,5 - 25 jt/m²',
      fullName: 'Daerah Istimewa Yogyakarta (Seluruh Kawasan)',
      description: 'Mencakup 5 kabupaten/kota dengan beragam karakteristik investasi dari perkotaan, koridor universitas, hingga kawasan pariwisata heritage dan bahari.',
      priceRange: 'Rp 2,5 - 18 jt/m²', njopPrice: 'Rp 450 Rb - 22 Jt/m²',
      growthRate: '+8% - 15%', roi: '8% - 14% / tahun',
      targetRegions: ['semua'], hotspotKecamatanSlugs: [],
    },
    {
      _id: 'cluster-kampus', _type: 'investmentCluster',
      clusterId: 'kampus', order: 1,
      title: 'Kawasan Kampus',
      subtitle: 'UGM, UNY, Seturan, UPN, UII, UMY',
      badge: '🔥 Hot Demand',
      bestFor: 'Kost Eksklusif & Co-Living',
      priceBadge: 'Pasar Rp 5,5 - 16 jt/m²',
      fullName: 'Kawasan Kampus & Pelajar (Sleman, Kota Jogja & Bantul Utara)',
      description: 'Didukung 300.000+ mahasiswa aktif. Sleman: Depok (Seturan, Caturtunggal, Babarsari), Ngaglik (Jakal, UII), Mlati (UTY). Kota: Gondokusuman (UKDW, UAJY), Umbulharjo (UAD). Bantul: Kasihan (UMY, Alma Ata, ISI). Kawasan dengan occupancy kos 95%+ sepanjang tahun.',
      priceRange: 'Rp 5,5 - 16 jt/m²', njopPrice: 'Rp 3,5 - 14 jt/m²',
      growthRate: '+11% - 16%', roi: '12% - 18% / tahun',
      targetRegions: ['sleman', 'kota', 'bantul'],
      hotspotKecamatanSlugs: ['depok', 'ngaglik', 'mlati', 'ngemplak', 'gondokusuman', 'umbulharjo', 'tegalrejo', 'kasihan'],
    },
    {
      _id: 'cluster-wisata', _type: 'investmentCluster',
      clusterId: 'wisata', order: 2,
      title: 'Kawasan Wisata & Staycation',
      subtitle: 'Malioboro, Parangtritis, Kaliurang, Mangunan',
      badge: '🏖️ High Yield',
      bestFor: 'Villa & Boutique Homestay',
      priceBadge: 'Pasar Rp 4,0 - 16 jt/m²',
      fullName: 'Kawasan Wisata & Staycation (Bantul, Kota Jogja, Sleman & Gunungkidul)',
      description: 'Koridor 7.2+ juta wisatawan/tahun. Malioboro (Kraton, Gedongtengen, Gondomanan), Prawirotaman (Mergangsan, Mantrijeron), Kaliurang (Pakem, Turi), Dlingo (Mangunan glamping), Patuk (HeHa Sky View), dan Parangtritis (Kretek). Potensial villa sewa harian dan homestay estetik.',
      priceRange: 'Rp 4,0 - 16 jt/m²', njopPrice: 'Rp 1,5 - 7,5 jt/m²',
      growthRate: '+10% - 14%', roi: '14% - 22% / tahun',
      targetRegions: ['bantul', 'kota', 'sleman', 'gunungkidul'],
      hotspotKecamatanSlugs: ['kraton', 'gedongtengen', 'gondomanan', 'mergangsan', 'mantrijeron', 'pakem', 'turi', 'cangkringan', 'prambanan', 'kretek', 'sanden', 'bambanglipuro', 'dlingo', 'patuk'],
    },
    {
      _id: 'cluster-premium', _type: 'investmentCluster',
      clusterId: 'premium', order: 3,
      title: 'Kawasan Premium Kota',
      subtitle: 'Kotabaru, Ring Road Utara, Elit Pusat',
      badge: '💎 Prime Capital',
      bestFor: 'Luxury Townhouse & Komersial',
      priceBadge: 'Pasar Rp 9,0 - 25 jt/m²',
      fullName: 'Kota Yogyakarta & Sleman Tengah (Kawasan Premium)',
      description: 'Aksesibilitas terbaik dan fasilitas terlengkap. Gondokusuman (Kotabaru heritage), Umbulharjo (bisnis modern), Pakualaman (elite heritage), Mlati & Gamping (Ring Road Utara hunian premium). Likuiditas aset tertinggi.',
      priceRange: 'Rp 9,0 - 25 jt/m²', njopPrice: 'Rp 6,0 - 22 jt/m²',
      growthRate: '+12% - 18%', roi: '9% - 13% / tahun',
      targetRegions: ['kota', 'sleman'],
      hotspotKecamatanSlugs: ['gondokusuman', 'umbulharjo', 'pakualaman', 'mlati', 'gamping', 'godean'],
    },
    {
      _id: 'cluster-pertumbuhan', _type: 'investmentCluster',
      clusterId: 'pertumbuhan', order: 4,
      title: 'Kawasan Pertumbuhan & Tol',
      subtitle: 'Kulon Progo YIA, Sleman & Koridor Tol',
      badge: '🚀 High Growth',
      bestFor: 'Land Banking & Ruko Transit',
      priceBadge: 'Pasar Rp 1,8 - 6,5 jt/m²',
      fullName: 'Koridor Tol Solo-Jogja-YIA & Aerotropolis Bandara (Kulon Progo, Sleman, Bantul)',
      description: 'Pertumbuhan pesat terdorong Bandara Internasional YIA dan mega-proyek Tol Solo-Jogja-YIA & Tol Bawen. Mencakup seluruh koridor exit tol & simpul pertumbuhan: Temon, Wates, Pengasih, Sentolo, Sedayu, Gamping, Mlati, Seyegan, Tempel, Kalasan, hingga Depok.',
      priceRange: 'Rp 1,8 - 6,5 jt/m²', njopPrice: 'Rp 850 Rb - 4,5 jt/m²',
      growthRate: '+14% - 20%', roi: '9% - 15% / tahun',
      targetRegions: ['kulonprogo', 'sleman', 'bantul'],
      hotspotKecamatanSlugs: ['temon', 'wates', 'pengasih', 'sentolo', 'nanggulan', 'panjatan', 'kokap', 'lendah', 'sedayu', 'gamping', 'mlati', 'seyegan', 'tempel', 'kalasan', 'depok', 'ngemplak', 'godean', 'moyudan', 'minggir'],
    },
    {
      _id: 'cluster-eco-wellness', _type: 'investmentCluster',
      clusterId: 'eco-wellness', order: 5,
      title: 'Kawasan Eco & Wellness',
      subtitle: 'Pakem, Cangkringan, Lereng Merapi',
      badge: '🌿 Eco Living',
      bestFor: 'Resort Villa & Glamping Cafe',
      priceBadge: 'Pasar Rp 2,0 - 6,0 jt/m²',
      fullName: 'Sleman Utara (Kawasan Wisata Alam & Wellness Retreat)',
      description: 'Udara sejuk lereng Merapi, view alam terbuka, air melimpah. Pakem (Kaliurang, Bumi Perkemahan), Cangkringan (Kaliadem, lava tour), Turi (agrowisata salak), Ngemplak (Besi, resort eco). Primadona: wellness villa, healing resort, glamping café.',
      priceRange: 'Rp 2,0 - 6,0 jt/m²', njopPrice: 'Rp 1,2 - 4,0 jt/m²',
      growthRate: '+10% - 15%', roi: '11% - 17% / tahun',
      targetRegions: ['sleman'],
      hotspotKecamatanSlugs: ['pakem', 'cangkringan', 'turi', 'ngemplak', 'tempel'],
    },
    {
      _id: 'cluster-heritage-art', _type: 'investmentCluster',
      clusterId: 'heritage-art', order: 6,
      title: 'Kawasan Heritage & Seni',
      subtitle: 'Kotagede, Prawirotaman, Kasihan',
      badge: '🏛️ Art & Culture',
      bestFor: 'Boutique Guesthouse & Galeri',
      priceBadge: 'Pasar Rp 3,5 - 9,5 jt/m²',
      fullName: 'Kota Jogja Selatan & Bantul Utara (Heritage & Seni)',
      description: 'Pusat komunitas ekspatriat, desainer, dan seniman internasional. Kotagede (kerajinan perak), Prawirotaman (galeri & guest house), Kasihan & Sewon (kampus ISI, kriya), Banguntapan (perumahan premium selatan). Sangat diminati turis mancanegara.',
      priceRange: 'Rp 3,5 - 9,5 jt/m²', njopPrice: 'Rp 1,5 - 7,5 jt/m²',
      growthRate: '+9% - 14%', roi: '12% - 16% / tahun',
      targetRegions: ['kota', 'bantul'],
      hotspotKecamatanSlugs: ['kotagede', 'umbulharjo', 'mergangsan', 'kraton', 'ngampilan', 'kasihan', 'sewon', 'banguntapan', 'imogiri'],
    },
    {
      _id: 'cluster-pesisir', _type: 'investmentCluster',
      clusterId: 'pesisir', order: 7,
      title: 'Pesisir Selatan & Geopark',
      subtitle: 'Gunungkidul, Parangtritis, JJLS',
      badge: '🌊 Ocean View',
      bestFor: 'Boutique Resort & Glamping',
      priceBadge: 'Pasar Rp 900 Rb - 4,5 jt/m²',
      fullName: 'Pesisir DIY Selatan (Gunungkidul & Bantul Pantai)',
      description: 'Kawasan pesisir eksotis tumbuh tercepat di DIY. Purwosari (Parangendog), Panggang (HeHa Ocean View, Pantai Gesing), Saptosari (Ngrenehan, Ngobaran), Tanjungsari (Baron, Kukup), Tepus (Indrayanti, Timang), Girisubo (Sadeng, Wediombo) + Parangtritis & Samas (Bantul). Capital gain agresif via JJLS.',
      priceRange: 'Rp 900 Rb - 4,5 jt/m²', njopPrice: 'Rp 450 Rb - 3 jt/m²',
      growthRate: '+12% - 18%', roi: '13% - 19% / tahun',
      targetRegions: ['gunungkidul', 'bantul'],
      hotspotKecamatanSlugs: ['purwosari', 'panggang', 'saptosari', 'tanjungsari', 'tepus', 'girisubo', 'rongkop', 'kretek', 'sanden', 'srandakan', 'bambanglipuro'],
    },
  ];

  // ── 7. Yogyakarta Regions (GIS Map Data) ────────────────────────────────
  const yogyakartaRegions = [
    {
      _id: 'region-semua', _type: 'yogyakartaRegion',
      regionId: 'semua', name: 'Semua Kawasan DIY',
      fullName: 'Daerah Istimewa Yogyakarta (Seluruh 5 Wilayah Terpadu)',
      recommended: 'Rumah Mewah, Villa Resort & Kos Eksklusif',
      landPrice: 'Rp 1,5 Jt - 25 Jt / m²', njopPrice: 'Rp 450 Rb - 22 Jt / m²',
      njopRangeDetail: 'Rentang NJOP Resmi PBB-P2 Seluruh DIY: Terendah di Lahan Kars GK, Tertinggi di Koridor Malioboro',
      njopRatio: '~50% - 75% dari harga pasar transaksi',
      tollAccessDesc: 'Akses 2 Trase Tol Utama: Solo-Yogyakarta-YIA & Yogyakarta-Bawen',
      rtrwDesc: 'Zonasi Terpadu RTRW DIY: Perkotaan, Kawasan Pendidikan, Aerotropolis, & Cagar Budaya',
      yieldEst: '12% - 19% / tahun', occupancy: '85% - 98%',
      kdb: 'KDB 50% - 70% · Bergantung Zonasi RTRW',
      highlights: ['Sleman (Kampus & Wisata)', 'Kota Jogja (Pusat Heritage)', 'Bantul (Seni & Industri Kreatif)', 'Gunungkidul (Pantai & Geowisata)', 'Kulon Progo (Aerotropolis YIA)'],
      desc: 'Peluang investasi properti terpadu di seluruh Daerah Istimewa Yogyakarta: kos eksklusif mahasiswa di Sleman, hunian heritage & homestay di Kota Jogja, villa asri di Kaliurang & Bantul, hingga resort pesisir di Gunungkidul.',
    },
    {
      _id: 'region-sleman', _type: 'yogyakartaRegion',
      regionId: 'sleman', name: 'Sleman',
      fullName: 'Kabupaten Sleman (Kawasan Kampus & Wisata Kaliurang)',
      recommended: 'Kos Eksklusif, Co-Living Mahasiswa & Villa Kaliurang',
      landPrice: 'Rp 5,5 Jt - 16 Jt / m²', njopPrice: 'Rp 3,5 Jt - 14 Jt / m²',
      njopRangeDetail: 'Depok/Seturan: Rp 8-14 Jt | Jakal/Ngaglik: Rp 5-10 Jt | Sleman Barat: Rp 3,5-7 Jt | Sleman Utara: Rp 1,5-3,5 Jt',
      njopRatio: '~60% - 75% dari harga pasar',
      tollAccessDesc: 'Koneksi Langsung 5 Exit Tol (Purwomartani, Maguwo, Monjali, Trihanggo, Gamping)',
      rtrwDesc: 'Zona Pendidikan Tinggi, Agrowisata Merapi & Hunian Komersial Vertikal',
      yieldEst: '14% - 19% / tahun', occupancy: '94% - 98%',
      kdb: 'KDB 60% · Maksimal 3-4 Lantai',
      highlights: ['Kampus UGM & UNY', 'Kawasan Seturan & Jakal', 'Wisata Kaliurang & Merapi'],
      desc: 'Sentra pendidikan terbesar di DIY dengan 300.000+ mahasiswa aktif. Permintaan kos eksklusif dan villa staycation tertinggi sepanjang tahun.',
    },
    {
      _id: 'region-kota', _type: 'yogyakartaRegion',
      regionId: 'kota', name: 'Kota Yogyakarta',
      fullName: 'Kota Yogyakarta (Pusat Heritage & Komersial)',
      recommended: 'Boutique Homestay, Hotel Transit & Rumah Heritage Mewah',
      landPrice: 'Rp 9 Jt - 25 Jt / m²', njopPrice: 'Rp 6 Jt - 22 Jt / m²',
      njopRangeDetail: 'Malioboro/Sudirman: Rp 18-22 Jt | Kotabaru/Kraton: Rp 9-15 Jt | Umbulharjo: Rp 6-9 Jt',
      njopRatio: '~65% - 85% dari harga pasar',
      tollAccessDesc: 'Akses 12-15 menit ke Exit Tol Trihanggo & Maguwo Ring Road',
      rtrwDesc: 'Zona Perkotaan Padat, Kawasan Cagar Budaya & Sentra Bisnis Komersial',
      yieldEst: '12% - 15% / tahun', occupancy: '88% - 94%',
      kdb: 'KDB 70% · Zona Pusat Kota & Bisnis',
      highlights: ['Kawasan Malioboro', 'Keraton Ngayogyakarta', 'Kotabaru & Tugu Jogja'],
      desc: 'Jantung denyut budaya dan pariwisata urban DIY. Keterbatasan lahan kosong menjadikan aset properti di sini bernilai likuiditas dan apresiasi kapital tertinggi.',
    },
    {
      _id: 'region-bantul', _type: 'yogyakartaRegion',
      regionId: 'bantul', name: 'Bantul',
      fullName: 'Kabupaten Bantul (Kawasan Seni & Budaya Kasihan-Sewon)',
      recommended: 'Rumah Modern Tropis, Villa Etnik & Guest House Seni',
      landPrice: 'Rp 3 Jt - 10 Jt / m²', njopPrice: 'Rp 1,5 Jt - 7,5 Jt / m²',
      njopRangeDetail: 'Banguntapan/Sewon: Rp 4-7,5 Jt | Bantul Kota: Rp 2,5-4,5 Jt | Pajangan/Sedayu: Rp 1,5-3 Jt | Pesisir: Rp 800 Rb-2 Jt',
      njopRatio: '~50% - 65% dari harga pasar',
      tollAccessDesc: '15-20 menit via Ring Road Selatan ke Exit Tol Gamping',
      rtrwDesc: 'Zona Industri Kreatif, Sentra Kriya Seni & Hunian Sub-Urban Hijau',
      yieldEst: '11% - 16% / tahun', occupancy: '82% - 89%',
      kdb: 'KDB 60% · Sentra Residensial Nyaman',
      highlights: ['Sentra Gerabah Kasongan', 'Kampus ISI Yogyakarta', 'Pantai Parangtritis'],
      desc: 'Lingkungan asri bernuansa seni dan budaya kreatif. Sangat diminati untuk cluster perumahan keluarga modern dan homestay pelancong seni mancanegara.',
    },
    {
      _id: 'region-gunungkidul', _type: 'yogyakartaRegion',
      regionId: 'gunungkidul', name: 'Gunungkidul',
      fullName: 'Kabupaten Gunungkidul (Kawasan Wisata Pesisir & Geopark)',
      recommended: 'Boutique Resort Tebing, Glamping & Villa Wisata Pantai',
      landPrice: 'Rp 900 Rb - 4,5 Jt / m²', njopPrice: 'Rp 450 Rb - 3 Jt / m²',
      njopRangeDetail: 'Kawasan Pantai JJLS: Rp 1,5-3 Jt | Wonosari Kota: Rp 1,8-3 Jt | Patuk: Rp 1-2,2 Jt | Lahan Kars: Rp 250-650 Rb',
      njopRatio: '~40% - 55% dari harga pasar',
      tollAccessDesc: 'Akses Jalur JJLS (Jalur Jalan Lintas Selatan) & Akses Prambanan-Gayamharjo',
      rtrwDesc: 'Zona Geopark UNESCO, Pariwisata Pantai Bahari & Kawasan Lindung Ekologis',
      yieldEst: '13% - 18% / tahun', occupancy: '72% - 85%',
      kdb: 'KDB 40% - 50% · Kawasan Konservasi & Wisata',
      highlights: ['Pantai Indrayanti & Baron', 'Goa Pindul', 'Wonosari Sentra Bisnis'],
      desc: 'Kawasan pesisir eksotis dengan pertumbuhan destinasi pariwisata alam tercepat di DIY. Potensi capital gain tanah jangka panjang yang sangat agresif.',
    },
    {
      _id: 'region-kulonprogo', _type: 'yogyakartaRegion',
      regionId: 'kulonprogo', name: 'Kulon Progo',
      fullName: 'Kabupaten Kulon Progo (Kawasan Aerotropolis YIA)',
      recommended: 'Hotel Transit Bandara, Guest House & Perumahan Baru',
      landPrice: 'Rp 1,8 Jt - 6,5 Jt / m²', njopPrice: 'Rp 850 Rb - 4,5 Jt / m²',
      njopRangeDetail: 'Aerotropolis Temon (YIA): Rp 2,5-4,5 Jt | Kota Wates: Rp 1,8-3,5 Jt | Nanggulan: Rp 1-2,5 Jt | Menoreh: Rp 450-900 Rb',
      njopRatio: '~45% - 60% dari harga pasar',
      tollAccessDesc: 'Titik Akhir Trase Tol Solo-Jogja-YIA & Jalur Kereta Cepat Bandara',
      rtrwDesc: 'Zona Aerotropolis Terpadu, Transportasi Intermoda & Pusat Pertumbuhan Baru',
      yieldEst: '12% - 16% / tahun', occupancy: '78% - 86%',
      kdb: 'KDB 50% - 60% · Koridor Infrastruktur Baru',
      highlights: ['Bandara YIA Glagah', 'Kota Wates', 'Perbukitan Menoreh'],
      desc: 'Pintu gerbang udara internasional DIY. Mengalami akselerasi pembangunan infrastruktur jalan tol bandara dan kawasan logistik aerotropolis.',
    },
  ];

  // ── 8. Testimonials ──────────────────────────────────────────────────────
  const testimonials = [
    {
      _id: 'testimonial-bambang', _type: 'testimonial',
      name: 'Ir. Bambang Hendrawan, M.M.',
      role: 'Pemilik Kos Eksklusif "D\'Kalyana"',
      propertyType: 'Homestay & Kos',
      rating: 5,
      featured: true,
      order: 1,
      quote: 'Lahan warisan keluarga 450 m² di Seturan yang dulunya menganggur, kini jadi aset produktif bernilai tinggi. JIC mendampingi dari studi tata ruang, izin PBG, hingga konstruksi tuntas 7 bulan. Okupansi mahasiswa & pekerja medis stabil 95% sejak bulan pertama.',
    },
    {
      _id: 'testimonial-cynthia', _type: 'testimonial',
      name: 'dr. Cynthia Praditya, Sp.A',
      role: 'Investor Properti & Dokter Spesialis',
      propertyType: 'Villa',
      rating: 5,
      featured: true,
      order: 2,
      quote: 'Sebagai investor yang berdomisili di Jakarta, kendala utama saya adalah pengawasan lapangan. Bersama JIC, laporan mingguan real-time dan transparansi RAB membuat saya sangat tenang. Villa privat 2 unit selesai tepat waktu dengan kualitas finishing hotel bintang 4.',
    },
    {
      _id: 'testimonial-hendra', _type: 'testimonial',
      name: 'Hendra Kusuma, S.E.',
      role: 'Pengusaha Logistik & Investor',
      propertyType: 'Homestay & Kos',
      rating: 5,
      featured: true,
      order: 3,
      quote: 'Perhitungan feasibility study dan analisis GIS JIC sangat presisi. Homestay 10 kamar berkonsep arsitektur tropis modern di pusat kota selalu full-booked saat akhir pekan dan musim liburan. BEP diproyeksikan lebih cepat dari perkiraan awal.',
    },
    {
      _id: 'testimonial-wicaksono', _type: 'testimonial',
      name: 'Raden Mas Wicaksono',
      role: 'Pemilik Lahan & Tokoh Komunitas',
      propertyType: 'Rumah',
      rating: 5,
      featured: false,
      order: 4,
      quote: 'Lahan 1.200 m² kami berhasil dikonsep menjadi private cluster 4 unit bergaya Indische Kontemporer. Pendampingan legalitas sertifikat pecah kavling dari tim JIC sangat rapi tanpa kendala birokrasi sama sekali.',
    },
    {
      _id: 'testimonial-anita', _type: 'testimonial',
      name: 'Anita Wijaya',
      role: 'Diaspora Investor (Singapura / Asal Jogja)',
      propertyType: 'Villa',
      rating: 5,
      featured: false,
      order: 5,
      quote: 'Investasi properti dari luar negeri tadinya terasa berisiko. Namun kontrak notariil JIC yang rigid serta sistem manajemen turn-key terbukti kredibel. Properti saya kini menghasilkan passive income konsisten tanpa perlu saya repot kelola harian.',
    },
  ];

  // ── 9. FAQs ──────────────────────────────────────────────────────────────
  const faqs = [
    {
      _id: 'faq-shm-waris', _type: 'faq',
      question: 'Apakah tanah dengan status SHM Waris atau belum pecah sertifikat bisa dikembangkan bersama JIC?',
      category: 'legalitas',
      order: 1,
      answer: [block('a1', 'Sangat bisa. Tim notariat dan legal Jogja Investor Club siap membantu audit yuridis terlebih dahulu. Kami memfasilitasi proses mediasi keluarga ahli waris, pengurusan fatwa waris, hingga pemecahan (splitzing) sertifikat di kantor BPN Sleman, Bantul, maupun Kota Yogyakarta secara resmi dan aman.')],
    },
    {
      _id: 'faq-pbg-rtrw', _type: 'faq',
      question: 'Bagaimana penanganan izin PBG (Persetujuan Bangunan Gedung) dan zonasi RTRW di Yogyakarta?',
      category: 'legalitas',
      order: 2,
      answer: [block('a2', 'Setiap kabupaten/kota di DIY memiliki regulasi RTRW dan batasan KDB (Koefisien Dasar Bangunan) yang spesifik. Melalui GIS Spatial Intelligence JIC, kami memverifikasi kesesuaian lahan sebelum desain dimulai. Seluruh proses permohonan PBG, dokumen lingkungan (SPPL/UKL-UPL), hingga Sertifikat Laik Fungsi (SLF) diurus turn-key oleh tim perizinan kami.')],
    },
    {
      _id: 'faq-roi-yield', _type: 'faq',
      question: 'Berapa proyeksi ROI dan yield tahunan untuk kos eksklusif atau villa di kawasan Jogja?',
      category: 'investasi',
      order: 3,
      answer: [block('a3', 'Berdasarkan data historis portofolio JIC di kawasan lingkar kampus (Seturan, Condongcatur, Jakal), kos eksklusif menghasilkan gross yield 14% - 19% per tahun dengan masa balik modal (BEP) rata-rata 4.5 hingga 6 tahun. Sedangkan untuk boutique villa di area wisata seperti Pakem atau Kaliurang, net rental margin mencapai 16% - 21% per tahun dengan okupansi rata-rata di atas 75%.')],
    },
    {
      _id: 'faq-manajemen-operasional', _type: 'faq',
      question: 'Apakah JIC menyediakan layanan manajemen operasional setelah bangunan selesai serah terima?',
      category: 'investasi',
      order: 4,
      answer: [block('a4', 'Ya. Kami menyediakan opsi Turn-Key Property Management. Anda dapat memilih mengelola properti secara mandiri, atau bermitra dengan divisi hospitality JIC untuk penanganan menyeluruh: listing di OTA (Airbnb, Booking.com, Mamikos), resepsionis, housekeeping, pembayaran utilitas, serta laporan keuangan bulanan transparan.')],
    },
    {
      _id: 'faq-qc-progres', _type: 'faq',
      question: 'Bagaimana sistem pengawasan kualitas bahan dan pelaporan progres pembangunan di lapangan?',
      category: 'proses',
      order: 5,
      answer: [block('a5', 'Kami menerapkan sistem pengawasan berlapis dengan Quality Control (QC) arsitek & struktur sipil bersertifikat. Klien menerima laporan progres berkala melalui grup koordinasi terdedikasi, mencakup checklist material SNI, foto resolusi tinggi mingguan, serta rekaman video drone 360° yang dapat diakses darimana saja.')],
    },
    {
      _id: 'faq-durasi-pembangunan', _type: 'faq',
      question: 'Berapa lama durasi pengerjaan dari survei lahan hingga bangunan siap beroperasi?',
      category: 'proses',
      order: 6,
      answer: [block('a6', 'Rata-rata proyek kos eksklusif 15–25 kamar membutuhkan waktu 6 hingga 8 bulan (termasuk fase perizinan PBG). Sedangkan pembangunan villa privat 1–2 unit berkisar 5 hingga 7 bulan. Setiap jadwal diikat dalam Surat Perjanjian Kerja (SPK) resmi di hadapan notaris dengan klausul garansi waktu dan retensi pemeliharaan 3–6 bulan pasca serah terima.')],
    },
    {
      _id: 'faq-keterbatasan-modal', _type: 'faq',
      question: 'Bagaimana jika saya memiliki tanah potensial namun keterbatasan dana untuk biaya bangun?',
      category: 'pembiayaan',
      order: 7,
      answer: [block('a7', 'JIC memiliki program JIC Private Investor Network. Kami dapat menjembatani pemilik lahan dengan investor pemodal pasif melalui skema Kerjasama Operasi (KSO) atau Joint Venture bagi hasil berpayung hukum PT/CV resmi. Kepemilikan tanah dasar tetap dijamin aman 100% atas nama pemilik lahan.')],
    },
    {
      _id: 'faq-biaya-konsultasi', _type: 'faq',
      question: 'Apakah konsultasi awal dan estimasi hitung potensi lahan dipungut biaya?',
      category: 'umum',
      order: 8,
      answer: [block('a8', 'Sama sekali TIDAK dipungut biaya (100% Gratis). Anda cukup mengisi formulir kalkulator tanah atau menghubungi WhatsApp Hotline kami. Tim kami akan menyiapkan ringkasan simulasi yield, estimasi anggaran kasar, serta kesesuaian arsitektur terbaik untuk lahan Anda.')],
    },
  ];

  // ── 10. Tim & Konsultan ──────────────────────────────────────────────────
  const teamMembers = [
    {
      _id: 'team-raditya', _type: 'teamMember',
      name: 'Ir. H. Raditya Daniswara, M.Sc., IAI',
      role: 'Principal Architect & Urban Planner',
      bio: 'Berpengalaman 16+ tahun dalam perencanaan tata ruang kota Yogyakarta, masterplan kawasan komersial vertikal, dan perizinan PBG/SLF di DIY.',
      expertise: ['Perencanaan Arsitektur Tropis', 'Tata Ruang & RTRW DIY', 'Audit KDB & PBG', 'Masterplan Kawasan'],
      whatsapp: '6282137000888',
      order: 1,
    },
    {
      _id: 'team-bambang', _type: 'teamMember',
      name: 'Bambang Trihatmojo, S.E., M.B.A., CFP',
      role: 'Lead Investment & Feasibility Analyst',
      bio: 'Praktisi investasi properti komersial eksklusif. Mengawasi studi kelayakan finansial (FS), kalkulasi NPV, IRR, dan strategi yield sewa jangka panjang.',
      expertise: ['Feasibility Study & ROI', 'Valuasi Aset Properti', 'Struktur Pembiayaan KSO', 'Analisis GIS Spatial'],
      whatsapp: '6282137000888',
      order: 2,
    },
    {
      _id: 'team-sekar', _type: 'teamMember',
      name: 'Sekar Kinanti, S.H., M.Kn.',
      role: 'Senior Legal & Notarial Advisor',
      bio: 'Spesialis hukum pertanahan agraria di D.I. Yogyakarta, mediasi ahli waris, pengurusan konversi hak tanah, dan perjanjian kerjasama investasi notariil.',
      expertise: ['Hukum Pertanahan Agraria', 'Mediasi SHM Waris', 'Perjanjian Notariil KSO', 'Legal Due Diligence'],
      whatsapp: '6282137000888',
      order: 3,
    },
    {
      _id: 'team-agung', _type: 'teamMember',
      name: 'Agung Prasetyo, S.T., IPM',
      role: 'Head of Construction & Structural Engineering',
      bio: 'Mengawal implementasi teknis konstruksi di lapangan, manajemen mutu material SNI, pengawasan jadwal SPK, dan sistem penjaminan retensi mutu.',
      expertise: ['Struktur Sipil Tahan Gempa', 'Quality Control Material SNI', 'Manajemen Konstruksi Turn-Key', 'Pengawasan SPK'],
      whatsapp: '6282137000888',
      order: 4,
    },
  ];

  // ── Upsert all documents ─────────────────────────────────────────────────
  console.log('\n📄  Writing documents...\n');

  const allDocs = [
    { doc: siteSettings, label: 'Site Settings' },
    { doc: hero, label: 'Hero Section' },
    ...propertyArchetypes.map((d) => ({ doc: d, label: `Property Archetype: ${d.title}` })),
    ...processSteps.map((d) => ({ doc: d, label: `Process Step ${d.number}: ${d.title}` })),
    ...projects.map((d) => ({ doc: d, label: `Project: ${d.title}` })),
    ...investmentClusters.map((d) => ({ doc: d, label: `Investment Cluster: ${d.title}` })),
    ...yogyakartaRegions.map((d) => ({ doc: d, label: `Region: ${d.name}` })),
    ...testimonials.map((d) => ({ doc: d, label: `Testimonial: ${d.name}` })),
    ...faqs.map((d) => ({ doc: d, label: `FAQ: ${d.question}` })),
    ...teamMembers.map((d) => ({ doc: d, label: `Team: ${d.name}` })),
  ];

  let created = 0, updated = 0;
  for (const { doc, label } of allDocs) {
    const alreadyExists = await exists(doc._id);
    await client.createOrReplace(doc as any);
    if (alreadyExists) { console.log(`  🔄  Updated — ${label}`); updated++; }
    else { console.log(`  ✅  Created — ${label}`); created++; }
  }

  console.log(`\n✨  Selesai! ${created} dibuat, ${updated} diupdate.`);
  console.log(`📝  Buka Studio: http://localhost:3002/studio\n`);
}

seed().catch((err) => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
