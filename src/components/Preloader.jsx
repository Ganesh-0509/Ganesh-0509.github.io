import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import WebNet from './WebNet'

// ─────────────────────────────────────────────────────────────────────────────
// Loading screen: a web spins itself into existence over the name, then the
// whole panel shatters outward and the page is behind it.
//
// The shatter is eight wedges clipped out of one full-screen panel. Each wedge
// carries the same background colour, so at rest they read as a single solid
// sheet; on exit each flies along its own angle and the sheet breaks apart.
//
// No Marvel artwork is used — the web is generated geometry (see WebNet), which
// gets the feel without shipping someone else's copyrighted image on a public
// site. Drop your own image in here if you have one you own.
// ─────────────────────────────────────────────────────────────────────────────

const SHARDS = 8

// Wedges radiating from the centre, as clip-path polygons. Points are in %,
// deliberately irregular so the break doesn't look like a pie chart.
const wedge = (i) => {
  const a0 = (i / SHARDS) * 360 - 90
  const a1 = ((i + 1) / SHARDS) * 360 - 90
  const jitter = [0, 6, -4, 8, -6, 3, -8, 5][i % 8]
  const far = 160 // beyond the viewport corners so the wedge always covers
  const p = (deg, r) => {
    const rad = (deg * Math.PI) / 180
    return `${(50 + Math.cos(rad) * r).toFixed(1)}% ${(50 + Math.sin(rad) * r).toFixed(1)}%`
  }
  return `polygon(50% 50%, ${p(a0 + jitter * 0.2, far)}, ${p((a0 + a1) / 2 + jitter, far)}, ${p(a1 + jitter * 0.2, far)})`
}

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    let raf
    let start = null
    const duration = reduce ? 500 : 1400
    const tick = (now) => {
      if (start === null) start = now
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, reduce ? 80 : 260)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone, reduce])

  return (
    <div className="preloader" aria-hidden="true">
      {/* the sheet, in shards */}
      {Array.from({ length: SHARDS }, (_, i) => {
        const a = (i / SHARDS) * Math.PI * 2 - Math.PI / 2
        return (
          <motion.div
            key={i}
            className="preloader-shard"
            style={{ clipPath: wedge(i), WebkitClipPath: wedge(i) }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0.14 } }
                : {
                    x: Math.cos(a) * 620,
                    y: Math.sin(a) * 620,
                    rotate: (i % 2 ? 1 : -1) * (10 + i * 2),
                    opacity: 0,
                    transition: { duration: 0.78, ease: [0.7, 0, 0.84, 0], delay: i * 0.012 },
                  }
            }
          />
        )
      })}

      {/* the web + name sit above the shards and leave first */}
      <motion.div
        className="preloader-mark"
        exit={{ opacity: 0, scale: reduce ? 1 : 1.16, transition: { duration: 0.3, ease: 'easeIn' } }}
      >
        <motion.span
          className="preloader-web"
          initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: reduce ? 0.2 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <WebNet size={420} spokes={14} rings={5} strokeWidth={1.1} />
        </motion.span>

        <span className="preloader-name serif">Ganesh Kumar T</span>
        <span className="preloader-count mono">{String(count).padStart(3, '0')}</span>
      </motion.div>
    </div>
  )
}
