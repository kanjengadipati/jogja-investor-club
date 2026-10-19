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

          {/* Right: Social & CTA */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-neutral-400">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>

            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-[#d5a864] hover:text-[#071914] border border-[#d5a864]/50 rounded-none text-xs font-semibold text-[#d5a864] transition-colors cursor-pointer uppercase tracking-wider"
            >
              <span>Hubungi Kami</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-none bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
