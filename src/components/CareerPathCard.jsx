import { CAREER_DATA } from "../utils/careerData";
import { 
  TrendingUp as TrendingUpIcon, 
  Work as WorkIcon, 
  Star as StarIcon, 
  Insights as InsightsIcon,
  EmojiEvents as EmojiEventsIcon,
  Warning as WarningIcon
} from "@mui/icons-material";

const scenarioStyles = {
  best: {
    shell: "border-emerald-500/20 bg-emerald-500/5",
    badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    title: "text-emerald-600 dark:text-emerald-400",
    text: "text-slate-600 dark:text-zinc-400",
    icon: <EmojiEventsIcon className="text-emerald-500" sx={{ fontSize: 18 }} />,
    dot: "bg-emerald-500"
  },
  average: {
    shell: "border-amber-500/20 bg-amber-500/5",
    badge: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    title: "text-amber-600 dark:text-amber-400",
    text: "text-slate-600 dark:text-zinc-400",
    icon: <InsightsIcon className="text-amber-500" sx={{ fontSize: 18 }} />,
    dot: "bg-amber-500"
  },
  worst: {
    shell: "border-rose-500/20 bg-rose-500/5",
    badge: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
    title: "text-rose-600 dark:text-rose-400",
    text: "text-slate-600 dark:text-zinc-400",
    icon: <WarningIcon className="text-rose-500" sx={{ fontSize: 18 }} />,
    dot: "bg-rose-500"
  },
};

function ScenarioCard({ tone, scenario }) {
  const style = scenarioStyles[tone];

  return (
    <div className={`group relative rounded-2xl border transition-all duration-300 hover:border-opacity-50 p-6 ${style.shell}`}>
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          {style.icon}
          <h4 className={`text-lg font-black font-['Outfit'] ${style.title}`}>{scenario.title}</h4>
        </div>
        <span className={`rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-widest ${style.badge}`}>
          {tone}
        </span>
      </div>
      <p className={`text-base font-medium leading-relaxed ${style.text}`}>{scenario.outlook}</p>
      
      <div className="mt-6 space-y-4 pt-6 border-t border-white/5">
        {scenario.details.map((detail) => (
          <div key={detail} className="flex items-start gap-3">
            <div className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
            <span className="text-sm font-medium leading-relaxed text-muted">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerPathCard({ branch }) {
  const data = CAREER_DATA[branch];

  if (!data) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-subtle p-8 transition-all bg-surface-1 shadow-premium">
      {/* Subtle Background pattern */}
      <div className="absolute right-0 top-0 h-40 w-40 -translate-y-20 translate-x-20 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <TrendingUpIcon className="text-blue-500" sx={{ fontSize: 20 }} />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-blue-500">
                Future Roadmap
              </span>
            </div>
            <h3 className="text-3xl font-black text-primary tracking-tight font-['Outfit']">
              Career path for {branch}
            </h3>
          </div>
          <div className="flex h-fit items-center gap-3 rounded-xl bg-blue-500/10 px-4 py-2 border border-blue-500/20">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">Detailed Simulation</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="p-6 rounded-xl border border-subtle shadow-card bg-surface-2">
            <div className="flex items-center gap-3 mb-5">
              <WorkIcon className="text-zinc-500" sx={{ fontSize: 20 }} />
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                Primary Career Roles
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.roles.map((role) => (
                <span
                  key={role}
                  className="rounded-lg bg-surface-3 px-4 py-2 text-sm font-bold text-primary border border-subtle hover:bg-blue-600 hover:text-white transition-all cursor-default shadow-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-subtle shadow-card bg-surface-2">
            <div className="flex items-center gap-3 mb-5">
              <StarIcon className="text-amber-500" sx={{ fontSize: 20 }} />
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                Long-term Scope
              </h4>
            </div>
            <ul className="space-y-4">
              {data.scope.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/50" />
                  <span className="text-base font-medium text-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scenarios */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <InsightsIcon className="text-zinc-500" sx={{ fontSize: 20 }} />
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
              Future Scenarios Analysis
            </h4>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <ScenarioCard tone="best" scenario={data.scenarios.best} />
            <ScenarioCard tone="average" scenario={data.scenarios.average} />
            <ScenarioCard tone="worst" scenario={data.scenarios.worst} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerPathCard;
