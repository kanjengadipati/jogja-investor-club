'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import type { StructureBuilder } from 'sanity/structure';
import StudioWelcome from './sanity/components/StudioWelcome';
import StudioLogo from './sanity/components/StudioLogo';
import StudioNavbar from './sanity/components/StudioNavbar';
import { jicTheme } from './sanity/theme';

// ─── Custom structure with welcome dashboard ──────────────────────────────────
const structure = (S: StructureBuilder) =>
  S.list()
    .title('Jogja Investor Club')
    .items([
      // ── Beranda & Panduan Studio ──────────────────────────────────────────
      S.listItem()
        .title('👋  Beranda & Panduan')
        .id('welcome')
        .child(
          S.component(StudioWelcome)
            .id('welcome-view')
            .title('Beranda & Panduan Studio')
        ),

      S.divider(),

      // ── Singleton sections (hanya satu dokumen) ──────────────────────────
      S.listItem()
        .title('⚙️  Pengaturan Situs')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings-singleton')
            .title('Pengaturan Situs')
        ),

      S.listItem()
        .title('🖼️  Hero Section')
        .id('hero')
        .child(
          S.document()
            .schemaType('hero')
            .documentId('hero-singleton')
            .title('Hero Section')
        ),

      S.divider(),

      // ── Collections ──────────────────────────────────────────────────────
      S.listItem()
        .title('🏠  Tipe Properti (Rumah / Villa / Kos)')
        .id('tipePropertiRumahVillaKos')
        .schemaType('propertyArchetype')
        .child(S.documentTypeList('propertyArchetype').title('Tipe Properti')),

      S.listItem()
        .title('👣  Langkah Proses Kerja')
        .id('langkahProsesKerja')
        .schemaType('processStep')
        .child(S.documentTypeList('processStep').title('Langkah Proses').defaultOrdering([{ field: 'number', direction: 'asc' }])),

      S.listItem()
        .title('🏗️  Proyek Selesai')
        .id('proyekSelesai')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Proyek Selesai').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.divider(),

      S.listItem()
        .title('💬  Testimoni')
        .id('testimoni')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimoni').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.listItem()
        .title('❓  FAQ (Pertanyaan Umum)')
        .id('faqPertanyaanUmum')
        .schemaType('faq')
        .child(S.documentTypeList('faq').title('FAQ').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.listItem()
        .title('👤  Tim & Konsultan')
        .id('timKonsultan')
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember').title('Tim & Konsultan').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.divider(),

      S.listItem()
        .title('🗺️  Kawasan Investasi (GIS Clusters)')
        .id('kawasanInvestasiGISClusters')
        .schemaType('investmentCluster')
        .child(S.documentTypeList('investmentCluster').title('Kawasan Investasi').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.listItem()
        .title('📍  Kabupaten/Kota Yogyakarta (Data GIS)')
        .id('kabupatenKotaYogyakartaDataGIS')
        .schemaType('yogyakartaRegion')
        .child(S.documentTypeList('yogyakartaRegion').title('Kabupaten/Kota')),
    ]);

export default defineConfig({
  name: 'jogja-investor-club',
  title: 'Jogja Investor Club',
  projectId: 'fxrpr0tm',
  dataset: 'production',
  theme: jicTheme,
  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode: (S) =>
        S.document().views([S.view.form()]),
    }),
  ],
  tools: (prev) => [
    {
      name: 'dashboard',
      title: 'Beranda & Panduan',
      component: StudioWelcome,
    },
    ...prev,
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
});
