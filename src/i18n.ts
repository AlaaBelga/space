import { ROOM_DETAILS, type RoomDetail } from './data/roomDetails'

export type Language = 'en' | 'fr'

export const copy = {
  en: {
    day: 'DAY',
    night: 'NIGHT',
    switchDay: 'Switch to day mode',
    switchNight: 'Switch to night mode',
    enter: 'Enter building',
    level: 'LEVEL',
    ground: 'GROUND',
    lobby: 'Lobby',
    openDoors: 'THE DOORS ARE OPEN',
    build: "Let's build",
    something: 'something.',
    room: 'ROOM',
    enterRoom: 'ENTER ROOM ↗',
    lightOn: 'LIGHT ON ☼',
    switchLight: 'SWITCH LIGHT ◒',
    clickOff: 'Click to turn the light off.',
    clickOn: 'Click to turn on the light.',
    enterChamber: 'Enter chamber',
    logos: 'logos',
    client: 'For client',
    language: 'Language',
    english: 'English',
    french: 'French',
    exitRoom: 'EXIT ROOM [ESC ✕]',
    returnElevator: 'RETURN TO ELEVATOR [ESC]',
    roomSeen: 'ROOM SEEN',
    scrollDown: 'SCROLL DOWN',
    collapse: 'COLLAPSE [✕]',
    architecture: 'System Architecture & Specifications',
    challenge: 'Challenge',
    solution: 'Engineered Solution',
    arsenal: 'ARSENAL:',
    projectLinks: 'Explore the project',
    selectedRoom: 'Selected room',
    input: 'In',
    output: 'Out',
    trace: 'Trace a request',
    tracePatent: 'Trace a patent',
    traceAgain: 'Trace again',
    tracing: 'Tracing…',
    planHint: 'Follows one input from the entrance to the exit.',
    patentHint: 'Follows one upload from the street to the report.',
  },
  fr: {
    day: 'JOUR',
    night: 'NUIT',
    switchDay: 'Passer en mode jour',
    switchNight: 'Passer en mode nuit',
    enter: 'Entrer dans le bâtiment',
    level: 'NIVEAU',
    ground: 'REZ-DE-CHAUSSÉE',
    lobby: 'Hall',
    openDoors: 'LES PORTES SONT OUVERTES',
    build: 'Créons',
    something: 'ensemble',
    room: 'SALLE',
    enterRoom: 'ENTRER ↗',
    lightOn: 'LUMIÈRE ALLUMÉE ☼',
    switchLight: 'ALLUMER LA LUMIÈRE ◒',
    clickOff: 'Cliquer pour éteindre la lumière.',
    clickOn: 'Cliquer pour allumer la lumière.',
    enterChamber: 'Entrer dans la salle',
    logos: 'logos',
    client: 'Pour le client',
    language: 'Langue',
    english: 'Anglais',
    french: 'Français',
    exitRoom: 'QUITTER LA SALLE [ESC ✕]',
    returnElevator: "RETOUR À L'ASCENSEUR [ESC]",
    roomSeen: 'SALLE VUE',
    scrollDown: 'FAIRE DÉFILER',
    collapse: 'RÉDUIRE [✕]',
    architecture: 'Architecture système et spécifications',
    challenge: 'Défi',
    solution: 'Solution conçue',
    arsenal: 'ARSENAL :',
    projectLinks: 'Explorer le projet',
    selectedRoom: 'Salle sélectionnée',
    input: 'Entrée',
    output: 'Sortie',
    trace: 'Suivre une requête',
    tracePatent: 'Suivre un brevet',
    traceAgain: 'Suivre à nouveau',
    tracing: 'Traçage…',
    planHint: "Suit une entrée de l'entrée jusqu'à la sortie.",
    patentHint: 'Suit un brevet de la rue jusqu’au rapport.',
  },
} as const

type Copy = (typeof copy)[Language]

export function getCopy(language: Language): Copy {
  return copy[language]
}

const frFloors = {
  education: ['Formation', "Là où les fondations ont été posées."],
  internships: ['Stages', 'Un travail passé du prototype à la production.'],
  awards: ['Hackathons & Distinctions', 'Deux places sur le podium.'],
  teaching: ['Enseignement', 'Expliquer clairement les idées difficiles.'],
  projects: ['Projets', 'Des systèmes conçus pour l’industrie et la santé.'],
  toolbox: ['Boîte à outils', 'Les 6 fenêtres de compétences derrière le travail.'],
} as const

export function floorLabel(language: Language, id: string, english: string, subtitle: string) {
  return language === 'fr' && id in frFloors ? frFloors[id as keyof typeof frFloors] : [english, subtitle]
}

const translations: Record<string, string> = {
  Education: 'Formation',
  Internships: 'Stages',
  Awards: 'Hackathons & Distinctions',
  Teaching: 'Enseignement',
  Projects: 'Projets',
  Toolbox: 'Boîte à outils',
  Programming: 'Programmation',
  'Data & AI': 'Données et IA',
  'Databases & Visualization': 'Bases de données et visualisation',
  'Web & APIs': 'Web et API',
  'Software Engineering': 'Génie logiciel',
  'Cloud & DevOps': 'Cloud et DevOps',
  'Mathematics & Physics · Fez': 'Mathématiques et physique · Fès',
  'Data & Software Engineering': 'Ingénierie des données et logiciels',
  'Data & Backend Intern': 'Stagiaire données et backend',
  'AI Software Engineering Intern': 'Stagiaire ingénierie logicielle IA',
  'International AI Hackathon': 'Hackathon international d’IA',
  'DevOps Project · IoT & Machine Learning · Industry': 'Projet DevOps · IoT et apprentissage automatique · Industrie',
  'Offline Diagnostic Mobile App · Healthcare': 'Application mobile de diagnostic hors ligne · Santé',
  'English tutor': 'Professeure d’anglais',
  'Python teacher': 'Professeure de Python',
  'English classroom': 'Salle de cours d’anglais',
  'Python classroom': 'Salle de cours de Python',
  'System Architecture & Specifications': 'Architecture système et spécifications',
  Challenge: 'Défi',
  'Engineered Solution': 'Solution conçue',
  'Explore the project': 'Explorer le projet',
}

const frenchDetails: Record<string, Pick<RoomDetail, 'summary' | 'problem' | 'solution' | 'architecture'>> = {
  'education-0': {
    summary: "Deux années intensives de mathématiques et de physique en filière préparatoire MP, conclues par le concours national CNC et l'admission à l'INSEA.",
    problem: "L'admission à une école d'ingénieurs marocaine passe par un concours national qui exige rigueur et rapidité en mathématiques et en physique.",
    solution: "Deux années de travail quotidien, suivies du concours national CNC, ont abouti à l'admission à l'INSEA.",
    architecture: ['Mathématiques : cœur de la filière MP', 'Physique : deuxième pilier de la filière', 'Concours national : le CNC', "Résultat : admission à l'INSEA en 2024"],
  },
  'education-1': {
    summary: "Formation d'ingénieur en ingénierie des données et logiciels à l'Institut national de statistique et d'économie appliquée.",
    problem: "Je cherchais une formation réunissant développement logiciel, statistiques et économie, avec une vraie base en ingénierie des données.",
    solution: "La filière couvre l'informatique, les statistiques, l'économie, l'apprentissage automatique, le big data et l'architecture logicielle.",
    architecture: ['Logiciels : algorithmique, POO, web, microservices, DevOps et DataOps', 'Données : bases, big data, BI, apprentissage automatique et profond', 'Systèmes : systèmes d’exploitation, réseaux, sécurité, IoT et cloud', 'IA : programmation fonctionnelle, logique et intelligence artificielle', 'Statistiques et économie : probabilités, régression, séries temporelles et finance'],
  },
  'internships-0': {
    summary: "Création d'un pipeline automatisé de scraping web avec validation humaine, base MySQL, backend PHP et tableaux de bord.",
    problem: "Le scraping automatique peut se tromper : il fallait collecter les données tout en gardant une validation humaine.",
    solution: "Un pipeline de collecte avec validation humaine stocke les résultats dans MySQL derrière un backend PHP et les expose dans des tableaux de bord.",
    architecture: ['Scraping : collecte automatisée des données web', 'Validation : étape de revue humaine', 'Stockage : base MySQL', 'Backend : PHP', 'Tableaux de bord : vue sur les données collectées'],
  },
  'internships-1': {
    summary: "Conception d'un pipeline automatisé d'analyse de brevets pour Stellantis, réduisant une revue manuelle d'une heure à quelques secondes.",
    problem: "Les examinateurs de brevets automobiles consacraient plus de 60 minutes à comparer les revendications, les antériorités et les innovations mécaniques.",
    solution: "Un pipeline IA à six chambres analyse les documents, extrait les revendications, classe les sujets et génère des rapports Word.",
    architecture: ['Chambre 01 : ingestion de documents et nettoyage du texte', 'Chambre 02 : extraction des métadonnées et concepts', 'Chambre 03 : classifieur de revendications par apprentissage automatique', 'Chambre 04 : synthèse des résumés par LLM', 'Chambre 05 : stockage structuré centralisé SQLite', 'Chambre 06 : génération automatisée de rapports Word conformes à Stellantis'],
  },
  'awards-0': {
    summary: "Application web de dépistage dermatologique utilisant 15 000 images et deux modèles de deep learning.",
    problem: "Le dépistage cutané doit distinguer les conditions courantes et les cas nécessitant l'avis d'un professionnel.",
    solution: "Deux modèles PyTorch servis par Flask classent les images pour le dépistage public et la détection du cancer.",
    architecture: ['Entrée : photo de peau envoyée depuis le web', 'Prétraitement : préparation et routage de l’image', 'Modèle public : classification de 9 affections', 'Modèle cancer : classification de 4 catégories', 'API Flask : exposition des prédictions', 'Interface web : résultat présenté à l’utilisateur'],
  },
  'awards-1': {
    summary: "Avec Aicha Lairibi, création en 48 heures d'une solution dentaire complète combinant détection de lésions, interface web et visualisation 3D.",
    problem: "Un outil dentaire doit détecter précisément les lésions et présenter le résultat clairement au clinicien, dans un délai de 48 heures.",
    solution: "Un modèle YOLOv8 détecte les lésions dans une interface web interactive, complétée par une visualisation 3D créée avec Blender.",
    architecture: ['Modèle : YOLOv8 entraîné pour détecter les lésions dentaires', 'Application web : interface interactive autour du modèle', 'Visualisation 3D : produite avec Blender', 'Livraison : modèle, application et 3D livrés dans le délai'],
  },
  'projects-0': {
    summary: "Plateforme événementielle de bout en bout qui prédit les pannes et les corrige automatiquement avant les arrêts de production.",
    problem: "Une prédiction ne suffit pas à empêcher une panne : quelqu'un doit encore agir sur l'alerte.",
    solution: "Un moteur prédictif et un moteur de remédiation reliés par Kafka transforment les signaux à risque en actions, alertes et journaux d'incidents.",
    architecture: ['Moteur prédictif : RandomForest sur les données NASA CMAPSS', 'Passerelle : publication des événements à risque dans Kafka', 'Remédiation : playbooks idempotents et commandes d’actionneurs', 'Observabilité : tableaux de bord Prometheus, Grafana et Streamlit', 'Livraison : Docker Compose, Kubernetes, CI/CD et tests pytest'],
  },
  'projects-1': {
    summary: "Application Android entièrement hors ligne pour guider le triage des affections cutanées, avec inférence directement sur l'appareil.",
    problem: "L'application Dermascope originale nécessitait une connexion réseau, et une photo seule manque souvent de contexte clinique.",
    solution: "L'évaluation suit quatre étapes : rôle, région corporelle 3D, capture d'image et questionnaire de symptômes, puis renvoie un top 3 avec niveau de risque.",
    architecture: ['Accueil par rôle : parcours patient et professionnel', 'Sélecteur : modèle 3D interactif du corps', 'Capture : caméra en direct ou galerie', 'Questionnaire : contexte que la photo ne montre pas', "Inférence locale : PyTorch Lite, aucune donnée ne quitte l'appareil", 'Résultat : trois candidats classés avec niveau de risque'],
  },
}

function translate(value: string): string {
  return translations[value] ?? value
}

function localizeDetail(detail: RoomDetail): RoomDetail {
  const localized = frenchDetails[detail.id]
  return {
    ...detail,
    role: translate(detail.role),
    location: translate(detail.location),
    title: translate(detail.title),
    summary: localized?.summary ?? translate(detail.summary),
    problem: localized?.problem ?? translate(detail.problem),
    solution: localized?.solution ?? translate(detail.solution),
    architecture: localized?.architecture ?? detail.architecture.map(translate),
    stats: detail.stats.map((stat) => ({ label: translate(stat.label), value: translate(stat.value) })),
  }
}

export const ROOM_DETAILS_FR: Record<string, RoomDetail> = Object.fromEntries(
  Object.entries(ROOM_DETAILS).map(([id, detail]) => [id, localizeDetail(detail)]),
)
