import { client } from '../sanity/client';
import {
  heroQuery,
  propertyArchetypesQuery,
  processStepsQuery,
  siteSettingsQuery,
  projectsQuery,
  investmentClustersQuery,
  yogyakartaRegionsQuery,
  testimonialsQuery,
  faqsQuery,
} from '../sanity/queries';
import PageClient from '../src/components/PageClient';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  const [
    heroData,
    archetypes,
    processSteps,
    siteSettings,
    projects,
    investmentClusters,
    yogyakartaRegions,
    testimonials,
    faqs,
  ] = await Promise.all([
    client.fetch(heroQuery).catch(() => null),
    client.fetch(propertyArchetypesQuery).catch(() => []),
    client.fetch(processStepsQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => null),
    client.fetch(projectsQuery).catch(() => []),
    client.fetch(investmentClustersQuery).catch(() => []),
    client.fetch(yogyakartaRegionsQuery).catch(() => []),
    client.fetch(testimonialsQuery).catch(() => []),
    client.fetch(faqsQuery).catch(() => []),
  ]);

  return (
    <PageClient
      heroData={heroData}
      archetypes={archetypes ?? []}
      processSteps={processSteps ?? []}
      siteSettings={siteSettings}
      projects={projects ?? []}
      investmentClusters={investmentClusters ?? []}
      yogyakartaRegions={yogyakartaRegions ?? []}
      testimonials={testimonials ?? []}
      faqs={faqs ?? []}
    />
  );
}
