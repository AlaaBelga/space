import { RoomDetail } from '../data/roomDetails'
import { getCopy, type Language } from '../i18n'

interface ChamberPlanProps {
  detail: RoomDetail
  onClose: () => void
  language?: Language
}

export function ChamberPlan({ detail, onClose, language = 'en' }: ChamberPlanProps) {
  const t = getCopy(language)
  return (
    <div className="patent-building-section chamber-generic-section">
      <div className="chamber-header-row">
        <div>
          <h1>{detail.title}</h1>
          <p className="sub">{detail.summary}</p>
        </div>
        <button className="chamber-close-btn" onClick={onClose} type="button">
          {t.collapse}
        </button>
      </div>

      {/* Stats bar matching building */}
      <div className="chamber-stats-bar">
        {detail.stats.map((s, idx) => (
          <div key={idx} className="chamber-stat">
            <span className="stat-num">{s.value}</span>
            <span className="stat-name">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Blueprint Architecture Spec Card */}
      <div id="card" aria-live="polite">
        <p className="k">{detail.role} · {detail.location}</p>
        <h2>{t.architecture}</h2>
        <dl>
          <dt>{t.challenge}</dt>
          <dd>{detail.problem}</dd>
          <dt>{t.solution}</dt>
          <dd>{detail.solution}</dd>
        </dl>
        <div className="chamber-specs-grid">
          {detail.architecture.map((item, idx) => (
            <div key={idx} className="chamber-spec-item">
              <span className="spec-dot">0{idx + 1}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies pills */}
      <div className="chamber-tech-row">
        <span className="tech-title">{t.arsenal}</span>
        {detail.technologies.map((t, idx) => (
          <span key={idx} className="chamber-tech-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
