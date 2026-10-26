import { useState } from 'react'

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

export function INSEAPlan() {
  const [semester, setSemester] = useState(0)

  return (
    <div className="insea-plan">
      <h1>INSEA, the building</h1>
      <p className="sub">
        Five domains for working with data and software, plus an annex for languages and communication. Pick a semester to see where it was spent.
      </p>
      <div className="insea-semesters" role="group" aria-label="Filter by semester">
        <span className="hint">Semester</span>
        {[0, 1, 2, 3, 4, 5].map((value) => (
          <button
            className={semester === value ? 'active' : ''}
            key={value}
            onClick={() => setSemester(value)}
            type="button"
          >
            {value ? `S${value}` : 'All'}
          </button>
        ))}
      </div>
      <div className={`insea-directory ${semester ? 'filtered' : ''}`}>
        {domains.map((domain) => (
          <section className={`insea-domain ${domain.className}`} key={domain.title}>
            <header>
              <h2>{domain.title}</h2>
              <span>{domain.modules.length} modules</span>
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
      <p className="insea-foot">Semesters 1 to 5 are shown. Semester 6 is the end-of-studies project (PFE) in 2027.</p>
    </div>
  )
}
