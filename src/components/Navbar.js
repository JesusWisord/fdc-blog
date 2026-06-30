'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/',          label: 'Noticias'   },
  { href: '/galeria',   label: 'Galería'    },
  { href: '/eventos',   label: 'Eventos'    },
  { href: '/alertafdc', label: '#AlertaFDC' },
  { href: '/acercade',  label: 'Acerca de'  },
]

const SOCIALS = [
  { href: 'https://twitter.com/FueraCloset_AC', icon: '/images/x-icon.png', label: 'X (Twitter)' },
  { href: 'https://www.facebook.com/fueradelclosetradio', icon: '/images/facebook-icon.png', label: 'Facebook' },
  { href: 'https://www.instagram.com/fueracloset_ac', icon: '/images/instagram-icon.png', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@fueradelcloset_ac', icon: '/images/tiktok-icon.png', label: 'TikTok' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <div className="pride-bar" />
      <nav className="navbar">
        <div className="navbar-inner">

          {/* Logos */}
          <Link href="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src="/images/fdc-icon.png" alt="Fuera del Clóset A. C." style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          <span style={{ width: 1, height: 24, background: 'var(--color-border)' }} />
          <img src="/images/calli-icon.png" alt="CALLI Centro Comunitario LGBTTTIQ+" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          </Link>

          {/* Links de navegación */}
          <ul className={`navbar-nav${open ? ' open' : ''}`}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Redes sociales */}
          <div className="navbar-social">
            {SOCIALS.map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <img src={icon} alt={label} style={{ width: 35, height: 35, objectFit: 'contain' }} />
              </a>
            ))}
          </div>

          {/* Botón hamburguesa (solo móvil) */}
          <button
            className="navbar-menu-btn"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </nav>
    </>
  )
}
