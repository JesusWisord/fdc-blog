'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart } from 'lucide-react'

const NAV_LINKS = [
  { href: '/acercade',   label: 'Acerca de'   },
  { href: '/calli',      label: 'Calli'       },
  { href: '/materiales', label: 'Materiales'  },
  { href: '/contactanos',label: 'Contáctanos' },
  { href: '/galeria',    label: 'Galería'     },
  { href: '/eventos',    label: 'Eventos'     },
  { href: '/alertafdc',  label: '#AlertaFDC'  },
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

          {/* Dona Aquí + botón hamburguesa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifySelf: 'end' }}>
            <Link href="/donar" className="navbar-donate" onClick={() => setOpen(false)}>
              <Heart size={14} fill="currentColor" />
              Dona Aquí
            </Link>
            <button
              className="navbar-menu-btn"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </nav>
    </>
  )
}
