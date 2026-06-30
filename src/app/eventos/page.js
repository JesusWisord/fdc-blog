import { getAllEvents } from '../../lib/posts'
import { MapPin, ExternalLink, Calendar } from 'lucide-react'

export const metadata = { title: 'Eventos' }

function formatDate(dateStr, opts) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-MX', opts)
}

export default function EventsPage() {
  const events = getAllEvents()
  const now    = new Date()

  const upcoming = events.filter(e => new Date(e.eventDate) >= now)
  const past     = events.filter(e => new Date(e.eventDate) < now)

  const EventCard = ({ event }) => {
    const isPast    = new Date(event.eventDate) < now
    const dayNum    = formatDate(event.eventDate, { day: 'numeric' })
    const monthStr  = formatDate(event.eventDate, { month: 'short' })
    const yearStr   = formatDate(event.eventDate, { year: 'numeric' })
    const timeStr   = formatDate(event.eventDate, { hour: '2-digit', minute: '2-digit' })

    return (
      <div style={{
        background: 'var(--color-surface)',
        border: `1px solid ${isPast ? 'var(--color-border)' : 'var(--color-accent)'}`,
        borderRadius: 'var(--radius)', overflow: 'hidden', opacity: isPast ? 0.6 : 1,
        display: 'flex',
      }}>
        {/* Fecha */}
        <div style={{
          background: isPast ? 'var(--color-surface-2)' : 'var(--color-accent)',
          padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', minWidth: 80, flexShrink: 0,
        }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-display)' }}>{dayNum}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85 }}>{monthStr}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{yearStr}</span>
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem', flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {event.title}
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Calendar size={13} /> {timeStr} hrs
            </span>
            {event.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <MapPin size={13} /> {event.location}
              </span>
            )}
          </div>
          {event.externalLink && (
            <a href={event.externalLink} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent)' }}>
              Más información <ExternalLink size={13} />
            </a>
          )}
        </div>

        {event.coverImage && (
          <div style={{ width: 120, flexShrink: 0, overflow: 'hidden' }}>
            <img src={event.coverImage} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="container">
      <div style={{ padding: '3rem 0' }}>
        <div className="section-header">
          <h1 className="section-title">Próximos Eventos</h1>
        </div>

        {upcoming.length === 0
          ? <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>No hay eventos próximos por el momento.</p>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {upcoming.map(e => <EventCard key={e.slug} event={e} />)}
            </div>
        }

        {past.length > 0 && (
          <>
            <div className="section-header" style={{ marginTop: '2rem' }}>
              <h2 className="section-title">Eventos Pasados</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {past.map(e => <EventCard key={e.slug} event={e} />)}
            </div>
          </>
        )}

        {events.length === 0 && (
          <div className="loading" style={{ flexDirection: 'column', gap: '1rem', height: '60vh' }}>
            <span style={{ fontSize: '3rem' }}>📅</span>
            <p>No hay eventos aún.</p>
          </div>
        )}
      </div>
    </main>
  )
}
