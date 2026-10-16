import React, { useState } from 'react';
import { JogjaOsmMap, InvestmentBlock } from './JogjaOsmMap';
import { JogjaRealMap, YogyakartaRegion } from './JogjaRealMap';
import { Check, MapPin, Globe, Layers, Sparkles, TrendingUp, Users, Compass, ShieldCheck } from 'lucide-react';

interface StrategicAreasProps {
  onSelectZone: (zoneName: string) => void;
}

export const StrategicAreas: React.FC<StrategicAreasProps> = ({ onSelectZone }) => {
  const [activeMapTab, setActiveMapTab] = useState<'zonasi' | 'blok'>('zonasi');
  const [selectedBlockId, setSelectedBlockId] = useState<string>('semua');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('semua');
  const [activeCategory, setActiveCategory] = useState<'semua' | 'kampus' | 'wisata' | 'premium'>('semua');

  const handleBlockSelect = (block: InvestmentBlock) => {
    setSelectedBlockId(block.id);
  };

  const handleRegionSelect = (reg: YogyakartaRegion) => {
    setSelectedRegionId(reg.id);
  };

  const handleCategoryClick = (
    catKey: 'semua' | 'kampus' | 'wisata' | 'premium',
    targetBlockId: string,
    targetRegionId: string
  ) => {
    setActiveCategory(catKey);
    setSelectedBlockId(targetBlockId);
    setSelectedRegionId(targetRegionId);
  };

  return (
    <section id="area-potensial" className="relative py-18 lg:py-24 bg-gradient-to-b from-[#071914] via-[#09221b] to-[#071914] text-white border-y border-[#d5a864]/20 overflow-hidden">
      
      {/* Background High-Tech Accent Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d5a864]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d5a864_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Top Header & Intelligence Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#d5a864] bg-[#071914] border border-[#d5a864]/40 px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GIS SPATIAL INTELLIGENCE · YOGYAKARTA</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              Pemetaan Spasial & <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#d5a864]">
                Kawasan Potensial di Jogja
              </span>
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed font-light">
              Analisis komprehensif 5 wilayah administratif dan koridor investasi komersial DIY. Dilengkapi kalkulasi yield historis, kepadatan demografi, dan proyeksi apresiasi kapital untuk keputusan investasi lahan yang presisi.
            </p>
          </div>

          {/* Quick Real-Time Market Metric Tickers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:max-w-xl shrink-0">
            <div className="p-3 rounded-xl bg-[#0a231c]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                <TrendingUp className="w-3 h-3 text-[#d5a864]" />
                <span>Capital Gain</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-emerald-400 block mt-1 tabular-nums">
                +12.4% / thn
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0a231c]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                <Users className="w-3 h-3 text-[#d5a864]" />
                <span>Mhs. Aktif</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-white block mt-1 tabular-nums">
                300.000+
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0a231c]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                <Compass className="w-3 h-3 text-[#d5a864]" />
                <span>Wisatawan</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-[#d5a864] block mt-1 tabular-nums">
                7.2 Jt / thn
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0a231c]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                <ShieldCheck className="w-3 h-3 text-[#d5a864]" />
                <span>Tingkat Sewa</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-blue-400 block mt-1 tabular-nums">
                94% - 98%
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Category Selector & Right Map GIS Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: 4 Category Intelligence Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#d5a864] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Karakteristik & Klaster Investasi</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                PILIH UNTUK NAVIGASI
              </span>
            </div>

            <div className="space-y-3">
              {/* Card 1 (Default Active): Semua Kawasan */}
              <div
                onClick={() => handleCategoryClick('semua', 'semua', 'semua')}
                className={`relative flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  activeCategory === 'semua'
                    ? 'bg-[#0f2e25] border-[#d5a864] shadow-[0_0_24px_rgba(213,168,100,0.18)] ring-1 ring-[#d5a864]'
                    : 'bg-[#0a231c]/70 border-white/10 hover:border-white/20 hover:bg-[#0c2a22]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    activeCategory === 'semua'
                      ? 'bg-[#d5a864] text-[#071914] shadow-sm'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-white leading-tight">
                      Semua Kawasan
                    </h4>
                    {activeCategory === 'semua' ? (
                      <span className="text-[10px] font-mono uppercase font-bold text-[#d5a864] tracking-wider px-2 py-0.5 bg-[#d5a864]/20 rounded-md border border-[#d5a864]/40">
                        AKTIF
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">
                        SELURUH DIY
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 leading-tight mt-1">
                    (Sleman, Kota Jogja, Bantul, Gunungkidul, Kulon Progo)
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-[#d5a864]">
                    Eksplorasi seluruh potensi lahan & prospek investasi se-DIY
                  </span>
                </div>
              </div>

              {/* Card 2: Kawasan Kampus */}
              <div
                onClick={() => handleCategoryClick('kampus', 'block-kampus', 'sleman')}
                className={`relative flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  activeCategory === 'kampus'
                    ? 'bg-[#0f2e25] border-[#d5a864] shadow-[0_0_24px_rgba(213,168,100,0.18)] ring-1 ring-[#d5a864]'
                    : 'bg-[#0a231c]/70 border-white/10 hover:border-white/20 hover:bg-[#0c2a22]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    activeCategory === 'kampus'
                      ? 'bg-[#d5a864] text-[#071914] shadow-sm'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-white leading-tight">
                      Kawasan Kampus
                    </h4>
                    {activeCategory === 'kampus' ? (
                      <span className="text-[10px] font-mono uppercase font-bold text-[#d5a864] tracking-wider px-2 py-0.5 bg-[#d5a864]/20 rounded-md border border-[#d5a864]/40">
                        AKTIF
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                        YIELD 19%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 leading-tight mt-1">
                    (UII, UGM, Sanata Dharma, UPN, Atma Jaya)
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-400">
                    Sangat cocok untuk Kos Eksklusif & Co-Living
                  </span>
                </div>
              </div>

              {/* Card 3: Kawasan Wisata */}
              <div
                onClick={() => handleCategoryClick('wisata', 'block-wisata', 'sleman')}
                className={`relative flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  activeCategory === 'wisata'
                    ? 'bg-[#0f2e25] border-[#d5a864] shadow-[0_0_24px_rgba(213,168,100,0.18)] ring-1 ring-[#d5a864]'
                    : 'bg-[#0a231c]/70 border-white/10 hover:border-white/20 hover:bg-[#0c2a22]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    activeCategory === 'wisata'
                      ? 'bg-[#d5a864] text-[#071914] shadow-sm'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-white leading-tight">
                      Kawasan Wisata
                    </h4>
                    {activeCategory === 'wisata' ? (
                      <span className="text-[10px] font-mono uppercase font-bold text-[#d5a864] tracking-wider px-2 py-0.5 bg-[#d5a864]/20 rounded-md border border-[#d5a864]/40">
                        AKTIF
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                        DAILY STAY
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 leading-tight mt-1">
                    (Malioboro, Prambanan, Kaliurang, Pantai)
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-amber-400">
                    Sangat cocok untuk Villa Staycation & Homestay Harian
                  </span>
                </div>
              </div>

              {/* Card 4: Kawasan Premium */}
              <div
                onClick={() => handleCategoryClick('premium', 'block-premium', 'kota')}
                className={`relative flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  activeCategory === 'premium'
                    ? 'bg-[#0f2e25] border-[#d5a864] shadow-[0_0_24px_rgba(213,168,100,0.18)] ring-1 ring-[#d5a864]'
                    : 'bg-[#0a231c]/70 border-white/10 hover:border-white/20 hover:bg-[#0c2a22]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    activeCategory === 'premium'
                      ? 'bg-[#d5a864] text-[#071914] shadow-sm'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-white leading-tight">
                      Kawasan Premium
                    </h4>
                    {activeCategory === 'premium' ? (
                      <span className="text-[10px] font-mono uppercase font-bold text-[#d5a864] tracking-wider px-2 py-0.5 bg-[#d5a864]/20 rounded-md border border-[#d5a864]/40">
                        AKTIF
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">
                        LUXURY RESIDENCE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 leading-tight mt-1">
                    (Daerah strategis, ring road, akses mudah)
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-blue-400">
                    Sangat cocok untuk Rumah Mewah Tropis & Cluster Elit
                  </span>
                </div>
              </div>
            </div>

            {/* Educational Pro Tip Note */}
            <div className="text-xs text-neutral-300 bg-[#0a231c]/90 p-4 rounded-2xl border border-white/10 flex items-start gap-2.5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#d5a864] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-light">
                Gunakan tab <strong className="text-white">Zonasi</strong> untuk batas wilayah administratif 5 Kab/Kota DIY, atau tab <strong className="text-white">Blok</strong> untuk analisis mikro koridor komersial & menandai koordinat kavling tanah Anda.
              </p>
            </div>
          </div>

          {/* Right Column: High-Tech GIS Command Center (Zonasi di Kiri, Blok di Kanan) (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Command Header Toolbar: Tab Kiri 'Zonasi', Tab Kanan 'Blok' */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a231c]/90 p-2 sm:p-2.5 rounded-2xl border border-white/15 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 px-2">
                <span className="w-2 h-2 rounded-full bg-[#d5a864] animate-ping" />
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                  Terminal Peta GIS Yogyakarta
                </span>
                <span className="text-[10px] text-neutral-400 font-mono hidden md:inline">
                  · DUAL-LAYER RADAR
                </span>
              </div>

              {/* Segmented Tab Buttons: Zonasi (Kiri) | Blok (Kanan) */}
              <div className="flex items-center gap-1.5 bg-[#071914] p-1 rounded-xl border border-white/15">
                {/* Tab Kiri: Zonasi */}
                <button
                  type="button"
                  onClick={() => setActiveMapTab('zonasi')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                    activeMapTab === 'zonasi'
                      ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Zonasi</span>
                </button>

                {/* Tab Kanan: Blok */}
                <button
                  type="button"
                  onClick={() => setActiveMapTab('blok')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                    activeMapTab === 'blok'
                      ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Blok</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Peta Zonasi Administratif DIY */}
            {activeMapTab === 'zonasi' && (
              <div className="transition-opacity duration-300">
                <JogjaRealMap
                  selectedRegionId={selectedRegionId}
                  onSelectRegion={handleRegionSelect}
                  onApplyZoneToCalculator={onSelectZone}
                  compact={true}
                  height="440px"
                />
              </div>
            )}

            {/* Tab 2: Peta Blok Koridor OpenStreetMap & Custom Land Pin */}
            {activeMapTab === 'blok' && (
              <div className="transition-opacity duration-300">
                <JogjaOsmMap
                  selectedLocationId={selectedBlockId}
                  onSelectBlock={handleBlockSelect}
                  onApplyZoneToCalculator={onSelectZone}
                  height="440px"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
