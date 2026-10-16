import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingCTAProps {
  onOpenWhatsApp: () => void;
}

export const WhatsAppFloatingCTA: React.FC<WhatsAppFloatingCTAProps> = ({ onOpenWhatsApp }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onOpenWhatsApp}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-emerald-400/40 cursor-pointer"
        aria-label="Konsultasi via WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c5a25d] rounded-full border border-emerald-600" />
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
          Konsultasi WhatsApp
        </span>
      </button>
    </div>
  );
};
