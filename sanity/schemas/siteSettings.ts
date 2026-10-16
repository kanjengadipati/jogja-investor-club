import { defineType, defineField } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Pengaturan Situs',
  type: 'document',
  // Singleton — hanya ada satu dokumen ini
  fields: [
    defineField({
      name: 'brandName',
      title: 'Nama Brand',
      type: 'string',
      description: 'Contoh: Jogja Investor',
    }),
    defineField({
      name: 'brandSuffix',
      title: 'Nama Brand (bagian kedua)',
      type: 'string',
      description: 'Contoh: Club',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Nomor WhatsApp',
      type: 'string',
      description: 'Format: 628xxxxxxxxxx (tanpa + atau spasi)',
    }),
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline Footer',
      type: 'string',
    }),
    defineField({
      name: 'defaultWhatsAppMessage',
      title: 'Pesan WhatsApp Default',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'brandName' },
    prepare: ({ title }) => ({ title: `Pengaturan: ${title}` }),
  },
});
