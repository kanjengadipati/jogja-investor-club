'use client';

import React from 'react';
import { ArrowUp, Phone, ShieldCheck } from 'lucide-react';
import type { SiteSettingsData } from './PageClient';

interface FooterProps {
  onOpenWhatsApp?: () => void;
  siteSettings?: SiteSettingsData | null;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, siteSettings }) => {
  const brandName      = siteSettings?.brandName      ?? 'Jogja Investor';
  const brandSuffix    = siteSettings?.brandSuffix    ?? 'Club';
  const whatsappNumber = siteSettings?.whatsappNumber ?? '6282137000888';
  const address        = siteSettings?.address        ?? 'Yogyakarta, D.I. Yogyakarta';
  const tagline        = siteSettings?.tagline        ?? 'Konsultan Finansial & Kontraktor Properti';

  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      const msg = encodeURIComponent(
        siteSettings?.defaultWhatsAppMessage ??
          'Halo Jogja Investor Club, saya ingin konsultasi awal gratis.'
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
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
                alt={`${brandName} ${brandSuffix}`}
                className="h-9 w-auto object-contain"
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

          {/* Center: Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-neutral-300">
            {siteSettings?.showSectionHero !== false && (
              <a href="#" className="hover:text-white transition-colors">Beranda</a>
            )}
            {siteSettings?.showSectionPropertyArchetypes !== false && (
              <a href="#solusi-properti" className="hover:text-white transition-colors">Solusi Properti</a>
            )}
            {siteSettings?.showSectionProjects !== false && (
              <a href="#proyek-selesai" className="hover:text-white transition-colors">Portofolio</a>
            )}
            {siteSettings?.showSectionTestimonials !== false && (
              <a href="#testimoni" className="hover:text-white transition-colors">Testimoni</a>
            )}
            {siteSettings?.showSectionStrategicAreas !== false && (
              <a href="#area-potensial" className="hover:text-white transition-colors">Area Potensial</a>
            )}
            {siteSettings?.showSectionProcessSteps !== false && (
              <a href="#proses-layanan" className="hover:text-white transition-colors">Proses &amp; Layanan</a>
            )}
            {siteSettings?.showSectionFAQ !== false && (
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            )}
            {siteSettings?.showSectionCalculator !== false && (
              <a href="#hitung-potensi" className="hover:text-white transition-colors">Hitung Potensi</a>
            )}
          </nav>

          {/* Right: CTA + Back to top */}
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
            <span>
              &copy; {new Date().getFullYear()} {brandName} {brandSuffix} (JIC). Seluruh Hak Cipta
              Dilindungi.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{address}</span>
            <span>·</span>
            <span>{tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
