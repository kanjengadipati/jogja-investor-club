'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, BarChart3, Users, ShieldCheck } from 'lucide-react';
import { JOGJA_IMAGES } from '../data/jogjaData';
import type { HeroData } from './PageClient';

interface HeroProps {
  onStartCalculator: () => void;
  onOpenConsultation: () => void;
  heroData?: HeroData | null;
}

export const Hero: React.FC<HeroProps> = ({ onStartCalculator, onOpenConsultation, heroData }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Resolve values — Sanity data takes priority, fallback to hardcoded defaults
  const kicker = heroData?.kicker ?? 'Jogja Investor Club · Private Network';
  const headline = heroData?.headline ?? 'Investasi Properti';
  const headlineAccent = heroData?.headlineAccent ?? 'di Jogja.';
  const headlineSuffix = ' Lebih Cerdas.';
  const subheadline =
    heroData?.subheadline ??
    'Bergabunglah bersama jaringan investor properti eksklusif di Yogyakarta. Akses deal terkurasi, analisis GIS presisi, dan pendampingan penuh — dari lahan hingga passive income.';
  const ctaPrimaryText = heroData?.ctaPrimaryText ?? 'Daftar Konsultasi Gratis';
  const ctaSecondaryText = heroData?.ctaSecondaryText ?? 'Analisis Peluang Lahan';
  const quoteText =
    heroData?.quoteText ?? 'Akses eksklusif ke peluang\nproperti terbaik di Jogja';
  const backgroundImage = heroData?.backgroundImage ?? JOGJA_IMAGES.villa;

  return (
    <section id="beranda" className="relative bg-[#071914] text-white overflow-hidden flex flex-col justify-between lg:h-[calc(100dvh-5rem)] min-h-[calc(100dvh-5rem)]">
      {/* Hero Visual — full-bleed cinematic */}
      <div className="relative flex-1 flex items-center min-h-0">

        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Villa Mewah Yogyakarta dengan Kolam Renang Privat"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Multi-layer gradient scrims for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071914]/95 via-[#071914]/70 to-[#071914]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071914] via-transparent to-black/40" />
          {/* Gold accent glow */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[#d5a864]/10 blur-3xl pointer-events-none" />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-12 w-full transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-2xl space-y-5 lg:space-y-6">

            {/* Kicker badge - flat rectangle */}
            <div>
              <span className="inline-block border border-white/25 bg-[#071914]/75 px-3 py-1 text-[11px] font-mono tracking-widest text-[#d5a864] uppercase rounded-none backdrop-blur-sm">
                Investasi Properti
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-white leading-[1.08]"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Investasi Properti <br />
              <span
                className="italic font-normal text-[#d5a864]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                di Jogja.
              </span>{' '}
              Lebih Cerdas.
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-normal max-w-xl leading-relaxed">
              Peluang investasi properti di lokasi strategis dengan nilai jangka panjang, di jantung budaya dan pertumbuhan ekonomi Yogyakarta.
            </p>

            {/* CTA row - flat buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-cta-konsultasi"
                onClick={onStartCalculator}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] rounded-none transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Lihat Proyek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-potensi"
                onClick={onOpenConsultation}
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-white hover:text-[#d5a864] rounded-none transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Konsultasi Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating elegant serif quote — right side desktop */}
        <div className="hidden lg:flex absolute bottom-6 right-8 xl:right-12 z-10 flex-col items-end gap-1 pointer-events-none">
          <p className="font-['Playfair_Display'] italic text-neutral-300/80 text-base xl:text-lg tracking-wide drop-shadow-md text-right leading-snug">
            {quoteText.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {i === 0 ? `"${line}` : line}
                {i < arr.length - 1 ? <br /> : '"'}
              </React.Fragment>
            ))}
          </p>
          <span className="w-16 h-[1px] bg-[#d5a864]/50" />
        </div>
      </div>

      {/* 4 Pillars Trust Bar - Flat */}
      <div className="relative bg-[#0b1f1a] border-t border-[#c5a25d]/20 border-b border-[#c5a25d]/10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

            <div className="flex items-center gap-3 py-4 sm:py-5 px-3 sm:px-5">
              <div className="w-8 h-8 rounded-none bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Lokasi Strategis</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">Dekat pusat bisnis &amp; wisata</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-4 sm:py-5 px-3 sm:px-5">
              <div className="w-8 h-8 rounded-none bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Nilai Investasi Tinggi</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">Pertumbuhan berkelanjutan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-4 sm:py-5 px-3 sm:px-5">
              <div className="w-8 h-8 rounded-none bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Developer Terpercaya</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">Dengan pengalaman terbaik</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-4 sm:py-5 px-3 sm:px-5">
              <div className="w-8 h-8 rounded-none bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Legalitas Lengkap</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">Aman dan terpercaya</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
