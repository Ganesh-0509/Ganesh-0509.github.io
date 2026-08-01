// ─────────────────────────────────────────────────────────────────────────────
// The timeline as a stack of pinned cards.
//
// Same alignment as the plain list — date on the rail, card beside it — but
// instead of ten rows filing past the viewport, each row STICKS where it lands.
// The entry below it then scrolls up and covers it, so the section reads as one
// card at a time being laid onto a pile rather than a long scroll.
//
// It's all `position: sticky`, no scroll listener and no JS animation:
//
//   • every row sticks at the same offset under the navbar, so once a row
//     arrives it stays put for as long as the section lasts;
//   • rows are siblings in one container, so a later row paints over an earlier
//     one — that's the "cover";
//   • each row's margin-bottom is the dwell: the pinned card holds still for
//     that much scroll before the next one starts climbing over it;
//   • each successive row sticks a few pixels HIGHER than the one before, up to
//     a cap. Cards are a fixed height, so a card that sits higher leaves the one
//     behind it peeking out along the bottom edge — the pile has depth instead of
//     being one card exactly replacing another.
//
// Nothing hijacks the wheel, so the scrollbar, trackpad momentum, Find-in-page
// and PgUp/PgDn all still behave.
// ─────────────────────────────────────────────────────────────────────────────

// How much higher each card sits than the one behind it, and how deep the pile
// is allowed to get. Past four the extra edges stop reading as depth and start
// reading as misalignment — and every pixel of lift is a pixel closer to the
// navbar, so it can't grow forever.
//
// Their product is the headroom the CSS reserves above the resting offset:
// keep --stl-lift-cap in App.css equal to LIFT × LIFT_MAX.
const LIFT = 12
const LIFT_MAX = 3

export default function StackTimeline({ data }) {
  return (
    <div className="stl">
      {data.map((item, i) => (
        <div
          className={`stl-row ${i === data.length - 1 ? 'stl-row--last' : ''}`}
          key={`${item.title}-${i}`}
          style={{
            '--lift': `${Math.min(i, LIFT_MAX) * LIFT}px`,
            // Later entries cover earlier ones. DOM order alone would do it,
            // but the cards carry shadows and transforms, so being explicit
            // keeps the pile from re-ordering on a hover lift.
            zIndex: i + 1,
          }}
        >
          {/* Left: the rail. Stretches the full height of the card beside it
              and carries an opaque background on purpose — that's what hides
              the date of the entry underneath, so only the front card's date
              is ever legible. */}
          <div className="stl-marker">
            <div className="stl-head">
              <span className="stl-dot" aria-hidden="true"><i /></span>
              <h3 className="stl-title">{item.title}</h3>
            </div>
          </div>

          {/* Right: the card. Repeated small above it for the narrow layout,
              where the rail column collapses. */}
          <div className="stl-card">
            <span className="stl-title-inline mono">{item.title}</span>
            {item.content}
          </div>
        </div>
      ))}

      {/* The last card would otherwise unstick the moment it arrived — sticky
          only holds inside its container, and the container ends with the last
          row. This is the final card's dwell. */}
      <div className="stl-tail" aria-hidden="true" />
    </div>
  )
}
