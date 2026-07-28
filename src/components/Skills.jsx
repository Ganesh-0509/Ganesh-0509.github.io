import { skillDomains, techMeta } from '../data/content'
import Reveal from './Reveal'

// Skills as a domain matrix, not a rating.
//
// Deliberately no percentage bars or 1–5 stars: they encode nothing an engineer
// can verify ("React 90%" of what?) and read as padding to anyone senior. The
// grouping does the communicating; each badge carries a plain-language tooltip
// so a non-specialist recruiter can still tell what a tool is for.
export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Technical stack</span>
          {/* Derived, not typed. A hardcoded count is how the About section
              ended up claiming "14+ projects" above a Work header reading "06". */}
          <span className="kicker">{String(skillDomains.length).padStart(2, '0')} domains</span>
        </div>

        <Reveal>
          <h2 className="section-title">
            The tools behind the <em>shipped</em> work.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          {/* Was "every tool appears in at least one project below" — no longer
              true once the stack widened past the seven cards on this page, and
              a claim that's checkable and wrong is worse than none. */}
          <p className="section-lead muted">
            Grouped by engineering domain. Everything here is used by something
            I&rsquo;ve shipped — hover a badge for what it does.
          </p>
        </Reveal>

        <div className="domain-grid">
          {skillDomains.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.06} className="domain">
              <div className="domain-head">
                <h3 className="domain-title">{d.label}</h3>
                <span className="domain-count mono">{String(d.items.length).padStart(2, '0')}</span>
              </div>
              <p className="domain-note dim">{d.note}</p>
              <ul className="badge-row">
                {d.items.map((name) => (
                  <li key={name}>
                    <span className="badge" data-tip={techMeta[name]} tabIndex={0}>
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
