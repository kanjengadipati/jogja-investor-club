'use client';

import React, { useState } from 'react';
import { Navbar } from '../src/components/Navbar';
import { Hero } from '../src/components/Hero';
import { PropertyArchetypes } from '../src/components/PropertyArchetypes';
import { MedicalCampusCaseStudy } from '../src/components/MedicalCampusCaseStudy';
import { ProcessSteps } from '../src/components/ProcessSteps';
import { StrategicAreas } from '../src/components/StrategicAreas';
import { LeadCalculatorBanner } from '../src/components/LeadCalculatorBanner';
import { Footer } from '../src/components/Footer';
import { WhatsAppFloatingCTA } from '../src/components/WhatsAppFloatingCTA';
import { PropertyType } from '../src/types/property';

export default function HomePage() {
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>('kos');
  const [selectedZone, setSelectedZone] = useState<string>(
    'Sleman - Kawasan Kampus (Seturan / Condongcatur / UGM)'
  );

  const scrollToCalculator = () => {
    const el = document.getElementById('hitung-potensi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGISSpatial = () => {
    const el =
      document.getElementById('gis-spatial-intelligence') ||
      document.getElementById('area-potensial');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectArchetype = (type: PropertyType) => {
    setSelectedPropertyType(type);
    scrollToCalculator();
  };

  const handleSelectZone = (zoneName: string, shouldScroll = true) => {
    setSelectedZone(zoneName);
    if (shouldScroll) {
      scrollToCalculator();
    }
  };

  const handleConsultMedicalStudy = (notes: string) => {
    setSelectedPropertyType('kos');
    setSelectedZone('Sleman - Kawasan Kampus (Seturan / Condongcatur / UGM)');
    scrollToCalculator();
  };

  const handleOpenWhatsAppDirect = () => {
    const defaultText = encodeURIComponent(
      'Halo Tim Jogja Investor Club, saya memiliki tanah di Yogyakarta dan ingin berkonsultasi mengenai potensi pengembangan menjadi Rumah / Villa / Homestay & Kos Eksklusif. Mohon info jadwal konsultasi awal gratis. Terima kasih!'
    );
    window.open(`https://wa.me/6282137000888?text=${defaultText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1a221f] selection:bg-[#d5a864] selection:text-[#071914]">
      {/* 1. Header / Navbar */}
      <Navbar onOpenConsultation={scrollToCalculator} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section + 4 Core Pillars Trust Bar */}
        <Hero
          onStartCalculator={scrollToGISSpatial}
          onOpenConsultation={handleOpenWhatsAppDirect}
        />

        {/* 3. Satu Lahan, Banyak Kemungkinan (3 Core Property Models) */}
        <PropertyArchetypes onSelectArchetype={handleSelectArchetype} />

        {/* 4. Studi Kasus & Blueprint Investasi Riil (Kost Eksekutif Kawasan Kedokteran UGM/UII/UAD) */}
        <MedicalCampusCaseStudy onConsultCaseStudy={handleConsultMedicalStudy} />

        {/* 5. Proses Mudah Langkah Demi Langkah (4 Connected Steps) */}
        <ProcessSteps />

        {/* 6. Kawasan Strategis di Yogyakarta (Interactive Map with OSM) */}
        <StrategicAreas onSelectZone={handleSelectZone} />

        {/* 7. Hitung Potensi Tanah Anda (Lead Form Banner + Calculator) */}
        <LeadCalculatorBanner
          initialPropertyType={selectedPropertyType}
          initialZone={selectedZone}
        />
      </main>

      {/* 8. Footer */}
      <Footer onOpenWhatsApp={handleOpenWhatsAppDirect} />

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloatingCTA onOpenWhatsApp={handleOpenWhatsAppDirect} />
    </div>
  );
}
