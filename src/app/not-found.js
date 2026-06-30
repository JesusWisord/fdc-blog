import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container">
      <div className="error-page">
        <h1>404</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Esta página no existe o fue eliminada.
        </p>
        <Link href="/" style={{
          display: 'inline-block', padding: '0.75rem 2rem',
          background: 'var(--color-accent)', color: 'white',
          borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '0.9rem',
        }}>
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
