'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  MapPin, Layers, DollarSign, Navigation, ArrowRight,
  TrendingUp, BarChart2, ShieldCheck, Check
} from 'lucide-react';
import type { YogyakartaRegion } from './JogjaRealMap';
import type { InvestmentBlock } from './JogjaOsmMap';

// Dynamically import Leaflet maps
const JogjaRealMap = dynamic(
  () => import('./JogjaRealMap').then((m) => ({ default: m.JogjaRealMap })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[460px] bg-[#051410] rounded-2xl animate-pulse flex items-center justify-center">
        <span className="text-neutral-500 text-sm font-mono">Memuat visualisasi peta GIS...</span>
      </div>
    ),
  }
);

interface StrategicAreasProps {
  onSelectZone: (zoneName: string) => void;
}

export const StrategicAreas: React.FC<StrategicAreasProps> = ({ onSelectZone }) => {
  const [activeFilterTab, setActiveFilterTab] = useState<'zonasi' | 'harga' | 'akses'>('zonasi');
  const [selectedCluster, setSelectedCluster] = useState<string>('sleman');

  const clusters = [
    {
      id: 'semua',
      title: 'Semua Kawasan',
      subtitle: 'Lihat semua kawasan di DIY',
      region: 'semua',
      fullName: 'Daerah Istimewa Yogyakarta (Seluruh Kawasan)',
      description: 'Mencakup 5 kabupaten/kota dengan beragam karakteristik investasi dari perkotaan, koridor universitas, hingga kawasan pariwisata heritage dan bahari.',
      priceRange: 'Rp 2,5 - 18 jt/m²',
      growthRate: '+8% - 15%',
      roi: '8% - 14% / tahun',
    },
    {
      id: 'kampus',
      title: 'Kawasan Kampus',
      subtitle: 'UGM, UNY, Sanata Dharma, dll.',
      region: 'sleman',
      fullName: 'Kabupaten Sleman (Kawasan Kampus & Pelajar)',
      description: 'Didukung oleh 300.000+ mahasiswa aktif dan ekosistem pendidikan terbaik, menjadikan area ini target utama untuk kos eksklusif dan hunian komersial.',
      priceRange: 'Rp 5,5 - 14 jt/m²',
      growthRate: '+11% - 16%',
      roi: '12% - 18% / tahun',
    },
    {
      id: 'wisata',
      title: 'Kawasan Wisata',
      subtitle: 'Malioboro, Parangtritis, Kaliurang, dll.',
      region: 'bantul',
      fullName: 'Kawasan Wisata & Budaya (Kota Jogja, Sleman Utara, Bantul)',
      description: 'Koridor dengan kunjungan 7.2+ juta wisatawan per tahun, sangat potensial untuk villa sewa harian, homestay estetik, dan cafe komersial.',
      priceRange: 'Rp 4,0 - 16 jt/m²',
      growthRate: '+10% - 14%',
      roi: '14% - 22% / tahun',
    },
    {
      id: 'premium',
      title: 'Kawasan Premium',
      subtitle: 'Area elit, dekat pusat kota',
      region: 'kota',
      fullName: 'Kota Yogyakarta & Sleman Tengah (Kawasan Elit)',
      description: 'Aksesibilitas terbaik dan fasilitas kota terlengkap dengan nilai apresiasi tanah tertinggi dan stabil untuk hunian mewah keluarga.',
      priceRange: 'Rp 9,0 - 22 jt/m²',
      growthRate: '+12% - 18%',
      roi: '9% - 13% / tahun',
    },
    {
      id: 'pertumbuhan',
      title: 'Kawasan Pertumbuhan',
      subtitle: 'Kulon Progo, Sleman Barat, dll.',
      region: 'kulonprogo',
      fullName: 'Kawasan Pertumbuhan Baru (Akses YIA & Tol)',
      description: 'Pertumbuhan pesat terdorong Bandara Internasional YIA dan proyek jalan tol baru dengan harga lahan awal yang masih sangat terjangkau.',
      priceRange: 'Rp 1,8 - 5,5 jt/m²',
      growthRate: '+14% - 20%',
      roi: '9% - 15% / tahun',
    },
  ];

  const currentData = clusters.find((c) => c.id === selectedCluster) || clusters[1];

  const handleSelectCluster = (clusterId: string) => {
    setSelectedCluster(clusterId);
    const item = clusters.find((c) => c.id === clusterId);
    if (item) {
      onSelectZone(item.fullName);
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
              <span>GIS SPATIAL INTELLIGENCE</span>
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
              Analisis komprehensif 5 wilayah administratif dan koridor investasi kunci di DIY. Dilengkapi data zonasi,
              infrastruktur, dan proyeksi pertumbuhan untuk keputusan investasi yang lebih tepat.
            </p>
          </div>

          {/* Filter Pills (Zonasi, Harga Tanah, Aksesibilitas) */}
          <div className="flex items-center gap-2 bg-[#0a231c] p-1.5 rounded-full border border-white/10 shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setActiveFilterTab('zonasi')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeFilterTab === 'zonasi'
                  ? 'bg-[#d5a864] text-[#071914] shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Zonasi</span>
            </button>

            <button
              onClick={() => setActiveFilterTab('harga')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeFilterTab === 'harga'
                  ? 'bg-[#d5a864] text-[#071914] shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Harga Tanah</span>
            </button>

            <button
              onClick={() => setActiveFilterTab('akses')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeFilterTab === 'akses'
                  ? 'bg-[#d5a864] text-[#071914] shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Aksesibilitas</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Map & Selection Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Pilih Kawasan List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Pilih Kawasan
              </span>
              <span className="text-[10px] text-[#d5a864] font-mono">5 KLASTER DIY</span>
            </div>

            <div className="space-y-2.5">
              {clusters.map((c) => {
                const isActive = selectedCluster === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCluster(c.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-[#0f2e25] border-[#d5a864] ring-1 ring-[#d5a864] shadow-[0_4px_20px_rgba(213,168,100,0.15)]'
                        : 'bg-[#0a231c]/70 border-white/10 hover:border-white/20 hover:bg-[#0c2a22]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
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
                        <p className="text-xs text-neutral-400 mt-0.5">{c.subtitle}</p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-[#d5a864] translate-x-1' : 'text-neutral-500 group-hover:translate-x-1'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Large Interactive Map with Floating Summary Card */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#051410]">
            {/* Real Map Viewer */}
            <div className="relative">
              <JogjaRealMap
                selectedRegionId={currentData.region}
                onSelectRegion={(reg) => {
                  const match = clusters.find((c) => c.region === reg.id);
                  if (match) setSelectedCluster(match.id);
                }}
                onApplyZoneToCalculator={onSelectZone}
                height="460px"
              />

              {/* Floating Intelligence Card on top right of map matching screenshot */}
              <div className="absolute top-4 right-4 z-[400] w-72 bg-[#071914]/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] font-mono text-[#d5a864] uppercase font-bold tracking-wider">
                    Analisis Kawasan
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-white leading-tight">
                    {currentData.fullName.split('(')[0]}
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    {currentData.subtitle}
                  </p>
                </div>

                <div className="space-y-2 pt-1 border-t border-white/10 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Harga Tanah:</span>
                    <span className="font-bold text-[#d5a864]">{currentData.priceRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Pertumbuhan:</span>
                    <span className="font-bold text-emerald-400">{currentData.growthRate} /thn</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Potensi ROI:</span>
                    <span className="font-bold text-white">{currentData.roi}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectZone(currentData.fullName)}
                  className="w-full py-2 px-3 text-[11px] font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Box: Analisis Kawasan Terpilih & 3 Metrik Utama (Sesuai Mockup Poin 4) */}
        <div className="bg-[#0a231c]/90 rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#d5a864]">
                Analisis Kawasan Terpilih:
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentData.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
                {currentData.description}
              </p>
            </div>

            <button
              onClick={() => onSelectZone(currentData.fullName)}
              className="self-start lg:self-center px-5 py-2.5 text-xs font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] rounded-xl flex items-center gap-2 shrink-0 transition-all cursor-pointer shadow-md"
            >
              <span>Hitung Potensi Tanah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
              <span className="text-xs text-neutral-400 block mb-1">Harga Tanah Rata-rata</span>
              <span className="text-xl sm:text-2xl font-black text-white tabular-nums block">
                {currentData.priceRange}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-1">Data pasar ±2024</span>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
              <span className="text-xs text-neutral-400 block mb-1">Pertumbuhan Tahunan</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums block">
                {currentData.growthRate}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-1">Historis 5 tahun terakhir</span>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#071914] p-4.5 rounded-2xl border border-white/10">
              <span className="text-xs text-neutral-400 block mb-1">Potensi ROI</span>
              <span className="text-xl sm:text-2xl font-black text-[#d5a864] tabular-nums block">
                {currentData.roi}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-1">Estimasi operasional sewa</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
