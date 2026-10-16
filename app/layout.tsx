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
  title: 'Punya Tanah di Jogja? Wujudkan Menjadi Properti Bernilai',
  description:
    'Ubah tanah kosong di Yogyakarta menjadi Rumah, Villa, atau Kos Eksklusif bernilai tinggi. Dapatkan estimasi RAB & ROI gratis serta pendampingan bangun profesional.',
  openGraph: {
    title: 'Punya Tanah di Jogja? Wujudkan Menjadi Properti Bernilai',
    description:
      'Kalkulator potensi tanah dan konsultasi bangun Rumah, Villa, dan Kos Eksklusif di Jogja dengan biaya transparan dan hasil berkualitas.',
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
