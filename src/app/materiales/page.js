export const metadata = { title: 'Materiales' }

// Imagen de respaldo para informes sin portada propia (evita el placeholder morado)
const FALLBACK_IMAGE = '/images/fdc-logo.png'

const REPORTS = [
  { title: 'Informe Anual 2021', date: '2021', url: 'https://drive.google.com/file/d/1xhJAbDHjSgcC9S_CBOXRJD3E7bZqLo42/view', image: '/images/informe-anual-2021-cover.jpg' },
  { title: 'Informe Anual 2022', date: '2022', url: 'https://drive.google.com/file/d/1ZHDgZ1Yaa9OI_JykihnYvwDe_6lOMKZg/view', image: '/images/informe-anual-2022-cover.jpg' },
  { title: 'Cuadernillo INE', date: '2026', url: '/informes/cuadernillo-ine.pdf', image: '/images/cuadernillo-ine-cover.jpg' },
  { title: 'Conceptos Básicos', date: '2026', url: '/informes/conceptos-basicos.pdf', image: '/images/conceptos-basicos-cover.jpg' },
  { title: 'Violencia y Derechos Humanos Políticos', date: '2026', url: '/informes/violencia-dh-politica.pdf', image: '/images/violencia-dh-politica-cover.png' },
  { title: 'VIH', date: '2026', url: '/informes/vih.pdf', image: '/images/vih-cover.jpg' },
]

export default function MaterialesPage() {
  return (
    <main className="container">
      <div className="about-page">
        <h1>Materiales</h1>

        <div className="posts-grid" style={{ marginTop: '2rem' }}>
          {REPORTS.map(({ title, date, url, image }) => (
            <a key={title} href={url} target="_blank" rel="noreferrer" className="post-card">

              {/* Imagen destacada (o previsualización de respaldo si el informe no tiene una propia) */}
              {/* object-fit: contain para que la portada se vea completa, sin recortar texto */}
              <div className="post-card-image" style={{ background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: image ? 0 : '2rem' }}>
                <img
                  src={image || FALLBACK_IMAGE}
                  alt={title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Contenido */}
              <div className="post-card-body">
                <div className="post-card-meta">
                  <span className="post-date">{date}</span>
                </div>

                <h2 className="post-card-title">{title}</h2>

                <div className="post-card-footer">
                  <span className="read-more">Leer más →</span>
                </div>
              </div>

            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
