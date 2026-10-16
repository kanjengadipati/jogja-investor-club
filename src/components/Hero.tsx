'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { JOGJA_IMAGES } from '../data/jogjaData';

interface HeroProps {
  onStartCalculator: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCalculator, onOpenConsultation }) => {
  return (
    <section className="relative bg-[#071914] text-white overflow-hidden">
      {/* Hero Visual Area */}
      <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Background Photography of Villa at Twilight */}
        <div className="absolute inset-0 z-0">
          <img
            src={JOGJA_IMAGES.villa}
            alt="Villa Mewah Yogyakarta dengan Kolam Renang Privat"
            className="w-full h-full object-cover object-center scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Scrims: Dark emerald fade from left, subtle bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071914] via-[#071914]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071914] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Top gold kicker with line matching screenshot */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d5a864]">
                Investasi Properti Yogyakarta
              </span>
              <span className="w-12 h-[1.5px] bg-[#d5a864]/80 inline-block" />
            </div>

            {/* Headline with signature serif italic Jogja? */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Punya Tanah di <br />
              <span className="font-['Playfair_Display'] italic font-normal text-[#d5a864]">
                Jogja?
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-neutral-200 font-normal max-w-xl leading-relaxed">
              Wujudkan menjadi rumah, villa, atau homestay yang bernilai.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-3">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] rounded-lg transition-all shadow-lg flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Konsultasi Awal Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartCalculator}
                className="text-xs sm:text-sm font-semibold text-white hover:text-[#d5a864] underline underline-offset-8 decoration-neutral-400 hover:decoration-[#d5a864] transition-all cursor-pointer py-2"
              >
                Lihat Potensi Tanah
              </button>
            </div>
          </div>
        </div>

        {/* Floating Poetic Serif Quote on the Bottom Right matching screenshot */}
        <div className="hidden lg:block absolute bottom-8 right-12 z-10 text-right pointer-events-none">
          <p className="font-['Playfair_Display'] italic text-neutral-300 text-lg tracking-wide drop-shadow-md">
            “Dari tanah kosong <br />
            menjadi properti bernilai”
          </p>
        </div>
      </div>

      {/* 4 Pillars Trust Bar directly below Hero matching screenshot */}
      <div className="bg-[#0b1f1a] border-t border-[#c5a25d]/20 border-b border-[#c5a25d]/20 py-4.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* 1. Desain Modern */}
            <div className="flex items-center justify-center gap-3 py-3 lg:py-0 px-4">
              <div className="text-[#d5a864]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-neutral-200 whitespace-nowrap">
                Desain Modern
              </span>
            </div>

            {/* 2. Biaya Transparan */}
            <div className="flex items-center justify-center gap-3 py-3 lg:py-0 px-4">
              <ShieldCheck className="w-5 h-5 text-[#d5a864]" />
              <span className="text-xs sm:text-sm font-semibold text-neutral-200 whitespace-nowrap">
                Biaya Transparan
              </span>
            </div>

            {/* 3. Tepat Waktu */}
            <div className="flex items-center justify-center gap-3 py-3 lg:py-0 px-4">
              <Clock className="w-5 h-5 text-[#d5a864]" />
              <span className="text-xs sm:text-sm font-semibold text-neutral-200 whitespace-nowrap">
                Tepat Waktu
              </span>
            </div>

            {/* 4. Hasil Berkualitas */}
            <div className="flex items-center justify-center gap-3 py-3 lg:py-0 px-4">
              <Award className="w-5 h-5 text-[#d5a864]" />
              <span className="text-xs sm:text-sm font-semibold text-neutral-200 whitespace-nowrap">
                Hasil Berkualitas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
