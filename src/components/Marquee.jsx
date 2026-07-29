import { useReducedMotion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Infinite marquee strip.
//
// Built to the standard technique: exactly TWO copies of the track, the second
// marked aria-hidden so a screen reader doesn't read the list twice, and a
// shared --gap custom property. The gap has to be part of the translate
// distance — animating to plain -100% leaves a visible jump at the loop point
// because the flex gap isn't accounted for.
//
// DELIBERATELY DECORATIVE. The guidance on marquees is that they should carry
// decorative content only, never critical information — a recruiter scanning
// for "does he know FastAPI" cannot read moving text. So this strip is texture:
// the same tools are listed, readable and hoverable, in the Skills matrix above
// it. Nothing here is the only copy of anything.
//
// On prefers-reduced-motion the animation stops and the track wraps, so it
// degrades into an ordinary static row rather than freezing mid-slide.
// ─────────────────────────────────────────────────────────────────────────────
export default function Marquee({ items, speed = 60 }) {
  const reduce = useReducedMotion()

  const track = (hidden) => (
    <ul className="mq-track" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li className="mq-item mono" key={`${item}-${i}`}>
          {item}
          <span className="mq-sep" aria-hidden="true">/</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={`mq ${reduce ? 'mq--static' : ''}`}
      style={{ '--mq-duration': `${speed}s` }}
    >
      {track(false)}
      {/* The duplicate exists purely to fill the gap the first one leaves. */}
      {!reduce && track(true)}
    </div>
  )
}
