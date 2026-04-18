import { 
  School as SchoolIcon, 
  EmojiEvents as TrophyIcon, 
  Diversity3 as CommunityIcon, 
  HistoryEdu as LegacyIcon,
  AutoAwesome as FutureIcon,
  AccountBalance as CampusIcon,
  Engineering as TechIcon
} from "@mui/icons-material";

function AboutPage() {
  const pillars = [
    {
      title: "Academic Excellence",
      text: "Our curriculum is engineered in collaboration with industry leaders, ensuring our graduates are ready for the global stage.",
      icon: <LegacyIcon />,
      accent: "bg-blue-600"
    },
    {
      title: "Innovation Hub",
      text: "State-of-the-art research labs and incubation centers that turn student ideas into market-ready ventures.",
      icon: <FutureIcon />,
      accent: "bg-indigo-600"
    },
    {
      title: "Global Community",
      text: "A diverse ecosystem of 10,000+ students and alumni representing top global corporations and research institutions.",
      icon: <CommunityIcon />,
      accent: "bg-emerald-600"
    },
  ];

  const stats = [
    { label: "Placement Rate", value: "98%" },
    { label: "Global Ranking", value: "#14" },
    { label: "Patent Filings", value: "250+" },
    { label: "Startup Exits", value: "45" },
  ];

  return (
    <div className="min-h-screen bg-base animate-fade-in pb-20 text-primary">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="h-20 w-20 rounded-[28px] bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-900/50 mb-10">
            <SchoolIcon sx={{ fontSize: 40 }} />
          </div>
          <span className="px-4 py-1.5 rounded-full bg-surface-2 border border-subtle text-[10px] font-black uppercase tracking-[0.4em] text-muted mb-8 shadow-card">
            Established 1994
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter font-['Outfit'] leading-none mb-8">
            Defining the Future of <br />
            <span className="text-blue-500">Private Education.</span>
          </h1>
          <p className="max-w-2xl text-muted text-lg font-medium leading-relaxed">
            At Rank2Campus, we believe in data-driven academic success. Our platform leverages advanced analytics, 
            predictive AI modeling, and a transparent verification ecosystem to provide unparalleled guidance for the future innovators of the world.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 rounded-[40px] bg-surface-1 text-primary border border-subtle overflow-hidden shadow-premium">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center p-10 ${i < stats.length - 1 ? 'border-r border-white/5' : ''}`}>
              <p className="text-4xl font-black font-['Outfit'] mb-2 text-primary">{stat.value}</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-subtle" style={{ backgroundColor: 'var(--border-subtle)' }} />
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-muted">Our Strategic Pillars</h2>
            <div className="h-px flex-1 bg-subtle" style={{ backgroundColor: 'var(--border-subtle)' }} />
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="group relative p-10 rounded-[48px] bg-surface-1 border border-subtle hover:border-blue-500/30 transition-all duration-500 hover:shadow-premium shadow-card">
                <div className={`h-16 w-16 rounded-3xl ${pillar.accent} text-white flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:scale-110 duration-500`}>
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black text-primary mb-4 font-['Outfit'] tracking-tight">{pillar.title}</h3>
                <p className="text-muted font-medium leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Experience */}
      <section className="px-6 mt-32">
        <div className="max-w-7xl mx-auto rounded-[60px] bg-surface-1 p-12 md:p-24 overflow-hidden relative border border-subtle shadow-premium">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8 text-blue-500">
                <CampusIcon />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Campus</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tight font-['Outfit'] leading-tight">
                A 150-Acre Ecosystem <br />
                Built for <span className="text-blue-500">Growth.</span>
              </h2>
              <p className="text-muted font-medium leading-relaxed mb-10 text-lg">
                Our smart campus features automated research hubs, 24/7 innovation zones, and integrated residential 
                complexes designed to foster a culture of non-stop learning and peer collaboration.
              </p>
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 rounded-3xl bg-surface-2 border border-subtle hover:border-blue-500/30 transition-all shadow-card">
                    <TechIcon className="text-blue-500 mb-4" />
                    <p className="font-black text-primary text-sm">Tech Labs</p>
                    <p className="text-xs text-muted font-bold mt-1">24 Active Zones</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-surface-2 border border-subtle hover:border-amber-500/30 transition-all shadow-card">
                    <TrophyIcon className="text-amber-500 mb-4" />
                    <p className="font-black text-primary text-sm">Recognition</p>
                    <p className="text-xs text-muted font-bold mt-1">QS Gold Rated</p>
                 </div>
              </div>
            </div>
            <div className="relative rounded-[28px] overflow-hidden border border-subtle shadow-premium" style={{ height: '400px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" 
                  className="w-full h-full object-cover"
                  alt="College students standing"
                />
                <div className="absolute bottom-4 left-4 px-4 py-3 rounded-xl border border-subtle backdrop-blur-md shadow-premium bg-white dark:bg-surface-2/80">
                  <p className="text-2xl font-black text-blue-600 dark:text-blue-400 font-['Outfit']">25k+</p>
                  <p className="text-[9px] font-bold text-slate-900 dark:text-muted uppercase tracking-widest">Alumni Network</p>
                </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
