// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
// Edit this file to update text, projects, skills, links — no component changes
// needed. Anything marked  // TODO:  is a placeholder waiting on a real number.
//
// GROUND RULE: every claim on this site must be backed by a shipped artifact.
// Recruiters cross-check headlines against repos. Do not add a stack here that
// no project in `projects` actually uses.
// ─────────────────────────────────────────────────────────────────────────────

// BASE_URL makes asset links work on GitHub Pages project sites (/repo/) too.
const asset = (file) => import.meta.env.BASE_URL + file

export const profile = {
  name: 'Ganesh Kumar T',
  shortName: 'Ganesh',
  // Positioning line — what a recruiter reads in the first two seconds.
  headline: 'AI Systems & Full-Stack Engineer',
  // The specialisation, spelled out. Rendered as mono, split on '·'.
  specialisms: ['Agentic AI', 'RAG Pipelines', 'Production ML Infrastructure'],
  // One paragraph of substance under the headline. No adjectives without proof.
  summary:
    'I build agentic AI systems and retrieval pipelines that run in production — multi-agent orchestration, PGVector RAG with Gemini embeddings, and ONNX-exported models served at the edge. AI/ML undergrad at Saveetha (CGPA 8.2). Won Intel AI Hackathon 2025, 1st of 90+ teams.',
  availability: 'Open to AI / ML & backend internships — 2026',
  location: 'Chennai, Tamil Nadu, India',
  email: 'ganesh957kumar@gmail.com',
  phone: '+91 78250 83996',
  resumeUrl: asset('Ganesh_Kumar_Resume.pdf'),
  photo: asset('profile.jpg'),
  github: 'https://github.com/Ganesh-0509',
  linkedin: 'https://www.linkedin.com/in/ganesh-kumar-957t/',
}

export const about = {
  story: [
    "I don't just study AI — I build with it. As a second-year AI/ML engineer at Saveetha Engineering College (CGPA 8.2), I build agentic AI systems, RAG pipelines, and LLM-powered applications that solve real problems — not academic exercises.",
    'My work runs on multi-agent orchestration, PGVector RAG with Gemini embeddings, and production workflows with self-reflection loops — Python, FastAPI, React, and the Gemini / OpenAI / Claude APIs. I won the Intel AI Hackathon 2025 (1st of 90+ teams) building a multimodal agentic RAG system. Now I want to contribute to agentic and finance-AI workflows from day one.',
  ],
  stats: [
    { label: 'LeetCode solved', value: 70, suffix: '+' },
    { label: 'Projects shipped', value: 14, suffix: '+' },
    { label: 'Hackathon wins', value: 3, suffix: '' },
  ],
}

// ── Tech dictionary ──────────────────────────────────────────────────────────
// One tooltip per tool, reused by both the skills matrix and the project
// badges. Keep each under ~90 characters — it renders in a small popover.
export const techMeta = {
  // Languages
  Python: 'Primary language — every ML pipeline and FastAPI backend here.',
  TypeScript: 'Typed React and Next.js front-ends; strict mode by default.',
  JavaScript: 'ES2023 — DOM work, D3 and Babylon.js scenes.',
  SQL: 'Postgres dialect — schema design, joins, window functions.',
  'HTML5 / CSS3': 'Semantic markup, CSS grid and custom properties. No framework needed.',

  // AI & Data
  Gemini: 'Google Gemini API — embeddings, multimodal prompts, structured output.',
  'GPT-4o': 'OpenAI API for reasoning-heavy agent steps and tool calling.',
  Claude: 'Anthropic API — long-context analysis and report generation.',
  LangGraph: 'Graph-based agent orchestration with self-reflection loops.',
  RAG: 'Retrieval-augmented generation with grounding and hallucination checks.',
  PGVector: 'Postgres vector extension — embedding storage and ANN search.',
  ONNX: 'Open Neural Network Exchange — exports models for fast edge inference.',
  'scikit-learn': 'Classical ML — RandomForest classifiers, metrics, cross-validation.',
  SHAP: 'Shapley additive explanations — per-feature model attribution.',
  Fairlearn: 'Fairness metrics and bias mitigation for classification models.',
  'NumPy / SciPy': 'Numerical arrays and signal processing under the vision pipelines.',

  // Web & Cloud
  React: 'React 18 — hooks, concurrent rendering, memoised component trees.',
  'Next.js': 'App Router, server components, and file-based routing.',
  FastAPI: 'Async Python API framework — the backend in four of these builds.',
  Flask: 'Lightweight Python service layer for the vision and terrain pipelines.',
  'Node.js': 'Tooling, build scripts and lightweight service endpoints.',
  PostgreSQL: 'Relational store — the system of record behind PGVector.',
  Supabase: 'Managed Postgres with auth, row-level security and storage.',
  Redis: 'In-memory cache for hot retrieval paths and session state.',
  Docker: 'Containerised builds — reproducible from laptop to Cloud Run.',
  'Cloud Run': 'Google serverless containers — how the live demos are deployed.',
  Firebase: 'Auth and realtime data for the FinMate client.',

  // Vision & Interfaces
  OpenCV: 'Computer vision — OCR preprocessing, shape-from-shading, contours.',
  'Tesseract OCR': 'Optical character recognition, tuned for Tamil and English.',
  'D3.js': 'Data-driven SVG — the knowledge-graph and ward visualisations.',
  'Babylon.js': 'WebGL 3D engine rendering the reconstructed lunar terrain.',
  'Framer Motion': 'Declarative, GPU-composited animation for React.',
  Git: 'Branch-per-feature workflow, reviewed merges, GitHub Actions CI.',
}

// ── Skills, grouped by engineering domain ────────────────────────────────────
// No percentages, no star ratings — those signal nothing to an engineer. Just
// the domains and the real tools inside them.
export const skillDomains = [
  {
    id: 'languages',
    label: 'Languages',
    note: 'What I write day to day.',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML5 / CSS3'],
  },
  {
    id: 'ai',
    label: 'AI & Data',
    note: 'Model orchestration, retrieval and evaluation.',
    items: [
      'Gemini', 'GPT-4o', 'Claude', 'LangGraph', 'RAG', 'PGVector',
      'ONNX', 'scikit-learn', 'SHAP', 'Fairlearn', 'NumPy / SciPy',
    ],
  },
  {
    id: 'web',
    label: 'Web & Cloud Systems',
    note: 'How the models reach a user.',
    items: [
      'React', 'Next.js', 'FastAPI', 'Flask', 'Node.js',
      'PostgreSQL', 'Supabase', 'Redis', 'Docker', 'Cloud Run', 'Firebase',
    ],
  },
  {
    id: 'vision',
    label: 'Vision & Interfaces',
    note: 'Pixels in, structured data out — and back to the screen.',
    items: ['OpenCV', 'Tesseract OCR', 'D3.js', 'Babylon.js', 'Framer Motion', 'Git'],
  },
]

// Flat list, derived — the chatbot reads this.
export const skills = skillDomains.flatMap((d) => d.items)

// ── Projects as micro case studies ───────────────────────────────────────────
// Each card answers: what problem, what architecture, what did it measure at,
// where's the code. `metrics` renders only when non-empty — an empty array is
// honest, an invented latency figure is not.
export const projects = [
  {
    title: 'CampusSync Edge',
    problem:
      'Campus information lives in a dozen disconnected systems, so a single straight answer means hunting through all of them.',
    architecture:
      'FastAPI service over a Gemini-embedding + PGVector retrieval layer, Redis caching hot paths, and a hallucination-detection pass that grounds every answer in a cited source. A RandomForest classifier is exported to ONNX so lighter inference runs at the edge.',
    blurb:
      'Full-stack AI platform with a production RAG pipeline (Gemini embeddings + PGVector + Redis), hallucination detection, and a RandomForest classifier (82.1% F1) exported to ONNX for edge inference.',
    story: [
      'Campuses run on scattered systems — notices, schedules, records — and getting a straight answer means hunting through all of them. CampusSync Edge folds that into one assistant you can just ask.',
      'Under the hood it is a production RAG pipeline: Gemini embeddings stored in PGVector, Redis caching the hot paths, and a hallucination-detection layer that keeps answers grounded in real sources. A RandomForest classifier (82.1% F1) is exported to ONNX so the lighter inference can run at the edge, close to the user.',
    ],
    metrics: [
      { value: '82.1%', label: 'Classifier F1' },
      { value: 'ONNX', label: 'Edge runtime' },
      // TODO: measure p95 retrieval latency and Redis cache hit-rate, then add here.
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['FastAPI', 'React', 'PGVector', 'Gemini', 'ONNX', 'Redis'],
    tone: 'violet',
    image: asset('campusSync.png'),
    repo: 'https://github.com/Ganesh-0509/Campus-Sync-Edge-Ai',
    demo: '',
    writeup: '',
    featured: true,
  },
  {
    title: 'Namma Connect',
    problem:
      'Grassroots NGOs coordinate volunteers, field reports and crises over WhatsApp threads and spreadsheets, so escalations get lost.',
    architecture:
      'Multi-tenant FastAPI backend with an OpenCV + Tesseract OCR stage that classifies bilingual field reports, a skills/proximity/reliability matcher for volunteer dispatch, an SLA escalation timer, and GPS-verified check-ins written to Supabase.',
    blurb:
      'Multi-tenant NGO coordination platform: OCR-classifies field reports (Tamil & English), auto-matches volunteers by skills, proximity and reliability, and escalates SLA breaches — with GPS-verified check-ins.',
    story: [
      'Grassroots NGOs coordinate volunteers, field reports and crises mostly over WhatsApp and spreadsheets. Namma Connect gives them a real operations layer.',
      'It OCR-classifies field reports in Tamil and English, auto-matches volunteers by skills, proximity and reliability, and escalates SLA breaches before they slip — with GPS-verified check-ins so the dispatch record reflects what actually happened on the ground. Built multi-tenant, so every organisation keeps its own space.',
    ],
    metrics: [
      { value: '2', label: 'OCR languages' },
      { value: 'Multi-tenant', label: 'Isolation model' },
      // TODO: measure OCR classification accuracy on the held-out field-report set.
      // TODO: record median volunteer match time vs the manual baseline.
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['React', 'FastAPI', 'Gemini', 'Supabase', 'OpenCV', 'Tesseract OCR'],
    tone: 'emerald',
    image: asset('namma_connect.png'),
    repo: 'https://github.com/Ganesh-0509/smart-resource-allocation',
    demo: 'https://ngo-app-812651531349.asia-south1.run.app',
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
    story: [
      'Public sentiment moves faster than any dashboard built for it. JanaNaadi listens in real time and maps the mood across India’s 250 MCD wards.',
      'A knowledge graph ties together places, issues and voices, so a spike in one ward reads in context instead of as noise. The frontend renders it with D3 over a FastAPI backend, with Gemini doing the heavy lifting on language.',
    ],
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
    title: 'Bias-Lab',
    problem:
      'Fairness tooling like AIF360 and Fairlearn is powerful but code-only, which locks most product teams out of running a real bias review.',
    architecture:
      'React front-end over a FastAPI audit engine that runs an 8-stage pipeline — proxy-feature detection, SHAP attribution, Fairlearn metrics and counterfactual tests — then has Gemini draft a stakeholder-ready mitigation report.',
    blurb:
      'Enterprise AI-fairness platform: upload a dataset and get an 8-stage bias audit — proxy detection, SHAP explainability, counterfactual tests, and Gemini-written mitigation reports.',
    story: [
      'Fairness tooling like AIF360 and Fairlearn is powerful, but it lives in code — which leaves most teams out. Bias-Lab puts a production-grade UI over it.',
      'Upload a dataset and it runs an 8-stage audit: proxy detection, SHAP explainability, counterfactual tests, and a Gemini-written mitigation report you can hand straight to a stakeholder. The goal is to make a real bias review something a team can run in an afternoon, not a research project.',
    ],
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
    demo: 'https://bias-lab-35890642291.us-central1.run.app',
    writeup: '',
    featured: true,
  },
  {
    title: 'ISRO HAVK',
    problem:
      'Lunar mission planning starts from flat 2D satellite imagery, which hides the elevation a rover actually has to drive over.',
    architecture:
      'OpenCV shape-from-shading reconstructs a height field from single-source satellite imagery; a Flask service runs A* path planning across the derived cost map, and Babylon.js renders the terrain as a navigable 3D scene.',
    blurb:
      'Turns flat 2D satellite images into navigable 3D lunar terrain with A* rover path planning.',
    story: [
      'Mission planning starts from flat satellite imagery, which tells you nothing about what a rover has to climb. HAVK reconstructs the third dimension.',
      'Shape-from-shading in OpenCV derives a height field from single-source imagery, A* plans a route across the resulting cost map, and Babylon.js renders the whole thing as terrain you can actually fly through in the browser.',
    ],
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
      'AI finance co-pilot with voice & OCR expense capture, contextual coaching, and gamified, goal-first budgeting built for India. A team build.',
    story: [
      'Budgeting tools assume a clean transaction feed. In India, most spending never shows up that way — so FinMate captures it however it happens.',
      'Voice notes and photographed receipts both become structured expenses, and Gemini turns the running picture into coaching rather than another pie chart. Built with a team; won ₹10,000 at the VIT symposium.',
    ],
    metrics: [
      { value: 'Voice + OCR', label: 'Capture modes' },
      { value: '₹10k', label: 'VIT symposium win' },
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

// "Wins" / receipts — proud moments (2025). Image-topped cards.
export const wins = [
  {
    title: 'Top 12 · Intel AI Hackathon 2025',
    chip: 'Hackathon',
    medal: '🥇',
    detail: 'National recognition + ₹25,000 for Enterprise360, an AI assistant for unified enterprise insights.',
    year: 'May 2025',
    image: asset('win-intel.png'),
  },
  {
    title: 'Winner · VIT Symposium',
    chip: 'Symposium',
    medal: '💰',
    detail: 'Presented FinMate and took home ₹10,000 for a practical, problem-first finance assistant.',
    year: 'Oct 2025',
    image: asset('win-vit.jpg'),
  },
  {
    title: 'Finalist · OpenAI × NxtWave',
    chip: 'Buildathon',
    medal: '🚀',
    detail: 'Top 10 in the Tamil Nadu regionals with Sahaay-AI — now heading to the National round.',
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
// NOTE: the FIRST submission triggers a one-time confirmation email from
// Formspree — click that link once to start receiving messages.
export const contactFormEndpoint = 'https://formspree.io/f/xykaazyz'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'wins', label: 'Highlights' },
]
