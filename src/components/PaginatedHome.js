'use client'

import { useState } from 'react'
import PostCard from './PostCard'

const POSTS_PER_PAGE = 12

export default function PaginatedHome({ posts }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE)
  const [featured, ...rest] = pagePosts

  const handlePage = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="posts-section">
      {posts.length === 0 && (
        <div className="loading" style={{ flexDirection: 'column', gap: '1rem', height: '60vh' }}>
          <span style={{ fontSize: '3rem' }}>🏳️‍🌈</span>
          <p>No hay posts aún.</p>
        </div>
      )}

      {page === 1 && featured && (
        <>
          <div className="section-header">
            <h1 className="section-title">Última hora</h1>
          </div>
          <div className="posts-grid featured" style={{ marginBottom: '3rem' }}>
            <PostCard post={featured} />
            {rest.slice(0, 2).map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {rest.length > 2 && (
            <>
              <div className="section-header">
                <h2 className="section-title">Más noticias</h2>
              </div>
              <div className="posts-grid">
                {rest.slice(2).map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {page > 1 && (
        <>
          <div className="section-header">
            <h2 className="section-title">Noticias — Página {page}</h2>
          </div>
          <div className="posts-grid">
            {pagePosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => handlePage(page - 1)} disabled={page === 1}>←</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} className={`page-btn${p === page ? ' active' : ''}`} onClick={() => handlePage(p)}>{p}</button>
          ))}
          <button className="page-btn" onClick={() => handlePage(page + 1)} disabled={page === totalPages}>→</button>
        </div>
      )}
    </section>
  )
}