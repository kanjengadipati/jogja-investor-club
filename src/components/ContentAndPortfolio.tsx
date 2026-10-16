import React, { useState } from 'react';
import { CONTENT_CATEGORIES, PROJECT_PORTFOLIO } from '../data/jogjaData';
import {
  Lightbulb,
  Building,
  BarChart3,
  Quote,
  Sparkles,
  ArrowRight,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';

export const ContentAndPortfolio: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(PROJECT_PORTFOLIO[0].id);
  const activeCase = PROJECT_PORTFOLIO.find((c) => c.id === selectedCaseId) || PROJECT_PORTFOLIO[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb':
        return Lightbulb;
      case 'Building':
        return Building;
      case 'BarChart3':
        return BarChart3;
      case 'Quote':
        return Quote;
      case 'Sparkles':
        return Sparkles;
      default:
        return Lightbulb;
    }
  };

  return (
    <section id="portofolio" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2821] mb-2">
            <span className="w-6 h-6 rounded-full bg-[#081c17] text-[#c5a25d] flex items-center justify-center text-xs font-black">
              6
            </span>
            <span>Konten & Bukti Portofolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081c17] tracking-tight">
            Transparansi Proses & Bukti Nyata di Jogja
          </h2>
          <p className="text-base text-neutral-600 mt-3">
            Dari tanah kosong dan semak belukar hingga menjadi mesin penghasil passive income atau hunian megah bernilai investasi tinggi.
          </p>
        </div>

        {/* 5 Content Pillars from Flyer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-16">
          {CONTENT_CATEGORIES.map((cat) => {
            const IconComp = getCategoryIcon(cat.icon);
            return (
              <div
                key={cat.id}
                className="bg-[#fbf9f5] border border-neutral-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#c5a25d] transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#081c17] text-[#c5a25d] flex items-center justify-center mb-3">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#081c17] mb-1">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-tight mb-2">
                    {cat.tagline}
                  </p>
                </div>
                <div className="text-[10px] text-neutral-600 font-medium italic border-t border-neutral-200/60 pt-2 line-clamp-2">
                  {cat.sampleItem}
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Case Study Spotlight: Before - Process - Results */}
        <div className="bg-[#fbf9f5] border border-neutral-300 rounded-3xl p-6 sm:p-8 lg:p-10 mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-neutral-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5a25d] block mb-1">
                Studi Kasus Transformasi Lahan Nyata
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#081c17]">
                {activeCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#c5a25d]" />
                <span>{activeCase.location}</span>
                <span aria-hidden="true">·</span>
                <span>Luas: {activeCase.landArea} m²</span>
              </p>
            </div>

            {/* Case Study Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {PROJECT_PORTFOLIO.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedCaseId(proj.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    selectedCaseId === proj.id
                      ? 'bg-[#081c17] text-[#c5a25d] shadow-sm'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                  }`}
                >
                  {proj.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Photo */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
              <img
                src={activeCase.image}
                alt={activeCase.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#081c17]/90 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-[#c5a25d]/30">
                Hasil Jadi Proyek
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-sm text-white p-3.5 rounded-xl border border-white/10 text-xs">
                <span className="text-[#c5a25d] font-bold block mb-0.5">Kinerja Real Pasca Serah Terima:</span>
                <span className="text-neutral-200">{activeCase.actualReturn}</span>
              </div>
            </div>

            {/* Step breakdown: Before -> Process -> After */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase mb-1">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">1</span>
                  <span>Kondisi Awal (Before)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {activeCase.initialCondition}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">2</span>
                  <span>Proses & Waktu Konstruksi</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  Durasi {activeCase.constructionTime} · Luas Bangunan {activeCase.buildingArea} m² · Total RAB {activeCase.rabTotal} (Fixed Price tanpa adendum biaya).
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-300 bg-emerald-50/50">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">3</span>
                  <span>Hasil Transformasi (After)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                  {activeCase.developedInto}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Quote Banner matching flyer */}
        <div className="bg-[#081c17] text-white rounded-2xl p-8 sm:p-10 text-center border border-[#c5a25d]/40 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-3">
            <blockquote className="text-2xl sm:text-3xl font-serif italic text-white tracking-tight">
              “Properti di Jogja bukan hanya tempat, tapi investasi masa depan.”
            </blockquote>
            <p className="text-xs sm:text-sm text-neutral-300">
              Yogyakarta adalah kota magnet abadi: puluhan universitas terakreditasi, jutaan wisatawan domestik & mancanegara, serta tingkat apresiasi nilai tanah tercepat di Pulau Jawa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
