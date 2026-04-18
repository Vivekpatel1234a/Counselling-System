import { 
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  DoubleArrow as DetailIcon
} from "@mui/icons-material";
import { getExplanation, getCareerScenarios } from "../utils/explainEngine";

const statusConfig = {
  Safe: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-500",
    icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
  },
  Moderate: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    dot: "bg-blue-500",
    icon: <InfoIcon sx={{ fontSize: 16 }} />,
  },
  Risky: {
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    dot: "bg-rose-500",
    icon: <WarningIcon sx={{ fontSize: 16 }} />,
  },
};

function RecommendationCard({ recommendation, student, compact = false }) {
  const status = statusConfig[recommendation.likelihood] || statusConfig.Moderate;

  if (compact) {
    return (
      <div className={`group relative overflow-hidden rounded-2xl bg-transparent transition-all duration-300`}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-5 min-w-0">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${status.border} ${status.bg} font-black text-2xl font-['Outfit'] ${status.color}`}>
                {recommendation.branch}
              </div>
              <div className="min-w-0">
                <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight font-['Outfit'] wrap-text">
                  {recommendation.title}
                </h4>
                <p className="text-xs font-black text-slate-500 dark:text-zinc-500 uppercase tracking-widest mt-1.5">
                  {recommendation.demandLevel} Demand
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="rounded-xl bg-surface-2 p-5 border border-subtle shadow-card">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">MATCH INDEX</p>
                <p className="text-2xl font-black text-primary font-['Outfit']">{recommendation.score}%</p>
             </div>
             <div className="rounded-xl bg-surface-2 p-5 border border-subtle shadow-card">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">SUCCESS PROB</p>
                <p className={`text-2xl font-black font-['Outfit'] ${status.color}`}>{recommendation.likelihood}</p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  const explanations = getExplanation(recommendation, student);

  return (
    <div className={`group relative overflow-hidden rounded-[40px] border border-subtle p-10 transition-all duration-500 hover:border-blue-500/30 bg-surface-1 shadow-premium`}>
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
      
      <div className="relative z-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between border-b border-white/10 pb-10">
          <div className="flex items-center gap-8">
            <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border ${status.border} ${status.bg} font-black text-3xl font-['Outfit'] ${status.color} transition-transform group-hover:rotate-6`}>
              {recommendation.branch}
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-primary leading-none font-['Outfit'] tracking-tighter">
                {recommendation.title}
              </h3>
              <div className="flex items-center gap-4 mt-5">
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${status.border} ${status.bg}`}>
                  <div className={`h-2 w-2 rounded-full ${status.dot} animate-pulse`} />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    Verified Probability
                  </p>
                </div>
                <p className="text-xs font-black text-blue-500 uppercase tracking-widest">
                   Institutional Hub Node
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-surface-2 px-10 py-5 border border-subtle transition-all hover:bg-surface-3 shadow-card">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1.5">FIT SCORE</span>
              <span className="text-4xl font-black text-primary font-['Outfit']">{recommendation.score}%</span>
            </div>
            <div className={`flex items-center gap-3 rounded-3xl px-10 py-6 font-black text-xs uppercase tracking-[0.3em] ${status.color} border ${status.border} ${status.bg} transition-transform hover:scale-105 active:scale-95`}>
              {status.icon}
              {recommendation.likelihood} Probability
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Historical Index", value: recommendation.cutoffRank, color: "text-primary" },
            { label: "Placement Rate", value: `${recommendation.placements}%`, color: "text-primary" },
            { 
              label: "Strategic Delta", 
              value: recommendation.rankDelta >= 0 ? `+${recommendation.rankDelta}` : recommendation.rankDelta,
              color: recommendation.rankDelta >= 0 ? 'text-emerald-400' : 'text-rose-400' 
            },
          ].map((metric) => (
            <div key={metric.label} className="p-8 rounded-[32px] border border-subtle transition-all duration-500 hover:border-blue-500/20 shadow-card bg-surface-2">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-3">{metric.label}</p>
              <p className={`text-4xl font-black font-['Outfit'] tracking-tighter ${metric.color}`}>{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          <div className="rounded-[32px] bg-surface-2 p-10 border border-subtle shadow-card">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-3 border border-subtle text-primary transition-transform hover:rotate-12">
                <DetailIcon sx={{ fontSize: 24 }} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.4em] text-muted font-['Outfit']">Strategic Intelligence Feed</h4>
                <p className="text-[11px] font-bold text-blue-500 mt-1 uppercase tracking-widest">Neural Analysis Complete</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {explanations.map((reason, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-surface-1 border border-subtle shadow-card hover:border-blue-500/30 transition-all duration-300">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                  <span className="text-sm text-primary leading-relaxed font-semibold">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10 pt-6">
            <div className="flex items-center gap-4 px-4">
              <TrendingUpIcon className="text-blue-500" sx={{ fontSize: 28 }} />
              <h4 className="text-sm font-black uppercase tracking-[0.5em] text-primary font-['Outfit']">Simulated Career Roadmap</h4>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {getCareerScenarios(recommendation.branch).map((scenario) => (
                <div key={scenario.type} className="flex flex-col justify-between p-8 rounded-[32px] transition-all duration-500 border border-subtle hover:border-blue-500/20 group/card shadow-card bg-surface-2">
                  <div className="mb-8">
                    <p className={`text-[11px] font-black uppercase tracking-[0.3em] mb-4 ${
                      scenario.type === "Best Case" ? "text-emerald-400" : scenario.type === "Worst Case" ? "text-rose-400" : "text-amber-400"
                    }`}>{scenario.type}</p>
                    <p className="text-xl font-black text-primary leading-snug group-hover/card:text-blue-400 transition-colors font-['Outfit'] tracking-tight">{scenario.outcome}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Target CTC</p>
                    <p className="text-2xl font-black text-primary font-['Outfit']">{scenario.salary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
