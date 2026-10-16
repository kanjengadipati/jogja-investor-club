import React, { useState } from 'react';
import { JOGJA_IMAGES } from '../data/jogjaData';
import { PropertyType } from '../types/property';
import { ArrowRight, Check, X } from 'lucide-react';
import { formatShortRupiah } from '../utils/calculator';

interface PropertyArchetypesProps {
  onSelectArchetype: (type: PropertyType) => void;
}

export const PropertyArchetypes: React.FC<PropertyArchetypesProps> = ({ onSelectArchetype }) => {
  const [selectedModal, setSelectedModal] = useState<PropertyType | null>(null);

  const cards = [
    {
      id: 'rumah' as PropertyType,
      title: 'Rumah',
      subtitle: 'Hunian nyaman untuk keluarga',
      image: JOGJA_IMAGES.rumah,
      yieldInfo: 'Apresiasi Tanah 10–15% / tahun',
      buildCost: 'Rp 4.5 Jt / m²',
      minArea: '100 m²',
      desc: 'Rumah tinggal impian dengan arsitektur modern tropis, pencahayaan alami, material SNI tahan gempa, dan tata ruang ramah keluarga.',
      perks: [
        'Desain arsitektur modern tropis',
        'Sirkulasi udara alami & hemat energi',
        'Pondasi tahan gempa standar SNI',
        'Garansi pemeliharaan pasca serah terima',
      ],
    },
    {
      id: 'villa' as PropertyType,
      title: 'Villa',
      subtitle: 'Investasi properti bernilai tinggi',
      image: JOGJA_IMAGES.villa,
      yieldInfo: 'ROI 15–22% / tahun (Sewa Harian)',
      buildCost: 'Rp 6.2 Jt / m²',
      minArea: '180 m²',
      desc: 'Sanctuary privat berkolam renang di kawasan strategis atau sejuk Jogja. Menghasilkan passive income sewa harian wisatawan.',
      perks: [
        'Private plunge pool & sunken lounge',
        'Desain Instagrammable daya tarik sewa tinggi',
        'Material batu alam Merapi & kayu jati pilihan',
        'Break-Even Point (BEP) tercepat 4–5 tahun',
      ],
    },
    {
      id: 'kos' as PropertyType,
      title: 'Homestay & Kos Eksklusif',
      subtitle: 'Penghasilan pasif jangka panjang',
      image: JOGJA_IMAGES.kos,
      yieldInfo: 'ROI 14–18% / tahun (Okupansi 95%)',
      buildCost: 'Rp 4.8 Jt / m²',
      minArea: '150 m²',
      desc: 'Mesin uang stabil di kawasan kampus dan pusat bisnis Jogja. Kamar tidur ber-AC dengan kamar mandi dalam berfasilitas lengkap.',
      perks: [
        'Layout efisien 16-22 m² kamar mandi dalam',
        'Coworking space & area parkir kendaraan lega',
        'Token listrik mandiri & internet fiber optik',
        'Permintaan sewa 300.000+ mahasiswa Jogja',
      ],
    },
  ];

  return (
    <section id="solusi-properti" className="py-16 lg:py-20 bg-[#fbf9f5] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with decorative lines matching the screenshot */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12">
          <span className="h-[1px] bg-neutral-300 w-16 sm:w-28 md:w-36 hidden sm:inline-block" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#081c17] tracking-tight text-center">
            Satu lahan, banyak kemungkinan
          </h2>
          <span className="h-[1px] bg-neutral-300 w-16 sm:w-28 md:w-36 hidden sm:inline-block" />
        </div>

        {/* 3 Horizontal Panoramic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                onSelectArchetype(card.id);
              }}
              className="group relative rounded-xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/11] cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 bg-neutral-900"
            >
              {/* Photo */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Gradient Scrim matching screenshot */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Text overlay at bottom matching screenshot */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-2xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-0.5">
                  {card.subtitle}
                </p>
              </div>

              {/* Subtle hover detail indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-[#d5a864] text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#d5a864]/40 flex items-center gap-1">
                <span>Hitung Potensi</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
