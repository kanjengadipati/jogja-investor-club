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
  const defaultSteps = [
    {
      number: 1,
      title: 'Konsultasi Awal',
      description: 'Diskusikan kebutuhan dan target investasi Anda bersama konsultan kami.',
      icon: 'MessageSquare',
    },
    {
      number: 2,
      title: 'Pilih Lokasi',
      description: 'Tentukan lokasi terbaik yang sesuai dengan rencana dan anggaran Anda.',
      icon: 'Search',
    },
    {
      number: 3,
      title: 'Proses Mudah',
      description: 'Kami bantu seluruh proses administrasi, perizinan, dan legalitas resmi.',
      icon: 'PenTool',
    },
    {
      number: 4,
      title: 'Investasi Aman',
      description: 'Nikmati hasil apresiasi nilai dan passive income properti dengan tenang.',
      icon: 'Check',
    },
  ];

  const data = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section id="proses-layanan" className="py-20 lg:py-28 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered Header */}
        <div className="text-center mb-16 space-y-3">
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
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Proses investasi properti menjadi lebih mudah.
          </p>
        </div>

        {/* Steps Grid - Flat without round */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((step, idx) => {
            const iconKey = step.icon ?? 'Check';
            const Icon: LucideIcon = ICON_MAP[iconKey] ?? CheckCircle;
            const formattedNum = String(step.number || idx + 1).padStart(2, '0');

            return (
              <div
                key={step.number || idx}
                className="group flex flex-col items-center text-center bg-[#fbf9f5] rounded-none border border-neutral-200/80 p-8 hover:border-[#d5a864] hover:shadow-lg transition-all duration-300"
              >
                {/* Flat square icon container */}
                <div className="w-12 h-12 rounded-none bg-white border border-neutral-200 flex items-center justify-center text-[#c5a25d] mb-6 group-hover:border-[#d5a864] transition-colors">
                  <Icon className="w-5 h-5 text-[#c5a25d]" />
                </div>

                {/* Step title with 01. prefix */}
                <h4
                  className="text-base sm:text-lg font-bold text-[#081c17] mb-2.5"
                  style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                >
                  <span className="text-[#c5a25d] font-mono mr-1.5">{formattedNum}.</span>
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
    </section>
  );
};
