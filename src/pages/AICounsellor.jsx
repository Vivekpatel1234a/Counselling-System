import { useMemo, useState, useEffect, useRef } from "react";
import { 
  SmartToy as SmartToyIcon, 
  Person as PersonIcon,
  Info as InfoIcon,
  History as HistoryIcon,
  TipsAndUpdates as TipsIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { getCounsellorReply } from "../utils/aiCounsellor";

const quickPrompts = [
  "Which branch suits me?",
  "Tell me about CSE branch",
  "How to prepare for JEE?",
  "What is the salary after engineering?",
  "How to fill preferences wisely?",
  "Career path for data scientist",
  "What is GATE exam?",
  "How to get placed in top companies?",
];

function AICounsellor({ currentUser, students, branches }) {
  const student = useMemo(
    () => students.find((item) => item.id === currentUser?.id),
    [students, currentUser?.id],
  );

  const getIndianTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AI Career Counsellor. I've analyzed your rank and profile. How can I help you today?",
      sender: "ai",
      timestamp: getIndianTime()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSubmit) => {
    const text = (typeof textToSubmit === 'string' ? textToSubmit : input).trim();
    if (!text) return;

    const userMessage = { id: Date.now(), text, sender: "user", timestamp: getIndianTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const reply = await getCounsellorReply({ message: text, student, branches });
    setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, sender: "ai", timestamp: getIndianTime() }]);
    setIsTyping(false);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-subtle animate-fade-in mx-2 shadow-premium bg-surface-1">
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0" style={{ background: 'transparent' }}>
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-subtle bg-surface-2">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <SmartToyIcon sx={{ fontSize: 20 }} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-none font-['Outfit']">Neural Advisor</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Intelligence</span>
              </div>
            </div>
          </div>
          <button className="h-9 w-9 rounded-xl border border-subtle flex items-center justify-center text-muted hover:text-primary hover:border-blue-500/30 transition-all active:scale-95 bg-surface-3 shadow-card">
            <HistoryIcon sx={{ fontSize: 18 }} />
          </button>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((message) => (
            <div key={message.id} className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className={`h-9 w-9 shrink-0 rounded-xl flex items-center justify-center text-sm shadow-sm ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-white/8 border border-white/10 text-blue-600 dark:text-blue-400"
                }`}>
                  {message.sender === "user" ? <PersonIcon sx={{ fontSize: 18 }} /> : <SmartToyIcon sx={{ fontSize: 18 }} />}
                </div>
                <div className="space-y-1">
                  <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed font-medium shadow-card ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-sm"
                      : "text-primary rounded-tl-sm border border-subtle bg-surface-3"
                  }`}>
                    {message.text}
                  </div>
                  <p className={`text-[9px] font-bold text-zinc-600 uppercase tracking-widest ${message.sender === "user" ? "text-right mr-1" : "text-left ml-1"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-start">
                <div className="h-9 w-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-blue-400">
                  <SmartToyIcon sx={{ fontSize: 18 }} />
                </div>
                <div className="px-5 py-3.5 rounded-2xl rounded-tl-sm border border-subtle flex items-center gap-3 bg-surface-3 shadow-card">
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map(delay => (
                      <div key={delay} className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Processing</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-5 border-t border-subtle bg-surface-2">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about branches, ranks, or career roadmap..."
              className="flex-1 rounded-xl py-3.5 px-5 text-sm text-primary font-medium outline-none transition-colors border border-subtle focus:border-blue-600/60 placeholder:text-muted shadow-inner bg-surface-3"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 shrink-0"
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="hidden xl:flex w-72 flex-col border-l border-subtle p-7 overflow-y-auto space-y-8 bg-surface-2">
        {/* Context Snapshot */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <InfoIcon sx={{ fontSize: 16 }} className="text-blue-500" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Context Snapshot</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-subtle bg-surface-3 shadow-card">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-600 mb-1">Institutional Rank</p>
              <p className="text-xl font-black text-slate-900 dark:text-white font-['Outfit'] tracking-tight">#{student?.rank || "Not Set"}</p>
            </div>
            <div className="p-4 rounded-xl border border-subtle bg-surface-3 shadow-card">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-600 mb-1">Career Projection</p>
              <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300 leading-snug">{student?.careerGoal || "Help me decide"}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TipsIcon sx={{ fontSize: 16 }} className="text-amber-500" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="w-full text-left px-4 py-3 rounded-xl border border-subtle text-[11px] font-bold text-muted hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all active:scale-[0.98] shadow-card bg-surface-3"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default AICounsellor;
