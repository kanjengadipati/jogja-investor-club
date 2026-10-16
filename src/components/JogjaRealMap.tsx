'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass, MapPin, ArrowRight, Route, GraduationCap,
  Sparkles, MessageSquare, Check, X, Info, Zap
} from 'lucide-react';
import jogjaGeoDataRaw from '../data/jogjaGeoData.json';
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

interface InspectedPointInfo {
  lat: number;
  lng: number;
  regionName: string;
  nearestExit: { name: string; dist: number; toll: string };
  nearestPoi: { name: string; dist: number; badge: string };
  estPrice: string;
  recommended: string;
}

interface JogjaRealMapProps {
  selectedRegionId?: string;
  filterMode?: 'zonasi' | 'harga' | 'akses';
  onSelectRegion: (reg: YogyakartaRegion) => void;
  onApplyZoneToCalculator: (zoneName: string) => void;
  compact?: boolean;
  height?: string;
}

export const JogjaRealMap: React.FC<JogjaRealMapProps> = ({
  selectedRegionId = 'semua',
  filterMode = 'zonasi',
  onSelectRegion,
  onApplyZoneToCalculator,
  height = '480px',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polygonsRef = useRef<{ [key: string]: L.Polygon }>({});
  const outerBorderRef = useRef<L.Polygon | null>(null);
  const tollLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const poiLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const inspectMarkerRef = useRef<L.Marker | null>(null);

  const [mapTheme, setMapTheme] = useState<'dark-hud' | 'light' | 'street'>('dark-hud');
  const [activeRegionId, setActiveRegionId] = useState(selectedRegionId);

  // Layer Toggles
  const [showTollLayer, setShowTollLayer] = useState(true);
  const [showPoiLayer, setShowPoiLayer] = useState(true);
  const [isPinModeActive, setIsPinModeActive] = useState(false);
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
    // 1. Tentukan Region Terdekat
    let closestReg = YOGYAKARTA_REGIONS[0];
    let minRegDist = 9999;
    YOGYAKARTA_REGIONS.forEach((reg) => {
      const d = calcDistanceKm(lat, lng, reg.lat, reg.lng);
      if (d < minRegDist) {
        minRegDist = d;
        closestReg = reg;
      }
    });

    // 2. Tentukan Exit Tol Terdekat
    let closestExit = TOLL_EXITS[0];
    let minExitDist = 9999;
    TOLL_EXITS.forEach((ex) => {
      const d = calcDistanceKm(lat, lng, ex.lat, ex.lng);
      if (d < minExitDist) {
        minExitDist = d;
        closestExit = ex;
      }
    });

    // 3. Tentukan POI Kampus / RS Terdekat
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
      estPrice: closestReg.landPrice,
      recommended: closestReg.recommended,
    };

    setInspectedPoint(info);

    // Update marker on map
    if (inspectMarkerRef.current) {
      inspectMarkerRef.current.remove();
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

    // 1. Draw Official Region Boundaries
    YOGYAKARTA_REGIONS.forEach((reg) => {
      const isSelected = reg.id === activeRegionId;

      const polygon = L.polygon(reg.polygon, {
        color: reg.color,
        fillColor: reg.color,
        fillOpacity: isAll ? 0.22 : isSelected ? 0.42 : 0.10,
        weight: isAll ? 1.5 : isSelected ? 3 : 1.2,
        opacity: isAll ? 0.85 : isSelected ? 1 : 0.65,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      polygon.on('click', (e) => {
        if (isPinModeActive) {
          handleInspectCoordinates(e.latlng.lat, e.latlng.lng, map);
        } else {
          setActiveRegionId(reg.id);
          onSelectRegion(reg);
          map.fitBounds(polygon.getBounds(), { padding: [30, 30], maxZoom: 12, duration: 0.6 });
        }
      });

      polygonsRef.current[reg.id] = polygon;

      // Region Pin Marker
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
        if (!isPinModeActive) {
          setActiveRegionId(reg.id);
          onSelectRegion(reg);
          map.fitBounds(polygon.getBounds(), { padding: [30, 30], maxZoom: 12, duration: 0.6 });
        }
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
        weight: 6,
        opacity: 0.35,
        lineCap: 'round',
      }).addTo(tollGroup);

      // Main dashed toll line
      const polyline = L.polyline(route.path, {
        color: route.color,
        weight: 3.2,
        opacity: 0.95,
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

    // Toll Exit Markers
    TOLL_EXITS.forEach((exit) => {
      const exitIcon = L.divIcon({
        className: 'toll-exit-pin',
        html: `
          <div style="background: #071914; border: 2px solid #eab308; color: #eab308; border-radius: 8px; padding: 2px 6px; font-size: 10px; font-weight: 800; font-family: monospace; display: flex; align-items: center; gap: 4px; box-shadow: 0 0 8px rgba(234,179,8,0.5); cursor: pointer; white-space: nowrap;">
            <span>🚧</span>
            <span>${exit.name.replace('Exit Tol ', '')}</span>
          </div>
        `,
        iconSize: [120, 22],
        iconAnchor: [60, 11],
      });

      const exitMarker = L.marker([exit.lat, exit.lng], { icon: exitIcon }).addTo(tollGroup);
      exitMarker.bindPopup(`
        <div style="font-family: sans-serif; color: #fff; background: #071914; padding: 10px; border-radius: 10px; border: 1px solid #eab308; min-width: 200px;">
          <div style="font-size: 10px; color: #eab308; font-weight: bold; text-transform: uppercase;">Exit Gerbang Tol Strategis</div>
          <div style="font-size: 13px; font-weight: bold; margin: 2px 0 4px 0;">${exit.name}</div>
          <div style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">${exit.impactZone}</div>
          <div style="margin-top: 6px; font-size: 10px; font-family: monospace; color: #10b981;">Target Siap: ${exit.completion}</div>
        </div>
      `);
    });
    tollLayerGroupRef.current = tollGroup;
    if (showTollLayer) {
      tollGroup.addTo(map);
    }

    // 4. POI Magnet Investasi Layer (Kampus & RS)
    const poiGroup = L.layerGroup();
    INVESTMENT_POIS.forEach((poi) => {
      // Radius buffer circle
      L.circle([poi.lat, poi.lng], {
        radius: poi.catchmentRadius,
        color: poi.category === 'kampus' ? '#10b981' : poi.category === 'kesehatan' ? '#ef4444' : '#06b6d4',
        fillColor: poi.category === 'kampus' ? '#10b981' : poi.category === 'kesehatan' ? '#ef4444' : '#06b6d4',
        fillOpacity: 0.05,
        weight: 1,
        dashArray: '4, 4',
      }).addTo(poiGroup);

      const categoryEmoji =
        poi.category === 'kampus' ? '🎓' :
        poi.category === 'kesehatan' ? '🏥' :
        poi.category === 'transport' ? '✈️' : '🌲';

      const poiIcon = L.divIcon({
        className: 'poi-pin',
        html: `
          <div style="background: rgba(7,25,20,0.92); border: 1.5px solid #d5a864; color: #fff; border-radius: 9999px; padding: 2px 7px; font-size: 10px; font-weight: bold; font-family: sans-serif; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.8); cursor: pointer; white-space: nowrap;">
            <span>${categoryEmoji}</span>
            <span>${poi.name.split(' (')[0]}</span>
          </div>
        `,
        iconSize: [110, 20],
        iconAnchor: [55, 10],
      });

      const poiMarker = L.marker([poi.lat, poi.lng], { icon: poiIcon }).addTo(poiGroup);
      poiMarker.bindPopup(`
        <div style="font-family: sans-serif; color: #fff; background: #071914; padding: 10px; border-radius: 10px; border: 1px solid #d5a864; min-width: 210px;">
          <div style="font-size: 10px; color: #d5a864; font-weight: bold;">MAGNET INVESTASI · RADIUS TANGKAPAN</div>
          <div style="font-size: 13px; font-weight: bold; margin: 3px 0 4px 0;">${categoryEmoji} ${poi.name}</div>
          <div style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">${poi.detail}</div>
          <div style="margin-top: 6px; font-size: 10px; color: #10b981; font-weight: bold;">Captive Market: ${poi.badge}</div>
        </div>
      `);
    });
    poiLayerGroupRef.current = poiGroup;
    if (showPoiLayer) {
      poiGroup.addTo(map);
    }

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

  // Toggle Toll Layer dynamically
  useEffect(() => {
    if (!mapInstanceRef.current || !tollLayerGroupRef.current) return;
    if (showTollLayer) {
      if (!mapInstanceRef.current.hasLayer(tollLayerGroupRef.current)) {
        tollLayerGroupRef.current.addTo(mapInstanceRef.current);
      }
    } else {
      if (mapInstanceRef.current.hasLayer(tollLayerGroupRef.current)) {
        tollLayerGroupRef.current.remove();
      }
    }
  }, [showTollLayer]);

  // Toggle POI Layer dynamically
  useEffect(() => {
    if (!mapInstanceRef.current || !poiLayerGroupRef.current) return;
    if (showPoiLayer) {
      if (!mapInstanceRef.current.hasLayer(poiLayerGroupRef.current)) {
        poiLayerGroupRef.current.addTo(mapInstanceRef.current);
      }
    } else {
      if (mapInstanceRef.current.hasLayer(poiLayerGroupRef.current)) {
        poiLayerGroupRef.current.remove();
      }
    }
  }, [showPoiLayer]);

  // Adjust highlights & bounds when activeRegionId changes
  useEffect(() => {
    Object.keys(polygonsRef.current).forEach((regId) => {
      const poly = polygonsRef.current[regId];
      const isSelected = regId === activeRegionId;
      const reg = YOGYAKARTA_REGIONS.find((r) => r.id === regId);
      if (poly && reg) {
        poly.setStyle({
          fillOpacity: isAll ? 0.22 : isSelected ? 0.42 : 0.10,
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

  // WhatsApp consultation link for inspected point
  const getInspectWaLink = () => {
    if (!inspectedPoint) return 'https://wa.me/6281215447788';
    const msg = `Halo Tim Jogja Investor Club, saya menandai titik tanah di peta GIS (${inspectedPoint.lat}, ${inspectedPoint.lng} - Wilayah ${inspectedPoint.regionName}). Lokasi berjarak ~${inspectedPoint.nearestExit.dist} km dari ${inspectedPoint.nearestExit.name} dan ~${inspectedPoint.nearestPoi.dist} km dari ${inspectedPoint.nearestPoi.name}. Mohon info kelayakan dan potensi pengembangan lahannya.`;
    return `https://wa.me/6281215447788?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-4">
      {/* Modern High-Tech GIS Frame */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#051410] ring-1 ring-white/10">
        
        {/* HUD Top Bar Floating Over Map */}
        <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-[#071914]/92 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-white flex items-center gap-2 text-xs shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-[#d5a864] tracking-tight">GIS SPATIAL INTELLIGENCE</span>
            <span className="text-[10px] text-neutral-400 font-mono hidden md:inline">
              5 WILAYAH · MEGA PROYEK TOL · POI INVESTASI
            </span>
          </div>

          {/* Map Layer Controls & Theme */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#071914]/92 backdrop-blur-md p-1 rounded-xl border border-white/15 text-[11px] shadow-lg pointer-events-auto">
            {/* Toggle Tol */}
            <button
              type="button"
              onClick={() => setShowTollLayer(!showTollLayer)}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                showTollLayer
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
              onClick={() => setMapTheme('street')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                mapTheme === 'street'
                  ? 'bg-[#d5a864] text-[#071914]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Jalan
            </button>
          </div>
        </div>

        {/* Floating Hint "Klik Peta untuk Analisis Titik Lahan" */}
        <div className="absolute bottom-16 right-3 z-[400] pointer-events-auto">
          <div className="bg-[#071914]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#d5a864]/30 text-white text-[11px] shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d5a864] animate-ping" />
            <span className="text-neutral-300">
              💡 <span className="text-white font-medium">Klik sembarang titik di peta</span> untuk cek potensi lahan
            </span>
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

          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-amber-400 inline-block border-t border-dashed" />
              <span>Trase Tol</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Kampus & RS</span>
            </span>
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
                <GraduationCap className="w-3 h-3" /> Magnet / POI Terdekat
              </span>
              <p className="text-sm font-bold text-white truncate">{inspectedPoint.nearestPoi.name}</p>
              <p className="text-xs text-neutral-300 font-mono">
                ~{inspectedPoint.nearestPoi.dist} km · {inspectedPoint.nearestPoi.badge}
              </p>
            </div>

            <div className="p-3 bg-[#071914] rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono text-[#d5a864] flex items-center gap-1">
                <Zap className="w-3 h-3" /> Rekomendasi Pemanfaatan
              </span>
              <p className="text-sm font-bold text-[#d5a864] truncate">{inspectedPoint.recommended}</p>
              <p className="text-xs text-neutral-300 font-mono">Range: {inspectedPoint.estPrice}</p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <p className="text-xs text-neutral-300">
              Tertarik mengembangkan tanah di koordinat ini? Tim riset JIC siap membuatkan studi kelayakan legalitas & ROI.
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
            <span className="px-3.5 py-1.5 bg-[#071914] border border-[#d5a864]/40 text-[#d5a864] text-xs font-bold rounded-xl shadow-xs tabular-nums">
              Est. Yield: {activeRegion.yieldEst}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          {activeRegion.desc}
        </p>

        {/* 4 High-Tech Data Grid Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Harga Lahan
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block mt-1 tabular-nums">
              {activeRegion.landPrice}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Tingkat Okupansi
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-1 tabular-nums">
              {activeRegion.occupancy}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
              Aturan KDB
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-300 block mt-1 truncate">
              {activeRegion.kdb}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#071914] border border-white/10">
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
