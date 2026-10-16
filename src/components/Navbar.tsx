'use client';

import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import type { SiteSettingsData } from './PageClient';

interface NavbarProps {
  onOpenConsultation: () => void;
  activeSection?: string;
  siteSettings?: SiteSettingsData | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  activeSection = 'beranda',
  siteSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName   = siteSettings?.brandName   ?? 'Jogja Investor';
  const brandSuffix = siteSettings?.brandSuffix ?? 'Club';

  return (
    <header className="sticky top-0 z-50 bg-[#071914]/95 backdrop-blur-md border-b border-[#c5a25d]/20 text-white transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-20">

        {/* Zone 1: Logo & Brand */}
        <a href="#" className="flex items-center gap-3.5 shrink-0 group">
          <div className="h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/images/logo-jic-dark-navbar.png"
              alt="Jogja Investor Club (JIC)"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span
              className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-tight"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              {brandName}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#d5a864] uppercase leading-tight font-bold">
              {brandSuffix}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-300">
          <a
            href="#"
            className="text-white relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#c5a25d]"
          >
            Beranda
          </a>
          <a href="#solusi-properti" className="hover:text-white transition-colors py-1">
            Solusi Properti
          </a>
          <a href="#area-potensial" className="hover:text-white transition-colors py-1">
            Area Potensial
          </a>
          <a href="#proses-layanan" className="hover:text-white transition-colors py-1">
            Proses &amp; Layanan
          </a>
          <a
            href="#studi-kasus-kedokteran"
            className="hover:text-white transition-colors py-1 flex items-center gap-1.5 text-[#d5a864]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Studi Kasus Kos</span>
          </a>
        </nav>

        {/* Zone 3: CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Konsultasi Gratis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white cursor-pointer"
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
            Proses &amp; Layanan
          </a>
          <a
            href="#studi-kasus-kedokteran"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-emerald-400 font-semibold hover:text-white py-1"
          >
            Studi Kasus: Kos Kedokteran
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
            className="w-full mt-2 py-3 text-center text-xs font-bold text-[#071914] bg-[#d5a864] rounded-xl cursor-pointer"
          >
            Konsultasi Gratis via WhatsApp
          </button>
        </div>
      )}
    </header>
  );
};
