/**
 * lib/posts.js
 * ─────────────────────────────────────────────
 * Funciones para leer los archivos Markdown del
 * blog. Next.js los lee en el servidor durante
 * el build, así el sitio final es HTML puro
 * (rápido, SEO-friendly, sin base de datos).
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Rutas base de cada tipo de contenido
const POSTS_DIR   = path.join(process.cwd(), 'content/posts')
const EVENTS_DIR  = path.join(process.cwd(), 'content/events')
const GALLERY_DIR = path.join(process.cwd(), 'content/gallery')

/** Lee y parsea todos los .md de un directorio */
function readMarkdownDir(dir) {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '')
      const raw  = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data: frontmatter, content } = matter(raw)

      return {
        slug,
        content,
        ...frontmatter,
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : new Date().toISOString(),
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Más reciente primero
}

// ── Posts (Noticias) ──────────────────────────

/** Devuelve todos los posts ordenados por fecha */
export function getAllPosts() {
  return readMarkdownDir(POSTS_DIR)
}

/** Devuelve los slugs de todos los posts (para generateStaticParams) */
export function getAllPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
}

/** Devuelve un post por su slug */
export function getPostBySlug(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)
  return {
    slug,
    content,
    ...frontmatter,
    date: frontmatter.date
      ? new Date(frontmatter.date).toISOString()
      : new Date().toISOString(),
  }
}

/** Posts paginados */
export function getPaginatedPosts(page = 1, perPage = 12) {
  const all       = getAllPosts()
  const total     = all.length
  const totalPages = Math.ceil(total / perPage) || 1
  const start     = (page - 1) * perPage
  const posts     = all.slice(start, start + perPage)
  return { posts, total, totalPages, page }
}

/** Posts por categoría */
export function getPostsByCategory(category) {
  return getAllPosts().filter(
    p => p.category?.toLowerCase() === category.toLowerCase()
  )
}

/** Posts relacionados (misma categoría, excluye el actual) */
export function getRelatedPosts(slug, category, limit = 3) {
  return getAllPosts()
    .filter(p => p.slug !== slug && p.category === category)
    .slice(0, limit)
}

// ── Eventos ───────────────────────────────────

export function getAllEvents() {
  return readMarkdownDir(EVENTS_DIR)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
}

// ── Galería ───────────────────────────────────

export function getAllGallery() {
  return readMarkdownDir(GALLERY_DIR)
}
