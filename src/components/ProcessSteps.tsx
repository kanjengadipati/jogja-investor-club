import React from 'react';
import {
  MessageSquare,
  Search,
  PenTool,
  Home,
  Star,
  CheckCircle,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ProcessStepData } from './PageClient';

interface ProcessStepsProps {
  steps?: ProcessStepData[];
}

// Map icon string from Sanity → Lucide component
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Search,
  PenTool,
  Home,
  Star,
  Check: CheckCircle,
  MessageSquare,
};

// Style cycling for steps 1-4+
const STEP_STYLES = [
  { color: 'text-blue-400',    bgColor: 'bg-blue-400/10',    borderColor: 'border-blue-400/30'    },
  { color: 'text-[#d5a864]',   bgColor: 'bg-[#d5a864]/10',   borderColor: 'border-[#d5a864]/30'   },
  { color: 'text-violet-400',  bgColor: 'bg-violet-400/10',  borderColor: 'border-violet-400/30'  },
  { color: 'text-emerald-400', bgColor: 'bg-emerald-400/10', borderColor: 'border-emerald-400/30' },
];

// Static fallback when Sanity has no content
const FALLBACK_STEPS: ProcessStepData[] = [
  {
    number: 1,
    title: 'Konsultasi Awal',
    description: 'Diskusikan kebutuhan dan rencana investasi Anda bersama konsultan kami',
    icon: 'MessageSquare',
  },
  {
    number: 2,
    title: 'Analisis Potensi',
    description: 'Pelajari nilai dan potensi lahan berdasarkan data kawasan dan regulasi',
    icon: 'Search',
  },
  {
    number: 3,
    title: 'Desain & Estimasi',
    description: 'Dapatkan desain dan estimasi biaya yang transparan sesuai anggaran',
    icon: 'PenTool',
  },
  {
    number: 4,
    title: 'Bangun & Serah Terima',
    description: 'Proses pembangunan terpantau hingga properti siap ditempati atau disewakan',
    icon: 'Check',
  },
];

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  const data = steps && steps.length > 0 ? steps : FALLBACK_STEPS;
  const stepCount = data.length;

  return (
    <section id="proses-layanan" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-3 max-w-lg">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#c5a25d]">
              Proses Kerja Kami
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081c17] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              Langkah Demi{' '}
              <span
                className="italic font-normal text-[#c5a25d]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Langkah
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
              Kami mendampingi Anda dari awal hingga properti siap digunakan.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm text-neutral-400">
            <span className="w-8 h-[1px] bg-neutral-200" />
            <span>{stepCount} langkah mudah</span>
            <span className="w-8 h-[1px] bg-neutral-200" />
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting dashed line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%-1rem)] right-[calc(12.5%-1rem)] h-[1px] border-t border-dashed border-neutral-200 z-0" />

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 ${
              stepCount === 4 ? 'lg:grid-cols-4' : stepCount === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            }`}
          >
            {data.map((step, idx) => {
              const styles = STEP_STYLES[idx % STEP_STYLES.length];
              const iconKey = step.icon ?? 'Check';
              const Icon: LucideIcon = ICON_MAP[iconKey] ?? CheckCircle;

              return (
                <div
                  key={step.number}
                  className="group flex flex-col items-center text-center bg-white rounded-2xl border border-neutral-100 p-6 hover:border-[#d5a864]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Icon + badge */}
                  <div className="relative mb-5">
                    <div
                      className={`w-10 h-10 rounded-full ${styles.bgColor} border ${styles.borderColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${styles.color}`} />
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f5ebe0] border border-[#d5a864]/40 text-[#8c672b] text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  <h4
                    className="text-sm sm:text-base font-bold text-[#081c17] mb-2"
                    style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                  >
                    {step.title}
                  </h4>
                  {step.description && (
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
