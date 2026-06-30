import Link from 'next/link'

const CATEGORY_LABELS = {
  noticias:   'Noticias',
  incidencia: 'Incidencia',
  alertafdc:  '#AlertaFDC',
  comunidad:  'Comunidad',
  cultura:    'Cultura',
}

const PLACEHOLDERS = ['🏳️‍🌈', '🏳️‍⚧️', '✊', '📣', '🗞️']

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function PostCard({ post }) {
  const { slug, title, excerpt, coverImage, date, author, category } = post
  const emoji = PLACEHOLDERS[slug.length % PLACEHOLDERS.length]

  return (
    <Link href={`/noticias/${slug}`} className="post-card">

      {/* Imagen */}
      <div className="post-card-image">
        {coverImage
          ? <img src={coverImage} alt={title} loading="lazy" />
          : <div className="post-card-image placeholder">{emoji}</div>
        }
      </div>

      {/* Contenido */}
      <div className="post-card-body">
        <div className="post-card-meta">
          {category && (
            <span className={`category-badge ${category}`}>
              {CATEGORY_LABELS[category] || category}
            </span>
          )}
          {date && <span className="post-date">{formatDate(date)}</span>}
        </div>

        <h2 className="post-card-title">{title}</h2>

        {excerpt && <p className="post-card-excerpt">{excerpt}</p>}

        <div className="post-card-footer">
          <span>{author || 'Fuera del Clóset A. C.'}</span>
          <span className="read-more">Leer más →</span>
        </div>
      </div>

    </Link>
  )
}
