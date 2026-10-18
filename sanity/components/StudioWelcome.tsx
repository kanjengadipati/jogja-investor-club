'use client';

import React from 'react';

interface QuickLinkItem {
  emoji: string;
  label: string;
  desc: string;
  path: string;
  category: 'utama' | 'trust' | 'gis';
  badge?: string;
  metric?: string;
}

const QUICK_LINKS: QuickLinkItem[] = [
  // Utama
  {
    emoji: '⚙️',
    label: 'Pengaturan Situs',
    desc: 'Nama brand, nomor WhatsApp hotline, alamat, logo & default pesan chat',
    path: '/studio/structure/siteSettings',
    category: 'utama',
    badge: 'Singleton',
  },
  {
    emoji: '🖼️',
    label: 'Hero Section',
    desc: 'Headline utama, subheadline, teks tombol CTA & foto latar belakang lanskap Jogja',
    path: '/studio/structure/hero',
    category: 'utama',
    badge: 'Singleton',
  },
  {
    emoji: '🏗️',
    label: 'Proyek Selesai (Portofolio)',
    desc: 'Kelola proyek terbangun, galeri foto arsitektur, spesifikasi teknis, luas tanah & ROI',
    path: '/studio/structure/project',
    category: 'utama',
    metric: 'Portofolio',
  },
  {
    emoji: '🏠',
    label: 'Tipe Properti (Archetypes)',
    desc: 'Konsep Rumah Tropis Modern, Villa Mewah Staycation, dan Homestay & Kos Eksklusif',
    path: '/studio/structure/propertyArchetype',
    category: 'utama',
  },
  {
    emoji: '👣',
    label: 'Langkah Proses Kerja',
    desc: '4 tahapan kerja JIC: Konsultasi Awal, Analisis Potensi, Desain, hingga Serah Terima Kunci',
    path: '/studio/structure/processStep',
    category: 'utama',
  },

  // Trust & Edukasi
  {
    emoji: '💬',
    label: 'Testimoni Mitra & Investor',
    desc: 'Ulasan pemilik lahan & investor, rating 5 bintang, badge verifikasi, yield & kutipan nyata',
    path: '/studio/structure/testimonial',
    category: 'trust',
    metric: 'Social Proof',
  },
  {
    emoji: '❓',
    label: 'FAQ (Pertanyaan Umum)',
    desc: 'Tanya jawab seputar legalitas SHM Waris, izin PBG/RTRW DIY, estimasi ROI & pembiayaan KSO',
    path: '/studio/structure/faq',
    category: 'trust',
    metric: 'Edukasi',
  },
  {
    emoji: '👤',
    label: 'Tim & Konsultan Ahli',
    desc: 'Profil Principal Architect, Lead Financial Analyst, Notaris Agraria & Head of Construction',
    path: '/studio/structure/teamMember',
    category: 'trust',
  },

  // GIS Data
  {
    emoji: '🗺️',
    label: 'Kawasan Investasi GIS',
    desc: 'Klaster strategis Sleman Kampus, Wisata Merapi, Heritage Kota, Tol YIA & Koridor Kulon Progo',
    path: '/studio/structure/investmentCluster',
    category: 'gis',
    metric: 'GIS Spatial',
  },
  {
    emoji: '📍',
    label: 'Kabupaten & Kota Yogyakarta',
    desc: 'Parameter harga tanah, rasio NJOP, KDB, regulasi tata ruang RTRW & okupansi tiap daerah',
    path: '/studio/structure/yogyakartaRegion',
    category: 'gis',
    metric: 'Data Regional',
  },
];

export default function StudioWelcome() {
  return (
    <div
      style={{
        backgroundColor: '#071914',
        minHeight: '100vh',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '36px 32px 64px 32px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>

        {/* Top Hero Banner Matching App Aesthetics */}
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #09221b 0%, #051410 100%)',
            border: '1px solid rgba(213, 168, 100, 0.35)',
            borderRadius: '24px',
            padding: '36px 40px',
            marginBottom: '32px',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(213, 168, 100, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(213, 168, 100, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Kicker badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(213, 168, 100, 0.12)',
                border: '1px solid rgba(213, 168, 100, 0.35)',
                color: '#d5a864',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              <span>🏛️</span>
              <span>Jogja Investor Club · Private CMS</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '24px',
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <h1
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '32px',
                    fontWeight: 800,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.2,
                    color: '#ffffff',
                  }}
                >
                  Pusat Kontrol{' '}
                  <span
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: '#d5a864',
                    }}
                  >
                    Investasi &amp; Konten
                  </span>
                </h1>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14.5px',
                    color: '#d1d5db',
                    lineHeight: 1.6,
                  }}
                >
                  Kelola seluruh elemen situs landing page, analisis GIS wilayah Yogyakarta, studi kelayakan properti,
                  testimoni mitra terverifikasi, dan tanya-jawab legalitas dalam satu dasbor terpadu.
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#d5a864',
                    color: '#071914',
                    fontWeight: 800,
                    fontSize: '13px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(213, 168, 100, 0.3)',
                    cursor: 'pointer',
                  }}
                >
                  <span>Buka Website Live</span>
                  <span style={{ fontSize: '14px' }}>↗</span>
                </a>
              </div>
            </div>

            {/* Metrics Ribbon Matching Main App */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                marginTop: '28px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ padding: '4px 0' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff' }}>40+ Proyek</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Portofolio Selesai &amp; Berjalan</div>
              </div>
              <div style={{ padding: '4px 0' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#d5a864' }}>14% – 21%</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Estimasi Yield Sewa Tahunan</div>
              </div>
              <div style={{ padding: '4px 0' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981' }}>100% Notariil</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Garansi Legalitas &amp; Sertifikat</div>
              </div>
              <div style={{ padding: '4px 0' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#e5e7eb' }}>10 Modul</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Siap Dikelola Tanpa Koding</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Konten Utama & Portofolio */}
        <div style={{ marginBottom: '36px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#d5a864', fontSize: '14px' }}>◆</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#e5e7eb',
                }}
              >
                Konten Utama &amp; Penawaran
              </h2>
            </div>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Hero, Portofolio &amp; Alur Layanan</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '14px',
            }}
          >
            {QUICK_LINKS.filter((i) => i.category === 'utama').map((item) => (
              <a
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '18px 20px',
                  backgroundColor: '#0a221b',
                  border: '1px solid rgba(213, 168, 100, 0.22)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = '#d5a864';
                  el.style.backgroundColor = '#0d2e24';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 24px rgba(213, 168, 100, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(213, 168, 100, 0.22)';
                  el.style.backgroundColor = '#0a221b';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(213, 168, 100, 0.1)',
                    border: '1px solid rgba(213, 168, 100, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  {item.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          backgroundColor: 'rgba(213, 168, 100, 0.2)',
                          color: '#d5a864',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#9ca3af',
                      lineHeight: 1.45,
                    }}
                  >
                    {item.desc}
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#d5a864',
                      marginTop: '8px',
                    }}
                  >
                    <span>Buka Editor</span>
                    <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Section 2: Kepercayaan & Edukasi (Testimoni, FAQ, Tim) */}
        <div style={{ marginBottom: '36px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#d5a864', fontSize: '14px' }}>◆</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#e5e7eb',
                }}
              >
                Kepercayaan &amp; Edukasi
              </h2>
            </div>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Testimoni, FAQ &amp; Tim Ahli</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '14px',
            }}
          >
            {QUICK_LINKS.filter((i) => i.category === 'trust').map((item) => (
              <a
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '18px 20px',
                  backgroundColor: '#0a221b',
                  border: '1px solid rgba(213, 168, 100, 0.22)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = '#d5a864';
                  el.style.backgroundColor = '#0d2e24';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 24px rgba(213, 168, 100, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(213, 168, 100, 0.22)';
                  el.style.backgroundColor = '#0a221b';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(213, 168, 100, 0.1)',
                    border: '1px solid rgba(213, 168, 100, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  {item.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>
                      {item.label}
                    </span>
                    {item.metric && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          padding: '1px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {item.metric}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#9ca3af',
                      lineHeight: 1.45,
                    }}
                  >
                    {item.desc}
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#d5a864',
                      marginTop: '8px',
                    }}
                  >
                    <span>Buka Editor</span>
                    <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Section 3: Data Spasial & Riset Kawasan GIS */}
        <div style={{ marginBottom: '36px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#d5a864', fontSize: '14px' }}>◆</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#e5e7eb',
                }}
              >
                Data Spasial &amp; Riset Kawasan GIS
              </h2>
            </div>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Klaster Investasi &amp; Wilayah DIY</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '14px',
            }}
          >
            {QUICK_LINKS.filter((i) => i.category === 'gis').map((item) => (
              <a
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '18px 20px',
                  backgroundColor: '#0a221b',
                  border: '1px solid rgba(213, 168, 100, 0.22)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = '#d5a864';
                  el.style.backgroundColor = '#0d2e24';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 24px rgba(213, 168, 100, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(213, 168, 100, 0.22)';
                  el.style.backgroundColor = '#0a221b';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(213, 168, 100, 0.1)',
                    border: '1px solid rgba(213, 168, 100, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  {item.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>
                      {item.label}
                    </span>
                    {item.metric && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          backgroundColor: 'rgba(213, 168, 100, 0.15)',
                          color: '#d5a864',
                          padding: '1px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {item.metric}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#9ca3af',
                      lineHeight: 1.45,
                    }}
                  >
                    {item.desc}
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#d5a864',
                      marginTop: '8px',
                    }}
                  >
                    <span>Buka Editor</span>
                    <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Card: Workflow & Publishing Info */}
        <div
          style={{
            background: 'linear-gradient(135deg, #09221b 0%, #051410 100%)',
            border: '1px solid rgba(213, 168, 100, 0.3)',
            borderRadius: '20px',
            padding: '24px 28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                Perubahan Aktif Otomatis dalam 60 Detik
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
                Tekan tombol <strong>Publish</strong> hijau pada setiap dokumen. Next.js ISR akan otomatis meng-update halaman publik tanpa perlu deploy ulang.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="https://wa.me/6282137000888"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(213, 168, 100, 0.15)',
                border: '1px solid rgba(213, 168, 100, 0.4)',
                color: '#d5a864',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <span>Hotline Bantuan</span>
              <span>💬</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
