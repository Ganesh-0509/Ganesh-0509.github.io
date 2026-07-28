import { useCallback, useEffect, useRef, useState } from 'react'
import { autocomplete, bootLines, runCommand, suggestedCommands } from '../lib/terminal'

// ─────────────────────────────────────────────────────────────────────────────
// Interactive hero shell. It only ever runs what the visitor asks it to — the
// panel's own idle motion is a CSS float on the container (see .term in
// App.css), not simulated typing.
//
// Perf notes — this is the one component on the page that takes keystrokes, so
// it is deliberately self-contained:
//   • All state lives here. Typing never re-renders Hero or anything above it.
//   • Output lines mount all at once and stagger via a CSS animation-delay,
//     so a 30-line `projects` dump costs ONE render, not thirty. The reveal
//     runs on opacity/transform only — compositor work, no layout.
//   • History is capped so a long session can't grow the DOM without bound.
// ─────────────────────────────────────────────────────────────────────────────

const MAX_BLOCKS = 40

function Line({ text, tone, href, index }) {
  // --i drives the stagger; capped so late lines don't wait absurdly long.
  const style = { '--i': Math.min(index, 18) }
  const className = `term-line term-line--${tone || 'out'}`

  if (href) {
    return (
      <a
        className={className}
        style={style}
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noreferrer"
      >
        {text}
      </a>
    )
  }
  // Non-breaking space keeps blank spacer lines from collapsing.
  return <span className={className} style={style}>{text || ' '}</span>
}

export default function Terminal({ onResume }) {
  const [blocks, setBlocks] = useState([{ id: 0, kind: 'out', lines: bootLines }])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIndex, setHistIndex] = useState(-1)

  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const nextId = useRef(1)

  // Keep the newest output in view without animating scroll on every keystroke.
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [blocks])

  const submit = useCallback(
    (raw) => {
      const value = raw.trim()
      if (!value) return

      const { lines, action } = runCommand(value)

      setHistory((h) => [...h, value])
      setHistIndex(-1)
      setInput('')

      if (action === 'clear') {
        setBlocks([])
        return
      }
      if (action === 'resume') onResume?.()

      setBlocks((b) => {
        const next = [
          ...b,
          { id: nextId.current++, kind: 'cmd', text: value },
          { id: nextId.current++, kind: 'out', lines },
        ]
        return next.length > MAX_BLOCKS ? next.slice(next.length - MAX_BLOCKS) : next
      })
    },
    [onResume]
  )

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit(input)
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const completed = autocomplete(input)
      if (completed) setInput(completed)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const i = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1)
      setHistIndex(i)
      setInput(history[i])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIndex === -1) return
      const i = histIndex + 1
      if (i >= history.length) {
        setHistIndex(-1)
        setInput('')
      } else {
        setHistIndex(i)
        setInput(history[i])
      }
    }
  }

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="term-titlebar mono">ganesh@portfolio: ~</span>
      </div>

      {/* data-lenis-prevent: Lenis captures wheel events for the whole page,
          so without this the panel can never scroll internally. */}
      <div className="term-body" ref={bodyRef} data-lenis-prevent>
        <div aria-live="polite" aria-atomic="false">
          {blocks.map((b) =>
            b.kind === 'cmd' ? (
              <div key={b.id} className="term-line term-line--cmd" style={{ '--i': 0 }}>
                <span className="term-prompt" aria-hidden="true">$</span>
                <span>{b.text}</span>
              </div>
            ) : (
              <div key={b.id} className="term-block">
                {b.lines.map((l, i) => <Line key={i} index={i} {...l} />)}
              </div>
            )
          )}
        </div>

        <div className="term-input-row">
          <span className="term-prompt" aria-hidden="true">$</span>
          <input
            ref={inputRef}
            className="term-input mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input — type a command such as help, skills or projects"
            placeholder="type 'help'"
          />
        </div>
      </div>

      <div className="term-chips">
        {suggestedCommands.map((c) => (
          <button
            key={c}
            type="button"
            className="term-chip mono"
            onClick={() => submit(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
