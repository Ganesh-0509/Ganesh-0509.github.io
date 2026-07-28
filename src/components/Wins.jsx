import { wins } from '../data/content'
import Timeline from './Timeline'
import Reveal from './Reveal'

// The wins are already chronological and dated, which is exactly the shape the
// timeline wants — so the year becomes the sticky rail label and the win itself
// becomes the entry.
const entries = wins.map((w) => ({
  title: w.year,
  content: (
    <article className="wincard">
      <div className="wincard-img">
        <img src={w.image} alt={w.title} loading="lazy" decoding="async" />
        <span className="wincard-medal" aria-hidden="true">{w.medal}</span>
      </div>
      <div className="wincard-body">
        {w.chip && <span className="wincard-chip mono">{w.chip}</span>}
        <h4 className="wincard-title">{w.title}</h4>
        <p className="wincard-desc muted">{w.detail}</p>
      </div>
    </article>
  ),
}))

export default function Wins() {
  return (
    <section id="wins" className="section wins">
      <div className="container">
        <div className="chapter">
          <span className="kicker">Highlights</span>
          <span className="kicker">2025</span>
        </div>

        <Reveal><h2 className="section-title">Proof of <em>work</em>.</h2></Reveal>
        <Reveal delay={0.06}>
          <p className="section-lead muted">
            Competitive builds, judged against other teams under a deadline.
          </p>
        </Reveal>

        <Timeline data={entries} />
      </div>
    </section>
  )
}
