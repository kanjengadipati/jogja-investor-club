'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { PropertyArchetypes } from './PropertyArchetypes';
import { ProcessSteps } from './ProcessSteps';
import { Projects, type ProjectData } from './Projects';
import { StrategicAreas } from './StrategicAreas';
import { LeadCalculatorBanner } from './LeadCalculatorBanner';
import { Footer } from './Footer';
import { WhatsAppFloatingCTA } from './WhatsAppFloatingCTA';
import { PropertyType } from '../types/property';

// ─── Sanity data types ────────────────────────────────────────────────────────

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

/** Mirrors investmentCluster Sanity schema */
export interface SanityInvestmentCluster {
  clusterId: string;
  title: string;
  subtitle?: string;
  badge?: string;
  bestFor?: string;
  priceBadge?: string;
  fullName: string;
  description?: string;
  priceRange?: string;
  njopPrice?: string;
  growthRate?: string;
  roi?: string;
  targetRegions?: string[];
  hotspotKecamatanSlugs?: string[];
  order?: number;
}

/** Mirrors yogyakartaRegion Sanity schema */
export interface SanityYogyakartaRegion {
  regionId: string;
  name: string;
  fullName?: string;
  recommended?: string;
  landPrice?: string;
  njopPrice?: string;
  njopRangeDetail?: string;
  njopRatio?: string;
  tollAccessDesc?: string;
  rtrwDesc?: string;
  yieldEst?: string;
  occupancy?: string;
  kdb?: string;
  highlights?: string[];
  desc?: string;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface PageClientProps {
  heroData: HeroData | null;
  archetypes: PropertyArchetypeData[];
  processSteps: ProcessStepData[];
  siteSettings: SiteSettingsData | null;
  projects: ProjectData[];
  investmentClusters: SanityInvestmentCluster[];
  yogyakartaRegions: SanityYogyakartaRegion[];
}

export default function PageClient({
  heroData,
  archetypes,
  processSteps,
  siteSettings,
  projects,
  investmentClusters,
  yogyakartaRegions,
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

  const handleOpenWhatsAppDirect = () => {
    const text = encodeURIComponent(defaultWAMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1a221f] selection:bg-[#d5a864] selection:text-[#071914]">
      {/* 1. Navbar */}
      <Navbar onOpenConsultation={scrollToCalculator} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero
          onStartCalculator={scrollToGISSpatial}
          onOpenConsultation={handleOpenWhatsAppDirect}
          heroData={heroData}
        />

        {/* 3. Solusi Properti */}
        <PropertyArchetypes onSelectArchetype={handleSelectArchetype} archetypes={archetypes} />

        {/* 4. Area Strategis GIS */}
        <StrategicAreas
          onSelectZone={handleSelectZone}
          sanityInvestmentClusters={investmentClusters}
          sanityYogyakartaRegions={yogyakartaRegions}
        />

        {/* 5. Proses Layanan */}
        <ProcessSteps steps={processSteps} />

        {/* 6. Portofolio Proyek Selesai */}
        <Projects projects={projects} />

        {/* 7. Kalkulator */}
        <LeadCalculatorBanner
          initialPropertyType={selectedPropertyType}
          initialZone={selectedZone}
        />
      </main>

      {/* 8. Footer */}
      <Footer onOpenWhatsApp={handleOpenWhatsAppDirect} siteSettings={siteSettings} />

      {/* Floating WhatsApp */}
      <WhatsAppFloatingCTA onOpenWhatsApp={handleOpenWhatsAppDirect} />
    </div>
  );
}
