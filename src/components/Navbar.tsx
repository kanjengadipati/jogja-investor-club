'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import type { SiteSettingsData } from './PageClient';

interface NavbarProps {
  onOpenConsultation: () => void;
  activeSection?: string;
  siteSettings?: SiteSettingsData | null;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}


export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  activeSection: propActiveSection,
  siteSettings,
}) => {
  const navItems = React.useMemo<NavItem[]>(() => {
    const items = [
      { id: 'beranda', label: 'Beranda', href: '#beranda', show: siteSettings?.showSectionHero !== false },
      { id: 'solusi-properti', label: 'Solusi', href: '#solusi-properti', show: siteSettings?.showSectionPropertyArchetypes !== false },
      { id: 'area-potensial', label: 'Area GIS', href: '#area-potensial', show: siteSettings?.showSectionStrategicAreas !== false },
      { id: 'proses-layanan', label: 'Proses', href: '#proses-layanan', show: siteSettings?.showSectionProcessSteps !== false },
      { id: 'proyek-selesai', label: 'Portofolio', href: '#proyek-selesai', show: siteSettings?.showSectionProjects !== false },
      { id: 'testimoni', label: 'Testimoni', href: '#testimoni', show: siteSettings?.showSectionTestimonials !== false },
      { id: 'faq', label: 'FAQ', href: '#faq', show: siteSettings?.showSectionFAQ !== false },
    ];
    return items.filter((item) => item.show).map(({ show, ...rest }) => rest);
  }, [siteSettings]);

  const defaultActive = navItems[0]?.id || 'beranda';
  const [activeSection, setActiveSection] = useState<string>(propActiveSection || defaultActive);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClickScrollingRef = useRef(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const brandName = siteSettings?.brandName ?? 'Jogja Investor';
  const brandSuffix = siteSettings?.brandSuffix ?? 'Club';

  // Sync if propActiveSection changes externally
  useEffect(() => {
    if (propActiveSection) {
      setActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  // Scroll spy & URL hash detection
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const determineActiveSection = () => {
      if (isClickScrollingRef.current) return;

      // When near the top, first visible section is active
      if (window.scrollY < 120) {
        if (sectionIds.includes('beranda')) {
          setActiveSection('beranda');
        } else if (navItems[0]) {
          setActiveSection(navItems[0].id);
        }
        return;
      }

      const navOffset = 110; // navbar height (80px) + safety buffer

      let matchedSection = '';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // If section has reached navbar and bottom is still below navbar
        if (rect.top <= navOffset && rect.bottom > navOffset) {
          matchedSection = item.id;
          break;
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    const onScroll = () => {
      determineActiveSection();
    };

    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection(navItems[0]?.id || 'beranda');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);

    // Initial sync
    if (window.location.hash) {
      onHashChange();
    } else {
      determineActiveSection();
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, [navItems]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    setActiveSection(item.id);
    setMobileMenuOpen(false);

    // Prevent scroll spy from instantly reverting during smooth scrolling
    isClickScrollingRef.current = true;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);

    if (item.id === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
      return;
    }

    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      const navOffset = 76; // header height is h-20 (80px)
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${item.id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071914]/95 backdrop-blur-md border-b border-[#c5a25d]/20 text-white transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-20">

        {/* Zone 1: Logo & Brand */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            if (siteSettings?.showSectionHero !== false) {
              handleNavClick(e, { id: 'beranda', label: 'Beranda', href: '#beranda' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3.5 shrink-0 group cursor-pointer"
        >
          <div className="h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/images/logo-jic-dark-navbar.png"
              alt="Jogja Investor Club (JIC)"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span
              className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-tight"
              style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
            >
              {brandName}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#d5a864] uppercase leading-tight font-bold">
              {brandSuffix}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? "text-white font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#c5a25d]"
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#071914] bg-[#d5a864] hover:bg-[#e2b772] active:bg-[#c49855] rounded-none transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>Hubungi Kami</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white cursor-pointer rounded-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071914] border-b border-[#c5a25d]/20 px-6 py-4 space-y-3 text-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`block py-1 transition-colors rounded-none ${
                  isActive
                    ? 'text-[#c5a25d] font-bold border-l-2 border-[#c5a25d] pl-2'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          {siteSettings?.showSectionCalculator !== false && (
            <a
              href="#hitung-potensi"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                const el = document.getElementById('hitung-potensi');
                if (el) {
                  const navOffset = 76;
                  const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
              className="block text-neutral-300 hover:text-white py-1"
            >
              Hitung Potensi Tanah
            </a>
          )}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full mt-2 py-3 text-center text-xs font-bold text-[#071914] bg-[#d5a864] rounded-none cursor-pointer uppercase tracking-wider"
          >
            Hubungi Kami via WhatsApp
          </button>
        </div>
      )}
    </header>
  );
};

