// ─────────────────────────────────────────────────────────────────────────────
// A spider web, generated rather than drawn by hand.
//
// Real webs aren't concentric circles — the silk sags between the radial spokes
// under its own weight. Each ring is therefore a chain of quadratic curves whose
// control point is pulled back toward the centre (SAG), which is what makes it
// read as web rather than as a dartboard.
//
// Used behind each timeline node as the "catch-web" — the stretched net
// Spider-Man fires between two points to catch something in TASM2.
//
// Drawn from scratch in SVG on purpose: shipping actual Marvel artwork on a
// public portfolio would be someone else's copyright. Geometry isn't.
// ─────────────────────────────────────────────────────────────────────────────
const SAG = 0.86

export default function WebNet({
  size = 260,
  spokes = 12,
  rings = 4,
  className = '',
  strokeWidth = 1,
}) {
  const c = size / 2
  const max = c - strokeWidth
  const step = (Math.PI * 2) / spokes
  const angles = Array.from({ length: spokes }, (_, i) => i * step - Math.PI / 2)
  const pt = (a, r) => [c + Math.cos(a) * r, c + Math.sin(a) * r]

  // radial spokes
  const spokePaths = angles.map((a) => {
    const [x, y] = pt(a, max)
    return `M ${c} ${c} L ${x.toFixed(1)} ${y.toFixed(1)}`
  })

  // sagging rings
  const ringPaths = Array.from({ length: rings }, (_, ri) => {
    const r = max * ((ri + 1) / rings)
    let d = ''
    angles.forEach((a, i) => {
      const next = angles[(i + 1) % spokes]
      const [x1, y1] = pt(a, r)
      const [x2, y2] = pt(next, r)
      // Control point sits halfway between the two anchors, pulled toward the
      // centre. Derive it from the fixed step rather than (next - a): on the
      // last segment `next` has wrapped past zero and the difference is
      // negative, which would fling the control point across the web.
      const [cx, cy] = pt(a + step / 2, r * SAG)
      if (i === 0) d += `M ${x1.toFixed(1)} ${y1.toFixed(1)} `
      d += `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `
    })
    return d
  })

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
        {spokePaths.map((d, i) => <path key={`s${i}`} d={d} />)}
        {ringPaths.map((d, i) => <path key={`r${i}`} d={d} opacity={0.85 - i * 0.12} />)}
      </g>
    </svg>
  )
}
