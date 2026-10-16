import React, { useState, useMemo } from 'react';
import { LeadFormData, PropertyType } from '../types/property';
import { calculateLandPotential, formatShortRupiah, formatRupiah } from '../utils/calculator';
import {
  Calculator,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Home,
  Building2,
  Palmtree,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

interface LandPotentialCalculatorProps {
  initialPropertyType?: PropertyType;
  initialZone?: string;
}

export const LandPotentialCalculator: React.FC<LandPotentialCalculatorProps> = ({
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
    extraNotes: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync prop changes if user clicks a property archetype or zone above
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

  // Run calculation memoized
  const result = useMemo(() => {
    return calculateLandPotential(formData);
  }, [formData]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(result.formattedWhatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Open WhatsApp link in new tab or app
    window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hitung-potensi" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2821] mb-2">
            <span className="w-6 h-6 rounded-full bg-[#081c17] text-[#c5a25d] flex items-center justify-center text-xs font-black">
              7
            </span>
            <span>Form Lead — Hitung Potensi Tanah</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#081c17] tracking-tight">
            Kalkulator Potensi Lahan & Estimasi RAB
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 mt-3">
            Masukkan data luas tanah Anda. Dapatkan 3 alternatif konsep arsitektur terbaik dan proyeksi arus kas langsung tanpa biaya.
          </p>
        </div>

        {/* Main Grid: Form Left, Results & 3 Concepts Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Lead Box (Left Column) */}
          <div className="lg:col-span-5 bg-[#fbf9f5] border border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#081c17] text-[#c5a25d] flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#081c17]">Hitung Potensi Tanah Anda</h3>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">
                Hasil Instan
              </span>
            </div>

            <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bpk. Bambang Wijaya"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a25d] focus:border-transparent transition-all"
                />
              </div>

              {/* Lokasi Tanah */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Lokasi Tanah di Jogja
                </label>
                <select
                  value={formData.locationZone}
                  onChange={(e) => setFormData({ ...formData, locationZone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a25d] focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="Sleman - Kawasan Kampus (Seturan / Condongcatur / Depok)">
                    Sleman - Kawasan Kampus (Seturan / Condongcatur / Depok)
                  </option>
                  <option value="Sleman - Kawasan Kampus (Jakal Bawah / Babarsari)">
                    Sleman - Kawasan Kampus (Jakal Bawah / Babarsari)
                  </option>
                  <option value="Sleman - Kawasan Wisata (Kaliurang / Pakem / Ngaglik)">
                    Sleman - Kawasan Wisata (Kaliurang / Pakem / Ngaglik)
                  </option>
                  <option value="Kota Yogyakarta - Pusat & Heritage (Malioboro / Keraton)">
                    Kota Yogyakarta - Pusat & Heritage (Malioboro / Keraton)
                  </option>
                  <option value="Bantul - Kawasan Wisata & Budaya (Kasihan / Sewon)">
                    Bantul - Kawasan Wisata & Budaya (Kasihan / Sewon)
                  </option>
                  <option value="Sleman Barat / Bantul Timur (Gamping / Banguntapan)">
                    Sleman Barat / Bantul Timur (Gamping / Banguntapan)
                  </option>
                  <option value="Kulon Progo (Dekat Bandara YIA)">
                    Kulon Progo (Dekat Bandara YIA)
                  </option>
                </select>
              </div>

              {/* Luas Tanah with Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Luas Tanah (m²)
                  </label>
                  <span className="text-sm font-extrabold text-[#081c17] tabular-nums">
                    {formData.landArea} m²
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="60"
                    max="1000"
                    step="10"
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: Number(e.target.value) })}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#081c17]"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>60 m² (Kavling)</span>
                    <span>200 m² (Standar)</span>
                    <span>500 m²</span>
                    <span>1.000 m²</span>
                  </div>
                </div>
              </div>

              {/* Jenis Investasi (Segmented Buttons) */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Rencana Jenis Properti
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: 'rumah' })}
                    className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.propertyType === 'rumah'
                        ? 'bg-[#081c17] text-[#c5a25d] border-[#081c17] shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Rumah</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: 'villa' })}
                    className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.propertyType === 'villa'
                        ? 'bg-[#081c17] text-[#c5a25d] border-[#081c17] shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <Palmtree className="w-4 h-4" />
                    <span>Villa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: 'kos' })}
                    className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.propertyType === 'kos'
                        ? 'bg-[#081c17] text-[#c5a25d] border-[#081c17] shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Kos Eksklusif</span>
                  </button>
                </div>
              </div>

              {/* Estimasi Budget Range */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Estimasi Bujet Pembangunan
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a25d] focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="< Rp 500 Juta">&lt; Rp 500 Juta (Tahap Minimalis)</option>
                  <option value="Rp 500 Jt - Rp 1 Miliar">Rp 500 Jt - Rp 1 Miliar</option>
                  <option value="Rp 1 Miliar - Rp 2 Miliar">Rp 1 Miliar - Rp 2 Miliar</option>
                  <option value="Rp 2 Miliar - Rp 3 Miliar">Rp 2 Miliar - Rp 3 Miliar</option>
                  <option value="> Rp 3 Miliar">&gt; Rp 3 Miliar (Skala Komersial)</option>
                  <option value="Fleksibel / Sesuai Rekomendasi RAB">Fleksibel / Sesuai Rekomendasi RAB</option>
                </select>
              </div>

              {/* Kapan Mulai */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Rencana Waktu Mulai
                </label>
                <select
                  value={formData.startTimeline}
                  onChange={(e) => setFormData({ ...formData, startTimeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a25d] focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="Bulan Ini (Siap Eksekusi)">Bulan Ini (Siap Eksekusi)</option>
                  <option value="1 - 3 Bulan ke depan">1 - 3 Bulan ke depan</option>
                  <option value="3 - 6 Bulan ke depan">3 - 6 Bulan ke depan</option>
                  <option value="Masih Tahap Riset / Perbandingan">Masih Tahap Riset / Perbandingan</option>
                </select>
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a25d] focus:border-transparent transition-all"
                  required
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Hasil rincian lengkap & file PDF RAB dikirimkan langsung ke nomor ini.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Kirim & Konsultasi Gratis via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Data Anda 100% aman & rahasia
                </span>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="text-[#081c17] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Ringkasan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Output Results & 3 Alternative Concepts (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Financial & Spatial Blueprint Card */}
            <div className="bg-[#081c17] text-white rounded-3xl p-6 sm:p-8 border border-[#c5a25d]/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c5a25d] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Hasil Estimasi Lahan {formData.landArea} m²</span>
                </span>
                <span className="text-xs bg-[#12362c] text-emerald-300 px-3 py-1 rounded-md border border-emerald-500/30">
                  {formData.propertyType === 'kos'
                    ? 'Potensi Kos Eksklusif'
                    : formData.propertyType === 'villa'
                    ? 'Potensi Villa Wisata'
                    : 'Potensi Rumah Tropis'}
                </span>
              </div>

              {/* Big Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#0e2c23] p-4 rounded-2xl border border-white/5">
                  <span className="text-[11px] text-neutral-400 block mb-1">
                    Estimasi Biaya Bangun (RAB)
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#c5a25d] tabular-nums">
                    {formatShortRupiah(result.estimatedRAB)}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-1">
                    ~{result.totalBuildingArea} m² Luas Bangunan
                  </span>
                </div>

                {formData.propertyType === 'kos' ? (
                  <>
                    <div className="bg-[#0e2c23] p-4 rounded-2xl border border-white/5">
                      <span className="text-[11px] text-neutral-400 block mb-1">
                        Kapasitas Kamar Ideal
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                        {result.roomCountEstimate} Kamar
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-1">
                        KM Dalam + AC + Balkon
                      </span>
                    </div>

                    <div className="bg-[#0e2c23] p-4 rounded-2xl border border-white/5">
                      <span className="text-[11px] text-neutral-400 block mb-1">
                        Proyeksi Arus Kas / Bln
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
                        {formatShortRupiah(result.monthlyRevenueEstimate || 0)}
                      </span>
                      <span className="text-[10px] text-emerald-300 block mt-1">
                        Est. ROI ~{result.estimatedROI}% / thn
                      </span>
                    </div>
                  </>
                ) : formData.propertyType === 'villa' ? (
                  <>
                    <div className="bg-[#0e2c23] p-4 rounded-2xl border border-white/5">
                      <span className="text-[11px] text-neutral-400 block mb-1">
                        Fasilitas Utama
                      </span>
                      <span className="text-lg font-black text-white">
                        Private Pool + 3-4 Bed
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-1">
                        Lounge & Taman Tropis
                      </span>
                    </div>

                    <div className="bg-[#0e2c23] p-4 rounded-2xl border border-white/5">
                      <span className="text-[11px] text-neutral-400 block mb-1">
                        Proyeksi Omset Bulanan
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
                        {formatShortRupiah(result.monthlyRevenueEstimate || 0)}
                      </span>
                      <span className="text-[10px] text-emerald-300 block mt-1">
                        Est. ROI ~{result.estimatedROI}% / thn
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-[#0e2c23] p-4 rounded-2xl border border-white/5">
                      <span className="text-[11px] text-neutral-400 block mb-1">
                        Kamar & Ruang Keluarga
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-white">
                        4 KT + 3 KM
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-1">
                        Carport 2 Mobil + Taman
                      </span>
                    </div>

                    <div className="bg-[#0e2c23] p-4 rounded-2xl border border-white/5">
                      <span className="text-[11px] text-neutral-400 block mb-1">
                        Apresiasi Aset Tanah + Rumah
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
                        +12% - 15% / thn
                      </span>
                      <span className="text-[10px] text-emerald-300 block mt-1">
                        Nilai jual kembali premium
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Spatial rules note */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300 pt-4 border-t border-white/10">
                <span>
                  📐 Koefisien Dasar Bangunan (KDB 60%): <strong>{result.buildingCoverageArea} m²</strong>
                </span>
                <span>
                  🌿 Ruang Terbuka Hijau (RTH 40%): <strong>{result.greenOpenSpace} m²</strong>
                </span>
                <span>
                  🏢 Jumlah Lantai Rekomendasi: <strong>{result.suggestedFloors} Lantai</strong>
                </span>
              </div>
            </div>

            {/* 3 Alternative Concepts Box matching flyer */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-extrabold text-[#081c17] uppercase tracking-wider">
                  3 Alternatif Konsep Terbaik untuk Lahan Ini:
                </h4>
                <span className="text-xs text-neutral-500">Bandingkan opsi</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {result.threeConcepts.map((concept, idx) => {
                  const isCurrent = concept.type === formData.propertyType;
                  return (
                    <div
                      key={idx}
                      onClick={() => setFormData({ ...formData, propertyType: concept.type })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#c5a25d] bg-[#fbf9f5] ring-2 ring-[#c5a25d]/20 shadow-sm'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isCurrent
                                ? 'bg-[#081c17] text-[#c5a25d]'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            Opsi {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-neutral-700">
                            {concept.floors} Lantai
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-[#081c17] mb-1 leading-snug">
                          {concept.title}
                        </h5>
                        <p className="text-[11px] text-neutral-500 mb-3 leading-relaxed">
                          {concept.keyBenefit}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-100">
                        <span className="text-[10px] text-neutral-400 block">Est. Biaya:</span>
                        <span className="text-xs font-black text-[#081c17] block tabular-nums">
                          {formatShortRupiah(concept.estimatedCost)}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-1 leading-tight">
                          {concept.cashflowSummary}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Consultation Box matching flyer */}
            <div className="bg-[#f0f7f4] border border-emerald-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Ingin Didampingi Survey Lahan Langsung di Jogja?
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Tim arsitek kami siap datang ke lokasi tanah Anda untuk cek elevasi, akses jalan, dan legalitas.
                  </p>
                </div>
              </div>

              <a
                href={result.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Jadwalkan Survey via WA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
