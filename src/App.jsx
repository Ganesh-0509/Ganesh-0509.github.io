import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useSmoothScroll } from './lib/hooks'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Wins from './components/Wins'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useSmoothScroll()

  return (
    // The CSS prefers-reduced-motion block can't reach Framer Motion — its
    // animations are JS-driven, so the timeline beam and every reveal still ran
    // at full travel for readers who asked for less.
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Navbar />

      <main>
        <Hero loaded={loaded} />
        <About />
        <Skills />
        <Work />
        <Wins />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </MotionConfig>
  )
}
