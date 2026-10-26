import { useState, useRef } from 'react'

interface RoomItem {
  n: number
  t: string
  x: number
  y: number
  w: number
  h: number
  i: string
  o: string
  d: string
}

const R: RoomItem[] = [
  {
    n: 1,
    t: 'Document Parser',
    x: 50,
    y: 100,
    w: 170,
    h: 160,
    i: 'Patent DOCX or PDF, uploaded',
    o: 'Raw text',
    d: 'The entrance hall. The uploaded patent file is turned into raw text before anything else happens.',
  },
  {
    n: 2,
    t: 'Metadata Extraction',
    x: 220,
    y: 100,
    w: 170,
    h: 160,
    i: 'Raw text',
    o: 'Cleaned concepts to room 3, prior art to room 4',
    d: 'The only room with two exits. Metadata is extracted here and the document splits into two streams.',
  },
  {
    n: 3,
    t: 'ML Classifier',
    x: 390,
    y: 40,
    w: 180,
    h: 140,
    i: 'Cleaned concepts',
    o: 'Results to room 5',
    d: 'Receives the cleaned concepts from room 2 and hands its output on to the database.',
  },
  {
    n: 4,
    t: 'LLM Abstract Rewriter',
    x: 390,
    y: 180,
    w: 180,
    h: 140,
    i: 'Prior art',
    o: 'Results to room 5',
    d: 'Receives the prior art from room 2, rewrites the abstract, and passes it on to the database.',
  },
  {
    n: 5,
    t: 'SQLite Database',
    x: 570,
    y: 100,
    w: 170,
    h: 160,
    i: 'Output of rooms 3 and 4',
    o: 'Stored records to room 6',
    d: 'Both branches converge here. Your diagram draws it as a diamond, so on the plan it is the vault: two doors in, one door out.',
  },
  {
    n: 6,
    t: 'Generated Word Report',
    x: 740,
    y: 100,
    w: 170,
    h: 160,
    i: 'Stored records',
    o: 'Word report, out to the street',
    d: 'The last room. The report is generated from what the database holds and leaves through the exit door.',
  },
]

const D: [number, number][] = [
  [50, 165],
  [220, 165],
  [390, 125],
  [390, 205],
  [570, 125],
  [570, 205],
  [740, 165],
  [910, 165],
]

const P = {
  p0: 'M10 180H305',
  pa: 'M305 180V140H655V180',
  pb: 'M305 180V220H655V180',
  pc: 'M655 180H1030',
}

const TAGS: [string, number, number][] = [
  ['UPLOAD', 6, 174],
  ['RAW TEXT', 258, 174],
  ['CLEANED CONCEPTS', 428, 134],
  ['REPORT OUT', 948, 174],
]

export function PatentPipelinePlan() {
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null)
  const [activeFills, setActiveFills] = useState<number[]>([])
  const [isTracing, setIsTracing] = useState(false)

  const liveRef = useRef<{
    [k: string]: {
      h: SVGPathElement | null
      d: SVGCircleElement | null
      L: number
    }
  }>({})

  const registerHotPath = (k: string, el: SVGPathElement | null) => {
    if (el) {
      const L = el.getTotalLength()
      el.style.strokeDasharray = `${L}`
      el.style.strokeDashoffset = `${L}`
      if (!liveRef.current[k]) {
        liveRef.current[k] = { h: el, d: null, L }
      } else {
        liveRef.current[k].h = el
        liveRef.current[k].L = L
      }
    }
  }

  const registerDot = (k: string, el: SVGCircleElement | null) => {
    if (el) {
      if (!liveRef.current[k]) {
        liveRef.current[k] = { h: null, d: el, L: 0 }
      } else {
        liveRef.current[k].d = el
      }
    }
  }

  const runSegment = (ks: (keyof typeof P)[]): Promise<void> => {
    return new Promise((resolve) => {
      const validKeys = ks.filter((k) => liveRef.current[k]?.h)
      if (validKeys.length === 0) return resolve()

      const mx = Math.max(...validKeys.map((k) => liveRef.current[k].L))
      const dur = mx / 0.28
      const startTime = performance.now()

      const step = (now: number) => {
        const q = Math.min(1, (now - startTime) / dur)

        validKeys.forEach((k) => {
          const o = liveRef.current[k]
          if (!o.h || !o.d) return
          const l = Math.min(o.L, q * mx)
          o.h.style.strokeDashoffset = `${o.L - l}`
          const pt = o.h.getPointAtLength(l)
          o.d.setAttribute('cx', `${pt.x}`)
          o.d.setAttribute('cy', `${pt.y}`)

          R.forEach((r) => {
            if (pt.x > r.x + 3 && pt.x < r.x + r.w - 3 && pt.y > r.y && pt.y < r.y + r.h) {
              setActiveFills((prev) => (prev.includes(r.n) ? prev : [...prev, r.n]))
              setSelectedRoom(r)
            }
          })
        })

        if (q < 1) {
          requestAnimationFrame(step)
        } else {
          resolve()
        }
      }

      requestAnimationFrame(step)
    })
  }

  const handleTrace = async () => {
    if (isTracing) return
    setIsTracing(true)
    setActiveFills([])

    // Reset dash offsets & dots
    for (const k in liveRef.current) {
      const o = liveRef.current[k]
      if (o.h) o.h.style.strokeDashoffset = `${o.L}`
      if (o.d) o.d.setAttribute('cx', '-20')
    }

    await runSegment(['p0'])
    await runSegment(['pa', 'pb'])
    await runSegment(['pc'])

    for (const k in liveRef.current) {
      liveRef.current[k].d?.setAttribute('cx', '-20')
    }
    setIsTracing(false)
  }

  return (
    <div className="patent-building-section">
      <h1>Patent pipeline, ground floor</h1>
      <p className="sub">
        Your architecture diagram drawn as a building: each stage is a room, each arrow is a doorway. Hover or tap a room for its inputs and outputs.
      </p>

      <div className="bar">
        <button id="go" onClick={handleTrace} disabled={isTracing} type="button">
          {isTracing ? 'Tracing…' : activeFills.length > 0 ? 'Trace again' : 'Trace a patent'}
        </button>
        <span className="hint">Follows one upload from the street to the report.</span>
      </div>

      <div className="plan">
        <svg
          id="s"
          viewBox="0 0 1040 380"
          role="img"
          aria-labelledby="t d"
        >
          <title id="t">Floor plan of the patent analysis pipeline</title>
          <desc id="d">
            Six rooms: document parser, metadata extraction, ML classifier, LLM abstract rewriter, SQLite database and generated Word report. Metadata extraction feeds both the classifier and the rewriter, which both feed the database.
          </desc>

          <defs>
            <marker
              id="ar"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L8 4L0 8z" style={{ fill: 'var(--acc)' }} />
            </marker>

            <mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="1040" height="380">
              <rect width="1040" height="380" fill="#fff" />
              {D.map(([x, y], idx) => (
                <rect key={idx} x={x - 6} y={y} width="12" height="30" fill="#000" />
              ))}
            </mask>
          </defs>

          {/* Rooms (Fills) */}
          <g id="rooms">
            {R.map((r) => {
              const isOn = activeFills.includes(r.n)
              return (
                <rect
                  key={r.n}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  className={`room ${isOn ? 'on' : ''}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`Room ${r.n}: ${r.t}`}
                  onMouseEnter={() => setSelectedRoom(r)}
                  onFocus={() => setSelectedRoom(r)}
                  onClick={() => setSelectedRoom(r)}
                />
              )
            })}
          </g>

          {/* Furniture & Lamps */}
          <g id="furn">
            {/* Ceiling Lamps (elevated to roofline so they never collide with room titles) */}
            {R.map((r) => (
              <rect
                key={`lamp-${r.n}`}
                x={r.x + r.w * 0.3}
                y={r.y + 4}
                width={r.w * 0.4}
                height={2}
                className="lamp"
              />
            ))}

            {/* Room 1 Desks */}
            {[0, 1, 2].map((i) =>
              [0, 1].map((j) => (
                <rect key={`r1-g1-${i}-${j}`} x={66 + i * 14} y={215 + j * 17} width={14} height={17} className="f" />
              )),
            )}
            <rect x="66" y="215" width="44" height="34" className="f" />

            {/* Room 2 Desks */}
            {[0, 1, 2, 3].map((i) =>
              [0, 1].map((j) => (
                <rect key={`r2-g-${i}-${j}`} x={235 + i * 12} y={205 + j * 16} width={12} height={16} className="f" />
              )),
            )}

            {/* Room 3 Cluster */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={`r3-g-${i}`} x={410 + i * 16} y={70} width={16} height={26} className="f" />
            ))}

            {/* Room 4 Desks */}
            <rect x="410" y="262" width="90" height="24" className="f" />
            <circle cx="455" cy="300" r="7" className="f" />

            {/* Room 5 Vault Racks */}
            {[0, 1, 2].map((i) =>
              [0, 1, 2].map((j) => (
                <rect key={`r5-g1-${i}-${j}`} x={690 + i * 12} y={125 + j * 12} width={12} height={12} className="f" />
              )),
            )}
            {[0, 1, 2].map((i) =>
              [0, 1, 2].map((j) => (
                <rect key={`r5-g2-${i}-${j}`} x={690 + i * 12} y={205 + j * 12} width={12} height={12} className="f" />
              )),
            )}

            {/* Room 6 Desks */}
            <rect x="790" y="222" width="90" height="28" className="f" />
            <rect x="805" y="228" width="24" height="16" className="f" />
          </g>

          {/* Wall Outlines with Mask */}
          <g id="wallg" mask="url(#m)">
            {R.map((r) => (
              <rect key={`wall-${r.n}`} x={r.x} y={r.y} width={r.w} height={r.h} className="wall" />
            ))}
          </g>

          {/* Doors & Arcs */}
          <g id="doors">
            {D.map(([x, y], idx) => (
              <g key={`door-${idx}`}>
                <path d={`M${x} ${y}h30`} className="leaf" />
                <path d={`M${x + 30} ${y}A30 30 0 0 1 ${x} ${y + 30}`} className="arc" />
              </g>
            ))}
          </g>

          {/* Routes */}
          <g id="routes">
            {Object.entries(P).map(([k, d]) => (
              <path key={`base-${k}`} d={d} className="rt" markerEnd="url(#ar)" />
            ))}
            {Object.entries(P).map(([k, d]) => (
              <path key={`hot-${k}`} ref={(el) => registerHotPath(k, el)} d={d} className="hot" />
            ))}
            {Object.keys(P).map((k) => (
              <circle
                key={`dot-${k}`}
                ref={(el) => registerDot(k, el)}
                r="5"
                className="dot"
                cx="-20"
                cy="-20"
              />
            ))}
          </g>

          {/* Large, high-contrast Room Titles & Stream Tags */}
          <g id="labels">
            {R.map((r) => {
              const isSelected = selectedRoom?.n === r.n
              const isOn = activeFills.includes(r.n)
              return (
                <text
                  key={`label-${r.n}`}
                  x={r.x + 12}
                  y={r.y + 26}
                  className={`lb ${isSelected || isOn ? 'lb-active' : ''}`}
                >
                  <tspan className="lb-num">0{r.n}</tspan>
                  <tspan className="lb-sep"> · </tspan>
                  <tspan className="lb-txt">{r.t.toUpperCase()}</tspan>
                </text>
              )
            })}
            {TAGS.map(([txt, x, y]) => (
              <text key={txt} x={x} y={y} className="ed">
                {txt}
              </text>
            ))}
          </g>

          {/* Dimension Line */}
          <line className="dim" x1="50" y1="350" x2="910" y2="350" />
          <path className="dim" d="M50 345v10M910 345v10" />
          <text className="dt" x="480" y="366">
            Six rooms, one entrance, one exit. Not to scale.
          </text>
        </svg>
      </div>

      {/* Info Card */}
      <div id="card" aria-live="polite">
        {selectedRoom ? (
          <>
            <p className="k">Room {selectedRoom.n}</p>
            <h2>{selectedRoom.t}</h2>
            <dl>
              <dt>In</dt>
              <dd>{selectedRoom.i}</dd>
              <dt>Out</dt>
              <dd>{selectedRoom.o}</dd>
            </dl>
            <p>{selectedRoom.d}</p>
          </>
        ) : (
          <>
            <p className="k">No room selected</p>
            <h2>Walk the building</h2>
            <p>Hover a room, tab to it, or press “Trace a patent” to watch a document pass through every stage.</p>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="legend">
        <span>
          <svg viewBox="0 0 34 14">
            <path d="M1 12H33" stroke="#b9b8b1" strokeWidth="4" />
          </svg>
          wall
        </span>
        <span>
          <svg viewBox="0 0 34 14">
            <path d="M4 12V2M4 2A10 10 0 0 1 14 12" fill="none" stroke="currentColor" strokeDasharray="2 2" />
          </svg>
          door swing
        </span>
        <span>
          <svg viewBox="0 0 34 14">
            <path d="M1 7H33" stroke="var(--acc)" strokeWidth="2" strokeDasharray="5 4" />
          </svg>
          patent route
        </span>
      </div>
    </div>
  )
}
