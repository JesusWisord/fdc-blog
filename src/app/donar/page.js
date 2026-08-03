'use client'

import { useEffect, useState } from 'react'

export default function DonarPage() {
  const [imgOk, setImgOk] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/images/dona_aqui.jpeg', { method: 'HEAD' })
      .then(res => { if (!cancelled) setImgOk(res.ok) })
      .catch(() => { if (!cancelled) setImgOk(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <main className="container">
      <div className="about-page" style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-accent)' }}>Dona Aquí</h1>
        <p style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '1.15rem' }}>
          ¡Ayúdanos a seguir con este sueño! 🏳️‍🌈🏳️‍⚧️🏡🫶
        </p>
        <p>
          Dona para que podamos mantener las puertas abiertas de Calli, el primer
          centro comunitario para personas LGBTTTIQANB+ del Valle de Toluca.
        </p>

        {imgOk && (
          <img
            src="/images/dona_aqui.jpeg"
            alt="Datos para donar a Fuera del Clóset A. C."
            style={{
              maxWidth: 480, width: '100%', margin: '2rem auto 0',
              borderRadius: 'var(--radius)', border: '1px solid var(--color-border)',
            }}
          />
        )}
        {imgOk === false && (
          <p style={{ marginTop: '2rem', color: 'var(--color-text-subtle)' }}>
            Muy pronto encontrarás aquí los datos para donar.
          </p>
        )}
      </div>
    </main>
  )
}
