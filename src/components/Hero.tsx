'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, BarChart3, Users, ShieldCheck } from 'lucide-react';
import { JOGJA_IMAGES } from '../data/jogjaData';

interface HeroProps {
  onStartCalculator: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCalculator, onOpenConsultation }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-[#071914] text-white overflow-hidden">
      {/* Hero Visual — full-bleed cinematic */}
      <div className="relative min-h-[620px] lg:min-h-[700px] flex items-center">

        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={JOGJA_IMAGES.villa}
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
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-2xl space-y-7">

            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#d5a864]/15 border border-[#d5a864]/40 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d5a864] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#d5a864]">
                Jogja Investor Club
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight text-white leading-[1.05]"
                style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}>
              Punya Tanah di{' '}
              <br />
              <span
                className="italic font-semibold text-[#d5a864]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Jogja?
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-neutral-200 font-normal max-w-lg leading-relaxed">
              Wujudkan menjadi <strong className="text-white font-semibold">rumah, villa, atau homestay</strong> yang
              bernilai tinggi. Didampingi tim profesional dengan analisis data dan strategi investasi yang tepat.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="hero-cta-konsultasi"
                onClick={onOpenConsultation}
                className="group px-7 py-4 text-sm font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] rounded-xl transition-all shadow-[0_8px_32px_rgba(213,168,100,0.35)] flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Konsultasi Awal Gratis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-cta-potensi"
                onClick={onStartCalculator}
                className="group px-7 py-4 text-sm font-semibold text-white/90 hover:text-white border border-white/25 hover:border-white/50 rounded-xl transition-all backdrop-blur-sm flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5"
              >
                <BarChart3 className="w-4 h-4 text-[#d5a864]" />
                <span>Lihat Potensi Tanah</span>
              </button>
            </div>

            {/* Social proof micro-strip */}
            <div className="flex items-center gap-5 pt-2">
              <div className="flex -space-x-2.5">
                {['#2a7a5f', '#3d8a72', '#509e87', '#65b29c'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#071914] flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: c }}
                  >
                    {['BK', 'AR', 'YS', 'DW'][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-300">
                <strong className="text-white">120+ pemilik tanah</strong> sudah berkonsultasi tahun ini
              </p>
            </div>
          </div>
        </div>

        {/* Floating elegant serif quote — right side desktop */}
        <div className="hidden lg:flex absolute bottom-10 right-10 z-10 flex-col items-end gap-1 pointer-events-none">
          <p className="font-['Playfair_Display'] italic text-neutral-300/80 text-lg tracking-wide drop-shadow-md text-right leading-snug">
            "Dari tanah kosong <br />
            menjadi properti bernilai"
          </p>
          <span className="w-16 h-[1px] bg-[#d5a864]/50" />
        </div>
      </div>

      {/* 4 Pillars Trust Bar */}
      <div className="relative bg-[#0b1f1a] border-t border-[#c5a25d]/25 border-b border-[#c5a25d]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

            <div className="flex items-center gap-3.5 py-5 px-5">
              <div className="w-9 h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Lokasi Strategis</p>
                <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">Di Yogyakarta &amp; sekitarnya</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 py-5 px-5">
              <div className="w-9 h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4.5 h-4.5 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Analisis Potensi</p>
                <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">Berbasis data &amp; pengalaman</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 py-5 px-5">
              <div className="w-9 h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <Users className="w-4.5 h-4.5 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Tim Profesional</p>
                <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">Siap membantu Anda</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 py-5 px-5">
              <div className="w-9 h-9 rounded-lg bg-[#d5a864]/10 border border-[#d5a864]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 text-[#d5a864]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Investasi Aman</p>
                <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">Dengan legalitas jelas</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
