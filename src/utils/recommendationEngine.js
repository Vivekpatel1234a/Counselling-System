export const BRANCH_PROFILES = {
  CSE: {
    title: "Computer Science Engineering",
    cutoffRank: 1200,
    placements: 95,
    demandLevel: "Very High",
    interests: ["software engineering", "artificial intelligence", "data science", "machine learning", "cyber security"],
    careers: [
      "software engineer",
      "data scientist",
      "ai engineer",
      "full stack developer",
      "product engineer",
    ],
    summary:
      "Best fit for students aiming for software, AI, product development, and high-growth tech roles.",
  },
  IT: {
    title: "Information Technology",
    cutoffRank: 2200,
    placements: 90,
    demandLevel: "High",
    interests: ["information technology", "software engineering", "cyber security", "data science"],
    careers: [
      "web developer",
      "cloud engineer",
      "it specialist",
      "devops engineer",
      "software engineer",
    ],
    summary:
      "Strong option for software systems, cloud operations, web platforms, and enterprise technology roles.",
  },
  ECE: {
    title: "Electronics and Communication Engineering",
    cutoffRank: 3200,
    placements: 84,
    demandLevel: "Moderate",
    interests: ["electronics", "communications", "embedded systems", "robotics"],
    careers: [
      "embedded engineer",
      "telecom engineer",
      "vlsi engineer",
      "electronics engineer",
      "iot engineer",
    ],
    summary:
      "Good blend of core engineering and modern embedded systems, telecom, and chip-design pathways.",
  },
  ME: {
    title: "Mechanical Engineering",
    cutoffRank: 4800,
    placements: 78,
    demandLevel: "Stable",
    interests: ["mechanical systems", "robotics", "automation", "energy systems"],
    careers: [
      "design engineer",
      "manufacturing engineer",
      "automotive engineer",
      "operations engineer",
      "mechanical engineer",
    ],
    summary:
      "Well suited for students interested in design, manufacturing, production systems, and industrial engineering.",
  },
  CIVIL: {
    title: "Civil Engineering",
    cutoffRank: 5500,
    placements: 75,
    demandLevel: "Stable",
    interests: ["structural design", "mechanical systems", "energy systems"],
    careers: ["structural engineer", "civil engineer", "urban planner", "construction manager", "environmental engineer"],
    summary: "Ideal for students passionate about infrastructure, large-scale construction, and sustainable development."
  },
  CHE: {
    title: "Chemical Engineering",
    cutoffRank: 6000,
    placements: 80,
    demandLevel: "Moderate",
    interests: ["nanotechnology", "energy systems", "data science"],
    careers: ["process engineer", "chemical engineer", "materials scientist", "energy manager", "biotechnologist"],
    summary: "Perfect for students interested in process industries, materials science, and energy sectors."
  },
  AE: {
    title: "Aerospace Engineering",
    cutoffRank: 3500,
    placements: 85,
    demandLevel: "High",
    interests: ["mechanical systems", "robotics", "automation", "embedded systems"],
    careers: ["aerospace engineer", "aeronautical engineer", "systems engineer", "flight test engineer", "propulsion engineer"],
    summary: "Designed for students fascinated by aviation, space exploration, and advanced aerodynamics."
  },
  BT: {
    title: "Biotechnology",
    cutoffRank: 6500,
    placements: 70,
    demandLevel: "Growing",
    interests: ["nanotechnology", "data science", "artificial intelligence"],
    careers: ["biotechnologist", "research scientist", "clinical researcher", "pharmacologist", "bioinformatics specialist"],
    summary: "Best for students combining engineering principles with biology for healthcare and research innovation."
  },
  CSDS: {
    title: "Computer Science and Data Science",
    cutoffRank: 1500,
    placements: 92,
    demandLevel: "Very High",
    interests: ["data science", "artificial intelligence", "machine learning", "software engineering"],
    careers: ["data scientist", "machine learning engineer", "data analyst", "software engineer", "ai researcher"],
    summary: "Best fit for students passionate about large scale data, analytics, and building intelligent predictive models."
  },
  CSAI: {
    title: "Computer Science and Artificial Intelligence",
    cutoffRank: 1300,
    placements: 94,
    demandLevel: "Very High",
    interests: ["artificial intelligence", "machine learning", "software engineering", "robotics", "automation"],
    careers: ["ai engineer", "machine learning engineer", "robotics engineer", "software engineer", "research scientist"],
    summary: "A cutting-edge branch focusing exclusively on deep learning, neural networks, and automated intelligent systems."
  }
};

const normalize = (value) => String(value || "").trim().toLowerCase();

const getGoalKeywords = (careerGoal) =>
  normalize(careerGoal)
    .split(/[^a-z]+/)
    .filter(Boolean);

const getLikelihoodLabel = (rank, cutoffRank) => {
  if (!rank) return "Moderate";
  if (rank <= cutoffRank) return "Safe";
  if (rank <= cutoffRank + 900) return "Moderate";
  return "Risky";
};

const getRankScore = (rank, cutoffRank) => {
  if (!rank) return 8;
  if (rank <= cutoffRank) return 38;
  if (rank <= cutoffRank + 500) return 28;
  if (rank <= cutoffRank + 1200) return 16;
  return 6;
};

const getInterestScore = (studentInterests, branchInterests) => {
  if (!studentInterests?.length) {
    return { score: 8, matches: [] };
  }

  const matches = branchInterests.filter((interest) =>
    studentInterests.some((studentInterest) => normalize(studentInterest) === interest),
  );

  return {
    score: Math.min(matches.length * 12, 30),
    matches,
  };
};

const getGoalScore = (careerGoal, careers) => {
  const keywords = getGoalKeywords(careerGoal);

  if (!keywords.length) {
    return { score: 6, matches: [] };
  }

  const matches = careers.filter((career) =>
    keywords.some((keyword) => career.includes(keyword)),
  );

  return {
    score: matches.length ? 22 : 8,
    matches,
  };
};

const getSeatScore = (branchState) => {
  if (!branchState) return 8;
  if (branchState.remaining >= Math.ceil(branchState.total / 2)) return 12;
  if (branchState.remaining > 0) return 8;
  return 2;
};

export const getRecommendations = (student, branches = {}) => {
  const rank = Number(student?.rank || 0);
  const interests = student?.interests || [];
  const careerGoal = student?.careerGoal || "";

  return Object.entries(BRANCH_PROFILES)
    .filter(([branch]) => Object.hasOwn(branches, branch))
    .map(([branch, profile]) => {
      const interestFit = getInterestScore(interests, profile.interests);
      const goalFit = getGoalScore(careerGoal, profile.careers);
      const rankScore = getRankScore(rank, profile.cutoffRank);
      const placementScore = Math.round(profile.placements / 5);
      const seatScore = getSeatScore(branches[branch]);
      const score = Math.min(
        99,
        rankScore + interestFit.score + goalFit.score + placementScore + seatScore,
      );

      return {
        branch,
        score,
        title: profile.title,
        summary: profile.summary,
        cutoffRank: profile.cutoffRank,
        placements: profile.placements,
        demandLevel: profile.demandLevel,
        branchInterests: profile.interests,
        careers: profile.careers,
        interestMatches: interestFit.matches,
        goalMatches: goalFit.matches,
        seatInfo: branches[branch] || null,
        likelihood: getLikelihoodLabel(rank, profile.cutoffRank),
        rankDelta: profile.cutoffRank - rank,
      };
    })
    .sort((a, b) => b.score - a.score);
};
