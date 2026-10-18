import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jogja-investor-club.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${SITE_URL}/images/hero_jogja_landscape_1792108229283.jpg`,
        `${SITE_URL}/images/logo-jic-original.png`,
      ],
    },
  ];
}
