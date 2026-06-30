#!/usr/bin/env node
/**
 * migrate-from-ghost.js
 * ─────────────────────────────────────────────────────────────────
 * Extrae todos los posts de Ghost (Heroku) y los convierte
 * en archivos Markdown para el nuevo sitio Next.js.
 *
 * Uso:
 *   GHOST_URL=https://fdc-blog.herokuapp.com \
 *   GHOST_CONTENT_KEY=tu_content_api_key \
 *   node scripts/migrate-from-ghost.js
 *
 * ¿Dónde obtengo la Content API Key?
 *   Ghost Admin → Settings → Integrations → Add custom integration
 * ─────────────────────────────────────────────────────────────────
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const GHOST_URL = process.env.GHOST_URL || 'https://fdc-blog.herokuapp.com'
const GHOST_KEY = process.env.GHOST_CONTENT_KEY || ''
const OUTPUT_DIR = path.resolve(__dirname, '../content/posts')

if (!GHOST_KEY) {
  console.error('❌ Falta la variable GHOST_CONTENT_KEY')
  console.error('   Crea una integración en Ghost Admin → Settings → Integrations')
  process.exit(1)
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch (e) { reject(e) } })
    }).on('error', reject)
  })
}

function htmlToMarkdown(html) {
  if (!html) return ''
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '> $1\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gis, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<figure[^>]*>(.*?)<\/figure>/gis, '$1\n\n')
    .replace(/<figcaption[^>]*>(.*?)<\/figcaption>/gi, '*$1*\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n').trim()
}

function mapCategory(tags = []) {
  const names = tags.map(t => t.name.toLowerCase())
  if (names.some(t => t.includes('alerta'))) return 'alertafdc'
  if (names.some(t => t.includes('incidencia'))) return 'incidencia'
  if (names.some(t => t.includes('cultura') || t.includes('cine'))) return 'cultura'
  if (names.some(t => t.includes('comunidad') || t.includes('marcha'))) return 'comunidad'
  return 'noticias'
}

function buildFrontmatter(post) {
  const tags     = (post.tags || []).map(t => t.name)
  const category = mapCategory(post.tags)
  const lines    = [
    '---',
    `title: ${JSON.stringify(post.title || '')}`,
    `date: "${post.published_at || new Date().toISOString()}"`,
    `author: "${post.primary_author?.name || 'Fuera del Clóset A. C.'}"`,
    `category: "${category}"`,
  ]
  if (post.feature_image) lines.push(`coverImage: "${post.feature_image}"`)
  if (post.custom_excerpt || post.excerpt) {
    lines.push(`excerpt: ${JSON.stringify((post.custom_excerpt || post.excerpt || '').substring(0, 300))}`)
  }
  if (tags.length > 0) { lines.push('tags:'); tags.forEach(t => lines.push(`  - ${t}`)) }
  lines.push('---')
  return lines.join('\n')
}

async function migrate() {
  console.log(`\n🏳️‍🌈 Iniciando migración desde ${GHOST_URL}\n`)
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  let page = 1, total = 0, hasMore = true

  while (hasMore) {
    const url = `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&limit=15&page=${page}&include=tags,authors&formats=html`
    console.log(`📦 Descargando página ${page}...`)

    let data
    try { data = await get(url) }
    catch (err) {
      console.error('❌ Error al conectar con Ghost:', err.message)
      process.exit(1)
    }

    for (const post of (data.posts || [])) {
      const slug    = post.slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()
      const content = `${buildFrontmatter(post)}\n\n${htmlToMarkdown(post.html || '')}\n`
      fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.md`), content, 'utf-8')
      console.log(`  ✅ ${slug}.md`)
      total++
    }

    const meta = data.meta?.pagination || {}
    hasMore = meta.page < meta.pages
    page++
  }

  console.log(`\n✨ Migración completa: ${total} posts guardados en /content/posts/\n`)
  console.log('📝 Próximos pasos:')
  console.log('   1. Revisa los archivos en content/posts/')
  console.log('   2. Corre: npm run dev para verlos en el sitio')
  console.log('   3. Haz commit y push → Netlify publica automáticamente\n')
}

migrate().catch(err => { console.error('❌ Error:', err); process.exit(1) })
