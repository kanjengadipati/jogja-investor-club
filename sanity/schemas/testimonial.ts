import { defineType, defineField } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimoni',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'role',
      title: 'Profesi / Keterangan',
      type: 'string',
      description: 'Contoh: "Investor Properti, Jakarta" atau "Pemilik Villa Seturan"',
    }),
    defineField({
      name: 'avatar',
      title: 'Foto Profil',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quote',
      title: 'Testimoni',
      type: 'text',
      rows: 4,
      validation: (R) => R.required().max(500),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: (R) => R.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'propertyType',
      title: 'Tipe Properti',
      type: 'string',
      options: {
        list: ['Rumah', 'Villa', 'Homestay & Kos', 'Lainnya'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Tampilkan sebagai Unggulan?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'avatar' },
  },
  orderings: [
    { title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
