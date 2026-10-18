import { defineType, defineField } from 'sanity';

export const faqSchema = defineType({
  name: 'faq',
  title: 'FAQ (Pertanyaan Umum)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pertanyaan',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Jawaban',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Umum', value: 'umum' },
          { title: 'Investasi', value: 'investasi' },
          { title: 'Proses Bangun', value: 'proses' },
          { title: 'Legalitas', value: 'legalitas' },
          { title: 'Pembiayaan', value: 'pembiayaan' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'umum',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
  orderings: [
    { title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
