import { useState } from 'react'

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

export function TeachingRooms({ roomId }: { roomId: 'teaching-0' | 'teaching-1' }) {
  const [level, setLevel] = useState('A1')
  const [age, setAge] = useState(12)
  const [projectIndex, setProjectIndex] = useState(0)
  const [simple, setSimple] = useState(false)
  const project = projects[projectIndex]
  const isEnglish = roomId === 'teaching-0'

  return (
    <div className={`teaching-rooms ${isEnglish ? 'english-room' : 'python-room'}`}>
      <h1>{isEnglish ? 'English classroom' : 'Python classroom'}</h1>
      {isEnglish ? (
        <>
          <p className="sub">A year of teaching English, with educational games and websites coded from scratch for each group.</p>
          <ul className="teaching-stats"><li>Smart Touch Agdal</li><li>2025—2026</li></ul>
          <p className="teaching-kicker">Climb the ladder</p>
          <div className="language-ladder">
            {levels.map(([code, label]) => (
              <button className={level === code ? 'selected' : ''} key={code} onClick={() => setLevel(code)} type="button">
                {code}<small>{label}</small>
              </button>
            ))}
          </div>
          <p className="teaching-kicker">Same level, different group</p>
          <div className="learner-age"><b>{age}</b><span>{age <= 17 ? 'teen group' : age <= 29 ? 'young adults' : 'adult group'}</span></div>
          <input type="range" min="12" max="47" value={age} onChange={(event) => setAge(Number(event.target.value))} aria-label="Learner age" />
        </>
      ) : (
        <>
          <p className="sub">Teaching kids and teenagers means every idea has to be made simple. I use the same skill on projects, with clients and with non-technical colleagues.</p>
          <ul className="teaching-stats"><li>Algorithmics Souissi</li><li>Now</li><li>Kids & teenagers</li><li>Python</li></ul>
          <h2>I teach Python. I also ship it.</h2>
          <div className="teaching-cards">
            <article><b>Clear explanations</b><span>I turn complicated technical ideas into plain, concrete terms until a ten-year-old can follow them.</span></article>
            <article><b>Adapts to the audience</b><span>From teenagers to adults in English, and kids in Python: I listen first, adapt fast and keep people motivated.</span></article>
            <article><b>Ships real Python</b><span>Python sits behind my internships, hackathon wins and team projects, from data pipelines to deep learning APIs.</span></article>
          </div>
          <p className="teaching-kicker">Try it: one project, two audiences</p>
          <div className="project-tabs">
            {projects.map((item, index) => <button className={index === projectIndex ? 'selected' : ''} key={item.name} onClick={() => setProjectIndex(index)} type="button">{item.name}</button>)}
          </div>
          <button className="explain-toggle" aria-pressed={simple} onClick={() => setSimple(!simple)} type="button">
            <i /> Explain it to a ten-year-old
          </button>
          <div className="explain-board">
            <h3>{simple ? 'Ten-year-old version' : 'Technical version'}</h3>
            <p>{simple ? project.simple : project.technical}</p>
          </div>
          <div className="teaching-chips">
            {project.results.map((item) => <span className="result" key={item}>{item}</span>)}
            {project.technologies.map((item) => <span key={item}>{item}</span>)}
          </div>
          <p className="teaching-kicker">Let’s talk</p>
          <div className="teaching-links">
            <a href="https://github.com/AlaaBelga" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/alaa-belga-164151382" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </>
      )}
    </div>
  )
}
