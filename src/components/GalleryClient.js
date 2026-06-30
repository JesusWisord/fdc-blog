'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// La galería necesita interactividad (lightbox) → 'use client'
export default function GalleryClient({ albums }) {
  const allImages = albums.flatMap(album =>
    (album.images || []).map(img => ({ ...img, albumTitle: album.title }))
  )

  const [lightboxIndex, setLightboxIndex] = useState(null)

  const open  = (i) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev  = () => setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length)
  const next  = () => setLightboxIndex(i => (i + 1) % allImages.length)

  return (
    <>
      {albums.map((album, albumIdx) => (
        <div key={album.slug} style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.5rem',
            fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--color-border)'
          }}>
            {album.title}
          </h2>

          {album.description && (
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              {album.description}
            </p>
          )}

          <div className="gallery-grid">
            {(album.images || []).map((img, imgIdx) => {
              const globalIdx = albums
                .slice(0, albumIdx)
                .reduce((acc, a) => acc + (a.images?.length || 0), 0) + imgIdx

              return (
                <div key={imgIdx} className="gallery-item" onClick={() => open(globalIdx)}>
                  <img src={img.src} alt={img.alt || album.title} loading="lazy" />
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Cerrar">
            <X size={28} />
          </button>

          <button onClick={(e) => { e.stopPropagation(); prev() }}
            style={{ position: 'absolute', left: '1.5rem', color: 'white',
              background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
              width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={24} />
          </button>

          <img
            src={allImages[lightboxIndex]?.src}
            alt={allImages[lightboxIndex]?.alt}
            onClick={e => e.stopPropagation()}
          />

          <button onClick={(e) => { e.stopPropagation(); next() }}
            style={{ position: 'absolute', right: '1.5rem', color: 'white',
              background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
              width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={24} />
          </button>

          <div style={{ position: 'absolute', bottom: '1.5rem',
            color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textAlign: 'center' }}>
            {allImages[lightboxIndex]?.albumTitle} — {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  )
}
