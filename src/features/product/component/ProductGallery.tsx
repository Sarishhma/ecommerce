import { useState } from 'react'

export const ProductGallery = ({ images, name }: { images: string[]; name: string }) => {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="flex flex-col space-y-4">
      <div className="aspect-[4/5] bg-sand/30 rounded-3xl overflow-hidden relative">
        <img
          src={images[activeImage] || images[0]}
          alt={name}
          className="w-full h-full object-cover object-center animate-fade-in"
        />
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
              activeImage === idx ? 'border-terracotta' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`${name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}