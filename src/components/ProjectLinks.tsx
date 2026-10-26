import type { RoomDetail } from '../data/roomDetails'

export function ProjectLinks({ detail }: { detail: RoomDetail }) {
  if (!detail.links?.length) return null

  return (
    <div className="project-links" aria-label="Project links">
      <span className="project-links-label">Explore the project</span>
      {detail.links.map((link) => (
        <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
          {link.label} ↗
        </a>
      ))}
    </div>
  )
}
