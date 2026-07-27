import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/content'
import { getLenis } from '../lib/hooks'
import Reveal from './Reveal'

const EASE = [0.22, 1, 0.36, 1]

function ProjectCard({ p, n, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: (n % 2) * 0.08 }}
      className="pcard"
    >
      <button
        type="button"
        className={`pcard-media tone-${p.tone}`}
        onClick={() => onOpen(p)}
        aria-label={`Read the story: ${p.title}`}
      >
        <span className="pcard-chrome" aria-hidden="true"><i /><i /><i /></span>
        {p.image
          ? <img src={p.image} alt={p.title} loading="lazy" />
          : <span className="pcard-ph serif">{p.title}</span>}
      </button>

      <div className="pcard-body">
        <h3 className="pcard-title">{p.title}</h3>
        {/* The blurb was styled in App.css but never rendered — a visitor
            scanning this grid saw four names and no idea what any of them are. */}
        <p className="pcard-blurb">{p.blurb}</p>
        <ul className="pcard-tech">
          {p.tech.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <button type="button" className="pcard-link tlink tlink--accent" onClick={() => onOpen(p)}>
          Read the story <span className="arr">→</span>
        </button>
      </div>
    </motion.article>
  )
}

function StoryModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)

    // `body.overflow` alone did nothing: Lenis drives the scroll, so the page
    // kept moving behind the open modal (~900px of leak on one wheel gesture).
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [onClose])

  const story = project.story || [project.blurb]

  return (
    <motion.div
      className="story-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="story-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <button type="button" className="story-close" onClick={onClose} aria-label="Close">×</button>

        {project.image && (
          <div className={`story-media tone-${project.tone}`}>
            <span className="pcard-chrome" aria-hidden="true"><i /><i /><i /></span>
            <img src={project.image} alt={project.title} />
          </div>
        )}

        <div className="story-body">
          <h3 className="story-title">{project.title}</h3>
          {story.map((para, i) => <p key={i} className="story-para muted">{para}</p>)}
          <p className="story-tech mono">{project.tech.join('  ·  ')}</p>

          <div className="story-links">
            {project.demo && (
              <a className="tlink tlink--accent" href={project.demo} target="_blank" rel="noreferrer">
                Live demo <span className="arr">↗</span>
              </a>
            )}
            {project.repo && (
              <a className="tlink" href={project.repo} target="_blank" rel="noreferrer">
                View code <span className="arr">↗</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  // The four best — those flagged `featured` in content.js.
  const featured = projects.filter((p) => p.featured)
  const [active, setActive] = useState(null)

  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Selected work</span>
        </div>

        <div className="work-head">
          <Reveal><h2 className="section-title">Things I’ve <em>built</em> &amp; shipped.</h2></Reveal>
        </div>

        <div className="pcard-grid">
          {featured.map((p, i) => <ProjectCard key={p.title} p={p} n={i} onOpen={setActive} />)}
        </div>
      </div>

      <AnimatePresence>
        {active && <StoryModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
