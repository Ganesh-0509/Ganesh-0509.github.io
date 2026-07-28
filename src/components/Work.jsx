import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/content'
import { navigate } from '../lib/hooks'
import { CodeIcon, DocIcon, ExternalIcon } from './Icons'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'

const EASE = [0.22, 1, 0.36, 1]

// ── Compact project card ─────────────────────────────────────────────────────
// Deliberately shallow: preview, title, and the one-line problem. Architecture,
// stack and metrics live behind "Overview" (and on the full projects page) so
// the grid stays scannable instead of becoming a wall of text.
function ProjectCard({ p, n, onOpen }) {
  return (
    <motion.article
      className="case"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay: (n % 2) * 0.07 }}
    >
      <button
        type="button"
        className={`case-media tone-${p.tone}`}
        onClick={() => onOpen(p)}
        aria-label={`Open the overview for ${p.title}`}
      >
        <span className="case-chrome" aria-hidden="true"><i /><i /><i /></span>
        {p.image
          ? <img src={p.image} alt="" loading="lazy" decoding="async" />
          : <span className="case-ph">{p.title}</span>}
      </button>

      <div className="case-body">
        <header className="case-head">
          <h3 className="case-title">{p.title}</h3>
          <span className="case-tags mono dim">{p.tags.join(' / ')}</span>
        </header>

        <p className="case-problem">{p.problem}</p>

        <footer className="case-links">
          <button type="button" className="case-link case-link--key" onClick={() => onOpen(p)}>
            <DocIcon /> Overview
          </button>
          {p.demo && (
            <a className="case-link" href={p.demo} target="_blank" rel="noreferrer">
              <ExternalIcon /> Live Demo
            </a>
          )}
          {p.repo && (
            <a className="case-link" href={p.repo} target="_blank" rel="noreferrer">
              <CodeIcon /> Code
            </a>
          )}
        </footer>
      </div>
    </motion.article>
  )
}

export default function Work() {
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])

  // Only the four strongest on the landing page — the rest live on /projects.
  const featured = projects.filter((p) => p.featured).slice(0, 4)

  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Selected work</span>
          <span className="kicker">{String(projects.length).padStart(2, '0')} shipped</span>
        </div>

        <Reveal>
          <h2 className="section-title">Systems built, <em>measured</em>, shipped.</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="section-lead muted">
            Four of the strongest below — open any card for the architecture and
            measured results.
          </p>
        </Reveal>

        <div className="case-grid">
          {featured.map((p, i) => (
            <ProjectCard key={p.title} p={p} n={i} onOpen={setActive} />
          ))}
        </div>

        <div className="work-more">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => navigate('#/projects')}
          >
            View all {projects.length} projects <span className="arr" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
