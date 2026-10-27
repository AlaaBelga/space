import type { RoomDetail } from '../data/roomDetails'
import { getCopy, type Language } from '../i18n'

export function ProjectLinks({ detail, language = 'en' }: { detail: RoomDetail; language?: Language }) {
  const t = getCopy(language)
  if (!detail.links?.length) return null

  return (
    <div className="project-links" aria-label={t.projectLinks}>
      <span className="project-links-label">{t.projectLinks}</span>
      {detail.links.map((link) => (
        <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
          {link.label} ↗
        </a>
      ))}
    </div>
  )
}
