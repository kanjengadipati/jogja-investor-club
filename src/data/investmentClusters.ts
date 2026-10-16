/**
 * investmentClusters.ts
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH untuk semua cluster kawasan investasi JIC.
 *
 * Cara menambah cluster baru:
 *  1. Tambahkan entry baru di array INVESTMENT_CLUSTERS.
 *  2. targetRegions → ID kabupaten/kota (highlight polygon kab)
 *  3. hotspotKecamatanSlugs → slug kecamatan dari jogjaKecamatanGeoData.json
 *     (highlight presisi kecamatan-level di peta)
 *
 * Daftar slug kecamatan yang tersedia:
 *   Sleman: berbah, cangkringan, depok, gamping, godean, kalasan,
 *            minggir, mlati, moyudan, ngaglik, ngemplak, pakem,
 *            prambanan, seyegan, sleman, tempel, turi
 *   Kota:   danurejan, gedongtengen, gondokusuman, gondomanan, kotagede,
 *            kraton, mantrijeron, mergangsan, ngampilan, pakualaman,
 *            tegalrejo, umbulharjo, wirobrajan
 *   Bantul: bambanglipuro, banguntapan, bantul, dlingo, imogiri, jetis,
 *            kasihan, kretek, pajangan, pandak, piyungan, pleret,
 *            pundong, sanden, sedayu, sewon, srandakan
 *   Gunungkidul: gedangsari, girisubo, karangmojo, ngawen, nglipar,
 *            paliyan, panggang, patuk, playen, ponjong, purwosari,
 *            rongkop, saptosari, semanu, semin, tanjungsari, tepus, wonosari
 *   Kulonprogo: galur, girimulyo, kalibawang, kokap, lendah, nanggulan,
 *            panjatan, pengasih, samigaluh, sentolo, temon, wates
 * ─────────────────────────────────────────────────────────────
 */

export type RegionId = 'sleman' | 'kota' | 'bantul' | 'gunungkidul' | 'kulonprogo' | 'semua';

export interface InvestmentCluster {
  /** Unique ID cluster */
  id: string;
  /** Judul singkat */
  title: string;
  /** Sub-judul: area kunci */
  subtitle: string;
  /** Badge emoji + label */
  badge: string;
  /** Tipe properti paling cocok */
  bestFor: string;
  /** Label harga pasar ringkas */
  priceBadge: string;
  /**
   * Kabupaten/kota yang di-highlight (level makro).
   * Bisa lebih dari satu untuk cluster lintas kab/kota.
   */
  targetRegions: RegionId[];
  /**
   * Kecamatan yang di-highlight secara presisi (level mikro).
   * Gunakan slug dari daftar di atas. Kosongkan [] untuk hanya highlight kab-level.
   */
  hotspotKecamatanSlugs: string[];
  /** Nama panjang untuk kalkulator / analitik */
  fullName: string;
  /** Deskripsi detail untuk panel info */
  description: string;
  /** Range harga pasar transaksi */
  priceRange: string;
  /** Range NJOP resmi PBB-P2 */
  njopPrice: string;
  /** Estimasi pertumbuhan harga/tahun */
  growthRate: string;
  /** Estimasi ROI/tahun */
  roi: string;
}

// ─────────────────────────────────────────────────────────────
// DATA CLUSTER — Edit di sini untuk menambah/mengubah kawasan
// ─────────────────────────────────────────────────────────────

export const INVESTMENT_CLUSTERS: InvestmentCluster[] = [
  // 0. SEMUA KAWASAN DIY
  {
    id: 'semua',
    title: 'Semua Kawasan DIY',
    subtitle: 'Lihat seluruh 5 kabupaten/kota',
    badge: '🗺️ Comprehensive',
    bestFor: 'Portfolio Diversifikasi',
    priceBadge: 'Pasar Rp 1,5 - 25 jt/m²',
    targetRegions: ['semua'],
    hotspotKecamatanSlugs: [],
    fullName: 'Daerah Istimewa Yogyakarta (Seluruh Kawasan)',
    description: 'Mencakup 5 kabupaten/kota dengan beragam karakteristik investasi dari perkotaan, koridor universitas, hingga kawasan pariwisata heritage dan bahari.',
    priceRange: 'Rp 2,5 - 18 jt/m²',
    njopPrice: 'Rp 450 Rb - 22 Jt/m²',
    growthRate: '+8% - 15%',
    roi: '8% - 14% / tahun',
  },

  // 1. KAWASAN KAMPUS
  // Hotspot: Depok & Ngaglik (UGM/UNY/UPN/UII), Gondokusuman & Umbulharjo (UAJY, UAD), Kasihan (UMY)
  {
    id: 'kampus',
    title: 'Kawasan Kampus',
    subtitle: 'UGM, UNY, Seturan, UPN, UII, UMY',
    badge: '🔥 Hot Demand',
    bestFor: 'Kost Eksklusif & Co-Living',
    priceBadge: 'Pasar Rp 5,5 - 16 jt/m²',
    targetRegions: ['sleman', 'kota', 'bantul'],
    hotspotKecamatanSlugs: ['depok', 'ngaglik', 'mlati', 'ngemplak', 'gondokusuman', 'umbulharjo', 'tegalrejo', 'kasihan'],
    fullName: 'Kawasan Kampus & Pelajar (Sleman, Kota Jogja & Bantul Utara)',
    description: 'Didukung 300.000+ mahasiswa aktif. Sleman: Depok (Seturan, Caturtunggal, Babarsari), Ngaglik (Jakal, UII), Mlati (UTY). Kota: Gondokusuman (UKDW, UAJY), Umbulharjo (UAD). Bantul: Kasihan (UMY, Alma Ata, ISI). Kawasan dengan occupancy kos 95%+ sepanjang tahun.',
    priceRange: 'Rp 5,5 - 16 jt/m²',
    njopPrice: 'Rp 3,5 - 14 jt/m²',
    growthRate: '+11% - 16%',
    roi: '12% - 18% / tahun',
  },

  // 2. KAWASAN WISATA & STAYCATION
  // Hotspot: Kraton/Gedongtengen (Malioboro), Bantul pesisir, Pakem/Turi (Kaliurang), Dlingo & Patuk
  {
    id: 'wisata',
    title: 'Kawasan Wisata & Staycation',
    subtitle: 'Malioboro, Parangtritis, Kaliurang, Mangunan',
    badge: '🏖️ High Yield',
    bestFor: 'Villa & Boutique Homestay',
    priceBadge: 'Pasar Rp 4,0 - 16 jt/m²',
    targetRegions: ['bantul', 'kota', 'sleman', 'gunungkidul'],
    hotspotKecamatanSlugs: [
      'kraton', 'gedongtengen', 'gondomanan', 'mergangsan', 'mantrijeron', // Malioboro, Prawirotaman, Tugu
      'pakem', 'turi', 'cangkringan', 'prambanan',                         // Kaliurang, Merapi, Candi Prambanan
      'kretek', 'sanden', 'bambanglipuro', 'dlingo',                       // Parangtritis, Samas, Hutan Pinus Mangunan
      'patuk',                                                              // HeHa Sky View & Bukit Bintang
    ],
    fullName: 'Kawasan Wisata & Staycation (Bantul, Kota Jogja, Sleman & Gunungkidul)',
    description: 'Koridor 7.2+ juta wisatawan/tahun. Malioboro (Kraton, Gedongtengen, Gondomanan), Prawirotaman (Mergangsan, Mantrijeron), Kaliurang (Pakem, Turi), Dlingo (Mangunan glamping), Patuk (HeHa Sky View), dan Parangtritis (Kretek). Potensial villa sewa harian dan homestay estetik.',
    priceRange: 'Rp 4,0 - 16 jt/m²',
    njopPrice: 'Rp 1,5 - 7,5 jt/m²',
    growthRate: '+10% - 14%',
    roi: '14% - 22% / tahun',
  },

  // 3. KAWASAN PREMIUM KOTA
  // Hotspot: Gondokusuman, Umbulharjo, Mlati (RRU)
  {
    id: 'premium',
    title: 'Kawasan Premium Kota',
    subtitle: 'Kotabaru, Ring Road Utara, Elit Pusat',
    badge: '💎 Prime Capital',
    bestFor: 'Luxury Townhouse & Komersial',
    priceBadge: 'Pasar Rp 9,0 - 25 jt/m²',
    targetRegions: ['kota', 'sleman'],
    hotspotKecamatanSlugs: [
      'gondokusuman', 'umbulharjo', 'pakualaman',  // Kota: Kotabaru, Gondokusuman, premium
      'mlati', 'gamping', 'godean',                // Sleman Tengah: Ring Road Utara
    ],
    fullName: 'Kota Yogyakarta & Sleman Tengah (Kawasan Premium)',
    description: 'Aksesibilitas terbaik dan fasilitas terlengkap. Gondokusuman (Kotabaru heritage), Umbulharjo (bisnis modern), Pakualaman (elite heritage), Mlati & Gamping (Ring Road Utara hunian premium). Likuiditas aset tertinggi.',
    priceRange: 'Rp 9,0 - 25 jt/m²',
    njopPrice: 'Rp 6,0 - 22 jt/m²',
    growthRate: '+12% - 18%',
    roi: '9% - 13% / tahun',
  },

  // 4. KORIDOR PERTUMBUHAN & TOL
  // Hotspot: Seluruh koridor trase tol Solo-Jogja-YIA & Tol Bawen + Aerotropolis YIA
  {
    id: 'pertumbuhan',
    title: 'Kawasan Pertumbuhan & Tol',
    subtitle: 'Kulon Progo YIA, Sleman & Koridor Tol',
    badge: '🚀 High Growth',
    bestFor: 'Land Banking & Ruko Transit',
    priceBadge: 'Pasar Rp 1,8 - 6,5 jt/m²',
    targetRegions: ['kulonprogo', 'sleman', 'bantul'],
    hotspotKecamatanSlugs: [
      // Kulon Progo: Bandara YIA & Koridor Trase Tol YIA
      'temon', 'wates', 'pengasih', 'sentolo', 'nanggulan', 'panjatan', 'kokap', 'lendah',
      // Bantul: Seksi 3 Trase Tol & Arteri YIA
      'sedayu',
      // Sleman: Trase Tol Solo-Jogja & Tol Bawen + Exit Tol Utama
      'gamping', 'mlati', 'seyegan', 'tempel', 'kalasan', 'depok', 'ngemplak', 'godean', 'moyudan', 'minggir',
    ],
    fullName: 'Koridor Tol Solo-Jogja-YIA & Aerotropolis Bandara (Kulon Progo, Sleman, Bantul)',
    description: 'Pertumbuhan pesat terdorong Bandara Internasional YIA dan mega-proyek Tol Solo-Jogja-YIA & Tol Bawen. Mencakup seluruh koridor exit tol & simpul pertumbuhan: Temon, Wates, Pengasih, Sentolo, Sedayu, Gamping, Mlati, Seyegan, Tempel, Kalasan, hingga Depok.',
    priceRange: 'Rp 1,8 - 6,5 jt/m²',
    njopPrice: 'Rp 850 Rb - 4,5 jt/m²',
    growthRate: '+14% - 20%',
    roi: '9% - 15% / tahun',
  },

  // 5. ECO & WELLNESS (Sleman Utara)
  {
    id: 'eco-wellness',
    title: 'Kawasan Eco & Wellness',
    subtitle: 'Pakem, Cangkringan, Lereng Merapi',
    badge: '🌿 Eco Living',
    bestFor: 'Resort Villa & Glamping Cafe',
    priceBadge: 'Pasar Rp 2,0 - 6,0 jt/m²',
    targetRegions: ['sleman'],
    hotspotKecamatanSlugs: ['pakem', 'cangkringan', 'turi', 'ngemplak', 'tempel'],
    fullName: 'Sleman Utara (Kawasan Wisata Alam & Wellness Retreat)',
    description: 'Udara sejuk lereng Merapi, view alam terbuka, air melimpah. Pakem (Kaliurang, Bumi Perkemahan), Cangkringan (Kaliadem, lava tour), Turi (agrowisata salak), Ngemplak (Besi, resort eco). Primadona: wellness villa, healing resort, glamping café.',
    priceRange: 'Rp 2,0 - 6,0 jt/m²',
    njopPrice: 'Rp 1,2 - 4,0 jt/m²',
    growthRate: '+10% - 15%',
    roi: '11% - 17% / tahun',
  },

  // 6. HERITAGE & SENI (Kota Selatan + Bantul Utara)
  {
    id: 'heritage-art',
    title: 'Kawasan Heritage & Seni',
    subtitle: 'Kotagede, Prawirotaman, Kasihan',
    badge: '🏛️ Art & Culture',
    bestFor: 'Boutique Guesthouse & Galeri',
    priceBadge: 'Pasar Rp 3,5 - 9,5 jt/m²',
    targetRegions: ['kota', 'bantul'],
    hotspotKecamatanSlugs: [
      'kotagede', 'umbulharjo', 'mergangsan', 'kraton', 'ngampilan', // Kota: Kotagede perak, Prawirotaman, sentra batik
      'kasihan', 'sewon', 'banguntapan', 'imogiri',                  // Bantul: ISI Jogja, Kasongan, batik Imogiri
    ],
    fullName: 'Kota Jogja Selatan & Bantul Utara (Heritage & Seni)',
    description: 'Pusat komunitas ekspatriat, desainer, dan seniman internasional. Kotagede (kerajinan perak), Prawirotaman (galeri & guest house), Kasihan & Sewon (kampus ISI, kriya), Banguntapan (perumahan premium selatan). Sangat diminati turis mancanegara.',
    priceRange: 'Rp 3,5 - 9,5 jt/m²',
    njopPrice: 'Rp 1,5 - 7,5 jt/m²',
    growthRate: '+9% - 14%',
    roi: '12% - 16% / tahun',
  },

  // 7. PESISIR SELATAN & GEOPARK (Gunungkidul + Bantul Pantai)
  {
    id: 'pesisir',
    title: 'Pesisir Selatan & Geopark',
    subtitle: 'Gunungkidul, Parangtritis, JJLS',
    badge: '🌊 Ocean View',
    bestFor: 'Boutique Resort & Glamping',
    priceBadge: 'Pasar Rp 900 Rb - 4,5 jt/m²',
    targetRegions: ['gunungkidul', 'bantul'],
    hotspotKecamatanSlugs: [
      // Pesisir Gunungkidul: Jalur Pantai & JJLS Lengkap (tanpa terputus)
      'purwosari', 'panggang', 'saptosari', 'tanjungsari', 'tepus', 'girisubo', 'rongkop',
      // Pesisir Bantul: Parangtritis hingga Jembatan Pandansimo JJLS
      'kretek', 'sanden', 'srandakan', 'bambanglipuro',
    ],
    fullName: 'Pesisir DIY Selatan (Gunungkidul & Bantul Pantai)',
    description: 'Kawasan pesisir eksotis tumbuh tercepat di DIY. Purwosari (Parangendog), Panggang (HeHa Ocean View, Pantai Gesing), Saptosari (Ngrenehan, Ngobaran), Tanjungsari (Baron, Kukup), Tepus (Indrayanti, Timang), Girisubo (Sadeng, Wediombo) + Parangtritis & Samas (Bantul). Capital gain agresif via JJLS.',
    priceRange: 'Rp 900 Rb - 4,5 jt/m²',
    njopPrice: 'Rp 450 Rb - 3 jt/m²',
    growthRate: '+12% - 18%',
    roi: '13% - 19% / tahun',
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/** Get cluster by ID */
export function getClusterById(id: string): InvestmentCluster | undefined {
  return INVESTMENT_CLUSTERS.find((c) => c.id === id);
}

/** Kembalikan array region ID (kab-level) untuk highlight di peta */
export function getHighlightRegions(clusterId: string): RegionId[] {
  return getClusterById(clusterId)?.targetRegions ?? ['semua'];
}

/** Kembalikan array kecamatan slug untuk highlight presisi di peta */
export function getHighlightKecamatan(clusterId: string): string[] {
  return getClusterById(clusterId)?.hotspotKecamatanSlugs ?? [];
}
