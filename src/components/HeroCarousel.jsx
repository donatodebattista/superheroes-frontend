import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function HeroCarousel({ images = [], heroName = '' }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  if (images.length === 0) return null

  if (images.length === 1) {
    return (
      <div className="rounded-2xl overflow-hidden w-full aspect-[4/3]">
        <img src={images[0]} alt={heroName}
             className="w-full h-full object-cover"
             onError={e => { e.target.src = 'https://placehold.co/600x450/13131f/94a3b8?text=Sin+imagen' }} />
      </div>
    )
  }

  return (
    <div className="relative rounded-2xl overflow-hidden w-full group" style={{ aspectRatio: '4/3' }}>
      {/* Imagen */}
      <img
        key={current}
        src={images[current]}
        alt={`${heroName} ${current + 1}`}
        className="w-full h-full object-cover animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
        onError={e => { e.target.src = 'https://placehold.co/600x450/13131f/94a3b8?text=Sin+imagen' }}
      />

      {/* Overlay lateral para botones */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Botones prev/next */}
      <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center
                         bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
        <FiChevronLeft size={20} />
      </button>
      <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center
                         bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
        <FiChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`} />
        ))}
      </div>

      {/* Contador */}
      <span className="absolute top-3 right-3 text-xs text-white/70 bg-black/40 px-2 py-0.5 rounded-full">
        {current + 1} / {images.length}
      </span>
    </div>
  )
}
