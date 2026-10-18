import { defineType, defineField } from 'sanity';

export const projectSchema = defineType({
  name: 'project',
  title: 'Proyek Selesai',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Proyek',
      type: 'string',
      description: 'Contoh: "Villa Eksklusif Bukit Sedayu"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokasi',
      type: 'string',
      description: 'Contoh: "Sleman, Yogyakarta"',
    }),
    defineField({
      name: 'propertyType',
      title: 'Tipe Properti',
      type: 'string',
      description: 'Contoh: "Villa" / "Rumah" / "Homestay & Kos"',
      options: {
        list: ['Rumah', 'Villa', 'Homestay & Kos', 'Lainnya'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'year',
      title: 'Tahun Selesai',
      type: 'number',
      description: 'Contoh: 2024',
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto Utama (Cover)',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Ringkasan Proyek',
      type: 'text',
      rows: 3,
      description: 'Deskripsi singkat 1-3 kalimat tentang proyek ini.',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Lengkap',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detail lengkap proyek (mendukung rich text).',
    }),
    defineField({
      name: 'specs',
      title: 'Spesifikasi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Contoh: "Luas Tanah" / "Nilai Investasi" / "ROI"',
            }),
            defineField({
              name: 'value',
              title: 'Nilai',
              type: 'string',
              description: 'Contoh: "300 m²" / "Rp 2.5 M" / "18% / tahun"',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
      description: 'Daftar spesifikasi proyek (key-value pairs).',
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri Foto',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Galeri foto proyek (bisa multiple).',
      validation: (R) => R.min(1).max(20),
    }),
    defineField({
      name: 'featured',
      title: 'Tampilkan sebagai Proyek Unggulan?',
      type: 'boolean',
      description: 'Centang untuk menampilkan badge "Unggulan".',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Nomor lebih kecil tampil lebih dulu.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Urutan',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
