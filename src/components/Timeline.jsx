import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Aceternity's Timeline, ported to plain CSS + framer-motion.
//
// Same API as the original — `data: [{ title, content }]` — so entries stay
// declarative. Three behaviours:
//   • Each title sticks while its content scrolls past it.
//   • A beam fills the rail as you scroll, driven by useScroll progress.
//   • The entry you're actually reading is marked active: its date goes to full
//     contrast and its dot fills, while the rest sit back. Without this the
//     sticky date is just a label that happens not to move — the active state is
//     what makes one entry "open up" at a time as you scroll.
//
// The beam is absolutely positioned, so animating its height reflows nothing
// else on the page. Everything else is transform/opacity.
// ─────────────────────────────────────────────────────────────────────────────
export default function Timeline({ data }) {
  const listRef = useRef(null)
  const containerRef = useRef(null)
  const rowRefs = useRef([])
  const [railHeight, setRailHeight] = useState(0)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  // Which entry is the reader on? A band across the upper-middle of the
  // viewport, so an entry becomes active as it settles under the sticky date
  // rather than the instant its first pixel appears.
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean)
    if (!rows.length) return

    // Track the whole visible set rather than reacting to individual events.
    // Short entries mean two rows can sit in the band at once; taking the
    // topmost gives one unambiguous answer instead of a flicker between them.
    const visible = new Set()

    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          const i = rows.indexOf(r.target)
          if (i < 0) continue
          if (r.isIntersecting) visible.add(i)
          else visible.delete(i)
        }
        if (visible.size) setActive(Math.min(...visible))
      },
      { rootMargin: '-18% 0px -55% 0px', threshold: 0 }
    )

    rows.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [data])

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
          <div
            className={`tl-row ${i === active ? 'tl-row--active' : ''}`}
            key={`${item.title}-${i}`}
            ref={(el) => { rowRefs.current[i] = el }}
          >
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
