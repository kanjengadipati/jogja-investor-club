/**
 * investmentClusters.ts
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH untuk semua cluster kawasan investasi JIC.
 *
 * Cara menambah cluster baru:
 *  1. Tambahkan entry baru di array INVESTMENT_CLUSTERS di bawah.
 *  2. Isi `targetRegions` dengan ID wilayah dari YOGYAKARTA_REGIONS:
 *     'sleman' | 'kota' | 'bantul' | 'gunungkidul' | 'kulonprogo'
 *     Boleh lebih dari satu (lintas kab/kota).
 *  3. Tidak perlu menyentuh file komponen sama sekali.
 * ─────────────────────────────────────────────────────────────
 */

export type RegionId = 'sleman' | 'kota' | 'bantul' | 'gunungkidul' | 'kulonprogo' | 'semua';

export interface InvestmentCluster {
  /** Unique ID cluster, digunakan sebagai key state */
  id: string;
  /** Judul singkat cluster */
  title: string;
  /** Sub-judul: lokasi spesifik / kecamatan kunci */
  subtitle: string;
  /** Badge emoji + label, tampil di card list */
  badge: string;
  /** Tipe properti yang paling cocok */
  bestFor: string;
  /** Label harga pasar ringkas */
  priceBadge: string;
  /**
   * Region ID yang akan di-highlight di peta ketika cluster ini aktif.
   * Bisa lebih dari satu untuk cluster lintas kab/kota.
   */
  targetRegions: RegionId[];
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
  /** Kecamatan/kelurahan prioritas (opsional, untuk detail mikro) */
  hotspotDistricts?: string[];
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
    fullName: 'Daerah Istimewa Yogyakarta (Seluruh Kawasan)',
    description: 'Mencakup 5 kabupaten/kota dengan beragam karakteristik investasi dari perkotaan, koridor universitas, hingga kawasan pariwisata heritage dan bahari.',
    priceRange: 'Rp 2,5 - 18 jt/m²',
    njopPrice: 'Rp 450 Rb - 22 Jt/m²',
    growthRate: '+8% - 15%',
    roi: '8% - 14% / tahun',
  },

  // 1. KAWASAN KAMPUS (Sleman + Kota Jogja)
  {
    id: 'kampus',
    title: 'Kawasan Kampus',
    subtitle: 'UGM, UNY, Seturan, UPN, UII',
    badge: '🔥 Hot Demand',
    bestFor: 'Kost Eksklusif & Co-Living',
    priceBadge: 'Pasar Rp 5,5 - 16 jt/m²',
    targetRegions: ['sleman', 'kota'],
    fullName: 'Kawasan Kampus & Pelajar (Sleman & Kota Jogja)',
    description: 'Didukung 300.000+ mahasiswa aktif di UGM, UNY, UPN, UII, Atma Jaya. Zona utama: Depok, Caturtunggal, Seturan (Sleman) + Gondokusuman, Terban (Kota Jogja). Target utama kost eksklusif dan co-living premium.',
    priceRange: 'Rp 5,5 - 16 jt/m²',
    njopPrice: 'Rp 3,5 - 14 jt/m²',
    growthRate: '+11% - 16%',
    roi: '12% - 18% / tahun',
    hotspotDistricts: ['Depok', 'Caturtunggal', 'Seturan', 'Babarsari', 'Gondokusuman', 'Terban'],
  },

  // 2. KAWASAN WISATA & STAYCATION (Bantul + Kota + Sleman)
  {
    id: 'wisata',
    title: 'Kawasan Wisata & Staycation',
    subtitle: 'Malioboro, Parangtritis, Kaliurang',
    badge: '🏖️ High Yield',
    bestFor: 'Villa & Boutique Homestay',
    priceBadge: 'Pasar Rp 4,0 - 16 jt/m²',
    targetRegions: ['bantul', 'kota', 'sleman'],
    fullName: 'Kawasan Wisata & Budaya (Bantul, Kota Jogja, Sleman Utara)',
    description: 'Koridor 7.2+ juta wisatawan/tahun. Zona utama: Parangtritis & Sanden (Bantul), Malioboro/Prawirotaman (Kota Jogja), Kaliurang & Pakem (Sleman Utara). Potensial untuk villa sewa harian dan homestay estetik.',
    priceRange: 'Rp 4,0 - 16 jt/m²',
    njopPrice: 'Rp 1,5 - 7,5 jt/m²',
    growthRate: '+10% - 14%',
    roi: '14% - 22% / tahun',
    hotspotDistricts: ['Parangtritis', 'Kretek', 'Prawirotaman', 'Malioboro', 'Kaliurang', 'Pakem'],
  },

  // 3. KAWASAN PREMIUM KOTA (Kota + Sleman Tengah)
  {
    id: 'premium',
    title: 'Kawasan Premium Kota',
    subtitle: 'Kotabaru, Ring Road Utara, Elit Pusat',
    badge: '💎 Prime Capital',
    bestFor: 'Luxury Townhouse & Komersial',
    priceBadge: 'Pasar Rp 9,0 - 25 jt/m²',
    targetRegions: ['kota', 'sleman'],
    fullName: 'Kota Yogyakarta & Sleman Tengah (Kawasan Premium)',
    description: 'Aksesibilitas terbaik dan fasilitas kota terlengkap. Zona utama: Kotabaru, Gondokusuman (Kota Jogja) + Mlati, Gamping, Nogotirto (Sleman Tengah/Barat). Nilai apresiasi dan likuiditas aset tertinggi.',
    priceRange: 'Rp 9,0 - 25 jt/m²',
    njopPrice: 'Rp 6,0 - 22 jt/m²',
    growthRate: '+12% - 18%',
    roi: '9% - 13% / tahun',
    hotspotDistricts: ['Kotabaru', 'Gondokusuman', 'Mlati', 'Gamping', 'Nogotirto'],
  },

  // 4. KORIDOR PERTUMBUHAN & TOL (Kulon Progo + Sleman Barat)
  {
    id: 'pertumbuhan',
    title: 'Kawasan Pertumbuhan & Tol',
    subtitle: 'Kulon Progo YIA, Sleman Barat',
    badge: '🚀 High Growth',
    bestFor: 'Land Banking & Ruko Transit',
    priceBadge: 'Pasar Rp 1,8 - 6,5 jt/m²',
    targetRegions: ['kulonprogo', 'sleman'],
    fullName: 'Koridor Tol YIA (Kulon Progo & Sleman Barat)',
    description: 'Pertumbuhan pesat terdorong Bandara YIA dan trase tol baru Solo-Jogja-YIA. Zona utama: Temon, Sentolo (Kulon Progo) + Gamping, Trihanggo (Sleman Barat). Harga lahan masuk sangat atraktif, momentum land banking terbaik.',
    priceRange: 'Rp 1,8 - 6,5 jt/m²',
    njopPrice: 'Rp 850 Rb - 4,5 jt/m²',
    growthRate: '+14% - 20%',
    roi: '9% - 15% / tahun',
    hotspotDistricts: ['Temon', 'Sentolo', 'Gamping', 'Trihanggo', 'Kalibawang'],
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
    fullName: 'Sleman Utara (Kawasan Wisata Alam & Wellness Retreat)',
    description: 'Udara sejuk lereng Merapi, view alam terbuka, air melimpah. Zona utama: Pakem, Cangkringan, Turi, Ngemplak (Sleman Utara). Primadona baru: wellness living, healing villa, resort eco, dan café alam.',
    priceRange: 'Rp 2,0 - 6,0 jt/m²',
    njopPrice: 'Rp 1,2 - 4,0 jt/m²',
    growthRate: '+10% - 15%',
    roi: '11% - 17% / tahun',
    hotspotDistricts: ['Pakem', 'Cangkringan', 'Turi', 'Ngemplak', 'Kaliurang'],
  },

  // 6. HERITAGE & SENI (Kota Jogja + Bantul Utara)
  {
    id: 'heritage-art',
    title: 'Kawasan Heritage & Seni',
    subtitle: 'Kotagede, Prawirotaman, Kasihan',
    badge: '🏛️ Art & Culture',
    bestFor: 'Boutique Guesthouse & Galeri',
    priceBadge: 'Pasar Rp 3,5 - 9,5 jt/m²',
    targetRegions: ['kota', 'bantul'],
    fullName: 'Kota Jogja Selatan & Bantul Utara (Heritage & Seni)',
    description: 'Pusat komunitas ekspatriat, desainer, dan seniman internasional. Zona utama: Kotagede, Prawirotaman (Kota Jogja) + Kasihan, Sewon, ISI (Bantul Utara). Sangat diminati turis mancanegara untuk guest house etnik Jawa modern.',
    priceRange: 'Rp 3,5 - 9,5 jt/m²',
    njopPrice: 'Rp 1,5 - 7,5 jt/m²',
    growthRate: '+9% - 14%',
    roi: '12% - 16% / tahun',
    hotspotDistricts: ['Kotagede', 'Prawirotaman', 'Kasihan', 'Sewon', 'Banguntapan'],
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
    fullName: 'Pesisir DIY Selatan (Gunungkidul & Bantul Pantai)',
    description: 'Kawasan pesisir eksotis dengan destinasi pariwisata pantai tumbuh tercepat di DIY. Zona utama: Indrayanti, Baron, Siung (Gunungkidul) + Parangtritis, Samas (Bantul pesisir). Capital gain agresif dengan demand wisatawan naik via JJLS.',
    priceRange: 'Rp 900 Rb - 4,5 jt/m²',
    njopPrice: 'Rp 450 Rb - 3 jt/m²',
    growthRate: '+12% - 18%',
    roi: '13% - 19% / tahun',
    hotspotDistricts: ['Tepus', 'Tanjungsari', 'Saptosari', 'Parangtritis', 'Samas'],
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/** Get cluster by ID */
export function getClusterById(id: string): InvestmentCluster | undefined {
  return INVESTMENT_CLUSTERS.find((c) => c.id === id);
}

/**
 * Kembalikan array region ID yang perlu di-highlight untuk cluster aktif.
 * Mengembalikan ['semua'] bila cluster tidak ditemukan.
 */
export function getHighlightRegions(clusterId: string): RegionId[] {
  return getClusterById(clusterId)?.targetRegions ?? ['semua'];
}
