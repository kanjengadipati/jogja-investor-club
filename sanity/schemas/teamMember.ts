import { defineType, defineField } from 'sanity';

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Tim & Konsultan',
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
      title: 'Jabatan / Peran',
      type: 'string',
      description: 'Contoh: "Lead Konsultan Properti" atau "Arsitek Senior"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio Singkat',
      type: 'text',
      rows: 3,
      description: 'Deskripsi singkat pengalaman dan keahlian.',
    }),
    defineField({
      name: 'expertise',
      title: 'Keahlian',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Contoh: ["GIS Analysis", "Property Valuation", "Syariah Finance"]',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Nomor WhatsApp',
      type: 'string',
      description: 'Format: 628xxxxxxxxxx',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
  orderings: [
    { title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
