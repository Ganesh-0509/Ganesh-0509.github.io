import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

// Global Lenis smooth-scroll instance, exposed so nav links can scrollTo().
let lenisInstance = null
export const getLenis = () => lenisInstance

export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisInstance = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

// Smoothly scroll to a section id (works with or without Lenis).
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.3 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

// ── Minimal hash router ──────────────────────────────────────────────────────
// The site is a single Vite entry with no router dependency. Routes are hash
// paths (`#/projects`), which keeps deep links working on GitHub Pages without
// any server rewrite rules. Section anchors use scrollToId + preventDefault, so
// they never write to the hash and never collide with a route.
export function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// True when the hash points at a standalone page rather than a section anchor.
export const isRoute = (hash) => hash.startsWith('#/')

export function navigate(hash) {
  if (window.location.hash === hash) return
  window.location.hash = hash
}

// Tracks which section is currently in view for nav highlighting.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

// Animated number counter that runs once when `start` flips true.
export function useCountUp(target, start, duration = 1600) {
  const [value, setValue] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!start || started.current) return
    started.current = true
    let raf
    let startTime = null
    const tick = (now) => {
      if (startTime === null) startTime = now
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}
