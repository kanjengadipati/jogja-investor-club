import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, activeSection = 'beranda' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#071914]/95 backdrop-blur-md border-b border-[#c5a25d]/20 text-white transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-20">
        {/* Zone 1: Logo & Brand */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-lg bg-[#c5a25d]/10 border border-[#c5a25d]/40 flex items-center justify-center text-[#c5a25d] group-hover:scale-105 transition-transform">
            {/* Elegant House Icon matching screenshot */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z" />
              <path d="M9 21v-6h6v6" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-extrabold tracking-tight text-white leading-tight">
              Jogja Property
            </span>
            <span className="text-[11px] font-medium tracking-wider text-[#c5a25d] uppercase leading-tight">
              Consultant
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-neutral-300">
          <a
            href="#"
            className="text-white relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#c5a25d]"
          >
            Beranda
          </a>
          <a
            href="#solusi-properti"
            className="hover:text-white transition-colors py-1"
          >
            Solusi Properti
          </a>
          <a
            href="#area-potensial"
            className="hover:text-white transition-colors py-1"
          >
            Area Potensial
          </a>
          <a
            href="#proses-layanan"
            className="hover:text-white transition-colors py-1"
          >
            Proses & Layanan
          </a>
          <a
            href="#hitung-potensi"
            className="hover:text-white transition-colors py-1"
          >
            Tentang Kami
          </a>
        </nav>

        {/* Zone 3: CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Konsultasi Gratis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071914] border-b border-[#c5a25d]/20 px-6 py-4 space-y-3 text-sm">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#c5a25d] font-bold py-1"
          >
            Beranda
          </a>
          <a
            href="#solusi-properti"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1"
          >
            Solusi Properti
          </a>
          <a
            href="#area-potensial"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1"
          >
            Area Potensial
          </a>
          <a
            href="#proses-layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1"
          >
            Proses & Layanan
          </a>
          <a
            href="#hitung-potensi"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1"
          >
            Hitung Potensi Tanah
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full mt-2 py-3 text-center text-xs font-bold text-[#071914] bg-[#d5a864] rounded-lg"
          >
            Konsultasi Gratis via WhatsApp
          </button>
        </div>
      )}
    </header>
  );
};
