import Link from 'next/link'

const SOCIALS = [
  { href: 'https://twitter.com/FueraCloset_AC', icon: '/images/x-icon.png', label: 'X (Twitter)' },
  { href: 'https://www.facebook.com/fueradelclosetradio', icon: '/images/facebook-icon.png', label: 'Facebook' },
  { href: 'https://www.instagram.com/fueracloset_ac', icon: '/images/instagram-icon.png', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@fueradelcloset_ac', icon: '/images/tiktok-icon.png', label: 'TikTok' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img src="/images/fdc-logo.png" alt="Fuera del Clóset A. C." style={{ height: 44 }} />
              <img src="/images/calli-logo.png" alt="CALLI Centro Comunitario LGBTTTIQ+" style={{ height: 40 }} />
            </div>
            <p className="footer-desc">
              Organización civil de derechos humanos que documenta y visibiliza
              la situación de las personas LGBTTTI+ en México, con énfasis en
              el Estado de México.
            </p>
          </div>

          <div>
            <p className="footer-col-title">Secciones</p>
            <ul className="footer-links">
              <li><Link href="/organigrama">Organigrama</Link></li>
              <li><Link href="/equipo">Conoce al equipo</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Informes</p>
            <ul className="footer-links">
              <li>
                <a href="https://drive.google.com/file/d/1xhJAbDHjSgcC9S_CBOXRJD3E7bZqLo42/view" target="_blank" rel="noreferrer">
                  Informe Anual 2021
                </a>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/1ZHDgZ1Yaa9OI_JykihnYvwDe_6lOMKZg/view" target="_blank" rel="noreferrer">
                  Informe Anual 2022
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© {year} Fuera del Clóset A. C.</span>
          <div className="footer-social">
            {SOCIALS.map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <img src={icon} alt={label} style={{ width: 40, height: 40, objectFit: 'contain' }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}