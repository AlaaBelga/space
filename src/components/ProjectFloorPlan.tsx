import { useState } from 'react'

interface PlanRoom {
  title: string
  x: number
  y: number
  width: number
  height: number
  input: string
  output: string
  description: string
}

interface ProjectPlan {
  heading: string
  subtitle: string
  note: string
  rooms: PlanRoom[]
  routes: string[]
  labels: [string, number, number][]
}

interface ProjectImage {
  src: string
  title: string
  explanation: string
}

const projectImages: Record<string, ProjectImage[]> = {
  'awards-0': [],
  'awards-1': [
    {
      src: '/images/dentaLens/xray.jpeg',
      title: 'Dental X-ray input',
      explanation: 'The image entering DentaLens before YOLOv8 detects suspicious dental lesions.',
    },
    {
      src: '/images/dentaLens/landing.png',
      title: 'Diagnostic web interface',
      explanation: 'The clinician-facing web view that presents the model output in an accessible format.',
    },
    {
      src: '/images/dentaLens/sef.jpg',
      title: 'Trained lesion-detection model',
      explanation: 'A YOLOv8 model trained on more than 20,000 images with a high accuracy rate of more than 90%.',
    },
  ],
  'projects-0': [
    {
      src: '/images/predective maintenance/predictive.png',
      title: 'Predictive engine',
      explanation: 'The predictive side of the platform, where sensor data becomes risk, anomaly, and remaining-useful-life signals.',
    },
    {
      src: '/images/predective maintenance/bridge_p1_p2.png',
      title: 'Passerelle between engines',
      explanation: 'The bridge carries high-risk events from the predictive service to the remediation engine through Kafka.',
    },
    {
      src: '/images/predective maintenance/03_api_swagger.png',
      title: 'Prediction API',
      explanation: 'The API surface used to expose predictions and connect the model service to the event-driven system.',
    },
    {
      src: '/images/predective maintenance/02_docker_services.png',
      title: 'Containerized services',
      explanation: 'Docker services package the predictive, remediation, messaging, and observability pieces together.',
    },
    {
      src: '/images/predective maintenance/tests_passed.png',
      title: 'Validation and tests',
      explanation: 'The passing test suite protects the event flow, playbooks, incident logging, and service contracts.',
    },
  ],
  'projects-1': [
    {
      src: '/images/dermAI/splash-screen.png',
      title: 'Offline app entry',
      explanation: 'The mobile starting point for the guided skin-condition triage flow.',
    },
    {
      src: '/images/dermAI/tutorial.png',
      title: 'Guided onboarding',
      explanation: 'The tutorial explains the app before the user begins the structured assessment.',
    },
    {
      src: '/images/dermAI/body-model-selection.png',
      title: 'Body-region selection',
      explanation: 'The 3D body model narrows the context before an image is captured.',
    },
    {
      src: '/images/dermAI/image-input.png',
      title: 'Image input',
      explanation: 'The camera or gallery step supplies the visual signal for on-device inference.',
    },
    {
      src: '/images/dermAI/questionnaire-results.png',
      title: 'Questionnaire and results',
      explanation: 'Structured symptoms add context that a single photo cannot provide before the ranked result is shown.',
    },
    {
      src: '/images/dermAI/dermAI.png',
      title: 'DermAI application',
      explanation: 'The complete offline triage experience, designed around privacy-preserving local inference.',
    },
  ],
}

const plans: Record<string, ProjectPlan> = {
  'awards-0': {
    heading: 'Dermascope AI, ground floor',
    subtitle: 'One photo walks in and the building forks it to two models. Hugging Face is the street outside.',
    note: 'Six rooms, one fork, one exit. Not to scale.',
    rooms: [
      ['Photo Intake', 50, 100, 160, 160, 'Skin photo, uploaded', 'Image tensor', 'A photo of the skin is uploaded from the web interface.'],
      ['Preprocessing & Routing', 210, 100, 160, 160, 'Image tensor', 'Public route or professional route', 'The request is sent to the public model or the professional one.'],
      ['Public Screening Model', 370, 40, 180, 140, 'Routed image', '9-class prediction', 'Classifies 9 common non-cancerous skin conditions.'],
      ['Cancer Detection Model', 370, 180, 180, 140, 'Routed image', '4-class prediction', 'For professional use, including melanoma and basal-cell carcinoma.'],
      ['Flask API', 550, 100, 170, 160, 'Model outputs', 'JSON result', 'A Flask and PyTorch server serving both models.'],
      ['Web Interface', 720, 100, 170, 160, 'JSON result', 'Result shown to the user', 'HTML, CSS and JavaScript deployed to Hugging Face.'],
    ].map(([title, x, y, width, height, input, output, description]) => ({ title, x, y, width, height, input, output, description } as PlanRoom)),
    routes: ['M10 180H300', 'M300 180V130H640V180', 'M300 180V230H640V180', 'M640 180H1030'],
    labels: [['UPLOAD', 8, 174], ['IMAGE', 240, 174], ['9 CLASSES', 405, 124], ['4 CATEGORIES', 405, 224], ['HUGGING FACE', 920, 174]],
  },
  'awards-1': {
    heading: 'DentaLens, ground floor',
    subtitle: 'A short plan for a 48-hour build. One detector, then two exits: a web app and a Blender 3D viewer.',
    note: 'Four rooms, built in two days. Not to scale.',
    rooms: [
      ['Scan Intake', 60, 110, 200, 160, 'Dental X-ray', 'Image to detector', 'A dental image comes in for analysis.'],
      ['YOLOv8 Detector', 260, 110, 200, 160, 'Image', 'Lesion boxes', 'The model trained to detect dental lesions.'],
      ['Web App', 460, 40, 220, 140, 'Detected lesions', 'Interactive diagnostic view', 'An interface a clinician can read at a glance.'],
      ['3D Viewer', 460, 180, 220, 140, 'Detected lesions', 'Interactive 3D visualization', 'Produced in Blender during the hackathon.'],
    ].map(([title, x, y, width, height, input, output, description]) => ({ title, x, y, width, height, input, output, description } as PlanRoom)),
    routes: ['M20 190H360', 'M360 190V130H790', 'M360 190V230H790'],
    labels: [['X-RAY', 10, 184], ['LESIONS', 490, 124], ['LESIONS', 490, 224], ['CLINICIAN', 700, 124], ['VIEWER', 700, 224]],
  },
  'projects-1': {
    heading: 'DermAI, the offline corridor',
    subtitle: 'Four intake stages, then on-device inference. The right wall has no door: nothing leaves the device.',
    note: 'One corridor, one entrance, no network. Not to scale.',
    rooms: [
      ['Role Select', 50, 130, 150, 120, 'Patient or professional', 'Role-based flow', 'Guided onboarding.'],
      ['3D Body Model', 200, 130, 150, 120, 'Role', 'Body region', 'SceneView removes doubt about where the photo comes from.'],
      ['Image Capture', 350, 130, 150, 120, 'Body region', 'Skin image', 'CameraX live capture or gallery import.'],
      ['Symptom Questionnaire', 500, 130, 150, 120, 'Image', 'Image plus context', 'Captures context a photo cannot show.'],
      ['On-device Inference', 650, 130, 150, 120, 'Image and context', 'Ranked candidates', 'PyTorch Lite runs on the device.'],
      ['Top-3 Result', 800, 130, 150, 120, 'Ranked candidates', 'Shortlist with risk label', 'A triage aid, not a diagnostic device.'],
    ].map(([title, x, y, width, height, input, output, description]) => ({ title, x, y, width, height, input, output, description } as PlanRoom)),
    routes: ['M10 190H875'],
    labels: [['PATIENT', 8, 184], ['NO NETWORK', 955, 184]],
  },
  'projects-0': {
    heading: 'Predictive Maintenance, two wings',
    subtitle: 'Two independent wings joined by a skybridge. The west wing predicts, the east wing acts. Kafka is the central hall.',
    note: 'Two wings, one bridge. Not to scale.',
    rooms: [
      ['CMAPSS Simulator', 30, 100, 150, 120, 'Raw sensor data', 'Sensor payload', 'Replays NASA CMAPSS sensor data.'],
      ['Predictive Engine', 180, 100, 170, 120, 'Sensor payload', 'Risk score, RUL, anomaly status', 'Imane Tayf’s RandomForest engine served by FastAPI.'],
      ['Bridge (Passerelle)', 350, 140, 100, 40, 'Predictions', 'High-risk events', 'Polls the predictive wing and publishes events to Kafka.'],
      ['Kafka Hall', 450, 60, 160, 200, 'High-risk events', 'Validated events', 'Decouples event generation from playbook execution.'],
      ['Remediation Engine', 610, 100, 170, 120, 'Kafka events', 'Actuator commands, alerts', 'Alaa’s engine validates events and runs idempotent playbooks.'],
      ['Incident Log & Alerts', 780, 100, 150, 120, 'Playbook outcome', 'Incident record, Slack alert', 'SQLite tracking and a mock Slack webhook.'],
      ['Grafana & Prometheus', 450, 270, 160, 70, 'Metrics', 'Dashboards', 'Observability for health, latency and predictions.'],
    ].map(([title, x, y, width, height, input, output, description]) => ({ title, x, y, width, height, input, output, description } as PlanRoom)),
    routes: ['M0 165H870', 'M530 165V305'],
    labels: [['SENSORS', 35, 154], ['/PREDICT', 275, 154], ['METRICS', 540, 264]],
  },
  'internships-0': {
    heading: 'INPT scraper, with a human in the loop',
    subtitle: 'Automated scraping makes mistakes, so a person validates before anything is stored. Rejected rows loop back.',
    note: 'Five rooms and a loop. Not to scale.',
    rooms: [
      ['Scraper', 50, 100, 170, 160, 'Alumni web sources', 'Raw records', 'Automated collection of data from the web.'],
      ['Human Validation', 220, 100, 170, 160, 'Raw records', 'Approved rows or rejects', 'A person reviews records. Rejects return to the scraper.'],
      ['MySQL Database', 390, 100, 170, 160, 'Approved rows', 'Stored records', 'Relational storage for validated data.'],
      ['PHP Backend', 560, 100, 170, 160, 'Stored records', 'JSON endpoints', 'Serves the data to the front end.'],
      ['Dashboards', 730, 100, 170, 160, 'JSON', 'Views on the data', 'The alumni dashboards students kept building on.'],
    ].map(([title, x, y, width, height, input, output, description]) => ({ title, x, y, width, height, input, output, description } as PlanRoom)),
    routes: ['M10 180H815', 'M305 180V70H135V100'],
    labels: [['SOURCES', 8, 174], ['LOOP BACK', 160, 64], ['OUT', 935, 174]],
  },
}

interface ProjectFloorPlanProps {
  planId: string
}

export function ProjectFloorPlan({ planId }: ProjectFloorPlanProps) {
  const plan = plans[planId]
  const [selected, setSelected] = useState<PlanRoom | null>(null)
  const [tracing, setTracing] = useState(false)

  if (!plan) return null

  const trace = () => {
    if (tracing) return
    setTracing(true)
    window.setTimeout(() => setTracing(false), 1500)
  }

  return (
    <div className="project-plan">
      <h1>{plan.heading}</h1>
      <p className="sub">{plan.subtitle}</p>
      <div className="bar">
        <button onClick={trace} disabled={tracing} type="button">{tracing ? 'Tracing…' : 'Trace a request'}</button>
        <span className="hint">Follows one input from the entrance to the exit.</span>
      </div>
      <div className="plan">
        <svg viewBox="0 0 1040 380" role="img" aria-label={`${plan.heading} floor plan`}>
          <defs>
            <marker id={`arrow-${planId}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L8 4L0 8z" style={{ fill: 'var(--acc)' }} />
            </marker>
          </defs>
          {plan.rooms.map((room, index) => (
            <g key={room.title} onClick={() => setSelected(room)} onMouseEnter={() => setSelected(room)} tabIndex={0} role="button" aria-label={`Room ${index + 1}: ${room.title}`}>
              <rect className={`plan-room ${selected?.title === room.title ? 'on' : ''}`} x={room.x} y={room.y} width={room.width} height={room.height} />
              <rect className="plan-wall" x={room.x} y={room.y} width={room.width} height={room.height} />
              <rect className="plan-lamp" x={room.x + room.width * .3} y={room.y + 8} width={room.width * .4} height="3" />
              <text className="plan-label" x={room.x + 10} y={room.y + 22}>0{index + 1} {room.title.toUpperCase()}</text>
            </g>
          ))}
          {plan.routes.map((route, index) => (
            <path key={route} className={`plan-route ${tracing ? 'traced' : ''}`} d={route} markerEnd={`url(#arrow-${planId})`} style={{ animationDelay: `${index * 180}ms` }} />
          ))}
          {plan.labels.map(([label, x, y]) => <text key={`${label}-${x}`} className="plan-edge-label" x={x} y={y}>{label}</text>)}
        </svg>
      </div>
      <p className="plan-note">{plan.note}</p>
      <div className="plan-card" aria-live="polite">
        {selected ? (
          <>
            <p className="k">Selected room</p>
            <h2>{selected.title}</h2>
            <dl><dt>In</dt><dd>{selected.input}</dd><dt>Out</dt><dd>{selected.output}</dd></dl>
            <p>{selected.description}</p>
          </>
        ) : (
          <>
            <p className="k">No room selected</p>
            <h2>Walk the building</h2>
            <p>Hover or tap a room to inspect its input, output, and role in the system.</p>
          </>
        )}
      </div>
      {planId === 'awards-0' && (
        <div className="plan-video">
          <p className="k">Dermascope AI in motion</p>
          <div className="plan-video-frame">
            <iframe
              src="https://www.youtube.com/embed/BDn34WqEOdE?rel=0"
              title="Dermascope AI presentation"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      {projectImages[planId] && (
        <section className="project-media" aria-label="Project screenshots">
          <p className="k">Inside the build</p>
          <div className="project-media-grid">
            {projectImages[planId].map((image) => (
              <figure className="project-media-card" key={image.src}>
                <img src={image.src} alt={image.title} loading="lazy" />
                <figcaption>
                  <strong>{image.title}</strong>
                  <span>{image.explanation}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
