import { 
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Badge as BadgeIcon,
  MilitaryTech as MeritIcon,
  AutoMode as ForecastIcon,
  FactCheck as StatusIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";

function Result({ student, recommendations = [] }) {
  const allocatedBranch =
    student?.allocated && student.allocated !== "Not Allocated"
      ? student.allocated
      : null;
  const isAllocated = student?.status === "Allocated";
  const backupRecommendation = recommendations[0]?.branch;

  return (
    <div className="space-y-12 animate-fade-in w-full overflow-hidden pb-12 px-2">
      {/* Hero Result Section - Glasshero Style */}
      <section className="glass-card rounded-[56px] p-8 md:p-16 transition-all relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 pb-16 mb-16 border-b border-slate-50 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-12 w-12 rounded-2xl bg-surface-2 border border-subtle flex items-center justify-center text-primary shadow-card">
                  <AssignmentIcon sx={{ fontSize: 24 }} />
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 font-['Outfit']">
                  Institutional Allocation Result
               </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter font-['Outfit'] leading-none mb-8">
               Allotment <span className="text-blue-600">Decision</span>
            </h3>
            <p className="text-lg text-muted font-medium leading-relaxed max-w-lg">
              Official seat allocation results generated through the merit-based algorithmic distribution system.
            </p>
          </div>
          
          {/* Status Glass Box */}
          <div className={`flex flex-col items-center justify-center gap-6 px-12 py-16 rounded-[48px] shadow-premium transition-all duration-700 w-full lg:w-auto min-w-[320px] relative overflow-hidden ${
            allocatedBranch 
            ? "bg-blue-600 text-white" 
            : isAllocated
            ? "bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-100 shadow-card"
            : "bg-surface-2 border border-subtle text-primary"
          }`}>
            {allocatedBranch && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.3),transparent)]" />
            )}
            <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md relative z-10">
               {allocatedBranch ? (
                 <CheckCircleIcon sx={{ fontSize: 40 }} className="animate-bounce" />
               ) : isAllocated ? (
                 <CancelIcon sx={{ fontSize: 40 }} className="text-rose-500" />
               ) : (
                 <ScheduleIcon sx={{ fontSize: 40 }} className="animate-pulse" />
               )}
            </div>
            <div className="text-center relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-3">CURRENT STATUS</p>
              <span className="text-3xl font-black tracking-tight font-['Outfit'] block">
                {allocatedBranch || (isAllocated ? "No Seat Allotted" : "Pending Publication")}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
          {[
            { label: "Candidate Name", value: student?.name || "Verified User", icon: <BadgeIcon className="text-blue-500" /> },
            { label: "Institutional Rank", value: `#${student?.rank || "----"}`, icon: <MeritIcon className="text-indigo-500" /> },
            { label: "Preference Status", value: `${student?.preferences?.length || 0} Modules Locked`, icon: <StatusIcon className="text-emerald-500" /> },
            { label: "AI Forecasted Fit", value: backupRecommendation || "Active Analysis", icon: <ForecastIcon className="text-rose-500" /> },
          ].map((stat) => (
            <div key={stat.label} className="p-8 rounded-[36px] bg-surface-1 border border-subtle shadow-card hover:shadow-premium transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-surface-2 border border-subtle flex items-center justify-center transition-transform group-hover:scale-110">
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">{stat.label}</p>
              </div>
              <p className="text-2xl font-black text-primary font-['Outfit'] tracking-tight truncate">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Post-Allocation Information */}
      {!allocatedBranch && student?.documentStatus === "Rejected" ? (
        <section className="p-10 rounded-[48px] border-2 border-dashed border-rose-500/30 bg-rose-500/10 text-center animate-fade-in relative overflow-hidden">
           <StatusIcon className="text-rose-500 mb-6" sx={{ fontSize: 48 }} />
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-500 font-['Outfit'] mb-2">
             Verification Failed: Upload Marksheet Again
           </p>
           <p className="text-sm font-medium text-rose-400/80 max-w-xl mx-auto">
             Your seat allocation was blocked because your document could not be verified. Please return to the Preferences tab and upload a clear, legible copy of your 12th Marksheet or JEE Scorecard.
           </p>
        </section>
      ) : !allocatedBranch ? (
        <section className="p-10 rounded-[48px] border-2 border-dashed border-subtle bg-surface-2 text-center animate-fade-in shadow-inner">
           <ScheduleIcon className="text-muted mb-6" sx={{ fontSize: 48 }} />
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted">
             The official result portal will activate upon the completion of the current counseling cycle.
           </p>
        </section>
      ) : null}
    </div>
  );
}

export default Result;
