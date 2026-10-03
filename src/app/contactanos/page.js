import { ExternalLink, Phone, Mail } from 'lucide-react'

export const metadata = { title: 'Contáctanos' }

const SOCIAL = [
  { label: 'Twitter / X', url: 'https://twitter.com/FueraCloset_AC', icon: '/images/x-icon.png' },
  { label: 'Facebook', url: 'https://www.facebook.com/fueradelclosetradio', icon: '/images/facebook-icon.png' },
  { label: 'Instagram', url: 'https://www.instagram.com/fueracloset_ac', icon: '/images/instagram-icon.png' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@fueradelcloset_ac', icon: '/images/tiktok-icon.png' },
]

export default function ContactanosPage() {
  return (
    <main className="container">
      <div className="about-page" style={{ paddingTop: '1.5rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>Contáctanos por nuestras redes sociales</h1>

        {/* Redes */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {SOCIAL.map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.2rem', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <img src={icon} alt={label} style={{ width: 32, height: 32, objectFit: 'contain' }} />
              {label} <ExternalLink size={13} />
            </a>
          ))}
        </div>

        {/* Contacto directo */}
        <div className="reports-grid" style={{ marginTop: '2.5rem', justifyContent: 'center', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 280px))' }}>
          <div className="report-card" style={{ alignItems: 'center', textAlign: 'center' }}>
            <Phone size={20} style={{ color: 'var(--color-accent)' }} />
            <span className="report-card-title">+52 722 605 5743</span>
            <a href="tel:+527226055743" className="report-card-btn">
              Llamar <ExternalLink size={11} />
            </a>
          </div>

          <div className="report-card" style={{ alignItems: 'center', textAlign: 'center' }}>
            <Mail size={20} style={{ color: 'var(--color-accent)' }} />
            <span className="report-card-title">radiofueradelcloset@gmail.com</span>
            <a href="mailto:radiofueradelcloset@gmail.com" className="report-card-btn">
              Enviar correo <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
