import { CalculationResult, LeadFormData, PropertyType } from '../types/property';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortRupiah(amount: number): string {
  if (amount >= 1000000000) {
    const milyar = (amount / 1000000000).toFixed(1);
    return `Rp ${milyar.replace('.0', '')} Miliar`;
  }
  if (amount >= 1000000) {
    const juta = Math.round(amount / 1000000);
    return `Rp ${juta} Juta`;
  }
  return formatRupiah(amount);
}

export function calculateLandPotential(formData: LeadFormData): CalculationResult {
  const land = Math.max(50, Number(formData.landArea) || 150);
  const type = formData.propertyType;

  // Koefisien Dasar Bangunan (KDB) standard Yogyakarta: 60%
  const kdbRatio = 0.6;
  const footprint = Math.round(land * kdbRatio);
  const openSpace = land - footprint;

  // Determine floors based on property type & size
  let suggestedFloors = 2;
  if (type === 'villa' && land >= 300) {
    suggestedFloors = 1; // 1-story expansive luxury villa
  } else if (type === 'rumah' && land < 90) {
    suggestedFloors = 2;
  }

  // Total Gross Floor Area (GFA)
  // Usually ground floor footprint + 80-90% of second floor
  const totalGFA = Math.round(
    suggestedFloors === 1 ? footprint : footprint + footprint * 0.85
  );

  // Construction cost multipliers in Yogyakarta (per m2 in 2026 standard)
  let costPerM2 = 4500000;
  if (type === 'villa') costPerM2 = 6200000; // Includes pool, high-end stone, pergolas
  if (type === 'kos') costPerM2 = 4800000; // Includes ensuite bathrooms, sound dampening

  const estimatedRAB = totalGFA * costPerM2;

  // Estimations for Kos Eksklusif
  // 1 room + private bath + terrace takes ~20m² (including corridor share)
  const roomCountEstimate = Math.max(
    4,
    Math.floor((totalGFA * 0.72) / 20)
  );

  // Monthly rental rate assumption in Jogja by zone
  let avgMonthlyRentPerRoom = 2000000; // Rp 2.0 Jt
  if (formData.locationZone.toLowerCase().includes('kampus') || formData.locationZone.toLowerCase().includes('depok')) {
    avgMonthlyRentPerRoom = 2300000; // Campus hotspots
  } else if (formData.locationZone.toLowerCase().includes('kaliurang')) {
    avgMonthlyRentPerRoom = 1800000;
  }

  // Monthly revenue for Kos (assume 90% steady occupancy)
  const monthlyRevenueKos = Math.round(roomCountEstimate * avgMonthlyRentPerRoom * 0.9);
  const annualGrossIncomeKos = monthlyRevenueKos * 12;
  const estimatedROIKos = Number(((annualGrossIncomeKos / (totalGFA * 4800000)) * 100).toFixed(1));

  // Estimations for Villa
  // Villa daily rate assumption
  const dailyRateVilla = land >= 250 ? 2500000 : 1800000;
  const occupancyNightsPerMonth = 16; // approx 53% monthly occupancy (weekends + holidays)
  const monthlyRevenueVilla = dailyRateVilla * occupancyNightsPerMonth;
  const annualGrossIncomeVilla = monthlyRevenueVilla * 12;
  const estimatedROIVilla = Number(((annualGrossIncomeVilla / (totalGFA * 6200000)) * 100).toFixed(1));

  // Selected metrics
  let monthlyRevenueEstimate: number | undefined;
  let annualGrossYield: number | undefined;
  let estimatedROI: number | undefined;

  if (type === 'kos') {
    monthlyRevenueEstimate = monthlyRevenueKos;
    annualGrossYield = annualGrossIncomeKos;
    estimatedROI = estimatedROIKos;
  } else if (type === 'villa') {
    monthlyRevenueEstimate = monthlyRevenueVilla;
    annualGrossYield = annualGrossIncomeVilla;
    estimatedROI = estimatedROIVilla;
  } else {
    // Rumah has capital appreciation focus (+12% p.a. average in Jogja prime spots)
    estimatedROI = 12.5;
  }

  // 3 Alternative Concepts Comparison for this exact land size
  const threeConcepts = [
    {
      title: 'Konsep Rumah Tropis Premium',
      type: 'rumah' as PropertyType,
      floors: 2,
      gfa: Math.round(footprint * 1.7),
      estimatedCost: Math.round(footprint * 1.7 * 4500000),
      keyBenefit: 'Kenyamanan keluarga, sirkulasi angin sejuk, taman asri',
      cashflowSummary: 'Apresiasi nilai aset 10-15% / tahun + Bebas pusing sewa',
    },
    {
      title: 'Konsep Kos Eksklusif / Co-Living',
      type: 'kos' as PropertyType,
      floors: 2,
      gfa: Math.round(footprint * 1.8),
      estimatedCost: Math.round(footprint * 1.8 * 4800000),
      keyBenefit: `${roomCountEstimate} Kamar AC + KM Dalam, okupansi stabil mahasiswa/karyawan`,
      cashflowSummary: `Est. Arus Kas: ${formatShortRupiah(monthlyRevenueKos)} / bulan (ROI ~${estimatedROIKos}%)`,
    },
    {
      title: 'Konsep Villa / Homestay Harian',
      type: 'villa' as PropertyType,
      floors: suggestedFloors,
      gfa: totalGFA,
      estimatedCost: Math.round(totalGFA * 6200000),
      keyBenefit: 'Private plunge pool, santai untuk liburan keluarga & sewa wisatawan',
      cashflowSummary: `Est. Arus Kas: ${formatShortRupiah(monthlyRevenueVilla)} / bulan (ROI ~${estimatedROIVilla}%)`,
    },
  ];

  // WhatsApp formatted string
  const propertyLabel =
    type === 'kos'
      ? 'Homestay / Kos Eksklusif'
      : type === 'villa'
      ? 'Villa Liburan Eksklusif'
      : 'Rumah Tinggal Modern Tropis';

  const waLines = [
    `*KONSULTASI POTENSI TANAH JOGJA*`,
    `Halo Tim Jogja Investor Club,`,
    `Saya telah mengisi simulasi potensi tanah di website dengan rincian berikut:`,
    ``,
    `👤 *Nama Lengkap:* ${formData.fullName || 'Pemilik Tanah'}`,
    `📍 *Lokasi Tanah:* ${formData.locationZone}`,
    `📐 *Luas Tanah:* ${land} m²`,
    `🏠 *Rencana Properti:* ${propertyLabel}`,
    `💰 *Estimasi Budget:* ${formData.budgetRange || 'Belum Ditentukan'}`,
    `⏳ *Target Mulai:* ${formData.startTimeline || 'Secepatnya'}`,
    `📱 *No. WhatsApp:* ${formData.whatsappNumber || '-'}`,
    ``,
    `*Hasil Estimasi Awal Website:*`,
    `- Rekomendasi Luas Bangunan: ~${totalGFA} m² (${suggestedFloors} Lantai)`,
    `- Estimasi Biaya Bangun (RAB): ${formatShortRupiah(estimatedRAB)}`,
    type === 'kos'
      ? `- Potensi Kamar: ±${roomCountEstimate} Kamar (Est. Arus Kas: ${formatShortRupiah(monthlyRevenueKos)}/bln)`
      : type === 'villa'
      ? `- Potensi Sewa: Est. Arus Kas ${formatShortRupiah(monthlyRevenueVilla)}/bln`
      : `- Proyeksi Apresiasi: 12-15% per tahun`,
    ``,
    `Mohon info lebih lanjut mengenai jadwal survey lokasi tanah atau jadwal diskusi konsep arsitektur & legalitas PBG. Terima kasih!`,
  ];

  const formattedWhatsAppText = waLines.join('\n');
  const encodedText = encodeURIComponent(formattedWhatsAppText);
  // Official Jogja consultation WhatsApp number (standard formatted wa.me link)
  const whatsappUrl = `https://wa.me/6282137000888?text=${encodedText}`;

  return {
    landArea: land,
    propertyType: type,
    buildingCoverageArea: footprint,
    greenOpenSpace: openSpace,
    suggestedFloors,
    totalBuildingArea: totalGFA,
    estimatedRAB,
    roomCountEstimate,
    monthlyRevenueEstimate,
    annualGrossYield,
    estimatedROI,
    threeConcepts,
    formattedWhatsAppText,
    whatsappUrl,
  };
}
