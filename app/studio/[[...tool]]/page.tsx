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

  // When opening /studio/structure without a specific document, redirect to welcome view
  if (tool && tool.length === 1 && tool[0] === 'structure') {
    redirect('/studio/structure/welcome');
  }

  return <NextStudio config={config} />;
}
