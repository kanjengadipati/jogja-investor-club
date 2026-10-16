'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Compass, MapPin, ArrowRight } from 'lucide-react';
import jogjaGeoDataRaw from '../data/jogjaGeoData.json';

const jogjaGeoData = jogjaGeoDataRaw as {
  sleman: [number, number][];
  jogja: [number, number][];
  bantul: [number, number][];
  gunungkidul: [number, number][];
  kulonprogo: [number, number][];
  diy_outer: [number, number][];
};

export interface YogyakartaRegion {
  id: string;
  name: string;
  fullName: string;
  code: string;
  lat: number;
  lng: number;
  recommended: string;
  landPrice: string;
  yieldEst: string;
  occupancy: string;
  kdb: string;
  highlights: string[];
  desc: string;
  color: string;
  polygon: [number, number][];
}

// -------------------------------------------------------------
// OFFICIAL GEOGRAPHIC BOUNDARIES (OPENSTREETMAP / DIY GOV MAPPED)
// -------------------------------------------------------------

export const DIY_OUTER_PERIMETER: [number, number][] = jogjaGeoData.diy_outer;

export const DIY_ALL_REGION: YogyakartaRegion = {
  id: 'semua',
  name: 'Semua Kawasan DIY',
  fullName: 'Daerah Istimewa Yogyakarta (Seluruh 5 Wilayah Terpadu)',
  code: 'DIY-ALL',
  lat: -7.82,
  lng: 110.38,
  recommended: 'Rumah Mewah, Villa Resort & Kos Eksklusif',
  landPrice: 'Rp 1.5 Jt - 22 Jt / m²',
  yieldEst: '12% - 19% / tahun',
  occupancy: '85% - 98%',
  kdb: 'KDB 50% - 70% · Bergantung Zonasi RTRW',
  highlights: [
    'Sleman (Kampus & Wisata)',
    'Kota Jogja (Pusat Heritage)',
    'Bantul (Seni & Industri Kreatif)',
    'Gunungkidul (Pantai & Geowisata)',
    'Kulon Progo (Aerotropolis YIA)',
  ],
  desc: 'Peluang investasi properti terpadu di seluruh Daerah Istimewa Yogyakarta: kos eksklusif mahasiswa di Sleman, hunian heritage & homestay di Kota Jogja, villa asri di Kaliurang & Bantul, hingga resort pesisir di Gunungkidul.',
  color: '#d5a864',
  polygon: DIY_OUTER_PERIMETER,
};

export const YOGYAKARTA_REGIONS: YogyakartaRegion[] = [
  {
    id: 'sleman',
    name: 'Sleman',
    fullName: 'Kabupaten Sleman (Kawasan Kampus & Wisata Kaliurang)',
    code: 'REG-SLM',
    lat: -7.685,
    lng: 110.385,
    recommended: 'Kos Eksklusif, Co-Living Mahasiswa & Villa Kaliurang',
    landPrice: 'Rp 4.5 Jt - 14 Jt / m²',
    yieldEst: '14% - 19% / tahun',
    occupancy: '94% - 98%',
    kdb: 'KDB 60% · Maksimal 3-4 Lantai',
    highlights: ['Kampus UGM & UNY', 'Kawasan Seturan & Jakal', 'Wisata Kaliurang & Merapi'],
    desc: 'Sentra pendidikan terbesar di DIY dengan 300.000+ mahasiswa aktif. Permintaan kos eksklusif dan villa staycation tertinggi sepanjang tahun.',
    color: '#10b981', // Emerald
    polygon: jogjaGeoData.sleman,
  },
  {
    id: 'kota',
    name: 'Kota Yogyakarta',
    fullName: 'Kota Yogyakarta (Pusat Heritage & Komersial)',
    code: 'REG-KTA',
    lat: -7.7972,
    lng: 110.3705,
    recommended: 'Boutique Homestay, Hotel Transit & Rumah Heritage Mewah',
    landPrice: 'Rp 8 Jt - 22 Jt / m²',
    yieldEst: '12% - 15% / tahun',
    occupancy: '88% - 94%',
    kdb: 'KDB 70% · Zona Pusat Kota & Bisnis',
    highlights: ['Kawasan Malioboro', 'Keraton Ngayogyakarta', 'Kotabaru & Tugu Jogja'],
    desc: 'Jantung denyut budaya dan pariwisata urban DIY. Keterbatasan lahan kosong menjadikan aset properti di sini bernilai likuiditas dan apresiasi kapital tertinggi.',
    color: '#f59e0b', // Amber
    polygon: jogjaGeoData.jogja,
  },
  {
    id: 'bantul',
    name: 'Bantul',
    fullName: 'Kabupaten Bantul (Kawasan Seni & Budaya Kasihan-Sewon)',
    code: 'REG-BTL',
    lat: -7.8900,
    lng: 110.3440,
    recommended: 'Rumah Modern Tropis, Villa Etnik & Guest House Seni',
    landPrice: 'Rp 3 Jt - 8.5 Jt / m²',
    yieldEst: '11% - 16% / tahun',
    occupancy: '82% - 89%',
    kdb: 'KDB 60% · Sentra Residensial Nyaman',
    highlights: ['Sentra Gerabah Kasongan', 'Kampus ISI Yogyakarta', 'Pantai Parangtritis'],
    desc: 'Lingkungan asri bernuansa seni dan budaya kreatif. Sangat diminati untuk cluster perumahan keluarga modern dan homestay pelancong seni mancanegara.',
    color: '#3b82f6', // Blue
    polygon: jogjaGeoData.bantul,
  },
  {
    id: 'gunungkidul',
    name: 'Gunungkidul',
    fullName: 'Kabupaten Gunungkidul (Kawasan Wisata Pesisir & Geopark)',
    code: 'REG-GKD',
    lat: -7.9650,
    lng: 110.6000,
    recommended: 'Boutique Resort Tebing, Glamping & Villa Wisata Pantai',
    landPrice: 'Rp 1.5 Jt - 5 Jt / m²',
    yieldEst: '13% - 18% / tahun',
    occupancy: '72% - 85%',
    kdb: 'KDB 40% - 50% · Kawasan Konservasi & Wisata',
    highlights: ['Pantai Indrayanti & Baron', 'Goa Pindul', 'Wonosari Sentra Bisnis'],
    desc: 'Kawasan pesisir eksotis dengan pertumbuhan destinasi pariwisata alam tercepat di DIY. Potensi capital gain tanah jangka panjang yang sangat agresif.',
    color: '#8b5cf6', // Purple
    polygon: jogjaGeoData.gunungkidul,
  },
  {
    id: 'kulonprogo',
    name: 'Kulon Progo',
    fullName: 'Kabupaten Kulon Progo (Kawasan Aerotropolis YIA)',
    code: 'REG-KLP',
    lat: -7.8200,
    lng: 110.1600,
    recommended: 'Hotel Transit Bandara, Guest House & Perumahan Baru',
    landPrice: 'Rp 2 Jt - 6.5 Jt / m²',
    yieldEst: '12% - 16% / tahun',
    occupancy: '78% - 86%',
    kdb: 'KDB 50% - 60% · Koridor Infrastruktur Baru',
    highlights: ['Bandara YIA Glagah', 'Kota Wates', 'Perbukitan Menoreh'],
    desc: 'Pintu gerbang udara internasional DIY. Mengalami akselerasi pembangunan infrastruktur jalan tol bandara dan kawasan logistik aerotropolis.',
    color: '#06b6d4', // Cyan
    polygon: jogjaGeoData.kulonprogo,
  },
];

interface JogjaRealMapProps {
  selectedRegionId?: string;
  onSelectRegion: (reg: YogyakartaRegion) => void;
  onApplyZoneToCalculator: (zoneName: string) => void;
  compact?: boolean;
  height?: string;
}

export const JogjaRealMap: React.FC<JogjaRealMapProps> = ({
  selectedRegionId = 'semua',
  onSelectRegion,
  onApplyZoneToCalculator,
  height = '460px',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polygonsRef = useRef<{ [key: string]: L.Polygon }>({});
  const outerBorderRef = useRef<L.Polygon | null>(null);

  const [mapTheme, setMapTheme] = useState<'dark-hud' | 'light' | 'street'>('dark-hud');
  const [activeRegionId, setActiveRegionId] = useState(selectedRegionId);

  useEffect(() => {
    if (selectedRegionId && selectedRegionId !== activeRegionId) {
      setActiveRegionId(selectedRegionId);
    }
  }, [selectedRegionId]);

  const isAll = activeRegionId === 'semua';
  const activeRegion = isAll
    ? DIY_ALL_REGION
    : YOGYAKARTA_REGIONS.find((r) => r.id === activeRegionId) || DIY_ALL_REGION;

  // Exact Bounding Box of DIY Land Territory:
  // South: -8.22 (Sadeng/Wediombo coast)
  // North: -7.53 (Puncak Merapi)
  // West: 110.00 (Congot / Bogowonto)
  // East: 110.85 (Wonogiri border)
  const diyBounds = L.latLngBounds([-8.22, 110.00], [-7.53, 110.85]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [-7.82, 110.38],
      zoomSnap: 0.1,
      zoomDelta: 0.5,
      minZoom: 8.5,
      maxZoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Place zoom controls at bottom-left to prevent overlap
    L.control.zoom({ position: 'bottomleft' }).addTo(map);
    mapInstanceRef.current = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    }).addTo(map);

    const tilePane = map.getPane('tilePane');
    if (tilePane) {
      if (mapTheme === 'dark-hud') {
        tilePane.style.filter =
          'invert(100%) hue-rotate(180deg) brightness(88%) contrast(110%) saturate(60%)';
      } else if (mapTheme === 'light') {
        tilePane.style.filter = 'saturate(0.55) brightness(1.03) contrast(0.96)';
      } else {
        tilePane.style.filter = 'none';
      }
    }

    // 1. Draw Individual Official Administrative Regions
    YOGYAKARTA_REGIONS.forEach((reg) => {
      const isSelected = reg.id === activeRegionId;

      const polygon = L.polygon(reg.polygon, {
        color: reg.color,
        fillColor: reg.color,
        fillOpacity: isAll ? 0.25 : isSelected ? 0.45 : 0.12,
        weight: isAll ? 1.5 : isSelected ? 3 : 1.2,
        opacity: isAll ? 0.85 : isSelected ? 1 : 0.65,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      polygon.on('click', () => {
        setActiveRegionId(reg.id);
        onSelectRegion(reg);
        map.fitBounds(polygon.getBounds(), { padding: [30, 30], maxZoom: 12, duration: 0.6 });
      });

      polygonsRef.current[reg.id] = polygon;

      // Interactive label pin
      const pinIcon = L.divIcon({
        className: 'custom-diy-pin',
        html: `
          <div style="display: flex; align-items: center; gap: 5px; cursor: pointer; transform: translate(-8px, -8px);">
            <div style="width: 12px; height: 12px; border-radius: 9999px; background-color: #071914; border: 2.5px solid ${reg.color}; box-shadow: 0 0 10px ${reg.color}; flex-shrink: 0;"></div>
            <div style="font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 800; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.9); background: rgba(7,25,20,0.92); padding: 2.5px 7px; border-radius: 6px; border: 1px solid ${reg.color}60; white-space: nowrap;">
              ${reg.name}
            </div>
          </div>
        `,
        iconSize: [120, 24],
        iconAnchor: [6, 6],
      });

      const marker = L.marker([reg.lat, reg.lng], { icon: pinIcon }).addTo(map);

      marker.on('click', () => {
        setActiveRegionId(reg.id);
        onSelectRegion(reg);
        map.fitBounds(polygon.getBounds(), { padding: [30, 30], maxZoom: 12, duration: 0.6 });
      });

      markersRef.current[reg.id] = marker;
    });

    // 2. Draw Unified Outer Perimeter of D.I. Yogyakarta (Garis Luar Nyata 100% Presisi)
    const outerBorder = L.polygon(DIY_OUTER_PERIMETER, {
      color: '#e6c378',
      weight: 2.6,
      fill: false,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: '6, 5',
    }).addTo(map);
    outerBorderRef.current = outerBorder;

    // Initial fit bounds to fit 100% of DIY completely in view
    map.fitBounds(diyBounds, {
      padding: [16, 16],
      animate: false,
    });

    const timer = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(diyBounds, { padding: [16, 16], animate: false });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapTheme]);

  // Adjust bounds & highlights when activeRegionId changes
  useEffect(() => {
    Object.keys(polygonsRef.current).forEach((regId) => {
      const poly = polygonsRef.current[regId];
      const isSelected = regId === activeRegionId;
      const reg = YOGYAKARTA_REGIONS.find((r) => r.id === regId);
      if (poly && reg) {
        poly.setStyle({
          fillOpacity: isAll ? 0.25 : isSelected ? 0.45 : 0.12,
          weight: isAll ? 1.5 : isSelected ? 3 : 1.2,
          color: reg.color,
          fillColor: reg.color,
          opacity: isAll ? 0.85 : isSelected ? 1 : 0.6,
        });
      }
    });

    if (mapInstanceRef.current) {
      if (isAll) {
        mapInstanceRef.current.fitBounds(diyBounds, { padding: [16, 16], duration: 0.6 });
      } else {
        const poly = polygonsRef.current[activeRegionId];
        if (poly) {
          mapInstanceRef.current.fitBounds(poly.getBounds(), {
            padding: [30, 30],
            maxZoom: 12,
            duration: 0.6,
          });
        }
      }
    }
  }, [activeRegionId]);

  const handleRegionClick = (reg: YogyakartaRegion) => {
    setActiveRegionId(reg.id);
    onSelectRegion(reg);
  };

  const handleSelectAll = () => {
    setActiveRegionId('semua');
    onSelectRegion(DIY_ALL_REGION);
  };

  return (
    <div className="space-y-3.5">
      {/* Modern High-Tech GIS Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#051410] ring-1 ring-white/10">
        
        {/* HUD Top Bar Floating Over Map */}
        <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-[#071914]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-white flex items-center gap-2 text-xs shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-[#d5a864] tracking-tight">GIS SPATIAL DIY</span>
            <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
              BATAS RESMI · 5 WILAYAH PRESISI
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#071914]/90 backdrop-blur-md p-1 rounded-xl border border-white/15 text-[11px] shadow-lg pointer-events-auto">
            <button
              type="button"
              onClick={() => setMapTheme('dark-hud')}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                mapTheme === 'dark-hud'
                  ? 'bg-[#d5a864] text-[#071914] shadow-xs'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              GIS Dark
            </button>
            <button
              type="button"
              onClick={() => setMapTheme('light')}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                mapTheme === 'light'
                  ? 'bg-[#d5a864] text-[#071914] shadow-xs'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Minimalis
            </button>
            <button
              type="button"
              onClick={() => setMapTheme('street')}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                mapTheme === 'street'
                  ? 'bg-[#d5a864] text-[#071914] shadow-xs'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              OSM Jalan
            </button>
          </div>
        </div>

        {/* Leaflet Mount Div */}
        <div
          ref={mapContainerRef}
          style={{ height }}
          className="w-full z-0 bg-[#071914]"
        />

        {/* Region Selector Toolbar under map */}
        <div className="p-3 bg-[#0a231c]/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-1 flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#d5a864]" />
              Zonasi:
            </span>

            {/* Semua Wilayah */}
            <button
              type="button"
              onClick={handleSelectAll}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                isAll
                  ? 'bg-[#d5a864] text-[#071914] shadow-md ring-1 ring-[#d5a864]'
                  : 'bg-[#071914] text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#d5a864]" />
              <span>Semua DIY</span>
            </button>

            {YOGYAKARTA_REGIONS.map((reg) => {
              const isSelected = activeRegionId === reg.id;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => handleRegionClick(reg)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#d5a864] text-[#071914] shadow-md ring-1 ring-[#d5a864]'
                      : 'bg-[#071914] text-neutral-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: reg.color }}
                  />
                  <span>{reg.name}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-neutral-400 hidden sm:inline italic">
            💡 Seluruh 5 wilayah terhubung menyatu
          </span>
        </div>
      </div>

      {/* Selected Region Profile Detail HUD Card */}
      <div className="bg-[#0a231c]/90 border border-white/15 rounded-2xl p-5 shadow-xl space-y-4 text-white backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                style={{ backgroundColor: activeRegion.color }}
              />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#d5a864]">
                {activeRegion.code} · {isAll ? 'OVERVIEW SELURUH DIY' : 'SPASIAL TERPILIH'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
              {activeRegion.fullName}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-[#071914] border border-[#d5a864]/40 text-[#d5a864] text-xs font-bold rounded-xl shadow-xs tabular-nums">
              Est. Yield: {activeRegion.yieldEst}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          {activeRegion.desc}
        </p>

        {/* 4 High-Tech Data Grid Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Harga Lahan
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block mt-1 tabular-nums">
              {activeRegion.landPrice}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Tingkat Okupansi
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-1 tabular-nums">
              {activeRegion.occupancy}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Aturan KDB
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-300 block mt-1 truncate">
              {activeRegion.kdb}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Rekomendasi
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#d5a864] block mt-1 truncate">
              {activeRegion.recommended}
            </span>
          </div>
        </div>

        {/* Action Button & Landmarks */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div className="text-xs text-neutral-300 flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#d5a864] shrink-0" />
            <span className="truncate">Landmark: {activeRegion.highlights.join(' · ')}</span>
          </div>

          <button
            type="button"
            onClick={() => onApplyZoneToCalculator(activeRegion.fullName)}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#d5a864] to-[#e4bd7d] hover:brightness-105 active:scale-98 text-[#071914] text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Terapkan Kawasan ke Kalkulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
