'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  MapPin, Layers, DollarSign, Navigation, ArrowRight,
  TrendingUp, BarChart2, ShieldCheck, Check, Sparkles, Building, Globe,
  Maximize2, Minimize2, X as XIcon, ChevronLeft, ChevronRight
} from 'lucide-react';
import type { YogyakartaRegion } from './JogjaRealMap';
import type { InvestmentBlock } from './JogjaOsmMap';
import { INVESTMENT_CLUSTERS, getHighlightRegions, getHighlightKecamatan, type InvestmentCluster } from '../data/investmentClusters';
import type { SanityInvestmentCluster, SanityYogyakartaRegion } from './PageClient';

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
  sanityInvestmentClusters?: SanityInvestmentCluster[];
  sanityYogyakartaRegions?: SanityYogyakartaRegion[];
}

/** Map SanityInvestmentCluster → InvestmentCluster (shape yang dipakai komponen) */
function mapSanityCluster(s: SanityInvestmentCluster): InvestmentCluster {
  return {
    id: s.clusterId,
    title: s.title,
    subtitle: s.subtitle ?? '',
    badge: s.badge ?? '',
    bestFor: s.bestFor ?? '',
    priceBadge: s.priceBadge ?? '',
    targetRegions: (s.targetRegions ?? []) as any,
    hotspotKecamatanSlugs: s.hotspotKecamatanSlugs ?? [],
    fullName: s.fullName,
    description: s.description ?? '',
    priceRange: s.priceRange ?? '',
    njopPrice: s.njopPrice ?? '',
    growthRate: s.growthRate ?? '',
    roi: s.roi ?? '',
  };
}

export const StrategicAreas: React.FC<StrategicAreasProps> = ({
  onSelectZone,
  sanityInvestmentClusters,
  sanityYogyakartaRegions,
}) => {
  const [activeMapTab, setActiveMapTab] = useState<'zonasi' | 'blok'>('zonasi');
  const [activeFilterTab, setActiveFilterTab] = useState<'zonasi' | 'harga' | 'akses'>('zonasi');
  const [selectedCluster, setSelectedCluster] = useState<string>('kampus');
  const [selectedBlockId, setSelectedBlockId] = useState<string>('block-kampus');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClusterPanelOpen, setIsClusterPanelOpen] = useState(true);

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


  // clusters: gunakan data Sanity jika tersedia, fallback ke data statis
  const clusters: InvestmentCluster[] =
    sanityInvestmentClusters && sanityInvestmentClusters.length > 0
      ? sanityInvestmentClusters.map(mapSanityCluster)
      : INVESTMENT_CLUSTERS;


  const currentData = clusters.find((c) => c.id === selectedCluster) || clusters[1];

  // Derived: region IDs to highlight on the map for the active cluster
  const activeHighlightRegions = getHighlightRegions(selectedCluster);
  // Derived: kecamatan slugs to highlight at micro-level
  const activeHighlightKecamatan = getHighlightKecamatan(selectedCluster);

  const handleSelectCluster = (clusterId: string) => {
    setSelectedCluster(clusterId);
    const item = clusters.find((c) => c.id === clusterId);
    if (item) {
      onSelectZone(item.fullName, false);
    }
  };

  const handleBlockSelect = (block: InvestmentBlock) => {
    setSelectedBlockId(block.id);
  };


  return (
    <section
      id="area-potensial"
      className="relative py-8 sm:py-10 lg:py-12 bg-[#071914] text-white border-y border-[#d5a864]/20 overflow-hidden scroll-mt-12"
    >
      <div id="gis-spatial-intelligence" className="absolute -top-16" />
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d5a864]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#1a4a39]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3">

        {/* Top Header Row — High density & streamlined to eliminate gap */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
          <div className="space-y-1 flex-1">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#d5a864]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d5a864] animate-pulse" />
              <span>GIS SPATIAL INTELLIGENCE &amp; INFRASTRUKTUR</span>
            </div>

            <h2
              className="text-xl sm:text-2xl lg:text-[1.85rem] xl:text-[2.1rem] font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Pemetaan Spasial &amp;{' '}
              <span
                className="italic font-normal text-[#d5a864]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Kawasan Potensial
              </span>{' '}
              di Jogja
            </h2>

            <p className="text-xs sm:text-[13px] text-neutral-300 max-w-2xl leading-relaxed font-light">
              Analisis data NJOP (PBB-P2) resmi, batas administratif 5 Kab/Kota, trase mega proyek tol Solo-Jogja-YIA, dan titik magnet kampus/RS.
            </p>
          </div>

          {/* Filter Pills (Zonasi RTRW, Harga Lahan / NJOP, Akses & Jalur Tol, Blok Mikro) */}
          <div className="flex items-center gap-1.5 bg-[#0a231c] p-1 rounded-full border border-white/10 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setActiveMapTab('zonasi');
                setActiveFilterTab('zonasi');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilterTab === 'akses' && activeMapTab === 'zonasi'
                  ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Akses &amp; Jalur Tol</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMapTab('blok');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMapTab === 'blok'
                  ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Blok Mikro</span>
            </button>
          </div>
        </div>

        {/* Main Unified Interactive GIS Terminal Frame */}
        <div className="rounded-3xl bg-[#0a231c]/90 border border-white/15 shadow-2xl backdrop-blur-md overflow-hidden">
          
          {/* Top Unified Header: Terminal Peta GIS Yogyakarta & Controls */}
          <div className="p-3.5 sm:p-4 bg-[#071914] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d5a864] animate-ping shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                    Terminal Peta GIS Yogyakarta
                  </span>
                  <span className="text-[10px] text-[#d5a864] font-mono font-bold bg-[#d5a864]/10 px-2 py-0.5 rounded-full border border-[#d5a864]/30 hidden md:inline">
                    DUAL-LAYER RADAR
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                  {activeMapTab === 'zonasi'
                    ? 'Layer Makro: 5 Batas Administratif DIY, Heatmap NJOP Resmi & Jalur Tol'
                    : 'Layer Mikro: Koridor Potensial BLK-01 s/d BLK-05 OpenStreetMap'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                title="Buka peta layar penuh (Full Screen)"
                className="px-2.5 py-1.5 rounded-lg bg-[#d5a864]/15 hover:bg-[#d5a864]/30 border border-[#d5a864]/40 text-[#d5a864] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Layar Penuh</span>
              </button>
            </div>
          </div>

          {/* Body: Map Canvas (Full-Width) with Floating Cluster Panel on the Left */}
          <div className="relative w-full bg-[#051410] min-h-[560px] lg:min-h-[620px]">
            
            {/* FLOATING CLUSTER PANEL — Melayang di Atas Peta Sisi Kiri */}
            <div
              className={`absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-[400] transition-all duration-300 pointer-events-auto ${
                isClusterPanelOpen
                  ? 'w-[295px] sm:w-[335px] max-h-[calc(100%-2rem)]'
                  : 'w-auto'
              }`}
            >
              {isClusterPanelOpen ? (
                <div className="flex flex-col bg-[#071914]/94 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.65)] overflow-hidden">
                  
                  {/* Header Panel Melayang (Memuat Title Header Peta) */}
                  <div className="p-3 bg-[#081e18]/95 border-b border-white/10 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        activeMapTab === 'zonasi' && activeFilterTab === 'harga'
                          ? 'bg-amber-400 animate-pulse'
                          : activeMapTab === 'zonasi' && activeFilterTab === 'akses'
                          ? 'bg-blue-400 animate-ping'
                          : 'bg-emerald-400 animate-pulse'
                      }`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5a864] font-mono truncate">
                            {activeMapTab === 'zonasi'
                              ? activeFilterTab === 'harga'
                                ? 'NJOP RESMI (PBB-P2)'
                                : activeFilterTab === 'akses'
                                ? 'KORIDOR & TRASE TOL'
                                : 'ZONASI SPASIAL DIY'
                              : 'KORIDOR INVESTASI'}
                          </span>
                          <span className="text-[9px] text-neutral-300 font-mono bg-[#071914] px-1.5 py-0.5 rounded border border-white/10 shrink-0">
                            {clusters.length} KAWASAN
                          </span>
                        </div>
                        <span className="text-[9.5px] text-neutral-400 font-mono block truncate">
                          {activeMapTab === 'zonasi'
                            ? activeFilterTab === 'harga'
                              ? 'Heatmap Nilai Tanah Pemda'
                              : activeFilterTab === 'akses'
                              ? 'Trase Tol & 5 Exit Gate'
                              : '5 Kabupaten/Kota Terpadu'
                            : 'Polygon Analytics Mikro'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsClusterPanelOpen(false)}
                      title="Sembunyikan panel klaster (lihat peta penuh)"
                      className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1 text-[10px] shrink-0 ml-1.5"
                    >
                      <span className="text-[10px] hidden sm:inline">Tutup</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Scrollable Cluster List */}
                  <div className="p-2 space-y-1.5 overflow-y-auto max-h-[460px] sm:max-h-[480px] scrollbar-thin scrollbar-thumb-white/10">
                    {clusters.map((c) => {
                      const isActive = selectedCluster === c.id;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => handleSelectCluster(c.id)}
                          className={`w-full text-left p-2 rounded-xl border transition-all duration-200 flex flex-col gap-1 cursor-pointer relative group ${
                            isActive
                              ? 'bg-[#0f2e25] border-[#d5a864] ring-1.5 ring-[#d5a864] shadow-[0_4px_16px_rgba(213,168,100,0.25)]'
                              : 'bg-[#0a231c]/65 border-white/10 hover:border-[#d5a864]/40 hover:bg-[#0c2a22]'
                          }`}
                        >
                          {/* Row 1: Title, Icon & Badge */}
                          <div className="flex items-start justify-between gap-1.5">
                            <div className="flex items-start gap-1.5 min-w-0">
                              <div
                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isActive ? 'bg-[#d5a864] text-[#071914]' : 'bg-white/10 text-neutral-500'
                                }`}
                              >
                                {isActive ? (
                                  <Check className="w-2 h-2 stroke-[3]" />
                                ) : (
                                  <span className="w-1 h-1 rounded-full bg-neutral-500" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-white group-hover:text-[#d5a864] transition-colors leading-tight truncate">
                                  {c.title}
                                </h4>
                                <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1 leading-tight">
                                  {c.subtitle}
                                </p>
                              </div>
                            </div>

                            <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-[#071914] border border-white/15 text-[#d5a864] shrink-0 whitespace-nowrap">
                              {c.badge}
                            </span>
                          </div>

                          {/* Row 2: Cocok & NJOP */}
                          <div className="flex items-center justify-between text-[9px] sm:text-[9.5px] pt-1 border-t border-white/10 pl-5">
                            <span className="text-neutral-300 truncate">
                              <span className="text-neutral-500">Cocok: </span>
                              <strong className="text-emerald-300 font-semibold">{c.bestFor}</strong>
                            </span>
                            <span className="font-mono text-amber-300 font-semibold shrink-0 ml-1">
                              {c.njopPrice.split('-')[0].trim()}..
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Micro Footer info */}
                  <div className="p-2 bg-[#081e18]/90 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] text-neutral-400 shrink-0">
                    <Sparkles className="w-3 h-3 text-[#d5a864] shrink-0" />
                    <span className="truncate">Klik klaster untuk menyorot polygon peta</span>
                  </div>

                </div>
              ) : (
                /* Floating Minimized Trigger Pill */
                <button
                  type="button"
                  onClick={() => setIsClusterPanelOpen(true)}
                  className="flex items-center gap-2 bg-[#071914]/94 backdrop-blur-md px-3 py-2 rounded-xl border border-[#d5a864]/40 shadow-2xl text-white hover:bg-[#0f2e25] transition-all cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#d5a864] animate-pulse" />
                  <span className="text-xs font-bold group-hover:text-[#d5a864] transition-colors font-mono">
                    Pilih Klaster ({clusters.length})
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#d5a864]" />
                </button>
              )}
            </div>

            {/* TAB 1: Peta Zonasi Administratif DIY, NJOP & Infrastruktur Tol */}
            {activeMapTab === 'zonasi' && (
              <div className="transition-opacity duration-300 h-full w-full">
                <JogjaRealMap
                  selectedRegionId={activeHighlightRegions[0] ?? 'semua'}
                  highlightRegionIds={activeHighlightRegions}
                  highlightKecamatanSlugs={activeHighlightKecamatan}
                  filterMode={activeFilterTab}
                  onSelectRegion={(reg) => {
                    const match = clusters.find((c) =>
                      c.targetRegions.includes(reg.id as never)
                    );
                    if (match) setSelectedCluster(match.id);
                  }}
                  onApplyZoneToCalculator={(zoneName) => onSelectZone(zoneName, true)}
                  height="600px"
                />
              </div>
            )}

            {/* TAB 2: Peta Blok Koridor OpenStreetMap (BLK-01 s/d BLK-05) */}
            {activeMapTab === 'blok' && (
              <div className="transition-opacity duration-300 h-full w-full">
                <JogjaOsmMap
                  selectedLocationId={selectedBlockId}
                  onSelectBlock={handleBlockSelect}
                  onApplyZoneToCalculator={(zoneName) => onSelectZone(zoneName, true)}
                  height="600px"
                />
              </div>
            )}

            {/* End of Map Container */}

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
                {/* Unified Filter Pills (inside fullscreen) */}
                <div className="flex items-center gap-1 bg-[#0a231c] p-1 rounded-full border border-white/10 text-[11px]">
                  <button
                    type="button"
                    onClick={() => { setActiveMapTab('zonasi'); setActiveFilterTab('zonasi'); }}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeFilterTab === 'zonasi' && activeMapTab === 'zonasi'
                        ? 'bg-[#d5a864] text-[#071914]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>Zonasi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveMapTab('zonasi'); setActiveFilterTab('harga'); }}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeFilterTab === 'harga' && activeMapTab === 'zonasi'
                        ? 'bg-[#d5a864] text-[#071914]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <DollarSign className="w-3 h-3" />
                    <span>NJOP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveMapTab('zonasi'); setActiveFilterTab('akses'); }}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeFilterTab === 'akses' && activeMapTab === 'zonasi'
                        ? 'bg-[#d5a864] text-[#071914]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Tol</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMapTab('blok')}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeMapTab === 'blok'
                        ? 'bg-[#d5a864] text-[#071914]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Blok Mikro</span>
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

            {/* Fullscreen Map Body — stretches remaining viewport height with Floating Cluster Panel & HUD */}
            <div className="relative flex-1 overflow-hidden bg-[#051410]">
              
              {/* FLOATING CLUSTER PANEL DI FULLSCREEN MAP — Melayang di Atas Peta Sisi Kiri */}
              <div
                className={`absolute top-4 left-4 z-[500] transition-all duration-300 pointer-events-auto ${
                  isClusterPanelOpen
                    ? 'w-[300px] sm:w-[340px] max-h-[calc(100vh-140px)]'
                    : 'w-auto'
                }`}
              >
                {isClusterPanelOpen ? (
                  <div className="flex flex-col bg-[#071914]/94 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] overflow-hidden">
                    
                    {/* Header Panel Melayang (Memuat Title Header Peta) */}
                    <div className="p-3 bg-[#081e18]/95 border-b border-white/10 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          activeMapTab === 'zonasi' && activeFilterTab === 'harga'
                            ? 'bg-amber-400 animate-pulse'
                            : activeMapTab === 'zonasi' && activeFilterTab === 'akses'
                            ? 'bg-blue-400 animate-ping'
                            : 'bg-emerald-400 animate-pulse'
                        }`} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5a864] font-mono truncate">
                              {activeMapTab === 'zonasi'
                                ? activeFilterTab === 'harga'
                                  ? 'NJOP RESMI (PBB-P2)'
                                  : activeFilterTab === 'akses'
                                  ? 'KORIDOR & TRASE TOL'
                                  : 'ZONASI SPASIAL DIY'
                                : 'KORIDOR INVESTASI'}
                            </span>
                            <span className="text-[9px] text-neutral-300 font-mono bg-[#071914] px-1.5 py-0.5 rounded border border-white/10 shrink-0">
                              {clusters.length} KAWASAN
                            </span>
                          </div>
                          <span className="text-[9.5px] text-neutral-400 font-mono block truncate">
                            {activeMapTab === 'zonasi'
                              ? activeFilterTab === 'harga'
                                ? 'Heatmap Nilai Tanah Pemda'
                              : activeFilterTab === 'akses'
                                ? 'Trase Tol & 5 Exit Gate'
                                : '5 Kabupaten/Kota Terpadu'
                              : 'Polygon Analytics Mikro'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsClusterPanelOpen(false)}
                        title="Sembunyikan panel klaster (lihat peta penuh)"
                        className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1 text-[10px] shrink-0 ml-1.5"
                      >
                        <span className="text-[10px] hidden sm:inline">Tutup</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Scrollable Cluster List */}
                    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-thin scrollbar-thumb-white/10">
                      {clusters.map((c) => {
                        const isActive = selectedCluster === c.id;
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => handleSelectCluster(c.id)}
                            className={`w-full text-left p-2 rounded-xl border transition-all duration-200 flex flex-col gap-1 cursor-pointer relative group ${
                              isActive
                                ? 'bg-[#0f2e25] border-[#d5a864] ring-1.5 ring-[#d5a864] shadow-[0_4px_16px_rgba(213,168,100,0.25)]'
                                : 'bg-[#0a231c]/65 border-white/10 hover:border-[#d5a864]/40 hover:bg-[#0c2a22]'
                            }`}
                          >
                            {/* Row 1: Title, Icon & Badge */}
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="flex items-start gap-1.5 min-w-0">
                                <div
                                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isActive ? 'bg-[#d5a864] text-[#071914]' : 'bg-white/10 text-neutral-500'
                                  }`}
                                >
                                  {isActive ? (
                                    <Check className="w-2 h-2 stroke-[3]" />
                                  ) : (
                                    <span className="w-1 h-1 rounded-full bg-neutral-500" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-white group-hover:text-[#d5a864] transition-colors leading-tight truncate">
                                    {c.title}
                                  </h4>
                                  <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1 leading-tight">
                                    {c.subtitle}
                                  </p>
                                </div>
                              </div>

                              <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-[#071914] border border-white/15 text-[#d5a864] shrink-0 whitespace-nowrap">
                                {c.badge}
                              </span>
                            </div>

                            {/* Row 2: Cocok & NJOP */}
                            <div className="flex items-center justify-between text-[9px] sm:text-[9.5px] pt-1 border-t border-white/10 pl-5">
                              <span className="text-neutral-300 truncate">
                                <span className="text-neutral-500">Cocok: </span>
                                <strong className="text-emerald-300 font-semibold">{c.bestFor}</strong>
                              </span>
                              <span className="font-mono text-amber-300 font-semibold shrink-0 ml-1">
                                {c.njopPrice.split('-')[0].trim()}..
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Micro Footer */}
                    <div className="p-2 bg-[#081e18]/90 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] text-neutral-400 shrink-0">
                      <Sparkles className="w-3 h-3 text-[#d5a864] shrink-0" />
                      <span className="truncate">Sinkron otomatis dengan peta GIS DIY</span>
                    </div>

                  </div>
                ) : (
                  /* Floating Minimized Trigger Pill */
                  <button
                    type="button"
                    onClick={() => setIsClusterPanelOpen(true)}
                    className="flex items-center gap-2 bg-[#071914]/94 backdrop-blur-md px-3 py-2 rounded-xl border border-[#d5a864]/40 shadow-2xl text-white hover:bg-[#0f2e25] transition-all cursor-pointer group"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#d5a864] animate-pulse" />
                    <span className="text-xs font-bold group-hover:text-[#d5a864] transition-colors font-mono">
                      Pilih Klaster ({clusters.length})
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#d5a864]" />
                  </button>
                )}
              </div>

              {/* MAP KANVAS FULLSCREEN */}
              {activeMapTab === 'zonasi' ? (
                <JogjaRealMap
                  selectedRegionId={activeHighlightRegions[0] ?? 'semua'}
                  highlightRegionIds={activeHighlightRegions}
                  highlightKecamatanSlugs={activeHighlightKecamatan}
                  filterMode={activeFilterTab}
                  onSelectRegion={(reg) => {
                    const match = clusters.find((c) =>
                      c.targetRegions.includes(reg.id as never)
                    );
                    if (match) setSelectedCluster(match.id);
                  }}
                  onApplyZoneToCalculator={(zoneName) => {
                    onSelectZone(zoneName, true);
                    handleCloseFullscreen();
                  }}
                  height="calc(100vh - 88px)"
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
                  height="calc(100vh - 88px)"
                />
              )}

              {/* End of Fullscreen Map Canvas */}

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
                    {currentData.targetRegions.includes('kulonprogo') ? 'Tol YIA & Bandara' : currentData.targetRegions.includes('sleman') ? '5 Exit Tol Langsung' : currentData.targetRegions.includes('kota') ? '12-15 mnt ke Exit' : currentData.targetRegions.includes('bantul') ? 'Ring Road Selatan' : 'Jalur JJLS'}
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
