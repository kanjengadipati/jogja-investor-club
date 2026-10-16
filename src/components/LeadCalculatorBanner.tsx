import React, { useState, useMemo } from 'react';
import { JOGJA_IMAGES } from '../data/jogjaData';
import { LeadFormData, PropertyType } from '../types/property';
import { calculateLandPotential, formatShortRupiah } from '../utils/calculator';
import { User, Phone, Home, ArrowRight, ChevronDown, ChevronUp, Sparkles, Check, Copy } from 'lucide-react';

interface LeadCalculatorBannerProps {
  initialPropertyType?: PropertyType;
  initialZone?: string;
}

export const LeadCalculatorBanner: React.FC<LeadCalculatorBannerProps> = ({
  initialPropertyType = 'kos',
  initialZone = 'Sleman - Kawasan Kampus (Seturan / Condongcatur)',
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    locationZone: initialZone,
    landArea: 200,
    propertyType: initialPropertyType,
    budgetRange: 'Rp 1 Miliar - Rp 2 Miliar',
    startTimeline: '1 - 3 Bulan ke depan',
    whatsappNumber: '',
  });

  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (initialPropertyType) {
      setFormData((prev) => ({ ...prev, propertyType: initialPropertyType }));
    }
  }, [initialPropertyType]);

  React.useEffect(() => {
    if (initialZone) {
      setFormData((prev) => ({ ...prev, locationZone: initialZone }));
    }
  }, [initialZone]);

  const result = useMemo(() => {
    return calculateLandPotential(formData);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.formattedWhatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hitung-potensi" className="py-16 lg:py-20 bg-[#071914] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner Container matching screenshot */}
        <div className="bg-[#0b201a] border border-[#c5a25d]/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Panoramic Heritage Photography matching screenshot */}
            <div className="lg:col-span-3 relative min-h-[200px] lg:min-h-full">
              <img
                src={JOGJA_IMAGES.heritage}
                alt="Prambanan dan Tugu Yogyakarta Siluet Senja"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b201a]/90 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b201a] via-transparent to-transparent lg:hidden" />
            </div>

            {/* Center: Title & Copy matching screenshot */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-snug">
                Hitung Potensi <br />
                <span className="font-sans font-extrabold text-white">
                  Tanah Anda
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Masukkan informasi lahan Anda, dan dapatkan analisis potensi pengembangan properti di Jogja secara gratis.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDetailedViewOpen(!isDetailedViewOpen)}
                  className="text-xs text-[#d5a864] hover:text-white flex items-center gap-1 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  <span>{isDetailedViewOpen ? 'Tutup Parameter Detail' : 'Sesuaikan Luas Tanah & Detail Lahan'}</span>
                  {isDetailedViewOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Right: Form Box matching screenshot */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-[#071914]/40">
              <form onSubmit={handleSubmit} className="bg-[#fbf9f5] rounded-2xl p-5 sm:p-6 text-[#1a221f] space-y-4 shadow-xl">
                {/* Row 1: Nama Lengkap & Nomor WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Nama Lengkap"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#d5a864] focus:border-[#d5a864]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Nomor WhatsApp"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#d5a864] focus:border-[#d5a864]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Jenis Properti yang Diminati & Button */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-7">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                        <Home className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                        className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#d5a864] focus:border-[#d5a864] appearance-none cursor-pointer"
                      >
                        <option value="rumah">Rumah Keluarga Modern</option>
                        <option value="villa">Villa Liburan Eksklusif</option>
                        <option value="kos">Homestay & Kos Eksklusif</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-5">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] text-[#071914] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Kirim & Konsultasi Gratis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Interactive Detailed Simulation Drawer (Expandable) */}
          {isDetailedViewOpen && (
            <div className="border-t border-white/10 p-6 sm:p-8 bg-[#071914]/90 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d5a864]">
                  <Sparkles className="w-4 h-4" />
                  <span>Kalkulator & Simulasi Potensi Lahan Yogyakarta</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-400">Lokasi:</span>
                  <span className="font-bold text-white">{formData.locationZone}</span>
                </div>
              </div>

              {/* Sliders and inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-neutral-300">Luas Tanah:</span>
                    <span className="text-[#d5a864] tabular-nums font-black">{formData.landArea} m²</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="1000"
                    step="10"
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: Number(e.target.value) })}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#d5a864]"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>60 m²</span>
                    <span>200 m²</span>
                    <span>500 m²</span>
                    <span>1.000 m²</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    Kawasan Lahan di DIY:
                  </label>
                  <select
                    value={formData.locationZone}
                    onChange={(e) => setFormData({ ...formData, locationZone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#0b201a] text-white border border-white/20 rounded-xl"
                  >
                    <option value="Sleman - Kawasan Kampus (Seturan / Condongcatur / UGM)">
                      Sleman - Kawasan Kampus (Seturan / UGM)
                    </option>
                    <option value="Sleman - Kawasan Wisata (Kaliurang / Pakem / Ngaglik)">
                      Sleman - Kawasan Wisata (Kaliurang / Pakem)
                    </option>
                    <option value="Kota Yogyakarta - Pusat & Heritage (Malioboro / Keraton)">
                      Kota Yogyakarta - Pusat & Heritage
                    </option>
                    <option value="Bantul - Kawasan Wisata & Budaya (Kasihan / Sewon)">
                      Bantul - Kawasan Wisata & Budaya
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    Estimasi Bujet Pembangunan:
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#0b201a] text-white border border-white/20 rounded-xl"
                  >
                    <option value="Rp 500 Jt - Rp 1 Miliar">Rp 500 Jt - Rp 1 Miliar</option>
                    <option value="Rp 1 Miliar - Rp 2 Miliar">Rp 1 Miliar - Rp 2 Miliar</option>
                    <option value="Rp 2 Miliar - Rp 3 Miliar">Rp 2 Miliar - Rp 3 Miliar</option>
                    <option value="> Rp 3 Miliar">&gt; Rp 3 Miliar</option>
                  </select>
                </div>
              </div>

              {/* Instant Output Summary Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="bg-[#0b201a] p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-neutral-400 block">Est. Biaya Bangun (RAB)</span>
                  <span className="text-base sm:text-lg font-black text-[#d5a864] tabular-nums">
                    {formatShortRupiah(result.estimatedRAB)}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">~{result.totalBuildingArea} m² Luas Bangunan</span>
                </div>

                <div className="bg-[#0b201a] p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-neutral-400 block">Dasar Bangunan (KDB 60%)</span>
                  <span className="text-base sm:text-lg font-black text-white tabular-nums">
                    {result.buildingCoverageArea} m²
                  </span>
                  <span className="text-[10px] text-emerald-400 block">{result.suggestedFloors} Lantai Rekomendasi</span>
                </div>

                <div className="bg-[#0b201a] p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-neutral-400 block">
                    {formData.propertyType === 'kos' ? 'Kapasitas Kamar' : 'Prospek Imbal Hasil'}
                  </span>
                  <span className="text-base sm:text-lg font-black text-white tabular-nums">
                    {formData.propertyType === 'kos'
                      ? `${result.roomCountEstimate} Kamar AC`
                      : formData.propertyType === 'villa'
                      ? 'Private Pool Villa'
                      : 'Rumah Mewah Tropis'}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">
                    {formData.propertyType === 'kos' ? 'Kamar Mandi Dalam' : 'Fasilitas Lengkap'}
                  </span>
                </div>

                <div className="bg-[#0b201a] p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-neutral-400 block">Proyeksi Arus Kas</span>
                  <span className="text-base sm:text-lg font-black text-emerald-400 tabular-nums">
                    {result.monthlyRevenueEstimate ? formatShortRupiah(result.monthlyRevenueEstimate) + '/bln' : '+12-15% /thn'}
                  </span>
                  <span className="text-[10px] text-emerald-300 block">Est. ROI ~{result.estimatedROI}%</span>
                </div>
              </div>

              {/* 3 Alternative Concepts Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  3 Alternatif Konsep untuk Lahan {formData.landArea} m²:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {result.threeConcepts.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => setFormData({ ...formData, propertyType: c.type })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.propertyType === c.type
                          ? 'bg-[#0e2c23] border-[#d5a864] ring-1 ring-[#d5a864]'
                          : 'bg-[#0b201a] border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold uppercase text-[#d5a864]">{c.title}</span>
                        <span className="text-[10px] text-neutral-400">{c.floors} Lantai</span>
                      </div>
                      <span className="text-sm font-bold text-white block mb-1">{formatShortRupiah(c.estimatedCost)}</span>
                      <p className="text-[11px] text-neutral-300 leading-tight">{c.cashflowSummary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-neutral-400">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Ringkasan berhasil disalin!' : 'Salin rincian kalkulasi ini'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-[#d5a864] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Lanjutkan Konsultasi via WhatsApp &rarr;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
