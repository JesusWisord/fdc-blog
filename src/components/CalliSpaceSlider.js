'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  { src: '/images/calli-espacio-recepcion.jpg', alt: 'Recepción de Calli, Centro Comunitario LGBTTTIQ+' },
  { src: '/images/calli-espacio-oficina.jpg', alt: 'Oficina de atención en Calli' },
  { src: '/images/calli-espacio-sala.jpg', alt: 'Sala de Calli, Centro Comunitario LGBTTTIQ+' },
  { src: '/images/calli-espacio-comedor.jpg', alt: 'Sala de estar / comedor en Calli' },
]

const AUTOPLAY_MS = 5000

export default function CalliSpaceSlider() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex(i => (i + 1) % SLIDES.length), [])
  const prev = useCallback(() => setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [next])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 820,
        margin: '0 auto',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: 420 }}>
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === index ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Anterior"
        style={{
          position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.45)', color: '#fff', border: 'none', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        style={{
          position: 'absolute', top: '50%', right: '0.75rem', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.45)', color: '#fff', border: 'none', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ChevronRight size={20} />
      </button>

      <div
        style={{
          position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '0.4rem',
        }}
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => setIndex(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            style={{
              width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
              background: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
