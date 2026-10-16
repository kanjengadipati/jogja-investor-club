import React from 'react';
import { DELIVERABLES, SUCCESS_METRICS } from '../data/jogjaData';
import {
  PenTool,
  Receipt,
  ShieldCheck,
  HardHat,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Sparkles,
  BarChart,
  CheckCircle2
} from 'lucide-react';

interface DeliverablesAndMetricsProps {
  onOpenWhatsApp: () => void;
}

export const DeliverablesAndMetrics: React.FC<DeliverablesAndMetricsProps> = ({ onOpenWhatsApp }) => {
  const getDeliverableIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return PenTool;
      case 'ReceiptCheck':
      case 'Receipt':
        return Receipt;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'HardHat':
        return HardHat;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return CheckCircle2;
    }
  };

  return (
    <section className="py-20 bg-[#081c17] text-white border-b border-[#c5a25d]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 8 & 9 Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Section 8: HASIL YANG ANDA DAPAT (Left Column) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a25d] mb-2">
                <span className="w-6 h-6 rounded-full bg-[#c5a25d] text-[#081c17] flex items-center justify-center text-xs font-black">
                  8
                </span>
                <span>Garansi Layanan Kami</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hasil yang Anda Dapatkan
              </h2>
              <p className="text-sm text-neutral-300 mt-2">
                Bukan sekadar gambar desain atau janji di atas kertas. Kami menyerahkan properti yang siap huni atau siap menghasilkan arus kas.
              </p>
            </div>

            {/* Deliverables List */}
            <div className="space-y-4">
              {DELIVERABLES.map((item, idx) => {
                const IconComponent = getDeliverableIcon(item.icon);
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2c23] border border-white/5 hover:border-[#c5a25d]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#c5a25d]/20 text-[#c5a25d] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-0.5">{item.title}</h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* High Impact Motivational Banner */}
            <div className="p-5 rounded-2xl bg-[#12362c] border border-[#c5a25d]/30 text-center">
              <span className="text-xs uppercase font-bold text-[#c5a25d] tracking-wider block mb-1">
                Waktunya Mengambil Keputusan
              </span>
              <p className="text-lg font-serif italic text-white font-bold">
                “Bangun Sekarang, Nikmati Hasilnya di Jogja Kota Peluang”
              </p>
            </div>
          </div>

          {/* Section 9: UKURAN KEBERHASILAN (Right Column) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a25d] mb-2">
                <span className="w-6 h-6 rounded-full bg-[#c5a25d] text-[#081c17] flex items-center justify-center text-xs font-black">
                  9
                </span>
                <span>Standar Kinerja Nyata</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ukuran Keberhasilan
              </h2>
              <p className="text-sm text-neutral-300 mt-2">
                Transparansi metrik funnel kami: mulai dari konversi iklan, survey lahan aktual, hingga tingkat pengembalian investasi (ROI) para klien.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {SUCCESS_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e2c23] border border-white/5 p-4 sm:p-5 rounded-2xl space-y-2 hover:border-[#c5a25d]/30 transition-all"
                >
                  <span className="text-xs font-medium text-neutral-400 block truncate">
                    {metric.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#c5a25d] block tabular-nums">
                    {metric.value}
                  </span>
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-xs text-neutral-200 font-medium block">
                      {metric.desc}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-0.5">
                      {metric.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Big CTA WhatsApp Box matching the green bottom bar in the flyer */}
            <div className="bg-[#12362c] border border-emerald-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    Konsultasi Sekarang via WhatsApp
                  </h4>
                  <p className="text-xs text-emerald-200">
                    Respon cepat &lt; 15 menit oleh Principal Architect Jogja
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-[#081c17] text-sm font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Chat WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#081c17]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
