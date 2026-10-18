import React from 'react';
import type { FAQData } from './FAQ';
import { FALLBACK_FAQS } from './FAQ';
import type { SiteSettingsData } from './PageClient';

interface JsonLdProps {
  siteUrl?: string;
  faqs?: FAQData[];
  siteSettings?: SiteSettingsData | null;
}

function extractAnswerText(answer: any): string {
  if (!answer) return '';
  if (typeof answer === 'string') return answer;
  if (Array.isArray(answer)) {
    return answer
      .map((b: any) => {
        if (b && typeof b === 'object' && b._type === 'block') {
          return (b.children || []).map((c: any) => c.text).join('');
        }
        return '';
      })
      .filter(Boolean)
      .join(' ');
  }
  return String(answer);
}

export const JsonLd: React.FC<JsonLdProps> = ({
  siteUrl = 'https://jic.webjoz.com',
  faqs,
  siteSettings,
}) => {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS;
  const brandName = siteSettings?.brandName ?? 'Jogja Investor Club';
  const phone = siteSettings?.whatsappNumber
    ? `+${siteSettings.whatsappNumber}`
    : '+62-821-3700-0888';

  // 1. Organization & RealEstateAgent / ProfessionalService Schema
  const realEstateAgentSchema = {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: brandName,
    alternateName: ['JIC', 'Jogja Investor Club Yogyakarta', 'JIC Property Investor'],
    url: siteUrl,
    logo: `${siteUrl}/images/logo-jic-original.png`,
    image: `${siteUrl}/images/hero_jogja_landscape_1792108229283.jpg`,
    description:
      'Jogja Investor Club (JIC) adalah jaringan investor properti dan konsultan pembangunan terkemuka di Yogyakarta. Solusi turn-key pembangunan kos eksklusif, boutique villa, dan rumah tinggal dengan analisis GIS spasial serta estimasi yield ROI presisi.',
    telephone: phone,
    priceRange: 'Rp 800.000.000 - Rp 25.000.000.000',
    currenciesAccepted: 'IDR',
    paymentAccepted: 'Bank Transfer, KPR, Cash Bertahap, Joint Venture / KSO',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yogyakarta & Sleman',
      addressLocality: 'Sleman',
      addressRegion: 'Daerah Istimewa Yogyakarta',
      postalCode: '55281',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.7956,
      longitude: 110.3695,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Daerah Istimewa Yogyakarta',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kabupaten Sleman',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kota Yogyakarta',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kabupaten Bantul',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kabupaten Kulon Progo',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kabupaten Gunungkidul',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Investasi & Pembangunan Properti Jogja',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pembangunan & Manajemen Kos Eksklusif Kampus',
            description:
              'Pembangunan kos eksklusif 15-30 kamar di kawasan kampus ternama DIY (UGM, UNY, UPN, UII, Atma Jaya) dengan proyeksi yield 14-19% per tahun.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pembangunan Boutique Villa & Hospitality',
            description:
              'Pengembangan villa privat & resort di kawasan wisata Yogyakarta (Kaliurang, Pakem, Cangkringan) dengan konsep arsitektur tropis modern.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Analisis Kelayakan Lahan GIS Spatial Intelligence',
            description:
              'Audit kesesuaian tata ruang RTRW, validasi batas KDB/KLB, dan kalkulasi potensi capital gain tanah se-DIY.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audit Yuridis & Perizinan PBG / SLF Turn-Key',
            description:
              'Pendampingan legalitas pemecahan sertifikat SHM waris, izin PBG, dan Sertifikat Laik Fungsi resmi di seluruh kantor dinas DIY.',
          },
        },
      ],
    },
  };

  // 2. WebSite Schema
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: brandName,
    url: siteUrl,
    inLanguage: 'id-ID',
    description:
      'Portal resmi Jogja Investor Club: Analisis investasi properti, estimasi ROI lahan, dan pembangunan kos eksklusif serta villa di Yogyakarta.',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  // 3. FAQPage Schema (Enables Google Rich Results FAQ accordion)
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: activeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: extractAnswerText(faq.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </>
  );
};
