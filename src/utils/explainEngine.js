const formatList = (values) => values.join(", ");

export const getExplanation = (recommendation, student) => {
  const rank = Number(student?.rank || 0);
  const careerGoal = student?.careerGoal?.trim();
  const explanations = [];

  if (rank) {
    if (rank <= recommendation.cutoffRank) {
      explanations.push(
        `Rank fit: your rank ${rank} is within the expected range for ${recommendation.branch} (recent cutoff around ${recommendation.cutoffRank}).`,
      );
    } else {
      explanations.push(
        `Rank outlook: your rank ${rank} is above the typical cutoff of ${recommendation.cutoffRank}, so this option is more competitive.`,
      );
    }
  } else {
    explanations.push(
      `Rank insight: add your rank to improve accuracy against the expected cutoff of ${recommendation.cutoffRank}.`,
    );
  }

  if (recommendation.interestMatches.length) {
    explanations.push(
      `Interest match: aligns with your interests in ${formatList(recommendation.interestMatches)}.`,
    );
  } else {
    explanations.push(
      `Interest balance: this branch stays relevant due to outcomes and career scope, even though the direct interest overlap is lower.`,
    );
  }

  explanations.push(
    `Placement signal: ${recommendation.placements}% placement support with ${recommendation.demandLevel.toLowerCase()} market demand.`,
  );

  if (careerGoal) {
    explanations.push(
      recommendation.goalMatches.length
        ? `Career alignment: supports your goal "${careerGoal}" through roles like ${formatList(recommendation.goalMatches.slice(0, 2))}.`
        : `Career flexibility: even if it is not the closest match to "${careerGoal}", it still offers adjacent career routes.`,
    );
  }

  if (recommendation.seatInfo) {
    explanations.push(
      `Seat context: ${recommendation.seatInfo.remaining} of ${recommendation.seatInfo.total} seats are currently available.`,
    );
  }

  return explanations;
};
export const getCareerScenarios = (branch) => {
  const scenarios = {
    CSE: [
      { type: "Best Case", outcome: "Tier-1 Product Company (FAANG)", salary: "24-40 LPA", roles: "Software Architect, AI Researcher" },
      { type: "Average Case", outcome: "MNC / FinTech Developer", salary: "12-18 LPA", roles: "Full Stack Dev, Backend Engineer" },
      { type: "Worst Case", outcome: "Service-based Support Role", salary: "4-6 LPA", roles: "System Analyst, QA Engineer" }
    ],
    IT: [
      { type: "Best Case", outcome: "Cloud Infrastructure Lead", salary: "20-35 LPA", roles: "DevOps Architect, Solutions Lead" },
      { type: "Average Case", outcome: "System / Web Developer", salary: "10-15 LPA", roles: "Cloud Engineer, Frontend Dev" },
      { type: "Worst Case", outcome: "IT Support / Maintenance", salary: "3.5-5 LPA", roles: "Desktop Support, IT Technician" }
    ],
    ECE: [
      { type: "Best Case", outcome: "Core Chip Design (Intel/Nvidia)", salary: "18-30 LPA", roles: "VLSI Design, Embedded Lead" },
      { type: "Average Case", outcome: "Telecom / IoT Systems", salary: "8-14 LPA", roles: "Firmware Dev, Network Engineer" },
      { type: "Worst Case", outcome: "Hardware Maintenance", salary: "3-5 LPA", roles: "PCB Technician, Service Engineer" }
    ],
    ME: [
      { type: "Best Case", outcome: "R&D at Automotive/Space MNC", salary: "15-25 LPA", roles: "Design Lead, Robotics Engineer" },
      { type: "Average Case", outcome: "Production / Operations Management", salary: "7-12 LPA", roles: "Manufacturing Eng, Quality Lead" },
      { type: "Worst Case", outcome: "Plant Supervision", salary: "3-4.5 LPA", roles: "Floor Supervisor, Maintenance Eng" }
    ]
  };
  return scenarios[branch] || [];
};
