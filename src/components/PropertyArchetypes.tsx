'use client';

import React, { useState } from 'react';
import { JOGJA_IMAGES } from '../data/jogjaData';
import { PropertyType } from '../types/property';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { PropertyArchetypeData } from './PageClient';

interface PropertyArchetypesProps {
  onSelectArchetype: (type: PropertyType) => void;
  archetypes?: PropertyArchetypeData[];
}

// Accent & badge colour mapping per property id
const STYLE_MAP: Record<string, { badgeColor: string; accent: string }> = {
  rumah: { badgeColor: 'text-sky-300', accent: 'from-sky-900/40' },
  villa: { badgeColor: 'text-[#d5a864]', accent: 'from-amber-900/40' },
  kos:   { badgeColor: 'text-emerald-300', accent: 'from-emerald-900/40' },
};

// Fallback image map when Sanity image is not yet set
const FALLBACK_IMAGES: Record<string, string> = {
  rumah: JOGJA_IMAGES.rumah,
  villa: JOGJA_IMAGES.villa,
  kos:   JOGJA_IMAGES.kos,
};

// Static fallback data used when Sanity returns nothing
const FALLBACK_CARDS: PropertyArchetypeData[] = [
  {
    id: 'rumah',
    title: 'Rumah',
    subtitle: 'Hunian syariah untuk keluarga',
    yieldInfo: 'Apresiasi 10–15% / thn',
  },
  {
    id: 'villa',
    title: 'Villa',
    subtitle: 'Investasi properti bernilai tinggi',
    yieldInfo: 'ROI 15–22% / thn',
  },
  {
    id: 'kos',
    title: 'Homestay & Kos',
    subtitle: 'Penghasilan stabil jangka panjang',
    yieldInfo: 'ROI 14–18% / thn',
  },
];

export const PropertyArchetypes: React.FC<PropertyArchetypesProps> = ({
  onSelectArchetype,
  archetypes,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Use Sanity data if available and non-empty, else use fallback
  const cards = archetypes && archetypes.length > 0 ? archetypes : FALLBACK_CARDS;

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
          {cards.map((card) => {
            const styles = STYLE_MAP[card.id] ?? { badgeColor: 'text-white', accent: 'from-neutral-900/40' };
            const image = card.image ?? FALLBACK_IMAGES[card.id] ?? JOGJA_IMAGES.villa;
            const badge = card.yieldInfo ?? '';

            return (
              <div
                key={card.id}
                id={`archetype-card-${card.id}`}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectArchetype(card.id as PropertyType)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-neutral-900"
                style={{ aspectRatio: '4/5' }}
              >
                {/* Photo */}
                <img
                  src={image}
                  alt={`${card.title} - Solusi Investasi & Bangun Properti Yogyakarta`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${styles.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Top badge */}
                {badge && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5">
                      <TrendingUp className={`w-3 h-3 ${styles.badgeColor}`} />
                      <span className={`text-[11px] font-bold ${styles.badgeColor}`}>{badge}</span>
                    </div>
                  </div>
                )}

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
                    {card.subtitle && (
                      <p className="text-sm text-neutral-300 font-light">{card.subtitle}</p>
                    )}
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-neutral-200">Lihat detail →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
