import React, { useState } from 'react';
import { JOGJA_ZONES } from '../data/jogjaData';
import { JogjaOsmMap, INVESTMENT_BLOCKS, InvestmentBlock } from './JogjaOsmMap';
import { MapPin, TrendingUp, Building, Palmtree, Home, Compass, Layers, Globe } from 'lucide-react';

interface JogjaPotentialZonesProps {
  onSelectZone: (zoneName: string) => void;
}

export const JogjaPotentialZones: React.FC<JogjaPotentialZonesProps> = ({ onSelectZone }) => {
  const [selectedZoneId, setSelectedZoneId] = useState(JOGJA_ZONES[0].id);
  const [mapViewMode, setMapViewMode] = useState<'osm' | 'infographic'>('osm');

  const activeZone = JOGJA_ZONES.find((z) => z.id === selectedZoneId) || JOGJA_ZONES[0];

  const handleOsmBlockSelect = (block: InvestmentBlock) => {
    if (block.id === 'block-kampus') {
      setSelectedZoneId('sleman-kampus');
    } else if (block.id === 'block-wisata') {
      setSelectedZoneId('sleman-wisata');
    } else {
      setSelectedZoneId('kawasan-premium');
    }
  };

  return (
    <section id="peta-kawasan" className="py-20 bg-[#081c17] text-white border-b border-[#c5a25d]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a25d] mb-2">
              <span className="w-6 h-6 rounded-full bg-[#c5a25d] text-[#081c17] flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>Area Potensial di Jogja</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pemetaan Zonasi Investasi Yogyakarta
            </h2>
            <p className="text-base text-neutral-300 mt-2 max-w-2xl">
              Tiap sudut Yogyakarta memiliki karakteristik demografi dan perputaran ekonomi unik. Jelajahi peta OpenStreetMap interaktif untuk melihat potensi riil lahan Anda.
            </p>
          </div>

          {/* Mode Switcher: OSM Map vs Infografis Diagram */}
          <div className="flex items-center gap-2 bg-[#0e2c23] p-1.5 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setMapViewMode('osm')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                mapViewMode === 'osm'
                  ? 'bg-[#c5a25d] text-[#081c17] shadow-sm'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Peta OpenStreetMap</span>
            </button>
            <button
              onClick={() => setMapViewMode('infographic')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                mapViewMode === 'infographic'
                  ? 'bg-[#c5a25d] text-[#081c17] shadow-sm'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Diagram Wilayah</span>
            </button>
          </div>
        </div>

        {/* Interactive Zone Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Map View (OpenStreetMap or Infographic SVG) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between">
            {mapViewMode === 'osm' ? (
              <div className="space-y-3">
                <JogjaOsmMap
                  selectedLocationId={selectedZoneId}
                  onSelectBlock={handleOsmBlockSelect}
                  onApplyZoneToCalculator={onSelectZone}
                />
                <div className="flex flex-wrap items-center justify-between text-[11px] text-neutral-400 px-1">
                  <span>Peta gratis OpenStreetMap (OSM) · Modul Pemilihan Blok Interaktif</span>
                  <span className="text-[#c5a25d] font-semibold">
                    Klik blok poligon atau klik peta untuk menandai titik kavling tanah
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#0e2c23] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Diagram Zonasi Yogyakarta
                  </span>
                  <span className="text-[11px] bg-[#c5a25d]/20 text-[#c5a25d] px-2.5 py-1 rounded-md font-medium">
                    Sesuai Flyer
                  </span>
                </div>

                {/* Stylized SVG Map */}
                <div className="relative aspect-[4/3] w-full flex items-center justify-center py-4">
                  <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-lg">
                    <defs>
                      <linearGradient id="slemanGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#48bb78" />
                        <stop offset="100%" stopColor="#38a169" />
                      </linearGradient>
                      <linearGradient id="kotaGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ecc94b" />
                        <stop offset="100%" stopColor="#d69e2e" />
                      </linearGradient>
                      <linearGradient id="bantulGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4299e1" />
                        <stop offset="100%" stopColor="#3182ce" />
                      </linearGradient>
                    </defs>

                    {/* Sleman (North) */}
                    <path
                      d="M140,40 L260,35 L330,90 L300,160 L230,165 L170,165 L120,130 Z"
                      fill="url(#slemanGrad2)"
                      opacity={selectedZoneId.startsWith('sleman') ? '1' : '0.6'}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:opacity-100"
                      onClick={() => setSelectedZoneId('sleman-kampus')}
                    />
                    <text x="215" y="105" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="15" className="pointer-events-none select-none">
                      SLEMAN
                    </text>
                    <text x="215" y="122" textAnchor="middle" fill="#f0fff4" fontSize="10" className="pointer-events-none select-none">
                      (Kampus & Wisata)
                    </text>

                    {/* Kota Yogyakarta (Center) */}
                    <path
                      d="M175,170 L235,170 L245,205 L165,205 Z"
                      fill="url(#kotaGrad2)"
                      opacity={selectedZoneId === 'kawasan-premium' ? '1' : '0.7'}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:opacity-100"
                      onClick={() => setSelectedZoneId('kawasan-premium')}
                    />
                    <text x="205" y="190" textAnchor="middle" fill="#081c17" fontWeight="bold" fontSize="12" className="pointer-events-none select-none">
                      KOTA JOGJA
                    </text>

                    {/* Bantul (South) */}
                    <path
                      d="M110,210 L290,210 L270,290 L130,290 Z"
                      fill="url(#bantulGrad2)"
                      opacity={selectedZoneId === 'kawasan-premium' ? '1' : '0.6'}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:opacity-100"
                      onClick={() => setSelectedZoneId('kawasan-premium')}
                    />
                    <text x="200" y="255" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="15" className="pointer-events-none select-none">
                      BANTUL
                    </text>
                    <text x="200" y="272" textAnchor="middle" fill="#ebf8ff" fontSize="10" className="pointer-events-none select-none">
                      (Budaya & Homestay)
                    </text>

                    <circle cx="210" cy="145" r="5" fill="#e53e3e" stroke="#fff" strokeWidth="2" />
                    <circle cx="220" cy="65" r="5" fill="#e53e3e" stroke="#fff" strokeWidth="2" />
                    <circle cx="160" cy="225" r="5" fill="#e53e3e" stroke="#fff" strokeWidth="2" />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38a169]" /> Sleman
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d69e2e]" /> Kota Jogja
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3182ce]" /> Bantul
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Zone Tabs & In-depth Profile */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-5">
            {/* 3 Zone Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {JOGJA_ZONES.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setSelectedZoneId(zone.id);
                      onSelectZone(zone.name);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#c5a25d] text-[#081c17] border-[#c5a25d] font-bold shadow-lg'
                        : 'bg-[#0f2e25] text-neutral-200 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider block opacity-75">
                      {zone.region}
                    </span>
                    <span className="text-xs font-bold block truncate">{zone.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Zone Detail Panel */}
            <div className="bg-[#0f2e25] border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">{activeZone.name}</h3>
                  <p className="text-xs text-[#c5a25d] font-medium mt-0.5">
                    Rekomendasi Utama:{' '}
                    <span className="underline font-bold uppercase">
                      {activeZone.recommendedProperty === 'kos'
                        ? 'Kos Eksklusif / Co-Living'
                        : activeZone.recommendedProperty === 'villa'
                        ? 'Villa Wisata / Homestay Harian'
                        : 'Rumah Tinggal Modern Tropis'}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-[#081c17] border border-[#c5a25d]/40 rounded-lg text-xs font-bold text-[#c5a25d] tabular-nums">
                    Est. Yield: {activeZone.yieldEstimate}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeZone.description}
              </p>

              {/* District tags */}
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400 block mb-2">
                  Cakupan Wilayah / Kelurahan Strategis:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeZone.subDistricts.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#081c17] border border-white/10 text-xs text-neutral-200"
                    >
                      📍 {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-0.5">Estimasi Harga Tanah</span>
                  <span className="font-bold text-white text-xs sm:text-sm tabular-nums">
                    {activeZone.landPriceRange}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Tingkat Okupansi</span>
                  <span className="font-bold text-emerald-400 text-xs sm:text-sm tabular-nums">
                    {activeZone.occupancyRate}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Fasilitas Terdekat</span>
                  <span className="text-neutral-300 truncate block text-xs">
                    {activeZone.landmarks.slice(0, 2).join(', ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectZone(`${activeZone.name} (${activeZone.subDistricts[0]})`)}
                className="w-full py-3 bg-[#c5a25d] hover:bg-[#d9b66f] text-[#081c17] font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MapPin className="w-4 h-4" />
                <span>Gunakan Kawasan Ini di Form Hitung Potensi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
