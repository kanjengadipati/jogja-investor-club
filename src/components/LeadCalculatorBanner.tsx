'use client';

import React, { useState, useMemo } from 'react';
import { JOGJA_IMAGES } from '../data/jogjaData';
import { LeadFormData, PropertyType } from '../types/property';
import { calculateLandPotential, formatShortRupiah } from '../utils/calculator';
import {
  User, Phone, Home, ArrowRight, ChevronDown, ChevronUp,
  Sparkles, Check, Copy, Shield, FileText, Compass, Send
} from 'lucide-react';

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

  const [notes, setNotes] = useState('');
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
    const customText = encodeURIComponent(
      `Halo Tim Jogja Investor Club, saya ${formData.fullName || 'Pemilik Lahan'}. ` +
      `Saya memiliki lahan di daerah "${formData.locationZone}" (estimasi luas ${formData.landArea} m²) ` +
      `dan tertarik mengembangkan menjadi ${formData.propertyType === 'rumah' ? 'Rumah Keluarga' : formData.propertyType === 'villa' ? 'Villa Mewah' : 'Homestay & Kos Eksklusif'}. ` +
      (notes ? `Catatan: ${notes}. ` : '') +
      `Mohon info konsultasi awal gratis. Terima kasih!`
    );
    window.open(`https://wa.me/6282137000888?text=${customText}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.formattedWhatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hitung-potensi" className="py-20 lg:py-28 bg-[#061712] text-white relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d5a864]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Consultation Box Container matching Mockup Section 5 */}
        <div className="bg-[#0a221b] border border-[#d5a864]/25 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Column: Heritage Photo & Value Proposition (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-6">

              {/* Photo Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-lg border border-white/10 group">
                <img
                  src={JOGJA_IMAGES.heritage}
                  alt="Candi Prambanan dan Warisan Sejarah Yogyakarta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d5a864] font-bold">
                    YOGYAKARTA INVESTMENT HUB
                  </span>
                  <p className="text-sm font-semibold text-white drop-shadow-md">
                    Nilai tanah strategis dengan potensi yield tinggi se-DIY
                  </p>
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#d5a864]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KONSULTASI &amp; ANALISIS</span>
                </div>

                <h2
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
                  style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                >
                  Hitung Potensi{' '}
                  <span
                    className="italic font-normal text-[#d5a864]"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    Tanah Anda
                  </span>
                </h2>

                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  Dapatkan estimasi nilai, rekomendasi pengembangan, dan peluang investasi terbaik sesuai dengan lokasi dan tujuan Anda.
                </p>
              </div>

              {/* 3 Value Pillars matching Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#061712]/80 border border-white/10">
                  <FileText className="w-4 h-4 text-[#d5a864] shrink-0" />
                  <span className="text-xs font-semibold text-neutral-200 leading-snug">
                    Analisis Lengkap &amp; Data Akurat
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#061712]/80 border border-white/10">
                  <Compass className="w-4 h-4 text-[#d5a864] shrink-0" />
                  <span className="text-xs font-semibold text-neutral-200 leading-snug">
                    Rekomendasi Pengembangan
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#061712]/80 border border-white/10">
                  <Shield className="w-4 h-4 text-[#d5a864] shrink-0" />
                  <span className="text-xs font-semibold text-neutral-200 leading-snug">
                    Konsultasi Gratis Tanpa Biaya
                  </span>
                </div>
              </div>

              {/* Toggle Simulation Drawer */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsDetailedViewOpen(!isDetailedViewOpen)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#d5a864] hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                >
                  <span>{isDetailedViewOpen ? 'Tutup Parameter & Simulasi Anggaran' : 'Sesuaikan Luas Tanah & Estimasi RAB'}</span>
                  {isDetailedViewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* Right Column: Consultation Form (lg:col-span-6) */}
            <div className="lg:col-span-6">
              <div className="bg-[#071914] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">

                <div className="space-y-1">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                  >
                    Konsultasi Gratis
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Isi form di bawah, konsultan properti kami akan menghubungi Anda secara personal.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Nama Lengkap & Nomor WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Nama Lengkap *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Nama Anda"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#0a221b] border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#d5a864] focus:border-[#d5a864] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Nomor WhatsApp *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="0812xxxxxxx"
                          value={formData.whatsappNumber}
                          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#0a221b] border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#d5a864] focus:border-[#d5a864] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Jenis Properti */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Jenis Properti *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Home className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                        className="w-full pl-10 pr-10 py-3 text-sm bg-[#0a221b] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#d5a864] focus:border-[#d5a864] appearance-none cursor-pointer transition-all"
                      >
                        <option value="rumah" className="bg-[#071914] text-white">Rumah Tinggal / Hunian Keluarga</option>
                        <option value="villa" className="bg-[#071914] text-white">Villa Mewah / Staycation Pariwisata</option>
                        <option value="kos" className="bg-[#071914] text-white">Homestay &amp; Kos Eksklusif</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Keterangan (Opsional) */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Keterangan (opsional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ceritakan lokasi dan kebutuhan Anda..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-[#0a221b] border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#d5a864] focus:border-[#d5a864] resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] text-[#071914] font-extrabold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(213,168,100,0.3)] flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    <span>Kirim &amp; Konsultasi Gratis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Privacy Assurance */}
                  <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
                    <Shield className="w-3.5 h-3.5 text-[#d5a864]" />
                    <span>Data Anda aman dan tidak akan dibagikan ke pihak lain.</span>
                  </div>
                </form>

              </div>
            </div>

          </div>

          {/* Interactive Detailed Simulation Drawer (Expandable) */}
          {isDetailedViewOpen && (
            <div className="mt-10 pt-8 border-t border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#d5a864]">
                  <Sparkles className="w-4 h-4" />
                  <span>SIMULASI ESTIMASI POTENSI LAHAN</span>
                </div>
                <div className="text-xs text-neutral-400">
                  Lokasi aktif: <span className="font-semibold text-white">{formData.locationZone}</span>
                </div>
              </div>

              {/* Sliders & Option Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#071914] p-5 rounded-2xl border border-white/10">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-neutral-300">Luas Tanah:</span>
                    <span className="text-[#d5a864] font-mono font-bold text-sm">{formData.landArea} m²</span>
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
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                    <span>60 m²</span>
                    <span>200 m²</span>
                    <span>500 m²</span>
                    <span>1.000 m²</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-2">
                    Wilayah Lahan di DIY:
                  </label>
                  <select
                    value={formData.locationZone}
                    onChange={(e) => setFormData({ ...formData, locationZone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0a221b] text-white border border-white/20 rounded-xl"
                  >
                    <option value="Sleman - Kawasan Kampus (Seturan / Condongcatur / UGM)">
                      Sleman - Kawasan Kampus (Seturan / UGM)
                    </option>
                    <option value="Sleman - Kawasan Wisata (Kaliurang / Pakem / Ngaglik)">
                      Sleman - Kawasan Wisata (Kaliurang / Pakem)
                    </option>
                    <option value="Kota Yogyakarta - Pusat & Heritage (Malioboro / Keraton)">
                      Kota Yogyakarta - Pusat &amp; Heritage
                    </option>
                    <option value="Bantul - Kawasan Wisata & Budaya (Kasihan / Sewon)">
                      Bantul - Kawasan Wisata &amp; Budaya
                    </option>
                    <option value="Kulon Progo - Kawasan Bandara YIA & Pertumbuhan">
                      Kulon Progo - Kawasan Bandara YIA
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-2">
                    Estimasi Bujet Pembangunan:
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0a221b] text-white border border-white/20 rounded-xl"
                  >
                    <option value="Rp 500 Jt - Rp 1 Miliar">Rp 500 Jt - Rp 1 Miliar</option>
                    <option value="Rp 1 Miliar - Rp 2 Miliar">Rp 1 Miliar - Rp 2 Miliar</option>
                    <option value="Rp 2 Miliar - Rp 3 Miliar">Rp 2 Miliar - Rp 3 Miliar</option>
                    <option value="> Rp 3 Miliar">&gt; Rp 3 Miliar</option>
                  </select>
                </div>
              </div>

              {/* Output Quick Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-[#071914] p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] text-neutral-400 block">Est. Biaya Bangun (RAB)</span>
                  <span className="text-lg font-black text-[#d5a864] tabular-nums block mt-0.5">
                    {formatShortRupiah(result.estimatedRAB)}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">~{result.totalBuildingArea} m² luas bangunan</span>
                </div>

                <div className="bg-[#071914] p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] text-neutral-400 block">Dasar Bangunan (KDB 60%)</span>
                  <span className="text-lg font-black text-white tabular-nums block mt-0.5">
                    {result.buildingCoverageArea} m²
                  </span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">{result.suggestedFloors} Lantai rekomendasi</span>
                </div>

                <div className="bg-[#071914] p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] text-neutral-400 block">
                    {formData.propertyType === 'kos' ? 'Kapasitas Kamar' : 'Konsep Properti'}
                  </span>
                  <span className="text-lg font-black text-white tabular-nums block mt-0.5">
                    {formData.propertyType === 'kos'
                      ? `${result.roomCountEstimate} Kamar AC`
                      : formData.propertyType === 'villa'
                      ? 'Private Pool Villa'
                      : 'Rumah Mewah Tropis'}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    {formData.propertyType === 'kos' ? 'Kamar mandi dalam' : 'Fasilitas premium'}
                  </span>
                </div>

                <div className="bg-[#071914] p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] text-neutral-400 block">Proyeksi Arus Kas</span>
                  <span className="text-lg font-black text-emerald-400 tabular-nums block mt-0.5">
                    {result.monthlyRevenueEstimate ? formatShortRupiah(result.monthlyRevenueEstimate) + '/bln' : '+12-15% /thn'}
                  </span>
                  <span className="text-[10px] text-emerald-300 block mt-0.5">Est. ROI ~{result.estimatedROI}%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
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
                  <span>Kirim Data via WhatsApp &rarr;</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
