import { getPostsByCategory } from '../../lib/posts'
import PostCard from '../../components/PostCard'

export const metadata = { title: '#AlertaFDC' }

export default function AlertaFDCPage() {
  const posts = getPostsByCategory('alertafdc')

  return (
    <main className="container">
      <div style={{ padding: '3rem 0' }}>
        <div className="section-header">
          <h1 className="section-title">#AlertaFDC</h1>
        </div>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: 640 }}>
          Seguimiento a casos de violencia, discriminación y vulneración de derechos
          de personas LGBTTTI+ documentados por Fuera del Clóset A. C.
        </p>

        {posts.length === 0
          ? <div className="loading" style={{ flexDirection: 'column', gap: '1rem', height: '50vh' }}>
              <span style={{ fontSize: '3rem' }}>📣</span>
              <p>No hay alertas publicadas aún.</p>
            </div>
          : <div className="posts-grid">
              {posts.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
        }
      </div>
    </main>
  )
}
