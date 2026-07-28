// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
// Edit this file to update text, projects, skills, links — no component changes
// needed. Anything marked  // TODO:  is a placeholder waiting on a real number.
//
// GROUND RULE 1: every claim on this site must be backed by a shipped artifact.
// Recruiters cross-check headlines against repos. Do not add a stack here that
// no project in `projects` actually uses.
//
// GROUND RULE 2: an achievement is written ONE way, in ONE place, and the
// résumé PDF in /public must say the same thing. A visitor reads both.
//
// GROUND RULE 3: keep it short. Nobody reads a paragraph on a portfolio. If a
// line can be a metric or a badge instead of a sentence, make it one.
// ─────────────────────────────────────────────────────────────────────────────

import stats from './stats.json'

// BASE_URL makes asset links work on GitHub Pages project sites (/repo/) too.
const asset = (file) => import.meta.env.BASE_URL + file

export const profile = {
  name: 'Ganesh Kumar T',
  shortName: 'Ganesh',
  // Positioning line — what a recruiter reads in the first two seconds.
  headline: 'AI Systems & Full-Stack Engineer',
  // The specialisation, spelled out. Rendered as mono, split on '·'.
  specialisms: ['Agentic AI', 'RAG Pipelines', 'Production ML Infrastructure'],
  // Two sentences. The first says what I build, the second gives one hard proof.
  // No adjectives, no award inflation — the Highlights section carries placings.
  summary:
    'I build agentic AI systems and retrieval pipelines that reach production — multi-agent orchestration, PGVector RAG with Gemini embeddings, and ONNX-exported models served at the edge. One of them shipped as an official template in Lamatic AgentKit; the rest are linked below with the code.',
  // No `availability` line. An "open to work" banner dates itself the moment it
  // ships and reads as asking rather than showing. The work makes the case; the
  // Contact section is where someone acts on it.
  location: 'Chennai, Tamil Nadu, India',
  email: 'ganesh957kumar@gmail.com',
  phone: '+91 78250 83996',
  resumeUrl: asset('Ganesh_Kumar_Resume.pdf'),
  photo: asset('profile.jpg'),
  github: 'https://github.com/Ganesh-0509',
  linkedin: 'https://www.linkedin.com/in/ganesh-kumar-957t/',
  leetcode: 'https://leetcode.com/u/24900911/',
}

export const about = {
  // Two short lines. Anything longer goes unread — the projects do the talking.
  story: [
    'Third-year AI/ML undergrad at Saveetha Engineering College, Chennai (CGPA 8.2). I ship systems rather than notebooks: retrieval that cites its sources, agents that check their own output, models exported so they actually run somewhere.',
    'Most of what I know came from building under a deadline — three national and state placements in 2025, and one agent pipeline reviewed and merged into a company’s open-source product.',
  ],
  // Numbers that cannot drift: LeetCode is fetched at build time (see
  // scripts/fetch-stats.mjs) and the project count is derived from the array
  // below, so it can never disagree with the Work section again.
  stats: [
    { label: 'LeetCode solved', value: stats.leetcode.total, suffix: '' },
    // Hard count is the only LeetCode number that signals anything to an engineer.
    { label: 'Hard problems', value: stats.leetcode.hard, suffix: '' },
    { label: 'Prize money won', value: 35, suffix: 'k', prefix: '₹' },
  ],
  // Rendered under the stat row as one mono line.
  statsNote: `LeetCode ${stats.leetcode.easy} easy · ${stats.leetcode.medium} medium · ${stats.leetcode.hard} hard — updated ${stats.fetchedAt}`,
}

// ── Tech dictionary ──────────────────────────────────────────────────────────
// One tooltip per tool, reused by both the skills matrix and the project
// badges. Keep each under ~90 characters — it renders in a small popover.
export const techMeta = {
  // Languages
  Python: 'Primary language — every ML pipeline and FastAPI backend here.',
  TypeScript: 'Typed React and Next.js front-ends; strict mode by default.',
  Java: 'Oracle Certified Professional, Java SE 21 — OOP, collections, JDBC.',
  JavaScript: 'ES2023 — DOM work, D3 and Babylon.js scenes.',
  SQL: 'Postgres dialect — schema design, joins, window functions.',

  // AI & Data
  Gemini: 'Google Gemini API — embeddings, multimodal prompts, structured output.',
  Claude: 'Anthropic API — long-context analysis and agent tool-calling.',
  RAG: 'Retrieval-augmented generation with grounding and hallucination checks.',
  PGVector: 'Postgres vector extension — embedding storage and ANN search.',
  Tavily: 'Grounded web-search API — gives agents real sources to cite.',
  'Intel OPEA': 'Intel’s open enterprise-AI platform — the Enterprise360 runtime.',
  ONNX: 'Open Neural Network Exchange — exports models for fast edge inference.',
  'scikit-learn': 'Classical ML — RandomForest classifiers, metrics, cross-validation.',
  SHAP: 'Shapley additive explanations — per-feature model attribution.',
  Fairlearn: 'Fairness metrics and bias mitigation for classification models.',
  'NumPy / SciPy': 'Numerical arrays and signal processing under the vision pipelines.',

  // Web & Cloud
  React: 'React 18 — hooks, concurrent rendering, memoised component trees.',
  'Next.js': 'App Router, server components, and file-based routing.',
  FastAPI: 'Async Python API framework — the backend in five of these builds.',
  Flask: 'Lightweight Python service layer for the vision and terrain pipelines.',
  Pydantic: 'Schema validation — how agent output is forced into valid JSON.',
  PostgreSQL: 'Relational store — the system of record behind PGVector.',
  Supabase: 'Managed Postgres with auth, row-level security and storage.',
  SQLite: 'Embedded store for campaign state and prompt-version history.',
  Redis: 'In-memory cache for hot retrieval paths and session state.',
  Docker: 'Containerised builds — reproducible from laptop to Cloud Run.',
  Firebase: 'Auth and realtime data for the FinMate client.',

  // Vision & Interfaces
  OpenCV: 'Computer vision — OCR preprocessing, shape-from-shading, contours.',
  'Tesseract OCR': 'Optical character recognition, tuned for Tamil and English.',
  'D3.js': 'Data-driven SVG — the knowledge-graph and ward visualisations.',
  'Babylon.js': 'WebGL 3D engine rendering the reconstructed lunar terrain.',
  Git: 'Branch-per-feature workflow, reviewed merges, GitHub Actions CI.',
}

// ── Skills, grouped by engineering domain ────────────────────────────────────
// No percentages, no star ratings — those signal nothing to an engineer. Just
// the domains and the real tools inside them.
//
// REMOVED 2026-07-28: GPT-4o, LangGraph, Node.js, Cloud Run, Framer Motion,
// HTML5/CSS3. No project on this site uses them — listing them broke ground
// rule 1 and is exactly the padding a senior reviewer scans for.
export const skillDomains = [
  {
    id: 'languages',
    label: 'Languages',
    note: 'What I write day to day.',
    items: ['Python', 'TypeScript', 'Java', 'JavaScript', 'SQL'],
  },
  {
    id: 'ai',
    label: 'AI & Data',
    note: 'Model orchestration, retrieval and evaluation.',
    items: [
      'Gemini', 'Claude', 'RAG', 'PGVector', 'Tavily', 'Intel OPEA',
      'ONNX', 'scikit-learn', 'SHAP', 'Fairlearn', 'NumPy / SciPy',
    ],
  },
  {
    id: 'web',
    label: 'Web & Cloud Systems',
    note: 'How the models reach a user.',
    items: [
      'React', 'Next.js', 'FastAPI', 'Flask', 'Pydantic',
      'PostgreSQL', 'Supabase', 'SQLite', 'Redis', 'Docker', 'Firebase',
    ],
  },
  {
    id: 'vision',
    label: 'Vision & Interfaces',
    note: 'Pixels in, structured data out — and back to the screen.',
    items: ['OpenCV', 'Tesseract OCR', 'D3.js', 'Babylon.js', 'Git'],
  },
]

// Flat list, derived — the terminal reads this.
export const skills = skillDomains.flatMap((d) => d.items)

// ── Projects as micro case studies ───────────────────────────────────────────
// Each entry answers: what problem, what architecture, what did it measure at,
// where's the code. `metrics` renders only when non-empty — an empty array is
// honest, an invented latency figure is not.
//
// The long `story` field was removed on 2026-07-28. Nobody read it, and it
// duplicated `problem` + `architecture` in softer words. ProjectModal falls
// back to `blurb`, so the modal reads: problem → blurb → architecture → metrics.
//
// LINK POLICY: a `demo` value must be a URL that returns 200 today. A dead
// "Live Demo" button costs more than no button. Run `npm run check:links`.
export const projects = [
  {
    title: 'Jobyn',
    problem:
      'Students find out their resume was the problem after the rejection, not before it — and generic AI feedback tells them nothing they can act on.',
    architecture:
      'FastAPI service over a Gemini-embedding + PGVector retrieval layer, Redis caching hot paths, and a hallucination-detection pass that grounds every answer in a cited source. A RandomForest role-prediction classifier is exported to ONNX so scoring runs client-side, which is also why resumes never leave the browser.',
    blurb:
      'Career-readiness platform for engineering students: resume scoring, ML role prediction, skill-gap graphs, a RAG study hub and voice mock interviews.',
    metrics: [
      { value: '82.1%', label: 'Classifier F1' },
      { value: 'ONNX', label: 'Client-side inference' },
      // TODO: measure p95 retrieval latency and Redis cache hit-rate, then add here.
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['FastAPI', 'React', 'PGVector', 'Gemini', 'ONNX', 'Redis'],
    tone: 'violet',
    // TODO: current screenshot is the old CampusSync framing — recapture from
    // getjobyn.pages.dev and replace public/campusSync.png.
    image: asset('campusSync.png'),
    repo: 'https://github.com/Ganesh-0509/Jobyn',
    demo: 'https://getjobyn.pages.dev',
    writeup: '',
    featured: true,
  },
  {
    title: 'Outreach Intelligence Agent',
    problem:
      'Personalised outreach at volume either reads like a mail-merge or takes an hour per prospect — and an LLM left unchecked will confidently invent facts about a company.',
    architecture:
      'A four-agent hierarchical pipeline — research, draft, critique, rewrite — with self-reflection loops that route a failed draft back for another pass. Tavily grounds the research step in real sources, Pydantic forces every agent hand-off into valid JSON, and quality gates block anything that fails the checks. Prompt versions and campaign state persist to SQLite.',
    blurb:
      'Four-agent pipeline for grounded company research and personalised outreach — reviewed and merged into Lamatic AgentKit as an official template.',
    metrics: [
      { value: 'Merged', label: 'Into Lamatic AgentKit' },
      { value: '4', label: 'Agents in pipeline' },
      { value: 'Self-reflect', label: 'Rewrite routing' },
    ],
    tags: ['Agentic AI', 'Open Source'],
    tech: ['Python', 'FastAPI', 'Claude', 'Tavily', 'Pydantic', 'SQLite'],
    tone: 'amber',
    // TODO: no screenshot yet — capture the agent trace / a generated draft.
    image: '',
    repo: 'https://github.com/Lamatic/AgentKit/tree/main/kits/personalized-outreach-agent',
    demo: '',
    // The merged PR is the strongest single link on this site: third-party
    // review, not a self-reported metric.
    writeup: 'https://github.com/Lamatic/AgentKit/pull/190',
    featured: true,
  },
  {
    title: 'Bias-Lab',
    problem:
      'Fairness tooling like AIF360 and Fairlearn is powerful but code-only, which locks most product teams out of running a real bias review.',
    architecture:
      'React front-end over a FastAPI audit engine that runs an 8-stage pipeline — proxy-feature detection, SHAP attribution, Fairlearn metrics and counterfactual tests — then has Gemini draft a stakeholder-ready mitigation report.',
    blurb:
      'Upload a dataset, get an 8-stage bias audit: proxy detection, SHAP explainability, counterfactual tests, and a Gemini-written mitigation report.',
    metrics: [
      { value: '8', label: 'Audit stages' },
      { value: 'SHAP', label: 'Explainability' },
      // TODO: record median audit runtime for a 10k-row dataset.
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['React', 'FastAPI', 'SHAP', 'Fairlearn', 'Gemini', 'scikit-learn'],
    tone: 'violet',
    image: asset('bias-lab.png'),
    repo: 'https://github.com/Ganesh-0509/Bias-Lab',
    // REMOVED 2026-07-28: the Cloud Run revision returns 500. Restore this line
    // only once the URL answers 200 again.
    demo: '',
    writeup: '',
    featured: true,
  },
  {
    title: 'JanaNaadi',
    problem:
      'Civic sentiment shifts faster than the dashboards built to track it, so a spike in one ward reads as noise instead of signal.',
    architecture:
      'FastAPI ingestion feeding a knowledge graph that links places, issues and voices across 250 MCD wards, with Gemini handling language understanding and a D3.js front-end rendering the graph in real time.',
    blurb:
      "Real-time public-sentiment platform with a knowledge graph spanning India's 250 MCD wards.",
    metrics: [
      { value: '250', label: 'MCD wards mapped' },
      { value: 'Real-time', label: 'Ingestion mode' },
      // TODO: measure end-to-end ingestion→render latency and daily event volume.
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['FastAPI', 'React', 'D3.js', 'Gemini'],
    tone: 'sky',
    image: asset('jananaadi.png'),
    repo: 'https://github.com/Ganesh-0509/JanaNaadi',
    demo: 'https://jana-naadi.vercel.app/',
    writeup: '',
    featured: true,
  },
  {
    title: 'Enterprise360',
    problem:
      'Enterprise knowledge is split across PDFs, spreadsheets and recorded calls, so the answer to one question means opening three different tools.',
    architecture:
      'Multimodal agentic pipeline on Intel OPEA: PDFs, Excel and speech-to-text audio all normalise into one RAG index, with hierarchical agent flows and explicit context control at each hand-off to keep the final answer grounded.',
    blurb:
      'Multimodal agentic assistant pulling insights from PDFs, Excel and audio — built on Intel OPEA. Took Top 12 nationally at the Intel AI Hackathon 2025.',
    metrics: [
      { value: '3', label: 'Input modalities' },
      { value: 'Top 12', label: 'Intel AI Hackathon' },
      { value: '₹25k', label: 'Prize' },
    ],
    tags: ['Agentic AI', 'Multimodal'],
    tech: ['Python', 'React', 'Intel OPEA', 'RAG'],
    tone: 'sky',
    // TODO: no screenshot yet — this is the strongest award on the site and it
    // has no picture. Recapture from the demo build or the submission deck.
    image: '',
    // TODO: no public repo. Push a cleaned-up version — an award with no code
    // behind it is the weakest kind of claim on a portfolio.
    repo: '',
    demo: '',
    writeup: '',
    featured: false,
  },
  {
    title: 'Namma Connect',
    problem:
      'Grassroots NGOs coordinate volunteers, field reports and crises over WhatsApp threads and spreadsheets, so escalations get lost.',
    architecture:
      'Multi-tenant FastAPI backend with an OpenCV + Tesseract OCR stage that classifies bilingual field reports, a skills/proximity/reliability matcher for volunteer dispatch, an SLA escalation timer, and GPS-verified check-ins written to Supabase.',
    blurb:
      'Multi-tenant NGO operations layer: OCR-classifies Tamil and English field reports, matches volunteers by skill, proximity and reliability, escalates SLA breaches.',
    metrics: [
      { value: '2', label: 'OCR languages' },
      { value: 'Multi-tenant', label: 'Isolation model' },
      // TODO: measure OCR classification accuracy on the held-out field-report set.
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['React', 'FastAPI', 'Gemini', 'Supabase', 'OpenCV', 'Tesseract OCR'],
    tone: 'emerald',
    image: asset('namma_connect.png'),
    repo: 'https://github.com/Ganesh-0509/smart-resource-allocation',
    // REMOVED 2026-07-28: the Cloud Run service returns 404 — it's gone, not
    // cold. Redeploy (Vercel/Render is more durable for a portfolio) or record
    // a 30s screen capture and link that instead.
    demo: '',
    writeup: '',
    featured: false,
  },
  {
    title: 'ISRO HAVK',
    problem:
      'Lunar mission planning starts from flat 2D satellite imagery, which hides the elevation a rover actually has to drive over.',
    architecture:
      'OpenCV shape-from-shading reconstructs a height field from single-source satellite imagery; a Flask service runs A* path planning across the derived cost map, and Babylon.js renders the terrain as a navigable 3D scene.',
    blurb:
      'Turns flat 2D satellite images into navigable 3D lunar terrain with A* rover path planning.',
    metrics: [
      { value: '2D → 3D', label: 'Reconstruction' },
      { value: 'A*', label: 'Path planning' },
      // TODO: measure reconstruction time per tile and path-planning search time.
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['Python', 'Flask', 'OpenCV', 'Babylon.js', 'NumPy / SciPy'],
    tone: 'amber',
    image: asset('isro-havk.png'),
    repo: 'https://github.com/Ganesh-0509/ISRO-HAVK-Revolutionizing-Lunar-Terrain-Intelligence-for-Space-Missions',
    demo: '',
    writeup: '',
    featured: false,
  },
  {
    title: 'FinMate',
    problem:
      'Budgeting apps built for Western banking assume clean transaction feeds that Indian users simply do not get.',
    architecture:
      'Next.js + TypeScript client on Firebase, capturing expenses through voice and OCR receipt parsing, with Gemini providing contextual coaching over a goal-first budgeting model.',
    blurb:
      'Finance co-pilot with voice and OCR expense capture and contextual coaching, built for how money actually moves in India. A team build.',
    metrics: [
      { value: 'Voice + OCR', label: 'Capture modes' },
      { value: '₹10k', label: 'VIT hackathon prize' },
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['Next.js', 'TypeScript', 'Gemini', 'Firebase'],
    tone: 'emerald',
    image: asset('finmate.png'),
    // Team project — repo lives under teammate Vino's account.
    repo: 'https://github.com/Vino1705/Finmate',
    demo: '',
    writeup: '',
    featured: false,
  },
]

// ── Highlights / receipts ────────────────────────────────────────────────────
// CORRECTED 2026-07-28. These placings previously contradicted both each other
// and the résumé PDF. Confirmed by Ganesh; the PDF must be regenerated to match.
//   Intel   → Top 12 nationally, ₹25,000  (was wrongly "1st of 90+" in the hero)
//   VIT     → 2nd Runners-Up of 90 teams  (was wrongly "Winner")
//   NxtWave → State 1st, then National Top 10  (was understated as "Finalist")
export const wins = [
  {
    title: 'Top 12 · Intel AI Hackathon 2025',
    chip: 'National',
    medal: '🏅',
    detail: 'Top 12 nationally and ₹25,000 for Enterprise360, a multimodal agentic assistant built on Intel OPEA.',
    year: 'May 2025',
    image: asset('win-intel.png'),
  },
  {
    // Event name confirmed as VOID v1 '25 (the résumé PDF's "V?ID" was a broken
    // glyph in its text layer, not a real character).
    title: '2nd Runner-Up · VOID v1 ’25, VIT',
    chip: 'Hackathon',
    medal: '🥉',
    detail: 'Top 25 of 90 teams, then 2nd Runner-Up and ₹10,000 for FinMate — a voice-and-OCR finance co-pilot built for Indian spending.',
    year: 'Oct 2025',
    image: asset('win-vit.jpg'),
  },
  {
    title: 'State 1st · OpenAI × NxtWave Buildathon',
    chip: 'Buildathon',
    medal: '🥇',
    detail: 'First place at Tamil Nadu state level with Sahaay-AI, then Top 10 in the national round.',
    year: 'Nov 2025',
    image: asset('win-nxtwave.jpg'),
  },
]

export const socials = [
  { name: 'GitHub', icon: 'github', url: profile.github },
  { name: 'LinkedIn', icon: 'linkedin', url: profile.linkedin },
  { name: 'Email', icon: 'mail', url: `mailto:${profile.email}` },
]

// Contact form: posts to Formspree so messages arrive in Ganesh's inbox.
// If emptied, the form falls back to opening a mailto: link.
// Verified accepting submissions 2026-07-28 (returned ok:true).
export const contactFormEndpoint = 'https://formspree.io/f/xykaazyz'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'wins', label: 'Highlights' },
]
