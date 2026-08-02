import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Next.js carga las fuentes de Google de forma optimizada automáticamente
// (sin peticiones externas en producción, mejora la velocidad)
export const metadata = {
  title: {
    default: 'Inicio | Fuera del Clóset A. C.',
    template: '%s | Fuera del Clóset A. C.',
  },
  description: 'Blog colaborativo de Fuera del Clóset A. C. — Organización civil de derechos humanos LGBTTTI+ en México.',
   icons: {
    icon: '/images/fdc-icon.png',
  },
  openGraph: {
    siteName: 'Fuera del Clóset A. C.',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@FueraCloset_AC',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google Fonts — Playfair Display + DM Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
