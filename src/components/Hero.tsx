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
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-4 w-full transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-2xl space-y-4 sm:space-y-5 lg:space-y-4 xl:space-y-5">

            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 bg-[#d5a864]/15 border border-[#d5a864]/40 rounded-full px-3.5 py-1 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d5a864] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d5a864]">
                {kicker}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              {headline}{' '}
              <br />
              <span
                className="italic font-semibold text-[#d5a864]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {headlineAccent}
              </span>
              {headlineSuffix}
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-base xl:text-lg text-neutral-200 font-normal max-w-xl leading-relaxed">
              {subheadline}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                id="hero-cta-konsultasi"
                onClick={onOpenConsultation}
                className="group px-6 py-3.5 text-sm font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] rounded-xl transition-all shadow-[0_8px_32px_rgba(213,168,100,0.35)] flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5"
              >
                <span>{ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-cta-potensi"
                onClick={onStartCalculator}
                title="Buka Peta GIS Spatial Intelligence"
                className="group px-6 py-3.5 text-sm font-semibold text-white/90 hover:text-white border border-white/25 hover:border-white/50 rounded-xl transition-all backdrop-blur-sm flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-[#d5a864] group-hover:scale-110 transition-transform" />
                <span>{ctaSecondaryText}</span>
              </button>
            </div>

            {/* Social proof micro-strip */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2">
                {['#2a7a5f', '#3d8a72', '#509e87', '#65b29c'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#071914] flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: c }}
                  >
                    {['BK', 'AR', 'YS', 'DW'][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-300">
                <strong className="text-white">80+ investor aktif</strong> telah bergabung di JIC
              </p>
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

      {/* 4 Pillars Trust Bar */}
      <div className="relative bg-[#0b1f1a] border-t border-[#c5a25d]/25 border-b border-[#c5a25d]/10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

            <div className="flex items-center gap-3 py-3.5 sm:py-4 px-3 sm:px-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Deal Eksklusif Jogja</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">Aset terkurasi, bukan pasar terbuka</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-3.5 sm:py-4 px-3 sm:px-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">GIS Intelligence</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">Data spasial & NJOP resmi DIY</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-3.5 sm:py-4 px-3 sm:px-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Member Network</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">80+ investor aktif se-DIY</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-3.5 sm:py-4 px-3 sm:px-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Due Diligence Penuh</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-0.5">Legalitas & feasibility study</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
