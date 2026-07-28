import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Aceternity's Timeline, ported to plain CSS + framer-motion.
//
// Same API as the original — `data: [{ title, content }]` — so entries stay
// declarative. Two behaviours:
//   • Each title sticks while its content scrolls past it.
//   • A beam fills the rail as you scroll, driven by useScroll progress.
//
// The beam is absolutely positioned, so animating its height reflows nothing
// else on the page. Everything else is transform/opacity.
// ─────────────────────────────────────────────────────────────────────────────
export default function Timeline({ data }) {
  const listRef = useRef(null)
  const containerRef = useRef(null)
  const [railHeight, setRailHeight] = useState(0)
  const reduce = useReducedMotion()

  // Measure the rail, and keep it correct when the layout reflows (font load,
  // resize, image decode).
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const measure = () => setRailHeight(el.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [data])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 15%', 'end 60%'],
  })

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, railHeight])
  const beamOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  return (
    <div className="tl" ref={containerRef}>
      <div className="tl-list" ref={listRef}>
        {/* The rail: a static hairline with a filling beam on top. */}
        <div className="tl-rail" aria-hidden="true">
          {reduce ? (
            <div className="tl-beam tl-beam--static" />
          ) : (
            <motion.div
              className="tl-beam"
              style={{ height: beamHeight, opacity: beamOpacity }}
            />
          )}
        </div>

        {data.map((item, i) => (
          <div className="tl-row" key={`${item.title}-${i}`}>
            <div className="tl-marker">
              <span className="tl-dot" aria-hidden="true"><i /></span>
              <h3 className="tl-title">{item.title}</h3>
            </div>

            <motion.div
              className="tl-content"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Repeated small for narrow screens, where the sticky rail
                  title is too cramped to carry the label. */}
              <span className="tl-title-inline mono">{item.title}</span>
              {item.content}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
