import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon, AlertIcon, CloseIcon } from './Icons'

// Minimal toast layer. Lives at the app root so any component can fire feedback
// without prop-drilling, and so the toast itself never re-renders the page —
// only this provider's subtree updates when a toast appears.

const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

const AUTO_DISMISS = 5000

function Toast({ t, onDismiss }) {
  return (
    <motion.li
      className={`toast toast--${t.tone}`}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="toast-icon" aria-hidden="true">
        {t.tone === 'error' ? <AlertIcon /> : <CheckIcon />}
      </span>
      <div className="toast-copy">
        <strong className="toast-title">{t.title}</strong>
        {t.body && <span className="toast-body">{t.body}</span>}
      </div>
      <button type="button" className="toast-close" onClick={() => onDismiss(t.id)} aria-label="Dismiss">
        <CloseIcon width="15" height="15" />
      </button>
    </motion.li>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) { clearTimeout(timer); timers.current.delete(id) }
  }, [])

  const push = useCallback(
    (toast) => {
      const id = nextId.current++
      setToasts((list) => [...list, { id, tone: 'success', ...toast }])
      timers.current.set(id, setTimeout(() => dismiss(id), AUTO_DISMISS))
      return id
    },
    [dismiss]
  )

  // Clear pending timers if the provider ever unmounts.
  useEffect(() => {
    const pending = timers.current
    return () => { pending.forEach(clearTimeout); pending.clear() }
  }, [])

  return (
    <ToastContext.Provider value={push}>
      {children}
      <ul className="toast-stack" role="status" aria-live="polite">
        <AnimatePresence initial={false}>
          {toasts.map((t) => <Toast key={t.id} t={t} onDismiss={dismiss} />)}
        </AnimatePresence>
      </ul>
    </ToastContext.Provider>
  )
}
