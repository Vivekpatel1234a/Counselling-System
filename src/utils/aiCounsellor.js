import { getRecommendations, BRANCH_PROFILES } from "./recommendationEngine";

// ── Rich local knowledge base ──────────────────────────────────────────────
const KB = {
  // BRANCH INFO
  cse: {
    match: ["cse", "computer science", "cs", "computer engineering", "programming"],
    answer: (s) => `**Computer Science Engineering (CSE)** 💻

CSE is among the highest-demand branches in India, focusing on software development, algorithms, databases, and intelligent systems.

**Key Highlights:**
- Placement rate: ~95% | Avg package: ₹6–14 LPA
- Top recruiters: TCS, Infosys, Google, Microsoft, Amazon
- Cutoff rank at Rank2Campus: ~1200

**Career Paths:** Software Engineer, Full-Stack Developer, Data Scientist, AI Engineer, Product Manager

**Is it right for you?** ${s?.rank ? (Number(s.rank) <= 1200 ? "✅ Your rank **" + s.rank + "** puts you in a safe position for CSE!" : "⚠️ Your rank **" + s.rank + "** is above the usual cutoff. Consider IT or CSDS as close alternatives.") : "Share your rank to get a personalized assessment."}`,
  },
  it: {
    match: ["it", "information technology", "cloud", "networking", "devops"],
    answer: (s) => `**Information Technology (IT)** 🌐

IT focuses on software systems, cloud infrastructure, networking, and enterprise solutions. It's closely related to CSE but has a slightly broader industry scope.

**Key Highlights:**
- Placement rate: ~90% | Avg package: ₹5–12 LPA
- Top recruiters: Wipro, HCL, Accenture, Capgemini, IBM
- Cutoff rank at Rank2Campus: ~2200

**Career Paths:** Cloud Engineer, DevOps Engineer, Web Developer, IT Consultant, Cybersecurity Analyst

**Is it right for you?** ${s?.rank ? (Number(s.rank) <= 2200 ? "✅ Your rank **" + s.rank + "** comfortably qualifies for IT." : "⚠️ Your rank is above the IT cutoff. ECE or ME may be more accessible.") : "Add your rank to get a personalized fit analysis."}`,
  },
  ece: {
    match: ["ece", "electronics", "communication", "embedded", "vlsi", "iot", "circuit"],
    answer: (s) => `**Electronics & Communication Engineering (ECE)** ⚡

ECE covers electronics, signal processing, communication systems, embedded hardware, and IoT. It bridges hardware and software worlds.

**Key Highlights:**
- Placement rate: ~84% | Avg package: ₹4–10 LPA
- Top recruiters: Samsung, Qualcomm, ISRO, DRDO, Intel, Nokia
- Cutoff rank at Rank2Campus: ~3200

**Career Paths:** Embedded Engineer, VLSI Designer, IoT Developer, Telecom Engineer, Robotics Engineer

**Is it right for you?** ${s?.rank ? "Your rank **" + s.rank + "** " + (Number(s.rank) <= 3200 ? "✅ safely qualifies for ECE!" : "⚠️ is above the ECE cutoff. ME or Civil may be safer options.") : "Share your rank for a personalized match."}`,
  },
  me: {
    match: ["me", "mechanical", "manufacturing", "automobile", "automotive", "thermal", "production"],
    answer: () => `**Mechanical Engineering (ME)** ⚙️

One of the oldest and most versatile branches, Mechanical Engineering covers design, thermodynamics, manufacturing, robotics, and automation.

**Key Highlights:**
- Placement rate: ~78% | Avg package: ₹3.5–8 LPA
- Top recruiters: Tata Motors, L&T, Mahindra, BHEL, HAL
- Cutoff rank at Rank2Campus: ~4800

**Career Paths:** Design Engineer, Manufacturing Engineer, Automotive Engineer, Operations Manager, R&D Engineer

**Industry Trend:** Growing in aerospace, electric vehicles, and industrial automation sectors.`,
  },
  civil: {
    match: ["civil", "construction", "structural", "infrastructure", "urban planning"],
    answer: () => `**Civil Engineering** 🏗️

Civil Engineering focuses on designing and building infrastructure — roads, bridges, dams, buildings, and urban systems.

**Key Highlights:**
- Placement rate: ~75% | Avg package: ₹3–7 LPA
- Top recruiters: L&T Construction, NHAI, CPWD, Shapoorji, DLF
- Cutoff rank at Rank2Campus: ~5500

**Career Paths:** Structural Engineer, Urban Planner, Construction Manager, Environmental Engineer, Government Services (UPSC)

**Government Opportunity:** Civil Engineering has very strong pathways into PSUs and government exams like GATE and IES.`,
  },
  csai: {
    match: ["csai", "artificial intelligence", "ai", "machine learning", "ml", "deep learning", "neural"],
    answer: (s) => `**CS with Artificial Intelligence (CSAI)** 🤖

CSAI is the most cutting-edge branch, exclusively focused on AI, deep learning, neural networks, NLP, and intelligent systems.

**Key Highlights:**
- Placement rate: ~94% | Avg package: ₹8–18 LPA
- Top recruiters: Google DeepMind, OpenAI, Meta AI, Microsoft Azure, NVIDIA
- Cutoff rank at Rank2Campus: ~1300

**Career Paths:** AI Engineer, ML Researcher, Computer Vision Engineer, NLP Engineer, Data Scientist

**Is it right for you?** ${s?.rank ? (Number(s.rank) <= 1300 ? "✅ Excellent! Your rank **" + s.rank + "** qualifies. This is highly recommended if you love AI." : "⚠️ Your rank **" + s.rank + "** is above the CSAI cutoff. Consider CSDS or CSE as strong alternatives.") : "Share your rank to find out if CSAI is within reach."}`,
  },
  csds: {
    match: ["csds", "data science", "data analytics", "big data", "statistics", "python analytics"],
    answer: () => `**CS with Data Science (CSDS)** 📊

CSDS combines computer science with statistics, analytics, and machine learning to handle large-scale data systems.

**Key Highlights:**
- Placement rate: ~92% | Avg package: ₹7–16 LPA
- Top recruiters: Flipkart, Swiggy, Zomato, JP Morgan, Goldman Sachs
- Cutoff rank at Rank2Campus: ~1500

**Career Paths:** Data Scientist, ML Engineer, Data Analyst, Business Intelligence Developer, Quantitative Analyst`,
  },

  // EXAMS
  jee: {
    match: ["jee", "jee mains", "jee advanced", "jee preparation", "nta", "jee score", "jee rank"],
    answer: () => `**JEE (Joint Entrance Examination)** 📝

JEE is India's premier engineering entrance exam conducted by NTA.

**Types:**
- **JEE Mains** – Gateway to NITs, IIITs, CFTIs, and state colleges. Held 2 times/year (Jan & Apr).
- **JEE Advanced** – Gateway to IITs. Only top 2.5 lakh JEE Mains qualifiers can appear.

**Marking Scheme (Mains):**
- MCQ: +4 correct, -1 wrong
- Numerical: +4 correct, 0 wrong

**Sections:** Physics, Chemistry, Mathematics (30Q each, 90 total)

**Key Tips:**
1. Prioritize NCERT for Chemistry
2. Practice past 10-year papers
3. Focus on speed + accuracy for Mains
4. For Advanced, depth over breadth is key`,
  },
  gate: {
    match: ["gate", "gate exam", "gate preparation", "psu", "m.tech", "mtech"],
    answer: () => `**GATE (Graduate Aptitude Test in Engineering)** 🎓

GATE is conducted by IITs for admission to M.Tech programs and PSU recruitment.

**Why appear for GATE?**
- Admission to IITs, NITs, IISc for M.Tech/M.S.
- PSU recruitment: BHEL, ONGC, IOCL, NTPC, SAIL (salary: ₹8–14 LPA)
- Research scholarships (CSIR, DRDO)

**Syllabus Tip:** Focus on core subjects (70%) + Engineering Mathematics + Aptitude (30%)

**Scoring:** Marks normalized, score valid for 3 years. Cutoff varies by branch (~25–55 marks).`,
  },
  bitsat: {
    match: ["bitsat", "bits", "bits pilani", "bits hyderabad"],
    answer: () => `**BITSAT (BITS Admission Test)** 🏛️

Conducted by BITS Pilani for admissions to its 3 campuses: Pilani, Goa, Hyderabad.

**Key Facts:**
- Online computer-based test (3 hours)
- 150 questions: Physics (40), Chemistry (40), Maths (45), English & LR (25)
- No negative marking for bonus questions
- Score range: Typically 300+ for CS at Pilani

**Why BITS?** Excellent industry connections, practice school program, flexible dual degrees, and a very strong alumni network.`,
  },

  // CAREER PATHS
  software: {
    match: ["software engineer", "software developer", "how to become developer", "coding career", "programming career"],
    answer: () => `**Career Path: Software Engineer** 💻

**Roadmap:**
1. **B.Tech (CSE/IT/CSDS)** → Core programming skills
2. **Internships** → Hands-on real-world projects
3. **DSA Mastery** → LeetCode, Codeforces for placements
4. **Specialization** → Frontend, Backend, Full Stack, DevOps, or Cloud

**Skills to build:**
- Languages: C++, Java, Python, JavaScript
- Frameworks: React, Node.js, Django, Spring Boot
- Tools: Git, Docker, AWS/GCP

**Salary Range (India):**
- Fresher: ₹4–12 LPA
- 3–5 years: ₹15–35 LPA
- Senior/FAANG: ₹40–1 Cr+`,
  },
  data_scientist: {
    match: ["data scientist", "data analyst", "become data scientist", "data career"],
    answer: () => `**Career Path: Data Scientist / Data Analyst** 📊

**Roadmap:**
1. **Strong Maths & Stats foundation** (Linear Algebra, Probability, Statistics)
2. **Python or R** for data manipulation
3. **Machine Learning** concepts (Scikit-learn, TensorFlow, PyTorch)
4. **SQL** for data querying
5. **Visualization** (Tableau, Power BI, Matplotlib)

**Core Skills:**
- EDA (Exploratory Data Analysis)
- Feature Engineering
- Model Building & Evaluation
- Business Communication

**Salary Range (India):**
- Fresher: ₹5–10 LPA
- 3+ years: ₹15–30 LPA
- Senior DS (Product companies): ₹40–70 LPA`,
  },
  govt: {
    match: ["government job", "ssc", "upsc", "psc", "ias", "civil services", "public sector"],
    answer: () => `**Government & Civil Services Path for Engineers** 🏛️

Engineering graduates have strong government job avenues:

**1. GATE → PSU Jobs**
- BHEL, ONGC, IOCL, NTPC, SAIL, etc.
- Salary: ₹8–14 LPA + perks

**2. UPSC (IAS/IES)**
- Indian Engineering Services (IES) – technical roles in railways, defence, PWD
- IAS – administration (open to all graduates)

**3. SSC JE (Junior Engineer)**
- For Civil, Mechanical, Electrical engineers
- Central/state government departments

**4. State PSC / PWD / DRDO / ISRO**
- Great work-life balance and job security`,
  },
  mba: {
    match: ["mba", "management", "cat", "iim", "business school", "after engineering mba"],
    answer: () => `**Engineering → MBA Path** 🎯

Many engineers choose MBA (especially IIMs) for a transition into management, consulting, or finance.

**Entrance Exams:**
- **CAT** – IIMs and top B-schools
- **XAT** – XLRI, Xavier schools
- **GMAT** – International MBAs

**Why Engineers do well in MBA:**
- Strong analytical and quantitative base
- Logical problem-solving mindset

**Top Roles post-Engineering + MBA:**
- Management Consultant (McKinsey, BCG, Bain)
- Product Manager (Google, Amazon, Flipkart)
- Investment Banker
- Startup Founder

**Avg salary (IIM A/B/C):** ₹25–50 LPA`,
  },

  // COUNSELLING SPECIFIC
  preference: {
    match: ["preference", "choice filling", "how to fill preferences", "order preferences", "which order"],
    answer: (s, recs) => {
      const top3 = recs?.slice(0, 3).map((r, i) => `${i + 1}. **${r.branch}** (${r.title}) — Score: ${r.score}/100 | ${r.likelihood}`).join("\n");
      return `**How to Fill Your Preferences Wisely** 📋

A smart preference order balances ambition with safety:

**Golden Rule: 1 Reach + 2 Moderate + 1–2 Safe**

${top3 ? `**Your AI-recommended order based on your profile:**\n${top3}\n` : ""}
**Tips:**
- Always keep at least 1 branch where your rank is comfortably below the cutoff
- Don't put all high-competition branches at the top
- Research placement stats before finalizing
- Use the **Recommendations** section on your dashboard for live analysis`;
    },
  },
  rank: {
    match: ["rank", "my rank", "cutoff", "what rank", "rank needed", "which rank"],
    answer: (s, recs) => {
      if (!s?.rank) return `**Rank & Cutoff Guide** 📈\n\nYou haven't shared your rank yet. Please update it in your profile to get personalized cutoff analysis.\n\n**General Cutoffs at Rank2Campus:**\n- CSE/CSAI: Rank ≤ 1300\n- IT/CSDS: Rank ≤ 2200\n- ECE: Rank ≤ 3200\n- ME: Rank ≤ 4800\n- Civil: Rank ≤ 5500`;
      const safe = recs?.filter(r => r.likelihood === "Safe").map(r => r.branch).join(", ") || "None identified";
      const moderate = recs?.filter(r => r.likelihood === "Moderate").map(r => r.branch).join(", ") || "None identified";
      return `**Rank Analysis for Rank ${s.rank}** 📈\n\n✅ **Safe options:** ${safe}\n⚡ **Moderate options:** ${moderate}\n\nYour rank puts you in a strong position for the safe branches listed above. Keep at least one safe branch in your preferences!`;
    },
  },
  allocation: {
    match: ["allocated", "seat allocated", "got seat", "result out", "allotted", "allocation result"],
    answer: (s) => {
      if (s?.allocated && s.allocated !== "Not Allocated") {
        return `🎉 **Congratulations!** You have been allocated **${s.allocated}**.\n\nYour rank and preference order were strong enough to secure a seat before it closed. Make sure to complete the document verification process and report to the institution on time.`;
      }
      return `**Seat Allocation Status** ℹ️\n\nYou have **not yet been allocated** a seat. Here's what you can do:\n\n1. **Review your preferences** – Add more balanced branches\n2. **Check seat availability** – Some branches may still have remaining seats\n3. **Verify your documents** – Incomplete verification can delay allocation\n4. **Contact admin** – Reach out to the admin panel for manual review`;
    },
  },
  lock: {
    match: ["lock", "lock preferences", "can i change", "locked", "how to lock", "final submission"],
    answer: (s) => `**Locking Your Preferences** 🔒\n\n${s?.status === "Locked" ? "✅ Your preferences are **already locked**. No further changes can be made.\n\nYour submission is final and will be considered for the next allocation round." : "Your preferences are **not yet locked**.\n\n**Before you lock:**\n- Double-check your preference order\n- Ensure at least 1 safe branch is included\n- Verify your documents are uploaded and approved\n\n⚠️ **Warning:** Once locked, preferences **cannot be changed**. Lock only when you're fully confident in your choices."}`,
  },
  document: {
    match: ["document", "marksheet", "upload", "verify", "class 12", "12th marks", "jee scorecard", "percentage"],
    answer: () => `**Document Verification Guide** 📄\n\n**Required Documents:**\n1. **Class 12th Marksheet** – Official board marksheet with subject-wise marks\n2. **JEE Scorecard** – Official NTA scorecard with percentile\n\n**Verification Process:**\n1. Upload your document (JPEG, PNG, or PDF)\n2. Our AI engine scans and extracts your marks automatically\n3. System verifies the document type and authenticity\n4. Once approved, you can proceed to lock your preferences\n\n**Important:** Only original, unedited documents will be accepted. Migration certificates or other documents will be rejected.`,
  },

  // GENERAL EDUCATION
  study_tips: {
    match: ["study tips", "how to study", "study technique", "study method", "pomodoro", "how to prepare"],
    answer: () => `**Proven Study Techniques for Engineering Students** 📚\n\n**1. Pomodoro Technique**\n- 25 min focused study → 5 min break\n- After 4 cycles → 15–30 min long break\n\n**2. Active Recall**\n- Close the book and try to recall what you read\n- Use flashcards (Anki) for formulas and concepts\n\n**3. Spaced Repetition**\n- Revise after 1 day → 3 days → 1 week → 1 month\n\n**4. Feynman Technique**\n- Explain the concept as if teaching a 10-year-old\n- Gaps in explanation = gaps in understanding\n\n**5. Practice > Reading**\n- For Maths/Physics: solve problems daily\n- 1 hour solving > 3 hours passive reading`,
  },
  salary: {
    match: ["salary", "package", "ctc", "how much earn", "highest package", "average salary"],
    answer: () => `**Engineering Salary Guide (India 2024)** 💰\n\n| Branch | Fresher Avg | 5-Year Exp | Top Package |\n|--------|------------|------------|-------------|\n| CSE/CSAI | ₹6–14 LPA | ₹20–40 LPA | ₹1 Cr+ |\n| CSDS | ₹7–16 LPA | ₹25–45 LPA | ₹80 L+ |\n| IT | ₹5–12 LPA | ₹15–30 LPA | ₹60 L+ |\n| ECE | ₹4–10 LPA | ₹12–25 LPA | ₹40 L+ |\n| ME | ₹3.5–8 LPA | ₹8–18 LPA | ₹25 L+ |\n| Civil | ₹3–7 LPA | ₹7–15 LPA | ₹20 L+ |\n\n**Top paying companies in India:** Google, Microsoft, Goldman Sachs, Uber, Flipkart, DE Shaw`,
  },
  placement: {
    match: ["placement", "campus recruitment", "placement preparation", "how to get placed", "job offer"],
    answer: () => `**Campus Placement Preparation Guide** 🎯\n\n**Phase 1: Technical Foundation (6 months before)**\n- Master Data Structures & Algorithms (LeetCode 200+ problems)\n- Learn System Design basics\n- Build 2–3 strong projects on GitHub\n\n**Phase 2: Company-specific Prep (3 months before)**\n- Research company culture and past interview questions\n- Practice aptitude tests (Quant, Verbal, Logical)\n- Mock GD/PI sessions\n\n**Phase 3: Placement Season**\n- Keep resume crisp (1 page, ATS-friendly)\n- Apply for internships (convert to PPOs)\n- Network through LinkedIn with alumni\n\n**Dream company tip:** Top product companies (FAANG) require 6–12 months of dedicated DSA preparation.`,
  },
};

// ── Intent matcher ─────────────────────────────────────────────────────────
const detectIntent = (message) => {
  const q = message.toLowerCase();
  for (const [, kb] of Object.entries(KB)) {
    if (kb.match.some((kw) => q.includes(kw))) return kb;
  }
  return null;
};

// ── Greeting detector ──────────────────────────────────────────────────────
const isGreeting = (msg) =>
  /^(hi|hello|hey|good morning|good evening|good afternoon|namaste|hii|helo)\b/i.test(msg.trim());

// ── Fallback with smart recommendations ───────────────────────────────────
const buildSmartFallback = (message, student, branches) => {
  const recommendations = getRecommendations(student || {}, branches);
  const top = recommendations[0];
  const second = recommendations[1];
  const q = message.toLowerCase();

  // Off-topic guard
  const offTopicWords = ["recipe", "cook", "movie", "cricket", "sport", "song", "music", "game", "girlfriend", "boyfriend", "love", "weather", "news", "politics"];
  if (offTopicWords.some((w) => q.includes(w))) {
    return `I'm your **Education & Counselling Advisor** 🎓 — I can only help with questions related to:\n- Engineering branches & careers\n- Exams (JEE, GATE, BITSAT)\n- Placement preparation\n- Study strategies\n- College preferences & allocation\n\nWhat would you like to know?`;
  }

  if (top) {
    return `Based on your profile, here's a quick insight:\n\n**Top match for you:** ${top.branch} — ${top.title}\n📊 Fit Score: **${top.score}/100** | Likelihood: **${top.likelihood}**\n\n${second ? `**Second option:** ${second.branch} (Score: ${second.score}/100)` : ""}\n\nYou can ask me about:\n- Any specific branch (CSE, ECE, ME, etc.)\n- Career paths (software engineer, data scientist, MBA)\n- Exams (JEE, GATE, BITSAT)\n- Placement & salary guide\n- How to fill preferences\n- Document verification`;
  }

  return `I'm your **Education & Counselling Advisor** 🎓\n\nYou can ask me about:\n- Engineering branches (CSE, IT, ECE, ME, Civil, CSAI, CSDS)\n- Career paths (software, data science, government jobs, MBA)\n- Exams (JEE Mains, JEE Advanced, GATE, BITSAT)\n- Placement preparation & salary expectations\n- Study tips and techniques\n- Your preference order and seat allocation\n\nWhat would you like to explore?`;
};

// ── Main export ────────────────────────────────────────────────────────────
export const getCounsellorReply = async ({ message, student, branches }) => {
  const recommendations = getRecommendations(student || {}, branches);

  // Greeting
  if (isGreeting(message)) {
    const name = student?.name || "there";
    return `**Hello, ${name}!** 👋\n\nI'm your **AI Education Advisor** at Rank2Campus. I'm trained to help you with:\n\n🎓 **Branch Guidance** — CSE, IT, ECE, ME, CSAI, CSDS & more\n📝 **Exam Prep** — JEE, GATE, BITSAT strategies\n💼 **Career Paths** — Software, Data Science, Government, MBA\n📋 **Counselling** — Preferences, rank analysis, allocation\n\nWhat can I help you with today?`;
  }

  // Knowledge base match
  const intent = detectIntent(message);
  if (intent) {
    const answer = intent.answer(student, recommendations);
    return typeof answer === "string" ? answer : buildSmartFallback(message, student, branches);
  }

  // Smart fallback
  return buildSmartFallback(message, student, branches);
};
