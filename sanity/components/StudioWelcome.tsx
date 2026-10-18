'use client';

import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuickLinkItem {
  emoji: string;
  label: string;
  desc: string;
  path: string;
  category: 'utama' | 'trust' | 'gis';
  badge?: string;
  badgeColor?: 'gold' | 'green' | 'blue';
  img: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const QUICK_LINKS: QuickLinkItem[] = [
  // Utama
  {
    emoji: '⚙️',
    label: 'Pengaturan Situs',
    desc: 'Nama brand, nomor WhatsApp hotline, alamat, logo & default pesan chat',
    path: '/studio/structure/siteSettings',
    category: 'utama',
    badge: 'Singleton',
    badgeColor: 'gold',
    img: '/studio-assets/thumb-settings.jpg',
  },
  {
    emoji: '🖼️',
    label: 'Hero Section',
    desc: 'Headline utama, subheadline, teks tombol CTA & foto latar belakang lanskap Jogja',
    path: '/studio/structure/hero',
    category: 'utama',
    badge: 'Singleton',
    badgeColor: 'gold',
    img: '/studio-assets/thumb-hero.jpg',
  },
  {
    emoji: '🏗️',
    label: 'Proyek Selesai (Portofolio)',
    desc: 'Kelola proyek terbangun, galeri foto arsitektur, spesifikasi teknis, luas tanah & ROI',
    path: '/studio/structure/proyekSelesai',
    category: 'utama',
    img: '/studio-assets/thumb-portfolio.jpg',
  },
  {
    emoji: '🏠',
    label: 'Tipe Properti (Archetypes)',
    desc: 'Konsep Rumah Tropis Modern, Villa Mewah Staycation, dan Homestay & Kos Eksklusif',
    path: '/studio/structure/tipePropertiRumahVillaKos',
    category: 'utama',
    img: '/studio-assets/thumb-archetype.jpg',
  },
  {
    emoji: '👣',
    label: 'Langkah Proses Kerja',
    desc: '4 tahapan kerja JIC: Konsultasi Awal, Analisis Potensi, Desain, hingga Serah Terima Kunci',
    path: '/studio/structure/langkahProsesKerja',
    category: 'utama',
    img: '/studio-assets/thumb-process.jpg',
  },

  // Trust & Edukasi
  {
    emoji: '💬',
    label: 'Testimoni Mitra & Investor',
    desc: 'Ulasan pemilik lahan & investor, rating 5 bintang, badge verifikasi, yield & kutipan nyata',
    path: '/studio/structure/testimoni',
    category: 'trust',
    badge: 'Social Proof',
    badgeColor: 'green',
    img: '/studio-assets/thumb-archetype.jpg',
  },
  {
    emoji: '❓',
    label: 'FAQ (Pertanyaan Umum)',
    desc: 'Tanya jawab seputar legalitas SHM Waris, izin PBG/RTRW DIY, estimasi ROI & pembiayaan KSO',
    path: '/studio/structure/faqPertanyaanUmum',
    category: 'trust',
    badge: 'Edukasi',
    badgeColor: 'blue',
    img: '/studio-assets/thumb-settings.jpg',
  },
  {
    emoji: '👤',
    label: 'Tim & Konsultan Ahli',
    desc: 'Profil Principal Architect, Lead Financial Analyst, Notaris Agraria & Head of Construction',
    path: '/studio/structure/timKonsultan',
    category: 'trust',
    img: '/studio-assets/thumb-process.jpg',
  },

  // GIS Data
  {
    emoji: '🗺️',
    label: 'Kawasan Investasi GIS',
    desc: 'Klaster strategis Sleman Kampus, Wisata Merapi, Heritage Kota, Tol YIA & Koridor Kulon Progo',
    path: '/studio/structure/kawasanInvestasiGISClusters',
    category: 'gis',
    badge: 'GIS Spasial',
    badgeColor: 'gold',
    img: '/studio-assets/thumb-portfolio.jpg',
  },
  {
    emoji: '📍',
    label: 'Kabupaten & Kota Yogyakarta',
    desc: 'Parameter harga tanah, rasio NJOP, KDB, regulasi tata ruang RTRW & okupansi tiap daerah',
    path: '/studio/structure/kabupatenKotaYogyakartaDataGIS',
    category: 'gis',
    badge: 'Data Regional',
    badgeColor: 'blue',
    img: '/studio-assets/thumb-hero.jpg',
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const css = {
  root: {
    backgroundColor: '#faf8f4',
    minHeight: '100vh',
    color: '#1a1714',
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '32px 28px 64px',
    boxSizing: 'border-box' as const,
    overflowX: 'hidden' as const,
  },
  inner: {
    maxWidth: 1080,
    margin: '0 auto',
  },

  // ── Hero banner ────────────────────────────────────────────────────────────
  hero: {
    position: 'relative' as const,
    borderRadius: 20,
    overflow: 'hidden' as const,
    marginBottom: 28,
    minHeight: 300,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'flex-end' as const,
  },
  heroBg: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: 'url(/studio-assets/hero-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    filter: 'sepia(0.3) brightness(0.72)',
  },
  heroOverlay: {
    position: 'absolute' as const,
    inset: 0,
    background:
      'linear-gradient(to right, rgba(10,6,4,0.82) 0%, rgba(10,6,4,0.45) 60%, transparent 100%)',
  },
  heroContent: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '36px 40px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 12px',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.25)',
    color: '#e8d5b0',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    marginBottom: 14,
  },
  heroTitle: {
    margin: '0 0 4px',
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
    color: '#ffffff',
  },
  heroTitleAccent: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontStyle: 'italic' as const,
    fontWeight: 400,
    color: '#d5a864',
    display: 'block' as const,
  },
  heroDesc: {
    margin: '12px 0 20px',
    fontSize: 13.5,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.6,
    maxWidth: 480,
  },
  heroCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '11px 22px',
    borderRadius: 12,
    backgroundColor: '#d5a864',
    color: '#1a0f02',
    fontWeight: 800,
    fontSize: 13,
    textDecoration: 'none',
    boxShadow: '0 4px 16px rgba(213,168,100,0.4)',
    cursor: 'pointer',
  },

  // ── Metrics ribbon ─────────────────────────────────────────────────────────
  metrics: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 1,
    backgroundColor: '#e8e2d8',
    borderRadius: 16,
    overflow: 'hidden' as const,
    marginBottom: 28,
    border: '1px solid #e8e2d8',
  },
  metricCell: {
    backgroundColor: '#ffffff',
    padding: '18px 20px',
    display: 'flex' as const,
    alignItems: 'center',
    gap: 12,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fdf5e8',
    border: '1px solid #f0ddb0',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    flexShrink: 0,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 900,
    color: '#1a1714',
    lineHeight: 1,
  },
  metricLabel: {
    fontSize: 11,
    color: '#8a7f72',
    marginTop: 3,
    lineHeight: 1.3,
  },

  // ── Section header ─────────────────────────────────────────────────────────
  sectionHeader: {
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingLeft: 14,
    borderLeft: '3px solid #c8a462',
  },
  sectionTitle: {
    margin: 0,
    fontSize: 13,
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#1a1714',
  },
  sectionSub: {
    fontSize: 11,
    color: '#9a9086',
    cursor: 'pointer',
    textDecoration: 'none',
  },

  // ── Card grid ──────────────────────────────────────────────────────────────
  cardGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 12,
    marginBottom: 28,
  },
  card: {
    display: 'flex' as const,
    backgroundColor: '#ffffff',
    border: '1px solid #ede7dd',
    borderRadius: 14,
    overflow: 'hidden' as const,
    textDecoration: 'none',
    transition: 'all 0.18s ease',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    cursor: 'pointer',
  },
  cardImg: {
    width: 110,
    flexShrink: 0,
    objectFit: 'cover' as const,
    display: 'block' as const,
  },
  cardBody: {
    padding: '14px 16px',
    flex: 1,
    minWidth: 0,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },
  cardTop: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    flexWrap: 'wrap' as const,
  },
  cardLabel: {
    fontSize: 13.5,
    fontWeight: 700,
    color: '#1a1714',
  },
  cardDesc: {
    margin: 0,
    fontSize: 11.5,
    color: '#7a7068',
    lineHeight: 1.45,
    flexGrow: 1,
  },
  cardCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    fontWeight: 700,
    color: '#b8892a',
    marginTop: 8,
  },

  // ── Footer bar ─────────────────────────────────────────────────────────────
  footerBar: {
    display: 'flex' as const,
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    backgroundColor: '#1a1714',
    borderRadius: 16,
    padding: '16px 24px',
  },
  footerLeft: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: 12,
  },
  footerIcon: {
    fontSize: 20,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#ffffff',
  },
  footerSub: {
    margin: '2px 0 0',
    fontSize: 11.5,
    color: '#8a8078',
    lineHeight: 1.45,
  },
  footerBtn: {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    gap: 6,
    padding: '9px 18px',
    borderRadius: 10,
    backgroundColor: '#d5a864',
    color: '#1a0f02',
    fontSize: 12,
    fontWeight: 800,
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(213,168,100,0.35)',
  },
} as const;

// ─── Badge helpers ────────────────────────────────────────────────────────────

function Badge({ label, color }: { label: string; color?: 'gold' | 'green' | 'blue' }) {
  const map = {
    gold: { bg: 'rgba(213,168,100,0.14)', text: '#9a6a1a', border: 'rgba(213,168,100,0.4)' },
    green: { bg: 'rgba(22,163,74,0.1)', text: '#166534', border: 'rgba(22,163,74,0.3)' },
    blue: { bg: 'rgba(59,130,246,0.1)', text: '#1d4ed8', border: 'rgba(59,130,246,0.3)' },
  };
  const s = map[color ?? 'gold'];
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 800,
        backgroundColor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        padding: '1px 6px',
        borderRadius: 4,
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {label}
    </span>
  );
}

// ─── Card component ───────────────────────────────────────────────────────────

function QuickCard({ item }: { item: QuickLinkItem }) {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(-2px)';
    el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
    el.style.borderColor = '#c8a462';
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(0)';
    el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
    el.style.borderColor = '#ede7dd';
  };

  return (
    <a
      href={item.path}
      style={css.card}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Thumbnail */}
      <img
        src={item.img}
        alt={item.label}
        style={css.cardImg}
      />

      {/* Body */}
      <div style={css.cardBody}>
        <div>
          <div style={css.cardTop}>
            <span style={{ fontSize: 15 }}>{item.emoji}</span>
            <span style={css.cardLabel}>{item.label}</span>
            {item.badge && (
              <Badge label={item.badge} color={item.badgeColor} />
            )}
          </div>
          <p style={css.cardDesc}>{item.desc}</p>
        </div>
        <div style={css.cardCta}>
          <span>Buka Editor</span>
          <span>→</span>
        </div>
      </div>
    </a>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  sub,
  category,
}: {
  title: string;
  sub: string;
  category: 'utama' | 'trust' | 'gis';
}) {
  const items = QUICK_LINKS.filter((i) => i.category === category);
  return (
    <div>
      <div style={css.sectionHeader}>
        <h2 style={css.sectionTitle}>{title}</h2>
        <span style={css.sectionSub}>{sub} &nbsp;→</span>
      </div>
      <div style={css.cardGrid}>
        {items.map((item) => (
          <QuickCard key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StudioWelcome() {
  return (
    <div style={css.root}>
      <div style={css.inner}>

        {/* ── Hero Banner ─────────────────────────────────────────────────── */}
        <div style={css.hero}>
          <div style={css.heroBg} />
          <div style={css.heroOverlay} />
          <div style={css.heroContent}>
            <div style={css.heroBadge}>
              <span>🏛️</span>
              <span>Jogja Investor Club · Private CMS</span>
            </div>
            <h1 style={css.heroTitle}>
              Pusat Kontrol
              <span style={css.heroTitleAccent}>Investasi &amp; Konten</span>
            </h1>
            <p style={css.heroDesc}>
              Kelola seluruh elemen situs landing page, analisis GIS wilayah Yogyakarta,
              studi kelayakan properti, testimoni mitra terverifikasi, dan tanya-jawab legalitas
              dalam satu dasbor terpadu.
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={css.heroCta}
            >
              <span>Buka Website Live</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* ── Metrics Ribbon ──────────────────────────────────────────────── */}
        <div style={css.metrics}>
          {[
            { icon: '📈', value: '40+ Proyek', label: 'Portofolio Selesai & Berjalan' },
            { icon: '💰', value: '14% – 21%', label: 'Estimasi Yield Sewa Tahunan' },
            { icon: '🛡️', value: '100% Notarili', label: 'Garansi Legalitas & Sertifikat' },
            { icon: '📦', value: '10 Modul', label: 'Siap Dikelola Tanpa Koding' },
          ].map((m) => (
            <div key={m.value} style={css.metricCell}>
              <div style={css.metricIcon}>{m.icon}</div>
              <div>
                <div style={css.metricValue}>{m.value}</div>
                <div style={css.metricLabel}>{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Sections ────────────────────────────────────────────────────── */}
        <Section
          title="Konten Utama & Penawaran"
          sub="Hero, Portofolio & Alur Layanan"
          category="utama"
        />

        <Section
          title="Kepercayaan & Edukasi"
          sub="Testimoni, FAQ & Tim Ahli"
          category="trust"
        />

        <Section
          title="Data Spasial & Riset Kawasan GIS"
          sub="Klaster Investasi & Wilayah DIY"
          category="gis"
        />

        {/* ── Footer bar ──────────────────────────────────────────────────── */}
        <div style={css.footerBar}>
          <div style={css.footerLeft}>
            <span style={css.footerIcon}>⚡</span>
            <div>
              <div style={css.footerTitle}>Perubahan Aktif Otomatis dalam 60 Detik</div>
              <p style={css.footerSub}>
                Tekan tombol <strong style={{ color: '#d5a864' }}>Publish</strong> hijau pada setiap dokumen.
                Next.js ISR akan otomatis meng-update halaman publik tanpa perlu deploy ulang.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/6282137000888"
            target="_blank"
            rel="noopener noreferrer"
            style={css.footerBtn}
          >
            <span>Hotline Bantuan</span>
            <span>💬</span>
          </a>
        </div>

      </div>
    </div>
  );
}
