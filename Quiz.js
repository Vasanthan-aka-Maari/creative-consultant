/* ============================================================
   ODDONESOUT — quiz.js  v2.0
   Trait Engine → Archetype → Career Match → Dynamic ROI → Claude AI
============================================================ */

/* ============================
   QUESTION DATA
============================ */
const QUESTIONS = [
  { section: "Expression & Creative Style", text: "How do you naturally express your ideas?", options: ["Writing / storytelling", "Visuals (design, photography, video)", "Speaking / presenting", "Data / structured formats"], multi: false },
  { section: "Expression & Creative Style", text: "When you see something interesting, what do you feel like doing?", options: ["Write about it", "Capture / design it", "Explain it to others", "Analyse it deeply"], multi: false },
  { section: "Expression & Creative Style", text: "Which activity excites you the most?", options: ["Creating something from scratch", "Improving something existing", "Solving a problem", "Communicating an idea"], multi: false },
  { section: "Creative Process & Thinking", text: "When starting a project, what do you do first?", options: ["Research and gather references", "Jump in and experiment", "Plan and structure everything", "Discuss ideas with others"], multi: false },
  { section: "Creative Process & Thinking", text: "How do you handle creative blocks?", options: ["Take a break / consume content", "Push through and iterate", "Switch to another task", "Collaborate with someone"], multi: false },
  { section: "Creative Process & Thinking", text: "Do you prefer working with…", options: ["Open-ended creative freedom", "Clear briefs with constraints", "A mix of both"], multi: false },
  { section: "Technical & Skill Orientation", text: "Which tools are you most comfortable with? (Select all that apply)", options: ["Writing tools (Notion, Docs)", "Design tools (Figma, Photoshop)", "Video/audio tools (Premiere Pro, After Effects)", "Coding tools (VS Code, GitHub)", "None, but open to learning"], multi: true },
  { section: "Technical & Skill Orientation", text: "How comfortable are you learning new tools?", options: ["Very comfortable", "Somewhat comfortable", "Prefer sticking to known tools"], multi: false },
  { section: "Technical & Skill Orientation", text: "Which skill would you enjoy mastering deeply?", options: ["Storytelling / writing", "Visual design", "Filmmaking / editing", "Marketing / growth", "Entrepreneurship"], multi: false },
  { section: "Work Style & Environment", text: "What kind of work environment do you prefer?", options: ["Fast-paced and dynamic", "Structured and predictable", "Independent / solo work", "Collaborative teams"], multi: false },
  { section: "Work Style & Environment", text: "How do you like to receive feedback?", options: ["Frequent and detailed", "Occasional and high-level", "Only when necessary"], multi: false },
  { section: "Work Style & Environment", text: "What kind of projects excite you more?", options: ["Short, quick projects", "Long-term, deep projects", "A mix of both"], multi: false },
  { section: "Motivation & Values", text: "What motivates you the most?", options: ["Money and status", "Impact and purpose", "Mastery and excellence", "Freedom and flexibility"], multi: false },
  { section: "Motivation & Values", text: "What matters more to you?", options: ["Stability", "Creative freedom", "Recognition", "Learning opportunities"], multi: false },
  { section: "Interests & Content", text: "What type of content do you consume the most?", options: ["Blogs / articles", "Longform: YouTube / Podcasts", "Shortform: Reels / Shorts", "Films"], multi: false },
  { section: "Interests & Content", text: "When you consume content, you focus on:", options: ["Story and narrative", "Visual aesthetics", "Technical details", "Strategy / insights"], multi: false },
  { section: "Personality & Decisions", text: "Are you more…", options: ["Highly analytical", "Mostly analytical with some creativity", "Mostly creative with some analysis", "Highly creative"], multi: false },
  { section: "Personality & Decisions", text: "How do you usually make decisions?", options: ["Data and logic", "Intuition and gut feeling", "Advice from others", "Experiment and learn"], multi: false },
  { section: "Career Direction", text: "If given 6 months with no pressure, what would you choose to do?", options: ["Build a portfolio (design / writing / video)", "Start a content channel", "Learn a technical skill", "Work on a startup idea"], multi: false },
  { section: "Career Direction", text: "Which outcome would make you happiest in your career?", options: ["Creating something widely seen (films, content, design)", "Solving meaningful problems", "Becoming highly skilled in a niche", "Having freedom to work on your own terms"], multi: false },
  { section: "Career Direction", text: "How much are you willing to invest in your career?", options: ["₹5 Lakhs", "₹10 Lakhs", "₹20 Lakhs", "Money isn't the problem"], multi: false }
];

/* ============================
   TRAIT SCORING MAP
   Every answer → trait points that build personality profile
============================ */
const QUESTION_SCORING = {
  0:  { 0:{storytelling:3,communication:2}, 1:{visual:3,creativity:2}, 2:{communication:3,collaboration:2}, 3:{analytical:3,structure:2} },
  1:  { 0:{storytelling:3,creativity:1}, 1:{visual:3,creativity:2}, 2:{communication:3,collaboration:1}, 3:{analytical:3,strategic:2} },
  2:  { 0:{creativity:3,entrepreneurial:2,experimentation:2}, 1:{analytical:2,structure:2,creativity:1}, 2:{analytical:3,strategic:2}, 3:{communication:3,storytelling:2} },
  3:  { 0:{analytical:2,strategic:2,storytelling:1}, 1:{experimentation:3,creativity:2}, 2:{structure:3,analytical:2}, 3:{collaboration:3,communication:2} },
  4:  { 0:{creativity:2,storytelling:1}, 1:{experimentation:3,structure:1}, 2:{independence:2,strategic:1}, 3:{collaboration:3,communication:2} },
  5:  { 0:{creativity:3,entrepreneurial:2,independence:2}, 1:{structure:3,analytical:2}, 2:{creativity:2,structure:2,analytical:1} },
  6:  { 0:{storytelling:2,communication:2}, 1:{visual:3,creativity:2}, 2:{visual:2,creativity:2,storytelling:1}, 3:{technical:3,analytical:2}, 4:{experimentation:2,entrepreneurial:1} },
  7:  { 0:{technical:2,experimentation:3,entrepreneurial:1}, 1:{technical:1,experimentation:1}, 2:{structure:2,independence:1} },
  8:  { 0:{storytelling:3,communication:3}, 1:{visual:3,creativity:3}, 2:{visual:2,creativity:2,storytelling:2}, 3:{strategic:3,analytical:2,entrepreneurial:2}, 4:{entrepreneurial:3,strategic:2,experimentation:2} },
  9:  { 0:{entrepreneurial:2,experimentation:2,strategic:1}, 1:{structure:3,analytical:2}, 2:{independence:3,creativity:2}, 3:{collaboration:3,communication:2} },
  10: { 0:{collaboration:2,analytical:1}, 1:{independence:2,strategic:1}, 2:{independence:3,creativity:1} },
  11: { 0:{experimentation:2,entrepreneurial:2}, 1:{analytical:2,structure:2,strategic:2}, 2:{creativity:1,analytical:1,strategic:1} },
  12: { 0:{strategic:2,entrepreneurial:2}, 1:{storytelling:2,collaboration:2,communication:2}, 2:{analytical:2,technical:2,structure:1}, 3:{independence:3,creativity:2,entrepreneurial:2} },
  13: { 0:{structure:2,analytical:1}, 1:{creativity:3,independence:2}, 2:{communication:2,storytelling:2}, 3:{experimentation:3,technical:1,entrepreneurial:1} },
  14: { 0:{storytelling:3,analytical:1}, 1:{visual:2,storytelling:2,analytical:1}, 2:{visual:2,communication:2,creativity:2}, 3:{visual:3,storytelling:3,creativity:2} },
  15: { 0:{storytelling:3,creativity:2}, 1:{visual:3,creativity:2}, 2:{technical:3,analytical:2}, 3:{strategic:3,analytical:2,entrepreneurial:1} },
  16: { 0:{analytical:3,structure:2,strategic:1}, 1:{analytical:2,strategic:2,creativity:1}, 2:{creativity:2,analytical:1,storytelling:1}, 3:{creativity:3,experimentation:2,visual:1} },
  17: { 0:{analytical:3,structure:2,strategic:2}, 1:{creativity:2,independence:2,experimentation:1}, 2:{collaboration:3,communication:2}, 3:{experimentation:3,entrepreneurial:2,analytical:1} },
  18: { 0:{creativity:3,visual:2,storytelling:2}, 1:{communication:3,storytelling:2,entrepreneurial:2}, 2:{technical:3,analytical:2}, 3:{entrepreneurial:3,strategic:2,experimentation:2} },
  19: { 0:{visual:2,storytelling:2,creativity:3}, 1:{analytical:2,strategic:2,collaboration:2}, 2:{technical:2,analytical:2,structure:2}, 3:{independence:3,entrepreneurial:3,creativity:2} },
  20: { 0:{structure:1}, 1:{strategic:1,entrepreneurial:1}, 2:{entrepreneurial:2,strategic:2}, 3:{entrepreneurial:3,strategic:2,experimentation:2} }
};

/* ============================
   16 CAREER PROFILES WITH TRAIT DNA
   Each career has a trait fingerprint for matching
============================ */
const CAREER_PROFILES = [
  {
    title: "Content Creator / YouTuber",
    category: "Creator",
    demandGrowth: "+120% by 2030",
    difficulty: "Medium",
    salaryRange: "₹3L – ₹1Cr+",
    growthLabel: "Exceptional Growth",
    entrysalary: "₹3L",
    seniorSalary: "₹1Cr+",
    growthPotential: "Exceptional",
    traits: { storytelling:9, creativity:9, communication:8, experimentation:7, independence:6 }
  },
  {
    title: "Scriptwriter",
    category: "Media",
    demandGrowth: "+85% by 2030",
    difficulty: "Medium",
    salaryRange: "₹5L – ₹60L",
    growthLabel: "Exceptional Growth",
    entrysalary: "₹5L",
    seniorSalary: "₹60L",
    growthPotential: "Exceptional",
    traits: { storytelling:10, creativity:8, analytical:4, communication:6, independence:5 }
  },
  {
    title: "Creative Director",
    category: "Design",
    demandGrowth: "+52% by 2030",
    difficulty: "High",
    salaryRange: "₹18L – ₹90L",
    growthLabel: "High Growth",
    entrysalary: "₹18L",
    seniorSalary: "₹90L",
    growthPotential: "High",
    traits: { creativity:9, visual:8, strategic:7, communication:7, collaboration:6 }
  },
  {
    title: "Brand Strategist",
    category: "Marketing",
    demandGrowth: "+48% by 2030",
    difficulty: "Medium",
    salaryRange: "₹8L – ₹45L",
    growthLabel: "High Growth",
    entrysalary: "₹8L",
    seniorSalary: "₹45L",
    growthPotential: "High",
    traits: { strategic:9, communication:8, analytical:6, creativity:7, storytelling:5 }
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    demandGrowth: "+55% by 2030",
    difficulty: "Medium",
    salaryRange: "₹8L – ₹45L",
    growthLabel: "High Growth",
    entrysalary: "₹8L",
    seniorSalary: "₹45L",
    growthPotential: "High",
    traits: { visual:9, creativity:8, structure:6, analytical:5, collaboration:4 }
  },
  {
    title: "Motion Designer",
    category: "Design",
    demandGrowth: "+62% by 2030",
    difficulty: "Medium",
    salaryRange: "₹6L – ₹38L",
    growthLabel: "High Growth",
    entrysalary: "₹6L",
    seniorSalary: "₹38L",
    growthPotential: "High",
    traits: { visual:9, creativity:8, technical:5, storytelling:5, experimentation:6 }
  },
  {
    title: "Digital Filmmaker",
    category: "Media",
    demandGrowth: "+75% by 2030",
    difficulty: "Medium",
    salaryRange: "₹5L – ₹65L",
    growthLabel: "Exceptional Growth",
    entrysalary: "₹5L",
    seniorSalary: "₹65L",
    growthPotential: "Exceptional",
    traits: { visual:8, storytelling:9, creativity:8, independence:5, experimentation:6 }
  },
  {
    title: "Growth Marketer",
    category: "Marketing",
    demandGrowth: "+42% by 2030",
    difficulty: "Medium",
    salaryRange: "₹7L – ₹40L",
    growthLabel: "High Growth",
    entrysalary: "₹7L",
    seniorSalary: "₹40L",
    growthPotential: "High",
    traits: { analytical:8, strategic:8, experimentation:7, creativity:5, entrepreneurial:5 }
  },
  {
    title: "Performance Creative Strategist",
    category: "Marketing",
    demandGrowth: "+90% by 2030",
    difficulty: "High",
    salaryRange: "₹10L – ₹55L",
    growthLabel: "Exceptional Growth",
    entrysalary: "₹10L",
    seniorSalary: "₹55L",
    growthPotential: "Exceptional",
    traits: { analytical:8, creativity:7, strategic:8, storytelling:6, experimentation:7 }
  },
  {
    title: "Product Manager",
    category: "Tech",
    demandGrowth: "+38% by 2030",
    difficulty: "High",
    salaryRange: "₹14L – ₹70L",
    growthLabel: "High Growth",
    entrysalary: "₹14L",
    seniorSalary: "₹70L",
    growthPotential: "High",
    traits: { analytical:8, strategic:9, collaboration:7, communication:7, structure:6 }
  },
  {
    title: "AI Content Designer",
    category: "Tech",
    demandGrowth: "+200% by 2030",
    difficulty: "Medium",
    salaryRange: "₹10L – ₹60L",
    growthLabel: "Exceptional Growth",
    entrysalary: "₹10L",
    seniorSalary: "₹60L",
    growthPotential: "Exceptional",
    traits: { technical:7, creativity:8, storytelling:7, experimentation:8, analytical:5 }
  },
  {
    title: "Content Strategist & Writer",
    category: "Creator",
    demandGrowth: "+65% by 2030",
    difficulty: "Low",
    salaryRange: "₹5L – ₹30L",
    growthLabel: "High Growth",
    entrysalary: "₹5L",
    seniorSalary: "₹30L",
    growthPotential: "High",
    traits: { storytelling:9, communication:8, analytical:4, creativity:6, structure:5 }
  },
  {
    title: "Social Media Producer",
    category: "Creator",
    demandGrowth: "+85% by 2030",
    difficulty: "Low",
    salaryRange: "₹4L – ₹28L",
    growthLabel: "High Growth",
    entrysalary: "₹4L",
    seniorSalary: "₹28L",
    growthPotential: "High",
    traits: { communication:8, storytelling:7, creativity:7, visual:6, experimentation:5 }
  },
  {
    title: "Creative Entrepreneur / Founder",
    category: "Business",
    demandGrowth: "Unlimited upside",
    difficulty: "High",
    salaryRange: "₹0 – Unlimited",
    growthLabel: "Exceptional Growth",
    entrysalary: "Variable",
    seniorSalary: "Unlimited",
    growthPotential: "Exceptional",
    traits: { entrepreneurial:10, strategic:8, creativity:7, independence:9, experimentation:8 }
  },
  {
  title: "Creative Producer",
  category: "Media",
  demandGrowth: "+78% by 2030",
  difficulty: "Medium",
  salaryRange: "₹7L – ₹50L",
  growthLabel: "Exceptional Growth",
  entrysalary: "₹7L",
  seniorSalary: "₹50L",
  growthPotential: "Exceptional",
  traits: { creativity:8, strategic:7, communication:9, collaboration:8, storytelling:6 }
  },
  {
  title: "UI/UX Designer",
  category: "Design",
  demandGrowth: "+55% by 2030",
  difficulty: "Medium",
  salaryRange: "₹8L – ₹45L",
  growthLabel: "High Growth",
  entrysalary: "₹8L",
  seniorSalary: "₹45L",
  growthPotential: "High",
  traits: { visual:9, creativity:8, structure:6, analytical:5, collaboration:4 }
  },
];

/* ============================
   ARCHETYPE ENGINE
   Maps dominant trait combos → personality identity
============================ */
function getArchetype(traits) {
  const t = traits;
  if (t.storytelling >= 8 && t.strategic >= 6)   return { name:"Creative Strategist",    emoji:"🎯", desc:"You blend narrative power with strategic clarity — rare and valuable. Brands pay premium for people who can think AND tell." };
  if (t.visual >= 8 && t.creativity >= 8)         return { name:"Visual Builder",          emoji:"🎨", desc:"You think in images, aesthetics and experiences. The world needs more of your visual intelligence." };
  if (t.technical >= 7 && t.creativity >= 7)      return { name:"Creative Technologist",   emoji:"⚡", desc:"You sit at the intersection of code and creativity — one of the most in-demand profiles of the 2030 market." };
  if (t.entrepreneurial >= 8 && t.strategic >= 6) return { name:"Creative Entrepreneur",   emoji:"🚀", desc:"You're wired to build from scratch and take risks. The creator economy was designed for people like you." };
  if (t.storytelling >= 8 && t.creativity >= 7)   return { name:"Story-Driven Creator",    emoji:"✍️", desc:"You see the world as narratives waiting to be told. Your voice and perspective are your biggest career asset." };
  if (t.analytical >= 8 && t.strategic >= 7)      return { name:"Systems Thinker",         emoji:"🔬", desc:"You find patterns others miss. Your structured mind makes you invaluable in any creative team." };
  if (t.visual >= 7 && t.storytelling >= 7)       return { name:"Visual Storyteller",      emoji:"🎬", desc:"You communicate through visuals and story — the native language of the internet generation." };
  if (t.collaboration >= 8 && t.communication >= 7) return { name:"Creative Connector",   emoji:"🤝", desc:"You bring people and ideas together. Community, collaboration and communication are your superpowers." };
  if (t.independence >= 8 && t.creativity >= 7)   return { name:"Independent Maker",       emoji:"🛠️", desc:"You thrive alone, deep in craft. The solo creator economy was built for people exactly like you." };
  if (t.experimentation >= 8 && t.analytical >= 5) return { name:"Growth Operator",        emoji:"📈", desc:"You love testing, iterating and scaling. Growth roles in tech and marketing are your natural habitat." };
  return                                            { name:"Multi-Potential Creative",      emoji:"🌟", desc:"Your strengths span multiple domains — a generalist edge that becomes powerful once you choose your lane." };
}

/* ============================
   TRAIT CALCULATOR
============================ */
function calculateTraits() {
  const traits = {
    creativity:0, analytical:0, storytelling:0, visual:0,
    technical:0, entrepreneurial:0, structure:0, collaboration:0,
    independence:0, strategic:0, communication:0, experimentation:0
  };
  Object.keys(answers).forEach(qIdx => {
    (answers[qIdx] || []).forEach(optIdx => {
      const scoring = QUESTION_SCORING[qIdx]?.[optIdx];
      if (!scoring) return;
      Object.keys(scoring).forEach(trait => {
        if (traits[trait] !== undefined) traits[trait] += scoring[trait];
      });
    });
  });
  return traits;
}

/* ============================
   CAREER MATCH ENGINE
============================ */
function calculateCareerFit(userTraits, careerTraits) {
  let score = 0;
  Object.keys(careerTraits).forEach(trait => {
    score += Math.min(userTraits[trait] || 0, careerTraits[trait]);
  });
  return score;
}

function rankCareers(userTraits) {
  return CAREER_PROFILES
    .map(c => ({ ...c, fitScore: calculateCareerFit(userTraits, c.traits) }))
    .sort((a, b) => b.fitScore - a.fitScore);
}

/* ============================
   DYNAMIC ROI SCORE
   Never static — built from actual trait combinations
============================ */
function calculateROI(traits) {
  let score = 48;

  // Creativity + strategy — premium employer combo
  if (traits.creativity >= 7 && traits.strategic >= 6) score += 12;

  // Strong storytelling signal
  if (traits.storytelling >= 8) score += 10;

  // Technical depth — high market value
  if (traits.technical >= 6) score += 8;

  // Entrepreneurial + independence — high upside profile
  if (traits.entrepreneurial >= 7 && traits.independence >= 5) score += 10;

  // Visual + creativity — design-ready
  if (traits.visual >= 7 && traits.creativity >= 6) score += 7;

  // Analytical + strategic — high employer demand
  if (traits.analytical >= 7 && traits.strategic >= 6) score += 8;

  // Collaboration + communication — team multiplier
  if (traits.collaboration >= 7 && traits.communication >= 6) score += 5;

  // Experimentation mindset — critical for 2030
  if (traits.experimentation >= 7) score += 6;

  // Dominant traits = clarity bonus (employers love clear profiles)
  const dominantCount = Object.values(traits).filter(v => v >= 6).length;
  score += dominantCount * 2;

  // Investment willingness signal (Q21 = index 20)
  const invest = (answers[20] || [])[0];
  if (invest === 2) score += 4;
  if (invest === 3) score += 7;

  return Math.min(Math.max(Math.round(score), 51), 96);
}

function getScoreLabel(score) {
  if (score >= 88) return "Elite Creative-Market Fit";
  if (score >= 78) return "High Future Career Alignment";
  if (score >= 66) return "Strong Creative Market Fit";
  if (score >= 58) return "Developing Creative Potential";
  return "Early Stage — High Upside";
}

function getTopTraits(traits, n = 4) {
  return Object.entries(traits)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

/* ============================
   STATE
============================ */
let currentQ = 0;
let answers = {};

/* ============================
   SCREENS
============================ */
function show(id) {
  ['landing-screen','quiz-shell','gate-screen','loading-screen','results-screen'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById(id);
  if (target) target.style.display = (id === 'gate-screen' || id === 'loading-screen') ? 'flex' : 'block';
}

/* ============================
   START QUIZ
============================ */
function startQuiz() {
  currentQ = 0;
  answers = {};
  show('quiz-shell');
  renderQuestion();
  window.scrollTo(0, 0);
}

/* ============================
   RENDER QUESTION
============================ */
function renderQuestion() {
  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;
  const pct = Math.round((currentQ / total) * 100);

  document.getElementById('section-label').textContent = q.section;
  document.getElementById('q-counter').textContent = `${currentQ + 1} / ${total}`;
  document.getElementById('progress-fill').style.width = `${Math.max(pct, 3)}%`;

  const selectedOpts = answers[currentQ] || [];
  const optionsHTML = q.options.map((opt, i) => `
    <button class="quiz-option${q.multi ? ' multi' : ''}${selectedOpts.includes(i) ? ' selected' : ''}"
      onclick="selectOption(${i})" data-idx="${i}">
      <span class="opt-indicator"></span>
      <span>${opt}</span>
    </button>
  `).join('');

  document.getElementById('quiz-card-wrap').innerHTML = `
    <div class="quiz-card">
      <div class="quiz-q-num">Question ${currentQ + 1} of ${total}</div>
      <div class="quiz-question-text">${q.text}</div>
      <div class="quiz-options" id="options-wrap">${optionsHTML}</div>
      <div class="quiz-nav">
        <button class="quiz-btn-back" onclick="goBack()" ${currentQ === 0 ? 'style="visibility:hidden"' : ''}>← Back</button>
        <button class="quiz-btn-next${selectedOpts.length > 0 ? ' active' : ''}" id="next-btn" onclick="goNext()">
          ${currentQ === total - 1 ? 'See My Results' : 'Next'} <span>→</span>
        </button>
      </div>
    </div>
  `;
}

/* ============================
   SELECT OPTION
============================ */
function selectOption(idx) {
  const q = QUESTIONS[currentQ];
  const current = answers[currentQ] || [];
  answers[currentQ] = q.multi
    ? (current.includes(idx) ? current.filter(i => i !== idx) : [...current, idx])
    : [idx];

  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.classList.toggle('selected', answers[currentQ].includes(i));
  });

  if (answers[currentQ].length > 0) document.getElementById('next-btn')?.classList.add('active');
  if (!q.multi) setTimeout(() => goNext(), 350);
}

/* ============================
   NAVIGATION
============================ */
function goNext() {
  if (!answers[currentQ] || answers[currentQ].length === 0) return;
  if (currentQ < QUESTIONS.length - 1) {
    currentQ++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    show('gate-screen');
    window.scrollTo(0, 0);
  }
}

function goBack() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ============================
   GATE: NAME + PHONE
============================ */
async function submitGate() {
  const name  = document.getElementById('user-name').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const errEl = document.getElementById('gate-error');

  if (!name || phone.length < 7) {
    errEl.style.display = 'block';
    errEl.textContent = 'Please enter your name and a valid phone number.';
    return;
  }
  errEl.style.display = 'none';
  window.userData = { name, phone };

  show('loading-screen');
  window.scrollTo(0, 0);
  animateLoadingSteps();

  // Run the full trait engine BEFORE calling Claude
  const traits      = calculateTraits();
  const archetype   = getArchetype(traits);
  const ranked      = rankCareers(traits);
  const roiScore    = calculateROI(traits);
  const topTraits   = getTopTraits(traits, 4);
  const top3        = ranked.slice(0, 3);

  try {
    const result = await getCareerAnalysis(traits, archetype, top3, topTraits, roiScore, name);
    saveToSheet(name, phone, traits, archetype.name, result).catch(() => {});
    renderResults(result, name, archetype, roiScore);
    show('results-screen');
    window.scrollTo(0, 0);
    animateScore(result.score || roiScore);
  } catch (err) {
    console.error('API error — using local fallback:', err);
    const fallback = buildFallback(traits, archetype, top3, roiScore, topTraits);
    saveToSheet(name, phone, traits, archetype.name, fallback).catch(() => {});
    renderResults(fallback, name, archetype, roiScore);
    show('results-screen');
    window.scrollTo(0, 0);
    animateScore(roiScore);
  }
}

/* ============================
   CLAUDE API — STRUCTURED PROMPT
   Sends traits + archetype + pre-ranked careers (not raw answers)
============================ */
async function getCareerAnalysis(traits, archetype, top3, topTraits, roiScore, userName) {
  const prompt = `You are a career psychologist and creative economy analyst specialising in the Indian market (2025–2030).

A student has been profiled using a psychometric trait engine. Use this structured psychological data — NOT generic advice — to generate a deeply personalised career report.

STUDENT: ${userName}

TRAIT SCORES (0–15 scale, higher = stronger signal):
${JSON.stringify(traits, null, 2)}

DOMINANT TRAITS (top 4): ${topTraits.join(', ')}

PERSONALITY ARCHETYPE: ${archetype.name}
"${archetype.desc}"

TOP CAREER MATCHES (pre-ranked by trait alignment engine):
${top3.map((c, i) => `${i+1}. ${c.title} (${c.category}) | ${c.salaryRange} | ${c.demandGrowth}`).join('\n')}

CALCULATED ROI SCORE: ${roiScore}/100

Return ONLY valid JSON — no markdown fences, no extra text:
{
  "score": ${roiScore},
  "scoreLabel": "${getScoreLabel(roiScore)}",
  "scoreTagline": "<one punchy sentence about THIS student's specific market fit — mention their archetype and top traits>",
  "careers": [
    {
      "title": "<use the EXACT title from the top career matches above — do not invent new ones>",
      "category": "<exact category>",
      "demandGrowth": "<exact value from career data>",
      "difficulty": "<Low|Medium|High>",
      "description": "<2 sentences that are specific to THIS student — reference their actual dominant traits (${topTraits.slice(0,2).join(' and ')}) and why those map to this career>",
      "salaryRange": "<exact salary range from career data>",
      "growthLabel": "<Exceptional Growth|High Growth|Steady Growth>",
      "entrysalary": "<exact entry salary>",
      "seniorSalary": "<exact senior salary>",
      "growthPotential": "<High|Medium|Exceptional>"
    }
  ],
  "insight": "<4 sentences total: 1) What makes their trait combination rare or powerful. 2) What specific work environment they will thrive in. 3) One honest challenge or blind spot for this archetype. 4) One concrete action they can take THIS month to move forward.>"
}

Exactly 3 careers in the same order as the matches. Be specific — generic advice is useless. Use Indian market context throughout.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) throw new Error('API ' + res.status);
  const data = await res.json();
  const text = data.content.map(c => c.text || '').join('');
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

/* ============================
   LOCAL FALLBACK (no API needed)
   Still uses dynamic traits — never returns 72
============================ */
function buildFallback(traits, archetype, top3, roiScore, topTraits) {
  const t1 = topTraits[0] || 'creativity';
  const t2 = topTraits[1] || 'storytelling';
  return {
    score: roiScore,
    scoreLabel: getScoreLabel(roiScore),
    scoreTagline: `Your ${archetype.name} profile shows strong alignment with the 2030 creative economy — your ${t1} and ${t2} combination is exactly what the market is searching for.`,
    careers: top3.map((c, i) => ({
      ...c,
      description: i === 0
        ? `Your top traits — ${t1} and ${t2} — are the exact foundation this role is built on. As a ${archetype.name}, you naturally operate in the way this career demands, making your path here shorter than most.`
        : `Your ${t1} combined with ${c.category.toLowerCase()} sensibilities creates a strong secondary fit here. Many ${archetype.name} profiles find this role opens up after 2–3 years in their primary path.`
    })),
    insight: `You have a distinctive ${archetype.name} profile — your ${t1}, ${t2}, and ${topTraits[2] || 'strategic'} traits together create a combination the Indian creative market is actively short of. You'll thrive in environments that give you ${traits.independence > traits.collaboration ? 'ownership and creative autonomy' : 'a collaborative team with a strong brief'}. The honest challenge for your archetype is ${traits.experimentation > traits.structure ? 'following through — you generate great ideas but need systems to execute them consistently' : 'taking creative risks — your structured mind sometimes plays it too safe in creative decisions'}. This month: pick your top career match and find 3 people doing it on LinkedIn — send them one genuine message asking how they started.`
  };
}

/* ============================
   RENDER RESULTS
============================ */
function renderResults(data, userName, archetype, localROI) {
  const score = data.score || localROI;
  const label = data.scoreLabel || getScoreLabel(score);

  document.getElementById('score-display').textContent = score;
  document.getElementById('score-tagline').textContent = data.scoreTagline || '';

  // Inject archetype badge (once)
  const scoreSection = document.querySelector('.results-score-section');
  if (scoreSection && !document.getElementById('archetype-badge')) {
    const badge = document.createElement('div');
    badge.id = 'archetype-badge';
    badge.style.cssText = 'display:inline-flex;align-items:center;gap:10px;padding:10px 22px;background:rgba(255,168,0,0.08);border:1px solid rgba(255,168,0,0.25);border-radius:100px;font-size:0.82rem;font-weight:700;color:var(--yellow);letter-spacing:-0.01em;margin-bottom:20px;';
    badge.innerHTML = `<span style="font-size:1.1rem">${archetype.emoji}</span> Your Archetype: <strong style="margin-left:4px">${archetype.name}</strong>`;
    scoreSection.insertBefore(badge, scoreSection.querySelector('.results-score-title'));
  }

  // Score label under circle
  const labelEl = document.getElementById('score-label');
  if (labelEl) labelEl.textContent = label;

  const [best, ...others] = data.careers;

  // Best match
  document.getElementById('best-match-wrap').innerHTML = `
    <div class="career-best">
      <div class="best-badge">🏆 Best Match</div>
      <div class="career-best-grid">
        <div class="career-left">
          <div class="career-category-tag">${best.category}</div>
          <div class="career-title">${best.title}</div>
          <div class="career-growth-row">
            <div class="career-growth-pct">↗ ${best.demandGrowth}</div>
            <div class="career-difficulty difficulty-${(best.difficulty||'medium').toLowerCase()}">${best.difficulty} Difficulty</div>
          </div>
          <p class="career-description">${best.description}</p>
          <div class="career-salary-row">
            <div class="salary-chip"><span class="s-icon">₹</span> ${best.salaryRange}</div>
            <div class="salary-chip"><span class="s-icon">⚡</span> ${best.growthLabel}</div>
          </div>
        </div>
        <div class="career-right">
          <div class="quick-stats-head"><span class="qs-icon">◎</span> Quick Stats</div>
          <div class="stat-row"><span class="stat-label">Demand Growth</span><span class="stat-val green">${best.demandGrowth}</span></div>
          <div class="stat-row"><span class="stat-label">Entry Salary</span><span class="stat-val">${best.entrysalary}</span></div>
          <div class="stat-row"><span class="stat-label">Senior Salary</span><span class="stat-val">${best.seniorSalary}</span></div>
          <div class="stat-row"><span class="stat-label">Growth Potential</span><span class="stat-val yellow">${best.growthPotential}</span></div>
        </div>
      </div>
    </div>
  `;

  // Secondary cards
  document.getElementById('secondary-matches-wrap').innerHTML = others.map(c => `
    <div class="career-card-sm">
      <div class="career-category-tag">${c.category}</div>
      <div class="career-title" style="font-size:1.25rem;margin-bottom:8px;">${c.title}</div>
      <div class="career-growth-row">
        <div class="career-growth-pct">↗ ${c.demandGrowth}</div>
        <div class="career-difficulty difficulty-${(c.difficulty||'medium').toLowerCase()}">${c.difficulty} Difficulty</div>
      </div>
      <p class="career-description">${c.description}</p>
      <div class="career-salary-row">
        <div class="salary-chip"><span class="s-icon">₹</span> ${c.salaryRange}</div>
        <div class="salary-chip"><span class="s-icon">⚡</span> ${c.growthLabel}</div>
      </div>
    </div>
  `).join('');

  // AI insight
  if (data.insight) {
    document.getElementById('ai-insight-text').textContent = data.insight;
    document.getElementById('ai-insight-wrap').style.display = 'block';
  }
}

/* ============================
   SCORE CIRCLE ANIMATION
============================ */
function animateScore(score) {
  const circle = document.getElementById('score-circle');
  const numEl  = document.getElementById('score-display');
  const circ   = 2 * Math.PI * 80;

  setTimeout(() => {
    circle.style.strokeDasharray  = circ;
    circle.style.strokeDashoffset = circ - (score / 100) * circ;
  }, 200);

  const dur = 1800, t0 = performance.now();
  let cur = 0;
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    cur = Math.round((1 - Math.pow(1 - p, 3)) * score);
    numEl.textContent = cur;
    if (p < 1) requestAnimationFrame(tick);
  };
  setTimeout(() => requestAnimationFrame(tick), 200);
}

/* ============================
   LOADING STEPS ANIMATION
============================ */
function animateLoadingSteps() {
  ['ls-1','ls-2','ls-3','ls-4'].forEach((id, i) => {
    setTimeout(() => document.getElementById(id)?.classList.add('active'),    i * 700);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove('active'); el.classList.add('done'); }
    }, i * 700 + 600);
  });
}

/* ============================
   GOOGLE SHEETS STORAGE
============================ */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwzIY_gBhGZtTzIH_1a8AyZlcJZP4FWz863dH95SiDaADcV7qINHvJ3E_dNuIR0KlxHCA/exec';

async function saveToSheet(name, phone, traits, archetype, results) {
  if (!SHEET_URL) return;
  const payload = {
    timestamp:  new Date().toISOString(),
    name,
    phone,
    archetype,
    topCareer:  results.careers?.[0]?.title || '',
    score:      results.score || '',
    topTraits:  getTopTraits(traits, 3).join(', ')
  };
  await fetch(SHEET_URL, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload)
  });
}