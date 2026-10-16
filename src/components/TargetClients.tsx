import React, { useState } from 'react';
import { TARGET_CLIENTS } from '../data/jogjaData';
import { MapPin, Home, TrendingUp, Users, Building2, AlertCircle, CheckCircle } from 'lucide-react';

interface TargetClientsProps {
  onSelectClientType: (typeTitle: string) => void;
}

export const TargetClients: React.FC<TargetClientsProps> = ({ onSelectClientType }) => {
  const [selectedClient, setSelectedClient] = useState(TARGET_CLIENTS[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return MapPin;
      case 'Home':
        return Home;
      case 'TrendingUp':
        return TrendingUp;
      case 'Users':
        return Users;
      case 'Building2':
        return Building2;
      default:
        return MapPin;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2821] mb-2">
            <span className="w-6 h-6 rounded-full bg-[#081c17] text-[#c5a25d] flex items-center justify-center text-xs font-black">
              1
            </span>
            <span>Target Client Utama</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081c17] tracking-tight">
            Apakah Anda Salah Satu Pemilik Tanah Ini?
          </h2>
          <p className="text-base text-neutral-600 mt-3">
            Setiap profil pemilik tanah memiliki tantangan dan tujuan finansial yang berbeda. Kami memberikan solusi perancangan dan manajemen konstruksi yang tepat sasaran.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-10">
          {TARGET_CLIENTS.map((client) => {
            const IconComponent = getIcon(client.avatarIcon);
            const isSelected = selectedClient === client.id;

            return (
              <div
                key={client.id}
                onClick={() => {
                  setSelectedClient(client.id);
                  onSelectClientType(client.title);
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#c5a25d] bg-[#081c17] text-white shadow-xl scale-[1.02]'
                    : 'border-neutral-200 bg-[#fbf9f5] hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                        isSelected
                          ? 'bg-[#c5a25d] text-[#081c17]'
                          : 'bg-[#081c17] text-white'
                      }`}
                    >
                      {client.number}
                    </span>
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected
                          ? 'bg-white/10 text-[#c5a25d]'
                          : 'bg-neutral-200/60 text-[#081c17]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className={`text-base font-bold tracking-tight mb-1 ${
                      isSelected ? 'text-white' : 'text-[#081c17]'
                    }`}
                  >
                    {client.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {client.subtitle}
                  </p>
                </div>

                <div
                  className={`text-[11px] font-semibold flex items-center gap-1 ${
                    isSelected ? 'text-[#c5a25d]' : 'text-neutral-500'
                  }`}
                >
                  <span>Klik lihat rekomendasi</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Persona Detail Drawer */}
        {(() => {
          const active = TARGET_CLIENTS.find((c) => c.id === selectedClient) || TARGET_CLIENTS[0];
          return (
            <div className="bg-[#fbf9f5] border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-neutral-200 pb-6 md:pb-0 md:pr-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c5a25d] uppercase mb-1">
                    <span>Kasus & Dilema Umum</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-[#081c17] mb-2">{active.title}</h4>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>{active.painPoint}</p>
                  </div>
                </div>

                <div className="md:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase mb-1">
                    <span>Solusi Turnkey dari Jogja Investor Club</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="font-medium leading-relaxed">{active.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
