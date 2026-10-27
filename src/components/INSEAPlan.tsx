import { useState } from 'react'
import type { Language } from '../i18n'

interface Module {
  semester: number
  title: string
  topics: string
}

interface Domain {
  className: string
  title: string
  description: string
  modules: Module[]
}

const domains: Domain[] = [
  {
    className: 'insea-software',
    title: 'Software Engineering',
    description: 'Programming, design, architecture and delivery',
    modules: [
      [1, 'Algorithmics & Programming', 'Algorithmics · Programming'],
      [1, 'Computer Architecture', 'Computer architecture · Assembly language'],
      [2, 'Data Structures & Advanced Programming', 'Data structures · Advanced programming'],
      [2, 'Object-Oriented Programming', 'Object-oriented programming'],
      [2, 'Web Development', 'Web development · Web frameworks'],
      [2, 'Operating Systems', 'Operating systems · System programming'],
      [3, 'Object-Oriented Modeling of IS', 'Object-oriented modeling · Model-driven engineering'],
      [3, 'Advanced OOP', 'Advanced object-oriented programming'],
      [3, 'Compilation & Theoretical CS', 'Compilation · Theoretical computer science'],
      [4, 'Software Engineering & Project', 'Software engineering · Supervised project'],
      [4, 'New Development Technologies', 'Data persistence · Development frameworks · Mobile development'],
      [5, 'Advanced Software Engineering', 'Project management & software quality · DevOps & DataOps'],
      [5, 'BPM & Microservices', 'BPM · Microservices'],
      [5, 'IS Architectures', 'IS urbanization & governance · Integrated systems'],
      [5, 'IT Security', 'Network security · Information systems security'],
      [5, 'Opening & Innovation Project', 'Project'],
    ].map(([semester, title, topics]) => ({ semester, title, topics })),
  },
  {
    className: 'insea-data-science',
    title: 'Statistics & Data Science',
    description: 'Statistics, optimization, AI and learning',
    modules: [
      [1, 'Data Analysis & SAS', 'Descriptive statistics · Dimension reduction · SAS programming'],
      [1, 'Probability & Inference', 'Probability · Statistical inference'],
      [1, 'Linear Programming & Numerical Analysis', 'Linear programming · Numerical analysis'],
      [2, 'Regression & Time Series', 'Linear regression models · Time series'],
      [3, 'Graph Theory & Discrete Models', 'Graph theory · Discrete models'],
      [4, 'Knowledge Discovery', 'Data mining · Web & text mining'],
      [4, 'Artificial Intelligence', 'Functional, logic & constraint programming · Artificial intelligence'],
      [5, 'Machine & Deep Learning', 'Machine learning · Technologies & platforms · Deep learning'],
    ].map(([semester, title, topics]) => ({ semester, title, topics })),
  },
  {
    className: 'insea-data-engineering',
    title: 'Data Engineering',
    description: 'Databases, warehouses, big data, networks and cloud',
    modules: [
      [1, 'Relational Analysis & Databases', 'Relational analysis & design · Databases'],
      [3, 'Advanced Databases', 'Database administration · Advanced databases'],
      [3, 'Computer Networks', 'General networks · Local networks'],
      [4, 'Data Warehouse & Business Analytics', 'Taught inside Business Intelligence & Knowledge Discovery'],
      [4, 'IoT & Cloud Computing', 'IoT · Virtualization & cloud computing'],
      [4, 'TCP/IP & Administration', 'Network protocols · Network administration & IPv6'],
      [5, 'Big Data', 'Big data platforms · Big data languages'],
    ].map(([semester, title, topics]) => ({ semester, title, topics })),
  },
  {
    className: 'insea-economics',
    title: 'Economics & Business',
    description: 'Economic theory, accounting, finance and entrepreneurship',
    modules: [
      [1, 'Economic Analysis & National Accounts', 'Microeconomics · Macroeconomics · National accounting'],
      [2, 'Entrepreneurship I', 'Business economics · Business accounting'],
      [3, 'Entrepreneurship II', 'Corporate finance · Financial diagnosis · Business valuation'],
      [4, 'Entrepreneurship III', 'Business strategy · Business model · Business plan'],
    ].map(([semester, title, topics]) => ({ semester, title, topics })),
  },
  {
    className: 'insea-annex',
    title: 'Annex: Languages & Communication',
    description: 'Social sciences, French, English and law',
    modules: [
      [1, 'Communication & Business English 1', 'French 1 · Business English 1 · Principles of law'],
      [2, 'Communication & Business English 2', 'Intro to social sciences · French 2 · Business English 2'],
      [3, 'Communication & Business English 3', 'French 3 · Professional English I · Business law'],
      [4, 'Communication & Business English 4', 'Professional English II · Professional writing · Labor law'],
    ].map(([semester, title, topics]) => ({ semester, title, topics })),
  },
]

const frenchDomainText: Record<string, string> = {
  'Software Engineering': 'Génie logiciel',
  'Programming, design, architecture and delivery': 'Programmation, conception, architecture et mise en production',
  'Statistics & Data Science': 'Statistiques et science des données',
  'Statistics, optimization, AI and learning': 'Statistiques, optimisation, IA et apprentissage',
  'Data Engineering': 'Ingénierie des données',
  'Databases, warehouses, big data, networks and cloud': 'Bases de données, entrepôts, big data, réseaux et cloud',
  'Economics & Business': 'Économie et gestion',
  'Economic theory, accounting, finance and entrepreneurship': 'Théorie économique, comptabilité, finance et entrepreneuriat',
  'Annex: Languages & Communication': 'Annexe : langues et communication',
  'Social sciences, French, English and law': 'Sciences sociales, français, anglais et droit',
  'Algorithmics & Programming': 'Algorithmique et programmation',
  'Computer Architecture': 'Architecture des ordinateurs',
  'Data Structures & Advanced Programming': 'Structures de données et programmation avancée',
  'Object-Oriented Programming': 'Programmation orientée objet',
  'Web Development': 'Développement web',
  'Operating Systems': 'Systèmes d’exploitation',
  'Object-Oriented Modeling of IS': 'Modélisation orientée objet des SI',
  'Advanced OOP': 'POO avancée',
  'Compilation & Theoretical CS': 'Compilation et informatique théorique',
  'Software Engineering & Project': 'Génie logiciel et projet',
  'New Development Technologies': 'Nouvelles technologies de développement',
  'Advanced Software Engineering': 'Génie logiciel avancé',
  'BPM & Microservices': 'BPM et microservices',
  'IS Architectures': 'Architectures des SI',
  'IT Security': 'Sécurité informatique',
  'Opening & Innovation Project': 'Projet d’ouverture et d’innovation',
  'Data Analysis & SAS': 'Analyse des données et SAS',
  'Probability & Inference': 'Probabilités et inférence',
  'Linear Programming & Numerical Analysis': 'Programmation linéaire et analyse numérique',
  'Regression & Time Series': 'Régression et séries temporelles',
  'Graph Theory & Discrete Models': 'Théorie des graphes et modèles discrets',
  'Knowledge Discovery': 'Découverte des connaissances',
  'Artificial Intelligence': 'Intelligence artificielle',
  'Machine & Deep Learning': 'Machine learning et deep learning',
  'Relational Analysis & Databases': 'Analyse relationnelle et bases de données',
  'Advanced Databases': 'Bases de données avancées',
  'Computer Networks': 'Réseaux informatiques',
  'Data Warehouse & Business Analytics': 'Entrepôts de données et analytique métier',
  'IoT & Cloud Computing': 'IoT et cloud computing',
  'TCP/IP & Administration': 'TCP/IP et administration',
  'Big Data': 'Big data',
  'Economic Analysis & National Accounts': 'Analyse économique et comptabilité nationale',
  'Entrepreneurship I': 'Entrepreneuriat I',
  'Entrepreneurship II': 'Entrepreneuriat II',
  'Entrepreneurship III': 'Entrepreneuriat III',
  'Communication & Business English 1': 'Communication et anglais des affaires 1',
  'Communication & Business English 2': 'Communication et anglais des affaires 2',
  'Communication & Business English 3': 'Communication et anglais des affaires 3',
  'Communication & Business English 4': 'Communication et anglais des affaires 4',
}

const localizeDomain = (domain: Domain): Domain => ({
  ...domain,
  title: frenchDomainText[domain.title] ?? domain.title,
  description: frenchDomainText[domain.description] ?? domain.description,
  modules: domain.modules.map((module) => ({
    ...module,
    title: frenchDomainText[module.title] ?? module.title,
    topics: module.topics
      .replaceAll('Algorithmics', 'Algorithmique')
      .replaceAll('Programming', 'Programmation')
      .replaceAll('Computer architecture', 'Architecture des ordinateurs')
      .replaceAll('Assembly language', 'Langage assembleur')
      .replaceAll('Data structures', 'Structures de données')
      .replaceAll('Advanced programming', 'Programmation avancée')
      .replaceAll('Object-oriented programming', 'Programmation orientée objet')
      .replaceAll('Web development', 'Développement web')
      .replaceAll('Web frameworks', 'Frameworks web')
      .replaceAll('Operating systems', 'Systèmes d’exploitation')
      .replaceAll('System programming', 'Programmation système')
      .replaceAll('Object-oriented modeling', 'Modélisation orientée objet')
      .replaceAll('Model-driven engineering', 'Ingénierie dirigée par les modèles')
      .replaceAll('Advanced object-oriented programming', 'Programmation orientée objet avancée')
      .replaceAll('Compilation', 'Compilation')
      .replaceAll('Theoretical computer science', 'Informatique théorique')
      .replaceAll('Software engineering', 'Génie logiciel')
      .replaceAll('Supervised project', 'Projet encadré')
      .replaceAll('Data persistence', 'Persistance des données')
      .replaceAll('Development frameworks', 'Frameworks de développement')
      .replaceAll('Mobile development', 'Développement mobile')
      .replaceAll('Project management & software quality', 'Gestion de projet et qualité logicielle')
      .replaceAll('DevOps & DataOps', 'DevOps et DataOps')
      .replaceAll('Microservices', 'Microservices')
      .replaceAll('Network security', 'Sécurité réseau')
      .replaceAll('Information systems security', 'Sécurité des systèmes d’information')
      .replaceAll('Descriptive statistics', 'Statistiques descriptives')
      .replaceAll('Dimension reduction', 'Réduction dimensionnelle')
      .replaceAll('Statistical inference', 'Inférence statistique')
      .replaceAll('Linear programming', 'Programmation linéaire')
      .replaceAll('Numerical analysis', 'Analyse numérique')
      .replaceAll('Linear regression models', 'Modèles de régression linéaire')
      .replaceAll('Time series', 'Séries temporelles')
      .replaceAll('Graph theory', 'Théorie des graphes')
      .replaceAll('Discrete models', 'Modèles discrets')
      .replaceAll('Data mining', 'Fouille de données')
      .replaceAll('Web & text mining', 'Fouille web et textuelle')
      .replaceAll('Functional, logic & constraint programming', 'Programmation fonctionnelle, logique et par contraintes')
      .replaceAll('Artificial intelligence', 'Intelligence artificielle')
      .replaceAll('Machine learning', 'Machine learning')
      .replaceAll('Technologies & platforms', 'Technologies et plateformes')
      .replaceAll('Deep learning', 'Deep learning')
      .replaceAll('Relational analysis & design', 'Analyse et conception relationnelles')
      .replaceAll('Databases', 'Bases de données')
      .replaceAll('Database administration', 'Administration des bases de données')
      .replaceAll('General networks', 'Réseaux généraux')
      .replaceAll('Local networks', 'Réseaux locaux')
      .replaceAll('Taught inside Business Intelligence & Knowledge Discovery', 'Enseigné dans BI et découverte des connaissances')
      .replaceAll('IoT', 'IoT')
      .replaceAll('Virtualization & cloud computing', 'Virtualisation et cloud computing')
      .replaceAll('Network protocols', 'Protocoles réseau')
      .replaceAll('Network administration & IPv6', 'Administration réseau et IPv6')
      .replaceAll('Big data platforms', 'Plateformes big data')
      .replaceAll('Big data languages', 'Langages big data')
      .replaceAll('Microeconomics', 'Microéconomie')
      .replaceAll('Macroeconomics', 'Macroéconomie')
      .replaceAll('National accounting', 'Comptabilité nationale')
      .replaceAll('Business economics', 'Économie d’entreprise')
      .replaceAll('Business accounting', 'Comptabilité d’entreprise')
      .replaceAll('Corporate finance', 'Finance d’entreprise')
      .replaceAll('Financial diagnosis', 'Diagnostic financier')
      .replaceAll('Business valuation', 'Évaluation d’entreprise')
      .replaceAll('Business strategy', 'Stratégie d’entreprise')
      .replaceAll('Business model', 'Modèle économique')
      .replaceAll('Business plan', 'Plan d’affaires')
      .replaceAll('French', 'Français')
      .replaceAll('Business English', 'Anglais des affaires')
      .replaceAll('Principles of law', 'Principes du droit')
      .replaceAll('Intro to social sciences', 'Introduction aux sciences sociales')
      .replaceAll('Professional English', 'Anglais professionnel')
      .replaceAll('Business law', 'Droit des affaires')
      .replaceAll('Professional writing', 'Communication professionnelle')
      .replaceAll('Labor law', 'Droit du travail'),
  })),
})

export function INSEAPlan({ language = 'en' }: { language?: Language }) {
  const [semester, setSemester] = useState(0)
  const fr = language === 'fr'
  const displayedDomains = fr ? domains.map(localizeDomain) : domains

  return (
    <div className="insea-plan">
      <h1>{fr ? 'INSEA, le bâtiment' : 'INSEA, the building'}</h1>
      <p className="sub">
        {fr ? 'Cinq domaines pour travailler avec les données et les logiciels, plus une annexe consacrée aux langues et à la communication. Choisissez un semestre pour voir son contenu.' : 'Five domains for working with data and software, plus an annex for languages and communication. Pick a semester to see where it was spent.'}
      </p>
      <div className="insea-semesters" role="group" aria-label="Filter by semester">
        <span className="hint">{fr ? 'Semestre' : 'Semester'}</span>
        {[0, 1, 2, 3, 4, 5].map((value) => (
          <button
            className={semester === value ? 'active' : ''}
            key={value}
            onClick={() => setSemester(value)}
            type="button"
          >
            {value ? `S${value}` : (fr ? 'Tous' : 'All')}
          </button>
        ))}
      </div>
      <div className={`insea-directory ${semester ? 'filtered' : ''}`}>
        {displayedDomains.map((domain) => (
          <section className={`insea-domain ${domain.className}`} key={domain.title}>
            <header>
              <h2>{domain.title}</h2>
              <span>{domain.modules.length} {fr ? 'modules' : 'modules'}</span>
            </header>
            <p>{domain.description}</p>
            <ul>
              {domain.modules.map((module) => (
                <li className={semester === module.semester ? 'hit' : ''} key={module.title}>
                  <b>{module.title}</b>
                  <span>{module.topics}</span>
                  <i>S{module.semester}</i>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="insea-foot">{fr ? 'Les semestres 1 à 5 sont affichés. Le semestre 6 correspond au projet de fin d’études (PFE) en 2027.' : 'Semesters 1 to 5 are shown. Semester 6 is the end-of-studies project (PFE) in 2027.'}</p>
    </div>
  )
}
