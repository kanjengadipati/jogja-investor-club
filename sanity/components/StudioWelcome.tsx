'use client';

import React from 'react';

interface QuickLinkItem {
  emoji: string;
  label: string;
  desc: string;
  path: string;
  badge?: string;
}

const QUICK_LINKS: QuickLinkItem[] = [
  {
    emoji: '⚙️',
    label: 'Pengaturan Situs',
    desc: 'Nama brand, nomor WhatsApp hotline, alamat, logo & meta',
    path: '/studio/structure/siteSettings',
    badge: 'Utama',
  },
  {
    emoji: '🖼️',
    label: 'Hero Section',
    desc: 'Headline utama, subheadline, teks CTA & foto latar belakang',
    path: '/studio/structure/hero',
    badge: 'Utama',
  },
  {
    emoji: '🏗️',
    label: 'Proyek Selesai',
    desc: 'Kelola portofolio properti, galeri foto, spesifikasi & nilai investasi',
    path: '/studio/structure/project',
  },
  {
    emoji: '💬',
    label: 'Testimoni Klien',
    desc: 'Ulasan investor, rating 5 bintang, foto profil, dan kutipan sukses',
    path: '/studio/structure/testimonial',
  },
  {
    emoji: '❓',
    label: 'FAQ (Pertanyaan Umum)',
    desc: 'Daftar tanya-jawab seputar legalitas tanah, ROI, perizinan PBG & bangun',
    path: '/studio/structure/faq',
  },
  {
    emoji: '🏠',
    label: 'Tipe Properti (Archetypes)',
    desc: 'Konsep Rumah Mewah, Villa Estetik, dan Homestay & Kos Eksklusif',
    path: '/studio/structure/propertyArchetype',
  },
  {
    emoji: '👣',
    label: 'Langkah Proses Kerja',
    desc: '4 tahapan alur kerja JIC dari konsultasi hingga serah terima kunci',
    path: '/studio/structure/processStep',
  },
  {
    emoji: '🗺️',
    label: 'Kawasan Investasi GIS',
    desc: 'Data klaster Sleman, Kota, Bantul, Gunungkidul & Kulon Progo',
    path: '/studio/structure/investmentCluster',
  },
  {
    emoji: '📍',
    label: 'Data Kabupaten / Kota',
    desc: 'Detail harga tanah, NJOP, KDB, regulasi RTRW & yield kawasan',
    path: '/studio/structure/yogyakartaRegion',
  },
  {
    emoji: '👤',
    label: 'Tim & Konsultan',
    desc: 'Profil konsultan, arsitek & analis finansial Jogja Investor Club',
    path: '/studio/structure/teamMember',
  },
];

export default function StudioWelcome() {
  return (
    <div
      style={{
        padding: '36px 40px',
        maxWidth: 960,
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1a221f',
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #071914 0%, #0d2e24 100%)',
          borderRadius: 16,
          padding: '28px 32px',
          color: '#ffffff',
          marginBottom: 28,
          boxShadow: '0 10px 25px -5px rgba(7, 25, 20, 0.25)',
          border: '1px solid rgba(213, 168, 100, 0.3)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img
            src="/images/logo-jic-original.png"
            alt="Jogja Investor Club"
            style={{
              height: 52,
              width: 'auto',
              borderRadius: 8,
              backgroundColor: '#ffffff',
              padding: 4,
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#d5a864',
                  backgroundColor: 'rgba(213, 168, 100, 0.15)',
                  padding: '3px 8px',
                  borderRadius: 6,
                }}
              >
                Content Management System
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Jogja Investor Club Studio
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: 'rgba(255, 255, 255, 0.75)' }}>
              Pusat pengelolaan konten landing page, portofolio proyek, FAQ, dan data spasial GIS.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#d5a864',
              color: '#071914',
              fontSize: 13,
              fontWeight: 700,
              padding: '10px 16px',
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
            }}
          >
            <span>Lihat Website</span>
            <span style={{ fontSize: 14 }}>↗</span>
          </a>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 12,
          padding: '12px 18px',
          marginBottom: 28,
        }}
      >
        <span style={{ fontSize: 18 }}>🟢</span>
        <div style={{ fontSize: 13, color: '#166534', lineHeight: 1.5 }}>
          <strong style={{ fontWeight: 700 }}>Studio Aktif &amp; Terkoneksi:</strong> Setiap perubahan yang Anda <em>Publish</em> di Studio akan terupdate otomatis di website utama dalam <strong>60 detik</strong> (Incremental Static Regeneration).
        </div>
      </div>

      {/* Quick Access Grid Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Akses Cepat Pengelolaan Dokumen
        </h2>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>10 Koleksi Tersedia</span>
      </div>

      {/* Grid of Collections */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 12,
          marginBottom: 36,
        }}
      >
        {QUICK_LINKS.map((item) => (
          <a
            key={item.path}
            href={item.path}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              padding: '16px 18px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = '#d5a864';
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 6px 16px rgba(213, 168, 100, 0.2)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = '#e5e7eb';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: '#fbf9f5',
                border: '1px solid #f1ede4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {item.emoji}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#081c17' }}>
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      backgroundColor: '#fef3c7',
                      color: '#92400e',
                      padding: '1px 5px',
                      borderRadius: 4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: '#6b7280',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.desc}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Practical Guide / Instructions */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 14,
          padding: '22px 26px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#081c17' }}>
            Panduan Singkat Penggunaan Studio
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16,
            fontSize: 12.5,
            color: '#4b5563',
            lineHeight: 1.6,
          }}
        >
          <div style={{ background: '#fbf9f5', padding: '14px 16px', borderRadius: 10 }}>
            <strong style={{ color: '#081c17', display: 'block', marginBottom: 4 }}>
              1. Mengedit Hero &amp; Kontak WhatsApp
            </strong>
            Buka <strong>Pengaturan Situs</strong> untuk mengganti nomor WhatsApp hotline atau alamat kantor, dan <strong>Hero Section</strong> untuk merubah teks pembuka utama.
          </div>

          <div style={{ background: '#fbf9f5', padding: '14px 16px', borderRadius: 10 }}>
            <strong style={{ color: '#081c17', display: 'block', marginBottom: 4 }}>
              2. Menambah Portofolio &amp; Testimoni
            </strong>
            Klik <strong>Proyek Selesai</strong> atau <strong>Testimoni</strong> di sidebar, lalu klik tombol <strong>+ Create</strong> / <strong>New</strong> di kanan atas untuk menambahkan entri baru.
          </div>

          <div style={{ background: '#fbf9f5', padding: '14px 16px', borderRadius: 10 }}>
            <strong style={{ color: '#081c17', display: 'block', marginBottom: 4 }}>
              3. Publikasi &amp; Optimalisasi Gambar
            </strong>
            Pastikan menekan tombol <strong>Publish</strong> hijau di pojok kanan bawah editor agar perubahan tersimpan dan langsung aktif ke website publik.
          </div>
        </div>
      </div>
    </div>
  );
}
