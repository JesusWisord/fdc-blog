import Link from 'next/link'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

export default function HomePage() {
  return (
    <main>
<div className="home-hero">
  <div className="home-hero-logos">
    <img
      src="/images/fdc-logo.png"
      alt="Fuera del Clóset A. C."
      className="home-hero-logo"
    />
    <span className="home-hero-divider" />
    <img
      src="/images/calli-logo.png"
      alt="CALLI Centro Comunitario LGBTTTIQ+"
      className="home-hero-logo"
    />
  </div>
</div>

      <section style={{ background: 'linear-gradient(160deg, var(--color-accent-dim), var(--color-surface-2))' }}>
        <div className="container">
          <div className="about-page" style={{ maxWidth: '100%', padding: '3rem 0', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                Calli — Centro Comunitario LGBTTTIQANB+
              </h2>

              <img
                src="/images/calli-todes.png"
                alt="Equipo y comunidad de Calli frente al mural"
                style={{ width: '100%', maxWidth: 820, height: 380, objectFit: 'cover', borderRadius: 'var(--radius)', margin: '0.5rem 0' }}
              />

              <Link href="/calli" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                Ver más <ExternalLink size={13} />
              </Link>
            </div>

            <div className="reports-grid" style={{ justifyContent: 'center', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 280px))' }}>
              <div className="report-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
                <span className="report-card-title">
                  Josué Mirlo 417, Morelos Primera Secc,<br />50120 Toluca de Lerdo, Méx.
                </span>
                <a href="https://share.google/US9EOXm8NqBaC55Pg" target="_blank" rel="noreferrer" className="report-card-btn">
                  Cómo llegar <ExternalLink size={11} />
                </a>
              </div>

              <div className="report-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                <Phone size={20} style={{ color: 'var(--color-accent)' }} />
                <span className="report-card-title">722 605 5743</span>
                <a href="tel:+527226055743" className="report-card-btn">
                  Llamar <ExternalLink size={11} />
                </a>
              </div>

              <div className="report-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                <Clock size={20} style={{ color: 'var(--color-accent)' }} />
                <span className="report-card-title">Lun–Vie 10 a.m.–5 p.m.</span>
                <span className="report-card-title" style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>Sáb 12–3 p.m. · Dom cerrado</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}