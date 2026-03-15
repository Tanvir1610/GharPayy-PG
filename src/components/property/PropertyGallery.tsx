'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Grid3X3, Maximize2, ShieldCheck } from 'lucide-react';

interface Props {
  photos: string[];
  name: string;
  isVerified: boolean;
}

export default function PropertyGallery({ photos, name, isVerified }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridOpen, setGridOpen] = useState(false);

  const safePhotos = photos?.length ? photos : [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85',
  ];

  const openLightbox = (i: number) => { setActiveIndex(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const prev = useCallback(() => setActiveIndex(i => (i - 1 + safePhotos.length) % safePhotos.length), [safePhotos.length]);
  const next = useCallback(() => setActiveIndex(i => (i + 1) % safePhotos.length), [safePhotos.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, prev, next]);

  useEffect(() => {
    document.body.style.overflow = (lightboxOpen || gridOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen, gridOpen]);

  const main = safePhotos[0];
  const side = safePhotos.slice(1, 5);

  return (
    <>
      {/* ── Hero Gallery ───────────────────────────────────────── */}
      <div className="relative w-full bg-[#0e0c0a]">
        {/* Desktop: main + 4-grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1 h-[520px] max-w-7xl mx-auto px-4 pt-4">
          {/* Main large image */}
          <div
            className="col-span-2 row-span-2 relative overflow-hidden rounded-l-2xl cursor-zoom-in group"
            onClick={() => openLightbox(0)}
          >
            <img src={main} alt={name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {isVerified && (
              <span className="absolute top-4 left-4 flex items-center gap-1.5 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                <ShieldCheck size={12} /> Verified Property
              </span>
            )}
          </div>

          {/* Side 4 images */}
          {[0, 1, 2, 3].map((i) => {
            const photo = safePhotos[i + 1];
            const isLast = i === 3 && safePhotos.length > 5;
            return (
              <div
                key={i}
                className={`relative overflow-hidden cursor-zoom-in group ${i === 1 ? 'rounded-tr-2xl' : i === 3 ? 'rounded-br-2xl' : ''}`}
                onClick={() => photo ? openLightbox(i + 1) : setGridOpen(true)}
              >
                {photo ? (
                  <>
                    <img src={photo} alt={`${name} ${i + 2}`} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                    {isLast && (
                      <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1">
                        <Grid3X3 size={22} className="text-white" />
                        <span className="text-white font-semibold text-sm">+{safePhotos.length - 5} more</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-[#1a1208] flex items-center justify-center">
                    <Grid3X3 size={20} className="text-white/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: horizontal scroll strip */}
        <div className="md:hidden overflow-x-auto scrollbar-hide flex gap-2 px-4 py-3" style={{ scrollSnapType: 'x mandatory' }}>
          {safePhotos.map((photo, i) => (
            <div
              key={i}
              className="flex-none w-[85vw] h-64 rounded-xl overflow-hidden cursor-zoom-in relative"
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => openLightbox(i)}
            >
              <img src={photo} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
              {i === 0 && isVerified && (
                <span className="absolute top-3 left-3 flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <ShieldCheck size={11} /> Verified
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action row */}
        <div className="max-w-7xl mx-auto px-4 pb-4 flex items-center justify-end gap-2 mt-1.5">
          <button
            onClick={() => setGridOpen(true)}
            className="hidden md:flex items-center gap-2 bg-white/90 hover:bg-white text-dark text-sm font-semibold px-4 py-2 rounded-xl shadow transition-colors border border-white/20"
          >
            <Grid3X3 size={15} />
            Show all {safePhotos.length} photos
          </button>
          <button
            onClick={() => openLightbox(0)}
            className="hidden md:flex items-center gap-2 bg-white/90 hover:bg-white text-dark text-sm font-semibold px-4 py-2 rounded-xl shadow transition-colors"
          >
            <Maximize2 size={15} />
            Full screen
          </button>
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          {/* Close */}
          <button className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2 z-10" onClick={closeLightbox}>
            <X size={22} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {activeIndex + 1} / {safePhotos.length}
          </div>

          {/* Prev */}
          {safePhotos.length > 1 && (
            <button
              className="absolute left-3 sm:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 z-10 transition-colors"
              onClick={e => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Image */}
          <div className="relative max-w-5xl max-h-[85vh] w-full mx-16 sm:mx-24" onClick={e => e.stopPropagation()}>
            <img
              key={activeIndex}
              src={safePhotos[activeIndex]}
              alt={`${name} — photo ${activeIndex + 1}`}
              className="w-full h-full object-contain max-h-[85vh] rounded-xl select-none"
              draggable={false}
            />
          </div>

          {/* Next */}
          {safePhotos.length > 1 && (
            <button
              className="absolute right-3 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 z-10 transition-colors"
              onClick={e => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2 pb-1">
            {safePhotos.map((photo, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setActiveIndex(i); }}
                className={`flex-none w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? 'border-brand scale-110' : 'border-transparent opacity-60 hover:opacity-90'}`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── All Photos Grid Modal ──────────────────────────────── */}
      {gridOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-[#e8e2d8] z-10 flex items-center justify-between px-6 py-4">
            <h2 className="font-display text-lg font-bold text-dark">{name} — All Photos ({safePhotos.length})</h2>
            <button onClick={() => setGridOpen(false)} className="text-[#7a7167] hover:text-dark bg-[#f5f0eb] hover:bg-[#e8e2d8] rounded-full p-2 transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {safePhotos.map((photo, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl overflow-hidden cursor-zoom-in group relative"
                onClick={() => { setGridOpen(false); openLightbox(i); }}
              >
                <img src={photo} alt={`${name} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <Maximize2 size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
