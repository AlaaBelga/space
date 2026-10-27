import { useState } from 'react'
import type { Language } from '../i18n'

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

const mediaTranslations: Record<string, string> = {
  'Dental X-ray input': 'Entrée radiographique dentaire',
  'The image entering DentaLens before YOLOv8 detects suspicious dental lesions.': 'Image entrant dans DentaLens avant la détection des lésions dentaires suspectes par YOLOv8.',
  'Diagnostic web interface': 'Interface web de diagnostic',
  'The clinician-facing web view that presents the model output in an accessible format.': 'Vue web destinée au clinicien qui présente le résultat du modèle dans un format accessible.',
  'Trained lesion-detection model': 'Modèle de détection des lésions entraîné',
  'A YOLOv8 model trained on more than 20,000 images with a high accuracy rate of more than 90%.': 'Modèle YOLOv8 entraîné sur plus de 20 000 images avec une précision supérieure à 90 %.',
  'Predictive engine': 'Moteur prédictif',
  'The predictive side of the platform, where sensor data becomes risk, anomaly, and remaining-useful-life signals.': 'Partie prédictive de la plateforme, où les données des capteurs deviennent des signaux de risque, d’anomalie et de durée de vie restante.',
  'Passerelle between engines': 'Passerelle entre les moteurs',
  'The bridge carries high-risk events from the predictive service to the remediation engine through Kafka.': 'La passerelle transporte les événements à haut risque du service prédictif vers le moteur de remédiation via Kafka.',
  'Prediction API': 'API de prédiction',
  'The API surface used to expose predictions and connect the model service to the event-driven system.': 'API qui expose les prédictions et connecte le service de modèle au système événementiel.',
  'Containerized services': 'Services conteneurisés',
  'Docker services package the predictive, remediation, messaging, and observability pieces together.': 'Les services Docker regroupent les composants prédictifs, de remédiation, de messagerie et d’observabilité.',
  'Validation and tests': 'Validation et tests',
  'The passing test suite protects the event flow, playbooks, incident logging, and service contracts.': 'La suite de tests réussie protège le flux d’événements, les playbooks, les journaux d’incidents et les contrats de service.',
  'Offline app entry': 'Entrée de l’application hors ligne',
  'The mobile starting point for the guided skin-condition triage flow.': 'Point de départ mobile du parcours guidé de triage des affections cutanées.',
  'Guided onboarding': 'Accueil guidé',
  'The tutorial explains the app before the user begins the structured assessment.': 'Le tutoriel explique l’application avant le début de l’évaluation structurée.',
  'Body-region selection': 'Sélection de la région du corps',
  'The 3D body model narrows the context before an image is captured.': 'Le modèle 3D du corps précise le contexte avant la capture de l’image.',
  'Image input': 'Entrée de l’image',
  'The camera or gallery step supplies the visual signal for on-device inference.': 'La caméra ou la galerie fournit le signal visuel pour l’inférence sur l’appareil.',
  'Questionnaire and results': 'Questionnaire et résultats',
  'Structured symptoms add context that a single photo cannot provide before the ranked result is shown.': 'Les symptômes structurés ajoutent le contexte qu’une seule photo ne peut pas fournir avant l’affichage du résultat classé.',
  'DermAI application': 'Application DermAI',
  'The complete offline triage experience, designed around privacy-preserving local inference.': 'Expérience complète de triage hors ligne, conçue autour d’une inférence locale qui protège la vie privée.',
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

const planTranslations: Record<string, string> = {
  'Dermascope AI, ground floor': 'Dermascope AI, rez-de-chaussée',
  'One photo walks in and the building forks it to two models. Hugging Face is the street outside.': 'Une photo entre et le bâtiment la dirige vers deux modèles. Hugging Face est la rue extérieure.',
  'Six rooms, one fork, one exit. Not to scale.': 'Six salles, une bifurcation, une sortie. Schéma non contractuel.',
  'Photo Intake': 'Réception de la photo',
  'Skin photo, uploaded': 'Photo de peau importée',
  'Image tensor': 'Tenseur d’image',
  'A photo of the skin is uploaded from the web interface.': 'Une photo de peau est importée depuis l’interface web.',
  'Preprocessing & Routing': 'Prétraitement et routage',
  'Public route or professional route': 'Parcours public ou professionnel',
  'The request is sent to the public model or the professional one.': 'La requête est envoyée au modèle public ou professionnel.',
  'Public Screening Model': 'Modèle de dépistage public',
  'Routed image': 'Image routée',
  '9-class prediction': 'Prédiction à 9 classes',
  'Classifies 9 common non-cancerous skin conditions.': 'Classe 9 affections cutanées courantes non cancéreuses.',
  'Cancer Detection Model': 'Modèle de détection du cancer',
  '4-class prediction': 'Prédiction à 4 classes',
  'For professional use, including melanoma and basal-cell carcinoma.': 'Pour un usage professionnel, notamment le mélanome et le carcinome basocellulaire.',
  'Model outputs': 'Sorties des modèles',
  'JSON result': 'Résultat JSON',
  'A Flask and PyTorch server serving both models.': 'Serveur Flask et PyTorch qui expose les deux modèles.',
  'Web Interface': 'Interface web',
  'Result shown to the user': 'Résultat affiché à l’utilisateur',
  'HTML, CSS and JavaScript deployed to Hugging Face.': 'HTML, CSS et JavaScript déployés sur Hugging Face.',
  'DentaLens, ground floor': 'DentaLens, rez-de-chaussée',
  'A short plan for a 48-hour build. One detector, then two exits: a web app and a Blender 3D viewer.': 'Le plan d’une réalisation en 48 heures : un détecteur, puis deux sorties, une application web et une visionneuse 3D Blender.',
  'Four rooms, built in two days. Not to scale.': 'Quatre salles construites en deux jours. Schéma non contractuel.',
  'Scan Intake': 'Réception du scan',
  'Dental X-ray': 'Radiographie dentaire',
  'Image to detector': 'Image vers le détecteur',
  'A dental image comes in for analysis.': 'Une image dentaire entre pour être analysée.',
  'YOLOv8 Detector': 'Détecteur YOLOv8',
  Image: 'Image',
  'Lesion boxes': 'Cadres des lésions',
  'The model trained to detect dental lesions.': 'Modèle entraîné pour détecter les lésions dentaires.',
  'Web App': 'Application web',
  'Detected lesions': 'Lésions détectées',
  'Interactive diagnostic view': 'Vue diagnostique interactive',
  'An interface a clinician can read at a glance.': 'Une interface lisible d’un seul coup d’œil par un clinicien.',
  '3D Viewer': 'Visionneuse 3D',
  'Interactive 3D visualization': 'Visualisation 3D interactive',
  'Produced in Blender during the hackathon.': 'Produite avec Blender pendant le hackathon.',
  'DermAI, the offline corridor': 'DermAI, le corridor hors ligne',
  'Four intake stages, then on-device inference. The right wall has no door: nothing leaves the device.': 'Quatre étapes d’entrée, puis une inférence sur l’appareil. Le mur de droite n’a pas de porte : rien ne quitte l’appareil.',
  'One corridor, one entrance, no network. Not to scale.': 'Un corridor, une entrée, aucun réseau. Schéma non contractuel.',
  'Role Select': 'Choix du rôle',
  'Patient or professional': 'Patient ou professionnel',
  'Role-based flow': 'Parcours selon le rôle',
  'Guided onboarding.': 'Parcours d’accueil guidé.',
  '3D Body Model': 'Modèle 3D du corps',
  Role: 'Rôle',
  'Body region': 'Région du corps',
  'SceneView removes doubt about where the photo comes from.': 'SceneView précise la région concernée avant la prise de vue.',
  'Image Capture': 'Capture de l’image',
  'Skin image': 'Image de peau',
  'CameraX live capture or gallery import.': 'Capture en direct avec CameraX ou import depuis la galerie.',
  'Symptom Questionnaire': 'Questionnaire de symptômes',
  'Image plus context': 'Image et contexte',
  'Captures context a photo cannot show.': 'Capture le contexte qu’une photo ne peut pas montrer.',
  'On-device Inference': 'Inférence sur l’appareil',
  'Image and context': 'Image et contexte',
  'Ranked candidates': 'Candidats classés',
  'PyTorch Lite runs on the device.': 'PyTorch Lite s’exécute sur l’appareil.',
  'Top-3 Result': 'Résultat Top 3',
  'Shortlist with risk label': 'Sélection avec niveau de risque',
  'A triage aid, not a diagnostic device.': 'Une aide au triage, pas un dispositif de diagnostic.',
  'Predictive Maintenance, two wings': 'Maintenance prédictive, deux ailes',
  'Two independent wings joined by a skybridge. The west wing predicts, the east wing acts. Kafka is the central hall.': 'Deux ailes indépendantes reliées par une passerelle. L’aile ouest prédit, l’aile est agit. Kafka est le hall central.',
  'Two wings, one bridge. Not to scale.': 'Deux ailes, une passerelle. Schéma non contractuel.',
  'CMAPSS Simulator': 'Simulateur CMAPSS',
  'Raw sensor data': 'Données brutes des capteurs',
  'Sensor payload': 'Charge utile des capteurs',
  'Replays NASA CMAPSS sensor data.': 'Rejoue les données de capteurs NASA CMAPSS.',
  'Predictive Engine': 'Moteur prédictif',
  'Risk score, RUL, anomaly status': 'Score de risque, RUL, état des anomalies',
  'Imane Tayf’s RandomForest engine served by FastAPI.': 'Moteur RandomForest d’Imane Tayf exposé par FastAPI.',
  'Bridge (Passerelle)': 'Passerelle',
  Predictions: 'Prédictions',
  'High-risk events': 'Événements à haut risque',
  'Polls the predictive wing and publishes events to Kafka.': 'Interroge l’aile prédictive et publie les événements dans Kafka.',
  'Kafka Hall': 'Hall Kafka',
  'Validated events': 'Événements validés',
  'Decouples event generation from playbook execution.': 'Dissocie la génération des événements de l’exécution des playbooks.',
  'Remediation Engine': 'Moteur de remédiation',
  'Kafka events': 'Événements Kafka',
  'Actuator commands, alerts': 'Commandes d’actionneurs, alertes',
  'Alaa’s engine validates events and runs idempotent playbooks.': 'Le moteur d’Alaa valide les événements et exécute des playbooks idempotents.',
  'Incident Log & Alerts': 'Journal des incidents et alertes',
  'Playbook outcome': 'Résultat du playbook',
  'Incident record, Slack alert': 'Incident, alerte Slack',
  'SQLite tracking and a mock Slack webhook.': 'Suivi SQLite et webhook Slack simulé.',
  'Grafana & Prometheus': 'Grafana et Prometheus',
  Metrics: 'Métriques',
  Dashboards: 'Tableaux de bord',
  'Observability for health, latency and predictions.': 'Observabilité de l’état, de la latence et des prédictions.',
  'INPT scraper, with a human in the loop': 'Scraper INPT, avec validation humaine',
  'Automated scraping makes mistakes, so a person validates before anything is stored. Rejected rows loop back.': 'Le scraping automatique peut se tromper : une personne valide avant tout stockage. Les lignes rejetées reviennent au début.',
  'Five rooms and a loop. Not to scale.': 'Cinq salles et une boucle. Schéma non contractuel.',
  Scraper: 'Scraper',
  'Alumni web sources': 'Sources web des anciens',
  'Raw records': 'Enregistrements bruts',
  'Automated collection of data from the web.': 'Collecte automatisée des données sur le web.',
  'Human Validation': 'Validation humaine',
  'Approved rows or rejects': 'Lignes approuvées ou rejetées',
  'A person reviews records. Rejects return to the scraper.': 'Une personne vérifie les enregistrements. Les rejets retournent au scraper.',
  'MySQL Database': 'Base de données MySQL',
  'Approved rows': 'Lignes approuvées',
  'Stored records': 'Enregistrements stockés',
  'Relational storage for validated data.': 'Stockage relationnel des données validées.',
  'PHP Backend': 'Backend PHP',
  'JSON endpoints': 'Endpoints JSON',
  'Serves the data to the front end.': 'Expose les données au frontend.',
  'Views on the data': 'Vues sur les données',
  'The alumni dashboards students kept building on.': 'Les tableaux de bord des anciens que les étudiants ont continué à développer.',
  UPLOAD: 'IMPORTER',
  IMAGE: 'IMAGE',
  '9 CLASSES': '9 CLASSES',
  '4 CATEGORIES': '4 CATÉGORIES',
  'HUGGING FACE': 'HUGGING FACE',
  'X-RAY': 'RADIO',
  LESIONS: 'LÉSIONS',
  CLINICIAN: 'CLINICIEN',
  VIEWER: 'VISIONNEUSE',
  PATIENT: 'PATIENT',
  'NO NETWORK': 'AUCUN RÉSEAU',
  SENSORS: 'CAPTEURS',
  '/PREDICT': '/PRÉDIRE',
  METRICS: 'MÉTRIQUES',
  SOURCES: 'SOURCES',
  'LOOP BACK': 'RETOUR EN BOUCLE',
  OUT: 'SORTIE',
}

function localizePlan(plan: ProjectPlan): ProjectPlan {
  const translate = (value: string) => planTranslations[value] ?? value
  return {
    ...plan,
    heading: translate(plan.heading),
    subtitle: translate(plan.subtitle),
    note: translate(plan.note),
    rooms: plan.rooms.map((room) => ({ ...room, title: translate(room.title), input: translate(room.input), output: translate(room.output), description: translate(room.description) })),
    labels: plan.labels.map(([label, x, y]) => [translate(label), x, y]),
  }
}

interface ProjectFloorPlanProps {
  planId: string
  language?: Language
}

export function ProjectFloorPlan({ planId, language = 'en' }: ProjectFloorPlanProps) {
  const fr = language === 'fr'
  const plan = fr ? localizePlan(plans[planId]) : plans[planId]
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
        <button onClick={trace} disabled={tracing} type="button">{tracing ? (fr ? 'Traçage…' : 'Tracing…') : (fr ? 'Suivre une requête' : 'Trace a request')}</button>
        <span className="hint">{fr ? "Suit une entrée de l'entrée jusqu'à la sortie." : 'Follows one input from the entrance to the exit.'}</span>
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
            <p className="k">{fr ? 'Salle sélectionnée' : 'Selected room'}</p>
            <h2>{selected.title}</h2>
            <dl><dt>{fr ? 'Entrée' : 'In'}</dt><dd>{selected.input}</dd><dt>{fr ? 'Sortie' : 'Out'}</dt><dd>{selected.output}</dd></dl>
            <p>{selected.description}</p>
          </>
        ) : (
          <>
            <p className="k">{fr ? 'Aucune salle sélectionnée' : 'No room selected'}</p>
            <h2>{fr ? 'Parcourir le bâtiment' : 'Walk the building'}</h2>
            <p>{fr ? 'Survolez ou touchez une salle pour inspecter son entrée, sa sortie et son rôle dans le système.' : 'Hover or tap a room to inspect its input, output, and role in the system.'}</p>
          </>
        )}
      </div>
      {planId === 'awards-0' && (
        <div className="plan-video">
          <p className="k">{fr ? 'Dermascope AI en action' : 'Dermascope AI in motion'}</p>
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
        <section className="project-media" aria-label={fr ? 'Captures du projet' : 'Project screenshots'}>
          <p className="k">{fr ? 'Dans la réalisation' : 'Inside the build'}</p>
          <div className="project-media-grid">
            {projectImages[planId].map((image) => (
              <figure className="project-media-card" key={image.src}>
                <img src={image.src} alt={image.title} loading="lazy" />
                <figcaption>
                  <strong>{fr ? mediaTranslations[image.title] ?? image.title : image.title}</strong>
                  <span>{fr ? mediaTranslations[image.explanation] ?? image.explanation : image.explanation}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
