import { useState } from 'react'
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  name: string
  badge?: string
}

export const ProductGallery = ({ images, name,  }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const activeImage = images[activeIndex] || images[0]

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length)
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Primary Display Stage with constrained max height */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-2xl bg-neutral-100 cursor-pointer border border-neutral-200/60 shadow-sm"
      >
        {/* Floating Badge */}
   

        {/* Counter Badge */}
        <span className="absolute top-4 right-4 z-10 rounded-full bg-neutral-900/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white tracking-widest">
          {activeIndex + 1} / {images.length}
        </span>

        {/* Image */}
        <img
          src={activeImage}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Fullscreen Trigger */}
        <button
          aria-label="Open full screen lightbox"
          className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-neutral-800 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-105 shadow-md"
        >
          <Expand className="h-4 w-4 stroke-[2]" />
        </button>
      </div>

      {/* Thumbnails Bar (only renders if more than 1 image) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {images.map((img, idx) => {
            const isActive = activeIndex === idx
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'border-neutral-900 ring-2 ring-neutral-900/10 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${name} thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-300">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative max-h-[85vh] max-w-[85vw] overflow-hidden rounded-2xl">
            <img
              src={activeImage}
              alt={name}
              className="max-h-[85vh] max-w-[85vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}