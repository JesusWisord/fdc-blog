'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, HeartHandshake, Stethoscope, Scale, Megaphone, GraduationCap } from 'lucide-react'

const SERVICES = [
  {
    icon: HeartHandshake,
    title: 'Acompañamiento psicológico',
    description: 'Brindamos herramientas para el desarrollo de la vida diaria de aquellas personas de la diversidad sexual y de género que la requieran.',
  },
  {
    icon: Stethoscope,
    title: 'Asesoría de salud sexual',
    description: 'Aplicamos pruebas rápidas de detección de VIH y otras ITS. Así mismo, generamos vinculación para obtener Tratamiento Antirretroviral (TAR) o la obtención de otros métodos de prevención.',
  },
  {
    icon: Scale,
    title: 'Asesoría jurídica',
    description: 'Apoyamos en dar orientación a casos que busquen ejercer alguno de sus derechos humanos o haya sufrido alguna situación de discriminación y/o violencia.',
  },
  {
    icon: Megaphone,
    title: 'Difusión y Cultura',
    description: 'Realizamos eventos culturales que promuevan y difundan los derechos humanos de la población LGBTTTIQANB+.',
  },
  {
    icon: GraduationCap,
    title: 'Capacitación y Sensibilización',
    description: 'Talleres, pláticas dirigidos a instituciones públicas, empresas o escuelas.',
  },
]

const AUTOPLAY_MS = 6000

export default function ServicesSlider() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex(i => (i + 1) % SERVICES.length), [])
  const prev = useCallback(() => setIndex(i => (i - 1 + SERVICES.length) % SERVICES.length), [])

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [next])

  const { icon: Icon, title, description } = SERVICES[index]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 640,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          padding: '2.5rem 3.5rem',
          minHeight: 260,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem',
        }}
      >
        <Icon size={36} style={{ color: 'var(--color-accent)' }} />
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
          {title}
        </h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          {description}
        </p>
      </div>

      <button
        onClick={prev}
        aria-label="Anterior"
        style={{
          position: 'absolute', top: '50%', left: '0.25rem', transform: 'translateY(-50%)',
          background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        style={{
          position: 'absolute', top: '50%', right: '0.25rem', transform: 'translateY(-50%)',
          background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ChevronRight size={20} />
      </button>

      <div
        style={{
          display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem',
        }}
      >
        {SERVICES.map((service, i) => (
          <button
            key={service.title}
            onClick={() => setIndex(i)}
            aria-label={`Ir a ${service.title}`}
            style={{
              width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
              background: i === index ? 'var(--color-accent)' : 'var(--color-border)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
