import { skillDomains, techMeta, skills } from '../data/content'
import Reveal from './Reveal'
import Marquee from './Marquee'

// Skills as a bento grid.
//
// Three deliberate choices:
//
//   1. NO PERCENTAGES, NO STARS. They encode nothing an engineer can verify
//      ("React 90%" of what?) and hiring managers widely read skill bars as a
//      red flag. The grouping does the communicating.
//
//   2. ASYMMETRIC CELLS, NOT A UNIFORM GRID. Five equal boxes is a table; five
//      cells of different weights is a layout. The domain with the most tools
//      gets the most space, so the shape of the section tells you where the
//      depth is before you read a word.
//
//   3. PACKED, NOT STACKED. The earlier one-row-per-domain version was honest
//      but ran ~1100px tall for 41 badges. The same content tiles into roughly
//      half that, which matters on a page a recruiter is skimming.
//
// The marquee is the closing full-width cell — texture, not content. Every tool
// in it is listed and hoverable above; nothing lives only inside moving text.

// Explicit order + column spans out of 12, summing to exactly 12 per row:
//
//   row 1   ai 7 + data 5
//   row 2   web 5 + languages 4 + vision 3
//
// Both the order and the spans matter. Relying on `grid-auto-flow: dense` to
// pack content-order cells left a row that was 3 columns wide and 9 empty, and
// made the section TALLER than the plain stacked version it replaced. Widths
// track tool count so no cell has to wrap its badges more than the next.
//
// Leading with AI & Data is also the right read — it's the positioning.
//
// Layout lives here rather than in content.js so the data file stays pure
// content: a domain added there and not listed below still renders, at half
// width, rather than disappearing.
const LAYOUT = [
  { id: 'ai', span: 7 },        // 13 tools — the hero cell
  { id: 'data', span: 5 },      // 10
  { id: 'web', span: 5 },       // 9
  { id: 'languages', span: 4 }, // 5
  { id: 'vision', span: 3 },    // 4
]

const ordered = [
  ...LAYOUT
    .map(({ id, span }) => {
      const domain = skillDomains.find((d) => d.id === id)
      return domain && { ...domain, span }
    })
    .filter(Boolean),
  ...skillDomains
    .filter((d) => !LAYOUT.some((l) => l.id === d.id))
    .map((d) => ({ ...d, span: 6 })),
]

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
          <p className="section-lead muted">
            Grouped by engineering domain. Everything here is used by something
            I&rsquo;ve shipped — tap or hover a badge for what it does.
          </p>
        </Reveal>

        <div className="bento">
          {ordered.map((d, i) => (
            <Reveal
              key={d.id}
              delay={i * 0.05}
              className="bento-cell"
              style={{ '--span': d.span }}
            >
              <div className="bento-head">
                <h3 className="bento-title">{d.label}</h3>
                <span className="bento-count mono">
                  {String(d.items.length).padStart(2, '0')}
                </span>
              </div>
              <p className="bento-note dim">{d.note}</p>

              <ul className="badge-row bento-badges">
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

          {/* Closing cell, full width — the strip is part of the grid rather
              than something dangling underneath it. */}
          <div className="bento-cell bento-cell--strip" style={{ '--span': 12 }}>
            <Marquee items={skills} speed={70} />
          </div>
        </div>
      </div>
    </section>
  )
}
