'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  MapPin, Layers, DollarSign, Navigation, ArrowRight,
  TrendingUp, BarChart2, ShieldCheck, Check, Sparkles, Building, Globe,
  Maximize2, Minimize2, X as XIcon
} from 'lucide-react';
import type { YogyakartaRegion } from './JogjaRealMap';
import type { InvestmentBlock } from './JogjaOsmMap';

// Dynamically import Leaflet maps
const JogjaRealMap = dynamic(
  () => import('./JogjaRealMap').then((m) => ({ default: m.JogjaRealMap })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[480px] bg-[#051410] rounded-3xl animate-pulse flex items-center justify-center border border-white/10">
        <div className="flex flex-col items-center gap-2">
          <span className="w-6 h-6 border-2 border-[#d5a864] border-t-transparent rounded-full animate-spin" />
          <span className="text-neutral-400 text-xs font-mono">Memuat visualisasi GIS spasial DIY...</span>
        </div>
      </div>
    ),
  }
);

const JogjaOsmMap = dynamic(
  () => import('./JogjaOsmMap').then((m) => ({ default: m.JogjaOsmMap })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[480px] bg-[#051410] rounded-3xl animate-pulse flex items-center justify-center border border-white/10">
        <div className="flex flex-col items-center gap-2">
          <span className="w-6 h-6 border-2 border-[#d5a864] border-t-transparent rounded-full animate-spin" />
          <span className="text-neutral-400 text-xs font-mono">Memuat peta koridor blok investasi...</span>
        </div>
      </div>
    ),
  }
);

interface StrategicAreasProps {
  onSelectZone: (zoneName: string, shouldScroll?: boolean) => void;
}

export const StrategicAreas: React.FC<StrategicAreasProps> = ({ onSelectZone }) => {
  const [activeMapTab, setActiveMapTab] = useState<'zonasi' | 'blok'>('zonasi');
  const [activeFilterTab, setActiveFilterTab] = useState<'zonasi' | 'harga' | 'akses'>('zonasi');
  const [selectedCluster, setSelectedCluster] = useState<string>('kampus');
  const [selectedBlockId, setSelectedBlockId] = useState<string>('block-kampus');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ESC key to close fullscreen
  const handleCloseFullscreen = useCallback(() => setIsFullscreen(false), []);
  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleCloseFullscreen(); };
    document.addEventListener('keydown', onKey);
    // Prevent body scroll while fullscreen is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, handleCloseFullscreen]);

  const clusters = [
    {
      id: 'semua',
      title: 'Semua Kawasan DIY',
      subtitle: 'Lihat seluruh 5 kabupaten/kota',
      badge: '🗺️ Comprehensive',
      bestFor: 'Portfolio Diversifikasi',
      priceBadge: 'Pasar Rp 1,5 - 25 jt/m²',
      region: 'semua',
      blockId: 'semua',
      fullName: 'Daerah Istimewa Yogyakarta (Seluruh Kawasan)',
      description: 'Mencakup 5 kabupaten/kota dengan beragam karakteristik investasi dari perkotaan, koridor universitas, hingga kawasan pariwisata heritage dan bahari.',
      priceRange: 'Rp 2,5 - 18 jt/m²',
      njopPrice: 'Rp 450 Rb - 22 Jt/m²',
      growthRate: '+8% - 15%',
      roi: '8% - 14% / tahun',
    },
    {
      id: 'kampus',
      title: 'Kawasan Kampus',
      subtitle: 'UGM, UNY, Seturan, UPN, UII',
      badge: '🔥 Hot Demand',
      bestFor: 'Kost Eksklusif & Co-Living',
      priceBadge: 'Pasar Rp 5,5 - 16 jt/m²',
      region: 'sleman',
      blockId: 'block-kampus',
      fullName: 'Kabupaten Sleman (Kawasan Kampus & Pelajar)',
      description: 'Didukung oleh 300.000+ mahasiswa aktif dan ekosistem pendidikan terbaik, menjadikan area ini target utama untuk kos eksklusif dan hunian komersial berokupansi tinggi.',
      priceRange: 'Rp 5,5 - 16 jt/m²',
      njopPrice: 'Rp 3,5 - 14 jt/m²',
      growthRate: '+11% - 16%',
      roi: '12% - 18% / tahun',
    },
    {
      id: 'wisata',
      title: 'Kawasan Wisata & Staycation',
      subtitle: 'Malioboro, Parangtritis, Kaliurang',
      badge: '🏖️ High Yield',
      bestFor: 'Villa & Boutique Homestay',
      priceBadge: 'Pasar Rp 4,0 - 16 jt/m²',
      region: 'bantul',
      blockId: 'block-wisata',
      fullName: 'Kawasan Wisata & Budaya (Kota Jogja, Sleman Utara, Bantul)',
      description: 'Koridor dengan kunjungan 7.2+ juta wisatawan per tahun, sangat potensial untuk villa sewa harian, homestay estetik, dan cafe komersial bernilai sewa prima.',
      priceRange: 'Rp 4,0 - 16 jt/m²',
      njopPrice: 'Rp 1,5 - 7,5 jt/m²',
      growthRate: '+10% - 14%',
      roi: '14% - 22% / tahun',
    },
    {
      id: 'premium',
      title: 'Kawasan Premium Kota',
      subtitle: 'Kotabaru, Ring Road Utara, Elit Pusat',
      badge: '💎 Prime Capital',
      bestFor: 'Luxury Townhouse & Komersial',
      priceBadge: 'Pasar Rp 9,0 - 25 jt/m²',
      region: 'kota',
      blockId: 'block-premium',
      fullName: 'Kota Yogyakarta & Sleman Tengah (Kawasan Elit)',
      description: 'Aksesibilitas terbaik dan fasilitas kota terlengkap dengan nilai apresiasi tanah tertinggi dan likuiditas kuat untuk aset keluarga jangka panjang.',
      priceRange: 'Rp 9,0 - 25 jt/m²',
      njopPrice: 'Rp 6,0 - 22 jt/m²',
      growthRate: '+12% - 18%',
      roi: '9% - 13% / tahun',
    },
    {
      id: 'pertumbuhan',
      title: 'Kawasan Pertumbuhan & Tol',
      subtitle: 'Kulon Progo YIA, Sleman Barat',
      badge: '🚀 High Growth',
      bestFor: 'Land Banking & Ruko Transit',
      priceBadge: 'Pasar Rp 1,8 - 6,5 jt/m²',
      region: 'kulonprogo',
      blockId: 'block-kota',
      fullName: 'Kawasan Pertumbuhan Baru (Akses YIA & Tol Baru)',
      description: 'Pertumbuhan pesat terdorong Bandara Internasional YIA dan proyek trase jalan tol baru Solo-Jogja-YIA dengan harga lahan masuk yang masih sangat atraktif.',
      priceRange: 'Rp 1,8 - 6,5 jt/m²',
      njopPrice: 'Rp 850 Rb - 4,5 jt/m²',
      growthRate: '+14% - 20%',
      roi: '9% - 15% / tahun',
    },
    {
      id: 'eco-wellness',
      title: 'Kawasan Eco & Wellness',
      subtitle: 'Pakem, Cangkringan, Lereng Merapi',
      badge: '🌿 Eco Living',
      bestFor: 'Resort Villa & Glamping Cafe',
      priceBadge: 'Pasar Rp 2,0 - 6,0 jt/m²',
      region: 'sleman',
      blockId: 'block-wisata',
      fullName: 'Sleman Utara (Kawasan Wisata Alam & Wellness Retreat)',
      description: 'Lingkungan sejuk dengan view Gunung Merapi, udara bersih, dan air melimpah. Menjadi primadona baru bagi konsep wellness living, healing villa, dan resto alam.',
      priceRange: 'Rp 2,0 - 6,0 jt/m²',
      njopPrice: 'Rp 1,2 - 4,0 jt/m²',
      growthRate: '+10% - 15%',
      roi: '11% - 17% / tahun',
    },
    {
      id: 'heritage-art',
      title: 'Kawasan Heritage & Seni',
      subtitle: 'Kotagede, Prawirotaman, Kasihan',
      badge: '🏛️ Art & Culture',
      bestFor: 'Boutique Guesthouse & Galeri',
      priceBadge: 'Pasar Rp 3,5 - 9,5 jt/m²',
      region: 'bantul',
      blockId: 'block-bantul',
      fullName: 'Bantul Utara & Jogja Selatan (Sentra Heritage & Seni Kreatif)',
      description: 'Pusat komunitas ekspatriat, desainer, dan seniman. Sangat diminati turis mancanegara untuk guest house bernuansa etnik Jawa modern.',
      priceRange: 'Rp 3,5 - 9,5 jt/m²',
      njopPrice: 'Rp 1,5 - 7,5 jt/m²',
      growthRate: '+9% - 14%',
      roi: '12% - 16% / tahun',
    },
  ];

  const currentData = clusters.find((c) => c.id === selectedCluster) || clusters[1];

  const handleSelectCluster = (clusterId: string) => {
    setSelectedCluster(clusterId);
    const item = clusters.find((c) => c.id === clusterId);
    if (item) {
      if (item.blockId) {
        setSelectedBlockId(item.blockId);
      }
      onSelectZone(item.fullName, false);
    }
  };

  const handleBlockSelect = (block: InvestmentBlock) => {
    setSelectedBlockId(block.id);
    const match = clusters.find((c) => c.blockId === block.id);
    if (match) {
      setSelectedCluster(match.id);
    }
  };

  return (
    <section
      id="gis-spatial-intelligence"
      className="relative py-20 lg:py-28 bg-[#071914] text-white border-y border-[#d5a864]/20 overflow-hidden scroll-mt-12"
    >
      <div id="area-potensial" className="absolute -top-16" />
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d5a864]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#1a4a39]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Header Row with Intelligence Tag and Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d5a864]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d5a864] animate-pulse" />
              <span>GIS SPATIAL INTELLIGENCE &amp; INFRASTRUKTUR</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Pemetaan Spasial &amp;{' '}
              <br className="hidden sm:inline" />
              <span
                className="italic font-normal text-[#d5a864]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Kawasan Potensial
              </span>{' '}
              di Jogja
            </h2>

            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed font-light">
              Analisis komprehensif wilayah administratif, data NJOP (PBB-P2) resmi, trase mega proyek jalan tol, exit gate, dan titik magnet kampus/RS
              untuk keputusan investasi properti yang presisi dan menguntungkan.
            </p>
          </div>

          {/* Filter Pills (Zonasi RTRW, Harga Lahan / NJOP, Aksesibilitas & Tol) */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0 self-start lg:self-auto">
            <div className="flex items-center gap-2 bg-[#0a231c] p-1.5 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setActiveMapTab('zonasi');
                  setActiveFilterTab('zonasi');
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeFilterTab === 'zonasi' && activeMapTab === 'zonasi'
                    ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Zonasi RTRW</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMapTab('zonasi');
                  setActiveFilterTab('harga');
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeFilterTab === 'harga' && activeMapTab === 'zonasi'
                    ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Harga Lahan (NJOP)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMapTab('zonasi');
                  setActiveFilterTab('akses');
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeFilterTab === 'akses' && activeMapTab === 'zonasi'
                    ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Akses &amp; Jalur Tol</span>
              </button>
            </div>

            {/* Active Mode Sub-Notice */}
            <span className="text-[11px] font-mono text-neutral-400">
              {activeFilterTab === 'harga'
                ? '📊 Menampilkan Heatmap Nilai Jual Objek Pajak (NJOP) Resmi DIY vs Nilai Pasar Bebas'
                : activeFilterTab === 'akses'
                ? '🛣️ Menampilkan Trase Jalan Tol Solo-Yogyakarta-YIA & Tol Bawen + 5 Exit Gate'
                : '🗺️ Menampilkan Batas Administratif 5 Kab/Kota & Peruntukan Zonasi RTRW'}
            </span>
          </div>
        </div>

        {/* Main Interactive Map & Selection Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Pilih Kawasan List (Enhanced UI with Badges & Best-fit Archetypes) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Pilih Klaster Kawasan
              </span>
              <span className="text-[10px] text-[#d5a864] font-mono bg-[#0a231c] px-2 py-0.5 rounded-full border border-white/10">
                {clusters.length} KLASTER STRATEGIS
              </span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {clusters.map((c) => {
                const isActive = selectedCluster === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => handleSelectCluster(c.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-2 group cursor-pointer ${
                      isActive
                        ? 'bg-[#0f2e25] border-[#d5a864] ring-1 ring-[#d5a864] shadow-[0_4px_20px_rgba(213,168,100,0.18)]'
                        : 'bg-[#0a231c]/70 border-white/10 hover:border-white/20 hover:bg-[#0c2a22]'
                    }`}
                  >
                    {/* Top Row: Title, Radio Check, and Status Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isActive ? 'bg-[#d5a864] text-[#071914]' : 'bg-white/10 text-neutral-400'
                          }`}
                        >
                          {isActive ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#d5a864] transition-colors leading-tight">
                            {c.title}
                          </h4>
                          <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{c.subtitle}</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#071914] border border-white/15 text-[#d5a864] whitespace-nowrap shrink-0">
                        {c.badge}
                      </span>
                    </div>

                    {/* Bottom Row: Best For Archetype Tag & Price Range */}
                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/10 pl-7">
                      <span className="text-neutral-300 truncate">
                        <span className="text-neutral-500">Cocok: </span>
                        <strong className="text-emerald-300 font-semibold">{c.bestFor}</strong>
                      </span>
                      <div className="text-right shrink-0 ml-2">
                        <span className="font-mono text-amber-300 font-semibold block">
                          NJOP: {c.njopPrice}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint Box for Dual Layer Radar */}
            <div className="text-xs text-neutral-300 bg-[#0a231c]/90 p-4 rounded-2xl border border-white/10 flex items-start gap-2.5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#d5a864] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-light">
                Gunakan tab <strong className="text-white">Zonasi</strong> untuk 5 Kab/Kota, NJOP resmi &amp; rute tol, atau tab <strong className="text-white">Blok</strong> untuk analisis mikro koridor komersial (BLK-01 s/d BLK-05).
              </p>
            </div>
          </div>

          {/* Right Column: GIS Interactive Map with Dual-Layer Radar Toolbar */}
          <div className="lg:col-span-8 space-y-3">
            
            {/* Terminal Peta GIS Yogyakarta Header & Tab Switcher (Zonasi vs Blok) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a231c]/90 p-2 sm:p-2.5 rounded-2xl border border-white/15 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d5a864] animate-ping" />
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                  Terminal Peta GIS Yogyakarta
                </span>
                <span className="text-[10px] text-neutral-400 font-mono hidden md:inline">
                  · DUAL-LAYER RADAR
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Segmented Tab Buttons: Zonasi (Kiri) | Blok (Kanan) */}
                <div className="flex items-center gap-1.5 bg-[#071914] p-1 rounded-xl border border-white/15">
                  {/* Tab Kiri: Zonasi */}
                  <button
                    type="button"
                    onClick={() => setActiveMapTab('zonasi')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                      activeMapTab === 'zonasi'
                        ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Zonasi &amp; NJOP</span>
                  </button>

                  {/* Tab Kanan: Blok */}
                  <button
                    type="button"
                    onClick={() => setActiveMapTab('blok')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                      activeMapTab === 'blok'
                        ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Blok</span>
                  </button>
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  title="Buka peta layar penuh (Full Screen)"
                  className="p-2 rounded-xl bg-[#d5a864]/15 hover:bg-[#d5a864]/30 border border-[#d5a864]/40 text-[#d5a864] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Full Map</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Peta Zonasi Administratif DIY, NJOP & Infrastruktur Tol */}
            {activeMapTab === 'zonasi' && (
              <div className="transition-opacity duration-300">
                <JogjaRealMap
                  selectedRegionId={currentData.region}
                  filterMode={activeFilterTab}
                  onSelectRegion={(reg) => {
                    const match = clusters.find((c) => c.region === reg.id);
                    if (match) setSelectedCluster(match.id);
                  }}
                  onApplyZoneToCalculator={(zoneName) => onSelectZone(zoneName, true)}
                  height="480px"
                />
              </div>
            )}

            {/* TAB 2: Peta Blok Koridor OpenStreetMap (BLK-01 s/d BLK-05) */}
            {activeMapTab === 'blok' && (
              <div className="transition-opacity duration-300">
                <JogjaOsmMap
                  selectedLocationId={selectedBlockId}
                  onSelectBlock={handleBlockSelect}
                  onApplyZoneToCalculator={(zoneName) => onSelectZone(zoneName, true)}
                  height="480px"
                />
              </div>
            )}
          </div>

        </div>

        {/* ============================================================ */}
        {/* FULLSCREEN MAP OVERLAY MODAL                                  */}
        {/* ============================================================ */}
        {isFullscreen && (
          <div
            className="fixed inset-0 z-[9999] bg-[#051410]/95 backdrop-blur-sm flex flex-col"
            style={{ animation: 'fadeInScale 0.2s ease-out' }}
          >
            {/* Fullscreen Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#071914] border-b border-[#d5a864]/30 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d5a864] animate-ping" />
                <span className="text-sm font-extrabold text-white tracking-tight">
                  GIS Spatial Intelligence — DIY Full Map View
                </span>
                <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                  · {activeFilterTab === 'harga' ? 'MODE: NJOP PBB-P2 HEATMAP' : activeFilterTab === 'akses' ? 'MODE: TRASE & EXIT TOL' : 'MODE: ZONASI RTRW'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Filter Pills (compact, inside fullscreen) */}
                <div className="hidden sm:flex items-center gap-1 bg-[#0a231c] p-1 rounded-full border border-white/10 text-[11px]">
                  {(['zonasi', 'harga', 'akses'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => { setActiveMapTab('zonasi'); setActiveFilterTab(tab); }}
                      className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                        activeFilterTab === tab && activeMapTab === 'zonasi'
                          ? 'bg-[#d5a864] text-[#071914]'
                          : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      {tab === 'zonasi' ? '🗺️ Zonasi' : tab === 'harga' ? '💰 NJOP' : '🛣️ Tol'}
                    </button>
                  ))}
                </div>

                {/* Tab Blok / Zonasi switcher */}
                <div className="flex items-center gap-1 bg-[#0a231c] p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveMapTab('zonasi')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                      activeMapTab === 'zonasi' ? 'bg-[#d5a864] text-[#071914]' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    Zonasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMapTab('blok')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                      activeMapTab === 'blok' ? 'bg-[#d5a864] text-[#071914]' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    Blok
                  </button>
                </div>

                {/* Close Fullscreen Button */}
                <button
                  type="button"
                  onClick={handleCloseFullscreen}
                  title="Tutup layar penuh (ESC)"
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/15 hover:border-red-500/50 text-neutral-300 hover:text-red-400 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tutup</span>
                  <span className="hidden sm:inline text-[10px] text-neutral-500">(ESC)</span>
                </button>
              </div>
            </div>

            {/* Fullscreen Map Body — stretches remaining viewport height */}
            {/* Top bar ~48px + bottom bar ~40px = ~88px total chrome */}
            <div className="flex-1 overflow-auto bg-[#051410]">
              {activeMapTab === 'zonasi' ? (
                <JogjaRealMap
                  selectedRegionId={currentData.region}
                  filterMode={activeFilterTab}
                  onSelectRegion={(reg) => {
                    const match = clusters.find((c) => c.region === reg.id);
                    if (match) setSelectedCluster(match.id);
                  }}
                  onApplyZoneToCalculator={(zoneName) => {
                    onSelectZone(zoneName, true);
                    handleCloseFullscreen();
                  }}
                  height="calc(100vh - 130px)"
                />
              ) : (
                <JogjaOsmMap
                  selectedLocationId={selectedBlockId}
                  onSelectBlock={(block) => {
                    handleBlockSelect(block);
                  }}
                  onApplyZoneToCalculator={(zoneName) => {
                    onSelectZone(zoneName, true);
                    handleCloseFullscreen();
                  }}
                  height="calc(100vh - 130px)"
                />
              )}
            </div>

            {/* Bottom hint bar */}
            <div className="shrink-0 px-4 py-2 bg-[#071914] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <span>💡 Klik sembarang titik di peta untuk analisis kelayakan lahan instan</span>
              <span className="font-mono">Tekan <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white text-[10px] border border-white/20">ESC</kbd> untuk keluar dari mode layar penuh</span>
            </div>
          </div>
        )}

        {/* Bottom Box: Analisis Kawasan Terpilih & Metrik Dinamis */}
        <div id="analisis-kawasan-detail" className="bg-[#0a231c]/90 rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 backdrop-blur-md scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#d5a864]">
                  Analisis Kawasan Terpilih:
                </span>
                <span className="px-2 py-0.5 bg-[#071914] text-[10px] font-bold text-emerald-400 rounded-md border border-emerald-500/30">
                  {currentData.badge}
                </span>
                {activeFilterTab === 'harga' && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-[10px] font-mono text-amber-300 rounded-md border border-amber-500/40">
                    MODE DATA NJOP RESMI PBB-P2
                  </span>
                )}
                {activeFilterTab === 'akses' && (
                  <span className="px-2 py-0.5 bg-blue-500/20 text-[10px] font-mono text-blue-300 rounded-md border border-blue-500/40">
                    MODE KONEKTIVITAS AKSES JALAN TOL
                  </span>
                )}
                {activeMapTab === 'blok' && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-[10px] font-mono text-amber-300 rounded-md border border-amber-500/40">
                    MODE KORIDOR BLOK MIKRO
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentData.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
                {currentData.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectZone(currentData.fullName, true)}
              className="self-start lg:self-center px-5 py-2.5 text-xs font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] rounded-xl flex items-center gap-2 shrink-0 transition-all cursor-pointer shadow-md"
            >
              <span>Hitung Potensi Tanah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Metric Cards (Reaktif sesuai mode filter) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeFilterTab === 'harga' ? (
              <>
                <div className="bg-[#071914] p-4.5 rounded-2xl border border-amber-500/30">
                  <span className="text-xs text-amber-400 font-bold block mb-1">NJOP Resmi (PBB-P2)</span>
                  <span className="text-xl sm:text-2xl font-black text-white tabular-nums block">
                    {currentData.njopPrice}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">Ketetapan Pemkab/Pemkot DIY</span>
                </div>

                <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
                  <span className="text-xs text-emerald-400 font-bold block mb-1">Harga Transaksi Bebas Pasar</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums block">
                    {currentData.priceRange}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">Nilai Transaksi Riil Lapangan</span>
                </div>

                <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
                  <span className="text-xs text-neutral-400 block mb-1">Potensi ROI &amp; Rekomendasi</span>
                  <span className="text-xl sm:text-2xl font-black text-[#d5a864] tabular-nums block">
                    {currentData.roi}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">
                    Apresiasi: <strong className="text-emerald-400">{currentData.growthRate}</strong>
                  </span>
                </div>
              </>
            ) : activeFilterTab === 'akses' ? (
              <>
                <div className="bg-[#071914] p-4.5 rounded-2xl border border-amber-500/30">
                  <span className="text-xs text-amber-400 font-bold block mb-1">Konektivitas Exit Tol</span>
                  <span className="text-lg sm:text-xl font-bold text-white block">
                    {currentData.region === 'sleman' ? '5 Exit Tol Langsung' : currentData.region === 'kulonprogo' ? 'Tol YIA & Bandara' : currentData.region === 'kota' ? '12-15 mnt ke Exit' : currentData.region === 'bantul' ? 'Ring Road Selatan' : 'Jalur JJLS'}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">Koridor Cepat Trans-Jawa</span>
                </div>

                <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
                  <span className="text-xs text-neutral-400 block mb-1">Pertumbuhan Nilai Lahan</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums block">
                    {currentData.growthRate}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">Terdorong infrastruktur tol</span>
                </div>

                <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
                  <span className="text-xs text-neutral-400 block mb-1">Potensi ROI Operasional</span>
                  <span className="text-xl sm:text-2xl font-black text-[#d5a864] tabular-nums block">
                    {currentData.roi}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">
                    Best Fit: <strong className="text-neutral-200">{currentData.bestFor}</strong>
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
                  <span className="text-xs text-neutral-400 block mb-1">Harga Lahan Rata-rata</span>
                  <span className="text-xl sm:text-2xl font-black text-white tabular-nums block">
                    {currentData.priceRange}
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-1">NJOP: {currentData.njopPrice}</span>
                </div>

                <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
                  <span className="text-xs text-neutral-400 block mb-1">Pertumbuhan Tahunan</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums block">
                    {currentData.growthRate}
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-1">Historis apresiasi 5 tahun</span>
                </div>

                <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
                  <span className="text-xs text-neutral-400 block mb-1">Potensi ROI Operasional</span>
                  <span className="text-xl sm:text-2xl font-black text-[#d5a864] tabular-nums block">
                    {currentData.roi}
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-1">
                    Rekomendasi: <strong className="text-neutral-300 font-semibold">{currentData.bestFor}</strong>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
