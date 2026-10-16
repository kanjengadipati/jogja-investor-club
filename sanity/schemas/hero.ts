import { defineType, defineField } from 'sanity';

export const heroSchema = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker Text (atas judul)',
      type: 'string',
      description: 'Contoh: "Jogja Investor Club"',
    }),
    defineField({
      name: 'headline',
      title: 'Judul Utama',
      type: 'string',
      description: 'Contoh: "Punya Tanah di"',
    }),
    defineField({
      name: 'headlineAccent',
      title: 'Judul Aksen (italic emas)',
      type: 'string',
      description: 'Contoh: "Jogja?"',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subjudul',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaPrimaryText',
      title: 'Tombol CTA Utama',
      type: 'string',
      description: 'Contoh: "Konsultasi Awal Gratis"',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Tombol CTA Sekunder',
      type: 'string',
      description: 'Contoh: "Lihat Potensi Tanah"',
    }),
    defineField({
      name: 'quoteText',
      title: 'Kutipan (pojok kanan bawah)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Foto Background Hero',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare: ({ title }) => ({ title: `Hero: ${title}` }),
  },
});
