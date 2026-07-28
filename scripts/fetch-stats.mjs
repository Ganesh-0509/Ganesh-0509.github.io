// ─────────────────────────────────────────────────────────────────────────────
// Build-time stats fetch.
//
// Pulls live LeetCode numbers and writes them to src/data/stats.json, which
// content.js imports. Runs as `prebuild`, so every deploy ships current figures
// and no hand-edited number can go stale.
//
// FAIL-SOFT BY DESIGN: if the network is down or LeetCode changes its schema,
// this logs a warning, leaves the committed stats.json untouched, and exits 0.
// A stats fetch must never be able to break a deploy.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../src/data/stats.json')

const LEETCODE_USER = '24900911'

// Official LeetCode GraphQL. No API key, no third-party host in the critical
// path. Preferred over alfa-leetcode-api, which is a free Render instance that
// cold-starts (10s+) and disappears when the free tier does.
const QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      profile { ranking }
      submitStatsGlobal { acSubmissionNum { difficulty count } }
    }
  }
`

async function fetchLeetCode() {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // LeetCode rejects requests without a browser-ish UA and referer.
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Referer: `https://leetcode.com/u/${LEETCODE_USER}/`,
    },
    body: JSON.stringify({ query: QUERY, variables: { username: LEETCODE_USER } }),
    signal: AbortSignal.timeout(20_000),
  })

  if (!res.ok) throw new Error(`LeetCode GraphQL returned ${res.status}`)

  const json = await res.json()
  const user = json?.data?.matchedUser
  if (!user) throw new Error('LeetCode returned no matchedUser — username may have changed')

  const by = Object.fromEntries(
    user.submitStatsGlobal.acSubmissionNum.map((d) => [d.difficulty, d.count])
  )

  // Guard against a "successful" response full of zeroes overwriting real data.
  if (!by.All) throw new Error('LeetCode returned a zero solve count — refusing to write')

  return {
    total: by.All,
    easy: by.Easy ?? 0,
    medium: by.Medium ?? 0,
    hard: by.Hard ?? 0,
    ranking: user.profile?.ranking ?? null,
  }
}

const previous = JSON.parse(fs.readFileSync(OUT, 'utf8'))

try {
  const leetcode = await fetchLeetCode()
  const next = { leetcode, fetchedAt: new Date().toISOString().slice(0, 10) }

  fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n', 'utf8')
  console.log(
    `[stats] LeetCode ${leetcode.total} solved ` +
    `(${leetcode.easy}E / ${leetcode.medium}M / ${leetcode.hard}H)` +
    (previous.leetcode.total !== leetcode.total
      ? `  ← was ${previous.leetcode.total}`
      : '  (unchanged)')
  )
} catch (err) {
  console.warn(`[stats] fetch failed: ${err.message}`)
  console.warn(`[stats] keeping committed values (${previous.leetcode.total} solved, as of ${previous.fetchedAt}).`)
}
