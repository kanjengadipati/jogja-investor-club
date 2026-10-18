import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jogja-investor-club.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/studio'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/studio/', '/studio'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
