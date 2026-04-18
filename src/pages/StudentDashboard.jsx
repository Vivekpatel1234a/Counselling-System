import { useEffect, useMemo, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  Psychology as PsychologyIcon,
  Assessment as AssessmentIcon,
  SmartToy as SmartToyIcon,
  Person as PersonIcon,
  FormatListBulleted as ListIcon,
  Flag as FlagIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  ElectricBolt as PulseIcon,
} from "@mui/icons-material";
import Predictor from "../components/Student/Predictor";
import Preferences from "../components/Student/Preferences";
import Result from "../components/Student/Result";
import RecommendationCard from "../components/RecommendationCard";
import { getRecommendations } from "../utils/recommendationEngine";

const interestOptions = [
  "Information Technology", "Artificial Intelligence", "Software Engineering", "Data Science", "Machine Learning",
  "Cyber Security", "Electronics", "Communications", "Robotics", "Automation",
  "Mechanical Systems", "Structural Design", "Energy Systems", "Nanotechnology", "Embedded Systems",
];

function StudentDashboard({
  currentUser,
  students,
  setStudents,
  branches,
}) {
  const navigate = useNavigate();
  const currentStudent = useMemo(
    () => students.find((student) => student.id === currentUser.id),
    [students, currentUser.id],
  );

  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [interests, setInterests] = useState([]);
  const [careerGoal, setCareerGoal] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [documentData, setDocumentData] = useState(null);
  const [documentStatus, setDocumentStatus] = useState("Pending"); // Pending, Verified, Rejected
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(currentStudent?.name || "");
    setRank(currentStudent?.rank || "");
    setInterests(currentStudent?.interests || []);
    setCareerGoal(currentStudent?.careerGoal || "");
    setDocumentStatus(currentStudent?.documentStatus || "Pending");
    setDocumentData(currentStudent?.documentData || null);
    setPreferences(
      (currentStudent?.preferences || []).filter((branchName) =>
        Object.hasOwn(branches, branchName),
      ),
    );
  }, [currentStudent, branches]);

  const isInfoComplete = Boolean(currentStudent?.name) && Boolean(currentStudent?.rank);
  const hasAllocatedSeat =
    currentStudent?.allocated && currentStudent.allocated !== "Not Allocated";

  const studentProfile = useMemo(
    () => ({
      rank: Number(currentStudent?.rank || 0),
      interests: currentStudent?.interests || [],
      careerGoal: currentStudent?.careerGoal || "",
    }),
    [currentStudent],
  );

  const recommendations = useMemo(
    () => (isInfoComplete ? getRecommendations(studentProfile, branches) : []),
    [isInfoComplete, studentProfile, branches],
  );

  const handleSelectBranch = (branchName) => {
    if (preferences.includes(branchName)) {
      setMessage("Branch already in preferences.");
      return;
    }
    setPreferences((prev) => [...prev, branchName]);
    setMessage("");
  };

  const movePreference = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= preferences.length) return;
    const updated = [...preferences];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setPreferences(updated);
  };

  const deletePreference = (index) => {
    setPreferences((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setMessage("Preference removed.");
  };

  const saveProfile = () => {
    const trimmedName = name.trim();
    const numericRank = Number(rank);
    if (!trimmedName || !numericRank) {
      setMessage("Name and rank are required.");
      return false;
    }
    setStudents((prev) =>
      prev.map((student) =>
        student.id !== currentUser.id
          ? student
          : { ...student, name: trimmedName, rank: numericRank, interests, careerGoal }
      )
    );
    return true;
  };

  const handleDocumentComplete = (result) => {
    setDocumentStatus(result.status);
    setDocumentData(result.data);
  };

  const handleLockPreferences = () => {
    const trimmedName = name.trim();
    const numericRank = Number(rank);
    if (!trimmedName || !numericRank || preferences.length === 0) {
      setMessage("Complete profile and preferences before locking.");
      return;
    }
    if (documentStatus === "Pending") {
      setMessage("You must upload and verify your document before locking.");
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id !== currentUser.id
          ? student
          : {
              ...student,
              name: trimmedName,
              rank: numericRank,
              interests,
              careerGoal,
              preferences,
              documentStatus: "Sent to Admin", // Mark document as sent to admin
              documentData,
              status: hasAllocatedSeat ? "Allocated" : "Locked",
              allocated: hasAllocatedSeat ? student.allocated : null,
            }
      )
    );
    setDocumentStatus("Sent to Admin");
    setMessage("Preferences locked and document sent to admin for verification.");
  };

  const stats = [
    { label: "Fit Index", value: recommendations[0] ? `${recommendations[0].score}/100` : "--", icon: <PulseIcon />, color: "from-blue-600 to-indigo-700" },
    { label: "Choices", value: preferences.length, icon: <ListIcon />, color: "from-emerald-500 to-teal-600" },
    { label: "Status", value: currentStudent?.status || "Draft", icon: <AssessmentIcon />, color: "from-amber-500 to-orange-600" },
    { label: "Result", value: (currentStudent?.allocated || currentStudent?.status === "Allocated") ? "View" : "Pending", icon: <FlagIcon />, color: "from-rose-500 to-pink-600" },
  ];

  const renderProfileSection = () => (
    <section className="glass-card rounded-2xl p-7 md:p-10">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-11 w-11 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
           <PersonIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight font-['Outfit']">Academic Profile</h2>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">Configure your primary data for the neural engine.</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-surface-2 border border-subtle focus:border-blue-500/60 p-4 font-medium text-primary outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Merit Rank</label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full rounded-xl bg-surface-2 border border-subtle focus:border-blue-500/60 p-4 font-medium text-primary outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Career Goal</label>
          <input
            type="text"
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="w-full rounded-xl bg-surface-2 border border-subtle focus:border-blue-500/60 p-4 font-medium text-primary outline-none transition-colors"
          />
        </div>
      </div>

      <div className="mt-14">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 ml-2">Interests & Specializations</label>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map((interest) => {
            const isSelected = interests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => setInterests(prev => isSelected ? prev.filter(i => i !== interest) : [...prev, interest])}
                className={`rounded-xl px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 ${
                  isSelected 
                  ? "bg-blue-600 text-white border border-blue-500" 
                  : "bg-white/5 text-zinc-500 border border-white/8 hover:border-white/20 hover:text-white"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/5">
        <button
          onClick={() => saveProfile() && setMessage("Profile updated successfully.")}
          className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-black text-white hover:bg-blue-500 transition-all duration-200 active:scale-95"
        >
          <CheckCircleIcon sx={{ fontSize: 18 }} />
          <span className="uppercase tracking-[0.2em] text-[10px]">Save Academic Profile</span>
        </button>
      </div>
    </section>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 px-2 pb-20 animate-fade-in">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-6 px-4">
        <div>
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] font-['Outfit']">Strategic Intelligence Center</h2>
          <div className="flex items-center gap-3 mt-2">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Neural Link Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-surface-2 flex items-center justify-center text-primary font-black font-['Outfit'] text-xl shadow-card border border-subtle">
            {currentUser.id.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {message && (
        <div className={`p-5 rounded-2xl border flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 mx-4 ${
          message.includes("success") || message.includes("locked")
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
        }`}>
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${
             message.includes("success") || message.includes("locked")
             ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
             : "bg-amber-500/20 border-amber-500/30 text-amber-400"
          }`}>
             <InfoIcon sx={{ fontSize: 20 }} />
          </div>
          <span className="font-black text-[10px] uppercase tracking-[0.2em]">{message}</span>
        </div>
      )}

      <Routes>
        <Route path="/" element={
          <div className="space-y-16">
            <div className="relative overflow-hidden rounded-[40px] bg-surface-1 border border-subtle p-10 md:p-20 text-primary mx-4 shadow-premium">
              <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-4xl">
                <span className="inline-block px-5 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-10">
                  Academic Cycle • 2024
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter font-['Outfit'] leading-none">
                  Strategic <br />
                  <span className="text-blue-500">Merit</span> Analysis
                </h1>
                <p className="text-muted font-medium text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
                  Welcome, {name || "Candidate"}. The allocation engine is simulating <span className="font-black text-primary">2,400+ seat nodes</span> for your profile.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => navigate("/ai")} className="px-8 py-4 rounded-xl bg-blue-600 text-white font-black flex items-center gap-3 hover:bg-blue-500 transition-all duration-300 group active:scale-95">
                    <SmartToyIcon sx={{ fontSize: 20 }} className="group-hover:rotate-12 transition-transform" /> 
                    <span className="uppercase tracking-widest text-xs">AI Research Advisor</span>
                  </button>
                  <button onClick={() => navigate("/student/discover")} className="px-8 py-4 rounded-xl bg-surface-2 border border-subtle text-primary font-black flex items-center gap-3 hover:bg-surface-3 transition-all duration-300 active:scale-95 shadow-card">
                    <span className="uppercase tracking-widest text-xs">Discover Best Match</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 px-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-7 group">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{ stat.label}</p>
                  <p className="text-3xl font-black text-primary mt-2 tracking-tighter font-['Outfit']">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-3 px-4">
              <div className="lg:col-span-2">{renderProfileSection()}</div>
              <div className="space-y-12">
                <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-lg font-black text-primary font-['Outfit'] tracking-tight">Best Match</h3>
                    <div className="h-9 w-9 rounded-xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-400">
                      <PsychologyIcon sx={{ fontSize: 18 }} />
                    </div>
                  </div>
                  {recommendations.length > 0 ? (
                    <div className="space-y-3 relative z-10">
                      {recommendations.slice(0, 3).map((rec) => (
                        <div key={rec.branch} className="p-4 rounded-xl border border-subtle hover:border-blue-500/30 transition-colors bg-surface-2 shadow-sm">
                           <RecommendationCard recommendation={rec} student={studentProfile} compact />
                        </div>
                      ))}

                    </div>
                  ) : (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
                      <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">Complete profile for data</p>
                    </div>
                  )}
                </div>


              </div>
            </div>
          </div>
        } />
        
        <Route path="/preferences" element={
          <Preferences
            branches={branches}
            preferences={preferences}
            isInfoComplete={isInfoComplete}
            onSelectBranch={handleSelectBranch}
            onMovePreference={movePreference}
            onDeletePreference={deletePreference}
            onLockPreferences={handleLockPreferences}
            recommendations={recommendations}
            currentStudentName={currentStudent?.name}
            onDocumentComplete={handleDocumentComplete}
            documentStatus={documentStatus}
            isLocked={currentStudent?.status === "Locked" || currentStudent?.status === "Allocated"}
          />
        } />

        <Route path="/discover" element={
          <Predictor
            branches={branches}
          />
        } />

        <Route path="/result" element={
          <Result student={currentStudent} recommendations={recommendations} />
        } />
      </Routes>
    </div>
  );
}

export default StudentDashboard;
