'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  FileCheck,
  Coins,
  HardHat,
  Scale,
} from 'lucide-react';

export interface FAQData {
  question: string;
  answer: any; // string or Sanity block array
  category?: string; // 'umum' | 'investasi' | 'proses' | 'legalitas' | 'pembiayaan'
  order?: number;
}

interface FAQProps {
  faqs?: FAQData[];
  onOpenConsultation?: () => void;
}

const CATEGORY_MAP: Record<string, { label: string; icon: React.ElementType }> = {
  semua: { label: 'Semua Kategori', icon: HelpCircle },
  legalitas: { label: 'Legalitas & Perizinan', icon: Scale },
  investasi: { label: 'Investasi & ROI', icon: Coins },
  proses: { label: 'Proses Bangun & QC', icon: HardHat },
  pembiayaan: { label: 'Skema Pembiayaan', icon: FileCheck },
  umum: { label: 'Umum & Tata Cara', icon: Sparkles },
};

const FALLBACK_FAQS: FAQData[] = [
  {
    category: 'legalitas',
    question: 'Apakah tanah dengan status SHM Waris atau belum pecah sertifikat bisa dikembangkan bersama JIC?',
    answer:
      'Sangat bisa. Tim notariat dan legal Jogja Investor Club siap membantu audit yuridis terlebih dahulu. Kami memfasilitasi proses mediasi keluarga ahli waris, pengurusan fatwa waris, hingga pemecahan (splitzing) sertifikat di kantor BPN Sleman, Bantul, maupun Kota Yogyakarta secara resmi dan aman.',
    order: 1,
  },
  {
    category: 'legalitas',
    question: 'Bagaimana penanganan izin PBG (Persetujuan Bangunan Gedung) dan zonasi RTRW di Yogyakarta?',
    answer:
      'Setiap kabupaten/kota di DIY memiliki regulasi RTRW dan batasan KDB (Koefisien Dasar Bangunan) yang spesifik. Melalui GIS Spatial Intelligence JIC, kami memverifikasi kesesuaian lahan sebelum desain dimulai. Seluruh proses permohonan PBG, dokumen lingkungan (SPPL/UKL-UPL), hingga Sertifikat Laik Fungsi (SLF) diurus turn-key oleh tim perizinan kami.',
    order: 2,
  },
  {
    category: 'investasi',
    question: 'Berapa proyeksi ROI dan yield tahunan untuk kos eksklusif atau villa di kawasan Jogja?',
    answer:
      'Berdasarkan data historis portofolio JIC di kawasan lingkar kampus (Seturan, Condongcatur, Jakal), kos eksklusif menghasilkan gross yield 14% - 19% per tahun dengan masa balik modal (BEP) rata-rata 4.5 hingga 6 tahun. Sedangkan untuk boutique villa di area wisata seperti Pakem atau Kaliurang, net rental margin mencapai 16% - 21% per tahun dengan okupansi rata-rata di atas 75%.',
    order: 3,
  },
  {
    category: 'investasi',
    question: 'Apakah JIC menyediakan layanan manajemen operasional setelah bangunan selesai serah terima?',
    answer:
      'Ya. Kami menyediakan opsi Turn-Key Property Management. Anda dapat memilih mengelola properti secara mandiri, atau bermitra dengan divisi hospitality JIC untuk penanganan menyeluruh: listing di OTA (Airbnb, Booking.com, Mamikos), resepsionis, housekeeping, pembayaran utilitas, serta laporan keuangan bulanan transparan.',
    order: 4,
  },
  {
    category: 'proses',
    question: 'Bagaimana sistem pengawasan kualitas bahan dan pelaporan progres pembangunan di lapangan?',
    answer:
      'Kami menerapkan sistem pengawasan berlapis dengan Quality Control (QC) arsitek & struktur sipil bersertifikat. Klien menerima laporan progres berkala melalui grup koordinasi terdedikasi, mencakup checklist material SNI, foto resolusi tinggi mingguan, serta rekaman video drone 360° yang dapat diakses darimana saja.',
    order: 5,
  },
  {
    category: 'proses',
    question: 'Berapa lama durasi pengerjaan dari survei lahan hingga bangunan siap beroperasi?',
    answer:
      'Rata-rata proyek kos eksklusif 15–25 kamar membutuhkan waktu 6 hingga 8 bulan (termasuk fase perizinan PBG). Sedangkan pembangunan villa privat 1–2 unit berkisar 5 hingga 7 bulan. Setiap jadwal diikat dalam Surat Perjanjian Kerja (SPK) resmi di hadapan notaris dengan klausul garansi waktu dan retensi pemeliharaan 3–6 bulan pasca serah terima.',
    order: 6,
  },
  {
    category: 'pembiayaan',
    question: 'Bagaimana jika saya memiliki tanah potensial namun keterbatasan dana untuk biaya bangun?',
    answer:
      'JIC memiliki program JIC Private Investor Network. Kami dapat menjembatani pemilik lahan dengan investor pemodal pasif melalui skema Kerjasama Operasi (KSO) atau Joint Venture bagi hasil berpayung hukum PT/CV resmi. Kepemilikan tanah dasar tetap dijamin aman 100% atas nama pemilik lahan.',
    order: 7,
  },
  {
    category: 'umum',
    question: 'Apakah konsultasi awal dan estimasi hitung potensi lahan dipungut biaya?',
    answer:
      'Sama sekali TIDAK dipungut biaya (100% Gratis). Anda cukup mengisi formulir kalkulator tanah atau menghubungi WhatsApp Hotline kami. Tim kami akan menyiapkan ringkasan simulasi yield, estimasi anggaran kasar, serta kesesuaian arsitektur terbaik untuk lahan Anda.',
    order: 8,
  },
];

// Helper to render plain string or PortableText
function renderAnswer(answer: any) {
  if (!answer) return null;
  if (typeof answer === 'string') {
    return <p className="text-sm text-neutral-600 leading-relaxed">{answer}</p>;
  }
  if (Array.isArray(answer)) {
    return (
      <div className="space-y-2 text-sm text-neutral-600 leading-relaxed">
        {answer.map((b: any, i: number) => {
          if (b._type === 'block') {
            const text = (b.children || []).map((c: any) => c.text).join('');
            return <p key={b._key || i}>{text}</p>;
          }
          return null;
        })}
      </div>
    );
  }
  return <p className="text-sm text-neutral-600 leading-relaxed">{String(answer)}</p>;
}

export const FAQ: React.FC<FAQProps> = ({ faqs, onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First open by default

  const list: FAQData[] = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS;

  const filteredList = useMemo(() => {
    return list.filter((item) => {
      // Category filter
      if (selectedCategory !== 'semua') {
        const itemCat = (item.category || 'umum').toLowerCase();
        if (itemCat !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const qMatch = item.question.toLowerCase().includes(query);
        let aMatch = false;
        if (typeof item.answer === 'string') {
          aMatch = item.answer.toLowerCase().includes(query);
        } else if (Array.isArray(item.answer)) {
          const combined = item.answer
            .map((b: any) => (b.children || []).map((c: any) => c.text).join(' '))
            .join(' ')
            .toLowerCase();
          aMatch = combined.includes(query);
        }
        return qMatch || aMatch;
      }

      return true;
    });
  }, [list, selectedCategory, searchQuery]);

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleWhatsApp = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const msg = encodeURIComponent(
        'Halo Tim Jogja Investor Club, saya memiliki pertanyaan seputar legalitas & potensi pembangunan lahan di Yogyakarta. Mohon info konsultasi awal gratis. Terima kasih!'
      );
      window.open(`https://wa.me/6282137000888?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#071914]/5 border border-[#d5a864]/30 text-[#8c672b] text-xs font-bold tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#c5a25d]" />
            <span>FAQ &amp; Informasi Transparan</span>
          </span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081c17] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
          >
            Pertanyaan yang{' '}
            <span
              className="italic font-normal text-[#c5a25d]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Sering Diajukan
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Pahami detail legalitas tanah, kalkulasi ROI, perizinan PBG, hingga penjaminan kualitas
            konstruksi sebelum Anda melangkah membangun di Yogyakarta.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan (contoh: PBG, SHM, yield, modal)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white rounded-xl border border-neutral-200 focus:border-[#c5a25d] focus:outline-none focus:ring-2 focus:ring-[#c5a25d]/20 transition-all text-[#081c17] placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-neutral-400 hover:text-neutral-600 font-bold"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {Object.entries(CATEGORY_MAP).map(([key, item]) => {
            const active = selectedCategory === key;
            const Icon = item.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#071914] text-[#d5a864] shadow-sm'
                    : 'bg-neutral-100/80 hover:bg-neutral-200/60 text-neutral-600 border border-neutral-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#d5a864]' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
              <ShieldAlert className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-700">
                Tidak ada pertanyaan yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;.
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Silakan coba kata kunci lain atau langsung hubungi tim konsultan kami.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('semua');
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-[#8c672b] bg-[#d5a864]/10 rounded-lg hover:bg-[#d5a864]/20 transition-colors cursor-pointer"
              >
                Tampilkan Semua Pertanyaan
              </button>
            </div>
          ) : (
            filteredList.map((item, index) => {
              const isOpen = expandedIndex === index;
              const catKey = (item.category || 'umum').toLowerCase();
              const catInfo = CATEGORY_MAP[catKey] || CATEGORY_MAP.umum;

              return (
                <div
                  key={`${item.question}-${index}`}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? 'bg-neutral-50/80 border-[#d5a864]/50 shadow-md ring-1 ring-[#d5a864]/20'
                      : 'bg-white border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#d5a864]/15 text-[#8c672b]">
                          {catInfo.label}
                        </span>
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? 'text-[#081c17]' : 'text-neutral-800 hover:text-[#081c17]'
                        }`}
                        style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#071914] text-[#d5a864] rotate-180'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-neutral-200/40 text-neutral-600">
                      {renderAnswer(item.answer)}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#fbf9f5] border border-[#d5a864]/30 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h4
              className="text-base sm:text-lg font-bold text-[#081c17]"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Punya Pertanyaan Spesifik Mengenai Lahan Anda?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
              Setiap bidang tanah memiliki karakteristik zonasi dan potensi ROI yang unik. Diskusikan langsung dengan konsultan ahli kami tanpa biaya.
            </p>
          </div>

          <button
            onClick={handleWhatsApp}
            className="shrink-0 px-5 py-3 rounded-xl bg-[#071914] hover:bg-[#0d2e24] text-[#d5a864] text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya via WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-[#d5a864]" />
          </button>
        </div>

      </div>
    </section>
  );
};
