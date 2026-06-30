import { getAllGallery } from '../../lib/posts'
import GalleryClient from '../../components/GalleryClient'

export const metadata = { title: 'Galería' }

export default function GalleryPage() {
  const albums = getAllGallery()

  return (
    <main className="container">
      <div style={{ padding: '3rem 0' }}>
        <div className="section-header">
          <h1 className="section-title">Galería</h1>
        </div>

        {albums.length === 0 ? (
          <div className="loading" style={{ flexDirection: 'column', gap: '1rem', height: '60vh' }}>
            <span style={{ fontSize: '3rem' }}>🖼️</span>
            <p>No hay imágenes aún. Agrégalas desde el panel de administración.</p>
          </div>
        ) : (
          <GalleryClient albums={albums} />
        )}
      </div>
    </main>
  )
}
