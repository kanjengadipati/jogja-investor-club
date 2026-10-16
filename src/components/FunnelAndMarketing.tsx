import React, { useState } from 'react';
import {
  HOT_LEAD_SOURCES,
  MARKETING_STRATEGY,
  FUNNEL_STEPS
} from '../data/jogjaData';
import {
  Radio,
  LayoutTemplate,
  MessageCircle,
  UserCheck,
  MapPinned,
  FileSignature,
  Handshake,
  KeyRound,
  Globe,
  Network,
  Megaphone,
  FileCheck,
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';

export const FunnelAndMarketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'funnel' | 'marketing' | 'sources'>('funnel');

  const getFunnelIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio':
        return Radio;
      case 'LayoutTemplate':
        return LayoutTemplate;
      case 'MessageCircle':
        return MessageCircle;
      case 'UserCheck':
        return UserCheck;
      case 'MapPinned':
        return MapPinned;
      case 'FileSignature':
        return FileSignature;
      default:
        return LayoutTemplate;
    }
  };

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Handshake':
        return Handshake;
      case 'KeyRound':
        return KeyRound;
      case 'Globe':
        return Globe;
      case 'Network':
        return Network;
      case 'Megaphone':
        return Megaphone;
      case 'FileCheck':
        return FileCheck;
      default:
        return Handshake;
    }
  };

  return (
    <section id="alur-funnel" className="py-20 bg-[#fbf9f5] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-neutral-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2821] mb-2">
              <span className="w-6 h-6 rounded-full bg-[#081c17] text-[#c5a25d] flex items-center justify-center text-xs font-black">
                3-5
              </span>
              <span>Strategi Ekosistem & Alur Kerja</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081c17] tracking-tight">
              Funnel Marketing & Ekosistem Properti
            </h2>
            <p className="text-base text-neutral-600 mt-2 max-w-2xl">
              Model kerja terstruktur dari hulu ke hilir: akuisisi lead, kualifikasi kebutuhan pemilik tanah, hingga realisasi konstruksi amanah.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/80 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('funnel')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'funnel'
                  ? 'bg-white text-[#081c17] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              5. Funnel Marketing (6 Tahap)
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'marketing'
                  ? 'bg-white text-[#081c17] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              4. Strategi Digital
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'sources'
                  ? 'bg-white text-[#081c17] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              3. Sumber Hot Lead
            </button>
          </div>
        </div>

        {/* Tab 1: Funnel Marketing (6 Stages) */}
        {activeTab === 'funnel' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FUNNEL_STEPS.map((step) => {
                const IconComp = getFunnelIcon(step.icon);
                return (
                  <div
                    key={step.step}
                    className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-[#c5a25d] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-8 h-8 rounded-full bg-[#081c17] text-[#c5a25d] font-bold text-xs flex items-center justify-center">
                          {step.step}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-neutral-100 group-hover:bg-[#c5a25d]/20 text-neutral-700 group-hover:text-[#081c17] flex items-center justify-center transition-colors">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a25d] block mb-1">
                        {step.actionText}
                      </span>
                      <h4 className="text-base font-extrabold text-[#081c17] mb-2 leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                      <span>Tahap {step.step} dari 6</span>
                      <span className="text-[#081c17] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Detail proses <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Strategi Digital Marketing (High Intent, Problem/Planning, Retargeting) */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div className="bg-[#081c17] text-white p-6 sm:p-8 rounded-2xl border border-[#c5a25d]/30 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Iklan Tertarget dengan Kata Kunci & Minat yang Relevan
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    Kombinasi Meta Ads (FB & IG), Google Search Ads, dan TikTok Content menjangkau target buyer ideal.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold text-neutral-200">
                    Google Ads
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold text-neutral-200">
                    Meta Ads
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold text-neutral-200">
                    TikTok
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MARKETING_STRATEGY.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#081c17] bg-neutral-100 px-2.5 py-1 rounded">
                        {tier.tier}
                      </span>
                      <Target className="w-4 h-4 text-[#c5a25d]" />
                    </div>

                    <h4 className="text-lg font-bold text-[#081c17] mb-2">{tier.sublabel}</h4>
                    <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                      {tier.audienceTrigger}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase block mb-1">
                        Kata Kunci / Target:
                      </span>
                      {tier.keywords.map((kw, i) => (
                        <div
                          key={i}
                          className="text-xs text-neutral-700 bg-neutral-50 px-2.5 py-1 rounded border border-neutral-100"
                        >
                          • {kw}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Sumber Hot Lead */}
        {activeTab === 'sources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOT_LEAD_SOURCES.map((src) => {
              const IconComp = getSourceIcon(src.icon);
              return (
                <div
                  key={src.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#081c17] text-[#c5a25d] flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#081c17] mb-1.5">{src.title}</h4>
                    <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                      {src.description}
                    </p>
                  </div>

                  <div className="bg-[#fbf9f5] p-3 rounded-xl border border-neutral-200/60 text-[11px] text-neutral-700">
                    <span className="font-bold text-[#081c17] block mb-0.5">Mekanisme Kerja:</span>
                    <span>{src.flow}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
