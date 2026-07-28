import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSmoothScroll, useHashRoute, isRoute } from './lib/hooks'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Wins from './components/Wins'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ResumeModal from './components/ResumeModal'
import ProjectsPage from './components/ProjectsPage'
import { ToastProvider } from './components/Toast'
import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const route = useHashRoute()
  useSmoothScroll()

  // Stable identities so Hero/Contact don't re-render on unrelated state changes.
  const openResume = useCallback(() => setResumeOpen(true), [])
  const closeResume = useCallback(() => setResumeOpen(false), [])

  const onProjectsPage = isRoute(route) && route.startsWith('#/projects')

  return (
    <ToastProvider>
      <a className="skip-link" href="#main">Skip to content</a>

      {/* The preloader is a first-visit thing — skip it on a deep link. */}
      <AnimatePresence>
        {!loaded && !onProjectsPage && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Navbar onResume={openResume} onPage={onProjectsPage} />

      <main id="main">
        {onProjectsPage ? (
          <ProjectsPage />
        ) : (
          <>
            <Hero loaded={loaded} onResume={openResume} />
            <About />
            <Skills />
            <Work />
            <Wins />
            <Contact onResume={openResume} />
          </>
        )}
      </main>

      <Footer onResume={openResume} />

      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={closeResume} />}
      </AnimatePresence>
    </ToastProvider>
  )
}
