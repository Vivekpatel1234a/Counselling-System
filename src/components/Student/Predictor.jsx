import { useState } from "react";
import { 
  Psychology as PsychologyIcon,
  Groups as AlumniIcon,
  WorkHistory as HistoryIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { getRecommendations } from "../../utils/recommendationEngine";

const interestOptions = [
  "Information Technology", "Artificial Intelligence", "Software Engineering", "Data Science", "Machine Learning",
  "Cyber Security", "Electronics", "Communications", "Robotics", "Automation",
  "Mechanical Systems", "Structural Design", "Energy Systems", "Nanotechnology", "Embedded Systems",
];

const alumniDatabase = {
  CSE: [
    { name: "Rahul S.", rank: "1200 - 1800", outcome: "Google (28 LPA)", role: "Software Engineer", message: "My rank of 1500 was perfect for CSE; the core algorithms I learned are now my daily tools." },
    { name: "Megha P.", rank: "800 - 1200", outcome: "Microsoft (32 LPA)", role: "AI Specialist", message: "Rank 800 gave me top-tier CSE placement. Focus on data structures from day one!" }
  ],
  IT: [
    { name: "Ishita G.", rank: "2500 - 3000", outcome: "Amazon (22 LPA)", role: "Cloud Architect", message: "Don't underestimate IT. At Rank 2800, it was my best decision for cloud-native roles." },
    { name: "Aman R.", rank: "3000 - 4000", outcome: "Salesforce (18 LPA)", role: "Backend Lead", message: "With Rank 3500, IT offered the same tech stack as CSE with better focus on systems." }
  ],
  ECE: [
    { name: "Amit V.", rank: "4000 - 4500", outcome: "NVIDIA (19 LPA)", role: "VLSI Design", message: "Rank 4200 allowed me to enter ECE, which is the heart of the current hardware boom." },
    { name: "Sneha K.", rank: "4500 - 5500", outcome: "Qualcomm (16 LPA)", role: "Firmware Eng.", message: "At Rank 5000, ECE provided the hardware-software bridge I needed for telecom." }
  ],
  ME: [
    { name: "Sanya M.", rank: "5000 - 6000", outcome: "Tesla (25 LPA)", role: "R&D Lead", message: "Mechanical at Rank 5500 was my gateway to robotics. Merit doesn't define your ceiling!" },
    { name: "Rohit B.", rank: "6000 - 8000", outcome: "L&T Defense (12 LPA)", role: "Plant Head", message: "Rank 7000 in ME led me to core operations where I now manage 200+ engineers." }
  ],
  CIVIL: [
    { name: "Vikram T.", rank: "5500 - 6500", outcome: "L&T Construction (14 LPA)", role: "Structural Engineer", message: "Civil allowed me to work on city-scale infrastructure. The demand for modern planning is huge." },
    { name: "Anjali S.", rank: "6000 - 7500", outcome: "Afcons (12 LPA)", role: "Site Engineer", message: "At rank 6500, Civil was my best choice. Field experience here translates to massive growth." }
  ],
  CSDS: [
    { name: "Karan M.", rank: "1000 - 1500", outcome: "Amazon (25 LPA)", role: "Data Scientist", message: "Rank 1400 got me into CSDS. The heavy math focus directly helped me crack top ML interviews." },
    { name: "Priya R.", rank: "1500 - 2000", outcome: "Fractal Analytics (18 LPA)", role: "Data Analyst", message: "CSDS is the fastest-growing branch. My predictive modeling projects landed me this role." }
  ],
  CSAI: [
    { name: "Neha W.", rank: "800 - 1300", outcome: "OpenAI (40 LPA)", role: "AI Researcher", message: "CSAI is intense but worth it. Deep learning fundamentals here are world-class." },
    { name: "Rishabh K.", rank: "1200 - 1800", outcome: "NVIDIA (22 LPA)", role: "ML Engineer", message: "Rank 1500 secured my CSAI seat. Robotics and automation labs gave me a huge edge." }
  ]
};

const likelihoodConfig = {
  Safe:     { badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", dot: "bg-emerald-500" },
  Moderate: { badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",         dot: "bg-blue-500"    },
  Risky:    { badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",         dot: "bg-rose-500"    },
};

function Predictor({ branches }) {
  const [localRank, setLocalRank] = useState("");
  const [localInterests, setLocalInterests] = useState([]);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const toggleInterest = (interest) => {
    setLocalInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSearch = () => {
    if (!localRank) return;
    setIsSearching(true);
    setTimeout(() => {
      const studentProfile = { rank: Number(localRank), interests: localInterests, careerGoal: "" };
      const recommendations = getRecommendations(studentProfile, branches);
      setResults(recommendations.slice(0, 4));
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in w-full overflow-hidden pb-20">
      <section className="glass-card rounded-2xl p-7">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-7">
          <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400">
            <SearchIcon sx={{ fontSize: 20 }} />
          </div>
          <div>
            <h3 className="text-lg font-black text-primary tracking-tight font-['Outfit']">Career Path Discovery</h3>
            <p className="text-xs text-muted font-medium mt-0.5">Input your profile to discover matching branch trajectories.</p>
          </div>
        </div>

        {/* Input Panel */}
        <div className="rounded-xl border border-subtle p-6 mb-7 shadow-card bg-surface-2">
          <div className="flex flex-col lg:flex-row items-end gap-6">
            {/* Rank Input */}
            <div className="flex-1 w-full space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                <PersonIcon sx={{ fontSize: 13 }} /> Merit Rank
              </label>
              <input
                type="number"
                value={localRank}
                onChange={(e) => setLocalRank(e.target.value)}
                placeholder="Enter your rank"
                className="w-full rounded-xl py-3 px-4 font-medium text-primary outline-none transition-colors border border-subtle focus:border-blue-600/60 placeholder:text-muted text-sm bg-surface-3"
              />
            </div>

            {/* Interests */}
            <div className="flex-[2] w-full space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                <StarIcon sx={{ fontSize: 13 }} /> Interests
              </label>
              <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                      localInterests.includes(interest)
                        ? "bg-blue-600 text-white border border-blue-500"
                        : "bg-surface-3 text-muted border border-subtle hover:border-blue-500/20 hover:text-primary"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-auto shrink-0">
              <button
                onClick={handleSearch}
                disabled={!localRank || isSearching}
                className="w-full lg:w-auto px-7 py-3 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center gap-2.5 hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSearching ? <CircularProgress size={16} color="inherit" thickness={6} /> : <CheckCircleIcon sx={{ fontSize: 18 }} />}
                <span className="uppercase tracking-widest text-[10px]">Discover</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="min-h-[300px]">
          {results.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {results.map((item) => {
                const cfg = likelihoodConfig[item.likelihood] || likelihoodConfig.Moderate;
                const stories = alumniDatabase[item.branch] || [];

                return (
                  <div key={item.branch} className="rounded-xl border border-subtle p-5 flex flex-col h-full transition-all hover:border-blue-500/30 shadow-card bg-surface-2">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <h4 className="text-2xl font-black text-primary font-['Outfit'] tracking-tight">{item.branch}</h4>
                        <p className="text-sm text-muted font-medium mt-0.5">{item.title}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${cfg.badge}`}>
                        {item.likelihood}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="p-4 rounded-xl border border-subtle mb-4 bg-surface-3 shadow-inner">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Match Accuracy</p>
                      <p className="text-4xl font-black text-primary font-['Outfit']">{item.score}%</p>
                    </div>

                    {/* Alumni */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        <HistoryIcon sx={{ fontSize: 16 }} className="text-blue-500" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-muted">Peer Outcomes</h5>
                      </div>
                      {stories.map((alumnus, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-subtle bg-surface-1 shadow-card">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                                <SchoolIcon sx={{ fontSize: 16 }} />
                              </div>
                              <div>
                                <p className="text-sm font-black text-primary">{alumnus.name}</p>
                                <p className="text-[9px] font-bold text-muted uppercase">Rank: {alumnus.rank}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg">{alumnus.outcome}</span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed italic border-t border-subtle pt-2 mt-2">
                            "{alumnus.message}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-center p-12 border border-dashed border-subtle rounded-xl bg-surface-1">
              <AlumniIcon sx={{ fontSize: 40 }} className="text-muted mb-4" />
              <h4 className="text-lg font-black text-primary font-['Outfit']">Ready for Discovery</h4>
              <p className="text-xs text-muted mt-1.5 font-medium max-w-xs">
                Enter your merit rank and interests above to visualize branch paths and historical outcomes.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Predictor;
