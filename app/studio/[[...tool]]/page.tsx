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

  // Redirect root /studio or /studio/structure → /studio/structure/welcome
  // so the Beranda & Panduan dashboard opens immediately instead of an empty pane
  if (!tool || tool.length === 0 || (tool.length === 1 && tool[0] === 'structure')) {
    redirect('/studio/structure/welcome');
  }

  return <NextStudio config={config} />;
}
