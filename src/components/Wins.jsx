import { wins } from '../data/content'
import Timeline from './Timeline'
import Reveal from './Reveal'
import { ExternalIcon } from './Icons'

// The wins are already chronological and dated, which is exactly the shape the
// timeline wants — so the year becomes the sticky rail label and the win itself
// becomes the entry.
//
// Two things each card now has to survive:
//   • no image — most entries are a placing, not a photo. An imageless card
//     renders compact rather than as an empty coloured block.
//   • a `url` — the section is called "Proof of work", so where a post exists
//     the whole card links to it. Where it doesn't, the card is inert.
//
// No medal emoji. 🥇/🏅/🔥 next to a real placing reads as sticker-decoration
// and cheapens the result it's meant to celebrate — the placing is already in
// the title, and the chip carries the category.
const entries = wins.map((w) => {
  const body = (
    <>
      {w.image && (
        <div className="wincard-img">
          <img src={w.image} alt={w.title} loading="lazy" decoding="async" />
        </div>
      )}
      <div className="wincard-body">
        {w.chip && <span className="wincard-chip mono">{w.chip}</span>}
        <h4 className="wincard-title">{w.title}</h4>
        <p className="wincard-desc muted">{w.detail}</p>
        {w.url && (
          <span className="wincard-link mono">
            <ExternalIcon /> Read the post
          </span>
        )}
      </div>
    </>
  )

  const cls = `wincard ${w.image ? '' : 'wincard--bare'}`

  return {
    title: w.year,
    content: w.url ? (
      <a
        className={`${cls} wincard--link`}
        href={w.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${w.title} — read the announcement`}
      >
        {body}
      </a>
    ) : (
      <article className={cls}>{body}</article>
    ),
  }
})

// Derived from the entries themselves — a typed-in year range goes stale the
// first time an entry is added.
const years = [...new Set(wins.map((w) => w.year.split(' ').pop()))]
const span = years.length > 1 ? `${years[0]} — ${years[years.length - 1]}` : years[0]

export default function Wins() {
  return (
    <section id="wins" className="section wins">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Highlights</span>
          <span className="kicker">{span}</span>
        </div>

        <Reveal><h2 className="section-title">Proof of <em>work</em>.</h2></Reveal>
        <Reveal delay={0.06}>
          <p className="section-lead muted">
            Competitive builds judged against other teams under a deadline, and
            the certifications behind them. Each card links to the announcement.
          </p>
        </Reveal>

        <Timeline data={entries} />
      </div>
    </section>
  )
}
