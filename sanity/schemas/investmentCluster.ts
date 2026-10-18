import { defineType, defineField } from 'sanity';

const REGION_OPTIONS = [
  { title: 'Sleman', value: 'sleman' },
  { title: 'Kota Yogyakarta', value: 'kota' },
  { title: 'Bantul', value: 'bantul' },
  { title: 'Gunungkidul', value: 'gunungkidul' },
  { title: 'Kulon Progo', value: 'kulonprogo' },
  { title: 'Semua', value: 'semua' },
];

export const investmentClusterSchema = defineType({
  name: 'investmentCluster',
  title: 'Kawasan Investasi (GIS Clusters)',
  type: 'document',
  fields: [
    defineField({
      name: 'clusterId',
      title: 'ID Cluster',
      type: 'string',
      description: 'ID unik, huruf kecil tanpa spasi. Contoh: kampus, wisata, premium',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Judul Singkat',
      type: 'string',
      description: 'Contoh: "Kawasan Kampus"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Contoh: "UGM, UNY, Seturan, UPN, UII, UMY"',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Contoh: "🔥 Hot Demand"',
    }),
    defineField({
      name: 'bestFor',
      title: 'Cocok untuk',
      type: 'string',
      description: 'Contoh: "Kost Eksklusif & Co-Living"',
    }),
    defineField({
      name: 'priceBadge',
      title: 'Label Harga Pasar Ringkas',
      type: 'string',
      description: 'Contoh: "Pasar Rp 5,5 - 16 jt/m²"',
    }),
    defineField({
      name: 'fullName',
      title: 'Nama Lengkap (untuk kalkulator)',
      type: 'string',
      description: 'Digunakan sebagai label di kalkulator dan analitik',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'priceRange',
      title: 'Range Harga Pasar',
      type: 'string',
      description: 'Contoh: "Rp 5,5 - 16 jt/m²"',
    }),
    defineField({
      name: 'njopPrice',
      title: 'Range NJOP Resmi (PBB-P2)',
      type: 'string',
      description: 'Contoh: "Rp 3,5 - 14 jt/m²"',
    }),
    defineField({
      name: 'growthRate',
      title: 'Estimasi Pertumbuhan Harga / Tahun',
      type: 'string',
      description: 'Contoh: "+11% - 16%"',
    }),
    defineField({
      name: 'roi',
      title: 'Estimasi ROI / Tahun',
      type: 'string',
      description: 'Contoh: "12% - 18% / tahun"',
    }),
    defineField({
      name: 'targetRegions',
      title: 'Kabupaten/Kota yang Di-highlight',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: REGION_OPTIONS,
        layout: 'grid',
      },
      description: 'Pilih kabupaten/kota yang di-highlight di peta level makro',
    }),
    defineField({
      name: 'hotspotKecamatanSlugs',
      title: 'Kecamatan Hotspot (slug)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Slug kecamatan untuk highlight mikro di peta. Pisahkan per item. Lihat daftar slug di investmentClusters.ts',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Urutan di panel kiri GIS (0 = pertama)',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'priceBadge' },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
  orderings: [
    { title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
