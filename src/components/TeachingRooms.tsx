import { useState } from 'react'
import type { Language } from '../i18n'

const levels = [
  ['A1', 'beginner'],
  ['A2', 'elementary'],
  ['B1', 'intermediate'],
  ['B2', 'upper intermediate'],
]

const projects = [
  {
    name: 'Capgemini',
    technical:
      'A six-stage Python pipeline for Stellantis: it ingests PDF and DOCX patents, extracts claims, runs an ML claim classifier beside an LLM abstract summarizer, stores results in SQLite and generates a Word report.',
    simple:
      'You hand over a patent and the computer reads it, sorts it and writes a short summary. A finished report comes back in seconds instead of an hour.',
    results: ['1h → seconds', '97.2% classification'],
    technologies: ['Python', 'FastAPI', 'spaCy', 'Transformers', 'SQLite', 'python-docx', 'Docker'],
  },
  {
    name: 'Predictive Maintenance',
    technical:
      'An event-driven remediation engine, built by me: Kafka carries high-risk events from a FastAPI predictive service to idempotent playbooks, with SQLite incident logs and Slack alerts.',
    simple:
      'A smoke alarm that also puts the fire out, so nobody has to run over and do it by hand.',
    results: ['Event-driven (Kafka)', 'NASA CMAPSS data'],
    technologies: ['Python', 'FastAPI', 'Kafka', 'Docker', 'pytest'],
  },
  {
    name: 'Dermascope AI',
    technical:
      'A Flask and PyTorch backend serving two deep learning models, public screening and cancer detection, trained on a custom 15,000-image dataset.',
    simple:
      'You show the computer a photo of skin and it makes an informed guess, because it has studied thousands of examples.',
    results: ['2nd place, ICESCO hackathon', '15,000 images'],
    technologies: ['Python', 'PyTorch', 'Flask', 'Hugging Face'],
  },
  {
    name: 'INPT Scraper',
    technical:
      'A scraping pipeline with a human-in-the-loop validation step, stored in MySQL behind a PHP backend, with dashboards.',
    simple:
      'A robot collects the information and a person checks it before it is kept, because robots make mistakes.',
    results: ['Human in the loop', 'Students kept building on it'],
    technologies: ['Python', 'MySQL', 'PHP', 'Dashboards'],
  },
]

const frenchProjects = [
  {
    technical: 'Un pipeline Python en six étapes pour Stellantis : ingestion de brevets PDF et DOCX, extraction des revendications, classification ML avec synthèse des résumés par LLM, stockage SQLite et génération d’un rapport Word.',
    simple: 'On donne un brevet à l’ordinateur : il le lit, le trie et écrit un court résumé. Le rapport arrive en quelques secondes au lieu d’une heure.',
    results: ['1 h → secondes', '97,2 % de classification'],
  },
  {
    technical: 'Un moteur de remédiation événementiel que j’ai développé : Kafka transporte les événements à haut risque depuis un service prédictif FastAPI vers des playbooks idempotents, avec journaux SQLite et alertes Slack.',
    simple: 'Une alarme incendie qui éteint aussi le feu, sans que personne n’ait besoin d’intervenir manuellement.',
    results: ['Piloté par événements (Kafka)', 'Données NASA CMAPSS'],
  },
  {
    technical: 'Un backend Flask et PyTorch qui sert deux modèles de deep learning : dépistage public et détection du cancer, entraînés sur un jeu de 15 000 images.',
    simple: 'On montre une photo de peau à l’ordinateur. Il fait une estimation informée parce qu’il a étudié des milliers d’exemples.',
    results: ['2e place, hackathon ICESCO', '15 000 images'],
  },
  {
    technical: 'Un pipeline de scraping avec validation humaine, stocké dans MySQL derrière un backend PHP et accompagné de tableaux de bord.',
    simple: 'Un robot collecte les informations et une personne les vérifie avant de les conserver, car les robots peuvent se tromper.',
    results: ['Validation humaine', 'Développé ensuite par les étudiants'],
  },
]

export function TeachingRooms({ roomId, language = 'en' }: { roomId: 'teaching-0' | 'teaching-1'; language?: Language }) {
  const [level, setLevel] = useState('A1')
  const [age, setAge] = useState(12)
  const [projectIndex, setProjectIndex] = useState(0)
  const [simple, setSimple] = useState(false)
  const isEnglish = roomId === 'teaching-0'
  const fr = language === 'fr'
  const project = projects[projectIndex]
  const localizedProject = fr ? { ...project, ...frenchProjects[projectIndex] } : project

  return (
    <div className={`teaching-rooms ${isEnglish ? 'english-room' : 'python-room'}`}>
      <h1>{isEnglish ? (fr ? 'Salle de cours d’anglais' : 'English classroom') : (fr ? 'Salle de cours de Python' : 'Python classroom')}</h1>
      {isEnglish ? (
        <>
          <p className="sub">{fr ? 'Une année à enseigner l’anglais avec des jeux pédagogiques et des sites web codés sur mesure pour chaque groupe.' : 'A year of teaching English, with educational games and websites coded from scratch for each group.'}</p>
          <ul className="teaching-stats"><li>Smart Touch Agdal</li><li>2025—2026</li></ul>
          <p className="teaching-kicker">{fr ? 'Grimper l’échelle' : 'Climb the ladder'}</p>
          <div className="language-ladder">
            {levels.map(([code, label]) => (
              <button className={level === code ? 'selected' : ''} key={code} onClick={() => setLevel(code)} type="button">
                {code}<small>{fr ? ({ beginner: 'débutant', elementary: 'élémentaire', intermediate: 'intermédiaire', 'upper intermediate': 'intermédiaire avancé' }[label] ?? label) : label}</small>
              </button>
            ))}
          </div>
          <p className="teaching-kicker">{fr ? 'Même niveau, groupe différent' : 'Same level, different group'}</p>
          <div className="learner-age"><b>{age}</b><span>{age <= 17 ? (fr ? 'adolescents' : 'teen group') : age <= 29 ? (fr ? 'jeunes adultes' : 'young adults') : (fr ? 'adultes' : 'adult group')}</span></div>
          <input type="range" min="12" max="47" value={age} onChange={(event) => setAge(Number(event.target.value))} aria-label={fr ? 'Âge de l’apprenant' : 'Learner age'} />
        </>
      ) : (
        <>
          <p className="sub">{fr ? 'Enseigner aux enfants et aux adolescents oblige à rendre chaque idée simple. J’applique la même méthode aux projets, aux clients et aux collègues non techniques.' : 'Teaching kids and teenagers means every idea has to be made simple. I use the same skill on projects, with clients and with non-technical colleagues.'}</p>
          <ul className="teaching-stats"><li>Algorithmics Souissi</li><li>{fr ? 'Aujourd’hui' : 'Now'}</li><li>{fr ? 'Enfants et adolescents' : 'Kids & teenagers'}</li><li>Python</li></ul>
          <h2>{fr ? 'J’enseigne Python. Je le mets aussi en production.' : 'I teach Python. I also ship it.'}</h2>
          <div className="teaching-cards">
            <article><b>{fr ? 'Des explications claires' : 'Clear explanations'}</b><span>{fr ? 'Je transforme les idées techniques complexes en termes concrets jusqu’à ce qu’un enfant de dix ans puisse les suivre.' : 'I turn complicated technical ideas into plain, concrete terms until a ten-year-old can follow them.'}</span></article>
            <article><b>{fr ? 'Je m’adapte au public' : 'Adapts to the audience'}</b><span>{fr ? 'Des adolescentes et adolescents aux adultes en anglais, et avec les enfants en Python : j’écoute d’abord, je m’adapte vite et je garde tout le monde motivé.' : 'From teenagers to adults in English, and kids in Python: I listen first, adapt fast and keep people motivated.'}</span></article>
            <article><b>{fr ? 'Du Python concret en production' : 'Ships real Python'}</b><span>{fr ? 'Python est au cœur de mes stages, de mes victoires en hackathon et de mes projets d’équipe, des pipelines de données aux API de deep learning.' : 'Python sits behind my internships, hackathon wins and team projects, from data pipelines to deep learning APIs.'}</span></article>
          </div>
          <p className="teaching-kicker">{fr ? 'À vous : un projet, deux publics' : 'Try it: one project, two audiences'}</p>
          <div className="project-tabs">
            {projects.map((item, index) => <button className={index === projectIndex ? 'selected' : ''} key={item.name} onClick={() => setProjectIndex(index)} type="button">{item.name}</button>)}
          </div>
          <button className="explain-toggle" aria-pressed={simple} onClick={() => setSimple(!simple)} type="button">
            <i /> {fr ? 'L’expliquer à un enfant de dix ans' : 'Explain it to a ten-year-old'}
          </button>
          <div className="explain-board">
            <h3>{simple ? (fr ? 'Version pour enfant' : 'Ten-year-old version') : (fr ? 'Version technique' : 'Technical version')}</h3>
            <p>{simple ? localizedProject.simple : localizedProject.technical}</p>
          </div>
          <div className="teaching-chips">
            {localizedProject.results.map((item) => <span className="result" key={item}>{item}</span>)}
            {project.technologies.map((item) => <span key={item}>{item}</span>)}
          </div>
          <p className="teaching-kicker">{fr ? 'Parlons-en' : 'Let’s talk'}</p>
          <div className="teaching-links">
            <a href="https://github.com/AlaaBelga" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/alaa-belga-164151382" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </>
      )}
    </div>
  )
}
