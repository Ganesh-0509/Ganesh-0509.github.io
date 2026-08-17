import { useCallback, useEffect, useState } from 'react'

// Light / dark, with a comparison-slider wipe between them.
//
// The wipe is the View Transitions API, not a hand-built overlay: the browser
// snapshots the page before and after the change and hands both to CSS, so
// animating a clip-path on the new snapshot slides its edge across the old one.
// That IS a before/after slider, and it costs no cloned DOM and nothing to
// clean up. See the wipe block in theme.css.
//
// Direction is written to <html data-wipe> a beat before the snapshot is taken,
// because the CSS that selects the animation has to already match when the
// transition starts:
//
//     light → dark   the edge travels right to left
//     dark  → light  the edge travels left to right

const KEY = 'gk:theme'

function initialTheme() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* storage blocked */ }
  // No stored choice: follow the operating system on the first visit only.
  // Once the toggle is used, the explicit choice wins for good.
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem(KEY, theme) } catch { /* storage blocked */ }
    // Keep the browser chrome in step, or the phone's address bar stays sage
    // while the page under it is forest.
    const paper = getComputedStyle(document.documentElement)
      .getPropertyValue('--paper').trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', paper)
  }, [theme])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const dir = next === 'dark' ? 'rtl' : 'ltr'
    const root = document.documentElement

    const swap = () => setTheme(next)

    // No View Transitions, or the visitor asked for less motion: change the
    // theme and skip the wipe. The page is still correct, it just cuts.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !document.startViewTransition) { swap(); return }

    root.dataset.wipe = dir

    // The leading edge of the wipe, as a real element. The snapshots the API
    // takes are flat images, so a hairline drawn INSIDE the page would be
    // baked into them and could not travel; this rides above both.
    const edge = document.createElement('div')
    edge.className = 'wipe-edge'
    document.body.appendChild(edge)

    const vt = document.startViewTransition(swap)
    vt.finished.finally(() => {
      edge.remove()
      delete root.dataset.wipe
    })
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className="theme-toggle-ico theme-toggle-ico--sun"><SunIcon /></span>
      <span className="theme-toggle-ico theme-toggle-ico--moon"><MoonIcon /></span>
      <span className="theme-toggle-knob" aria-hidden="true">
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  )
}
