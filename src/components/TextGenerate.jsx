import { motion, useReducedMotion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Aceternity's TextGenerateEffect, ported to plain CSS + framer-motion.
//
// The original drives it with `useAnimate` + `stagger()` and re-queries the DOM
// in an effect. Variants get the same result declaratively: the parent owns the
// stagger, each word owns its own tween, and nothing re-renders after mount —
// framer animates the spans directly.
//
// Words blur in rather than just fading, which is what gives it the "being
// written" quality instead of a plain reveal.
// ─────────────────────────────────────────────────────────────────────────────

const container = (delay, stagger) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
})

const word = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 6 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

// Reduced motion: no blur, no travel — just present the text.
const wordStill = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

export default function TextGenerate({
  words,
  start = true,
  delay = 0,
  stagger = 0.045,
  className = '',
  as = 'p',
}) {
  const reduce = useReducedMotion()
  const M = motion[as] || motion.p
  const variant = reduce ? wordStill : word

  return (
    <M
      className={`tg ${className}`}
      variants={container(delay, reduce ? 0.008 : stagger)}
      initial="hidden"
      animate={start ? 'show' : 'hidden'}
    >
      {words.trim().split(/\s+/).map((w, i) => (
        // The space lives OUTSIDE the span as a normal text node, so the
        // inline-block words still wrap and space like ordinary prose.
        <span key={`${w}-${i}`}>
          <motion.span className="tg-word" variants={variant}>{w}</motion.span>
          {' '}
        </span>
      ))}
    </M>
  )
}
