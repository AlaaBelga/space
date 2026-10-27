export interface RoomDetail {
  id: string
  floorId: string
  floorNumber: string
  roomNumber: string
  title: string
  role: string
  period: string
  location: string
  logo?: string
  logos?: string[]
  clientLabel?: string
  clientLogo?: string
  links?: { label: string; href: string }[]
  summary: string
  problem: string
  solution: string
  architecture: string[]
  stats: { label: string; value: string }[]
  technologies: string[]
  hasCustomPlan?: boolean
}

/*
 * Every claim below comes from one of: your CV, the portfolio page, the project READMEs
 * (Dermascope AI, DermAI, Predictive Maintenance) or the DSE training plan.
 * The Capgemini room is unchanged apart from its location (the CV says Fes Shore).
 */
export const ROOM_DETAILS: Record<string, RoomDetail> = {
  // ── Level 06: Education ──
  'education-0': {
    id: 'education-0',
    floorId: 'education',
    floorNumber: '06',
    roomNumber: '06.1',
    title: 'CPGE Moulay Idriss',
    role: 'Mathematics & Physics (MP)',
    period: '2022—2024',
    location: 'Fez, Morocco',
    logo: '/images/logos/CPGE.jpg',
    summary:
      'Two intensive years of mathematics and physics in the MP preparatory track. It ended with the CNC national competitive exam and admission to INSEA.',
    problem:
      'Admission to an engineering school in Morocco goes through a national competitive exam that rewards rigorous mathematics and physics under time pressure.',
    solution:
      'Two years of daily work in mathematics and physics, then the CNC national exam. The result was admission to INSEA.',
    architecture: [
      'Mathematics: the core of the MP track',
      'Physics: the second pillar of the track',
      'Competitive exam: the CNC national exam',
      'Outcome: admission to INSEA in 2024',
    ],
    stats: [
      { label: 'CNC National Exam', value: 'Admitted to INSEA' },
      { label: 'Track', value: 'Maths & Physics (MP)' },
      { label: 'Duration', value: '2 Years' },
    ],
    technologies: ['Mathematics', 'Physics', 'CNC exam'],
  },
  'education-1': {
    id: 'education-1',
    floorId: 'education',
    floorNumber: '06',
    roomNumber: '06.2',
    title: 'INSEA',
    role: 'Data & Software Engineering',
    period: '2024—2027',
    location: 'Morocco',
    logo: '/images/logos/INSEA.png',
    summary:
      'Engineering degree in Data & Software Engineering at the National Institute of Statistics and Applied Economics. Software development and data engineering, alongside statistics and economics.',
    problem:
      'My interests sit in two places: software development, and statistics with economics. INSEA was the only school in Morocco that paired solid data engineering and software training with the basics of statistical economics.',
    solution:
      'The DSE track covers core computer science, statistics and economics, then machine learning, big data and software architecture in the later semesters. It ends with the end-of-studies project (PFE) in 2027. I follow the technical side of a project, and I also ask what a company needs, and why.',
    architecture: [
      'Software: algorithmics, OOP, data structures, web development, software engineering, microservices, DevOps & DataOps',
      'Data: databases, big data, business intelligence & knowledge discovery, machine & deep learning',
      'Systems & networks: operating systems, computer networks, TCP/IP, IT security, IoT & cloud',
      'AI foundations: functional, logic & constraint programming (Prolog, LISP), artificial intelligence',
      'Statistics & economics: probability, regression & time series, SAS, economics, business & finance',
    ],
    stats: [
      { label: 'Degree', value: 'Engineering Degree' },
      { label: 'Graduation', value: '2027' },
      { label: 'Status', value: 'Final-Year Student' },
    ],
    technologies: ['Machine Learning', 'Deep Learning', 'Big Data', 'Business Intelligence', 'Microservices', 'DevOps', 'SAS'],
  },

  // ── Level 05: Internships ──
  'internships-0': {
    id: 'internships-0',
    floorId: 'internships',
    floorNumber: '05',
    roomNumber: '05.1',
    title: 'INPT',
    role: 'Data & Backend Intern',
    period: 'JUL 2025',
    location: 'Rabat, Morocco',
    logo: '/images/logos/Logo_inpt.png',
    links: [{ label: 'GitHub', href: 'https://github.com/AlaaBelga/CyborgScraper' }],
    summary:
      'Built an automated web-scraping pipeline for the school’s alumni project, with human-in-the-loop validation, a MySQL database, a PHP backend and dashboards.',
    problem:
      'Automated scraping makes mistakes, so the project needed to collect data automatically while keeping a person in charge of validating it.',
    solution:
      'A scraping pipeline with a human-in-the-loop validation step, stored in a MySQL database behind a PHP backend, with dashboards on top. It applied what I had learned at INSEA in databases and backend work.',
    architecture: [
      'Scraping pipeline: automated collection of data from the web (CyborgScraper)',
      'Validation: a human-in-the-loop review step',
      'Storage: MySQL database',
      'Backend: PHP',
      'Dashboards: a view on the collected data',
    ],
    stats: [
      { label: 'Period', value: 'Jul 2025' },
      { label: 'Backend', value: 'PHP + MySQL' },
      { label: 'After the Internship', value: 'Students kept building on it' },
    ],
    technologies: ['Python', 'MySQL', 'PHP', 'Dashboards'],
  },
  'internships-1': {
    id: 'internships-1',
    floorId: 'internships',
    floorNumber: '05',
    roomNumber: '05.2',
    title: 'Capgemini',
    role: 'AI Software Engineering Intern',
    period: 'SUMMER 2026',
    location: 'Fes Shore · Stellantis Project',
    logo: '/images/logos/Capgemini.avif',
    clientLabel: 'For client',
    clientLogo: '/images/logos/stellantis.png',
    links: [{ label: 'GitHub', href: 'https://github.com/AlaaBelga/smart-patent' }],
    summary:
      'Architected an end-to-end automated patent-analysis pipeline for automotive giant Stellantis, collapsing manual hour-long patent reviews into automated sub-second evaluations.',
    problem:
      'Automotive patent examiners spent over 60 minutes per filing manually cross-referencing technical claims, prior art citations, and classifying mechanical innovations.',
    solution:
      'Created a 6-chamber dual-stream AI pipeline: parsing PDFs/DOCX, extracting claims, running neural topic classifiers alongside LLM abstract summarizers, and generating formatted Word briefs.',
    architecture: [
      'Chamber 01: Multi-format Document Ingestion & Text Sanitization',
      'Chamber 02: Metadata & Concept Extraction with dual-stream fork',
      'Chamber 03: Machine Learning Claim Classifier (Automotive Taxonomy)',
      'Chamber 04: LLM-powered Abstract Synthesizer',
      'Chamber 05: SQLite Central Structured Storage Vault',
      'Chamber 06: Automated Stellantis-compliant Word Report Generation',
    ],
    stats: [
      { label: 'Review Speedup', value: '1h → Secs' },
      { label: 'Classification', value: '97.2%' },
      { label: 'Format Output', value: 'Automated DOCX' },
    ],
    technologies: ['Python', 'FastAPI', 'LLM / Transformers', 'spaCy', 'SQLite', 'python-docx', 'Docker'],
    hasCustomPlan: true,
  },

  // ── Level 04: Teaching ──
  'teaching-0': {
    id: 'teaching-0',
    floorId: 'teaching',
    floorNumber: '04',
    roomNumber: '04.1',
    title: 'English Tutor',
    role: 'Smart Touch Agdal',
    period: '2025—2026',
    location: 'Rabat, Morocco',
    logo: '/images/logos/englsih.jpg',
    summary:
      'For a year, taught English from A1 to B2 to learners from age 12 to 47, using educational games and websites coded from scratch for each group.',
    problem:
      'Learners ranged from teenagers to adults, so one fixed lesson format could not fit every group.',
    solution:
      'Coded my own educational games and websites, tailored to what each group needed, and adapted lessons as I went.',
    architecture: [
      'Levels: CEFR A1 to B2',
      'Learners: ages 12 to 47',
      'Materials: custom educational games and websites',
      'Soft skills built: listening first, adapting fast, keeping people motivated',
    ],
    stats: [
      { label: 'Age Range', value: '12 to 47' },
      { label: 'CEFR Span', value: 'A1 → B2' },
      { label: 'Duration', value: '1 Year' },
    ],
    technologies: ['English teaching', 'Educational games', 'Web development', 'Communication'],
  },
  'teaching-1': {
    id: 'teaching-1',
    floorId: 'teaching',
    floorNumber: '04',
    roomNumber: '04.2',
    title: 'Python Teacher',
    role: 'Algorithmics Souissi',
    period: 'NOW',
    location: 'Rabat, Morocco',
    logo: '/images/logos/algo.png',
    summary:
      'Teaching Python to kids and teenagers, and turning complicated technical ideas into something a ten-year-old can follow.',
    problem:
      'Complicated technical notions have to land with an audience that has no technical background.',
    solution:
      'Explaining each notion in plain, concrete terms until a ten-year-old can follow it. It is the same skill I use with clients and non-technical colleagues.',
    architecture: [
      'Audience: kids and teenagers',
      'Subject: Python',
      'Method: plain-language explanations of technical notions',
      'Transfer: the same skill used with clients and non-technical colleagues',
    ],
    stats: [
      { label: 'Subject', value: 'Python' },
      { label: 'Audience', value: 'Kids & Teenagers' },
      { label: 'Status', value: 'Currently Teaching' },
    ],
    technologies: ['Python', 'Teaching', 'Communication'],
  },

  // ── Level 03: Awards ──
  'awards-0': {
    id: 'awards-0',
    floorId: 'awards',
    floorNumber: '03',
    roomNumber: '03.1',
    title: 'Dermascope AI',
    role: '2nd Place · International AI Hackathon (ICESCO)',
    period: '26 NOV 2025',
    location: 'Casablanca, Morocco',
    logos: ['/images/logos/2nd.png', '/images/logos/DermaScope.jpeg'],
    links: [{ label: 'Live demo', href: 'https://dermascopeai.netlify.app' }],
    summary:
      'An AI dermatological screening platform built from data preparation to deployment, trained on a custom 15,000-image dataset adapted to local skin types. It runs on Hugging Face and was featured in a national news report.',
    problem:
      'The platform had to work for local skin types, which generic skin datasets do not always represent.',
    solution:
      'Built a custom 15,000-image dataset adapted to local skin types, trained the models on it, and shipped the full platform: a Flask and PyTorch backend serving two models behind a web interface.',
    architecture: [
      'Public screening model: classifies 9 common non-cancerous skin conditions, such as eczema and psoriasis',
      'Cancer detection model: classifies 4 categories, including melanoma and basal-cell carcinoma, for professional use',
      'Backend: Flask and PyTorch server serving both models',
      'Frontend: web interface in HTML, CSS and JavaScript',
      'Deployment: Hugging Face',
    ],
    stats: [
      { label: 'Podium Finish', value: '2nd Place' },
      { label: 'Dataset', value: '15,000 Images' },
      { label: 'Models', value: '2 (Screening + Cancer)' },
      { label: 'Press', value: 'National News Report' },
    ],
    technologies: ['PyTorch', 'Flask', 'Hugging Face', 'Deep Learning', 'HTML / CSS / JS'],
  },
  'awards-1': {
    id: 'awards-1',
    floorId: 'awards',
    floorNumber: '03',
    roomNumber: '03.2',
    title: 'DentaLens',
    role: '3rd Place · INPT × MedConnect Data Hackathon',
    period: '15 MAY 2026 · 48H',
    location: 'Rabat, Morocco',
    logos: ['/images/logos/3rd.png', '/images/logos/DentaLens.png'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aicha-Laribia/DentaLens' }],
    summary:
      'With teammate Aicha Lairibi, built a full-stack dental diagnostic solution in 48 hours: a YOLOv8 lesion-detection model in an interactive web interface, with an interactive 3D visualization.',
    problem:
      'A dental diagnostic tool needs accurate lesion detection and an interface a clinician can read at a glance, and here it all had to be built in 48 hours.',
    solution:
      'Trained a YOLOv8 model to detect lesions with high accuracy and wrapped it in an intuitive, interactive web interface. I learned Blender during the hackathon to produce the interactive 3D visualization.',
    architecture: [
      'Detection model: YOLOv8 trained to detect dental lesions',
      'Web app: an intuitive, interactive interface around the model',
      '3D visualization: interactive, produced in Blender (my first time using it)',
      'Delivery: detection model, web app and 3D shipped together within the deadline',
    ],
    stats: [
      { label: 'Podium Finish', value: '3rd Place' },
      { label: 'Hackathon Sprint', value: '48 Hours' },
      { label: 'Team Size', value: '2 People' },
    ],
    technologies: ['YOLOv8', 'Computer Vision', 'Deep Learning', 'Web App', 'Blender'],
  },

  // ── Level 02: Projects ──
  'projects-0': {
    id: 'projects-0',
    floorId: 'projects',
    floorNumber: '02',
    roomNumber: '02.1',
    title: 'Predictive Maintenance',
    role: 'DevOps Project · Predictive ML + Auto-Remediation Platform',
    period: '2026',
    location: 'Team Project · Industrial Systems',
    logos: ['/images/predective%20maintenance/bridge_p1_p2.png'],
    links: [{ label: 'GitHub', href: 'https://github.com/AlaaBelga/auto-remediation-platform' }],
    summary:
      'An end-to-end, event-driven platform that predicts machine failures and automatically remediates them before they cause downtime. I built the Remediation Engine; my teammate Imane Tayf built the Predictive Engine.',
    problem:
      'A prediction on its own does not stop a failure, because someone still has to act on it. The goal was to detect likely failures and remediate them automatically.',
    solution:
      'Two independent pillars. A Predictive Engine trained on NASA CMAPSS sensor data serves risk score, remaining useful life and anomaly status over a REST API. A Kafka-based Remediation Engine turns high-risk events into playbook actions, alerts and incident logs.',
    architecture: [
      'Predictive Engine: RandomForest on NASA CMAPSS with 5-fold GroupKFold validation, served by FastAPI at /predict',
      'Bridge: polls the Predictive Engine and publishes high-risk events to Kafka',
      'Remediation Engine: validates each event, runs idempotent playbooks and simulated actuator commands, logs incidents in SQLite and alerts a mock Slack webhook',
      'Observability: Prometheus and Grafana dashboards, plus a Streamlit dashboard',
      'Delivery: Docker Compose, Kubernetes manifests, GitHub Actions CI/CD and a pytest suite',
    ],
    stats: [
      { label: 'Model Fit (R²)', value: '0.663' },
      { label: 'Dataset', value: 'NASA CMAPSS' },
      { label: 'Architecture', value: 'Event-Driven (Kafka)' },
    ],
    technologies: ['Kafka', 'FastAPI', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'SQLite', 'Streamlit', 'pytest'],
  },
  'projects-1': {
    id: 'projects-1',
    floorId: 'projects',
    floorNumber: '02',
    roomNumber: '02.2',
    title: 'DermAI Android App',
    role: 'Offline Skin-Condition Triage App',
    period: 'SHIPPED',
    location: 'Mobile Healthcare',
    logos: ['/images/logos/dermAI.png'],
    links: [{ label: 'GitHub', href: 'https://github.com/AlaaBelga/DermAI' }],
    summary:
      'An Android app for guided, fully offline skin-condition triage. It is a rebuild of Dermascope AI that moves the whole pipeline (preprocessing, inference and post-processing) on-device with PyTorch Lite, so it works with zero connectivity.',
    problem:
      'The original Dermascope AI needed a network connection for inference. And a single photo is often ambiguous: lighting, angle and skin tone reduce the signal, and many conditions only differ by context that a photo cannot show.',
    solution:
      'Removed the network dependency and structured the assessment in four stages: role-based intake, 3D body-region selection, image capture and a symptom questionnaire. The model gets a tightly scoped input and returns a ranked top-3 shortlist with a risk label. It is a triage aid, not a diagnostic device.',
    architecture: [
      'Role-based onboarding: patient and professional flows, with a guided tutorial',
      'Body-region selector: interactive 3D body model (SceneView)',
      'Capture: live camera with CameraX, or gallery import',
      'Symptom questionnaire: structured context that the image alone cannot show',
      'On-device inference: PyTorch Lite, so no image or metadata leaves the device',
      'Output: top-3 ranked candidates with a risk label, in an Arabic-first UI with RTL support',
    ],
    stats: [
      { label: 'Accuracy', value: '96.8%' },
      { label: 'Conditions', value: '9 Classes' },
      { label: 'Training Images', value: '15,000+' },
      { label: 'Connectivity', value: '100% Offline' },
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'PyTorch Lite', 'EfficientNet', 'CameraX', 'SceneView', 'Navigation Compose', 'Coil'],
  },
}