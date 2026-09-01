import { ExternalLink } from 'lucide-react'

export const metadata = { title: 'Acerca de' }

const SOCIAL = [
  { label: 'Twitter / X', url: 'https://twitter.com/FueraCloset_AC', icon: '/images/x-icon.png' },
  { label: 'Facebook', url: 'https://www.facebook.com/fueradelclosetradio', icon: '/images/facebook-icon.png' },
  { label: 'Instagram', url: 'https://www.instagram.com/fueracloset_ac', icon: '/images/instagram-icon.png' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@fueradelcloset_ac', icon: '/images/tiktok-icon.png' },
]

export default function AboutPage() {
  return (
    <main className="container">
      <div className="about-page">
        <h1 style={{ textAlign: 'center' }}>Acerca de Fuera del Clóset A. C.</h1>

        <div style={{ textAlign: 'justify', textAlignLast: 'center' }}>
          <p>Fuera del Clóset A. C. es una organización de la sociedad civil con sede en Toluca, Estado de México, dedicada a la defensa y promoción de los derechos humanos de las personas lesbianas, gays, bisexuales, transexuales, transgénero, travestis e intersexuales (LGBTTTI+).</p>

          <p>A través de documentación, difusión y acciones de incidencia, buscamos visibilizar la situación de derechos humanos de la comunidad LGBTTTI+ en México, con especial énfasis en el Estado de México.</p>

          <p>Nuestra organización colabora con colectivos, activistas y personas afectadas para generar información y promover cambios estructurales que garanticen una vida digna y libre de violencia para todas las personas.</p>
        </div>

        {/* Redes */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {SOCIAL.map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.2rem', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <img src={icon} alt={label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
              {label} <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
