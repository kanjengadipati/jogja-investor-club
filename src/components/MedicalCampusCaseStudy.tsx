'use client';

import React, { useState } from 'react';
import {
  TrendingUp, Building2, MapPin, CheckCircle2,
  Calendar, Shield, Award, Stethoscope, ChevronRight,
  Wifi, ShieldCheck, Sparkles, Coffee,
  Sliders, ArrowUpRight, BedDouble, Bath, Lock
} from 'lucide-react';

interface MedicalCampusCaseStudyProps {
  onConsultCaseStudy?: (notes: string) => void;
}

export const MedicalCampusCaseStudy: React.FC<MedicalCampusCaseStudyProps> = ({
  onConsultCaseStudy,
}) => {
  const [activeTab, setActiveTab] = useState<'financial' | 'spatial'>('financial');
  const [activeClusterId, setActiveClusterId] = useState<string>('sekip');

  const clusters = [
    {
      id: 'sekip',
      priority: 1,
      name: 'Sekip – RSUP Dr. Sardjito',
      campus: 'FK-KMK UGM',
      location: 'Jl. Farmako, Sekip Utara (Kampus Kedokteran UGM)',
      highlight: 'Permintaan Tertinggi & Tingkat Hunian 98%',
      targetResidents: [
        'Mahasiswa Kedokteran FK-KMK UGM',
        'Dokter Residen PPDS RS Sardjito',
        'Co-ass / Dokter Muda',
        'Dosen & Konsultan Medis',
      ],
      avgRent: 'Rp 3.500.000 – Rp 5.000.000 / bln',
      landPrice: 'Rp 10 – 16 jt/m²',
      keyAdvantage: 'Hanya 2-5 menit jalan kaki dari gedung perkuliahan dan RSUP Dr. Sardjito.',
    },
    {
      id: 'pogung',
      priority: 2,
      name: 'Pogung – Karangmalang – Sinduadi',
      campus: 'Penyangga Utama UGM & UNY',
      location: 'Sinduadi, Mlati & Caturtunggal, Depok',
      highlight: 'Kawasan Kos Favorit Nomor 1 Mahasiswa',
      targetResidents: [
        'Mahasiswa Kedokteran & Pascasarjana',
        'Dokter Muda RSUP Sardjito',
        'Mahasiswa Internasional UGM',
      ],
      avgRent: 'Rp 2.800.000 – Rp 4.200.000 / bln',
      landPrice: 'Rp 7,5 – 12 jt/m²',
      keyAdvantage: 'Akses ring-road mudah, sentra kuliner, minimarket 24 jam, lingkungan ramah pelajar.',
    },
    {
      id: 'tamanan',
      priority: 3,
      name: 'Tamanan – Banguntapan',
      campus: 'FK UAD (Kampus 4 Utama)',
      location: 'Jl. Ringroad Selatan, Tamanan, Banguntapan, Bantul',
      highlight: 'Pasar Baru Tumbuh Cepat & Suplai Kos Mewah Terbatas',
      targetResidents: [
        'Mahasiswa Fakultas Kedokteran UAD',
        'Mahasiswa Farmasi & Kedokteran Gigi',
        'Dokter Muda RS PKU Muhammadiyah',
      ],
      avgRent: 'Rp 2.200.000 – Rp 3.500.000 / bln',
      landPrice: 'Rp 4,5 – 8 jt/m²',
      keyAdvantage: 'Harga tanah masih sangat atraktif dengan potensi yield sewa mencapai 14% - 17%.',
    },
    {
      id: 'seturan',
      priority: 4,
      name: 'Seturan – Babarsari – Condongcatur',
      campus: 'Hub Multikampus & Gaya Hidup',
      location: 'Depok, Sleman (Dekat UPN, YKPN, Atma Jaya)',
      highlight: 'Pusat Lifestyle, Co-working, & Kafe 24 Jam',
      targetResidents: [
        'Mahasiswa Kedokteran & Mahasiswa Umum',
        'Dokter Muda Magang',
        'Professional / Young Entrepreneur',
      ],
      avgRent: 'Rp 2.500.000 – Rp 4.000.000 / bln',
      landPrice: 'Rp 6,5 – 11 jt/m²',
      keyAdvantage: 'Fasilitas hiburan dan gaya hidup terlengkap, penyewa menyukai kepraktisan kawasan.',
    },
    {
      id: 'kaliurang',
      priority: 5,
      name: 'Kaliurang KM 14,5 – Pakem',
      campus: 'FK UII (Kampus Terpadu)',
      location: 'Jl. Kaliurang KM 14.5, Umbulmartani, Ngemplak, Sleman',
      highlight: 'Udara Sejuk Khas Lereng Merapi & Segmen Premium',
      targetResidents: [
        'Mahasiswa Fakultas Kedokteran UII',
        'Keluarga Mahasiswa / Tamu Wisuda',
        'Dosen & Akademisi Kampus Terpadu',
      ],
      avgRent: 'Rp 2.200.000 – Rp 3.800.000 / bln',
      landPrice: 'Rp 3,5 – 6,5 jt/m²',
      keyAdvantage: 'Biaya pengadaan lahan kompetitif, permintaan kos eksklusif full AC stabil tiap semester.',
    },
  ];

  const currentCluster = clusters.find((c) => c.id === activeClusterId) || clusters[0];

  const handleConsult = () => {
    if (onConsultCaseStudy) {
      onConsultCaseStudy(
        `Konsultasi Kos Eksekutif Kawasan Kedokteran (Klaster ${currentCluster.name})`
      );
    } else {
      const msg = encodeURIComponent(
        `Halo Tim Jogja Investor Club, saya sangat tertarik dengan Blueprint Studi Kasus "Investasi Kost Eksekutif Kawasan Kedokteran Yogyakarta". Saya ingin konsultasi ketersediaan lahan / pengembangan di area ${currentCluster.name}. Mohon informasinya.`
      );
      window.open(`https://wa.me/6282137000888?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="studi-kasus-kedokteran" className="py-8 sm:py-10 lg:py-12 bg-[#051611] text-white relative overflow-hidden border-t border-[#d5a864]/20">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#d5a864]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d5a864_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4 lg:space-y-5">

        {/* Section Top Header & Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3.5 border-b border-white/10">
          <div className="space-y-1 flex-1">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#d5a864] bg-[#071914] border border-[#d5a864]/40 px-3 py-1 rounded-full shadow-inner">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              <span>BLUEPRINT STUDI KELAYAKAN RIIL · YOGYAKARTA</span>
            </div>

            <h2
              className="text-xl sm:text-2xl lg:text-[1.85rem] xl:text-[2.1rem] font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Investasi Kost Eksekutif Mewah{' '}
              <span
                className="font-normal italic text-[#d5a864]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Kawasan Kampus Kedokteran
              </span>
            </h2>

            <p className="text-xs sm:text-[13px] text-neutral-300 max-w-2xl leading-relaxed font-light">
              Analisis komprehensif instrumen *passive income* dengan pasar paling tahan krisis di Jogja:
              Mahasiswa Kedokteran, Dokter Residen (PPDS), dan Tenaga Medis Rumah Sakit Rujukan Nasional.
            </p>
          </div>

          {/* Tab Switcher: Finansial vs Peta Klaster */}
          <div className="flex items-center gap-1.5 bg-[#09221b] p-1 rounded-full border border-white/15 shrink-0 shadow-lg">
            <button
              onClick={() => setActiveTab('financial')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'financial'
                  ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Kalkulasi &amp; ROI 18,5%</span>
            </button>

            <button
              onClick={() => setActiveTab('spatial')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'spatial'
                  ? 'bg-[#d5a864] text-[#071914] shadow-md font-extrabold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Peta 5 Klaster Kedokteran</span>
            </button>
          </div>
        </div>

        {/* 3 Key Selling Metrics Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[#09221b]/90 border border-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#d5a864]/15 border border-[#d5a864]/30 flex items-center justify-center text-[#d5a864] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block leading-tight">Pilar 1</span>
              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">Lokasi Strategis</h4>
              <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">Dekat FK UGM, RSUP Sardjito, UAD &amp; UII</p>
            </div>
          </div>

          <div className="bg-[#09221b]/90 border border-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block leading-tight">Pilar 2</span>
              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">Permintaan Tinggi</h4>
              <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">Target Co-ass, PPDS &amp; Dokter Muda</p>
            </div>
          </div>

          <div className="bg-[#09221b]/90 border border-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block leading-tight">Pilar 3</span>
              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">Return Menarik</h4>
              <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">ROI ± 18,5% / thn, BEP 14–16 Bulan</p>
            </div>
          </div>
        </div>

        {/* TAB CONTENT 1: FINANCIAL & PROJECTION */}
        {activeTab === 'financial' && (
          <div className="space-y-5 animate-fadeIn">

            {/* Top Row: Rincian Investasi & Skenario 20 Kamar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

              {/* Skenario Perhitungan 20 Kamar (lg:col-span-5) */}
              <div className="lg:col-span-5 bg-[#09221b] border border-[#d5a864]/30 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#d5a864] uppercase font-bold tracking-wider">
                        SKENARIO INVESTASI RIIL
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Kos Eksekutif 20 Kamar
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/40">
                      DELUXE SUITE
                    </span>
                  </div>

                  {/* 4 Point Metric Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#061712] border border-white/10">
                      <div className="flex items-center gap-3">
                        <BedDouble className="w-4 h-4 text-[#d5a864]" />
                        <span className="text-xs text-neutral-300">Kapasitas Kamar</span>
                      </div>
                      <span className="text-sm font-bold text-white">20 Unit Deluxe</span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#061712] border border-white/10">
                      <div className="flex items-center gap-3">
                        <Sliders className="w-4 h-4 text-[#d5a864]" />
                        <span className="text-xs text-neutral-300">Tarif Sewa Rata-rata</span>
                      </div>
                      <span className="text-sm font-bold text-[#d5a864]">Rp 4.000.000 / bln</span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#061712] border border-white/10">
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-neutral-300">Tingkat Hunian (Occupancy)</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-400">90% Stabil</span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#061712] border border-white/10">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-neutral-300">Biaya Operasional (OPEX)</span>
                      </div>
                      <span className="text-sm font-bold text-neutral-300">± 30% Kotor</span>
                    </div>
                  </div>

                  {/* Fasilitas Standar Premium */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                      Fasilitas Kost Eksekutif Standar Medis:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d5a864]" />
                        <span>Kamar Full Furnished</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d5a864]" />
                        <span>AC &amp; Water Heater</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-3.5 h-3.5 text-[#d5a864]" />
                        <span>High-Speed WiFi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#d5a864]" />
                        <span>Access Card &amp; CCTV</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coffee className="w-3.5 h-3.5 text-[#d5a864]" />
                        <span>Co-Working &amp; Lounge</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d5a864]" />
                        <span>Housekeeping Rutin</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-total Nilai Investasi Box */}
                <div className="mt-6 pt-5 border-t border-white/10 bg-[#061712] p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Total Nilai Investasi (Land+RAB)</span>
                    <span className="text-xl sm:text-2xl font-black text-[#d5a864] tabular-nums">
                      Rp 7.500.000.000
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 block">BEP (Break Even Point)</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">± 14 - 16 Bulan</span>
                  </div>
                </div>
              </div>

              {/* Proyeksi Laba Rugi 3 Tahun Table (lg:col-span-7) */}
              <div className="lg:col-span-7 bg-[#09221b] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#d5a864] uppercase font-bold tracking-wider">
                        FINANCIAL FORECASTING
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Proyeksi Laba Rugi 3 Tahun
                      </h3>
                    </div>
                    <span className="text-xs text-neutral-400">Dalam Mata Uang Rupiah (IDR)</span>
                  </div>

                  {/* Financial Projection Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-neutral-400 font-mono text-[11px] uppercase">
                          <th className="py-3 pr-4">Komponen Finansial</th>
                          <th className="py-3 px-3 text-right">Tahun 1</th>
                          <th className="py-3 px-3 text-right">Tahun 2</th>
                          <th className="py-3 pl-3 text-right text-[#d5a864]">Tahun 3</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 pr-4 text-white font-medium">Pendapatan Kotor</td>
                          <td className="py-3.5 px-3 text-right font-mono text-neutral-300">864.000.000</td>
                          <td className="py-3.5 px-3 text-right font-mono text-neutral-300">950.400.000</td>
                          <td className="py-3.5 pl-3 text-right font-mono font-bold text-white">1.045.440.000</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 pr-4 text-neutral-400">Biaya Operasional (30%)</td>
                          <td className="py-3.5 px-3 text-right font-mono text-neutral-400">259.200.000</td>
                          <td className="py-3.5 px-3 text-right font-mono text-neutral-400">285.120.000</td>
                          <td className="py-3.5 pl-3 text-right font-mono text-neutral-400">313.632.000</td>
                        </tr>
                        <tr className="bg-[#061712]/80 font-bold">
                          <td className="py-4 pr-4 text-[#d5a864]">Laba Bersih Operasional</td>
                          <td className="py-4 px-3 text-right font-mono text-emerald-400">Rp 604.800.000</td>
                          <td className="py-4 px-3 text-right font-mono text-emerald-400">Rp 665.280.000</td>
                          <td className="py-4 pl-3 text-right font-mono text-emerald-300 text-base">Rp 731.808.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Key Financial Takeaways Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#061712] p-4 rounded-2xl border border-emerald-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-300">ROI Tahunan (Tahun ke-3)</span>
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-400 block mt-1">
                        ± 18,5% <span className="text-xs font-normal text-neutral-400">/ tahun</span>
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-1">Jauh di atas bunga deposito (3-5%) dan obligasi</p>
                    </div>

                    <div className="bg-[#061712] p-4 rounded-2xl border border-[#d5a864]/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-300">Laba Bersih Tahun Pertama</span>
                        <Award className="w-4 h-4 text-[#d5a864]" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-[#d5a864] block mt-1">
                        Rp 604,8 Jt <span className="text-xs font-normal text-neutral-400">/ tahun</span>
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-1">Setara ~Rp 50,4 Juta passive income per bulan</p>
                    </div>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-neutral-400 italic">
                    * Perhitungan didasarkan pada data historis okupansi rata-rata kawasan Sekip &amp; Pogung.
                  </p>
                  <button
                    onClick={handleConsult}
                    className="w-full sm:w-auto px-6 py-3 bg-[#d5a864] hover:bg-[#e2b772] text-[#071914] font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
                  >
                    <span>Konsultasikan Lahan Serupa</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Row: 5 Alasan Menjanjikan & Timeline Roadmap */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

              {/* 5 Alasan Kenapa Menjanjikan (lg:col-span-5) */}
              <div className="lg:col-span-5 bg-[#09221b] border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d5a864]" />
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
                    Kenapa Investasi Ini Sangat Menjanjikan?
                  </h4>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: 'Pasar Selalu Ada & Berkelanjutan',
                      desc: 'Tiap tahun UGM, UII, UAD melahirkan ratusan mahasiswa kedokteran baru dan dokter muda residen yang membutuhkan tempat tinggal representatif.',
                    },
                    {
                      title: 'Harga Sewa Stabil & Cenderung Naik',
                      desc: 'Daya beli segmen medis sangat kuat, elastisitas terhadap kenaikan sewa tahunan terbukti paling tinggi dibanding segmen umum.',
                    },
                    {
                      title: 'Risiko Relatif Rendah',
                      desc: 'Masa studi dokter yang panjang (4 tahun sarjana + 2 tahun co-ass + 3-5 tahun PPDS) menjamin durasi sewa yang konsisten dan minim turnover.',
                    },
                    {
                      title: 'Apresiasi Nilai Lahan Tinggi',
                      desc: 'Kawasan ring 1 kampus kedokteran Jogja mengalami apresiasi tanah 10% - 15% per tahun karena kelangkaan kavling baru.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#061712] border border-white/5">
                      <div className="w-5 h-5 rounded-full bg-[#d5a864]/20 text-[#d5a864] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{item.title}</h5>
                        <p className="text-[11px] text-neutral-400 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulasi Timeline Proyek (lg:col-span-7) */}
              <div className="lg:col-span-7 bg-[#09221b] border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#d5a864]" />
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
                        Simulasi Timeline Eksekusi Proyek
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#d5a864] font-mono">DARI TANAH KOSONG S/D BEP</span>
                  </div>

                  <p className="text-xs text-neutral-300">
                    Kami mendampingi pemilik lahan dari studi legalitas, perizinan PBG, konstruksi fisik, hingga penyiapan manajemen operasional kos.
                  </p>

                  {/* 4 Timeline Steps Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-[#061712] border border-white/10 relative">
                      <div className="text-[10px] font-mono font-bold text-[#d5a864] uppercase">Tahap 1</div>
                      <h5 className="text-xs font-extrabold text-white mt-1">Persiapan &amp; Izin</h5>
                      <span className="text-lg font-black text-white block mt-1">1 - 2 Bulan</span>
                      <p className="text-[10px] text-neutral-400 mt-1">Legalitas, PBG &amp; Finalisasi Gambar Arsitek</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#061712] border border-white/10 relative">
                      <div className="text-[10px] font-mono font-bold text-[#d5a864] uppercase">Tahap 2</div>
                      <h5 className="text-xs font-extrabold text-white mt-1">Bangun &amp; Interior</h5>
                      <span className="text-lg font-black text-[#d5a864] block mt-1">4 - 6 Bulan</span>
                      <p className="text-[10px] text-neutral-400 mt-1">Konstruksi sipil, MEP &amp; pemasangan custom furnitur</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#061712] border border-white/10 relative">
                      <div className="text-[10px] font-mono font-bold text-[#d5a864] uppercase">Tahap 3</div>
                      <h5 className="text-xs font-extrabold text-white mt-1">Operasional Awal</h5>
                      <span className="text-lg font-black text-emerald-400 block mt-1">1 Bulan</span>
                      <p className="text-[10px] text-neutral-400 mt-1">Branding digital, open house &amp; serah terima kunci</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#061712] border border-emerald-500/40 relative">
                      <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Tahap 4</div>
                      <h5 className="text-xs font-extrabold text-white mt-1">Pencapaian BEP</h5>
                      <span className="text-lg font-black text-emerald-300 block mt-1">14 - 16 Bulan</span>
                      <p className="text-[10px] text-neutral-400 mt-1">Perputaran laba bersih akumulatif optimal</p>
                    </div>
                  </div>
                </div>

                {/* Sub banner */}
                <div className="mt-6 p-4 rounded-2xl bg-[#071914] border border-[#d5a864]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#d5a864]" />
                    <span className="text-xs text-neutral-200">
                      Seluruh proses konstruksi diawasi oleh tim sipil bersertifikat dengan garansi pemeliharaan.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB CONTENT 2: SPATIAL MAPPING & 5 MEDICAL CLUSTERS */}
        {activeTab === 'spatial' && (
          <div className="space-y-8 animate-fadeIn">

            {/* Matriks Prioritas Survei Header Bar */}
            <div className="bg-[#09221b] border border-[#d5a864]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#d5a864] uppercase font-bold tracking-wider">
                    MATRIKS PRIORITAS SURVEI LAHAN
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Urutan Wilayah Paling Disarankan untuk Kos Eksekutif
                  </h3>
                </div>
                <span className="text-xs text-neutral-400">Berdasarkan rasio suplai &amp; okupansi sewa</span>
              </div>

              {/* 5 Step Recommendation Horizontal Flow */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {clusters.map((c) => {
                  const isSelected = activeClusterId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveClusterId(c.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#0f2e25] border-[#d5a864] ring-1 ring-[#d5a864] shadow-lg'
                          : 'bg-[#061712] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isSelected ? 'bg-[#d5a864] text-[#071914]' : 'bg-white/10 text-neutral-400'
                          }`}
                        >
                          {c.priority}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono font-bold text-[#d5a864]">DIPILIH</span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white truncate">{c.name.split('–')[0]}</h4>
                      <p className="text-[10px] text-neutral-400 truncate">{c.campus}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Selected Cluster Profile Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Left Detail (lg:col-span-7) */}
              <div className="lg:col-span-7 bg-[#09221b] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#d5a864]">
                      <span>PRIORITAS #{currentCluster.priority}</span>
                      <span>·</span>
                      <span>{currentCluster.campus}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {currentCluster.name}
                    </h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d5a864]" />
                      <span>{currentCluster.location}</span>
                    </p>
                  </div>

                  <span className="text-xs font-bold px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full shrink-0">
                    {currentCluster.highlight}
                  </span>
                </div>

                {/* Advantage Quote */}
                <div className="bg-[#061712] p-4.5 rounded-2xl border border-[#d5a864]/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#d5a864] font-bold">
                    Keunggulan Lokasi Utama:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                    &ldquo;{currentCluster.keyAdvantage}&rdquo;
                  </p>
                </div>

                {/* Target Demografi Penghuni */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Target Utama Penyewa di Klaster Ini:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentCluster.targetResidents.map((res, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#061712] border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs text-neutral-200 font-medium">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Benchmarks */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#061712] p-4 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Tarif Sewa Kamar Standar</span>
                    <span className="text-base sm:text-lg font-bold text-[#d5a864] block mt-1">
                      {currentCluster.avgRent}
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">AC, Kamar Mandi Dalam, Wifi</span>
                  </div>

                  <div className="bg-[#061712] p-4 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Estimasi Harga Lahan</span>
                    <span className="text-base sm:text-lg font-bold text-white block mt-1">
                      {currentCluster.landPrice}
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Tergantung lebar depan &amp; akses mobil</span>
                  </div>
                </div>
              </div>

              {/* Right CTA & Recommendation Box (lg:col-span-5) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0a271f] to-[#061712] border border-[#d5a864]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#d5a864]/20 border border-[#d5a864]/40 flex items-center justify-center text-[#d5a864]">
                    <Stethoscope className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-[#d5a864] uppercase tracking-wider">
                      PUNYA LAHAN DI SEKITAR SINI?
                    </span>
                    <h4
                      className="text-2xl font-bold text-white mt-1 leading-snug"
                      style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                    >
                      Optimalkan Menjadi Aset Produktif Berkelanjutan
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                      Lahan Anda di kawasan kampus kedokteran berpotensi menghasilkan *passive income* ratusan juta per tahun.
                      Dapatkan kalkulasi RAB dan denah ruang optimal tanpa biaya.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d5a864]" />
                      <span>Survei lokasi &amp; analisis kelayakan gratis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d5a864]" />
                      <span>Desain arsitektur khusus tipe Deluxe Executive</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d5a864]" />
                      <span>Opsi kerja sama manajemen operasional kos</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleConsult}
                    className="w-full py-4 px-6 bg-[#d5a864] hover:bg-[#e2b772] text-[#071914] font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Konsultasi Potensi Lahan Medis</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-neutral-400 mt-2">
                    Langsung terhubung dengan Tim Jogja Investor Club.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
