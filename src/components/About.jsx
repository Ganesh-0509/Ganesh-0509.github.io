import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { about, profile } from '../data/content'
import { useCountUp } from '../lib/hooks'
import Reveal from './Reveal'

function Stat({ value, suffix, label, start }) {
  const n = useCountUp(value, start)
  return (
    <div className="stat">
      <span className="stat-value">
        {n}<span className="accent">{suffix}</span>
      </span>
      <span className="stat-label mono">{label}</span>
    </div>
  )
}

export default function About() {
  const statsRef = useRef(null)
  const inView = useInView(statsRef, { once: true, margin: '-20% 0px' })

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="chapter">
          <span className="kicker">About</span>
          <span className="kicker">Saveetha · CGPA 8.2</span>
        </div>

        <div className="about-grid">
          <div className="about-body">
            <Reveal>
              <p className="lead about-lead">
                I don&rsquo;t just study AI — I build with it, and I measure what I
                build.
              </p>
            </Reveal>
            {about.story.map((p, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <p className="about-para muted">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Uncropped — the portrait keeps its own aspect ratio. */}
          <Reveal className="about-portrait">
            <img src={profile.photo} alt={profile.name} loading="lazy" decoding="async" />
          </Reveal>
        </div>

        {/* Stats run horizontally under the full width, so the right column
            doesn't leave a tall gap under the portrait. */}
        <div className="about-stats" ref={statsRef}>
          {about.stats.map((s) => (
            <Stat key={s.label} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
