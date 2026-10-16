'use client';

import React, { useState } from 'react';
import { JOGJA_IMAGES } from '../data/jogjaData';
import { PropertyType } from '../types/property';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface PropertyArchetypesProps {
  onSelectArchetype: (type: PropertyType) => void;
}

export const PropertyArchetypes: React.FC<PropertyArchetypesProps> = ({ onSelectArchetype }) => {
  const [hovered, setHovered] = useState<PropertyType | null>(null);

  const cards = [
    {
      id: 'rumah' as PropertyType,
      title: 'Rumah',
      subtitle: 'Hunian syariah untuk keluarga',
      image: JOGJA_IMAGES.rumah,
      badge: 'Apresiasi 10–15% / thn',
      badgeColor: 'text-sky-300',
      accent: 'from-sky-900/40',
    },
    {
      id: 'villa' as PropertyType,
      title: 'Villa',
      subtitle: 'Investasi properti bernilai tinggi',
      image: JOGJA_IMAGES.villa,
      badge: 'ROI 15–22% / thn',
      badgeColor: 'text-[#d5a864]',
      accent: 'from-amber-900/40',
    },
    {
      id: 'kos' as PropertyType,
      title: 'Homestay & Kos',
      subtitle: 'Penghasilan stabil jangka panjang',
      image: JOGJA_IMAGES.kos,
      badge: 'ROI 14–18% / thn',
      badgeColor: 'text-emerald-300',
      accent: 'from-emerald-900/40',
    },
  ];

  return (
    <section id="solusi-properti" className="py-20 lg:py-28 bg-[#fbf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#c5a25d] mb-1">
            Solusi Properti
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081c17] tracking-tight"
            style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
          >
            Satu Lahan,{' '}
            <span
              className="italic font-normal text-[#c5a25d]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              banyak kemungkinan
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Dari hunian properti hingga investasi, satu lahan bisa memberikan banyak manfaat.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {cards.map((card) => (
            <div
              key={card.id}
              id={`archetype-card-${card.id}`}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectArchetype(card.id)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-neutral-900"
              style={{ aspectRatio: '4/5' }}
            >
              {/* Photo */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-t ${card.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Top badge */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5">
                  <TrendingUp className={`w-3 h-3 ${card.badgeColor}`} />
                  <span className={`text-[11px] font-bold ${card.badgeColor}`}>{card.badge}</span>
                </div>
              </div>

              {/* Hover CTA chip */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <div className="flex items-center gap-1 bg-[#d5a864] text-[#071914] text-[11px] font-extrabold rounded-full px-3 py-1.5">
                  <span>Hitung Potensi</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="space-y-1 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3
                    className="text-3xl font-extrabold text-white tracking-tight leading-tight"
                    style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light">{card.subtitle}</p>
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-neutral-200">Lihat detail →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
