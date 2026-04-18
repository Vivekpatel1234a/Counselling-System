import { 
  LibraryAdd as LibraryAddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  EventSeat as SeatIcon,
} from "@mui/icons-material";
import CareerPathCard from "../CareerPathCard";
import DocumentVerification from "./DocumentVerification";

function Preferences({
  branches,
  preferences,
  isInfoComplete,
  onSelectBranch,
  onMovePreference,
  onDeletePreference,
  onLockPreferences,
  recommendations = [],
  currentStudentName,
  onDocumentComplete,
  documentStatus,
  isLocked
}) {
  const safeOptions = recommendations
    .filter((item) => item.likelihood === "Safe")
    .map((item) => item.branch);
  const hasSafeOption = preferences.some((item) => safeOptions.includes(item));
  const isRisky = preferences.length > 0 && (preferences.length <= 1 || !hasSafeOption);

  return (
    <div className="space-y-8 animate-fade-in w-full overflow-hidden pb-20 px-2">

      {/* Best Match Intelligence */}
      <section className="glass-card rounded-2xl p-7">
        <div className="flex items-center gap-4 mb-7">
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-indigo-400">
            <PsychologyIcon sx={{ fontSize: 20 }} />
          </div>
          <div>
            <h3 className="text-lg font-black text-primary tracking-tight font-['Outfit']">Best Match Intelligence</h3>
            <p className="text-xs text-muted font-medium mt-0.5">AI-driven recommendations based on your profile.</p>
          </div>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.slice(0, 4).map((rec) => (
              <div key={rec.branch} className="p-5 rounded-xl border border-subtle group hover:border-blue-500/30 transition-all duration-300 shadow-card bg-surface-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black text-primary font-['Outfit']">{rec.branch}</span>
                  <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                    rec.likelihood === "Safe"     ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" :
                    rec.likelihood === "Moderate" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20"         : 
                                                    "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  }`}>
                    {rec.likelihood}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Match Score</p>
                <p className="text-2xl font-black text-primary font-['Outfit'] mb-4">{rec.score}%</p>
                <button 
                  onClick={() => onSelectBranch(rec.branch)}
                  className="w-full py-2.5 rounded-lg bg-surface-3 border border-subtle text-primary text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all active:scale-95 shadow-card"
                >
                  Add to Strategy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">Complete academic profile to unlock best matches</p>
          </div>
        )}
      </section>

      {/* Seat Availability Matrix */}
      <section className="glass-card rounded-2xl p-7">
        <div className="flex items-center gap-4 mb-7">
          <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400">
            <SeatIcon sx={{ fontSize: 20 }} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight font-['Outfit']">Seat Availability</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-500 font-medium mt-0.5">Live capacity data across all branches.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(branches).map(([branchName, seatInfo]) => {
            const selected = preferences.includes(branchName);
            const progress = (seatInfo.remaining / seatInfo.total) * 100;
            return (
              <button
                key={branchName}
                disabled={!isInfoComplete}
                onClick={() => onSelectBranch(branchName)}
                className={`group relative p-5 rounded-xl border text-left transition-all duration-300 active:scale-[0.98] ${
                  selected
                    ? "border-blue-600/50 bg-blue-600/10"
                    : "border-white/8 hover:border-white/20"
                }`}
                style={{ background: selected ? undefined : 'var(--bg-surface-2)' }}
              >
                <h4 className={`text-xl font-black font-['Outfit'] tracking-tighter mb-4 ${selected ? 'text-blue-500' : 'text-primary'}`}>
                  {branchName}
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Total</span>
                    <span className="text-base font-black font-['Outfit'] text-primary">{seatInfo.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Remaining</span>
                    <span className={`text-base font-black font-['Outfit'] ${selected ? 'text-blue-600' : 'text-emerald-600'}`}>
                      {seatInfo.remaining}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-3)' }}>
                    <div
                      className={`h-full rounded-full ${selected ? 'bg-blue-500' : 'bg-emerald-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Strategic Order */}
      <section className="glass-card rounded-2xl p-7">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-7 pb-6 border-b border-white/8">
          <div>
            <h3 className="text-lg font-black text-primary font-['Outfit']">Strategic Order</h3>
            <p className="text-xs text-muted font-medium mt-0.5">Prioritize your choices for the allocation cycle.</p>
          </div>
          <button
            onClick={onLockPreferences}
            disabled={isLocked || !isInfoComplete || preferences.length === 0 || documentStatus === "Pending"}
            className="flex items-center gap-3 rounded-xl bg-blue-600 text-white px-6 py-3 font-black hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <LockIcon sx={{ fontSize: 16 }} />
            <span className="uppercase tracking-widest text-[10px]">
              {isLocked ? "Preferences Locked" : "Lock Final List"}
            </span>
          </button>
        </div>

        <div className="space-y-3">
          {preferences.length > 0 ? (
            preferences.map((branch, index) => (
              <div key={`${branch}-${index}`} className="flex items-center gap-4 p-4 rounded-xl border border-subtle hover:border-blue-500/20 transition-all shadow-card bg-surface-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-3 border border-subtle text-primary font-black font-['Outfit'] text-base">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-black text-primary font-['Outfit'] tracking-tight">{branch}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                    Active Node
                  </p>
                </div>
                {!isLocked && (
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-xl border border-subtle overflow-hidden bg-surface-3">
                      <button onClick={() => onMovePreference(index, -1)} disabled={index === 0} className="h-9 w-9 flex items-center justify-center text-zinc-500 hover:bg-white/10 hover:text-white disabled:opacity-20 transition-all active:scale-95 disabled:active:scale-100">
                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                      </button>
                      <div className="w-px bg-white/8" />
                      <button onClick={() => onMovePreference(index, 1)} disabled={index === preferences.length - 1} className="h-9 w-9 flex items-center justify-center text-zinc-500 hover:bg-white/10 hover:text-white disabled:opacity-20 transition-all active:scale-95 disabled:active:scale-100">
                        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                      </button>
                    </div>
                    <button onClick={() => onDeletePreference(index)} className="h-9 w-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center justify-center">
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-16 text-center border border-dashed border-white/10 rounded-xl">
              <LibraryAddIcon sx={{ fontSize: 36 }} className="text-zinc-700 mb-3" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">Strategy list is empty</p>
            </div>
          )}
        </div>

        {/* Document Verification Section before locking */}
        <div className="mt-8 pt-8 border-t border-white/8">
           {isLocked ? (
             <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <LockIcon />
                </div>
                <div>
                   <h3 className="text-base font-black text-emerald-400 font-['Outfit']">Document Verified & Locked</h3>
                   <p className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest mt-0.5">Your academic records are permanently sealed for this cycle.</p>
                </div>
             </div>
           ) : (
             <DocumentVerification studentName={currentStudentName} onComplete={onDocumentComplete} />
           )}
        </div>

        {isRisky && (
          <div className="mt-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400">
            <WarningIcon sx={{ fontSize: 20 }} />
            <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed">Add a backup branch with High Success Probability.</p>
          </div>
        )}
      </section>

      {/* Career Guidance Roadmap */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <TrendingUpIcon sx={{ fontSize: 18 }} className="text-zinc-500" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-muted font-['Outfit']">Academic & Career Roadmap</h4>
        </div>
        <div className="glass-card rounded-2xl p-7 relative overflow-hidden">
          <p className="text-sm text-muted font-medium mb-7 max-w-2xl leading-relaxed">
            Explore simulated career trajectories for your top choices to align preferences with long-term professional goals.
          </p>
          <CareerPathCard branch={preferences[0] || recommendations[0]?.branch} />
        </div>
      </section>
    </div>
  );
}

export default Preferences;
