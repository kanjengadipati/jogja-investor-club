import { defineType, defineField } from 'sanity';

export const propertyArchetypeSchema = defineType({
  name: 'propertyArchetype',
  title: 'Tipe Properti (Rumah / Villa / Kos)',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Gunakan: rumah / villa / kos',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Nama Tipe',
      type: 'string',
      description: 'Contoh: RUMAH',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'yieldInfo',
      title: 'Info Yield / ROI',
      type: 'string',
      description: 'Contoh: "ROI 15–22% / tahun"',
    }),
    defineField({
      name: 'buildCost',
      title: 'Biaya Bangun per m²',
      type: 'string',
      description: 'Contoh: "Rp 6.2 Jt / m²"',
    }),
    defineField({
      name: 'minArea',
      title: 'Luas Minimum',
      type: 'string',
      description: 'Contoh: "180 m²"',
    }),
    defineField({
      name: 'features',
      title: 'Fitur-fitur',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
  },
  orderings: [
    { title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
