'use client';

import React from 'react';
import { ArrowUp, Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp }) => {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open(
        'https://wa.me/6282137000888?text=Halo%20Jogja%20Investor%20Club%2C%20saya%20ingin%20konsultasi%20awal%20gratis.',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051410] text-white border-t border-[#c5a25d]/20 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Left: Brand Logo Lockup */}
          <a href="#" className="flex items-center gap-3.5 shrink-0 group">
            <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/images/logo-jic-dark-navbar.png"
                alt="Jogja Investor Club (JIC)"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span
                className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-tight"
                style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
              >
                Jogja Investor
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#d5a864] uppercase leading-tight font-bold">
                Club
              </span>
            </div>
          </a>

          {/* Center: Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-neutral-300">
            <a href="#" className="hover:text-white transition-colors">
              Beranda
            </a>
            <a href="#solusi-properti" className="hover:text-white transition-colors">
              Solusi Properti
            </a>
            <a href="#studi-kasus-kedokteran" className="hover:text-[#d5a864] transition-colors">
              Studi Kasus Kedokteran
            </a>
            <a href="#area-potensial" className="hover:text-white transition-colors">
              Area Potensial
            </a>
            <a href="#proses-layanan" className="hover:text-white transition-colors">
              Proses &amp; Layanan
            </a>
            <a href="#hitung-potensi" className="hover:text-white transition-colors">
              Hitung Potensi
            </a>
          </nav>

          {/* Right: Direct WA trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#09221b] hover:bg-[#0d2e24] border border-[#d5a864]/40 rounded-xl text-xs font-semibold text-[#d5a864] transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Hotline</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d5a864]" />
            <span>&copy; {new Date().getFullYear()} Jogja Investor Club (JIC). Seluruh Hak Cipta Dilindungi.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Yogyakarta, D.I. Yogyakarta</span>
            <span>·</span>
            <span>Konsultan Finansial &amp; Kontraktor Properti</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
