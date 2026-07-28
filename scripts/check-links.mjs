// ─────────────────────────────────────────────────────────────────────────────
// Link health check for every outbound URL in content.js.
//
// Two of the three "Live Demo" buttons on this site were dead for an unknown
// stretch of time (one 404, one 500). Nothing caught it because nothing looked.
// This looks.
//
//   npm run check:links
//
// Reads content.js as TEXT rather than importing it — the module uses
// `import.meta.env.BASE_URL`, which only exists inside Vite, so importing it
// from plain Node would throw before a single link got checked.
//
// Exits 1 when a link a recruiter would actually click is broken.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const source = fs.readFileSync(path.join(__dirname, '../src/data/content.js'), 'utf8')

// Which fields matter if they rot. A dead demo is worse than no demo; a dead
// repo link means the "Code" button goes nowhere.
const CRITICAL = new Set(['demo', 'repo', 'github'])

// Hosts that block non-browser traffic outright — LinkedIn answers 999 and
// LeetCode 403 to anything without a real browser fingerprint. Their status
// codes say nothing about whether the page exists, so reporting them as broken
// would train us to ignore this script's output. Reported as UNVERIFIED.
const BOT_WALLED = ['linkedin.com', 'leetcode.com']
const isBotWalled = (url) => BOT_WALLED.some((h) => new URL(url).hostname.endsWith(h))

// Track the most recent `title:` so a failure names the project it belongs to.
const targets = []
let currentTitle = 'profile'

for (const line of source.split('\n')) {
  const title = /^\s*title:\s*'([^']+)'/.exec(line)
  if (title) { currentTitle = title[1]; continue }

  const field = /^\s*(demo|repo|writeup|github|linkedin|leetcode|resumeUrl):\s*'(https?:\/\/[^']+)'/.exec(line)
  if (field) {
    const [, key, url] = field
    targets.push({ label: `${currentTitle} → ${key}`, url, critical: CRITICAL.has(key) })
  }
}

if (targets.length === 0) {
  console.error('No URLs found in content.js — did the file format change?')
  process.exit(1)
}

async function check({ label, url, critical }) {
  try {
    // Some hosts reject HEAD; fall back to a ranged GET rather than trusting a 405.
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(20_000) })
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { headers: { Range: 'bytes=0-0' }, redirect: 'follow', signal: AbortSignal.timeout(20_000) })
    }

    // A repo URL that redirects means the repo was renamed. The link still
    // resolves, so it looks fine — but the card is describing a project under
    // a name that no longer exists. That is exactly how CampusSync Edge ended
    // up pointing at a repo called Jobyn for weeks.
    //
    // Only meaningful for GitHub repo paths. A trailing-slash normalisation on
    // a profile URL is not a rename.
    let renamed = false
    if (label.endsWith('→ repo')) {
      try {
        const from = new URL(url).pathname.replace(/\/$/, '')
        const to = new URL(res.url).pathname.replace(/\/$/, '')
        renamed = res.redirected && from !== to
      } catch { /* non-parseable final URL — not worth failing over */ }
    }

    return { label, url, status: res.status, ok: res.status < 400, critical, renamed, finalUrl: res.url }
  } catch (err) {
    return {
      label, url, critical, ok: false,
      status: err.name === 'TimeoutError' ? 'timeout' : 'error',
      note: err.message,
    }
  }
}

const results = await Promise.all(targets.map(check))

let broken = 0
let unverified = 0

for (const r of results) {
  const walled = !r.ok && isBotWalled(r.url)
  if (walled) unverified++

  const mark = walled ? '?' : r.ok ? (r.renamed ? '~' : '✓') : '✗'
  console.log(`${mark} ${String(r.status).padEnd(7)} ${r.label.padEnd(44)} ${r.url}`)

  if (r.renamed) {
    console.log(`            ↳ redirects to ${r.finalUrl}`)
    console.log('              repo was renamed — check the card copy still describes this project')
  }
  if (walled) {
    console.log('            ↳ host blocks bots; status is meaningless. Open it yourself once.')
  } else if (!r.ok) {
    console.log(`            ↳ ${r.note || 'dead — fix it, or empty the field so no button renders'}`)
    if (r.critical) broken++
  }
}

const healthy = results.filter((r) => r.ok).length
console.log(`\n${healthy}/${results.length} healthy${unverified ? `, ${unverified} unverifiable (bot-walled)` : ''}.`)

if (broken) {
  console.error(`\n${broken} broken link(s) a recruiter would click.`)
  process.exit(1)
}
