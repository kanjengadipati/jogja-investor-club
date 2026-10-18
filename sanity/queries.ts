import { groq } from 'next-sanity';

export const heroQuery = groq`
  *[_type == "hero"][0] {
    kicker,
    headline,
    headlineAccent,
    subheadline,
    ctaPrimaryText,
    ctaSecondaryText,
    quoteText,
    "backgroundImage": backgroundImage.asset->url,
  }
`;

export const propertyArchetypesQuery = groq`
  *[_type == "propertyArchetype"] | order(order asc) {
    id,
    title,
    subtitle,
    tagline,
    description,
    "image": image.asset->url,
    yieldInfo,
    buildCost,
    minArea,
    features,
  }
`;

export const processStepsQuery = groq`
  *[_type == "processStep"] | order(number asc) {
    number,
    title,
    description,
    icon,
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    brandName,
    brandSuffix,
    whatsappNumber,
    address,
    tagline,
    defaultWhatsAppMessage,
    "logo": logo.asset->url,
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, year desc) {
    title,
    location,
    propertyType,
    year,
    "coverImage": coverImage.asset->url,
    summary,
    description,
    specs,
    "gallery": gallery[].asset->url,
    featured,
    order,
  }
`;

export const investmentClustersQuery = groq`
  *[_type == "investmentCluster"] | order(order asc) {
    clusterId,
    title,
    subtitle,
    badge,
    bestFor,
    priceBadge,
    fullName,
    description,
    priceRange,
    njopPrice,
    growthRate,
    roi,
    targetRegions,
    hotspotKecamatanSlugs,
    order,
  }
`;

export const yogyakartaRegionsQuery = groq`
  *[_type == "yogyakartaRegion"] {
    regionId,
    name,
    fullName,
    recommended,
    landPrice,
    njopPrice,
    njopRangeDetail,
    njopRatio,
    tollAccessDesc,
    rtrwDesc,
    yieldEst,
    occupancy,
    kdb,
    highlights,
    desc,
  }
`;
