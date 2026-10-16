'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropertyType } from '../types/property';
import { MapPin, Crosshair, ArrowRight, Layers, Target, Compass } from 'lucide-react';

export interface InvestmentBlock {
  id: string;
  name: string;
  code: string;
  region: string;
  color: string;
  recommended: PropertyType;
  recommendedLabel: string;
  landPrice: string;
  yieldEst: string;
  occupancy: string;
  kdb: string;
  subDistricts: string[];
  description: string;
  polygon: [number, number][]; // lat, lng points
  center: [number, number];
}

export const ALL_BLOCKS_OVERVIEW: InvestmentBlock = {
  id: 'semua',
  name: 'Semua Koridor Blok Investasi Jogja',
  code: 'BLK-ALL',
  region: 'Seluruh DIY',
  color: '#d5a864',
  recommended: 'kos',
  recommendedLabel: 'Kos Eksklusif, Villa & Rumah Mewah',
  landPrice: 'Rp 2.5 Jt - 18 Jt / m²',
  yieldEst: '12% - 22% / thn',
  occupancy: '82% - 98%',
  kdb: 'KDB 50% - 70% · Bergantung Zona Koridor',
  subDistricts: ['Sleman Kampus', 'Wisata Kaliurang', 'Mlati Elit', 'Kota Heritage', 'Bantul Budaya'],
  description:
    'Eksplorasi seluruh koridor investasi strategis di Yogyakarta. Anda juga dapat mengklik sembarang titik pada peta OSM untuk menandai lokasi spesifik kavling tanah Anda secara presisi dengan koordinat GPS real-time.',
  polygon: [],
  center: [-7.765, 110.385],
};

export const INVESTMENT_BLOCKS: InvestmentBlock[] = [
  {
    id: 'block-kampus',
    code: 'BLK-01',
    name: 'Blok Edukasi & Kampus Sleman Timur',
    region: 'Sleman',
    color: '#10b981', // Emerald
    recommended: 'kos',
    recommendedLabel: 'Kos Eksklusif & Co-Living Mahasiswa',
    landPrice: 'Rp 7 Jt - 14 Jt / m²',
    yieldEst: '15% - 19% / thn',
    occupancy: '94% - 98%',
    kdb: 'KDB 60% · Maks 3-4 Lantai',
    subDistricts: ['Seturan', 'Condongcatur', 'Babarsari', 'Depok', 'Jakal Bawah'],
    description:
      'Kawasan dengan konsentrasi kampus terbesar: UGM, UNY, UPN, Atma Jaya, YKPN. Permintaan sewa kos tak pernah surut sepanjang tahun.',
    polygon: [
      [-7.748, 110.388],
      [-7.742, 110.422],
      [-7.782, 110.425],
      [-7.785, 110.388],
    ],
    center: [-7.765, 110.406],
  },
  {
    id: 'block-wisata',
    code: 'BLK-02',
    name: 'Blok Wisata Alam Kaliurang & Pakem',
    region: 'Sleman',
    color: '#f59e0b', // Amber
    recommended: 'villa',
    recommendedLabel: 'Boutique Villa & Private Pool Resort',
    landPrice: 'Rp 2.5 Jt - 6 Jt / m²',
    yieldEst: '16% - 22% / thn',
    occupancy: '75% - 88%',
    kdb: 'KDB 50% · Area Resapan Alam',
    subDistricts: ['Kaliurang', 'Pakem', 'Ngaglik Utara', 'Turi', 'Cangkringan'],
    description:
      'Hawa sejuk lereng Merapi, pemandangan asri, dan akses dekat obyek wisata. Ideal untuk villa sewa harian wisatawan luar kota.',
    polygon: [
      [-7.585, 110.408],
      [-7.575, 110.448],
      [-7.665, 110.442],
      [-7.675, 110.398],
    ],
    center: [-7.625, 110.424],
  },
  {
    id: 'block-premium',
    code: 'BLK-03',
    name: 'Blok Hunian Elit Sleman Tengah & Mlati',
    region: 'Sleman',
    color: '#3b82f6', // Blue
    recommended: 'rumah',
    recommendedLabel: 'Rumah Mewah Tropis & Cluster Modern',
    landPrice: 'Rp 6 Jt - 12 Jt / m²',
    yieldEst: '12% - 15% / thn (Apresiasi)',
    occupancy: '88% - 93%',
    kdb: 'KDB 60% · Lingkungan Tertata',
    subDistricts: ['Mlati', 'Sinduadi', 'Gamping Utara', 'Jombor'],
    description:
      'Akses sangat dekat ke Jogja City Mall, RS Sardjito, dan ring road utara. Sangat diminati kalangan profesional dan keluarga mapan.',
    polygon: [
      [-7.732, 110.342],
      [-7.732, 110.382],
      [-7.775, 110.378],
      [-7.770, 110.338],
    ],
    center: [-7.752, 110.360],
  },
  {
    id: 'block-kota',
    code: 'BLK-04',
    name: 'Blok Heritage & Pusat Kota Yogyakarta',
    region: 'Kota Yogyakarta',
    color: '#8b5cf6', // Purple
    recommended: 'rumah',
    recommendedLabel: 'Boutique Homestay & Rumah Heritage',
    landPrice: 'Rp 8 Jt - 18 Jt / m²',
    yieldEst: '12% - 16% / thn',
    occupancy: '85% - 92%',
    kdb: 'KDB 70% · Zona Pusat Kota',
    subDistricts: ['Danurejan', 'Gondokusuman', 'Kraton', 'Malioboro'],
    description:
      'Pusat denyut budaya dan pariwisata Jogja. Nilai tanah tinggi dengan okupansi stabil bagi wisatawan urban.',
    polygon: [
      [-7.780, 110.355],
      [-7.778, 110.392],
      [-7.818, 110.388],
      [-7.815, 110.352],
    ],
    center: [-7.798, 110.372],
  },
  {
    id: 'block-bantul',
    code: 'BLK-05',
    name: 'Blok Budaya & Industri Kreatif Kasihan-Sewon',
    region: 'Bantul',
    color: '#06b6d4', // Cyan
    recommended: 'villa',
    recommendedLabel: 'Boutique Villa Etnik & Guest House',
    landPrice: 'Rp 3 Jt - 7.5 Jt / m²',
    yieldEst: '13% - 17% / thn',
    occupancy: '82% - 89%',
    kdb: 'KDB 60% · Sentra Kriya',
    subDistricts: ['Kasihan', 'Sewon', 'Kasongan', 'Bangunjiwo'],
    description:
      'Dikelilingi sentra keramik Kasongan dan kampus seni ISI. Suasana tenang dengan nuansa perdesaan artistik.',
    polygon: [
      [-7.822, 110.315],
      [-7.820, 110.370],
      [-7.878, 110.362],
      [-7.872, 110.310],
    ],
    center: [-7.848, 110.338],
  },
];

interface JogjaOsmMapProps {
  selectedLocationId?: string;
  onSelectBlock: (block: InvestmentBlock) => void;
  onApplyZoneToCalculator: (zoneName: string) => void;
  onCustomPinPlaced?: (coords: { lat: number; lng: number; approxZone: string }) => void;
  height?: string;
}

export const JogjaOsmMap: React.FC<JogjaOsmMapProps> = ({
  selectedLocationId = 'semua',
  onSelectBlock,
  onApplyZoneToCalculator,
  onCustomPinPlaced,
  height = '380px',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<{ [key: string]: L.Polygon }>({});
  const customMarkerRef = useRef<L.Marker | null>(null);

  const [activeBlockId, setActiveBlockId] = useState<string>(selectedLocationId);
  const [mapTheme, setMapTheme] = useState<'dark-hud' | 'light' | 'street'>('dark-hud');
  const [customPinInfo, setCustomPinInfo] = useState<{
    lat: number;
    lng: number;
    approxZone: string;
  } | null>(null);

  useEffect(() => {
    if (selectedLocationId && selectedLocationId !== activeBlockId) {
      setActiveBlockId(selectedLocationId);
    }
  }, [selectedLocationId]);

  const isAll = activeBlockId === 'semua';
  const activeBlock = isAll
    ? ALL_BLOCKS_OVERVIEW
    : INVESTMENT_BLOCKS.find((b) => b.id === activeBlockId) || ALL_BLOCKS_OVERVIEW;

  const getNearestBlock = (lat: number, lng: number) => {
    if (lat > -7.68) return INVESTMENT_BLOCKS[1];
    if (lat < -7.82) return INVESTMENT_BLOCKS[4];
    if (lng > 110.385) return INVESTMENT_BLOCKS[0];
    if (lat < -7.78 && lng > 110.36) return INVESTMENT_BLOCKS[3];
    return INVESTMENT_BLOCKS[2];
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [-7.765, 110.385],
      zoomSnap: 0.1,
      zoomDelta: 0.5,
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: false,
    });

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

    INVESTMENT_BLOCKS.forEach((block) => {
      const isSelected = block.id === activeBlockId;

      const polygon = L.polygon(block.polygon, {
        color: block.color,
        fillColor: block.color,
        fillOpacity: isAll ? 0.25 : isSelected ? 0.42 : 0.12,
        weight: isAll ? 2 : isSelected ? 3 : 1.5,
        dashArray: isAll || isSelected ? '' : '4, 4',
      }).addTo(map);

      polygon.bindTooltip(
        `<strong>${block.code}: ${block.name}</strong><br/><span style="color:${block.color}">Saran: ${block.recommendedLabel}</span>`,
        {
          permanent: false,
          direction: 'center',
          className: 'osm-block-tooltip',
        }
      );

      polygon.on('click', () => {
        setActiveBlockId(block.id);
        onSelectBlock(block);
        map.flyTo(block.center, 12, { duration: 0.6 });
      });

      polygonLayersRef.current[block.id] = polygon;

      const blockBadgeIcon = L.divIcon({
        className: 'osm-block-badge',
        html: `
          <div style="background-color: ${block.color}; color: white; padding: 2px 7px; border-radius: 6px; font-weight: 800; font-size: 10px; border: 2px solid #ffffff; box-shadow: 0 0 10px ${block.color}80; text-align: center; white-space: nowrap; cursor: pointer;">
            ${block.code} · ${block.region}
          </div>
        `,
        iconSize: [80, 22],
        iconAnchor: [40, 11],
      });

      const badgeMarker = L.marker(block.center, { icon: blockBadgeIcon }).addTo(map);
      badgeMarker.on('click', () => {
        setActiveBlockId(block.id);
        onSelectBlock(block);
        map.flyTo(block.center, 12, { duration: 0.6 });
      });
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const nearest = getNearestBlock(lat, lng);
      const zoneString = `${nearest.region} - ${nearest.name} (Koordinat: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;

      setCustomPinInfo({ lat, lng, approxZone: zoneString });

      if (customMarkerRef.current) {
        customMarkerRef.current.setLatLng([lat, lng]);
      } else {
        const pinIcon = L.divIcon({
          className: 'custom-land-pin',
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              <div style="background-color: #ef4444; color: white; border: 2px solid white; border-radius: 9999px; padding: 3px 8px; font-size: 10px; font-weight: 800; white-space: nowrap; box-shadow: 0 0 12px rgba(239,68,68,0.8); font-family: system-ui;">
                🚩 Kavling Tanah Anda
              </div>
              <div style="width: 2px; height: 10px; background-color: #ef4444;"></div>
              <div style="width: 8px; height: 8px; background-color: #ef4444; border-radius: 9999px; border: 2px solid white;"></div>
            </div>
          `,
          iconSize: [140, 42],
          iconAnchor: [70, 42],
        });

        const newMarker = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
        customMarkerRef.current = newMarker;
      }

      if (onCustomPinPlaced) {
        onCustomPinPlaced({ lat, lng, approxZone: zoneString });
      }
    });

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapTheme]);

  useEffect(() => {
    Object.keys(polygonLayersRef.current).forEach((blockId) => {
      const poly = polygonLayersRef.current[blockId];
      const isSelected = blockId === activeBlockId;
      const block = INVESTMENT_BLOCKS.find((b) => b.id === blockId);

      if (poly && block) {
        poly.setStyle({
          fillOpacity: isAll ? 0.25 : isSelected ? 0.42 : 0.12,
          weight: isAll ? 2 : isSelected ? 3 : 1.5,
          dashArray: isAll || isSelected ? '' : '4, 4',
          color: block.color,
          fillColor: block.color,
        });
      }
    });

    if (mapInstanceRef.current) {
      if (isAll) {
        mapInstanceRef.current.fitBounds(
          [
            [-7.89, 110.30],
            [-7.57, 110.46],
          ],
          { padding: [25, 25], duration: 0.6 }
        );
      } else {
        const block = INVESTMENT_BLOCKS.find((b) => b.id === activeBlockId);
        if (block) {
          mapInstanceRef.current.flyTo(block.center, 12, { duration: 0.6 });
        }
      }
    }
  }, [activeBlockId]);

  const handleBlockClick = (block: InvestmentBlock) => {
    setActiveBlockId(block.id);
    onSelectBlock(block);
  };

  const handleSelectAllBlocks = () => {
    setActiveBlockId('semua');
    onSelectBlock(ALL_BLOCKS_OVERVIEW);
  };

  return (
    <div className="space-y-3.5">
      {/* Modern High-Tech GIS Frame (No round, flush with outer terminal) */}
      <div className="relative overflow-hidden bg-[#051410]">
        
        {/* HUD Top Bar */}
        <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-[#071914]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-white flex items-center gap-2 text-xs shadow-lg pointer-events-auto">
            <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-extrabold text-[#d5a864] tracking-tight">KORIDOR INVESTASI</span>
            <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
              POLYGON ANALYTICS
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

        {/* Block Selector Toolbar */}
        <div className="p-3 bg-[#0a231c]/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-1 flex items-center gap-1">
              <Target className="w-3 h-3 text-[#d5a864]" />
              Blok:
            </span>

            {/* Semua Blok Button */}
            <button
              type="button"
              onClick={handleSelectAllBlocks}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                isAll
                  ? 'bg-[#d5a864] text-[#071914] shadow-md ring-1 ring-[#d5a864]'
                  : 'bg-[#071914] text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#d5a864]" />
              <span>Semua Blok</span>
            </button>

            {INVESTMENT_BLOCKS.map((block) => {
              const isSelected = activeBlockId === block.id;
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => handleBlockClick(block)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#d5a864] text-[#071914] shadow-md ring-1 ring-[#d5a864]'
                      : 'bg-[#071914] text-neutral-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: block.color }}
                  />
                  <span>{block.code}</span>
                  <span className="hidden md:inline font-normal text-neutral-400">· {block.region}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-neutral-400 hidden sm:inline italic">
            💡 Klik peta untuk tandai titik kavling Anda
          </span>
        </div>
      </div>

      {/* Selected Block Info Card */}
      <div className="bg-[#0a231c]/90 border border-white/15 rounded-2xl p-5 shadow-xl space-y-4 text-white backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white shadow-xs"
                style={{ backgroundColor: activeBlock.color }}
              >
                {activeBlock.code}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#d5a864]">
                {activeBlock.region} · {activeBlock.kdb}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
              {activeBlock.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-[#071914] border border-[#d5a864]/40 text-[#d5a864] text-xs font-bold rounded-xl shadow-xs tabular-nums">
              Est. Yield: {activeBlock.yieldEst}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          {activeBlock.description}
        </p>

        {/* 4 High-Tech Data Grid Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Harga Lahan
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block mt-1 tabular-nums">
              {activeBlock.landPrice}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Tingkat Okupansi
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-1 tabular-nums">
              {activeBlock.occupancy}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Aturan KDB
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-300 block mt-1 truncate">
              {activeBlock.kdb}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Rekomendasi
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#d5a864] block mt-1 truncate">
              {activeBlock.recommendedLabel}
            </span>
          </div>
        </div>

        {/* Action Button & Custom Pin Notice */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div className="text-xs text-neutral-300 flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#d5a864] shrink-0" />
            <span className="truncate">Cakupan: {activeBlock.subDistricts.join(', ')}</span>
          </div>

          {customPinInfo ? (
            <button
              type="button"
              onClick={() => onApplyZoneToCalculator(customPinInfo.approxZone)}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 active:scale-98 text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Gunakan Kavling ({customPinInfo.lat.toFixed(3)}, {customPinInfo.lng.toFixed(3)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                onApplyZoneToCalculator(
                  isAll
                    ? 'Yogyakarta (Seluruh Blok Koridor Investasi)'
                    : `${activeBlock.region} - ${activeBlock.name}`
                )
              }
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#d5a864] to-[#e4bd7d] hover:brightness-105 active:scale-98 text-[#071914] text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Terapkan Blok ke Kalkulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
