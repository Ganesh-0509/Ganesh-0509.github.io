import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { scrollToId } from '../lib/hooks'
import { GithubIcon, LinkedinIcon, DownloadIcon } from './Icons'
import TextGenerate from './TextGenerate'
import Terminal from './Terminal'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero({ loaded, onResume }) {
  // opacity + a short rise, staggered. Both compositor properties.
  const rise = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { delay, duration: 0.7, ease: EASE },
  })

  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-lede">
          <motion.h1 className="display hero-title" {...rise(0.16)}>
            {profile.headline.split('&')[0].trim()} <em>&amp;</em>
            <br />
            {profile.headline.split('&')[1].trim()}
          </motion.h1>

          <motion.p className="hero-specialisms mono" {...rise(0.24)}>
            {profile.specialisms.map((s, i) => (
              <span key={s}>
                {i > 0 && <span className="hero-sep" aria-hidden="true">·</span>}
                {s}
              </span>
            ))}
          </motion.p>

          {/* Word-by-word blur-in — the summary is the one block of prose long
              enough for the effect to read as writing rather than flicker. */}
          <TextGenerate
            className="hero-summary"
            words={profile.summary}
            start={loaded}
            delay={0.34}
          />

          {/* Above the fold, in priority order: see the work, take the CV, find me. */}
          <motion.div className="hero-actions" {...rise(0.4)}>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => scrollToId('work')}
            >
              View Projects <span className="arr" aria-hidden="true">→</span>
            </button>

            <a
              className="btn btn--ghost"
              href={profile.resumeUrl}
              download="Ganesh_Kumar_Resume.pdf"
              onClick={(e) => {
                // Prefer the in-page preview; the href stays as the no-JS fallback.
                if (onResume) { e.preventDefault(); onResume() }
              }}
            >
              <DownloadIcon /> Download Resume
            </a>

            <div className="hero-socials">
              <a
                className="btn btn--ghost btn--icon"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <GithubIcon />
              </a>
              <a
                className="btn btn--ghost btn--icon"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-term"
          initial={{ opacity: 0, y: 22 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ delay: 0.34, duration: 0.8, ease: EASE }}
        >
          <Terminal onResume={onResume} />
        </motion.div>
      </div>
    </section>
  )
}
