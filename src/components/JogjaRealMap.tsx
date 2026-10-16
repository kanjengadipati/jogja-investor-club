'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass, MapPin, ArrowRight, Route, GraduationCap,
  Sparkles, MessageSquare, Check, X, Info, Zap, DollarSign, Navigation, ShieldCheck
} from 'lucide-react';
import jogjaGeoDataRaw from '../data/jogjaGeoData.json';
import jogjaKecamatanDataRaw from '../data/jogjaKecamatanGeoData.json';
import {
  TOLL_ROUTES, TOLL_EXITS, INVESTMENT_POIS,
  TollExit, InvestmentPOI
} from '../data/jogjaInfrastructure';

const jogjaGeoData = jogjaGeoDataRaw as {
  sleman: [number, number][];
  jogja: [number, number][];
  bantul: [number, number][];
  gunungkidul: [number, number][];
  kulonprogo: [number, number][];
  diy_outer: [number, number][];
};

interface KecamatanEntry {
  name: string;
  kabupaten: string;
  polygon: [number, number][];
}
const jogjaKecamatanData = (jogjaKecamatanDataRaw as unknown as { kecamatan: Record<string, KecamatanEntry> }).kecamatan;

export interface YogyakartaRegion {
  id: string;
  name: string;
  fullName: string;
  code: string;
  lat: number;
  lng: number;
  recommended: string;
  landPrice: string; // Pasar
  njopPrice: string; // NJOP Resmi PBB-P2
  njopRangeDetail: string;
  njopRatio: string;
  tollAccessDesc: string;
  rtrwDesc: string;
  yieldEst: string;
  occupancy: string;
  kdb: string;
  highlights: string[];
  desc: string;
  color: string;
  njopColor: string; // Warna Heatmap/Choropleth NJOP
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
  landPrice: 'Rp 1,5 Jt - 25 Jt / m²',
  njopPrice: 'Rp 450 Rb - 22 Jt / m²',
  njopRangeDetail: 'Rentang NJOP Resmi PBB-P2 Seluruh DIY: Terendah di Lahan Kars GK, Tertinggi di Koridor Malioboro',
  njopRatio: '~50% - 75% dari harga pasar transaksi',
  tollAccessDesc: 'Akses 2 Trase Tol Utama: Solo-Yogyakarta-YIA & Yogyakarta-Bawen',
  rtrwDesc: 'Zonasi Terpadu RTRW DIY: Perkotaan, Kawasan Pendidikan, Aerotropolis, & Cagar Budaya',
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
  njopColor: '#d5a864',
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
    landPrice: 'Rp 5,5 Jt - 16 Jt / m²',
    njopPrice: 'Rp 3,5 Jt - 14 Jt / m²',
    njopRangeDetail: 'Depok/Seturan: Rp 8-14 Jt | Jakal/Ngaglik: Rp 5-10 Jt | Sleman Barat: Rp 3,5-7 Jt | Sleman Utara: Rp 1,5-3,5 Jt',
    njopRatio: '~60% - 75% dari harga pasar',
    tollAccessDesc: 'Koneksi Langsung 5 Exit Tol (Purwomartani, Maguwo, Monjali, Trihanggo, Gamping)',
    rtrwDesc: 'Zona Pendidikan Tinggi, Agrowisata Merapi & Hunian Komersial Vertikal',
    yieldEst: '14% - 19% / tahun',
    occupancy: '94% - 98%',
    kdb: 'KDB 60% · Maksimal 3-4 Lantai',
    highlights: ['Kampus UGM & UNY', 'Kawasan Seturan & Jakal', 'Wisata Kaliurang & Merapi'],
    desc: 'Sentra pendidikan terbesar di DIY dengan 300.000+ mahasiswa aktif. Permintaan kos eksklusif dan villa staycation tertinggi sepanjang tahun.',
    color: '#10b981', // Emerald
    njopColor: '#f59e0b', // Amber/Emas (Tinggi)
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
    landPrice: 'Rp 9 Jt - 25 Jt / m²',
    njopPrice: 'Rp 6 Jt - 22 Jt / m²',
    njopRangeDetail: 'Malioboro/Sudirman: Rp 18-22 Jt | Kotabaru/Kraton: Rp 9-15 Jt | Umbulharjo: Rp 6-9 Jt',
    njopRatio: '~65% - 85% dari harga pasar',
    tollAccessDesc: 'Akses 12-15 menit ke Exit Tol Trihanggo & Maguwo Ring Road',
    rtrwDesc: 'Zona Perkotaan Padat, Kawasan Cagar Budaya & Sentra Bisnis Komersial',
    yieldEst: '12% - 15% / tahun',
    occupancy: '88% - 94%',
    kdb: 'KDB 70% · Zona Pusat Kota & Bisnis',
    highlights: ['Kawasan Malioboro', 'Keraton Ngayogyakarta', 'Kotabaru & Tugu Jogja'],
    desc: 'Jantung denyut budaya dan pariwisata urban DIY. Keterbatasan lahan kosong menjadikan aset properti di sini bernilai likuiditas dan apresiasi kapital tertinggi.',
    color: '#f59e0b', // Amber
    njopColor: '#ef4444', // Merah (Tertinggi)
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
    landPrice: 'Rp 3 Jt - 10 Jt / m²',
    njopPrice: 'Rp 1,5 Jt - 7,5 Jt / m²',
    njopRangeDetail: 'Banguntapan/Sewon: Rp 4-7,5 Jt | Bantul Kota: Rp 2,5-4,5 Jt | Pajangan/Sedayu: Rp 1,5-3 Jt | Pesisir: Rp 800 Rb-2 Jt',
    njopRatio: '~50% - 65% dari harga pasar',
    tollAccessDesc: '15-20 menit via Ring Road Selatan ke Exit Tol Gamping',
    rtrwDesc: 'Zona Industri Kreatif, Sentra Kriya Seni & Hunian Sub-Urban Hijau',
    yieldEst: '11% - 16% / tahun',
    occupancy: '82% - 89%',
    kdb: 'KDB 60% · Sentra Residensial Nyaman',
    highlights: ['Sentra Gerabah Kasongan', 'Kampus ISI Yogyakarta', 'Pantai Parangtritis'],
    desc: 'Lingkungan asri bernuansa seni dan budaya kreatif. Sangat diminati untuk cluster perumahan keluarga modern dan homestay pelancong seni mancanegara.',
    color: '#3b82f6', // Blue
    njopColor: '#0284c7', // Sky Blue (Menengah)
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
    landPrice: 'Rp 900 Rb - 4,5 Jt / m²',
    njopPrice: 'Rp 450 Rb - 3 Jt / m²',
    njopRangeDetail: 'Kawasan Pantai JJLS: Rp 1,5-3 Jt | Wonosari Kota: Rp 1,8-3 Jt | Patuk: Rp 1-2,2 Jt | Lahan Kars: Rp 250-650 Rb',
    njopRatio: '~40% - 55% dari harga pasar',
    tollAccessDesc: 'Akses Jalur JJLS (Jalur Jalan Lintas Selatan) & Akses Prambanan-Gayamharjo',
    rtrwDesc: 'Zona Geopark UNESCO, Pariwisata Pantai Bahari & Kawasan Lindung Ekologis',
    yieldEst: '13% - 18% / tahun',
    occupancy: '72% - 85%',
    kdb: 'KDB 40% - 50% · Kawasan Konservasi & Wisata',
    highlights: ['Pantai Indrayanti & Baron', 'Goa Pindul', 'Wonosari Sentra Bisnis'],
    desc: 'Kawasan pesisir eksotis dengan pertumbuhan destinasi pariwisata alam tercepat di DIY. Potensi capital gain tanah jangka panjang yang sangat agresif.',
    color: '#8b5cf6', // Purple
    njopColor: '#8b5cf6', // Violet (Terjangkau / Entry)
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
    landPrice: 'Rp 1,8 Jt - 6,5 Jt / m²',
    njopPrice: 'Rp 850 Rb - 4,5 Jt / m²',
    njopRangeDetail: 'Aerotropolis Temon (YIA): Rp 2,5-4,5 Jt | Kota Wates: Rp 1,8-3,5 Jt | Nanggulan: Rp 1-2,5 Jt | Menoreh: Rp 450-900 Rb',
    njopRatio: '~45% - 60% dari harga pasar',
    tollAccessDesc: 'Titik Akhir Trase Tol Solo-Jogja-YIA & Jalur Kereta Cepat Bandara',
    rtrwDesc: 'Zona Aerotropolis Terpadu, Transportasi Intermoda & Pusat Pertumbuhan Baru',
    yieldEst: '12% - 16% / tahun',
    occupancy: '78% - 86%',
    kdb: 'KDB 50% - 60% · Koridor Infrastruktur Baru',
    highlights: ['Bandara YIA Glagah', 'Kota Wates', 'Perbukitan Menoreh'],
    desc: 'Pintu gerbang udara internasional DIY. Mengalami akselerasi pembangunan infrastruktur jalan tol bandara dan kawasan logistik aerotropolis.',
    color: '#06b6d4', // Cyan
    njopColor: '#0d9488', // Teal (Berkembang)
    polygon: jogjaGeoData.kulonprogo,
  },
];

// Helper kalkulasi jarak Haversine (km)
function calcDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export interface InspectedPointInfo {
  lat: number;
  lng: number;
  regionName: string;
  nearestExit: {
    name: string;
    dist: number;
    toll: string;
  };
  nearestPoi: {
    name: string;
    dist: number;
    badge: string;
  };
  recommended: string;
  estPrice: string;
  njopPrice: string;
}

interface JogjaRealMapProps {
  selectedRegionId?: string;
  /**
   * Daftar region ID (kab/kota) yang akan di-highlight sekaligus (multi-polygon).
   * Digunakan untuk cluster lintas kab/kota. Contoh: ['sleman', 'kota'].
   * Jika ['semua'] atau kosong, semua region tampil normal.
   */
  highlightRegionIds?: string[];
  /**
   * Daftar kecamatan slug yang akan di-highlight di level mikro.
   * Contoh: ['depok', 'mlati', 'gondokusuman'].
   * Jika kosong atau tidak diisi, tidak ada kecamatan yang di-highlight khusus.
   */
  highlightKecamatanSlugs?: string[];
  filterMode?: 'zonasi' | 'harga' | 'akses';
  onSelectRegion: (region: YogyakartaRegion) => void;
  onApplyZoneToCalculator: (zoneName: string) => void;
  onCustomPinPlaced?: (coords: { lat: number; lng: number; approxZone: string }) => void;
  compact?: boolean;
  height?: string;
}

export const JogjaRealMap: React.FC<JogjaRealMapProps> = ({
  selectedRegionId = 'semua',
  highlightRegionIds,
  highlightKecamatanSlugs,
  filterMode = 'zonasi',
  onSelectRegion,
  onApplyZoneToCalculator,
  onCustomPinPlaced,
  compact = false,
  height = '480px',
}) => {
  // Normalised set of region IDs to highlight (empty = show all equally)
  const highlightSet: Set<string> = React.useMemo(() => {
    if (!highlightRegionIds || highlightRegionIds.includes('semua') || highlightRegionIds.length === 0) {
      return new Set<string>();
    }
    return new Set(highlightRegionIds);
  }, [highlightRegionIds]);

  // Normalised set of kecamatan slugs to highlight at micro level
  const kecamatanHighlightSet: Set<string> = React.useMemo(() => {
    if (!highlightKecamatanSlugs || highlightKecamatanSlugs.length === 0) return new Set<string>();
    return new Set(highlightKecamatanSlugs);
  }, [highlightKecamatanSlugs]);

  const kecamatanHighlightSetRef = useRef(kecamatanHighlightSet);
  kecamatanHighlightSetRef.current = kecamatanHighlightSet;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonsRef = useRef<{ [key: string]: L.Polygon }>({});
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const outerBorderRef = useRef<L.Polygon | null>(null);
  const tollLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const kecamatanLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const poiLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const inspectMarkerRef = useRef<L.Marker | null>(null);

  const [mapTheme, setMapTheme] = useState<'dark-hud' | 'light' | 'street' | 'satellite'>('dark-hud');
  const [activeRegionId, setActiveRegionId] = useState(selectedRegionId);

  // Layer Toggles
  const [showTollLayer, setShowTollLayer] = useState(true);
  const [showPoiLayer, setShowPoiLayer] = useState(true);
  const [inspectedPoint, setInspectedPoint] = useState<InspectedPointInfo | null>(null);

  // Sync prop changes
  useEffect(() => {
    if (selectedRegionId && selectedRegionId !== activeRegionId) {
      setActiveRegionId(selectedRegionId);
    }
  }, [selectedRegionId]);

  // Sync filter mode with layer visibility
  useEffect(() => {
    if (filterMode === 'akses') {
      setShowTollLayer(true);
    }
  }, [filterMode]);

  const isAll = activeRegionId === 'semua';
  const activeRegion = isAll
    ? DIY_ALL_REGION
    : YOGYAKARTA_REGIONS.find((r) => r.id === activeRegionId) || DIY_ALL_REGION;

  const diyBounds = L.latLngBounds([-8.22, 110.00], [-7.53, 110.85]);

  // Handle Point Inspection Logic
  const handleInspectCoordinates = (lat: number, lng: number, map: L.Map) => {
    let closestReg = YOGYAKARTA_REGIONS[0];
    let minRegDist = 9999;
    YOGYAKARTA_REGIONS.forEach((reg) => {
      const d = calcDistanceKm(lat, lng, reg.lat, reg.lng);
      if (d < minRegDist) {
        minRegDist = d;
        closestReg = reg;
      }
    });

    let closestExit = TOLL_EXITS[0];
    let minExitDist = 9999;
    TOLL_EXITS.forEach((ex) => {
      const d = calcDistanceKm(lat, lng, ex.lat, ex.lng);
      if (d < minExitDist) {
        minExitDist = d;
        closestExit = ex;
      }
    });

    let closestPoi = INVESTMENT_POIS[0];
    let minPoiDist = 9999;
    INVESTMENT_POIS.forEach((poi) => {
      const d = calcDistanceKm(lat, lng, poi.lat, poi.lng);
      if (d < minPoiDist) {
        minPoiDist = d;
        closestPoi = poi;
      }
    });

    const info: InspectedPointInfo = {
      lat: parseFloat(lat.toFixed(5)),
      lng: parseFloat(lng.toFixed(5)),
      regionName: closestReg.name,
      nearestExit: {
        name: closestExit.name,
        dist: minExitDist,
        toll: closestExit.tollName,
      },
      nearestPoi: {
        name: closestPoi.name,
        dist: minPoiDist,
        badge: closestPoi.badge,
      },
      recommended: closestReg.recommended,
      estPrice: closestReg.landPrice,
      njopPrice: closestReg.njopPrice,
    };

    setInspectedPoint(info);

    if (onCustomPinPlaced) {
      onCustomPinPlaced({
        lat: info.lat,
        lng: info.lng,
        approxZone: `${closestReg.name} (Dekat ${closestExit.name})`,
      });
    }

    if (inspectMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(inspectMarkerRef.current);
    }

    const pinIcon = L.divIcon({
      className: 'inspect-land-pin',
      html: `
        <div style="position: relative; transform: translate(-16px, -32px); cursor: pointer;">
          <div style="width: 32px; height: 32px; border-radius: 9999px; background: #d5a864; border: 3px solid #071914; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(213,168,100,0.8); animation: bounce 1s infinite alternate;">
            <span style="font-size: 16px;">📍</span>
          </div>
          <div style="width: 8px; height: 8px; background: #d5a864; border-radius: 9999px; position: absolute; bottom: -4px; left: 12px; box-shadow: 0 0 6px #d5a864;"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const marker = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
    inspectMarkerRef.current = marker;
  };

  // -------------------------------------------------------------
  // HELPER: Generate Marker HTML based on Active filterMode
  // -------------------------------------------------------------
  const getMarkerHtml = (reg: YogyakartaRegion, mode: 'zonasi' | 'harga' | 'akses') => {
    if (mode === 'harga') {
      return `
        <div style="display: flex; flex-direction: column; gap: 2px; cursor: pointer; transform: translate(-50%, -10px); min-width: 130px; text-align: center;">
          <div style="background: rgba(7,25,20,0.96); border: 1.5px solid ${reg.njopColor}; padding: 4px 8px; border-radius: 10px; box-shadow: 0 4px 14px rgba(0,0,0,0.7);">
            <div style="font-family: system-ui, sans-serif; font-size: 10px; font-weight: 800; color: #d5a864; text-transform: uppercase;">
              ${reg.name}
            </div>
            <div style="font-family: monospace; font-size: 11px; font-weight: 900; color: #ffffff; white-space: nowrap; margin-top: 1px;">
              NJOP: ${reg.njopPrice}
            </div>
            <div style="font-size: 9px; color: #a3e635; font-weight: 600; white-space: nowrap;">
              Pasar: ${reg.landPrice}
            </div>
          </div>
          <div style="width: 8px; height: 8px; background: ${reg.njopColor}; border-radius: 9999px; margin: 0 auto; box-shadow: 0 0 6px ${reg.njopColor};"></div>
        </div>
      `;
    }

    if (mode === 'akses') {
      return `
        <div style="display: flex; flex-direction: column; gap: 2px; cursor: pointer; transform: translate(-50%, -10px); min-width: 140px; text-align: center;">
          <div style="background: rgba(7,25,20,0.96); border: 1.5px solid #eab308; padding: 4px 8px; border-radius: 10px; box-shadow: 0 4px 14px rgba(234,179,8,0.4);">
            <div style="font-family: system-ui, sans-serif; font-size: 10px; font-weight: 800; color: #eab308; text-transform: uppercase;">
              🛣️ ${reg.name}
            </div>
            <div style="font-family: system-ui, sans-serif; font-size: 9px; font-weight: 600; color: #cbd5e1; white-space: nowrap; margin-top: 1px;">
              ${reg.id === 'sleman' ? '5 Exit Tol Langsung' : reg.id === 'kulonprogo' ? 'Exit Tol YIA & Bandara' : reg.id === 'kota' ? '12-15 mnt ke Tol' : reg.id === 'bantul' ? 'Akses Ring Road Sltn' : 'Akses Jalur JJLS'}
            </div>
          </div>
          <div style="width: 8px; height: 8px; background: #eab308; border-radius: 9999px; margin: 0 auto; box-shadow: 0 0 6px #eab308;"></div>
        </div>
      `;
    }

    // Default: Zonasi RTRW
    return `
      <div style="display: flex; align-items: center; gap: 5px; cursor: pointer; transform: translate(-8px, -8px);">
        <div style="width: 10px; height: 10px; border-radius: 9999px; background-color: #071914; border: 2px solid ${reg.color}; box-shadow: 0 0 8px ${reg.color}; flex-shrink: 0;"></div>
        <div style="font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 700; color: #f1f5f9; background: rgba(7,25,20,0.88); padding: 2px 7px; border-radius: 6px; border: 1px solid ${reg.color}60; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.6);">
          ${reg.name}
        </div>
      </div>
    `;
  };

  // -------------------------------------------------------------
  // INITIAL MAP MOUNT
  // -------------------------------------------------------------
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
      maxZoom: 19,
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
    });

    L.control.zoom({ position: 'bottomleft' }).addTo(map);
    mapInstanceRef.current = map;

    const tileUrl =
      mapTheme === 'satellite'
        ? 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
        : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tileAttribution =
      mapTheme === 'satellite'
        ? '&copy; Google Satellite Imagery'
        : '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

    L.tileLayer(tileUrl, {
      maxZoom: mapTheme === 'satellite' ? 20 : 18,
      attribution: tileAttribution,
    }).addTo(map);

    const tilePane = map.getPane('tilePane');
    if (tilePane) {
      if (mapTheme === 'dark-hud') {
        tilePane.style.filter =
          'invert(100%) hue-rotate(180deg) brightness(88%) contrast(110%) saturate(60%)';
      } else if (mapTheme === 'light') {
        tilePane.style.filter = 'saturate(0.55) brightness(1.03) contrast(0.96)';
      } else if (mapTheme === 'satellite') {
        tilePane.style.filter = 'brightness(0.92) contrast(1.08)';
      } else {
        tilePane.style.filter = 'none';
      }
    }

    // 1. Draw Official Region Boundaries
    YOGYAKARTA_REGIONS.forEach((reg) => {
      const isSelected = reg.id === activeRegionId;
      const fillColor = filterMode === 'harga' ? reg.njopColor : reg.color;

      const polygon = L.polygon(reg.polygon, {
        color: fillColor,
        fillColor: fillColor,
        fillOpacity: filterMode === 'akses' ? 0.08 : isAll ? 0.22 : isSelected ? 0.35 : 0.08,
        weight: isSelected ? 1.6 : 1.2,
        opacity: isSelected ? 1.0 : 0.75,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'kab-poly',
      }).addTo(map);

      polygon.on('click', () => {
        setActiveRegionId(reg.id);
        onSelectRegion(reg);
        map.fitBounds(polygon.getBounds(), { padding: [30, 30], maxZoom: 12, duration: 0.6 });
      });

      polygonsRef.current[reg.id] = polygon;

      // Region Pin Marker
      const pinIcon = L.divIcon({
        className: 'custom-diy-pin',
        html: getMarkerHtml(reg, filterMode),
        iconSize: filterMode === 'harga' ? [140, 48] : filterMode === 'akses' ? [150, 42] : [140, 24],
        iconAnchor: filterMode === 'harga' || filterMode === 'akses' ? [70, 48] : [6, 6],
      });

      const marker = L.marker([reg.lat, reg.lng], { icon: pinIcon }).addTo(map);

      marker.on('click', () => {
        setActiveRegionId(reg.id);
        onSelectRegion(reg);
        map.fitBounds(polygon.getBounds(), { padding: [30, 30], maxZoom: 12, duration: 0.6 });
      });

      markersRef.current[reg.id] = marker;
    });

    // 2. Draw Unified Outer Perimeter
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

    // 3. Toll Infrastructure Layer
    const tollGroup = L.layerGroup();
    TOLL_ROUTES.forEach((route) => {
      // Glow background line
      L.polyline(route.path, {
        color: route.color,
        weight: filterMode === 'akses' ? 8 : 6,
        opacity: filterMode === 'akses' ? 0.55 : 0.35,
        lineCap: 'round',
      }).addTo(tollGroup);

      // Main dashed toll line
      const polyline = L.polyline(route.path, {
        color: route.color,
        weight: filterMode === 'akses' ? 4.5 : 3.2,
        opacity: 0.98,
        dashArray: '8, 6',
        lineCap: 'round',
      }).addTo(tollGroup);

      polyline.bindTooltip(
        `<div style="font-family: sans-serif; font-size: 11px; font-weight: bold; color: #fff; background: #071914; padding: 4px 8px; border-radius: 6px; border: 1px solid ${route.color};">
          🛣️ ${route.name}<br/><span style="font-size: 9px; color: #cbd5e1;">Status: ${route.status}</span>
        </div>`,
        { sticky: true, opacity: 0.95 }
      );
    });

    // Toll Exit Markers (Compact pin, hover for tooltip, click for full popup)
    TOLL_EXITS.forEach((exit) => {
      const exitIcon = L.divIcon({
        className: 'toll-exit-pin',
        html: `
          <div style="width: 26px; height: 26px; border-radius: 8px; background: rgba(7,25,20,0.95); border: 2px solid #eab308; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(234,179,8,0.7); cursor: pointer;">
            <span style="font-size: 13px; line-height: 1;">🚧</span>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const exitMarker = L.marker([exit.lat, exit.lng], { icon: exitIcon }).addTo(tollGroup);

      exitMarker.bindTooltip(
        `<div style="font-family: sans-serif; font-size: 11px; font-weight: bold; color: #eab308; background: #071914ee; padding: 4px 8px; border-radius: 6px; border: 1px solid #eab308; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.6);">
          🚧 ${exit.name}
        </div>`,
        { direction: 'top', offset: [0, -14], opacity: 0.98 }
      );

      exitMarker.bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif; color: #fff; padding: 12px 28px 12px 14px; min-width: 210px;">
          <div style="font-size: 10px; color: #eab308; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">Exit Gerbang Tol Strategis</div>
          <div style="font-size: 14px; font-weight: 800; margin: 3px 0 3px 0; color: #ffffff;">${exit.name}</div>
          <div style="font-size: 11px; color: #94a3b8; line-height: 1.4;">${exit.impactZone}</div>
          <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 10px; font-family: monospace; color: #10b981; font-weight: 600;">Target Siap: ${exit.completion}</div>
        </div>
      `, {
        className: 'custom-leaflet-popup',
        offset: [0, -6],
      });
    });
    tollLayerGroupRef.current = tollGroup;
    if (showTollLayer || filterMode === 'akses') {
      tollGroup.addTo(map);
    }

    // 4. Strategic Investment POI Layer (Compact pin, hover for tooltip, click for full popup)
    const poiGroup = L.layerGroup();
    INVESTMENT_POIS.forEach((poi) => {
      const categoryColor = poi.category === 'kampus' ? '#10b981' : poi.category === 'kesehatan' ? '#ef4444' : '#06b6d4';
      const categoryEmoji = poi.category === 'kampus' ? '🎓' : poi.category === 'kesehatan' ? '🏥' : '✈️';

      const poiIcon = L.divIcon({
        className: 'poi-pin',
        html: `
          <div style="width: 26px; height: 26px; border-radius: 9999px; background: rgba(7,25,20,0.95); border: 2px solid ${categoryColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${categoryColor}80; cursor: pointer;">
            <span style="font-size: 13px; line-height: 1;">${categoryEmoji}</span>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const poiMarker = L.marker([poi.lat, poi.lng], { icon: poiIcon }).addTo(poiGroup);

      poiMarker.bindTooltip(
        `<div style="font-family: sans-serif; font-size: 11px; font-weight: bold; color: #fff; background: #071914ee; padding: 4px 8px; border-radius: 6px; border: 1px solid ${categoryColor}; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.6);">
          ${categoryEmoji} ${poi.name}
        </div>`,
        { direction: 'top', offset: [0, -14], opacity: 0.98 }
      );

      poiMarker.bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif; color: #fff; padding: 12px 28px 12px 14px; min-width: 215px;">
          <div style="font-size: 9px; color: #d5a864; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase;">MAGNET INVESTASI · RADIUS TANGKAPAN</div>
          <div style="font-size: 14px; font-weight: 800; margin: 3px 0 3px 0; color: #ffffff;">${categoryEmoji} ${poi.name}</div>
          <div style="font-size: 11px; color: #94a3b8; line-height: 1.4;">${poi.detail}</div>
          <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 10px; color: #10b981; font-weight: 700;">Captive Market: ${poi.badge}</div>
        </div>
      `, {
        className: 'custom-leaflet-popup',
        offset: [0, -6],
      });
    });
    poiLayerGroupRef.current = poiGroup;
    if (showPoiLayer && filterMode !== 'akses') {
      poiGroup.addTo(map);
    }

    // 5b. Kecamatan Micro-Level Layer (pre-render all, hide until needed)
    const kecamatanGroup = L.layerGroup();
    Object.entries(jogjaKecamatanData).forEach(([slug, kec]) => {
      const poly = L.polygon(kec.polygon as [number, number][], {
        color: '#d5a864',
        fillColor: '#d5a864',
        fillOpacity: 0,   // hidden by default
        weight: 0,
        opacity: 0,
        className: `kec-poly kec-${slug}`,
      }).addTo(kecamatanGroup);

      poly.bindTooltip(
        `<div style="font-family: sans-serif; font-size: 11px; font-weight: bold;
          color: #fff; background: #071914cc; padding: 3px 8px; border-radius: 6px;
          border: 1px solid #d5a864;">
          📍 Kec. ${kec.name}
        </div>`,
        { sticky: true, opacity: 0.95 }
      );

      poly.bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif; color: #fff; padding: 12px 28px 12px 14px; min-width: 215px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 9px; font-weight: 800; color: #d5a864; letter-spacing: 0.8px; text-transform: uppercase;">ZONA MIKRO INVESTASI</span>
            <span style="font-size: 9px; background: rgba(213,168,100,0.25); color: #f59e0b; padding: 2px 7px; border-radius: 999px; font-weight: 700;">Hotspot</span>
          </div>
          <div style="font-size: 15px; font-weight: 800; color: #ffffff; margin: 2px 0 2px 0;">Kec. ${kec.name}</div>
          <div style="font-size: 11px; color: #94a3b8; text-transform: capitalize;">Kabupaten: <strong style="color: #e2e8f0;">${kec.kabupaten}</strong></div>
          <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; gap: 6px; font-size: 10px; color: #34d399; font-weight: 600;">
            <span>🔍 Zoom In Aktif</span> · <span>Tingkat Kecamatan</span>
          </div>
        </div>
      `, {
        className: 'custom-leaflet-popup',
        offset: [0, -6],
      });

      // Click to Zoom In on Kecamatan!
      poly.on('click', (e) => {
        L.DomEvent.stopPropagation(e);

        // Sync parent kabupaten if matched
        const matchedRegion = YOGYAKARTA_REGIONS.find((r) => r.id === kec.kabupaten);
        if (matchedRegion) {
          setActiveRegionId(matchedRegion.id);
          onSelectRegion(matchedRegion);
        }

        // Smooth zoom in deeper to the clicked kecamatan with compact padding
        map.flyToBounds(poly.getBounds(), {
          padding: [30, 30],
          maxZoom: 16,
          duration: 0.8,
        });

        poly.openPopup(e.latlng);
      });

      // Hover glow enhancement
      poly.on('mouseover', () => {
        poly.setStyle({
          weight: 3.2,
          fillOpacity: 0.5,
          opacity: 1,
          color: '#f59e0b',
        });
      });

      poly.on('mouseout', () => {
        const hasHighlight = kecamatanHighlightSetRef.current.size > 0;
        const isHot = hasHighlight && kecamatanHighlightSetRef.current.has(slug);
        const parentReg = YOGYAKARTA_REGIONS.find((r) => r.id === kec.kabupaten);
        const baseColor = parentReg?.color ?? '#d5a864';

        if (!hasHighlight) {
          poly.setStyle({
            color: '#d5a864',
            fillColor: baseColor,
            fillOpacity: 0.1,
            weight: 0.9,
            opacity: 0.45,
          });
        } else if (isHot) {
          poly.setStyle({
            color: '#d5a864',
            fillColor: baseColor,
            fillOpacity: 0.55,
            weight: 2.4,
            opacity: 1,
          });
        } else {
          poly.setStyle({
            color: '#64748b',
            fillColor: '#334155',
            fillOpacity: 0.04,
            weight: 0.7,
            opacity: 0.3,
          });
        }
      });

      // Store with compound key
      polygonsRef.current[`kec:${slug}`] = poly;
    });
    kecamatanLayerGroupRef.current = kecamatanGroup;
    kecamatanGroup.addTo(map); // always in DOM, controlled by opacity

    // 5. Global Map Click Listener for Pin Inspection
    map.on('click', (e) => {
      handleInspectCoordinates(e.latlng.lat, e.latlng.lng, map);
    });

    // Fit Initial Bounds
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

  // -------------------------------------------------------------
  // RE-STYLE ON FILTER MODE CHANGE (ZONASI vs HARGA/NJOP vs AKSES/TOL)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Multi-region highlight: jika highlightSet tidak kosong, polygon yang masuk set = aktif
    const hasKecamatanHighlight = kecamatanHighlightSet.size > 0;
    const hasMultiHighlight = highlightSet.size > 0;

    Object.keys(polygonsRef.current).forEach((regId) => {
      // Skip kecamatan polygons which are styled in their dedicated effect
      if (regId.startsWith('kec:')) return;

      const poly = polygonsRef.current[regId];
      const isSelected = regId === activeRegionId;
      const isHighlighted = hasMultiHighlight ? highlightSet.has(regId) : isSelected;
      const reg = YOGYAKARTA_REGIONS.find((r) => r.id === regId);
      if (poly && reg) {
        const fillColor = filterMode === 'harga' ? reg.njopColor : reg.color;

        // Batas Kab/Kota: dibuat menyala tipis (luminous thin boundary)
        if (hasKecamatanHighlight) {
          poly.setStyle({
            fillColor: fillColor,
            color: fillColor,
            fillOpacity: isHighlighted ? 0.03 : 0.01,
            weight: isHighlighted ? 1.5 : 1.0,
            opacity: isHighlighted ? 0.95 : 0.6,
          });
          return;
        }

        poly.setStyle({
          fillColor: fillColor,
          color: fillColor,
          fillOpacity:
            filterMode === 'akses' ? 0.08
            : isAll ? 0.22
            : isHighlighted ? 0.35
            : 0.08,
          weight:
            filterMode === 'akses' ? 1.0
            : isAll ? 1.4
            : isHighlighted ? 1.6
            : 1.1,
          opacity: isAll ? 0.85 : isHighlighted ? 1.0 : 0.75,
        });
      }
    });

    // 2. Update Markers HTML & Icons
    Object.keys(markersRef.current).forEach((regId) => {
      const marker = markersRef.current[regId];
      const reg = YOGYAKARTA_REGIONS.find((r) => r.id === regId);
      if (marker && reg) {
        const newIcon = L.divIcon({
          className: 'custom-diy-pin',
          html: getMarkerHtml(reg, filterMode),
          iconSize: filterMode === 'harga' ? [140, 48] : filterMode === 'akses' ? [150, 42] : [140, 24],
          iconAnchor: filterMode === 'harga' || filterMode === 'akses' ? [70, 48] : [6, 6],
        });
        marker.setIcon(newIcon);
      }
    });

    // 3. Handle Toll & POI visibility based on filterMode
    if (tollLayerGroupRef.current) {
      if (filterMode === 'akses' || showTollLayer) {
        if (!mapInstanceRef.current.hasLayer(tollLayerGroupRef.current)) {
          tollLayerGroupRef.current.addTo(mapInstanceRef.current);
        }
      } else {
        if (mapInstanceRef.current.hasLayer(tollLayerGroupRef.current)) {
          tollLayerGroupRef.current.remove();
        }
      }
    }

    if (poiLayerGroupRef.current) {
      if (filterMode === 'harga' || filterMode === 'akses') {
        if (mapInstanceRef.current.hasLayer(poiLayerGroupRef.current)) {
          poiLayerGroupRef.current.remove();
        }
      } else if (showPoiLayer) {
        if (!mapInstanceRef.current.hasLayer(poiLayerGroupRef.current)) {
          poiLayerGroupRef.current.addTo(mapInstanceRef.current);
        }
      }
    }
  }, [filterMode, activeRegionId, isAll, showTollLayer, showPoiLayer, highlightSet, kecamatanHighlightSet]);

  // -------------------------------------------------------------
  // KECAMATAN LAYER: update styles when highlight set changes
  // -------------------------------------------------------------
  useEffect(() => {
    const hasHighlight = kecamatanHighlightSet.size > 0;

    Object.entries(polygonsRef.current).forEach(([key, poly]) => {
      if (!key.startsWith('kec:')) return;
      const slug = key.replace('kec:', '');
      const isHot = hasHighlight && kecamatanHighlightSet.has(slug);
      const kec = jogjaKecamatanData[slug];
      if (!kec) return;

      // Find parent kabupaten color
      const parentReg = YOGYAKARTA_REGIONS.find(r => r.id === kec.kabupaten);
      const baseColor = parentReg?.color ?? '#d5a864';

      if (!hasHighlight) {
        // Semua Kawasan DIY: tampilkan batas halus semua kecamatan agar terlihat dan bisa di-zoom
        poly.setStyle({
          color: '#d5a864',
          fillColor: baseColor,
          fillOpacity: 0.1,
          weight: 0.9,
          opacity: 0.5,
        });
      } else if (isHot) {
        // Highlighted kecamatan klaster aktif: vibrant glow emas/aksen zona
        poly.setStyle({
          color: '#d5a864',
          fillColor: baseColor,
          fillOpacity: 0.55,
          weight: 2.4,
          opacity: 1,
        });
        poly.bringToFront();
      } else {
        // Bukan hotspot klaster aktif: batas halus namun tetap interaktif dan bisa di-zoom
        poly.setStyle({
          color: '#64748b',
          fillColor: '#334155',
          fillOpacity: 0.04,
          weight: 0.7,
          opacity: 0.35,
        });
      }
    });
  }, [kecamatanHighlightSet]);

  // Re-fit map bounds when region or highlight changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // If multi-highlight active, fit to combined bounds of all highlighted polygons
    if (highlightSet.size > 1) {
      const boundsArr = Array.from(highlightSet)
        .map((id) => polygonsRef.current[id]?.getBounds())
        .filter(Boolean) as L.LatLngBounds[];
      if (boundsArr.length > 0) {
        const combined = boundsArr.reduce((acc, b) => acc.extend(b), boundsArr[0]);
        map.fitBounds(combined, { padding: [24, 24], maxZoom: 11, duration: 0.7 });
        return;
      }
    }

    if (isAll) {
      map.fitBounds(diyBounds, { padding: [16, 16], duration: 0.6 });
    } else {
      const poly = polygonsRef.current[activeRegionId];
      if (poly) {
        map.fitBounds(poly.getBounds(), { padding: [30, 30], maxZoom: 12, duration: 0.6 });
      }
    }
  }, [activeRegionId, highlightSet]);

  const handleRegionClick = (reg: YogyakartaRegion) => {
    setActiveRegionId(reg.id);
    onSelectRegion(reg);
  };

  const handleSelectAll = () => {
    setActiveRegionId('semua');
    onSelectRegion(DIY_ALL_REGION);
  };

  const getInspectWaLink = () => {
    if (!inspectedPoint) return 'https://wa.me/6281215447788';
    const msg = `Halo Tim Jogja Investor Club, saya menandai titik tanah di peta GIS (${inspectedPoint.lat}, ${inspectedPoint.lng} - Wilayah ${inspectedPoint.regionName}). Lokasi berjarak ~${inspectedPoint.nearestExit.dist} km dari ${inspectedPoint.nearestExit.name} dan ~${inspectedPoint.nearestPoi.dist} km dari ${inspectedPoint.nearestPoi.name}. Mohon info kelayakan dan potensi pengembangan lahannya.`;
    return `https://wa.me/6281215447788?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-4">
      {/* Modern High-Tech GIS Frame (No round, flush with outer terminal) */}
      <div className="relative overflow-hidden bg-[#051410]">
        
        {/* Map Layer Controls & Theme Floating on Top Right */}
        <div className="absolute top-3 right-3 z-[400] flex items-center justify-end pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 bg-[#071914]/95 backdrop-blur-md p-1 rounded-xl border border-white/15 text-[11px] shadow-lg pointer-events-auto">
            {/* Toggle Tol */}
            <button
              type="button"
              onClick={() => setShowTollLayer(!showTollLayer)}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                showTollLayer || filterMode === 'akses'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Tampilkan / Sembunyikan Jalur & Exit Tol"
            >
              <Route className="w-3 h-3 text-amber-400" />
              <span>Jalur Tol</span>
            </button>

            {/* Toggle POI */}
            <button
              type="button"
              onClick={() => setShowPoiLayer(!showPoiLayer)}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                showPoiLayer
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Tampilkan Kampus & Titik Magnet Investasi"
            >
              <GraduationCap className="w-3 h-3 text-emerald-400" />
              <span>Kampus & RS</span>
            </button>

            {/* Theme switcher */}
            <div className="h-3.5 w-px bg-white/20 mx-0.5" />

            <button
              type="button"
              onClick={() => setMapTheme('dark-hud')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                mapTheme === 'dark-hud'
                  ? 'bg-[#d5a864] text-[#071914]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              GIS Dark
            </button>
            <button
              type="button"
              onClick={() => setMapTheme('satellite')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                mapTheme === 'satellite'
                  ? 'bg-[#d5a864] text-[#071914]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Satelit
            </button>
            <button
              type="button"
              onClick={() => setMapTheme('street')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                mapTheme === 'street'
                  ? 'bg-[#d5a864] text-[#071914]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Jalan
            </button>

            {/* Reset Zoom Button */}
            <div className="h-3.5 w-px bg-white/20 mx-0.5" />
            <button
              type="button"
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.fitBounds(diyBounds, { padding: [16, 16], duration: 0.8 });
                }
              }}
              className="px-2 py-1 rounded-lg font-semibold cursor-pointer transition-colors text-neutral-300 hover:text-white hover:bg-white/10 flex items-center gap-1"
              title="Reset Tampilan ke Seluruh DIY"
            >
              <Compass className="w-3 h-3 text-[#d5a864]" />
              <span>Fit DIY</span>
            </button>
          </div>
        </div>



        {/* Leaflet Mount Div */}
        <div
          ref={mapContainerRef}
          style={{ height }}
          className="w-full z-0 bg-[#071914] cursor-crosshair"
        />

        {/* Region Selector Toolbar under map */}
        <div className="p-3 bg-[#0a231c]/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-1 flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#d5a864]" />
              Wilayah:
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
              const buttonColor = filterMode === 'harga' ? reg.njopColor : reg.color;
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
                    style={{ backgroundColor: buttonColor }}
                  />
                  <span>{reg.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            {filterMode === 'harga' ? (
              <span className="flex items-center gap-1.5 text-amber-300">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>Basis NJOP Resmi PBB-P2</span>
              </span>
            ) : filterMode === 'akses' ? (
              <span className="flex items-center gap-1.5 text-blue-300">
                <Route className="w-3.5 h-3.5 text-amber-400" />
                <span>Trase Tol &amp; 5 Exit Gate</span>
              </span>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-amber-400 inline-block border-t border-dashed" />
                  <span>Trase Tol</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span>Kampus &amp; RS</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* POPUP / DRAWER: Real-Time Inspected Land Point (Ketika User Klik Titik Peta) */}
      {inspectedPoint && (
        <div className="bg-gradient-to-r from-[#0a271f] via-[#0d2e24] to-[#0a231c] border-2 border-[#d5a864]/60 rounded-2xl p-5 shadow-2xl space-y-4 text-white relative animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#d5a864] text-[#071914] text-[10px] font-black uppercase tracking-wider">
                  TITIK LAHAN TERPILIH
                </span>
                <span className="font-mono text-xs text-neutral-300">
                  [{inspectedPoint.lat}, {inspectedPoint.lng}] · Wilayah {inspectedPoint.regionName}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d5a864]" />
                Hasil Analisis Kelayakan Spasial Instan
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setInspectedPoint(null)}
              className="self-end sm:self-center p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Metric Box Analisis Titik */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#071914] rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono text-amber-400 flex items-center gap-1">
                <Route className="w-3 h-3" /> Gerbang Tol Terdekat
              </span>
              <p className="text-sm font-bold text-white truncate">{inspectedPoint.nearestExit.name}</p>
              <p className="text-xs text-neutral-300 font-mono">
                ~{inspectedPoint.nearestExit.dist} km ({inspectedPoint.nearestExit.toll})
              </p>
            </div>

            <div className="p-3 bg-[#071914] rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono text-emerald-400 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> Indikasi NJOP &amp; Pasar
              </span>
              <p className="text-sm font-bold text-white truncate">NJOP: {inspectedPoint.njopPrice}</p>
              <p className="text-xs text-emerald-400 font-mono">
                Pasar: {inspectedPoint.estPrice}
              </p>
            </div>

            <div className="p-3 bg-[#071914] rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono text-[#d5a864] flex items-center gap-1">
                <Zap className="w-3 h-3" /> Rekomendasi Pemanfaatan
              </span>
              <p className="text-sm font-bold text-[#d5a864] truncate">{inspectedPoint.recommended}</p>
              <p className="text-xs text-neutral-300 font-mono">
                Radius Magnet: ~{inspectedPoint.nearestPoi.dist} km ({inspectedPoint.nearestPoi.name})
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <p className="text-xs text-neutral-300">
              Tertarik mengembangkan tanah di koordinat ini? Tim riset JIC siap membuatkan studi kelayakan legalitas &amp; ROI.
            </p>
            <a
              href={getInspectWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasi Titik Lahan Ini via WA</span>
            </a>
          </div>
        </div>
      )}

      {/* Selected Region Profile Detail HUD Card */}
      <div className="bg-[#0a231c]/90 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-white backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                style={{ backgroundColor: filterMode === 'harga' ? activeRegion.njopColor : activeRegion.color }}
              />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#d5a864]">
                {activeRegion.code} · {isAll ? 'OVERVIEW SELURUH DIY' : 'SPASIAL TERPILIH'}
              </span>
              {filterMode === 'harga' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  DATA NJOP PBB-P2 RESMI
                </span>
              )}
              {filterMode === 'akses' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  AKSES INFRASTRUKTUR TOL
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
              {activeRegion.fullName}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-[#071914] border border-[#d5a864]/40 text-[#d5a864] text-xs font-bold rounded-xl shadow-xs tabular-nums">
              Est. Yield: {activeRegion.yieldEst}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          {filterMode === 'harga' ? activeRegion.njopRangeDetail : filterMode === 'akses' ? activeRegion.tollAccessDesc : activeRegion.desc}
        </p>

        {/* 4 High-Tech Data Grid Tiles (Dynamic according to filterMode) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {filterMode === 'harga' ? (
            <>
              <div className="p-3.5 rounded-2xl bg-[#071914] border border-amber-500/30">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-mono font-bold">
                  NJOP Resmi (PBB-P2)
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block mt-1 tabular-nums">
                  {activeRegion.njopPrice}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Ketetapan Pemkab/Pemkot</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-mono font-bold">
                  Harga Transaksi Pasar
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block mt-1 tabular-nums">
                  {activeRegion.landPrice}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Rata-rata 2024/2025</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Rasio NJOP vs Pasar
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#d5a864] block mt-1 truncate">
                  {activeRegion.njopRatio}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Ruang apresiasi nilai</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Rekomendasi Aset
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#d5a864] block mt-1 truncate">
                  {activeRegion.recommended}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Best Investment Fit</span>
              </div>
            </>
          ) : filterMode === 'akses' ? (
            <>
              <div className="p-3.5 rounded-2xl bg-[#071914] border border-amber-500/30">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-mono font-bold">
                  Konektivitas Tol
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block mt-1 truncate">
                  {activeRegion.id === 'sleman' ? '5 Exit Tol' : activeRegion.id === 'kulonprogo' ? 'Tol YIA Bandara' : activeRegion.id === 'kota' ? '12-15 mnt ke Exit' : activeRegion.id === 'bantul' ? 'Ring Road Sltn' : 'Jalur JJLS'}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Akses Cepat Trans-Jawa</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Harga Lahan Pasar
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block mt-1 tabular-nums">
                  {activeRegion.landPrice}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Entry Price Lahan</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Tingkat Okupansi
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-1 tabular-nums">
                  {activeRegion.occupancy}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Daya Serap Pasar</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Rekomendasi
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#d5a864] block mt-1 truncate">
                  {activeRegion.recommended}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Pemanfaatan Lahan</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Harga Lahan Pasar
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block mt-1 tabular-nums">
                  {activeRegion.landPrice}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">NJOP: {activeRegion.njopPrice}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Tingkat Okupansi
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-1 tabular-nums">
                  {activeRegion.occupancy}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Target Pasar Stabil</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Aturan KDB
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-300 block mt-1 truncate">
                  {activeRegion.kdb}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">RTRW Resmi DIY</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Rekomendasi
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#d5a864] block mt-1 truncate">
                  {activeRegion.recommended}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Model Investasi Terbaik</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button & Landmarks */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div className="text-xs text-neutral-300 flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#d5a864] shrink-0" />
            <span className="truncate">Landmark Kunci: {activeRegion.highlights.join(' · ')}</span>
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
