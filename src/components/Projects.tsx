'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ArrowLeft,
  X,
  Star,
  Maximize2,
  type LucideIcon,
} from 'lucide-react';

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectData {
  title: string;
  location?: string;
  propertyType?: string;
  year?: number;
  coverImage?: string;
  summary?: string;
  description?: unknown[]; // Sanity PortableText blocks
  specs?: ProjectSpec[];
  gallery?: string[];
  featured?: boolean;
  order?: number;
}

interface ProjectsProps {
  projects?: ProjectData[];
}

// Fallback demo data when Sanity has no content yet
const FALLBACK_PROJECTS: ProjectData[] = [
  {
    title: 'Villa Eksklusif Seturan',
    location: 'Sleman, Yogyakarta',
    propertyType: 'Villa',
    year: 2024,
    coverImage: '/images/arch_jogja_villa_1792108231919.jpg',
    summary:
      'Villa mewah 2 lantai dengan kolam renang privat, dirancang untuk investor yang mencari ROI tinggi dari sewa harian.',
    specs: [
      { label: 'Luas Tanah', value: '300 m²' },
      { label: 'Luas Bangunan', value: '220 m²' },
      { label: 'Nilai Investasi', value: 'Rp 2.5 M' },
      { label: 'ROI', value: '18% / tahun' },
    ],
    gallery: [
      '/images/arch_jogja_villa_1792108231919.jpg',
      '/images/arch_jogja_rumah_1792108230130.jpg',
      '/images/arch_jogja_kos_1792108231318.jpg',
    ],
    featured: true,
    order: 1,
  },
  {
    title: 'Kos Eksklusif Kawasan Kampus',
    location: 'Depok, Sleman',
    propertyType: 'Homestay & Kos',
    year: 2024,
    coverImage: '/images/arch_jogja_kos_1792108231318.jpg',
    summary:
      'Kos eksekutif 20 kamar dekat kampus UGM, dengan occupancy rate 95% sejak bulan pertama operasi.',
    specs: [
      { label: 'Luas Tanah', value: '500 m²' },
      { label: 'Jumlah Kamar', value: '20 kamar' },
      { label: 'Nilai Investasi', value: 'Rp 1.8 M' },
      { label: 'ROI', value: '15% / tahun' },
    ],
    gallery: [
      '/images/arch_jogja_kos_1792108231318.jpg',
      '/images/arch_jogja_rumah_1792108230130.jpg',
    ],
    featured: false,
    order: 2,
  },
  {
    title: 'Rumah Modern Minimalis',
    location: 'Bantul, Yogyakarta',
    propertyType: 'Rumah',
    year: 2023,
    coverImage: '/images/arch_jogja_rumah_1792108230130.jpg',
    summary:
      'Rumah hunian keluarga dengan konsep syariah, 3 kamar tidur dan taman tropis di halaman belakang.',
    specs: [
      { label: 'Luas Tanah', value: '150 m²' },
      { label: 'Luas Bangunan', value: '120 m²' },
      { label: 'Nilai Investasi', value: 'Rp 900 Jt' },
      { label: 'Apresiasi', value: '12% / tahun' },
    ],
    gallery: [
      '/images/arch_jogja_rumah_1792108230130.jpg',
      '/images/arch_jogja_villa_1792108231919.jpg',
    ],
    featured: false,
    order: 3,
  },
];

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const data = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openProject = (project: ProjectData) => {
    setActiveProject(project);
    setGalleryIndex(0);
  };

  const closeProject = () => {
    setActiveProject(null);
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (!activeProject?.gallery) return;
    setGalleryIndex((prev) => (prev + 1) % activeProject.gallery!.length);
  };

  const prevImage = () => {
    if (!activeProject?.gallery) return;
    setGalleryIndex((prev) =>
      prev === 0 ? activeProject.gallery!.length - 1 : prev - 1
    );
  };

  return (
    <section id="proyek-selesai" className="py-20 lg:py-28 bg-[#fbf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#c5a25d] mb-1">
            Portofolio Proyek
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081c17] tracking-tight"
            style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
          >
            Proyek yang{' '}
            <span
              className="italic font-normal text-[#c5a25d]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              sudah jadi
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Lihat hasil kerja nyata kami — dari lahan kosong hingga properti siap huni dan menghasilkan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {data.map((project, idx) => (
            <div
              key={idx}
              onClick={() => openProject(project)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* Cover image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 bg-[#d5a864] text-[#071914] rounded-full px-3 py-1.5 text-[11px] font-extrabold shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Unggulan</span>
                    </div>
                  </div>
                )}

                {/* Type badge */}
                {project.propertyType && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 text-[11px] font-bold text-white">
                      {project.propertyType}
                    </div>
                  </div>
                )}

                {/* Location + year on image bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#d5a864]" />
                    <span className="font-medium">{project.location}</span>
                  </div>
                  {project.year && (
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#d5a864]" />
                      <span className="font-medium">{project.year}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 space-y-2">
                <h3
                  className="text-lg font-bold text-[#081c17] tracking-tight"
                  style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                >
                  {project.title}
                </h3>
                {project.summary && (
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                )}

                {/* Specs inline */}
                {project.specs && project.specs.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.specs.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium text-neutral-600 bg-neutral-100 rounded-full px-2.5 py-1"
                      >
                        {spec.label}: <span className="font-bold text-[#081c17]">{spec.value}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* View detail CTA */}
                <div className="flex items-center gap-1.5 pt-2 text-xs font-semibold text-[#c5a25d]">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Project Detail with Gallery */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          onClick={closeProject}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeProject}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery — main image */}
            <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
              {activeProject.gallery && activeProject.gallery.length > 0 ? (
                <>
                  <img
                    src={activeProject.gallery[galleryIndex]}
                    alt={`${activeProject.title} - Foto ${galleryIndex + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Nav arrows */}
                  {activeProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Sebelumnya"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Berikutnya"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      {/* Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full px-3 py-1.5">
                        {galleryIndex + 1} / {activeProject.gallery.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <img
                  src={activeProject.coverImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Featured badge on gallery */}
              {activeProject.featured && (
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1.5 bg-[#d5a864] text-[#071914] rounded-full px-3 py-1.5 text-[11px] font-extrabold shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Unggulan</span>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery thumbnails */}
            {activeProject.gallery && activeProject.gallery.length > 1 && (
              <div className="flex gap-2 px-5 pt-4 overflow-x-auto">
                {activeProject.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      i === galleryIndex
                        ? 'border-[#d5a864] ring-2 ring-[#d5a864]/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Detail content */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Title + meta */}
              <div className="space-y-1">
                <h3
                  className="text-2xl font-bold text-[#081c17] tracking-tight"
                  style={{ fontFamily: 'var(--font-plus-jakarta), system-ui' }}
                >
                  {activeProject.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                  {activeProject.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#c5a25d]" />
                      {activeProject.location}
                    </span>
                  )}
                  {activeProject.propertyType && (
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-neutral-300" />
                      {activeProject.propertyType}
                    </span>
                  )}
                  {activeProject.year && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#c5a25d]" />
                      {activeProject.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}
              {activeProject.summary && (
                <p className="text-sm text-neutral-600 leading-relaxed">{activeProject.summary}</p>
              )}

              {/* Specs grid */}
              {activeProject.specs && activeProject.specs.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {activeProject.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="bg-neutral-50 rounded-xl p-3 border border-neutral-100"
                    >
                      <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide mb-1">
                        {spec.label}
                      </p>
                      <p className="text-sm font-bold text-[#081c17]">{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox (fullscreen image view) */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </section>
  );
};
