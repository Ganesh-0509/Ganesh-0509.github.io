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
  photo: asset('profile.webp'),
  github: 'https://github.com/Ganesh-0509',
  linkedin: 'https://www.linkedin.com/in/ganesh-kumar-957t/',
  leetcode: 'https://leetcode.com/u/24900911/',
}

export const about = {
  // Two short lines. Anything longer goes unread — the projects do the talking.
  story: [
    'Third-year AI/ML undergrad at Saveetha Engineering College, Chennai (CGPA 8.2). I ship systems rather than notebooks: retrieval that cites its sources, agents that check their own output, models exported so they actually run somewhere.',
    'Most of what I know came from building under a deadline — Intel, VIT, the OpenAI × NxtWave buildathon, and Top 106 of 85,000+ at the Google Solution Challenge — plus one agent pipeline reviewed and merged into a company’s open-source product.',
  ],
  // Numbers that cannot drift: LeetCode is fetched at build time (see
  // scripts/fetch-stats.mjs) and the project count is derived from the array
  // below, so it can never disagree with the Work section again.
  stats: [
    { label: 'LeetCode solved', value: stats.leetcode.total, suffix: '' },
    // ₹25,000 Intel + ₹10,000 VØID v1. Both are in `wins` with a post to prove them.
    { label: 'Prize money won', value: 35, suffix: 'k', prefix: '₹' },
    // The hardest number here to earn and the hardest to fake: 85,000+
    // registrations, 6,700+ prototypes submitted, 106 teams left.
    { label: 'Of 85,000+ · Solution Challenge', value: 106, prefix: 'Top ' },
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
  Java: 'Oracle Certified Professional, Java SE — OOP, collections, JDBC.',
  JavaScript: 'ES2023 — DOM work, D3 and Babylon.js scenes.',
  SQL: 'Postgres dialect — schema design, joins, window functions.',

  // AI & Data
  Gemini: 'Google Gemini API — embeddings, multimodal prompts, structured output.',
  Claude: 'Anthropic API — long-context analysis and agent tool-calling.',
  RAG: 'Retrieval-augmented generation with grounding and hallucination checks.',
  PGVector: 'Postgres vector extension — embedding storage and ANN search.',
  Tavily: 'Grounded web-search API — gives agents real sources to cite.',
  Genkit: 'Google’s AI orchestration framework — multi-step reasoning workflows.',
  ONNX: 'Open Neural Network Exchange — exports models for fast edge inference.',
  'scikit-learn': 'Classical ML — RandomForest classifiers, metrics, cross-validation.',
  XGBoost: 'Gradient-boosted trees — the classifier audited inside Bias-Lab.',
  SHAP: 'Shapley additive explanations — per-feature model attribution.',
  Fairlearn: 'Fairness metrics and bias mitigation for classification models.',
  'NumPy / SciPy': 'Numerical arrays and signal processing under the vision pipelines.',
  Pandas: 'Dataframe wrangling — feature engineering and dataset audits.',

  // Web & Cloud
  React: 'React 18 — hooks, concurrent rendering, memoised component trees.',
  'Next.js': 'App Router, server components, and file-based routing.',
  Vite: 'Build tool behind the React front-ends, including this site.',
  'React Flow': 'Node-graph UI — the interactive skill-dependency graph in Jobyn.',
  FastAPI: 'Async Python API framework — the backend in five of these builds.',
  Flask: 'Lightweight Python service layer for the vision and terrain pipelines.',
  'Node.js': 'Express services and Redis-backed background workers.',
  Pydantic: 'Schema validation — how agent output is forced into valid JSON.',
  Tailwind: 'Utility-first CSS on the Next.js and Vite front-ends.',

  // Data stores
  PostgreSQL: 'Relational store — the system of record behind PGVector.',
  Supabase: 'Managed Postgres with auth, row-level security and storage.',
  Firebase: 'Auth and realtime data for the FinMate and EcoTrace clients.',
  Firestore: 'Document store holding audit runs and reactive UI state.',
  SQLite: 'Embedded store for campaign state and prompt-version history.',
  Redis: 'In-memory cache for hot retrieval paths and session state.',

  // Infrastructure
  Docker: 'Containerised builds — reproducible from laptop to Cloud Run.',
  'Cloud Run': 'Google serverless containers — how several demos are deployed.',
  'GitHub Actions': 'CI on every push: build, checks, and deploy to Pages.',
  Git: 'Branch-per-feature workflow, reviewed merges, GitHub Actions CI.',

  // Vision & Interfaces
  OpenCV: 'Computer vision — OCR preprocessing, shape-from-shading, contours.',
  'Tesseract OCR': 'Optical character recognition, tuned for Tamil and English.',
  'D3.js': 'Data-driven SVG — the knowledge-graph and ward visualisations.',
  'Babylon.js': 'WebGL 3D engine rendering the reconstructed lunar terrain.',
}

// ── Skills, grouped by engineering domain ────────────────────────────────────
// No percentages, no star ratings — those signal nothing to an engineer. Just
// the domains and the real tools inside them.
//
// EXPANDED 2026-07-28. Still bound by ground rule 1 — every tool below is used
// by a repo Ganesh actually owns. What stays OUT and why:
//   GPT-4o, LangGraph  — nothing here uses them
//   Intel OPEA         — only Enterprise360 used it, and that has no public repo
//   HTML5/CSS3         — not a skill worth a badge at this level
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
      'Gemini', 'Claude', 'RAG', 'PGVector', 'Tavily', 'Genkit',
      'ONNX', 'scikit-learn', 'XGBoost', 'SHAP', 'Fairlearn',
      'NumPy / SciPy', 'Pandas',
    ],
  },
  {
    id: 'web',
    label: 'Web & Backend',
    note: 'How the models reach a user.',
    items: [
      'React', 'Next.js', 'Vite', 'React Flow', 'Tailwind',
      'FastAPI', 'Flask', 'Node.js', 'Pydantic',
    ],
  },
  {
    id: 'data',
    label: 'Data & Infrastructure',
    note: 'Where state lives, and how it ships.',
    items: [
      'PostgreSQL', 'Supabase', 'Firebase', 'Firestore', 'SQLite', 'Redis',
      'Docker', 'Cloud Run', 'GitHub Actions', 'Git',
    ],
  },
  {
    id: 'vision',
    label: 'Vision & Interfaces',
    note: 'Pixels in, structured data out — and back to the screen.',
    items: ['OpenCV', 'Tesseract OCR', 'D3.js', 'Babylon.js'],
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
    image: asset('jobyn.webp'),
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
    // XGBoost + Firestore per the build-story post — the site previously listed
    // scikit-learn here, which wasn't what actually shipped.
    tech: ['React', 'FastAPI', 'XGBoost', 'SHAP', 'Fairlearn', 'Gemini', 'Firestore'],
    tone: 'violet',
    image: asset('bias-lab.webp'),
    repo: 'https://github.com/Ganesh-0509/Bias-Lab',
    // REMOVED 2026-07-28: the Cloud Run revision returns 500. Restore this line
    // only once the URL answers 200 again.
    demo: '',
    // The build-story post — why fairness deliberately isn't reported as one
    // number, and why the LLM was barred from inventing a statistic.
    writeup: 'https://www.linkedin.com/posts/ganesh-kumar-957t_build-with-ai-solution-challenge-activity-7486336916909637632-069P',
    featured: true,
  },
  {
    title: 'JanaNaadi',
    problem:
      'Civic sentiment shifts faster than the dashboards built to track it, so a spike in one ward reads as noise instead of signal.',
    architecture:
      'A 35-endpoint FastAPI backend aggregates 9 RSS news feeds and anonymous citizen submissions, runs multilingual sentiment across 22+ Indian languages, and geo-resolves each signal down to state, district, constituency and ward. Supabase Postgres holds the record with role-based auth; a D3.js front-end renders the knowledge graph in real time.',
    blurb:
      'Real-time civic sentiment across 22+ Indian languages, geo-resolved from state down to ward, with AI-generated policy briefs.',
    metrics: [
      { value: '22+', label: 'Languages' },
      { value: '35', label: 'API endpoints' },
      { value: '28', label: 'States covered' },
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['FastAPI', 'React', 'D3.js', 'Gemini', 'Supabase', 'PostgreSQL'],
    tone: 'sky',
    image: asset('jananaadi.webp'),
    repo: 'https://github.com/Ganesh-0509/JanaNaadi',
    demo: 'https://jana-naadi.vercel.app/',
    writeup: '',
    featured: true,
  },
  // Enterprise360 is NOT listed here, deliberately. It's the Intel Top 12
  // project and it has no public repo — a project card with no code behind it
  // is the weakest thing you can put on a portfolio. It stays where it belongs:
  // as a dated, LinkedIn-linked entry in `wins`. Add it back as a project the
  // day the repo goes public.
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
    image: asset('namma_connect.webp'),
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
    image: asset('isro-havk.webp'),
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
    image: asset('finmate.webp'),
    // Team project — repo lives under teammate Vino's account.
    repo: 'https://github.com/Vino1705/Finmate',
    demo: '',
    writeup: '',
    featured: false,
  },
]

// ── Highlights / receipts ────────────────────────────────────────────────────
// CORRECTED 2026-07-28. These placings previously contradicted both each other
// and the résumé PDF. Confirmed by Ganesh; see the canonical wording note.
//   Intel   → Top 12 nationally, ₹25,000  (was wrongly "1st of 90+" in the hero)
//   VØID    → 2nd Runner-Up of 90 teams   (was wrongly "Winner")
//   NxtWave → State 1st, then National Top 10  (was understated as "Finalist")
//
// `year` is the timestamp embedded in the entry's own LinkedIn activity id, not
// memory. That corrected two wrong dates already on the site: Intel was showing
// May 2025 (actually July) and VØID October (November).
//
// REVISED 2026-07-31: the post date is only a stand-in for the date of the thing
// itself, and once the card carries the certificate the gap becomes visible — a
// reader sees "Mar 2025" beside a certificate that reads "Jul 09 2024". Where the
// image states its own date, that date wins:
//   Ybi        → Jul 2024, per the certificate (post was Mar 2025)
//   HackHustle → Apr 2026, per the event poster (post was Jun 2026)
//
// `url` points at the post that proves the entry — the whole section is called
// "Proof of work", so each card should be checkable in one click. `image` is
// optional; entries without one render as a compact text card rather than a
// placeholder block.
//
// Every `image` is matted rather than cropped — see .wincard-img. There is no
// per-entry flag for it any more: certificates and photographs get the same
// frame, because the column reads as one repeating shape down the rail only if
// it never changes. Add an image, get the frame.
export const wins = [
  {
    title: 'Python Programming Internship · Ybi Foundation',
    chip: 'Internship',
    detail: 'First real engineering role — Python fundamentals applied to project work rather than coursework.',
    year: 'Jul 2024',
    image: asset('ybi.webp'),
    url: 'https://www.linkedin.com/posts/ganesh-kumar-957t_i-have-successfully-completed-a-python-programming-activity-7301955798304264192-J_pN',
  },
  {
    title: 'Top 12 · Intel AI Hackathon 2025',
    chip: 'National',
    detail: 'Top 12 nationally out of 90+ teams and ₹25,000 for Enterprise360, a multimodal agentic assistant built on Intel OPEA.',
    year: 'Jul 2025',
    image: asset('win-intel.webp'),
    url: 'https://www.linkedin.com/posts/ganesh-kumar-957t_proud-moment-im-excited-to-share-that-activity-7348569256302731264-PcgE',
  },
  {
    // Event name is VØID v1 '25 — the résumé PDF's "V?ID" was the Ø glyph
    // failing to survive pdftotext, not a typo.
    title: '2nd Runner-Up · VØID v1 ’25, VIT',
    chip: 'Hackathon',
    detail: 'Top 25 of 90 teams, then 2nd Runner-Up and ₹10,000 for FinMate — a voice-and-OCR finance co-pilot built for Indian spending.',
    year: 'Nov 2025',
    image: asset('win-vit.webp'),
    url: 'https://www.linkedin.com/posts/vinothini-t-08b4b4274_hackathonjourney-voidv125-teamsparklers-ugcPost-7391125225632890880-XODh',
  },
  {
    title: 'State 1st · OpenAI × NxtWave Buildathon',
    chip: 'Buildathon',
    detail: 'First place at Tamil Nadu state level with Sahaay-AI, a 48-hour build, then Top 10 at the national round in Delhi.',
    year: 'Nov 2025',
    image: asset('win-nxtwave.webp'),
    url: 'https://www.linkedin.com/posts/ganesh-kumar-957t_openaibuildathontn-openaiacademy-nxtwave-activity-7397542419694751744-2-l3',
  },
  {
    // "Java SE 21 Developer" is the exact credential name on the certificate.
    title: 'Oracle Certified Professional · Java SE 21',
    chip: 'Certification',
    detail: 'Proctored Oracle certification in core Java and object-oriented design.',
    year: 'Nov 2025',
    image: asset('oracle.webp'),
    url: 'https://www.linkedin.com/posts/ganesh-kumar-957t_proud-achievement-i-am-thrilled-to-activity-7400199432232775681-_Me0',
  },
  {
    title: 'LeetCode 100 Days Badge',
    chip: 'Consistency',
    detail: '100+ days of daily problem-solving across 2025, after the 50-day badge in October.',
    year: 'Dec 2025',
    image: asset('leetcode.webp'),
    url: 'https://www.linkedin.com/posts/ganesh-kumar-957t_leetcode-100daysofcode-consistency-activity-7411624906712551424-qu-j',
  },
  {
    title: 'Top 30 of 1500+ · Caterpillar Tech Challenge 2026',
    chip: 'Corporate',
    detail: 'Team MechBusters advanced to Round 2 and the mentor sessions with Caterpillar engineers.',
    year: 'Apr 2026',
    // The shortlist notice, cut down to the ribbon and the Top-30 line. Two
    // things had to go: the phone's status bar and mail toolbar, and the
    // organisers' sentence naming the event "Caterpillar Tech Challenge 2025",
    // which contradicted the 2026 in this card's own title. The number that
    // matters — top 30 from 1500 — is the part that stayed.
    image: asset('caterpillar.webp'),
    url: 'https://www.linkedin.com/posts/ganesh-kumar-957t_caterpillartechchallenge-mechbusters-top30-activity-7449660247402577920-W3_t',
  },
  {
    title: 'Offline round · HackHustle 2.0',
    chip: 'Hackathon',
    detail: '63 teams of 1000+ made it past the proposal screen to the 24-hour offline round.',
    // The poster dates the event Apr 29–30; the LinkedIn post came later, in June.
    year: 'Apr 2026',
    // Event artwork, not a certificate — it fills the media column like a photo.
    image: asset('hackhustle.webp'),
    url: 'https://www.linkedin.com/posts/vinothini-t-08b4b4274_hackhustle2-hackathon-saveethaengineeringcollege-ugcPost-7474004299845574656-jiJA',
  },
  {
    title: 'Top 106 · Google Solution Challenge 2026',
    chip: 'Global',
    detail: 'Top 106 out of 85,000+ registrations and 6,700+ prototype submissions, with Bias-Lab — an AI fairness auditing platform.',
    year: 'Jun 2026',
    image: asset('solution.webp'),
    url: 'https://www.linkedin.com/posts/ganesh-kumar-957t_solutionchallenge2026-buildwithai-gdg-activity-7468294267187343360-O6Wo',
  },
  {
    title: 'National round · India Innovates 2026',
    chip: 'National',
    detail: 'Presented JanaNaadi — multilingual civic sentiment across 22+ Indian languages and 28 states — alongside teams from across the country.',
    year: 'Jul 2026',
    image: asset('india-innovates.webp'),
    url: 'https://www.linkedin.com/posts/tejasree-k-3a59a6328_indiainnovates2026-hackathon-jananaadi-ugcPost-7482695679199518720-m0rJ',
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
