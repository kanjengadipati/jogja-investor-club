'use client';

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
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#071914] hover:bg-[#0d2e24] text-[#d5a864] rounded-none shadow-2xl transition-all duration-300 border border-[#d5a864]/50 cursor-pointer uppercase tracking-wider text-xs font-bold"
        aria-label="Konsultasi via WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-4 h-4 text-[#d5a864]" />
        </div>
        <span className="whitespace-nowrap">
          Konsultasi WhatsApp
        </span>
      </button>
    </div>
  );
};
