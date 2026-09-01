import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import CalliSpaceSlider from '../../components/CalliSpaceSlider'

export const metadata = { title: 'Calli — Centro Comunitario LGBTTTIQ+' }

const SCHEDULE = [
  { day: 'Lunes',    hours: '10 a.m. – 5 p.m.' },
  { day: 'Martes',   hours: '10 a.m. – 5 p.m.' },
  { day: 'Miércoles',hours: '10 a.m. – 5 p.m.' },
  { day: 'Jueves',   hours: '10 a.m. – 5 p.m.' },
  { day: 'Viernes',  hours: '10 a.m. – 5 p.m.' },
  { day: 'Sábado',   hours: '12 p.m. – 3 p.m.' },
  { day: 'Domingo',  hours: 'Cerrado' },
]

export default function CalliPage() {
  return (
    <main className="container">
      <div className="about-page">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', textAlign: 'center' }}>
          <img src="/images/calli-logo.png" alt="CALLI Centro Comunitario LGBTTTIQ+" style={{ height: 180, width: 'auto', flexShrink: 0 }} />
          <h1 style={{ margin: 0, color: 'var(--color-accent)' }}>CALLI<br />Centro Comunitario LGBTTTIQANB+</h1>
        </div>

        <p>
          CALLI es el Centro Comunitario LGBTTTIQANB+ impulsado por Fuera del Clóset A. C.,
          un espacio seguro en Toluca de Lerdo que ofrece acompañamiento, información y
          actividades para la comunidad LGBTTTIQANB+ y sus aliades.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            margin: '1.5rem 0 2rem',
          }}
        >
          <img
            src="/images/calli-fachada.jpg"
            alt="Fachada de Calli, Centro Comunitario LGBTTTIQ+"
            style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 'var(--radius)' }}
          />
          <img
            src="/images/calli-mural.jpg"
            alt="Mural de Calli, Centro Comunitario LGBTTTIQ+"
            style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 'var(--radius)' }}
          />
        </div>

        <img
          src="/images/calli-equipo.png"
          alt="Equipo de Calli, Centro Comunitario LGBTTTIQ+"
          style={{ width: '100%', height: 340, objectFit: 'cover', borderRadius: 'var(--radius)', marginTop: '0.5rem' }}
        />

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
          color: 'var(--color-accent)', textAlign: 'center', marginTop: '3rem', marginBottom: '1.5rem',
        }}>
          ¡Conoce tu espacio!
        </h2>
        <CalliSpaceSlider />

        <div className="reports-grid" style={{ marginTop: '2.5rem' }}>
          <div className="report-card">
            <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
            <span className="report-card-title">
              Josué Mirlo 417, Morelos Primera Secc,<br />50120 Toluca de Lerdo, Méx.
            </span>
            <a href="https://share.google/US9EOXm8NqBaC55Pg" target="_blank" rel="noreferrer" className="report-card-btn">
              Cómo llegar <ExternalLink size={11} />
            </a>
          </div>

          <div className="report-card">
            <Phone size={20} style={{ color: 'var(--color-accent)' }} />
            <span className="report-card-title">722 605 5743</span>
            <a href="tel:+527226055743" className="report-card-btn">
              Llamar <ExternalLink size={11} />
            </a>
          </div>

          <div className="report-card">
            <Clock size={20} style={{ color: 'var(--color-accent)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {SCHEDULE.map(({ day, hours }) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span>{day}</span>
                  <span style={{ color: 'var(--color-text)' }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="https://share.google/US9EOXm8NqBaC55Pg"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '2.5rem',
            padding: '0.75rem 1.5rem', background: 'var(--color-accent)', color: '#fff',
            borderRadius: 'var(--radius)', fontSize: '0.9rem', fontWeight: 600,
          }}
        >
          Ver ficha completa en Google <ExternalLink size={13} />
        </a>
      </div>
    </main>
  )
}
