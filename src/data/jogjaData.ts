import {
  PropertyArchetype,
  TargetClient,
  JogjaZone,
  HotLeadSource,
  MarketingStrategyTier,
  FunnelStep,
  ContentCategory,
  ProjectCaseStudy,
} from '../types/property';

export const JOGJA_IMAGES = {
  heroLandscape: '/images/hero_jogja_landscape_1792108229283.jpg',
  rumah: '/images/arch_jogja_rumah_1792108230130.jpg',
  villa: '/images/arch_jogja_villa_1792108231919.jpg',
  kos: '/images/arch_jogja_kos_1792108231318.jpg',
  heritage: '/images/jogja_heritage_tugu_prambanan_1792109052483.jpg',
};

export const PROPERTY_ARCHETYPES: PropertyArchetype[] = [
  {
    id: 'rumah',
    title: 'RUMAH',
    subtitle: 'Nyaman untuk Keluarga',
    tagline: 'Hunian Tropis Modern Bernilai Warisan & Kenyamanan Maksimal',
    description:
      'Wujudkan rumah tinggal impian keluarga di Yogyakarta dengan tata ruang optimal, sirkulasi udara alami khas tropis, material berkualitas tinggi, dan garansi konstruksi tepat waktu.',
    image: JOGJA_IMAGES.rumah,
    specs: {
      minLandArea: 100,
      avgBuildDurationMonths: 6,
      estimatedCostPerM2: 4500000,
      typicalYieldPercent: 'Apresiasi Tanah 10-15%/thn',
      targetSegment: 'Keluarga Baru & Pensiun Tenang di Jogja',
    },
    features: [
      'Desain arsitektur modern tropis disesuaikan karakter tanah & iklim Jogja',
      'Pencahayaan alami dan efisiensi energi terpadu',
      'Pondasi & struktur tahan gempa berstandar SNI',
      'Itemized RAB transparan hingga detail material finishing',
      'Pengurusan IMB / PBG dan sertifikasi lengkap',
    ],
    sampleProjections: {
      landSize: 150,
      estimatedRAB: 'Rp 650 Jt - Rp 950 Jt',
      annualROI: 'Apresiasi modal +12% per tahun',
    },
  },
  {
    id: 'villa',
    title: 'VILLA',
    subtitle: 'Liburan Jadi Investasi',
    tagline: 'Sanctuary Privat dengan Yield Tinggi dari Pasar Wisatawan Jogja',
    description:
      'Optimalisasi tanah di kawasan sejuk atau strategis wisata Jogja menjadi boutique villa berkolam renang privat. Nikmati liburan pribadi sekaligus passive income harian yang menguntungkan.',
    image: JOGJA_IMAGES.villa,
    specs: {
      minLandArea: 180,
      avgBuildDurationMonths: 7,
      estimatedCostPerM2: 6200000,
      typicalYieldPercent: 'ROI 14 - 22% / thn',
      targetSegment: 'Wisatawan Keluarga, Staycation, & Event Intim',
    },
    features: [
      'Private plunge pool & sunken lounge berlatar alam',
      'Desain Instagrammable dengan daya tarik okupansi harian tinggi',
      'Kombinasi material batu alam Merapi, kayu jati, dan kaca tempered',
      'Integrasi sistem smart-lock & manajemen hospitality digital',
      'Estimasi Break-Even Point (BEP) 4–5 tahun',
    ],
    sampleProjections: {
      landSize: 250,
      estimatedRAB: 'Rp 1.1 M - Rp 1.6 M',
      monthlyRevenue: 'Rp 25 Jt - Rp 45 Jt / bln',
      annualROI: '16.8% per tahun',
    },
  },
  {
    id: 'kos',
    title: 'HOMESTAY / KOS EKSKLUSIF',
    subtitle: 'Passive Income Jangka Panjang',
    tagline: 'Mesin Kas Otomatis dari 300.000+ Mahasiswa & Profesional Jogja',
    description:
      'Transformasikan tanah di dekat kampus ternama atau pusat bisnis Jogja menjadi kos eksklusif atau homestay berperabot lengkap. Permintaan sewa stabil sepanjang tahun dengan margin tinggi.',
    image: JOGJA_IMAGES.kos,
    specs: {
      minLandArea: 150,
      avgBuildDurationMonths: 8,
      estimatedCostPerM2: 4800000,
      typicalYieldPercent: 'ROI 12 - 18% / thn',
      targetSegment: 'Mahasiswa UGM, UNY, UPN, UII & Executive Muda',
    },
    features: [
      'Layout kamar efisien (16-22 m²) dengan kamar mandi dalam & balkon privat',
      'Fasilitas komunal: coworking space, pantry modern, dan area parkir lega',
      'Sistem token listrik mandiri per kamar & instalasi internet fiber optik',
      'Tingkat okupansi rata-rata kawasan kampus 88% - 96%',
      'Cash flow bulanan pasti dengan opsi operasional autogoverned',
    ],
    sampleProjections: {
      landSize: 200,
      estimatedRAB: 'Rp 1.2 M - Rp 1.8 M (10-14 Kamar)',
      monthlyRevenue: 'Rp 22 Jt - Rp 35 Jt / bln',
      annualROI: '15.4% per tahun',
    },
  },
];

export const TARGET_CLIENTS: TargetClient[] = [
  {
    id: 'tanah-kosong',
    number: 1,
    title: 'Pemilik Tanah Kosong',
    subtitle: 'Baru beli tanah atau tanah lama belum dimanfaatkan',
    avatarIcon: 'MapPin',
    description: 'Memiliki aset tanah warisan atau simpanan yang hanya membebani PBB tahunan tanpa menghasilkan arus kas.',
    painPoint: 'Bingung mau dibangun apa yang paling menguntungkan sesuai lokasi & regulasi tata ruang lokal.',
    recommendation: 'Lakukan analisis potensi lahan (highest & best use study) dan bangun kos eksklusif atau villa sewa.',
  },
  {
    id: 'kos-lama',
    number: 2,
    title: 'Pemilik Kos/Homestay Lama',
    subtitle: 'Ingin upgrade atau menambah unit produktif',
    avatarIcon: 'Home',
    description: 'Sudah memiliki properti sewa namun fasilitas tertinggal, tarif sewa macet, atau ingin ekspansi lantai atas.',
    painPoint: 'Kalah bersaing dengan kos modern berfasilitas AC, WiFi, dan kamar mandi dalam.',
    recommendation: 'Facelift arsitektur & renovasi interior menjadi kelas eksklusif untuk melipatgandakan tarif 2x lipat.',
  },
  {
    id: 'investor-properti',
    number: 3,
    title: 'Investor Properti',
    subtitle: 'Mencari investasi dengan return menarik di Jogja',
    avatarIcon: 'TrendingUp',
    description: 'Investor dari Jakarta, Surabaya, atau diaspora yang melihat Jogja sebagai safe haven investasi properti.',
    painPoint: 'Terkendala jarak untuk mengawasi tukang, khawatir biaya membengkak (RAB jebol) dan waktu molor.',
    recommendation: 'Sistem pengawasan berkala, live CCTV proyek, dan kontrak garansi biaya fixed price turn-key.',
  },
  {
    id: 'keluarga',
    number: 4,
    title: 'Keluarga',
    subtitle: 'Ingin membangun rumah impian berkualitas',
    avatarIcon: 'Users',
    description: 'Menginginkan rumah tempat bertumbuh bersama anak atau rumah singgah peristirahatan di masa pensiun.',
    painPoint: 'Takut ditipu kontraktor nakal, spesifikasi material diturunkan, dan pengerjaan tidak rapi.',
    recommendation: 'Pendampingan arsitek dari nol, pemilihan sampel material transparan, dan garansi retensi pasca-serah terima.',
  },
  {
    id: 'pelaku-usaha',
    number: 5,
    title: 'Pelaku Usaha',
    subtitle: 'Guest house, villa, kos komersial berskala',
    avatarIcon: 'Building2',
    description: 'Entitas bisnis atau pengusaha hospitality yang ingin menambah portofolio akomodasi wisata di Yogyakarta.',
    painPoint: 'Kebutuhan standar legalitas perizinan lengkap (PBG, SLF, izin operasional) dan efisiensi capex.',
    recommendation: 'Paket terintegrasi desain komersial, perizinan dinas tata kota, hingga persiapan soft launching.',
  },
];

export const JOGJA_ZONES: JogjaZone[] = [
  {
    id: 'sleman-kampus',
    name: 'Kawasan Kampus',
    region: 'Sleman',
    category: 'Kawasan Kampus',
    subDistricts: ['Depok', 'Condongcatur', 'Seturan', 'Babarsari', 'Jakal Bawah (KM 4-9)'],
    recommendedProperty: 'kos',
    landPriceRange: 'Rp 6 Jt - 14 Jt / m²',
    occupancyRate: '92% - 98%',
    yieldEstimate: '14% - 18% / thn',
    description:
      'Sentra magnet pendidikan tertinggi di Jogja. Dikelilingi kampus raksasa UGM, UNY, UPN Veteran, YKPN, Atma Jaya, dan UII. Permintaan kos eksklusif dan co-living premium tidak pernah surut.',
    landmarks: ['Kampus UGM', 'UPN Veteran', 'Atma Jaya', 'Pakuwon Mall', 'Hartono Mall'],
  },
  {
    id: 'sleman-wisata',
    name: 'Kawasan Wisata & Alam',
    region: 'Sleman',
    category: 'Kawasan Wisata',
    subDistricts: ['Kaliurang', 'Pakem', 'Ngaglik', 'Turi', 'Cangkringan'],
    recommendedProperty: 'villa',
    landPriceRange: 'Rp 2.5 Jt - 6 Jt / m²',
    occupancyRate: '75% - 88% (Puncak Akhir Pekan)',
    yieldEstimate: '15% - 22% / thn',
    description:
      'Udara sejuk lereng Gunung Merapi dengan panorama alam yang menenangkan. Destinasi favorit wisatawan keluarga Jakarta & mancanegara untuk staycation privat dan retreat.',
    landmarks: ['Kawasan Wisata Kaliurang', 'Ledok Sambi', 'Museum Ullen Sentalu', 'Merapi Golf'],
  },
  {
    id: 'kawasan-premium',
    name: 'Kawasan Hunian Premium & Budaya',
    region: 'Kota Yogyakarta',
    category: 'Kawasan Premium',
    subDistricts: ['Sleman Tengah', 'Mlati', 'Kasihan', 'Gamping', 'Sewon', 'Bantul Heritage', 'Banguntapan'],
    recommendedProperty: 'rumah',
    landPriceRange: 'Rp 4 Jt - 10 Jt / m²',
    occupancyRate: '85% - 90%',
    yieldEstimate: '10% - 14% / thn',
    description:
      'Aksesibilitas prima menuju pusat kota Jogja, Malioboro, dan kawasan seni Kasongan. Sangat diminati untuk hunian keluarga modern, boutique homestay budaya, dan ekspatriat.',
    landmarks: ['Keraton Yogyakarta', 'Malioboro', 'Sentra Gerabah Kasongan', 'ISI Yogyakarta'],
  },
];

export const HOT_LEAD_SOURCES: HotLeadSource[] = [
  {
    id: 'broker',
    title: 'Agen Properti & Broker Tanah',
    description: 'Kerjasama referral mutualisme saat transaksi tanah baru selesai dibeli.',
    icon: 'Handshake',
    flow: 'Pembeli tanah baru langsung direferensikan untuk jasa bangun & estimasi RAB.',
  },
  {
    id: 'pengelola',
    title: 'Pengelola Kos & Homestay',
    description: 'Akses langsung ke jaringan pemilik properti lama yang butuh renovasi/ekspansi.',
    icon: 'KeyRound',
    flow: 'Evaluasi properti yang occupancy-nya turun untuk dilakukan peremajaan total.',
  },
  {
    id: 'portal',
    title: 'Platform Properti Online',
    description: 'Listing & monitoring marketplace (Rumah123, OLX, Lamudi, Pinhome).',
    icon: 'Globe',
    flow: 'Menjaring calon pembeli tanah yang sedang mencari mitra arsitek & kontraktor.',
  },
  {
    id: 'komunitas',
    title: 'Komunitas Investor & Pengusaha',
    description: 'Event networking bisnis, HIPMI, TDA, dan gathering investor Jogja.',
    icon: 'Network',
    flow: 'Edukasi skema passive income properti komersial ber-ROI terukur.',
  },
  {
    id: 'iklan',
    title: 'Iklan Digital Terarah',
    description: 'Targeted ads di Meta (Facebook, Instagram), Google Search, dan TikTok.',
    icon: 'Megaphone',
    flow: 'Menangkap audiens pencari "jasa bangun rumah Jogja" & "kontraktor villa".',
  },
  {
    id: 'perizinan',
    title: 'Database Proyek & Perizinan',
    description: 'Pantau transaksi plot tanah baru dan pengurusan KRK / IMB / PBG.',
    icon: 'FileCheck',
    flow: 'Penawaran awal solusi perancangan desain terpadu sebelum tanah terbengkalai.',
  },
];

export const MARKETING_STRATEGY: MarketingStrategyTier[] = [
  {
    id: 'high-intent',
    tier: 'HIGH INTENT',
    sublabel: 'Siap Membeli & Bangun',
    color: '#0B251F',
    keywords: [
      'jasa bangun rumah Jogja',
      'kontraktor villa Jogja',
      'biaya bangun homestay Jogja',
      'arsitek kos eksklusif Jogja',
      'kontraktor amanah Jogja',
    ],
    audienceTrigger: 'Pencari aktif di Google & Meta yang telah memiliki tanah dan siap eksekusi dalam 1-3 bulan.',
  },
  {
    id: 'problem-planning',
    tier: 'PROBLEM / PLANNING',
    sublabel: 'Fase Riset & Perencanaan',
    color: '#C5A25D',
    keywords: [
      'punya tanah kosong diapakan',
      'desain rumah villa modern',
      'hitung biaya bangun kos per meter',
      'prospek villa kaliurang 2026',
      'cara urus PBG tanah Jogja',
    ],
    audienceTrigger: 'Pemilik tanah yang membutuhkan bimbingan kelayakan finansial dan perbandingan konsep terbaik.',
  },
  {
    id: 'retargeting',
    tier: 'RETARGETING',
    sublabel: 'Audiens Hangat (Warm Leads)',
    color: '#12362C',
    keywords: [
      'Pengunjung website landing page',
      'Penonton video IG Reels > 50%',
      'Pengisi kalkulator yang belum konsultasi',
      'Audiens yang simpan postingan portofolio',
    ],
    audienceTrigger: 'Follow-up dengan bukti portofolio sebelum-sesudah, testimoni pemilik, dan penawaran konsultasi gratis.',
  },
];

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    step: 1,
    title: 'Iklan Digital & Konten Edukasi',
    actionText: 'Menarik calon klien tepat',
    icon: 'Radio',
    detail: 'Menjangkau pemilik tanah melalui konten edukasi potensi lahan Jogja dan solusi investasi properti bernilai tinggi.',
  },
  {
    step: 2,
    title: 'Landing Page & Kalkulator Potensi',
    actionText: 'Form "Hitung Potensi Tanah"',
    icon: 'LayoutTemplate',
    detail: 'Pengunjung memasukkan data luas tanah, lokasi, dan budget untuk mendapatkan 3 konsep alternatif & estimasi RAB instan.',
  },
  {
    step: 3,
    title: 'Lead Masuk WhatsApp Otomatis',
    actionText: 'Data otomatis ke tim konsultan',
    icon: 'MessageCircle',
    detail: 'Data spesifikasi lahan langsung terformat rapi ke WhatsApp tim konsultan kami untuk respon cepat dalam < 15 menit.',
  },
  {
    step: 4,
    title: 'Kualifikasi Lead (Hot · Warm · Cold)',
    actionText: 'Profiling kebutuhan & timeline',
    icon: 'UserCheck',
    detail: 'Konsultan mendalami kesiapan legalitas tanah, status sertifikat (SHM), kepastian budget, dan rencana waktu mulai bangun.',
  },
  {
    step: 5,
    title: 'Survey Lokasi & Diskusi Konsep',
    actionText: 'Pengukuran lahan & bedah RAB',
    icon: 'MapPinned',
    detail: 'Tim arsitek & surveyor datang langsung ke lokasi tanah di Jogja, mengecek kontur lahan, batas, dan akses utilitas.',
  },
  {
    step: 6,
    title: 'Proposal Desain & Kontrak Kerja',
    actionText: 'Mulai proyek dengan aman',
    icon: 'FileSignature',
    detail: 'Presentasi 3D visual, dokumen RAB fix mengikat tanpa biaya tersembunyi, penandatanganan SPK, dan peletakan batu pertama.',
  },
];

export const CONTENT_CATEGORIES: ContentCategory[] = [
  {
    id: 'edukasi',
    title: 'Edukasi & Panduan',
    tagline: 'Tips, biaya, & kesalahan umum bangun di Jogja',
    icon: 'Lightbulb',
    description: 'Membongkar rahasia perhitungan KDB lahan Jogja, cara cegah semen retak di tanah lempung, dan trik legalitas PBG.',
    sampleItem: '"5 Kesalahan Fatal Pemilik Tanah Saat Membangun Kos Tanpa Analisis Kawasan"',
  },
  {
    id: 'portfolio',
    title: 'Portofolio Nyata',
    tagline: 'Before — Proses Konstruksi — Hasil Jadi',
    icon: 'Building',
    description: 'Dokumentasi transparan mulai dari pembersihan semak tanah kosong, pengecoran sloof, hingga serah terima kunci.',
    sampleItem: '"Transformasi Tanah Kosong 220m² di Seturan Menjadi Kos Eksklusif 12 Kamar"',
  },
  {
    id: 'simulasi',
    title: 'Simulasi Investasi',
    tagline: 'Hitung potensi ROI kos/homestay nyata',
    icon: 'BarChart3',
    description: 'Breakdown matematika finansial: modal tanah, biaya bangun, tarif sewa bulanan, dan proyeksi balik modal dalam tahunan.',
    sampleItem: '"Simulasi Villa Kaliurang: Modal 1.2 Miliar, Omset 35 Juta/Bulan, BEP 4.2 Tahun"',
  },
  {
    id: 'testimoni',
    title: 'Testimoni Klien',
    tagline: 'Kisah nyata & pengalaman pemilik properti',
    icon: 'Quote',
    description: 'Cerita jujur para pemilik tanah dari Jakarta dan Jogja yang mempercayakan amanah pembangunan asetnya kepada kami.',
    sampleItem: '"Ibu Hendrawan (Jakarta): Senang sekali tidak perlu repot bolak-balik Jogja, progres terupdate tiap minggu."',
  },
  {
    id: 'promo',
    title: 'Penawaran Spesial',
    tagline: 'Promo desain 3D gratis & bonus konsultasi RAB',
    icon: 'Sparkles',
    description: 'Incentive bagi pemilik tanah yang melakukan survey di bulan ini dengan benefit bonus tata landscape taman depan.',
    sampleItem: '"Bulan Ini: Gratis Desain Konseptual 3D & Konsultasi Kelayakan Lahan"',
  },
];

export const PROJECT_PORTFOLIO: ProjectCaseStudy[] = [
  {
    id: 'kos-seturan',
    title: 'Omah Seturan Eksklusif',
    category: 'kos',
    location: 'Seturan, Caturtunggal, Depok, Sleman',
    landArea: 240,
    buildingArea: 320,
    initialCondition: 'Tanah pekarangan kosong penuh semak belukar selama 6 tahun',
    developedInto: 'Kos Eksklusif 14 Kamar Full-Furnished + Rooftop Lounge',
    constructionTime: '7.5 Bulan',
    rabTotal: 'Rp 1.480.000.000',
    actualReturn: 'Tarif Rp 2.2 Jt/kamar · Okupansi 96% · Arus Kas Rp 29.5 Jt/bln',
    image: JOGJA_IMAGES.kos,
  },
  {
    id: 'villa-kaliurang',
    title: 'Villa Merapi Sanctuary',
    category: 'villa',
    location: 'Pakembinangun, Pakem, Sleman (Dekat Kaliurang)',
    landArea: 350,
    buildingArea: 220,
    initialCondition: 'Tanah miring berbatu lereng bukit tak terawat',
    developedInto: 'Boutique Villa 3 Kamar Tidur dengan Private Infinity Pool',
    constructionTime: '6.5 Bulan',
    rabTotal: 'Rp 1.350.000.000',
    actualReturn: 'Tarif Rp 2.5 Jt/malam · Okupansi 78% · Arus Kas Rp 38 Jt/bln',
    image: JOGJA_IMAGES.villa,
  },
  {
    id: 'rumah-kasihan',
    title: 'Rumah Ayem Tamansari',
    category: 'rumah',
    location: 'Kasihan, Bantul (Selatan Kota Jogja)',
    landArea: 160,
    buildingArea: 185,
    initialCondition: 'Kavling kosong dalam cluster perumahan',
    developedInto: 'Rumah Tinggal Modern Tropis 2 Lantai dengan Inner Courtyard',
    constructionTime: '5.5 Bulan',
    rabTotal: 'Rp 820.000.000',
    actualReturn: 'Nilai appraisal bank melonjak 45% setelah selesai dibangun',
    image: JOGJA_IMAGES.rumah,
  },
];

export const DELIVERABLES = [
  {
    title: 'Desain Sesuai Kebutuhan',
    desc: 'Arsitektur modern fungsional yang memaksimalkan sirkulasi udara Jogja, nilai estetika, dan efisiensi ruang.',
    icon: 'PenTool',
  },
  {
    title: 'Estimasi Biaya Jelas (RAB)',
    desc: 'Rencana Anggaran Biaya terperinci per satuan pekerjaan. Tanpa biaya siluman, harga fixed mengikat.',
    icon: 'ReceiptCheck',
  },
  {
    title: 'Pendampingan dari Awal hingga Selesai',
    desc: 'Mulai dari pengurusan izin PBG/IMB, uji tanah, konstruksi, interior furnished, sampai serah terima kunci.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Proses Aman & Profesional',
    desc: 'Pekerja ahli berpengalaman, pengawasan berkala oleh project manager, dan laporan progres digital tiap minggu.',
    icon: 'HardHat',
  },
  {
    title: 'Potensi Nilai Investasi Maksimal',
    desc: 'Perencanaan matang agar properti yang dibangun mudah disewakan dengan yield sewa dan capital gain tertinggi.',
    icon: 'TrendingUp',
  },
];

export const SUCCESS_METRICS = [
  {
    label: 'Jumlah Leads Masuk',
    value: '120+ / bln',
    desc: 'Calon klien pemilik tanah berkonsultasi',
    sub: 'Tingkat minat tinggi di Sleman & Bantul',
  },
  {
    label: 'Cost Per Lead (CPL)',
    value: 'Rp 45.000',
    desc: 'Efisiensi akuisisi iklan terarah',
    sub: 'Benchmark industri terbaik di Jawa Tengah',
  },
  {
    label: 'Jumlah Survey Lokasi',
    value: '35+ Lokasi',
    desc: 'Tanah disurvei langsung oleh arsitek',
    sub: 'Rata-rata 8 survey per minggu',
  },
  {
    label: 'Jumlah Penawaran (RAB)',
    value: '22 Proposal',
    desc: 'Proposal desain & RAB diajukan',
    sub: 'Tingkat transparansi biaya 100%',
  },
  {
    label: 'Proyek Closing',
    value: '6 - 8 Proyek',
    desc: 'SPK pembangunan aktif berjalan',
    sub: 'Rumah, villa, dan kos eksklusif',
  },
  {
    label: 'Rata-rata ROI Klien',
    value: '15.6% / thn',
    desc: 'Pengembalian modal hasil sewa',
    sub: 'Jauh di atas bunga deposito & obligasi',
  },
];
