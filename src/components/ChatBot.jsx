import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getAnswer, greeting } from '../lib/chatbot'

// A floating, fully-static assistant. Answers from portfolio data — no LLM.
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
// Mask mark — the silhouette and the two lenses, plus a few web strands.
// Drawn as geometry rather than using Marvel artwork, which would be someone
// else's copyright on a public site.
function SparkIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      {/* mask silhouette */}
      <path
        d="M16 3c6.2 0 10.4 3.4 10.4 8.6 0 5.6-4 12-7.2 15.3a4.6 4.6 0 0 1-6.4 0C9.6 23.6 5.6 17.2 5.6 11.6 5.6 6.4 9.8 3 16 3Z"
        fill="currentColor"
      />
      {/* web strands across the brow */}
      <g stroke="rgba(14,14,17,0.55)" strokeWidth="0.7" fill="none" strokeLinecap="round">
        <path d="M16 3.6v9M8 6.6l8 6M24 6.6l-8 6M6.2 12.4 16 12.6M25.8 12.4 16 12.6" />
        <path d="M10.2 5.6C13 7.4 19 7.4 21.8 5.6M7.4 8.8C11 11 21 11 24.6 8.8" />
      </g>
      {/* lenses */}
      <path d="M13.4 10.6c-1.3-1.6-4.2-2.3-5.6-1.3-1.2.9-.5 3.1.9 4.3 1.6 1.4 4 1.3 4.9.2.7-.9.5-2.3-.2-3.2Z" fill="#0e0e11" />
      <path d="M18.6 10.6c1.3-1.6 4.2-2.3 5.6-1.3 1.2.9.5 3.1-.9 4.3-1.6 1.4-4 1.3-4.9.2-.7-.9-.5-2.3.2-3.2Z" fill="#0e0e11" />
      <path d="M12.6 10.9c-1-1.1-3.1-1.6-4.1-.9-.9.6-.4 2.2.6 3.1" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  )
}
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
    </svg>
  )
}

function Bubble({ m }) {
  return (
    <div className={`chat-msg chat-msg--${m.from}`}>
      <div className="chat-bubble">
        {m.text}
        {m.links?.length > 0 && (
          <div className="chat-links">
            {m.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="chat-link">
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', ...greeting }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Latest chips come from the most recent bot message.
  const lastBot = [...messages].reverse().find((m) => m.from === 'bot')
  const chips = !typing ? lastBot?.chips || [] : []

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const send = (raw) => {
    const text = raw.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...getAnswer(text) }])
      setTyping(false)
    }, reduce ? 120 : 520)
  }

  return (
    <>
      <motion.button
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
      >
        {open ? <CloseIcon /> : <SparkIcon />}
        {!open && <span className="chat-fab-ping" aria-hidden="true" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            role="dialog"
            aria-label="Ask about Ganesh"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="chat-header">
              <div>
                <span className="chat-title serif">Ganesh's lil’ assistant</span>
                <span className="chat-status"><span className="chat-dot" /> ask me anything ✦</span>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close"><CloseIcon /></button>
            </div>

            <div className="chat-body" ref={scrollRef}>
              {messages.map((m, i) => <Bubble key={i} m={m} />)}
              {typing && (
                <div className="chat-msg chat-msg--bot">
                  <div className="chat-bubble chat-typing"><span /><span /><span /></div>
                </div>
              )}

              {chips.length > 0 && (
                <div className="chat-chips">
                  {chips.map((c) => (
                    <button key={c} className="chat-chip" onClick={() => send(c)}>{c}</button>
                  ))}
                </div>
              )}
            </div>

            <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input) }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask about a project…"
                aria-label="Type your question"
              />
              <button type="submit" className="chat-send" aria-label="Send" disabled={!input.trim()}>
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
