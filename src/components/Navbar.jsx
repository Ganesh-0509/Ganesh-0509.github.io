import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { navLinks, profile } from '../data/content'
import { scrollToId, useActiveSection } from '../lib/hooks'
import { DownloadIcon } from './Icons'

const ids = navLinks.map((l) => l.id)

// Every nav destination, including the two that aren't section anchors in
// navLinks, so the hover pill can travel across the whole row.
const items = [...navLinks, { id: 'contact', label: 'Contact' }]

// ─────────────────────────────────────────────────────────────────────────────
// Two Aceternity behaviours, ported to plain CSS + framer-motion (this project
// has no Tailwind, so the published component can't be dropped in as-is):
//
//   1. Resizable shell — past ~40px of scroll the bar contracts into a floating
//      blurred pill. One spring on width/y at a threshold, not per-frame.
//   2. Magnetic hover pill — a single shared `layoutId` element. When `hovered`
//      changes, framer matches the unmounting pill to the mounting one and
//      tweens between them, so the highlight slides rather than blinks.
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar({ onResume, onPage = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [open, setOpen] = useState(false)
  // No sections are mounted on a standalone page, so nothing should read active.
  const observed = useActiveSection(ids)
  const active = onPage ? null : observed
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Passive listener + a boolean flip: state only changes when the scroll
    // position crosses the threshold, not on every scroll event.
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (id) => {
    setOpen(false)
    setHovered(null)
    // From a standalone page, return home first — the target section isn't
    // mounted yet, so the scroll has to wait for the route to swap.
    if (onPage) {
      window.location.hash = ''
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)))
      return
    }
    scrollToId(id)
  }

  return (
    <motion.header
      className="nav"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`nav-shell ${scrolled ? 'nav-shell--pill' : ''}`}
        animate={
          reduceMotion
            ? {}
            : { width: scrolled ? '86%' : '100%', y: scrolled ? 6 : 0 }
        }
        transition={{ type: 'spring', stiffness: 220, damping: 34, mass: 0.9 }}
      >
        <div className="nav-inner">
          <a
            href="#home"
            className="nav-logo mono"
            onClick={(e) => { e.preventDefault(); go('home') }}
          >
            <span className="nav-logo-mark" aria-hidden="true">/</span>
            {profile.shortName.toLowerCase()}
          </a>

          <nav
            className={`nav-links ${open ? 'nav-links--open' : ''}`}
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
          >
            {items.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`nav-link ${active === l.id ? 'nav-link--active' : ''}`}
                aria-current={active === l.id ? 'page' : undefined}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onClick={(e) => { e.preventDefault(); go(l.id) }}
              >
                {hovered === i && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="nav-pill"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nav-label">{l.label}</span>
              </a>
            ))}

            <button
              type="button"
              className="btn btn--primary nav-cta"
              onClick={() => { setOpen(false); onResume?.() }}
            >
              <DownloadIcon width="16" height="16" /> Resume
            </button>
          </nav>

          <button
            className={`nav-burger ${open ? 'nav-burger--open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span />
          </button>
        </div>
      </motion.div>
    </motion.header>
  )
}
