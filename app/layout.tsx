import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jogja-investor-club.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Jogja Investor Club (JIC) — Investasi Properti Cerdas di Yogyakarta',
    template: '%s | Jogja Investor Club',
  },

  description:
    'Jogja Investor Club (JIC): ubah tanah kosong di Yogyakarta menjadi Rumah, Villa, atau Kos Eksklusif bernilai tinggi. Estimasi ROI gratis, analisis GIS presisi, dan pendampingan bangun profesional.',

  keywords: [
    'investasi properti Jogja',
    'investasi properti Yogyakarta',
    'jual beli tanah Yogyakarta',
    'bangun villa Jogja',
    'bangun kos Jogja',
    'bangun rumah Yogyakarta',
    'konsultan properti Jogja',
    'ROI properti Yogyakarta',
    'Jogja Investor Club',
    'JIC',
    'passive income properti',
    'kos eksklusif kampus UGM',
  ],

  authors: [{ name: 'Jogja Investor Club', url: SITE_URL }],
  creator: 'Jogja Investor Club',
  publisher: 'Jogja Investor Club',

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Jogja Investor Club',
    title: 'Jogja Investor Club (JIC) — Investasi Properti Cerdas di Yogyakarta',
    description:
      'Bergabunglah dengan jaringan investor properti eksklusif di Yogyakarta. Akses deal terkurasi, analisis GIS presisi, dan pendampingan penuh — dari lahan hingga passive income.',
    locale: 'id_ID',
    images: [
      {
        url: '/images/hero_jogja_landscape_1792108229283.jpg',
        width: 1200,
        height: 630,
        alt: 'Jogja Investor Club — Investasi Properti di Yogyakarta',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Jogja Investor Club (JIC) — Investasi Properti Cerdas di Yogyakarta',
    description:
      'Bergabunglah dengan jaringan investor properti eksklusif di Yogyakarta. Akses deal terkurasi, analisis GIS presisi, dan pendampingan penuh.',
    images: ['/images/hero_jogja_landscape_1792108229283.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
