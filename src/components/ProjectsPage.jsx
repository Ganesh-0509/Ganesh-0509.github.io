import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects, techMeta, profile } from '../data/content'
import { navigate } from '../lib/hooks'
import { CodeIcon, DocIcon, ExternalIcon } from './Icons'

const EASE = [0.22, 1, 0.36, 1]

// ── Full detail row ──────────────────────────────────────────────────────────
// The landing page shows four shallow cards; this is the long form. Alternating
// media/body order gives the list a rhythm without needing a second layout.
function ProjectRow({ p, i }) {
  return (
    <motion.article
      className={`prow ${i % 2 ? 'prow--flip' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className={`prow-media tone-${p.tone}`}>
        <span className="case-chrome" aria-hidden="true"><i /><i /><i /></span>
        {p.image
          ? <img src={p.image} alt="" loading="lazy" decoding="async" />
          : <span className="case-ph">{p.title}</span>}
      </div>

      <div className="prow-body">
        <header className="case-head">
          <h2 className="prow-title">{p.title}</h2>
          <span className="case-tags mono dim">{p.tags.join(' / ')}</span>
        </header>

        <div className="case-field">
          <span className="case-label mono">Problem</span>
          <p className="case-problem">{p.problem}</p>
        </div>

        <div className="case-field">
          <span className="case-label mono">Architecture</span>
          <p className="case-arch muted">{p.architecture}</p>
        </div>

        {p.metrics.length > 0 && (
          <dl className="metric-row">
            {p.metrics.map((m) => (
              <div key={m.label} className="metric">
                <dt className="metric-label mono">{m.label}</dt>
                <dd className="metric-value">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="case-field">
          <span className="case-label mono">Stack</span>
          <ul className="badge-row">
            {p.tech.map((t) => (
              <li key={t}>
                <span className="badge" data-tip={techMeta[t]} tabIndex={0}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className="case-links">
          {p.demo && (
            <a className="case-link case-link--key" href={p.demo} target="_blank" rel="noreferrer">
              <ExternalIcon /> Live Demo
            </a>
          )}
          {p.repo && (
            <a className="case-link" href={p.repo} target="_blank" rel="noreferrer">
              <CodeIcon /> GitHub Codebase
            </a>
          )}
          {p.writeup && (
            <a className="case-link" href={p.writeup} target="_blank" rel="noreferrer">
              <DocIcon /> Technical Writeup
            </a>
          )}
        </footer>
      </div>
    </motion.article>
  )
}

export default function ProjectsPage() {
  // Deep-linking straight to #/projects should start at the top, not wherever
  // the landing page happened to be scrolled to.
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <section className="section projects-page">
      <div className="container">
        <div className="chapter">
          <span className="kicker">All work</span>
          <span className="kicker">{String(projects.length).padStart(2, '0')} projects</span>
        </div>

        <button type="button" className="tlink page-back" onClick={() => navigate('')}>
          <span className="arr" aria-hidden="true">←</span> Back to portfolio
        </button>

        <h1 className="display page-title">
          Everything I&rsquo;ve <em>built</em>.
        </h1>
        <p className="section-lead muted">
          The full list, with architecture and measured results for each. Metrics
          shown are measured, not estimated — where a number is missing, it
          hasn&rsquo;t been benchmarked yet.
        </p>

        <div className="prow-list">
          {projects.map((p, i) => <ProjectRow key={p.title} p={p} i={i} />)}
        </div>

        <div className="page-foot">
          <p className="muted">Want the short version, or the résumé?</p>
          <div className="contact-row">
            <button type="button" className="btn btn--primary" onClick={() => navigate('')}>
              <span className="arr" aria-hidden="true">←</span> Back to portfolio
            </button>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>Email me</a>
          </div>
        </div>
      </div>
    </section>
  )
}
