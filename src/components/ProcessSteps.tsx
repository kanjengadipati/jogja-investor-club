import React from 'react';
import { Users, Search, PenTool, Home } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Konsultasi',
      desc: 'Diskusikan kebutuhan dan rencana investasi Anda',
      icon: Users,
    },
    {
      num: 2,
      title: 'Analisis Potensi',
      desc: 'Pelajari nilai dan potensi lahan Anda',
      icon: Search,
    },
    {
      num: 3,
      title: 'Desain & Estimasi',
      desc: 'Dapatkan desain dan estimasi biaya yang transparan',
      icon: PenTool,
    },
    {
      num: 4,
      title: 'Bangun & Serah Terima',
      desc: 'Proses pembangunan hingga serah terima properti',
      icon: Home,
    },
  ];

  return (
    <section id="proses-layanan" className="py-16 lg:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#081c17] tracking-tight leading-tight">
              Proses Mudah <br />
              <span className="font-sans font-extrabold text-[#081c17]">
                Langkah Demi Langkah
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm">
              Kami mendampingi Anda dari awal hingga properti siap digunakan.
            </p>
          </div>

          {/* Right Column: 4 Connected Horizontal Steps */}
          <div className="lg:col-span-8 relative">
            {/* Connecting horizontal line across steps (desktop) */}
            <div className="hidden md:block absolute top-3.5 left-[8%] right-[8%] h-[1px] bg-neutral-300 z-0" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {steps.map((st) => {
                const IconComponent = st.icon;
                return (
                  <div key={st.num} className="flex flex-col items-center text-center space-y-3 group">
                    {/* Number Badge */}
                    <div className="w-7 h-7 rounded-full bg-[#f6ecd9] border border-[#d5a864] text-[#8c672b] font-bold text-xs flex items-center justify-center shadow-xs">
                      {st.num}
                    </div>

                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-800 group-hover:border-[#d5a864] group-hover:text-[#081c17] transition-colors">
                      <IconComponent className="w-5 h-5 stroke-[1.6]" />
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#081c17]">
                        {st.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
