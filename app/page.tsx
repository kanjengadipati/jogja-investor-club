import { client } from '../sanity/client';
import {
  heroQuery,
  propertyArchetypesQuery,
  processStepsQuery,
  siteSettingsQuery,
} from '../sanity/queries';
import PageClient from '../src/components/PageClient';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all Sanity data in parallel
  const [heroData, archetypes, processSteps, siteSettings] = await Promise.all([
    client.fetch(heroQuery).catch(() => null),
    client.fetch(propertyArchetypesQuery).catch(() => []),
    client.fetch(processStepsQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  return (
    <PageClient
      heroData={heroData}
      archetypes={archetypes ?? []}
      processSteps={processSteps ?? []}
      siteSettings={siteSettings}
    />
  );
}
