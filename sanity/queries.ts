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
    showSectionHero,
    showSectionPropertyArchetypes,
    showSectionStrategicAreas,
    showSectionProcessSteps,
    showSectionProjects,
    showSectionTestimonials,
    showSectionFAQ,
    showSectionCalculator,
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

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    name,
    role,
    "avatar": avatar.asset->url,
    quote,
    rating,
    propertyType,
    featured,
    order
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    question,
    answer,
    category,
    order
  }
`;
