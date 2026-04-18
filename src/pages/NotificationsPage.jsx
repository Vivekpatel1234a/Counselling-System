import { useEffect, useState } from "react";
import { 
  Campaign as CampaignIcon,
  Update as UpdateIcon,
  School as SchoolIcon,
  Launch as LaunchIcon,
  NotificationsActive as AlertIcon
} from "@mui/icons-material";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newsData = [
      {
        id: 1,
        type: "URGENT",
        icon: <CampaignIcon sx={{ fontSize: 18 }} />,
        title: "Registration Cycle Now Open for All Merit Tiers",
        excerpt: "The official registration window for the current academic session is now active. Students across all merit tiers are advised to complete their profile verification before the upcoming deadline.",
        link: "#",
        source: "Admissions Board",
        date: "JUST NOW",
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 2,
        type: "ACADEMIC",
        icon: <UpdateIcon sx={{ fontSize: 18 }} />,
        title: "Modernized Tech Curriculum Approved by Senate",
        excerpt: "The university senate has approved a new curriculum structure for Technology branches, incorporating hands-on AI integration and industry-aligned credit systems.",
        link: "#",
        source: "Dean Academics",
        date: "2 HOURS AGO",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 3,
        type: "PLACEMENT",
        icon: <SchoolIcon sx={{ fontSize: 18 }} />,
        title: "Top-Tier Hiring Trends for 2024 Branches",
        excerpt: "Early placement reports indicate a 40% surge in hardware-software hybrid roles. Explore how branch choice impacts long-term professional trajectory in the current market.",
        link: "#",
        source: "Corporate Relations",
        date: "YESTERDAY",
        img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 4,
        type: "INFRASTRUCTURE",
        icon: <AlertIcon sx={{ fontSize: 18 }} />,
        title: "New Digital Innovation Lab Inaugration",
        excerpt: "Our private campus expands its research capabilities with the new Digital Innovation Lab, featuring high-performance compute clusters for CSE and IT students.",
        link: "#",
        source: "Admin Office",
        date: "3 DAYS AGO",
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
      }
    ];
    
    setTimeout(() => {
      setNotifications(newsData);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="min-h-screen bg-base animate-fade-in pb-20 overflow-hidden text-primary">
      {/* Header */}
      <section className="px-6 pt-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-lg bg-blue-600/10 border border-blue-600/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 mb-6">
                Broadcast Center
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight font-['Outfit'] leading-tight">
                Live Campus <span className="text-blue-600 dark:text-blue-500">Updates</span>
              </h1>
              <p className="mt-4 text-muted font-medium text-lg">
                Official announcements and strategic academic news for the student community.
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface-2 border border-subtle shadow-card">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Real-time Feed Active</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] w-full bg-subtle mb-12" />

        <div className="grid gap-8 md:grid-cols-2">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] rounded-[32px] bg-surface-2 animate-pulse border border-subtle" />
            ))
          ) : (
            notifications.map((news) => (
              <article key={news.id} className="group relative bg-surface-1 rounded-[32px] border border-subtle overflow-hidden transition-all duration-500 hover:shadow-premium hover:border-blue-500/30 flex flex-col h-full shadow-card">
                <div className="aspect-[16/9] overflow-hidden relative">
                   <img 
                    src={news.img} 
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute top-6 left-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-surface-3/80 backdrop-blur-md border border-subtle shadow-premium">
                         <span className="text-blue-600 dark:text-blue-500 flex items-center">{news.icon}</span>
                         <span className="text-[9px] font-black tracking-widest text-slate-900 dark:text-primary uppercase">{news.type}</span>
                      </div>
                   </div>
                </div>

                <div className="p-10 flex flex-col flex-1">
                   <div className="flex items-center gap-3 mb-4">
                      <span className="text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">{news.source}</span>
                      <span className="h-1 w-1 rounded-full bg-subtle" />
                      <span className="text-[9px] font-bold text-muted uppercase tracking-widest">{news.date}</span>
                   </div>
                   <h3 className="text-2xl font-black text-primary mb-4 tracking-tight font-['Outfit'] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {news.title}
                   </h3>
                   <p className="text-muted font-medium leading-relaxed mb-8 line-clamp-3 text-sm">
                      {news.excerpt}
                   </p>
                   
                   <div className="mt-auto flex items-center justify-between border-t border-subtle pt-6">
                     <a 
                      href={news.link}
                      className="inline-flex items-center gap-2.5 font-black text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all"
                     >
                       Full Report
                       <LaunchIcon sx={{ fontSize: 14 }} />
                     </a>
                   </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
