'use client';

import React from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp }) => {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open(
        'https://wa.me/6282137000888?text=Halo%20Jogja%20Property%20Consultant%2C%20saya%20ingin%20konsultasi%20awal%20gratis.',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <footer className="bg-[#051410] text-white border-t border-[#c5a25d]/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Brand Logo Lockup matching screenshot */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#c5a25d]/10 border border-[#c5a25d]/40 flex items-center justify-center text-[#d5a864]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4.5 h-4.5">
                <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white leading-tight">
                Jogja Property
              </span>
              <span className="text-[10px] font-medium tracking-wider text-[#d5a864] uppercase leading-tight">
                Consultant
              </span>
            </div>
          </a>

          {/* Center: Nav links matching screenshot */}
          <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs sm:text-sm text-neutral-300">
            <a href="#" className="hover:text-white transition-colors">
              Beranda
            </a>
            <a href="#solusi-properti" className="hover:text-white transition-colors">
              Solusi Properti
            </a>
            <a href="#area-potensial" className="hover:text-white transition-colors">
              Area Potensial
            </a>
            <a href="#proses-layanan" className="hover:text-white transition-colors">
              Proses & Layanan
            </a>
            <a href="#hitung-potensi" className="hover:text-white transition-colors">
              Tentang Kami
            </a>
          </nav>

          {/* Right: WhatsApp CTA & Italicized Tagline matching screenshot */}
          <div className="flex flex-wrap items-center gap-6 shrink-0">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span>Konsultasi via WhatsApp</span>
              <ChevronRight className="w-4 h-4 text-[#d5a864] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <span className="font-['Playfair_Display'] italic text-xs sm:text-sm text-[#d5a864] hidden sm:inline-block">
              Investasi Terbaik untuk Masa Depan di Jogja
            </span>
          </div>
        </div>

        {/* Quiet copyright subline */}
        <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2">
          <p>© {new Date().getFullYear()} Jogja Property Consultant. Seluruh hak cipta dilindungi.</p>
          <p>Jl. Kaliurang KM 9, Sleman, Daerah Istimewa Yogyakarta 55581</p>
        </div>
      </div>
    </footer>
  );
};
