import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '../../../lib/posts'
import PostCard from '../../../components/PostCard'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Calendar, User } from 'lucide-react'


// Metadata dinámica para SEO (título, descripción, Open Graph por post)
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

const CATEGORY_LABELS = {
  noticias: 'Noticias', incidencia: 'Incidencia',
  alertafdc: '#AlertaFDC', comunidad: 'Comunidad', cultura: 'Cultura',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return null

  const { title, date, author, coverImage, category, content } = post
    const related = getRelatedPosts(slug, category)

  return (
    <main className="container">
      <div className="post-page">

        {/* Botón volver */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '2rem',
        }}>
          <ArrowLeft size={16} /> Volver a Noticias
        </Link>

        {/* Header */}
        <header>
          {coverImage && (
            <img src={coverImage} alt={title} className="post-cover" />
          )}

          {category && (
            <span className={`category-badge ${category}`} style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {CATEGORY_LABELS[category] || category}
            </span>
          )}

          <h1 className="post-title">{title}</h1>

          <div className="post-byline">
            {author && (
              <>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={14} /> {author}
                </span>
                <span style={{ color: 'var(--color-border)' }}>·</span>
              </>
            )}
            {date && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> {formatDate(date)}
              </span>
            )}
          </div>
        </header>

        {/* Contenido Markdown */}
        <article className="post-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} loading="lazy" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Posts relacionados */}
        {related.length > 0 && (
          <section style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--color-border)' }}>
            <div className="section-header">
              <h2 className="section-title">También te puede interesar</h2>
            </div>
            <div className="posts-grid">
              {related.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
