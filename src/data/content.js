// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
// Edit this file to update text, projects, skills, links — no component changes
// needed. Anything marked  // TODO:  is a placeholder waiting on a real asset.
// Content compiled from the résumé (Profile.pdf) + project intelligence report.
// ─────────────────────────────────────────────────────────────────────────────

// BASE_URL makes asset links work on GitHub Pages project sites (/repo/) too.
const asset = (file) => import.meta.env.BASE_URL + file

export const profile = {
  name: 'Ganesh Kumar T',
  shortName: 'Ganesh',
  // Handwritten greeting in the hero.
  greeting: "hey, i'm ganesh",
  // Rotating role words under the headline.
  roles: ['Agentic AI Engineer', 'RAG & LLM Systems', 'Full-Stack Builder', 'Problem Solver'],
  // Short, warm one-liner under the headline.
  tagline:
    // Was "Intel AI Hackathon 2025 winner — 1st of 90+ teams", which contradicted
    // the Highlights section ("Top 12") lower down the same page. Top 12 is the
    // true result, so the claim now matches everywhere.
    'AI/ML engineer at Saveetha (CGPA 8.2) building agentic systems, RAG pipelines, and LLM-powered apps. Top 12 nationally at the Intel AI Hackathon 2025, out of 90+ teams. Chasing agentic / finance-AI internships.',
  location: 'Chennai, Tamil Nadu, India',
  email: 'ganesh957kumar@gmail.com',
  // Confirmed by Ganesh (2026-06-17).
  phone: '+91 78250 83996',
  // Résumé PDF, hosted locally in /public (replaces the old Google Drive link).
  resumeUrl: asset('Ganesh_Kumar_Resume.pdf'),
  // Headshot at /public/profile.jpg (stepwell portrait), framed via CSS object-position.
  photo: asset('profile.jpg'),
}

export const about = {
  story: [
    "I don't just study AI — I build with it. As a second-year AI/ML engineer at Saveetha Engineering College (CGPA 8.2), I build agentic AI systems, RAG pipelines, and LLM-powered applications that solve real problems — not academic exercises.",
    "My work runs on multi-agent orchestration, PGVector RAG with Gemini embeddings, and production workflows with self-reflection loops — Python, FastAPI, React, and the Gemini / OpenAI / Claude APIs. I placed in the top 12 nationally at the Intel AI Hackathon 2025, out of 90+ teams, building a multimodal agentic RAG system. Now I'm looking to contribute to agentic and finance-AI workflows from day one.",
  ],
  stats: [
    { label: 'LeetCode solved', value: 70, suffix: '+' },
    { label: 'Projects shipped', value: 14, suffix: '+' },
    { label: 'AI models used', value: 5, suffix: '+' },
  ],
}

// "The Triple Threat" — three things you do. Each carries the real stack it
// runs on (shown as a typographic keyword list, not skill bars).
export const tripleThreat = [
  {
    title: 'Gen AI & LLMs',
    blurb: 'Orchestrating Gemini, GPT-4o & Claude into agents and assistants that actually ship.',
    stack: ['Gemini', 'GPT-4o', 'Claude', 'LangGraph', 'RAG + PGVector', 'Prompt orchestration'],
  },
  {
    title: 'Computer Vision',
    blurb: 'OpenCV pipelines — from shape-from-shading 3D terrain to bilingual prescription OCR.',
    stack: ['OpenCV', 'Tesseract OCR', 'NumPy / SciPy', 'SHAP', 'Shape-from-shading'],
  },
  {
    title: 'Full-Stack Systems',
    blurb: 'End-to-end builds: FastAPI / Flask backends wired to React & Next.js front-ends.',
    stack: ['React / Next.js', 'FastAPI / Flask', 'PostgreSQL · Supabase', 'TypeScript', 'Python', 'Docker'],
  },
]

// Flat list — only the names are surfaced (in the chatbot). The old skill-bar
// percentages were dropped when the progress-bar UI was removed in the redesign.
export const skills = [
  'Python',
  'Machine Learning',
  'Data Structures & Algorithms',
  'JavaScript / TypeScript',
  'HTML5 & CSS3',
  'SQL',
]

export const projects = [
  {
    title: 'Jobyn',
    blurb:
      'Full-stack AI platform with a production RAG pipeline (Gemini embeddings + PGVector + Redis), hallucination detection, and a RandomForest classifier (82.1% F1) exported to ONNX for edge inference.',
    story: [
      'Campuses run on scattered systems — notices, schedules, records — and getting a straight answer means hunting through all of them. Jobyn folds that into one assistant you can just ask.',
      'Under the hood it is a production RAG pipeline: Gemini embeddings stored in PGVector, Redis caching the hot paths, and a hallucination-detection layer that keeps answers grounded in real sources. A RandomForest classifier (82.1% F1) is exported to ONNX so the lighter inference can run at the edge, close to the user.',
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['FastAPI', 'React', 'PGVector', 'Gemini', 'ONNX'],
    tone: 'coral',
    image: asset('campusSync.png'),
    repo: 'https://github.com/Ganesh-0509/Campus-Sync-Edge-Ai',
    demo: 'https://jobyn.pages.dev',
    featured: true,
  },
  {
    title: 'Namma Connect',
    blurb:
      'Multi-tenant NGO coordination platform: OCR-classifies field reports (Tamil & English), auto-matches volunteers by skills, proximity and reliability, and escalates SLA breaches — with GPS-verified check-ins.',
    story: [
      'Grassroots NGOs coordinate volunteers, field reports and crises mostly over WhatsApp and spreadsheets. Namma Connect gives them a real operations layer.',
      'It OCR-classifies field reports in Tamil and English, auto-matches volunteers by skills, proximity and reliability, and escalates SLA breaches before they slip — with GPS-verified check-ins so the dispatch record reflects what actually happened on the ground. Built multi-tenant, so every organisation keeps its own space.',
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['React', 'FastAPI', 'Gemini', 'Supabase', 'OpenCV'],
    tone: 'sage',
    image: asset('namma_connect.png'),
    repo: 'https://github.com/Ganesh-0509/smart-resource-allocation',
    demo: 'https://ngo-app-812651531349.asia-south1.run.app',
    featured: true,
  },
  {
    title: 'JanaNaadi',
    blurb:
      "Real-time public-sentiment platform with a knowledge graph spanning India's 250 MCD wards.",
    story: [
      'Public sentiment moves faster than any dashboard built for it. JanaNaadi listens in real time and maps the mood across India’s 250 MCD wards.',
      'A knowledge graph ties together places, issues and voices, so a spike in one ward reads in context instead of as noise. The frontend renders it with D3 over a FastAPI backend, with Gemini doing the heavy lifting on language.',
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['FastAPI', 'React', 'D3.js', 'Gemini'],
    tone: 'sky',
    image: asset('jananaadi.png'),
    repo: 'https://github.com/Ganesh-0509/JanaNaadi',
    demo: 'https://jana-naadi.vercel.app/',
    featured: true,
  },
  {
    title: 'ISRO HAVK',
    blurb:
      'Turns flat 2D satellite images into navigable 3D lunar terrain with A* rover path planning.',
    tags: ['AI/ML', 'Full Stack'],
    tech: ['Python', 'Flask', 'OpenCV', 'Babylon.js'],
    tone: 'mustard',
    image: asset('isro-havk.png'),
    repo: 'https://github.com/Ganesh-0509/ISRO-HAVK-Revolutionizing-Lunar-Terrain-Intelligence-for-Space-Missions',
    demo: '',
    featured: false,
  },
  {
    title: 'Bias-Lab',
    blurb:
      'Enterprise AI-fairness platform: upload a dataset and get an 8-stage bias audit — proxy detection, SHAP explainability, counterfactual tests, and Gemini-written mitigation reports. A production-grade UI over what AIF360/Fairlearn leave to code.',
    story: [
      'Fairness tooling like AIF360 and Fairlearn is powerful, but it lives in code — which leaves most teams out. Bias-Lab puts a production-grade UI over it.',
      'Upload a dataset and it runs an 8-stage audit: proxy detection, SHAP explainability, counterfactual tests, and a Gemini-written mitigation report you can hand straight to a stakeholder. The goal is to make a real bias review something a team can run in an afternoon, not a research project.',
    ],
    tags: ['AI/ML', 'Full Stack'],
    tech: ['React', 'FastAPI', 'SHAP', 'Fairlearn', 'Gemini'],
    tone: 'coral',
    image: asset('bias-lab.png'),
    repo: 'https://github.com/Ganesh-0509/Bias-Lab',
    demo: 'https://bias-lab-35890642291.us-central1.run.app',
    featured: true,
  },
  {
    title: 'FinMate',
    blurb:
      'AI finance co-pilot with voice & OCR expense capture, contextual coaching, and gamified, goal-first budgeting built for India. A team build.',
    tags: ['AI/ML', 'Full Stack'],
    tech: ['Next.js', 'TypeScript', 'Gemini', 'Firebase'],
    tone: 'sage',
    image: asset('finmate.png'),
    // Team project — repo lives under teammate Vino's account.
    repo: 'https://github.com/Vino1705/Finmate',
    demo: '',
    featured: false,
  },
]

// "Wins" / receipts — rendered as a centre-rail timeline, newest first.
//
// `date` (YYYY-MM) is what the timeline sorts on; `year` is only the label.
// Without it the entries rendered in array order and the timeline read
// May 25 → Oct 25 → Nov 25 → Jun 26 → Apr 26 → Jul 26, which is not a timeline.
//
// Emoji note: avoid flag emoji (🇮🇳). Windows ships no flag glyphs, so it
// renders as the letters "IN" instead of an icon.
export const wins = [
  {
    title: 'National Finalist · India Innovates 2026',
    chip: 'Hackathon',
    medal: '🏛️',
    linkedinUrl: '',   // paste the post URL → a "Read the post ↗" link appears
    detail: 'Presented JanaNaadi — multilingual sentiment across 22+ Indian languages, 35 APIs, 615+ entries spanning 28 states.',
    year: 'Jul 2026',
    date: '2026-07',
  },
  {
    title: 'Top 106 · Google Solution Challenge 2026',
    chip: 'Build with AI',
    medal: '🌍',
    linkedinUrl: '',
    detail: 'Bias-Lab placed in the top 106 out of 85,000+ registrations and 6,700+ prototype submissions.',
    year: 'Jun 2026',
    date: '2026-06',
  },
  {
    title: 'Offline Round · HackHustle 2.0',
    chip: 'Hackathon',
    medal: '⏱️',
    linkedinUrl: '',
    detail: 'One of 63 teams through to the 24-hour offline round from 4,500+ registrations and 1,000+ teams.',
    year: 'Jun 2026',
    date: '2026-06',
  },
  {
    title: 'Top 30 · Caterpillar Tech Challenge 2026',
    chip: 'Challenge',
    medal: '⚙️',
    linkedinUrl: '',
    detail: 'Team MechBusters advanced to Round 2 out of 1,500+ teams, into a mentor round with Caterpillar engineers.',
    year: 'Apr 2026',
    date: '2026-04',
  },
  {
    title: 'LeetCode 100 Days Badge 2025',
    chip: 'Consistency',
    medal: '🧩',
    linkedinUrl: '',
    detail: '100+ consecutive days of problem solving alongside coursework and shipping projects.',
    year: 'Jan 2026',
    date: '2026-01',
  },
  {
    title: 'Oracle Certified · Java',
    chip: 'Certification',
    medal: '📜',
    linkedinUrl: '',
    detail: 'Oracle Java certification — core language, OOP, and industry-standard coding practice.',
    year: 'Dec 2025',
    date: '2025-12',
  },
  {
    title: 'National Finalist · OpenAI × NxtWave',
    chip: 'Buildathon',
    medal: '🚀',
    linkedinUrl: '',
    // Was "now heading to the National round" — the Delhi round has happened.
    detail: 'First finalists from the Tamil Nadu region with Sahaay-AI, then represented the region at the national round at the India AI Impact Summit in Delhi.',
    year: 'Nov 2025',
    date: '2025-11',
    image: asset('win-nxtwave.jpg'),
  },
  {
    // Was "Winner · VIT Symposium". The LinkedIn post for this event
    // (VOID V1'25, Team Sparklers, ₹10,000) says Second Runner-Up.
    title: 'Second Runner-Up · VOID V1’25, VIT',
    chip: 'Hackathon',
    medal: '🏆',
    linkedinUrl: '',
    detail: 'Top 25 of 90 teams, then Second Runner-Up and ₹10,000 for FinMate — a practical, problem-first finance assistant. Our first 24-hour hackathon.',
    year: 'Oct 2025',
    date: '2025-10',
    image: asset('win-vit.jpg'),
  },
  {
    title: 'Top 12 · Intel AI Hackathon 2025',
    chip: 'Hackathon',
    // was 🥇 — a gold medal on a top-12 finish repeated the same overstatement
    // the hero used to make.
    medal: '🏅',
    linkedinUrl: '',
    detail: 'National recognition + ₹25,000 for Enterprise360, an AI assistant for unified enterprise insights.',
    year: 'May 2025',
    date: '2025-05',
    image: asset('win-intel.png'),
  },
]

export const socials = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/Ganesh-0509' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/ganesh-kumar-957t/' },
  // X / Twitter removed — no handle exists.
  { name: 'Email', icon: 'mail', url: 'mailto:ganesh957kumar@gmail.com' },
]

// Contact form: posts to Formspree so messages arrive in Ganesh's inbox.
// If emptied, the form falls back to opening a mailto: link.
// NOTE: the FIRST submission triggers a one-time confirmation email from
// Formspree — click that link once to start receiving messages.
export const contactFormEndpoint = 'https://formspree.io/f/xykaazyz'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'What I do' },
  { id: 'work', label: 'Work' },
  { id: 'wins', label: 'Highlights' },
]
