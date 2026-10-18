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

  // Always redirect root /studio and /studio/structure to /studio/structure/welcome
  // so the sidebar menu is ALWAYS visible alongside the dashboard
  if (!tool || tool.length === 0 || (tool.length === 1 && tool[0] === 'structure')) {
    redirect('/studio/structure/welcome');
  }

  return <NextStudio config={config} />;
}
