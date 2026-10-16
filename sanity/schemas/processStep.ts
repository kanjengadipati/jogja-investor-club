import { defineType, defineField } from 'sanity';

export const processStepSchema = defineType({
  name: 'processStep',
  title: 'Langkah Proses',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Nomor Langkah',
      type: 'number',
      validation: (R) => R.required().min(1).max(10),
    }),
    defineField({
      name: 'title',
      title: 'Judul Langkah',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Pilih: Users / Search / PenTool / Home / Star / Check',
      options: {
        list: [
          { title: 'Users (Orang)', value: 'Users' },
          { title: 'Search (Kaca Pembesar)', value: 'Search' },
          { title: 'PenTool (Desain)', value: 'PenTool' },
          { title: 'Home (Rumah)', value: 'Home' },
          { title: 'Star (Bintang)', value: 'Star' },
          { title: 'Check (Centang)', value: 'Check' },
        ],
        layout: 'dropdown',
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'number' },
    prepare: ({ title, subtitle }) => ({ title: `${subtitle}. ${title}` }),
  },
  orderings: [
    { title: 'Nomor Urut', name: 'numberAsc', by: [{ field: 'number', direction: 'asc' }] },
  ],
});
