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

export const FALLBACK_FAQS: FAQData[] = [
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

  const categories = [
    { key: 'semua', label: 'Semua' },
    { key: 'investasi', label: 'Investasi' },
    { key: 'proses', label: 'Lokasi & Akses' },
    { key: 'legalitas', label: 'Legalitas' },
    { key: 'pembiayaan', label: 'Pembiayaan' },
    { key: 'umum', label: 'Lainnya' },
  ];

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
    <section id="faq" className="py-20 lg:py-28 bg-[#fbf9f5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <div className="text-center space-y-3 mb-10">
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

          <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Temukan jawaban atas pertanyaan umum seputar investasi properti di Jogja.
          </p>
        </div>

        {/* Category Tabs - Flat Sharp Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const active = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-none text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#071914] text-white font-bold'
                    : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List - Minimalist Flat Rows */}
        <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 bg-white shadow-sm">
          {filteredList.map((item, index) => {
            const isOpen = expandedIndex === index;

            return (
              <div key={`${item.question}-${index}`} className="transition-colors">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3
                    className="text-sm sm:text-base font-bold text-[#081c17]"
                    style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                  >
                    {item.question}
                  </h3>

                  <div className="w-6 h-6 flex items-center justify-center shrink-0 text-neutral-400">
                    <span className="text-lg font-mono font-light">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-[#fcfbfa]">
                    {renderAnswer(item.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Flat Help Box matching Mockup */}
        <div className="mt-12 p-6 sm:p-7 rounded-none bg-white border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-sm">
          <div className="space-y-1">
            <h4
              className="text-base sm:text-lg font-bold text-[#081c17]"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Tim kami siap membantu Anda.
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500">
              Konsultasikan kebutuhan investasi properti Anda dengan tim kami.
            </p>
          </div>

          <button
            onClick={handleWhatsApp}
            className="shrink-0 px-6 py-3 rounded-none bg-[#071914] hover:bg-[#0d2e24] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>Hubungi Kami Sekarang</span>
            <ArrowRight className="w-4 h-4 text-[#d5a864]" />
          </button>
        </div>

      </div>
    </section>
  );
};
