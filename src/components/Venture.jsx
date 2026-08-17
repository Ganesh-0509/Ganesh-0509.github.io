import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { about } from '../data/content'
import { ExternalIcon } from './Icons'
import Reveal from './Reveal'
import TextGenerate from './TextGenerate'

// The one outbound hand-off on the page. PRODUCT.md names a third audience —
// people evaluating the studio rather than the candidate — and this is the only
// block written for them: it does not try to close the engagement here, it
// points at the place where that happens.
//
// Full-bleed card rather than a narrow one, and the width is load-bearing: the
// ask runs across the top at display scale, then the note and the button split
// the bottom row. A single measured column would not need the width.
export default function Venture() {
  const ref = useRef(null)
  // The headline writes itself in when the block is reached, not on mount —
  // otherwise it has finished animating long before anyone scrolls to it.
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const v = about.venture
  // Content-driven like every other section — drop `venture` from content.js and
  // the section leaves with it rather than rendering an empty band.
  if (!v?.url) return null

  return (
    <section id="venture" className="section venture">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Venture</span>
          <span className="kicker">{v.role}</span>
        </div>

        <div className="venture-card" ref={ref}>
          {/* Accent hairline that draws itself across the top edge as the card
              arrives. Marks this block as the hand-off without spending a
              second colour on it. */}
          <motion.span
            className="venture-edge"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <Reveal className="venture-eyebrow">
            <span className="venture-name mono">{v.name}</span>
            {v.hook && <span className="venture-aside mono dim">{v.hook}</span>}
          </Reveal>

          <TextGenerate
            as="h2"
            className="venture-ask"
            words={v.ask}
            start={inView}
            delay={0.12}
            stagger={0.07}
          />

          <div className="venture-foot">
            <Reveal delay={0.1}>
              <p className="venture-note muted">{v.note}</p>
            </Reveal>

            <Reveal delay={0.2} className="venture-action">
              <a
                className="btn btn--primary venture-cta"
                href={v.url}
                target="_blank"
                rel="noreferrer"
              >
                {v.cta}
                <ExternalIcon className="arr" width="16" height="16" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
