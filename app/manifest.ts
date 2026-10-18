import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jogja Investor Club (JIC)',
    short_name: 'JIC',
    description:
      'Investasi Properti Cerdas di Yogyakarta: ubah tanah kosong menjadi Rumah, Villa, atau Kos Eksklusif bernilai tinggi dengan estimasi ROI presisi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071914',
    theme_color: '#071914',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
