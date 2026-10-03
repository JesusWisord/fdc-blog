import ServicesSlider from '../components/ServicesSlider'

const INCIDENCIA = [
  'Posicionamiento y aprobación a favor del matrimonio igualitario y ley de identidad de género en el Estado de México.',
  'Reforma estatal para prohibir y sancionar las "terapias de conversión" (ECOSIG).',
  'Manifestaciones ante actos discriminatorios; exigencia por justicia ante crímenes de odio.',
  'Interposición de amparo para exigencia de presupuesto público LGBTTTIQANB+.',
]

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
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700,
              color: 'var(--color-accent)', marginBottom: '1.5rem',
            }}>
              Nuestros servicios
            </h2>
            <ServicesSlider />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="about-page" style={{ maxWidth: '100%', padding: '3rem 0', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700,
              color: 'var(--color-accent)', marginBottom: '1.5rem',
            }}>
              Incidencia política
            </h2>

            <ul style={{ maxWidth: 640, margin: '0 auto', textAlign: 'left', color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.85 }}>
              {INCIDENCIA.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}