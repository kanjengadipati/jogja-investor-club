import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function StudioPage({
  params,
}: {
  params: Promise<{ tool?: string[] }>;
}) {
  const resolvedParams = await params;
  const tool = resolvedParams?.tool;

  // Redirect root /studio → /studio/structure so sidebar is always visible
  if (!tool || tool.length === 0) {
    redirect('/studio/structure');
  }

  return <NextStudio config={config} />;
}
