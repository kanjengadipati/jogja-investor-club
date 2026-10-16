import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyArchetypes } from './components/PropertyArchetypes';
import { ProcessSteps } from './components/ProcessSteps';
import { StrategicAreas } from './components/StrategicAreas';
import { LeadCalculatorBanner } from './components/LeadCalculatorBanner';
import { Footer } from './components/Footer';
import { WhatsAppFloatingCTA } from './components/WhatsAppFloatingCTA';
import { PropertyType } from './types/property';

export default function App() {
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

  const handleSelectArchetype = (type: PropertyType) => {
    setSelectedPropertyType(type);
    scrollToCalculator();
  };

  const handleSelectZone = (zoneName: string) => {
    setSelectedZone(zoneName);
    scrollToCalculator();
  };

  const handleOpenWhatsAppDirect = () => {
    const defaultText = encodeURIComponent(
      'Halo Tim Jogja Property Consultant, saya memiliki tanah di Yogyakarta dan ingin berkonsultasi mengenai potensi pengembangan menjadi Rumah / Villa / Homestay & Kos Eksklusif. Mohon info jadwal konsultasi awal gratis. Terima kasih!'
    );
    window.open(`https://wa.me/6282137000888?text=${defaultText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1a221f] selection:bg-[#d5a864] selection:text-[#071914]">
      {/* 1. Header / Navbar matching screenshot */}
      <Navbar onOpenConsultation={scrollToCalculator} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section + 4 Core Pillars Trust Bar */}
        <Hero
          onStartCalculator={scrollToCalculator}
          onOpenConsultation={handleOpenWhatsAppDirect}
        />

        {/* 3. Satu Lahan, Banyak Kemungkinan (3 Core Property Models) */}
        <PropertyArchetypes onSelectArchetype={handleSelectArchetype} />

        {/* 4. Proses Mudah Langkah Demi Langkah (4 Connected Steps) */}
        <ProcessSteps />

        {/* 5. Kawasan Strategis di Yogyakarta (Landscape + Categories + Interactive Map with OSM) */}
        <StrategicAreas onSelectZone={handleSelectZone} />

        {/* 6. Hitung Potensi Tanah Anda (Lead Form Banner + Expandable Calculation Engine) */}
        <LeadCalculatorBanner
          initialPropertyType={selectedPropertyType}
          initialZone={selectedZone}
        />
      </main>

      {/* 7. Footer Bottom Bar matching screenshot */}
      <Footer onOpenWhatsApp={handleOpenWhatsAppDirect} />

      {/* Discrete Floating WhatsApp Action */}
      <WhatsAppFloatingCTA onOpenWhatsApp={handleOpenWhatsAppDirect} />
    </div>
  );
}
