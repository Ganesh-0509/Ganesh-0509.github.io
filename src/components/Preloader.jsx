import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Intro: a dark sheet with a curved lower edge that sweeps up off the page.
//
// The bottom of the sheet bulges downward in a shallow parabola, so the middle
// of the screen stays covered a moment longer than the edges. As the sheet
// rises, that bulge flattens — the curve is doing the work, not the travel, and
// it reads as one continuous surface peeling away rather than a panel sliding.
//
// NO STOPS. The stepped version read as stutter: a pause mid-motion looks like
// dropped frames or a stuck animation, not ceremony. Anything that could be
// mistaken for jank on a portfolio is a bad trade, so this is a single eased
// sweep with nothing interrupting it.
//
// High contrast on purpose — near-black over a cream page, so the reveal is
// unmissable instead of paper-on-paper.
//
// Only `transform` animates. The page behind is already mounted, so the hero's
// own entrance overlaps the sweep instead of queuing after it.
// ─────────────────────────────────────────────────────────────────────────────

// Just long enough to register as a deliberate cover without feeling frozen or stuck.
const HOLD = 120

// The curve's depth, in vh. The sheet is 100vh + this, so `y: -100%` clears
// both the body and the lip in one move.
const LIP = 16

// Responsive ease: starts moving immediately on frame 1 without the sluggish flat-start
// of the previous curve, then decelerates smoothly into place.
const EASE = [0.22, 1, 0.36, 1]

const sheet = {
  initial: { y: '0%' },
  animate: { y: '0%' },
  exit: {
    y: '-100%',
    transition: { duration: 0.68, ease: EASE },
  },
}

// The bulge retracts as the sheet lifts, so the curve flattens on the way out.
// Without this the parabola just travels, which looks rigid.
const lip = {
  initial: { scaleY: 1 },
  animate: { scaleY: 1 },
  exit: {
    scaleY: 0,
    transition: { duration: 0.68, ease: EASE },
  },
}

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 180 : HOLD)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  return (
    <motion.div
      className="preloader wave"
      style={{ '--lip': `${LIP}vh` }}
      variants={reduce ? undefined : sheet}
      initial="initial"
      animate="animate"
      exit={reduce ? { opacity: 0 } : 'exit'}
      transition={reduce ? { duration: 0.3 } : undefined}
      aria-hidden="true"
    >
      <span className="wave-body" />
      <motion.span className="wave-lip" variants={reduce ? undefined : lip} />
    </motion.div>
  )
}
