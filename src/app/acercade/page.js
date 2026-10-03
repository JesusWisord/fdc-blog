export const metadata = { title: 'Acerca de' }

const SECTIONS = [
  {
    title: '¿Qué es FDC?',
    body: 'Somos una organización de la sociedad civil, orientada a la promoción, difusión y defensa de los derechos humanos de la diversidad sexual y de género, además de la prevención de la discriminación motivada por la orientación sexual, expresión de género o identidad de género, en el Estado de México.',
  },
  {
    title: 'Misión',
    body: 'Brindar asesoría psicológica, médica y legal a las personas de la población LGBTTTI de la entidad que lo requieran, además de realizar acciones políticas, artísticas, audiovisuales y culturales que coadyuven a disminuir y prevenir la discriminación en su contra.',
  },
  {
    title: 'Visión',
    body: 'Ser un referente como asociación civil a nivel nacional que trabaja en la defensa de los derechos humanos de la población LGBTTTIQANB+ en el Estado de México.',
  },
]

const ESTRUCTURA = {
  title: '¿Cómo se conforma FDC?',
  items: [
    'Mesa Directiva – Asociadas, asociadxs y asociados',
    'Coordinaciones',
    'Voluntariado',
  ],
}

export default function AboutPage() {
  return (
    <main className="container">
      <div className="about-page">
        {SECTIONS.map(({ title, body }, i) => (
          <div key={title} style={{ marginTop: i === 0 ? 0 : '2.5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
              color: 'var(--color-accent)', textAlign: 'center', marginBottom: '1rem',
            }}>
              {title}
            </h2>
            <p style={{ textAlign: 'justify', textAlignLast: 'center' }}>{body}</p>
          </div>
        ))}

        <div style={{ marginTop: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
            color: 'var(--color-accent)', textAlign: 'center', marginBottom: '1rem',
          }}>
            {ESTRUCTURA.title}
          </h2>
          <ul style={{ maxWidth: 480, margin: '0 auto', color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.85 }}>
            {ESTRUCTURA.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
