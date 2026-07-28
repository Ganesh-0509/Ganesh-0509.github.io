import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { techMeta } from '../data/content'
import { CodeIcon, DocIcon, ExternalIcon, CloseIcon } from './Icons'

const EASE = [0.22, 1, 0.36, 1]

// The full case study. This is where everything the compact card omits lives:
// architecture, stack, measured results and the narrative.
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    // Compensate for the scrollbar so locking scroll doesn't shift the layout.
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prev = document.body.style.cssText
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.cssText = prev
    }
  }, [onClose])

  const story = project.story || [project.blurb]

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — technical overview`}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        {project.image && (
          <div className={`modal-media tone-${project.tone}`}>
            <span className="case-chrome" aria-hidden="true"><i /><i /><i /></span>
            <img src={project.image} alt="" />
          </div>
        )}

        <div className="modal-body">
          <h3 className="modal-title">{project.title}</h3>

          <div className="case-field">
            <span className="case-label mono">Problem</span>
            <p className="case-problem">{project.problem}</p>
          </div>

          {story.map((para, i) => <p key={i} className="modal-para muted">{para}</p>)}

          <div className="case-field">
            <span className="case-label mono">Architecture</span>
            <p className="case-arch muted">{project.architecture}</p>
          </div>

          {project.metrics.length > 0 && (
            <dl className="metric-row">
              {project.metrics.map((m) => (
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
              {project.tech.map((t) => (
                <li key={t}>
                  <span className="badge" data-tip={techMeta[t]} tabIndex={0}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <footer className="case-links modal-links">
            {project.demo && (
              <a className="btn btn--primary" href={project.demo} target="_blank" rel="noreferrer">
                <ExternalIcon /> Live Demo
              </a>
            )}
            {project.repo && (
              <a className="btn btn--ghost" href={project.repo} target="_blank" rel="noreferrer">
                <CodeIcon /> GitHub Codebase
              </a>
            )}
            {project.writeup && (
              <a className="btn btn--ghost" href={project.writeup} target="_blank" rel="noreferrer">
                <DocIcon /> Technical Writeup
              </a>
            )}
          </footer>
        </div>
      </motion.div>
    </motion.div>
  )
}
