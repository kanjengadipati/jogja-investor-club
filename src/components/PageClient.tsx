'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { PropertyArchetypes } from './PropertyArchetypes';
import { MedicalCampusCaseStudy } from './MedicalCampusCaseStudy';
import { ProcessSteps } from './ProcessSteps';
import { StrategicAreas } from './StrategicAreas';
import { LeadCalculatorBanner } from './LeadCalculatorBanner';
import { Footer } from './Footer';
import { WhatsAppFloatingCTA } from './WhatsAppFloatingCTA';
import { PropertyType } from '../types/property';

// Types mirroring Sanity data shapes
export interface HeroData {
  kicker?: string;
  headline?: string;
  headlineAccent?: string;
  subheadline?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  quoteText?: string;
  backgroundImage?: string;
}

export interface PropertyArchetypeData {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  image?: string;
  yieldInfo?: string;
  buildCost?: string;
  minArea?: string;
  features?: string[];
}

export interface ProcessStepData {
  number: number;
  title: string;
  description?: string;
  icon?: string;
}

export interface SiteSettingsData {
  brandName?: string;
  brandSuffix?: string;
  whatsappNumber?: string;
  address?: string;
  tagline?: string;
  defaultWhatsAppMessage?: string;
  logo?: string;
}

interface PageClientProps {
  heroData: HeroData | null;
  archetypes: PropertyArchetypeData[];
  processSteps: ProcessStepData[];
  siteSettings: SiteSettingsData | null;
}

export default function PageClient({
  heroData,
  archetypes,
  processSteps,
  siteSettings,
}: PageClientProps) {
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>('kos');
  const [selectedZone, setSelectedZone] = useState<string>(
    'Sleman - Kawasan Kampus (Seturan / Condongcatur / UGM)'
  );

  const whatsappNumber = siteSettings?.whatsappNumber ?? '6282137000888';
  const defaultWAMessage =
    siteSettings?.defaultWhatsAppMessage ??
    'Halo Tim Jogja Investor Club, saya memiliki tanah di Yogyakarta dan ingin berkonsultasi mengenai potensi pengembangan menjadi Rumah / Villa / Homestay & Kos Eksklusif. Mohon info jadwal konsultasi awal gratis. Terima kasih!';

  const scrollToCalculator = () => {
    const el = document.getElementById('hitung-potensi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGISSpatial = () => {
    const el =
      document.getElementById('gis-spatial-intelligence') ||
      document.getElementById('area-potensial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectArchetype = (type: PropertyType) => {
    setSelectedPropertyType(type);
    scrollToCalculator();
  };

  const handleSelectZone = (zoneName: string, shouldScroll = true) => {
    setSelectedZone(zoneName);
    if (shouldScroll) scrollToCalculator();
  };

  const handleConsultMedicalStudy = (_notes: string) => {
    setSelectedPropertyType('kos');
    setSelectedZone('Sleman - Kawasan Kampus (Seturan / Condongcatur / UGM)');
    scrollToCalculator();
  };

  const handleOpenWhatsAppDirect = () => {
    const text = encodeURIComponent(defaultWAMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1a221f] selection:bg-[#d5a864] selection:text-[#071914]">
      {/* 1. Navbar */}
      <Navbar
        onOpenConsultation={scrollToCalculator}
        siteSettings={siteSettings}
      />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero
          onStartCalculator={scrollToGISSpatial}
          onOpenConsultation={handleOpenWhatsAppDirect}
          heroData={heroData}
        />

        {/* 3. Solusi Properti */}
        <PropertyArchetypes
          onSelectArchetype={handleSelectArchetype}
          archetypes={archetypes}
        />

        {/* 4. Area Strategis */}
        <StrategicAreas onSelectZone={handleSelectZone} />

        {/* 5. Proses Layanan */}
        <ProcessSteps steps={processSteps} />

        {/* 6. Studi Kasus */}
        <MedicalCampusCaseStudy onConsultCaseStudy={handleConsultMedicalStudy} />

        {/* 7. Kalkulator */}
        <LeadCalculatorBanner
          initialPropertyType={selectedPropertyType}
          initialZone={selectedZone}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenWhatsApp={handleOpenWhatsAppDirect}
        siteSettings={siteSettings}
      />

      {/* Floating WhatsApp */}
      <WhatsAppFloatingCTA onOpenWhatsApp={handleOpenWhatsAppDirect} />
    </div>
  );
}
