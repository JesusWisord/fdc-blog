export const metadata = { title: 'Organigrama' }

const COORDINACIONES = [
  'Coordinación de Calli',
  'Coordinación de Prevención y Atención a VIH e ITS',
  'Coordinación de Atención a la Salud Mental',
  'Coordinación de Voluntariado, Servicio Social y Prácticas Profesionales',
  'Coordinación de Derechos Humanos, Género, Desarrollo y Cultura de Paz',
  'Coordinación de Capacitación y Vinculación',
  'Coordinación de Difusión Cultural',
]

export default function OrganigramaPage() {
  return (
    <main className="container">
      <div className="about-page" style={{ maxWidth: 1040 }}>
        <h1 style={{ textAlign: 'center' }}>Organigrama</h1>

        <div className="org-chart">
          <div className="org-node org-node-root">Presidencia</div>
          <span className="org-line" />

          <div className="org-node">Secretaría</div>
          <span className="org-line" />

          <div className="org-grid">
            {COORDINACIONES.map(item => (
              <div key={item} className="org-node">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
