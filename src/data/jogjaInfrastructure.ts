// Data Geospasial Infrastruktur Strategis & POI Investasi D.I. Yogyakarta

export interface TollExit {
  id: string;
  name: string;
  tollName: string;
  lat: number;
  lng: number;
  status: 'Operasional' | 'Konstruksi' | 'Rencana';
  impactZone: string; // misal: "Akses Cepat UGM, Kaliurang, Condongcatur"
  completion: string;
}

export interface TollRoute {
  id: string;
  name: string;
  color: string;
  status: string;
  path: [number, number][];
}

export interface InvestmentPOI {
  id: string;
  name: string;
  category: 'kampus' | 'kesehatan' | 'transport' | 'wisata';
  lat: number;
  lng: number;
  badge: string;
  catchmentRadius: number; // in meters (for drawing circle)
  detail: string;
}

// Rute Perkiraan Trase Tol Utama di DIY
export const TOLL_ROUTES: TollRoute[] = [
  {
    id: 'tol-jogja-solo',
    name: 'Jalan Tol Solo - Yogyakarta - YIA Kulon Progo (Seksi 1 & 2)',
    color: '#eab308', // Amber
    status: 'Sebagian Beroperasi & Konstruksi Aktif',
    path: [
      [-7.6000, 110.7200], // Arah Kartasura
      [-7.6500, 110.6000], // Klaten
      [-7.7300, 110.4900], // Prambanan
      [-7.7600, 110.4500], // Purwomartani (Kalasan)
      [-7.7550, 110.4100], // Maguwoharjo
      [-7.7500, 110.3700], // Monjali Ringroad Utara
      [-7.7450, 110.3350], // Junction Sleman (Tirtoadi/Mlati)
    ],
  },
  {
    id: 'tol-jogja-bawen',
    name: 'Jalan Tol Yogyakarta - Bawen (Menghubungkan Semarang)',
    color: '#38bdf8', // Light Blue
    status: 'Tahap Konstruksi Seksi 1 Sleman-Banyurejo',
    path: [
      [-7.7450, 110.3350], // Junction Sleman
      [-7.6950, 110.3050], // Seyegan
      [-7.6500, 110.2800], // Banyurejo / Tempel
      [-7.5800, 110.2600], // Salam / Muntilan Jateng
    ],
  },
  {
    id: 'tol-jogja-yia',
    name: 'Jalan Tol Yogyakarta - Bandara YIA Kulon Progo (Seksi 3)',
    color: '#34d399', // Emerald
    status: 'Penetapan Lokasi & Pembebasan Lahan',
    path: [
      [-7.7450, 110.3350], // Junction Sleman
      [-7.7850, 110.3200], // Trihanggo / Gamping
      [-7.8100, 110.2800], // Sedayu
      [-7.8400, 110.2200], // Sentolo Kulon Progo
      [-7.8650, 110.1550], // Pengasih / Wates
      [-7.9000, 110.0600], // Exit Bandara YIA
    ],
  },
];

// Titik Gerbang / Exit Tol Strategis di DIY
export const TOLL_EXITS: TollExit[] = [
  {
    id: 'exit-purwomartani',
    name: 'Exit Tol Purwomartani (Kalasan)',
    tollName: 'Tol Jogja-Solo',
    lat: -7.7620,
    lng: 110.4520,
    status: 'Konstruksi',
    impactZone: 'Akses Ringroad Timur, Bandara Adisutjipto, Tajem & Candi Prambanan',
    completion: '2025/2026',
  },
  {
    id: 'exit-maguwo',
    name: 'Exit Tol Maguwo / UPN',
    tollName: 'Tol Jogja-Solo',
    lat: -7.7560,
    lng: 110.4120,
    status: 'Konstruksi',
    impactZone: 'Akses langsung kawasan kost favorit Seturan, UPN, Babarsari & Pakuwon Mall',
    completion: '2026',
  },
  {
    id: 'exit-monjali',
    name: 'Exit Tol Monjali (Ring Road Utara)',
    tollName: 'Tol Jogja-Solo',
    lat: -7.7510,
    lng: 110.3710,
    status: 'Konstruksi',
    impactZone: 'Pusat Kawasan Kampus UGM, UNY & Koridor Kuliner Jl. Kaliurang',
    completion: '2026',
  },
  {
    id: 'exit-trihanggo',
    name: 'Exit Tol Trihanggo / Gamping',
    tollName: 'Tol Jogja-Bawen / YIA',
    lat: -7.7650,
    lng: 110.3320,
    status: 'Konstruksi',
    impactZone: 'Akses Ringroad Barat, Kampus UNISA, UMY & RS Queen Latifa',
    completion: '2025/2026',
  },
  {
    id: 'exit-banyurejo',
    name: 'Exit Tol Banyurejo (Tempel)',
    tollName: 'Tol Jogja-Bawen',
    lat: -7.6550,
    lng: 110.2820,
    status: 'Konstruksi',
    impactZone: 'Koneksi Sleman Utara, Muntilan & Candi Borobudur',
    completion: '2026',
  },
  {
    id: 'exit-yia',
    name: 'Exit Tol Bandara YIA (Kulon Progo)',
    tollName: 'Tol Jogja-YIA',
    lat: -7.8980,
    lng: 110.0650,
    status: 'Rencana',
    impactZone: 'Zona Aerotropolis, Hotel Transit & Kawasan Logistik Bandara',
    completion: '2027',
  },
];

// Titik POI Magnet Investasi Properti di DIY
export const INVESTMENT_POIS: InvestmentPOI[] = [
  // Kampus
  {
    id: 'ugm',
    name: 'Universitas Gadjah Mada (UGM)',
    category: 'kampus',
    lat: -7.7712,
    lng: 110.3778,
    badge: '55.000+ Mahasiswa',
    catchmentRadius: 3000,
    detail: 'Pusat captive market kos eksklusif dan hunian sewa nomor 1 di Indonesia.',
  },
  {
    id: 'uny',
    name: 'Universitas Negeri Yogyakarta (UNY)',
    category: 'kampus',
    lat: -7.7766,
    lng: 110.3860,
    badge: '34.000+ Mahasiswa',
    catchmentRadius: 2500,
    detail: 'Permintaan sewa stabil di koridor Gejayan & Karangmalang.',
  },
  {
    id: 'upn',
    name: 'UPN Veteran & Koridor Seturan',
    category: 'kampus',
    lat: -7.7621,
    lng: 110.4091,
    badge: 'Epicenter Kos Eksklusif',
    catchmentRadius: 2500,
    detail: 'Kawasan gaya hidup mahasiswa dengan tarif sewa kos tertinggi di DIY (Rp 1.8 - 3.5 jt/bln).',
  },
  {
    id: 'uii',
    name: 'Universitas Islam Indonesia (UII Pusat)',
    category: 'kampus',
    lat: -7.6877,
    lng: 110.4144,
    badge: '30.000+ Mahasiswa',
    catchmentRadius: 3000,
    detail: 'Pertumbuhan kos dan townhouse agresif di koridor Jl. Kaliurang km 14.',
  },
  {
    id: 'umy',
    name: 'Universitas Muhammadiyah Yogyakarta (UMY)',
    category: 'kampus',
    lat: -7.8105,
    lng: 110.3242,
    badge: '28.000+ Mahasiswa',
    catchmentRadius: 2800,
    detail: 'Magnet investasi kos terbesar di Bantul Barat / Ringroad Selatan.',
  },

  // Layanan Kesehatan & RS Rujukan
  {
    id: 'sardjito',
    name: 'RSUP Dr. Sardjito',
    category: 'kesehatan',
    lat: -7.7685,
    lng: 110.3738,
    badge: 'RS Rujukan Nasional',
    catchmentRadius: 2000,
    detail: 'Kebutuhan tinggi hunian dokter residen, perawat, dan keluarga pasien.',
  },
  {
    id: 'jih',
    name: 'Jogja International Hospital (JIH)',
    category: 'kesehatan',
    lat: -7.7592,
    lng: 110.4002,
    badge: 'RS Premium Ring Road',
    catchmentRadius: 2000,
    detail: 'Kawasan prestisius di Ringroad Utara, dekat Condongcatur.',
  },

  // Transportasi & Wisata
  {
    id: 'yia-airport',
    name: 'Yogyakarta International Airport (YIA)',
    category: 'transport',
    lat: -7.9000,
    lng: 110.0570,
    badge: 'Bandara Internasional',
    catchmentRadius: 5000,
    detail: 'Gerbang masuk turis mancanegara & domestik. Prospek hotel transit & pergudangan.',
  },
  {
    id: 'tugu-station',
    name: 'Stasiun Kereta Tugu & Malioboro',
    category: 'transport',
    lat: -7.7892,
    lng: 110.3638,
    badge: 'Jantung Urban Heritage',
    catchmentRadius: 2000,
    detail: 'Kawasan okupansi homestay dan hotel transit tertinggi di DIY.',
  },
  {
    id: 'kaliurang',
    name: 'Kawasan Wisata Lereng Kaliurang',
    category: 'wisata',
    lat: -7.5960,
    lng: 110.4260,
    badge: 'Resort & Villa Sejuk',
    catchmentRadius: 4000,
    detail: 'Destinasi staycation sejuk keluarga dengan rate villa sewa Rp 1.5 - 4 jt per malam.',
  },
];
