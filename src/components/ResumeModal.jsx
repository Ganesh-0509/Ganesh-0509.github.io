import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { CloseIcon, DownloadIcon, ExternalIcon, MailIcon } from './Icons'

const EASE = [0.22, 1, 0.36, 1]

// Embedded résumé preview with a one-click download.
// The <object> tag degrades on its own: browsers without an inline PDF viewer
// (most mobile ones) render the fallback children instead of a blank box.
export default function ResumeModal({ onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)

    const gap = window.innerWidth - document.documentElement.clientWidth
    const prev = document.body.style.cssText
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    closeRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.cssText = prev
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="modal modal--resume"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Résumé preview"
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <header className="resume-head">
          <div>
            <h3 className="resume-title">{profile.name} — Résumé</h3>
            <p className="resume-sub mono dim">{profile.headline}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="modal-close modal-close--inline"
            onClick={onClose}
            aria-label="Close résumé"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="resume-frame">
          <object data={profile.resumeUrl} type="application/pdf" aria-label="Résumé PDF preview">
            <div className="resume-fallback">
              <p className="muted">
                Your browser can&rsquo;t preview PDFs inline — open or download it instead.
              </p>
              <a className="btn btn--primary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <ExternalIcon /> Open résumé
              </a>
            </div>
          </object>
        </div>

        <footer className="resume-actions">
          <a
            className="btn btn--primary"
            href={profile.resumeUrl}
            download="Ganesh_Kumar_Resume.pdf"
          >
            <DownloadIcon /> Download PDF
          </a>
          <a className="btn btn--ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <ExternalIcon /> Open in new tab
          </a>
          <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
            <MailIcon /> Email me
          </a>
        </footer>
      </motion.div>
    </motion.div>
  )
}
