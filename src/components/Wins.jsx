import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { wins } from '../data/content'
import Reveal from './Reveal'
import WebNet from './WebNet'
import WebScatter from './WebScatter'

const EASE = [0.22, 1, 0.36, 1]

// ─────────────────────────────────────────────────────────────────────────────
// Achievements as a centre-rail timeline, alternating left/right.
//
// The rail is a static hairline with a red "web-thread" beam on top whose
// scaleY tracks scroll progress through the section — the line spins itself as
// you read down, and each entry's node snaps in when it enters view.
//
// Built on framer-motion (already a dependency): useScroll → useSpring →
// useTransform. GSAP ScrollTrigger would have cost ~78 KB gzipped for this one
// section. Only transform/opacity animate, so nothing triggers layout.
//
// Below 760px the centre rail can't hold two readable columns, so every row
// collapses to a single left-aligned column (see App.css). That's not a
// compromise — forcing a centre rail onto a phone is how this pattern usually
// breaks.
// ─────────────────────────────────────────────────────────────────────────────
export default function Wins() {
  const trackRef = useRef(null)
  const reduce = useReducedMotion()

  // Newest first. Sorting here rather than relying on array order means adding
  // an achievement to content.js can never put the timeline out of sequence.
  const ordered = [...wins].sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 78%', 'end 65%'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const scaleY = useTransform(smooth, [0, 1], [0, 1])

  return (
    <section id="wins" className="section wins">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Highlights</span>
        </div>

        <Reveal><h2 className="section-title">Proof of <em>work</em>.</h2></Reveal>

        <div className="tl" ref={trackRef}>
          {/* ONE web, white, at the head of the strand — the anchor point the
              whole timeline hangs from. Previously there was a red web behind
              every single node, which read as clutter and collided down the rail. */}
          <motion.span
            className="tl-anchor"
            aria-hidden="true"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.72, rotate: reduce ? 0 : -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: reduce ? 0.2 : 1.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <WebNet size={340} spokes={14} rings={5} strokeWidth={0.85} />
          </motion.span>

          <div className="tl-rail" aria-hidden="true">
            <motion.div className="tl-beam" style={reduce ? { scaleY: 1 } : { scaleY }} />
          </div>

          <ol className="tl-list">
            {ordered.map((w, i) => {
              const left = i % 2 === 0
              // The card is rendered ONCE into its own side; the opposite side
              // is an empty spacer. Rendering it into both and hiding one would
              // duplicate every achievement in the DOM.
              const card = (
                <motion.div
                  className="tl-card"
                  initial={{ opacity: 0, x: reduce ? 0 : left ? -18 : 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-12% 0px' }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {w.chip && <span className="tl-chip mono">{w.chip}</span>}
                  <h3 className="tl-title">{w.title}</h3>
                  <p className="tl-detail muted">{w.detail}</p>
                  {/* appears the moment a real post URL lands in content.js */}
                  {w.linkedinUrl && (
                    <a className="tl-link tlink tlink--accent" href={w.linkedinUrl} target="_blank" rel="noreferrer">
                      Read the post <span className="arr">↗</span>
                    </a>
                  )}
                </motion.div>
              )

              return (
                <li className={`tl-row ${left ? 'tl-row--l' : 'tl-row--r'}`} key={w.title}>
                  <div className="tl-side tl-side--l">{left && card}</div>

                  <div className="tl-node">
                    <motion.span
                      className="tl-dot"
                      aria-hidden="true"
                      initial={{ scale: reduce ? 1 : 0.4, opacity: reduce ? 1 : 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-12% 0px' }}
                      transition={{ duration: 0.34, ease: EASE, delay: 0.12 }}
                    >
                      {w.medal}
                    </motion.span>
                    <span className="tl-year mono">{w.year}</span>
                  </div>

                  <div className="tl-side tl-side--r">{!left && card}</div>
                </li>
              )
            })}
          </ol>

          {/* the strand runs out and the last of the silk drifts apart */}
          <WebScatter size={96} />
        </div>
      </div>
    </section>
  )
}

