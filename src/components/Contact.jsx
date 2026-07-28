import { useState } from 'react'
import { profile, contactFormEndpoint } from '../data/content'
import { useToast } from './Toast'
import { MailIcon, GithubIcon, LinkedinIcon, DownloadIcon } from './Icons'
import Reveal from './Reveal'

// ── Validation ───────────────────────────────────────────────────────────────
// Rules live in one place so the blur handler, the change handler and submit
// all agree. Each returns an error string or '' when the field is valid.
const RULES = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your name.' : ''),
  email: (v) =>
    !v.trim() ? 'An email is required so I can reply.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'That doesn’t look like a valid email.'
        : '',
  subject: (v) => (v.trim().length < 3 ? 'Add a short subject.' : ''),
  message: (v) =>
    v.trim().length < 12 ? 'Tell me a little more — at least a sentence.' : '',
}

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Role, project, or question', autoComplete: 'off' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'What are you working on?', autoComplete: 'off' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact({ onResume }) {
  const toast = useToast()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sending, setSending] = useState(false)

  const validateAll = () =>
    Object.fromEntries(Object.entries(RULES).map(([k, fn]) => [k, fn(values[k])]))

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    // Only re-validate live once a field has been blurred — validating as
    // someone types their first character is hostile.
    if (touched[name]) setErrors((e) => ({ ...e, [name]: RULES[name](value) }))
  }

  const handleBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((e) => ({ ...e, [name]: RULES[name](values[name]) }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const found = validateAll()
    setErrors(found)
    setTouched({ name: true, email: true, subject: true, message: true })

    const firstBad = FIELDS.find((f) => found[f.name])
    if (firstBad) {
      document.getElementById(`field-${firstBad.name}`)?.focus()
      toast({
        tone: 'error',
        title: 'Check the highlighted fields',
        body: 'A couple of details are missing.',
      })
      return
    }

    // No endpoint configured — hand off to the visitor's mail client.
    if (!contactFormEndpoint) {
      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name} (${values.email})`
      )
      window.location.href =
        `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${body}`
      return
    }

    try {
      setSending(true)
      const res = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`)

      setValues(EMPTY)
      setTouched({})
      setErrors({})
      toast({
        tone: 'success',
        title: 'Message sent',
        body: 'Thanks — I usually reply within a day.',
      })
    } catch {
      toast({
        tone: 'error',
        title: 'That didn’t go through',
        body: `Email me directly at ${profile.email}.`,
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Contact</span>
          <span className="kicker">Replies within ~24h</span>
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <Reveal>
              <h2 className="section-title">
                Hiring, or building something <em>hard</em>?
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="section-lead muted">
                Agentic AI, applied ML and backend work — and always up for a
                good systems conversation.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="contact-cards">
              <a className="contact-card" href={`mailto:${profile.email}`}>
                <span className="contact-card-icon" aria-hidden="true"><MailIcon /></span>
                <span className="contact-card-label mono">Email directly</span>
                <span className="contact-card-value">{profile.email}</span>
              </a>

              <div className="contact-row">
                <a
                  className="btn btn--ghost"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon /> GitHub
                </a>
                <a
                  className="btn btn--ghost"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon /> LinkedIn
                </a>
                <button type="button" className="btn btn--ghost" onClick={onResume}>
                  <DownloadIcon /> Résumé
                </button>
              </div>

              <p className="contact-meta dim mono">Based in {profile.location}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="contact-right">
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              {FIELDS.map((f) => {
                const invalid = touched[f.name] && !!errors[f.name]
                const shared = {
                  id: `field-${f.name}`,
                  name: f.name,
                  value: values[f.name],
                  placeholder: f.placeholder,
                  autoComplete: f.autoComplete,
                  'aria-invalid': invalid,
                  'aria-describedby': invalid ? `err-${f.name}` : undefined,
                  onChange: (e) => handleChange(f.name, e.target.value),
                  onBlur: () => handleBlur(f.name),
                  className: `field-input ${invalid ? 'field-input--error' : ''}`,
                }

                return (
                  <div className="field" key={f.name}>
                    <label className="field-label mono" htmlFor={`field-${f.name}`}>
                      {f.label}
                    </label>
                    {f.type === 'textarea'
                      ? <textarea rows="4" {...shared} />
                      : <input type={f.type} {...shared} />}
                    {invalid && (
                      <p className="field-error" id={`err-${f.name}`}>
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                )
              })}

              <button type="submit" className="btn btn--primary contact-send" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'}
                {!sending && <span className="arr" aria-hidden="true">→</span>}
              </button>

              <p className="field-hint dim">
                Prefer email? <a className="tlink tlink--accent" href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
