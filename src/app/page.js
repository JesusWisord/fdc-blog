import { getAllPosts } from '../lib/posts'
import Link from 'next/link'
import PaginatedHome from '../components/PaginatedHome'

export const metadata = {
  title: 'Noticias LGBTTTI+ — Fuera del Clóset A. C.',
}

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main>
<div className="hero" style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--color-surface)',
  padding: '4rem 1.5rem'
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
    <img
      src="/images/fdc-logo.png"
      alt="Fuera del Clóset A. C."
      style={{ height: 170, width: 'auto', objectFit: 'contain' }}
    />
    <span style={{ width: 1, height: 130, background: 'var(--color-border)' }} />
    <img
      src="/images/calli-logo.png"
      alt="CALLI Centro Comunitario LGBTTTIQ+"
      style={{ height: 170, width: 'auto', objectFit: 'contain' }}
    />
  </div>
</div>
      <div className="container">
        <PaginatedHome posts={posts} />
      </div>
    </main>
  )
}