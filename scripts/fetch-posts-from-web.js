import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.resolve(__dirname, '../content/posts')

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

async function getSlugsFromPage(pageNum) {
  const url = pageNum === 1
    ? 'https://fueradelclosetac.com/'
    : `https://fueradelclosetac.com/page/${pageNum}/`
  const html = await get(url)
  const slugs = [...html.matchAll(/href="https:\/\/fueradelclosetac\.com\/([a-z0-9-]+)\/"/g)]
    .map(m => m[1])
    .filter(s => s && s !== 'page' && s.length > 3)
  return [...new Set(slugs)]
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log('📋 Recolectando slugs de todas las páginas...\n')
  const allSlugs = new Set()

  for (let p = 1; p <= 25; p++) {
    try {
      console.log(`🔍 Página ${p}/25...`)
      const slugs = await getSlugsFromPage(p)
      slugs.forEach(s => allSlugs.add(s))
      await new Promise(r => setTimeout(r, 300))
    } catch(e) {
      console.log(`  ⚠️ página ${p} no disponible`)
    }
  }

  console.log(`\n✅ Total de posts encontrados: ${allSlugs.size}\n`)

  for (const slug of allSlugs) {
    try {
      console.log(`📥 ${slug}`)
      const html = await get(`https://fueradelclosetac.com/${slug}/`)
      if (!html.includes('article') && !html.includes('post')) continue

      const title = html.match(/property="og:title"\s+content="([^"]+)"/)?.[1] || slug
      const date  = html.match(/property="article:published_time"\s+content="([^"]+)"/)?.[1] || new Date().toISOString()
      const image = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1] || ''
      const desc  = html.match(/property="og:description"\s+content="([^"]+)"/)?.[1] || ''

      const md = `---
title: ${JSON.stringify(title)}
date: "${date}"
author: "Fuera del Clóset A. C."
category: "noticias"
${image ? `coverImage: "${image}"` : ''}
${desc ? `excerpt: ${JSON.stringify(desc)}` : ''}
---

> Ver post original: https://fueradelclosetac.com/${slug}/
`
      fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.md`), md)
      console.log(`  ✅ guardado`)
      await new Promise(r => setTimeout(r, 400))
    } catch(e) {
      console.log(`  ⚠️ error`)
    }
  }
  console.log('\n🏳️‍🌈 ¡Migración completa!')
}

main()