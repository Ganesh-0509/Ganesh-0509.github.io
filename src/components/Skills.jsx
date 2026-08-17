import { skillDomains, techMeta, skills } from '../data/content'
import Reveal from './Reveal'
import Marquee from './Marquee'

// Skills as a dealt hand of cards.
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
//   3. OVERLAPPED, NOT TILED. The bento grid this replaced was honest but flat:
//      five rectangles of different widths still read as five rectangles. The
//      hand overlaps them, so the section gains depth and a front-to-back
//      order, and it takes less vertical run on a page being skimmed.
//
// The marquee still closes the section — texture, not content. Every tool in it
// is listed and hoverable in the hand above; nothing lives only inside moving
// text.

// The order is the deal. The hand fans left to right, so index 0 is the card
// furthest back on the left and the list order IS the reading order — leading
// with AI & Data is the positioning. `span` is vestigial from the bento grid
// the hand replaced and is kept only so a domain added to content.js and not
// listed here still renders rather than disappearing.
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

        {/* Dealt as an overlapping hand of cards rather than tiled into a
            bento grid. --i drives each card's fan angle and offset in CSS, so
            hover and focus are a pure compositor transform: no state, no
            re-render, one custom property per card. */}
        <Reveal className="fan-wrap">
          <ul className="fan" style={{ '--n': ordered.length }}>
            {ordered.map((d, i) => (
              <li className="fan-card" key={d.id} style={{ '--i': i }}>
                <div className="fan-card-in">
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
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The closing strip stays exactly as it was — a rule across the
            section, not another panel. */}
        <Marquee items={skills} speed={70} />
      </div>
    </section>
  )
}
