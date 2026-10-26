import { useEffect, useRef, useState } from 'react'
import { RoomDetail } from '../data/roomDetails'
import { PatentPipelinePlan } from './PatentPipelinePlan'
import { ChamberPlan } from './ChamberPlan'
import { ProjectFloorPlan } from './ProjectFloorPlan'
import { INSEAPlan } from './INSEAPlan'
import { TeachingRooms } from './TeachingRooms'
import { ProjectLinks } from './ProjectLinks'

export interface RoomRect {
  left: number
  top: number
  width: number
  height: number
}

interface RoomPortalProps {
  detail: RoomDetail | null
  roomRect: RoomRect | null
  onClose: () => void
}

export function RoomPortal({ detail, roomRect, onClose }: RoomPortalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const portalFloorRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    // Wait for swoosh-out animation to finish
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 320)
  }

  useEffect(() => {
    if (!detail) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [detail])

  useEffect(() => {
    const floor = portalFloorRef.current
    if (!floor) return

    let frame = 0
    const updateProgress = () => {
      const maxScroll = floor.scrollHeight - floor.clientHeight
      setScrollProgress(maxScroll > 0 ? floor.scrollTop / maxScroll : 1)
    }
    const scheduleProgressUpdate = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        updateProgress()
      })
    }

    updateProgress()
    floor.addEventListener('scroll', scheduleProgressUpdate, { passive: true })
    window.addEventListener('resize', scheduleProgressUpdate)
    return () => {
      floor.removeEventListener('scroll', scheduleProgressUpdate)
      window.removeEventListener('resize', scheduleProgressUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [detail])

  if (!detail) return null

  // Compute exact coordinates from the clicked room's position
  let styleVars: React.CSSProperties = {
    '--start-x': '0px',
    '--start-y': '0px',
    '--start-sx': '0.2',
    '--start-sy': '0.2',
    '--origin-x': '50%',
    '--origin-y': '50%',
  } as React.CSSProperties

  if (roomRect && typeof window !== 'undefined') {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const targetWidth = Math.min(1040, vw * 0.94)
    const targetHeight = Math.min(vh * 0.94, 860)

    const targetCenterX = vw / 2
    const targetCenterY = vh / 2

    const roomCenterX = roomRect.left + roomRect.width / 2
    const roomCenterY = roomRect.top + roomRect.height / 2

    const deltaX = Math.round(roomCenterX - targetCenterX)
    const deltaY = Math.round(roomCenterY - targetCenterY)
    const scaleX = Math.max(0.08, Number((roomRect.width / targetWidth).toFixed(3)))
    const scaleY = Math.max(0.08, Number((roomRect.height / targetHeight).toFixed(3)))

    const originXPct = Math.round((roomCenterX / vw) * 100)
    const originYPct = Math.round((roomCenterY / vh) * 100)

    styleVars = {
      '--start-x': `${deltaX}px`,
      '--start-y': `${deltaY}px`,
      '--start-sx': `${scaleX}`,
      '--start-sy': `${scaleY}`,
      '--origin-x': `${originXPct}%`,
      '--origin-y': `${originYPct}%`,
    } as React.CSSProperties
  }

  return (
    <div
      className={`room-portal-backdrop ${isClosing ? 'closing' : ''}`}
      style={styleVars}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Inside Chamber ${detail.roomNumber}: ${detail.title}`}
    >
      {/* Dynamic Swoosh Speed Tunnel Streaks */}
      <div className={`swoosh-speed-tunnel ${isClosing ? 'closing' : ''}`} aria-hidden="true" />
      <div className={`swoosh-radial-burst ${isClosing ? 'closing' : ''}`} aria-hidden="true" />

      <div
        className={`room-portal-shell ${isClosing ? 'closing' : ''}`}
        style={styleVars}
      >
        {/* Slab Header */}
        <div className="slab portal-slab">
          <span>LEVEL {detail.floorNumber}</span>
          <strong className="portal-title">
            {detail.logo && (
              <img className="portal-logo" src={detail.logo} alt="" aria-hidden="true" />
            )}
            <span>{detail.title} · CHAMBER {detail.roomNumber}</span>
          </strong>
          <button
            className="portal-exit-btn"
            onClick={handleClose}
            type="button"
            aria-label="Exit room and return to tower"
          >
            EXIT ROOM [ESC ✕]
          </button>
        </div>

        {/* Room Interior Content */}
        <div className="floor portal-floor" ref={portalFloorRef}>
          <aside
            className={`room-progress ${scrollProgress >= 0.99 ? 'complete' : ''}`}
            aria-label={scrollProgress >= 0.99 ? 'Room fully viewed' : 'Scroll to see the rest of the room'}
          >
            <span className="room-progress-label">{scrollProgress >= 0.99 ? 'ROOM SEEN' : 'SCROLL DOWN'}</span>
            <span className="room-progress-track">
              <span style={{ height: `${Math.max(8, scrollProgress * 100)}%` }} />
            </span>
            <span className="room-progress-percent">{Math.round(scrollProgress * 100)}%</span>
          </aside>
          {/* Hanging Architectural Light Bulb in Top Middle */}
          <div className="portal-ceiling-fixture" aria-hidden="true">
            <div className="portal-bulb-wire" />
            <div className="portal-bulb-socket" />
            <div className="portal-bulb-glass">
              <div className="portal-bulb-filament" />
            </div>
            <div className="portal-bulb-cone" />
          </div>

          <div className="glass portal-glass">
            {detail.id === 'education-1' ? (
              <INSEAPlan />
            ) : detail.id === 'teaching-0' || detail.id === 'teaching-1' ? (
              <TeachingRooms roomId={detail.id} />
            ) : detail.id === 'internships-1' ? (
              <PatentPipelinePlan />
            ) : ['awards-0', 'awards-1', 'projects-0', 'projects-1', 'internships-0'].includes(detail.id) ? (
              <ProjectFloorPlan planId={detail.id} />
            ) : (
              <ChamberPlan detail={detail} onClose={handleClose} />
            )}
            <ProjectLinks detail={detail} />
          </div>
        </div>

        {/* Foundation Base Bar */}
        <div className="foundation portal-foundation">
          <span>ALAABELGA.SPACE // CHAMBER {detail.roomNumber}</span>
          <button className="portal-bottom-exit" onClick={handleClose} type="button">
            RETURN TO ELEVATOR [ESC]
          </button>
        </div>
      </div>
    </div>
  )
}
