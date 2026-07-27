import { motion, useReducedMotion } from 'framer-motion'
import WebNet from './WebNet'

// ─────────────────────────────────────────────────────────────────────────────
// The end of the strand: a small web that comes apart.
//
// The web fades and lifts while a handful of loose silk strands drift outward
// and dissolve. Deliberately minimal — a few thin lines, no burst, no particles.
// It plays once, at the bottom of the timeline only.
// ─────────────────────────────────────────────────────────────────────────────
const STRANDS = 7

export default function WebScatter({ size = 96 }) {
  const reduce = useReducedMotion()

  return (
    <span className="tl-scatter" aria-hidden="true">
      <motion.span
        className="tl-scatter-web"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={reduce ? { opacity: 0.5, scale: 1 } : { opacity: [0, 0.65, 0], scale: [0.7, 1, 1.35] }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: reduce ? 0.2 : 2.1, times: reduce ? undefined : [0, 0.35, 1], ease: 'easeOut' }}
      >
        <WebNet size={size} spokes={10} rings={3} strokeWidth={0.8} />
      </motion.span>

      {Array.from({ length: STRANDS }, (_, i) => {
        const a = (i / STRANDS) * Math.PI * 2 + 0.4
        const dist = 34 + (i % 3) * 16
        return (
          <motion.i
            key={i}
            className="tl-strand"
            style={{ rotate: `${(a * 180) / Math.PI}deg` }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            whileInView={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: [0, 0.55, 0],
                    x: Math.cos(a) * dist,
                    y: Math.sin(a) * dist,
                  }
            }
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
          />
        )
      })}
    </span>
  )
}
