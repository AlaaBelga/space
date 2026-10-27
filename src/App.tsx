import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ROOM_DETAILS } from './data/roomDetails'
import { RoomPortal, RoomRect } from './components/RoomPortal'

interface FloorRoom {
  [index: number]: string
}

interface ToolboxWindow {
  id: string
  title: string
  badge: string
  skills: string[]
}

interface FloorItem {
  id: string
  number: string
  label: string
  subtitle: string
  isToolbox?: boolean
  rooms?: string[][]
  windows?: ToolboxWindow[]
}

const floors: FloorItem[] = [
  {
    id: 'education',
    number: '06',
    label: 'Education',
    subtitle: 'Where the foundations came from.',
    rooms: [
      ['2022—24', 'CPGE Moulay Idriss', 'Mathematics & Physics · Fez', 'Two intensive years in the MP track, ending with the CNC national exam and admission to INSEA.'],
      ['2024—27', 'INSEA', 'Data & Software Engineering', 'Software, statistics and economics—learning to ask what a company needs, not only how to build it.'],
    ],
  },
  {
    id: 'internships',
    number: '05',
    label: 'Internships',
    subtitle: 'Work that moved from prototype to production.',
    rooms: [
      ['JUL 2025', 'INPT', 'Data & Backend Intern', 'A human-in-the-loop scraping pipeline, MySQL database, PHP backend and live dashboards.'],
      ['SUMMER 2026', 'Capgemini', 'AI Software Engineering Intern', 'A patent-analysis pipeline for Stellantis. A manual one-hour workflow now runs in seconds.'],
    ],
  },
  {
    id: 'awards',
    number: '04',
    label: 'Awards',
    subtitle: 'Two podium finishes.',
    rooms: [
      ['2ND PLACE', 'Dermascope AI', 'International AI Hackathon', '15,000 images, 96.8% accuracy and a fully offline Android app built after the podium.'],
      ['3RD PLACE', 'DentaLens', 'INPT × MedConnect · 48h', 'A YOLOv8 dental diagnostic model, web app and interactive 3D—shipped by a team of two.'],
    ],
  },
  {
    id: 'teaching',
    number: '03',
    label: 'Teaching',
    subtitle: 'Explaining hard ideas clearly.',
    rooms: [
      ['2025—26', 'English tutor', 'Smart Touch Agdal', 'Taught A1 to B2 learners from age 12 to 47, using custom educational games and websites.'],
      ['NOW', 'Python teacher', 'Algorithmics Souissi', 'Turning complicated technical ideas into something a ten-year-old can follow.'],
    ],
  },
  {
    id: 'projects',
    number: '02',
    label: 'Projects',
    subtitle: 'Systems engineered for industrial and healthcare impact.',
    rooms: [
      ['2026', 'Predictive Maintenance', 'DevOps Project · IoT & Machine Learning · Industry', 'Early anomaly detection and remaining useful life (RUL) estimation for industrial machinery.'],
      ['SHIPPED', 'DermAI Android App', 'Offline Diagnostic Mobile App · Healthcare', 'A 100% offline edge AI mobile app with quantized neural vision models and sub-85ms camera inference.'],
    ],
  },
  {
    id: 'toolbox',
    number: '01',
    label: 'Toolbox',
    subtitle: 'The 6 architectural skill windows behind the work.',
    isToolbox: true,
    windows: [
      {
        id: 'toolbox-0',
        title: 'Programming',
        badge: '01.1',
        skills: ['Python', 'SQL', 'R', 'Java', 'JS / TS', 'Kotlin', 'Swift', 'PHP'],
      },
      {
        id: 'toolbox-1',
        title: 'Data & AI',
        badge: '01.2',
        skills: ['PySpark', 'Spark', 'Airflow', 'ETL / ELT', 'pandas', 'Machine Learning', 'Deep Learning', 'NLP'],
      },
      {
        id: 'toolbox-2',
        title: 'Databases & Visualization',
        badge: '01.3',
        skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Power BI', 'Tableau', 'Dash'],
      },
      {
        id: 'toolbox-3',
        title: 'Web & APIs',
        badge: '01.4',
        skills: ['FastAPI', 'Flask', 'Spring Boot', 'Node.js', 'React', 'Angular', 'REST APIs'],
      },
      {
        id: 'toolbox-4',
        title: 'Software Engineering',
        badge: '01.5',
        skills: ['OOP', 'Design Patterns', 'Git', 'Unit Testing', 'pytest', 'Jest', 'Mocha'],
      },
      {
        id: 'toolbox-5',
        title: 'Cloud & DevOps',
        badge: '01.6',
        skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux', 'CI / CD', 'Prometheus', 'Grafana'],
      },
    ],
  },
]

// How long the camera takes to fly to the room (keep in sync with --fly-ms in index.css)
const FLY_MS = 900

export default function App() {
  const [active, setActive] = useState('roof')
  const [progress, setProgress] = useState(0)
  const [zoomRoomId, setZoomRoomId] = useState<string | null>(null) // camera is flying to this room
  const [portalRoomId, setPortalRoomId] = useState<string | null>(null) // room interior is open
  const [portalRoomRect, setPortalRoomRect] = useState<RoomRect | null>(null)
  const [fly, setFly] = useState<CSSProperties>({}) // camera target, read by .building in CSS
  const flyTimer = useRef<number | undefined>(undefined)
  const [litWindows, setLitWindows] = useState<Record<string, boolean>>({})
  const [litRooms, setLitRooms] = useState<Record<string, boolean>>({})

  const toggleWindowLight = (winId: string) => {
    setLitWindows((prev) => ({
      ...prev,
      [winId]: !prev[winId],
    }))
  }

  useEffect(() => {
    let frame = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max ? scrollY / max : 0)
    }
    const scheduleUpdate = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }
    const observer = new IntersectionObserver(
      (items) => items.forEach((item) => item.isIntersecting && setActive(item.target.id)),
      { rootMargin: '-35% 0px -50%' },
    )
    document.querySelectorAll<HTMLElement>('[data-floor]').forEach((el) => observer.observe(el))
    addEventListener('scroll', scheduleUpdate, { passive: true })
    update()
    return () => {
      observer.disconnect()
      removeEventListener('scroll', scheduleUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const exitRoom = useCallback(() => {
    window.clearTimeout(flyTimer.current)
    setPortalRoomId(null)
    setPortalRoomRect(null)
    setZoomRoomId(null) // removes .chamber-entered, so the building flies back out
  }, [])

  // Lock page scroll while flying in/out so the camera target can't drift
  useEffect(() => {
    const root = document.documentElement
    if (zoomRoomId) {
      root.classList.add('flying')
      return
    }
    const t = window.setTimeout(() => root.classList.remove('flying'), FLY_MS)
    return () => window.clearTimeout(t)
  }, [zoomRoomId])

  // Escape while still flying in (before the room interior has opened) cancels the trip
  useEffect(() => {
    if (!zoomRoomId || portalRoomId) return
    const onKey = (ev: KeyboardEvent) => ev.key === 'Escape' && exitRoom()
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [zoomRoomId, portalRoomId, exitRoom])

  const enterRoom = (roomId: string, e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    if (roomId === 'education-0') {
      setLitRooms((prev) => ({ ...prev, [roomId]: !prev[roomId] }))
      return
    }

    // Ignore clicks while a fly-in / fly-out is in progress (rects would be measured mid-transform)
    if (document.documentElement.classList.contains('flying')) return

    const roomEl = e.currentTarget
    const building = roomEl.closest<HTMLElement>('.building')
    if (!building) return

    const rect = roomEl.getBoundingClientRect()
    const b = building.getBoundingClientRect()
    const vw = innerWidth
    const vh = innerHeight
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    // Scale so the room covers the viewport, capped so huge zooms stay smooth
    const scale = Math.min(Math.max(vw / rect.width, vh / rect.height), 3.2)

    setPortalRoomRect({
      left: Math.round(rect.left),
      top: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    })
    setFly({
      '--fly-ox': `${cx - b.left}px`, // zoom origin = centre of the clicked room (building coords)
      '--fly-oy': `${cy - b.top}px`,
      '--fly-x': `${vw / 2 - cx}px`, // ...then slide that point to the centre of the screen
      '--fly-y': `${vh / 2 - cy}px`,
      '--fly-s': String(scale),
    } as CSSProperties)
    setZoomRoomId(roomId)

    // Open the room interior just before the camera lands
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    window.clearTimeout(flyTimer.current)
    flyTimer.current = window.setTimeout(() => setPortalRoomId(roomId), reduceMotion ? 0 : FLY_MS - 150)
  }

  return (
    <main className="city">
      <div className="atmosphere" />
      <div className={`fly-veil ${zoomRoomId ? 'on' : ''}`} aria-hidden="true" />
      <aside className="elevator">
        <div className="elevator-head">AB<br />TOWER</div>
        <div className="shaft">
          <div className="car" style={{ top: `${progress * 92}%` }}>
            <span>{active === 'roof' ? 'R' : floors.find((floor) => floor.id === active)?.number ?? 'L'}</span>
          </div>
        </div>
        <nav>
          <a className={active === 'roof' ? 'active' : ''} href="#roof">R</a>
          {floors.map((floor) => (
            <a className={active === floor.id ? 'active' : ''} href={`#${floor.id}`} key={floor.id}>
              {floor.number}
            </a>
          ))}
          <a className={active === 'lobby' ? 'active' : ''} href="#lobby">L</a>
        </nav>
      </aside>

      <div className={`building ${zoomRoomId ? 'chamber-entered' : ''}`} style={fly}>
        <header className="roof floor" id="roof" data-floor>
          {/* Roof image background */}
          <div className="roof-video-wrap" aria-hidden="true">
            <img className="roof-image" src="/images/head.png" alt="" />
            <div className="roof-video-overlay" />
          </div>

          <div className="roof-cap">
            <span>Est. 2022</span>
            <span>Rabat, Morocco</span>
          </div>
          <div className="roof-sign">
            <p>AI &amp; software engineer</p>
            <h1>ALAA<br /><em>BELGA</em></h1>
            <div className="status"><i /> Available for PFE, 2027</div>
          </div>
          <a className="scroll-call" href="#education">Enter building <b>↓</b></a>
        </header>

        {floors.map((floor, floorIndex) => (
          <section className="floor office-floor" id={floor.id} data-floor key={floor.id}>
            <div className="floor-slab">
              <span>LEVEL {floor.number}</span>
              <strong>{floor.label}</strong>
              <span>AB/{floor.number}</span>
            </div>
            <div className="glass-wall">
              <div className="floor-intro">
                <span>{floor.number}</span>
                <h2>{floor.label}</h2>
                <p>{floor.subtitle}</p>
              </div>

              {floor.isToolbox ? (
                /* ── Level 01: Toolbox 6 Skill Windows ── */
                <div className="toolbox-windows-grid">
                  {floor.windows?.map((win) => {
                    const isLit = Boolean(litWindows[win.id])
                    return (
                      <div
                        className={`toolbox-window-card ${isLit ? 'lit' : ''}`}
                        key={win.id}
                        onClick={() => toggleWindowLight(win.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleWindowLight(win.id)
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Skill Window ${win.badge}: ${win.title}. Click to ${isLit ? 'turn off light' : 'turn on light'}.`}
                      >
                        <div className="window-transom-light" />
                        <div className="window-header">
                          <span className="window-badge">{win.badge}</span>
                          <span className="window-inspect-cue">{isLit ? 'LIGHT ON ☼' : 'SWITCH LIGHT ◒'}</span>
                        </div>
                        <h3 className="window-title">{win.title}</h3>
                        <div className="window-skills-wrap">
                          {win.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="window-skill-pill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                /* ── Standard 2-Chamber Layout ── */
                <div className="rooms">
                  {floor.rooms?.map((room, roomIndex) => {
                    const roomId = `${floor.id}-${roomIndex}`
                    const isRoomLit = Boolean(litRooms[roomId]) || zoomRoomId === roomId
                    const roomDetail = ROOM_DETAILS[roomId]
                    const roomLogos = roomDetail?.logos ?? (roomDetail?.logo ? [roomDetail.logo] : [])
                    return (
                      <article
                        className={`room room-${roomId} ${isRoomLit ? 'lit' : ''}`}
                        key={room[1]}
                        onClick={(e) => enterRoom(roomId, e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            enterRoom(roomId, e)
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={
                          roomId === 'education-0'
                            ? `${room[1]}. Click to turn the light ${isRoomLit ? 'off' : 'on'}.`
                            : `Enter chamber ${floor.number}.${roomIndex + 1}: ${room[1]}. Click to zoom inside.`
                        }
                      >
                        <div className="ceiling-light" />
                        <div className="room-top-bar">
                          <span className="room-inspect-tag">{isRoomLit ? 'LIGHT ON ☼' : 'ENTER ROOM ↗'}</span>
                          <div className="room-number">{floor.number}.{roomIndex + 1}</div>
                        </div>
                        <div className="room-copy">
                          <time>{room[0]}</time>
                          <h3>{room[1]}</h3>
                          {roomLogos.length > 0 && (
                            <div className="room-logos" aria-label={`${room[1]} logos`}>
                              {roomLogos.map((logo) => (
                                <img className="room-logo" key={logo} src={logo} alt="" aria-hidden="true" />
                              ))}
                            </div>
                          )}
                          {roomDetail?.clientLogo && (
                            <div className="room-client">
                              <span>{roomDetail.clientLabel}</span>
                              <img src={roomDetail.clientLogo} alt="Stellantis logo" />
                            </div>
                          )}
                          <h4>{room[2]}</h4>
                          <p>{room[3]}</p>
                        </div>
                        <div className="desk"><span /><span /></div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        ))}

        <footer className="floor lobby" id="lobby" data-floor>
          <div className="floor-slab"><span>GROUND</span><strong>Lobby</strong><span>AB/00</span></div>
          <div className="lobby-inner">
            <video
              className="lobby-video"
              src="/images/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="lobby-video-overlay" aria-hidden="true" />
            <p>THE DOORS ARE OPEN</p>
            <h2>Let's build<br /><em>something.</em></h2>
            <div className="lobby-links">
              <a href="mailto:alaabelga@gmail.com">EMAIL <span>↗</span></a>
              <a href="https://github.com/AlaaBelga">GITHUB <span>↗</span></a>
              <a href="https://linkedin.com/in/alaa-belga">LINKEDIN <span>↗</span></a>
            </div>
            <div className="doors"><span /><span /></div>
          </div>
        </footer>
        <div className="foundation"><span>ALAABELGA.SPACE</span><span>33.9716° N · 6.8498° W</span></div>
      </div>

      {/* Swoosh Zoom-in Portal View */}
      <RoomPortal
        detail={portalRoomId ? ROOM_DETAILS[portalRoomId] ?? null : null}
        roomRect={portalRoomRect}
        onClose={exitRoom}
      />
    </main>
  )
}
