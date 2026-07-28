// ─────────────────────────────────────────────────────────────────────────────
// Terminal command registry for the hero REPL.
// Every command answers from content.js — there is no second source of truth,
// so the terminal can never drift from the rest of the page.
//
// A command returns an array of lines: { text, tone?, href? }
//   tone: 'out' (default) | 'dim' | 'accent' | 'ok' | 'err' | 'head'
// ─────────────────────────────────────────────────────────────────────────────
import { profile, skillDomains, projects, wins, about } from '../data/content'

const line = (text, tone = 'out') => ({ text, tone })
const link = (text, href, tone = 'accent') => ({ text, tone, href })

// Pads a label so the two-column output stays aligned in monospace.
const pad = (s, n = 14) => s + ' '.repeat(Math.max(0, n - s.length))

const COMMANDS = {
  help: {
    hint: 'list every command',
    run: () => [
      line('Available commands', 'head'),
      ...Object.entries(COMMANDS).map(([name, c]) =>
        line(`  ${pad(name, 12)}${c.hint}`, 'dim')
      ),
      line(''),
      line('Tip: press ↑ / ↓ to walk through history, Tab to autocomplete.', 'dim'),
    ],
  },

  whoami: {
    hint: 'who is this',
    run: () => [
      line(profile.name, 'head'),
      line(`${profile.headline} — ${profile.specialisms.join(' · ')}`, 'accent'),
      line(''),
      line(profile.summary),
      line(''),
      line(`${pad('location')}${profile.location}`, 'dim'),
    ],
  },

  skills: {
    hint: 'stack, grouped by domain',
    run: () =>
      skillDomains.flatMap((d) => [
        line(d.label.toUpperCase(), 'head'),
        line(`  ${d.items.join(' · ')}`, 'dim'),
        line(''),
      ]),
  },

  projects: {
    hint: 'shipped work + metrics',
    run: () =>
      projects.flatMap((p) => [
        line(p.title, 'head'),
        line(`  ${p.problem}`, 'dim'),
        line(`  ${p.tech.join(' · ')}`, 'accent'),
        ...(p.metrics.length
          ? [line(`  ${p.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join('  |  ')}`, 'ok')]
          : []),
        line(''),
      ]),
  },

  wins: {
    hint: 'hackathons and awards',
    run: () =>
      wins.map((w) => line(`${pad(w.year, 10)}${w.title}`, 'out')),
  },

  stats: {
    hint: 'the numbers',
    run: () => [
      line('By the numbers', 'head'),
      ...about.stats.map((s) => line(`  ${pad(s.label, 20)}${s.value}${s.suffix}`, 'dim')),
    ],
  },

  contact: {
    hint: 'how to reach me',
    run: () => [
      line('Reach me here', 'head'),
      link(`  email      ${profile.email}`, `mailto:${profile.email}`),
      link('  github     github.com/Ganesh-0509', profile.github),
      link('  linkedin   /in/ganesh-kumar-957t', profile.linkedin),
    ],
  },

  resume: {
    hint: 'download the PDF',
    run: () => [
      line('Opening résumé…', 'ok'),
      link('  Ganesh_Kumar_Resume.pdf', profile.resumeUrl),
    ],
    // Side effect handled by the component so it stays inside a user gesture.
    action: 'resume',
  },

  clear: { hint: 'wipe the screen', run: () => [], action: 'clear' },
}

export const commandNames = Object.keys(COMMANDS)

// Commands surfaced as clickable chips under the prompt.
export const suggestedCommands = ['whoami', 'skills', 'projects', 'contact', 'resume']

export const bootLines = [
  line(`${profile.name} — interactive shell`, 'head'),
  line(`${profile.headline}`, 'accent'),
  line("Type 'help' for commands, or click one below.", 'dim'),
]

export function runCommand(raw) {
  const input = raw.trim()
  if (!input) return { lines: [] }

  const [name] = input.toLowerCase().split(/\s+/)
  const cmd = COMMANDS[name]

  if (!cmd) {
    return {
      lines: [
        line(`command not found: ${name}`, 'err'),
        line("Try 'help' to see what's available.", 'dim'),
      ],
    }
  }
  return { lines: cmd.run(), action: cmd.action }
}

// Longest common prefix of the matches — standard shell Tab behaviour.
export function autocomplete(partial) {
  const p = partial.trim().toLowerCase()
  if (!p) return null
  const matches = commandNames.filter((c) => c.startsWith(p))
  if (matches.length === 0) return null
  if (matches.length === 1) return matches[0]
  let prefix = matches[0]
  for (const m of matches) {
    while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1)
  }
  return prefix || null
}
