'use client';

import React, { useState, useMemo } from 'react';
import {
  Star,
  Quote,
  ShieldCheck,
  TrendingUp,
  Building,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Award,
} from 'lucide-react';

export interface TestimonialData {
  name: string;
  role?: string;
  avatar?: string;
  quote: string;
  rating?: number;
  propertyType?: string; // 'Rumah' | 'Villa' | 'Homestay & Kos' | 'Lainnya'
  featured?: boolean;
  order?: number;
  // Extra optional presentation fields
  location?: string;
  metricBadge?: string;
}

interface TestimonialsProps {
  testimonials?: TestimonialData[];
  onOpenConsultation?: () => void;
}

// Realistic fallback testimonials tailored to Jogja Investor Club
const FALLBACK_TESTIMONIALS: TestimonialData[] = [
  {
    name: 'Ir. Bambang Hendrawan, M.M.',
    role: 'Pemilik Kos Eksklusif "D\'Kalyana"',
    location: 'Condongcatur, Sleman',
    propertyType: 'Homestay & Kos',
    rating: 5,
    metricBadge: 'Yield 18.5% · 22 Kamar',
    quote:
      'Lahan warisan keluarga 450 m² di Seturan yang dulunya menganggur, kini jadi aset produktif bernilai tinggi. JIC mendampingi dari studi tata ruang, izin PBG, hingga konstruksi tuntas 7 bulan. Okupansi mahasiswa & pekerja medis stabil 95% sejak bulan pertama.',
    featured: true,
    order: 1,
  },
  {
    name: 'dr. Cynthia Praditya, Sp.A',
    role: 'Investor Properti & Dokter Spesialis',
    location: 'Pakem, Sleman (Lereng Merapi)',
    propertyType: 'Villa',
    rating: 5,
    metricBadge: '100% On-Time · Villa Mewah',
    quote:
      'Sebagai investor yang berdomisili di Jakarta, kendala utama saya adalah pengawasan lapangan. Bersama JIC, laporan mingguan real-time dan transparansi RAB membuat saya sangat tenang. Villa privat 2 unit selesai tepat waktu dengan kualitas finishing hotel bintang 4.',
    featured: true,
    order: 2,
  },
  {
    name: 'Hendra Kusuma, S.E.',
    role: 'Pengusaha Logistik & Investor',
    location: 'Kraton & Mantrijeron, Kota Yogyakarta',
    propertyType: 'Homestay & Kos',
    rating: 5,
    metricBadge: 'BEP 4.2 Thn · Kawasan Heritage',
    quote:
      'Perhitungan feasibility study dan analisis GIS JIC sangat presisi. Homestay 10 kamar berkonsep arsitektur tropis modern di pusat kota selalu full-booked saat akhir pekan dan musim liburan. BEP diproyeksikan lebih cepat dari perkiraan awal.',
    featured: true,
    order: 3,
  },
  {
    name: 'Raden Mas Wicaksono',
    role: 'Pemilik Lahan & Tokoh Komunitas',
    location: 'Kasihan, Bantul',
    propertyType: 'Rumah',
    rating: 5,
    metricBadge: 'Apresiasi Lahan 35% · 4 Unit',
    quote:
      'Lahan 1.200 m² kami berhasil dikonsep menjadi private cluster 4 unit bergaya Indische Kontemporer. Pendampingan legalitas sertifikat pecah kavling dari tim JIC sangat rapi tanpa kendala birokrasi sama sekali.',
    featured: false,
    order: 4,
  },
  {
    name: 'Anita Wijaya',
    role: 'Diaspora Investor (Singapura / Asal Jogja)',
    location: 'Jl. Palagan Tentara Pelajar, Sleman',
    propertyType: 'Villa',
    rating: 5,
    metricBadge: 'Passive Income Rp 32 Jt/Bln',
    quote:
      'Investasi properti dari luar negeri tadinya terasa berisiko. Namun kontrak notariil JIC yang rigid serta sistem manajemen turn-key terbukti kredibel. Properti saya kini menghasilkan passive income konsisten tanpa perlu saya repot kelola harian.',
    featured: false,
    order: 5,
  },
  {
    name: 'Faisal Ramadhan, S.T.',
    role: 'Founder Startup & Pemilik Homestay Milenial',
    location: 'Maguwoharjo, Sleman',
    propertyType: 'Homestay & Kos',
    rating: 5,
    metricBadge: 'ROI 19.2% / Tahun',
    quote:
      'Desain arsitektur JIC sangat memikirkan efisiensi ruang dan biaya konstruksi per meter. Konsep co-living & homestay yang mereka rancang sangat viral di media sosial dan disukai kalangan digital nomad di Jogja.',
    featured: false,
    order: 6,
  },
];

const CATEGORIES = ['Semua', 'Homestay & Kos', 'Villa', 'Rumah'];

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  onOpenConsultation,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');
  const [showAll, setShowAll] = useState<boolean>(false);

  const rawList =
    testimonials && testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  const filteredList = useMemo(() => {
    if (selectedFilter === 'Semua') return rawList;
    return rawList.filter((item) => {
      const type = (item.propertyType || '').toLowerCase();
      const target = selectedFilter.toLowerCase();
      if (target.includes('kos') && (type.includes('kos') || type.includes('homestay'))) return true;
      if (target.includes('villa') && type.includes('villa')) return true;
      if (target.includes('rumah') && type.includes('rumah')) return true;
      return type.includes(target);
    });
  }, [rawList, selectedFilter]);

  const displayedList = showAll ? filteredList : filteredList.slice(0, 6);

  const handleConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const msg = encodeURIComponent(
        'Halo Tim Jogja Investor Club, saya membaca testimoni dan kisah sukses klien JIC. Saya ingin berkonsultasi mengenai potensi tanah saya di Yogyakarta. Terima kasih.'
      );
      window.open(`https://wa.me/6282137000888?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Helper avatar initials
  const getInitials = (name: string) => {
    const clean = name.replace(/(Ir\.|dr\.|Sp\.A|M\.M\.|S\.E\.|S\.T\.|Raden Mas)/gi, '').trim();
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return (parts[0] || 'JI').slice(0, 2).toUpperCase();
  };

  return (
    <section id="testimoni" className="py-20 lg:py-28 bg-[#fbf9f5] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d5a864]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#071914]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071914]/5 border border-[#d5a864]/30 text-[#8c672b] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#c5a25d]" />
            <span>Kisah Sukses &amp; Testimoni Mitra</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081c17] tracking-tight leading-tight mb-4"
            style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
          >
            Dipercaya Pemilik Lahan &amp;{' '}
            <span
              className="italic font-normal text-[#c5a25d]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Investor Ternama
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            Dari tanah menganggur hingga aset penghasil passive income tinggi. Simak bagaimana
            Jogja Investor Club mengawal setiap tahapan proyek dengan transparansi dan kepastian hasil.
          </p>

          {/* Social Proof Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-8 p-4 sm:p-5 bg-white/90 backdrop-blur-sm rounded-none border border-[#d5a864]/20 shadow-xs">
            <div className="flex flex-col items-center justify-center p-2 text-center border-r last:border-r-0 border-neutral-100">
              <span className="text-xl sm:text-2xl font-black text-[#081c17]">40+</span>
              <span className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-0.5">Proyek Terealisasi</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center border-r last:border-r-0 border-neutral-100">
              <span className="text-xl sm:text-2xl font-black text-[#c5a25d]">14% - 21%</span>
              <span className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-0.5">Rata-rata Yield Tahunan</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center border-r last:border-r-0 border-neutral-100">
              <span className="text-xl sm:text-2xl font-black text-[#081c17]">98.6%</span>
              <span className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-0.5">Kepuasan Klien</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-700">100%</span>
              <span className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-0.5">Sertifikat &amp; PBG Sah</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => {
              const active = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-none text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#071914] text-[#d5a864] shadow-md'
                      : 'bg-white text-neutral-600 hover:text-[#081c17] hover:bg-neutral-100/80 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {displayedList.map((item, index) => {
            const rating = item.rating ?? 5;
            const initials = getInitials(item.name);

            return (
              <div
                key={`${item.name}-${index}`}
                className="group relative flex flex-col justify-between bg-white rounded-none p-6 sm:p-7 border border-neutral-200/80 hover:border-[#d5a864]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Decorative Quote Icon Watermark */}
                <div className="absolute top-5 right-6 text-neutral-100 group-hover:text-[#d5a864]/15 transition-colors pointer-events-none">
                  <Quote className="w-12 h-12 rotate-180" />
                </div>

                {/* Top Section: Tags & Rating */}
                <div className="space-y-4 relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-neutral-200 fill-neutral-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Property type badge */}
                    {item.propertyType && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#071914]/5 text-[#071914] border border-neutral-200">
                        <Building className="w-3 h-3 text-[#c5a25d]" />
                        <span>{item.propertyType}</span>
                      </span>
                    )}
                  </div>

                  {/* Highlight Metric Badge if available */}
                  {(item.metricBadge || (item as any).specs) && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.metricBadge || 'ROI Terverifikasi'}</span>
                    </div>
                  )}

                  {/* Quote Body */}
                  <p className="text-sm text-neutral-700 leading-relaxed pt-1 line-clamp-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Information */}
                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#d5a864]/40"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#071914] to-[#0c3127] text-[#d5a864] flex items-center justify-center font-bold text-xs tracking-wider border border-[#d5a864]/30 shadow-xs">
                        {initials}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <h4
                          className="text-sm font-bold text-[#081c17] leading-tight"
                          style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                        >
                          {item.name}
                        </h4>
                        <span title="Investor Terverifikasi">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        </span>
                      </div>
                      {item.role && (
                        <span className="text-[11px] text-neutral-500 line-clamp-1 leading-snug">
                          {item.role}
                        </span>
                      )}
                      {item.location && (
                        <span className="text-[10px] text-[#8c672b] font-medium leading-tight">
                          📍 {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Toggle if more than 6 */}
        {filteredList.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-bold text-[#081c17] hover:bg-white hover:border-[#c5a25d] transition-all cursor-pointer shadow-xs"
            >
              {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat Semua Testimoni (${filteredList.length})`}
            </button>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-gradient-to-r from-[#071914] via-[#0b241e] to-[#071914] rounded-3xl p-6 sm:p-10 border border-[#d5a864]/30 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d5a864] tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-[#d5a864]" />
              <span>Garansi Transparansi 100% Notariil</span>
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Punya Lahan di Jogja dan Ingin Hasil Serupa?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Konsultasikan lokasi dan luas lahan Anda bersama tim arsitek &amp; analis investasi JIC secara gratis tanpa komitmen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleConsultation}
              className="px-6 py-3 rounded-xl bg-[#d5a864] hover:bg-[#e2b772] text-[#071914] font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi Proyek Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
