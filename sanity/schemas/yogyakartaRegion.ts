import { defineType, defineField } from 'sanity';

export const yogyakartaRegionSchema = defineType({
  name: 'yogyakartaRegion',
  title: 'Kabupaten/Kota Yogyakarta (Data GIS)',
  type: 'document',
  fields: [
    defineField({
      name: 'regionId',
      title: 'ID Region',
      type: 'string',
      description: 'ID unik: sleman | kota | bantul | gunungkidul | kulonprogo | semua',
      validation: (R) => R.required(),
      options: {
        list: [
          { title: 'Sleman', value: 'sleman' },
          { title: 'Kota Yogyakarta', value: 'kota' },
          { title: 'Bantul', value: 'bantul' },
          { title: 'Gunungkidul', value: 'gunungkidul' },
          { title: 'Kulon Progo', value: 'kulonprogo' },
          { title: 'Semua DIY', value: 'semua' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'name',
      title: 'Nama Singkat',
      type: 'string',
      description: 'Contoh: "Sleman"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Nama Lengkap',
      type: 'string',
      description: 'Contoh: "Kabupaten Sleman (Kawasan Kampus & Wisata Kaliurang)"',
    }),
    defineField({
      name: 'recommended',
      title: 'Rekomendasi Properti',
      type: 'string',
      description: 'Contoh: "Kos Eksklusif, Co-Living Mahasiswa & Villa Kaliurang"',
    }),
    defineField({
      name: 'landPrice',
      title: 'Harga Tanah Pasar',
      type: 'string',
      description: 'Contoh: "Rp 5,5 Jt - 16 Jt / m²"',
    }),
    defineField({
      name: 'njopPrice',
      title: 'Range NJOP Resmi',
      type: 'string',
      description: 'Contoh: "Rp 3,5 Jt - 14 Jt / m²"',
    }),
    defineField({
      name: 'njopRangeDetail',
      title: 'Detail NJOP per Sub-area',
      type: 'text',
      rows: 2,
      description: 'Contoh: "Depok/Seturan: Rp 8-14 Jt | Jakal/Ngaglik: Rp 5-10 Jt"',
    }),
    defineField({
      name: 'njopRatio',
      title: 'Rasio NJOP vs Harga Pasar',
      type: 'string',
      description: 'Contoh: "~60% - 75% dari harga pasar"',
    }),
    defineField({
      name: 'tollAccessDesc',
      title: 'Akses Tol',
      type: 'string',
      description: 'Contoh: "Koneksi Langsung 5 Exit Tol (Purwomartani, Maguwo, Monjali ...)"',
    }),
    defineField({
      name: 'rtrwDesc',
      title: 'Keterangan Zonasi RTRW',
      type: 'string',
      description: 'Contoh: "Zona Pendidikan Tinggi, Agrowisata Merapi & Hunian Komersial Vertikal"',
    }),
    defineField({
      name: 'yieldEst',
      title: 'Estimasi Yield / ROI',
      type: 'string',
      description: 'Contoh: "14% - 19% / tahun"',
    }),
    defineField({
      name: 'occupancy',
      title: 'Tingkat Hunian',
      type: 'string',
      description: 'Contoh: "94% - 98%"',
    }),
    defineField({
      name: 'kdb',
      title: 'KDB & Batasan Bangunan',
      type: 'string',
      description: 'Contoh: "KDB 60% · Maksimal 3-4 Lantai"',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights (3 poin kunci)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Contoh: ["Kampus UGM & UNY", "Kawasan Seturan & Jakal", "Wisata Kaliurang"]',
    }),
    defineField({
      name: 'desc',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'landPrice' },
  },
});
