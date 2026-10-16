import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jogja Investor Club (JIC) — Wujudkan Tanah Anda Menjadi Properti Bernilai',
  description:
    'Jogja Investor Club (JIC): ubah tanah kosong di Yogyakarta menjadi Rumah, Villa, atau Kos Eksklusif bernilai tinggi. Dapatkan estimasi RAB & ROI gratis serta pendampingan bangun profesional.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  openGraph: {
    title: 'Jogja Investor Club (JIC) — Wujudkan Tanah Anda Menjadi Properti Bernilai',
    description:
      'Kalkulator potensi tanah dan konsultasi bangun Rumah, Villa, dan Kos Eksklusif di Jogja bersama Jogja Investor Club.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`scroll-smooth ${playfairDisplay.variable} ${plusJakartaSans.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* Leaflet CSS — loaded globally so it's available for dynamically imported map components */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
