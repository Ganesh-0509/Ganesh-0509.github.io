// ─────────────────────────────────────────────────────────────────────────────
// Scripted assistant engine — no LLM, no API key, fully static.
// Matches the visitor's message to an intent and answers from the real
// portfolio data in content.js. getAnswer(text) → { text, links?, chips? }.
// ─────────────────────────────────────────────────────────────────────────────
import { projects, skills, wins, about, profile, socials } from '../data/content'

const has = (t, ...words) => words.some((w) => t.includes(w))

// Keyword aliases so "moon", "lunar", "credit", etc. resolve to the right project.
const ALIASES = {
  Jobyn: ['jobyn', 'campussync', 'campus', 'career', 'resume platform', 'matching'],
  // 'connect' and 'public' removed: project matching runs before the contact
  // intent, so "how can I connect with him" returned the NGO platform and
  // "does he do public speaking" returned JanaNaadi. Both are still reachable
  // by their own names.
  'Namma Connect': ['namma', 'ngo', 'volunteer', 'community', 'allocation', 'escalation'],
  JanaNaadi: ['jananaadi', 'jana', 'sentiment', 'civic', 'ward', 'knowledge graph'],
  'ISRO HAVK': ['isro', 'havk', 'lunar', 'moon', 'terrain', 'space', 'rover', 'satellite'],
  'Bias-Lab': ['bias', 'bias-lab', 'fairness', 'shap', 'fairlearn', 'audit', 'ethics', 'explainability'],
  FinMate: ['finmate', 'finance', 'budget', 'budgeting', 'expense', 'expenses', 'money', 'spending', 'fintech', 'co-pilot'],
}

const linkFor = (name) => socials.find((s) => s.name === name)?.url

// Words that sit inside a project title but are far more likely to be the
// visitor asking something general. Without this, "Namma Connect" donates
// "connect" back as an implicit alias and swallows "how can I connect".
const TITLE_STOPWORDS = new Set(['connect', 'lab', 'work', 'about', 'contact'])

function findProject(t) {
  return projects.find((p) => {
    const aliases = ALIASES[p.title] || []
    const words = p.title
      .toLowerCase()
      .split(/[\s-]+/)
      .filter((w) => w.length > 3 && !TITLE_STOPWORDS.has(w))
    return [...aliases, ...words].some((k) => t.includes(k))
  })
}

const PROJECT_CHIPS = projects.map((p) => p.title)
const HOME_CHIPS = ['His projects', 'Tech stack', 'Achievements', 'Hire / contact']

export const greeting = {
  text:
    "hey! 👋 i'm Ganesh's mini-assistant. ask me about his projects, skills, or how to reach him — what're you curious about?",
  chips: HOME_CHIPS,
}

export function getAnswer(raw) {
  const t = ` ${raw.toLowerCase().trim()} `

  // 1) A specific project mentioned by name/keyword
  const proj = findProject(t)
  if (proj && !has(t, 'all project', 'list', 'other', 'another', 'what project')) {
    const links = []
    if (proj.repo) links.push({ label: 'View code', url: proj.repo })
    if (proj.demo) links.push({ label: 'Live demo', url: proj.demo })
    return {
      text: `${proj.title} — ${proj.blurb}\n\nBuilt with: ${proj.tech.join(', ')}.`,
      links,
      chips: ['Another project', 'Tech stack', 'Hire / contact'],
    }
  }

  // 2) Greetings
  if (has(t, ' hi ', ' hii ', ' hey ', ' hello ', ' yo ', 'namaste', 'good morning', 'good evening'))
    return greeting

  // 3) Projects overview
  if (has(t, 'project', 'work', 'built', 'build', 'portfolio', 'made', 'shipped'))
    return {
      text:
        'Ganesh has shipped 14+ projects across Gen AI, computer vision & full-stack. Here are the highlights — tap one to dig in:',
      chips: PROJECT_CHIPS,
      links: [{ label: 'All repos on GitHub', url: linkFor('GitHub') }],
    }

  // 4) Skills / tech stack
  if (has(t, 'skill', 'tech', 'stack', 'language', 'tool', 'framework', 'know', 'good at', 'expert'))
    return {
      text:
        `His core skills: ${skills.join(', ')}.\n\n` +
        'He works across Gen AI (Gemini, GPT-4o, Vertex AI), computer vision (OpenCV), and full-stack — FastAPI/Flask backends with React & Next.js front-ends.',
      chips: ['His projects', 'Achievements', 'Hire / contact'],
    }

  // 5) Achievements / wins
  if (has(t, 'achiev', 'win', 'award', 'hackathon', 'accomplish', 'proud', 'highlight', 'finalist', 'leetcode'))
    return {
      text:
        // was `w.emoji` — a key that doesn't exist on these objects, so every
        // line rendered as "undefined Top 12 · Intel AI Hackathon 2025 — …"
        wins.map((w) => `${w.medal} ${w.title} — ${w.detail} (${w.year})`).join('\n') +
        '\n🧩 70+ LeetCode problems solved.',
      chips: ['His projects', 'Hire / contact'],
    }

  // 6) About / who
  if (has(t, 'about', 'who are', 'who is', 'yourself', 'himself', 'bio', 'story', 'background', 'student', 'college', 'study', 'saveetha'))
    return {
      text: about.story[0],
      chips: ['Tech stack', 'His projects', 'Hire / contact'],
    }

  // 7) Résumé / CV
  if (has(t, 'resume', 'cv', 'curriculum'))
    return {
      text: "here's his résumé 👇",
      links: [{ label: 'Download CV', url: profile.resumeUrl }],
      chips: ['Hire / contact', 'His projects'],
    }

  // 8) Contact / hire / availability
  if (has(t, 'contact', 'email', 'reach', 'hire', 'intern', 'available', 'opportunit', 'job', 'connect', 'linkedin', 'github', 'recruit', 'collab'))
    return {
      text:
        "Ganesh is actively looking for AI/ML & full-stack internships — reach him here 👇",
      links: [
        { label: 'Email', url: `mailto:${profile.email}` },
        { label: 'LinkedIn', url: linkFor('LinkedIn') },
        { label: 'GitHub', url: linkFor('GitHub') },
        { label: 'Download CV', url: profile.resumeUrl },
      ],
      chips: ['His projects', 'Tech stack'],
    }

  // 9) Location
  if (has(t, 'where', 'location', 'based', 'city', 'country', 'chennai', 'india', 'remote', 'relocat'))
    return {
      text: `He's based in ${profile.location} — open to remote and on-site roles.`,
      chips: HOME_CHIPS,
    }

  // 10) Thanks / bye
  if (has(t, 'thank', 'thanks', 'thx', 'bye', 'cool', 'nice', 'great', 'awesome'))
    return { text: 'anytime! ✦ anything else you want to know?', chips: HOME_CHIPS }

  // 11) Fallback
  return {
    text:
      "hmm, i'm just a little site bot so i might've missed that 😅 — try one of these, or email Ganesh directly:",
    links: [{ label: 'Email Ganesh', url: `mailto:${profile.email}` }],
    chips: HOME_CHIPS,
  }
}
