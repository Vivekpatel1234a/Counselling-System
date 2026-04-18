import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { 
  Delete as DeleteIcon,
  Search as SearchIcon,
  Badge as BadgeIcon,
  EmojiEvents as TrophyIcon,
  Lock as LockIcon,
  HourglassEmpty as PendingIcon,
  CheckCircle as AllocatedIcon,
  Edit as DraftIcon,
  GetApp as DownloadIcon,
  Description as PdfIcon,
  Visibility as ViewIcon,
  ThumbUp as ApproveIcon,
  ThumbDown as RejectIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const statusConfig = {
  Allocated: { icon: <AllocatedIcon sx={{ fontSize: 13 }} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Locked:    { icon: <LockIcon sx={{ fontSize: 13 }} />,     color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-500/10 border-blue-500/20"    },
  Draft:     { icon: <DraftIcon sx={{ fontSize: 13 }} />,    color: "text-muted",    bg: "bg-surface-2 border-subtle"           },
};

function StudentList({ students, onRemoveStudent, onVerifyStudent, onRejectStudent }) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = students.filter(s =>
    (s.name || s.id).toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live Registry</span>
          </div>
          <h3 className="text-xl font-black text-primary tracking-tight font-['Outfit']">Student Database</h3>
          <p className="text-xs text-muted font-medium mt-0.5">Audit ranks, preferences & execute record purges.</p>
        </div>

        {/* Count + Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-subtle bg-surface-2 shadow-sm">
            <BadgeIcon sx={{ fontSize: 16 }} className="text-blue-500" />
            <span className="text-sm font-black text-primary font-['Outfit']">{students.length}</span>
            <span className="text-[10px] font-bold text-muted uppercase">enrolled</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-subtle bg-surface-2 shadow-sm">
            <SearchIcon sx={{ fontSize: 16 }} className="text-muted" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-primary placeholder:text-muted w-28"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-subtle overflow-hidden bg-surface-1 shadow-premium">
        {/* Table Head */}
        <div className="grid grid-cols-[2fr_1fr_2fr_1fr_1.5fr_auto] gap-4 px-5 py-3 border-b border-subtle bg-surface-2">
          {["Candidate", "Rank", "Strategy", "Status", "Outcome", ""].map((h, i) => (
            <div key={i} className={`text-[9px] font-black uppercase tracking-widest text-muted ${i === 5 ? 'w-10' : ''}`}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length > 0 ? (
          <div className="divide-y divide-white/5">
            {filtered.map((student, idx) => {
              const cfg = statusConfig[student.status] || statusConfig.Draft;
              const initials = (student.name || student.id).charAt(0).toUpperCase();
              const avatarColors = ["bg-blue-600", "bg-indigo-600", "bg-violet-600", "bg-cyan-600", "bg-teal-600"];
              const avatarBg = avatarColors[idx % avatarColors.length];

              return (
                <div key={student.id}>
                <div
                  onClick={() => setExpandedId(expandedId === student.id ? null : student.id)}
                  className="grid grid-cols-[2fr_1fr_2fr_1fr_1.5fr_auto] gap-4 items-center px-5 py-4 hover:bg-surface-2 transition-colors group cursor-pointer"
                >
                  {/* Candidate */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-9 w-9 shrink-0 rounded-xl ${avatarBg} flex items-center justify-center text-white font-black text-sm font-['Outfit'] group-hover:scale-105 transition-transform`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-primary text-sm font-['Outfit'] truncate">{student.name || "Anonymous"}</p>
                      <p className="text-[9px] font-bold text-muted uppercase tracking-widest">{student.id}</p>
                    </div>
                  </div>

                  {/* Rank */}
                  <div className="flex items-center gap-1.5">
                    <TrophyIcon sx={{ fontSize: 13 }} className="text-amber-500" />
                    <span className="font-black text-primary text-sm font-['Outfit']">{student.rank || "—"}</span>
                  </div>

                  {/* Strategy */}
                  <div className="flex flex-wrap gap-1">
                    {student.preferences?.length ? (
                      student.preferences.map((p, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[8px] font-black text-zinc-400 uppercase tracking-tighter">
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] font-bold text-muted">NO PREFS</span>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${cfg.color} ${cfg.bg}`}>
                      {cfg.icon}
                      {student.status || "Draft"}
                    </span>
                  </div>

                  {/* Outcome */}
                  <div>
                    {student.allocated && student.allocated !== "Not Allocated" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-wider">
                        <AllocatedIcon sx={{ fontSize: 11 }} /> {student.allocated}
                      </span>
                    ) : student.allocated === "Not Allocated" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[9px] font-black text-rose-400 uppercase tracking-wider">
                        <PendingIcon sx={{ fontSize: 11 }} /> Not Alloc.
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        <PendingIcon sx={{ fontSize: 11 }} /> Pending
                      </span>
                    )}
                  </div>

                  {/* Delete */}
                  <Tooltip title="Purge Record">
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); onRemoveStudent(student.id); }}
                      size="small"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      sx={{
                        color: '#ef4444',
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: '8px',
                        width: 32,
                        height: 32,
                        '&:hover': { background: '#ef4444', color: '#fff' },
                        transition: 'all 0.2s'
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                </div>
                
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-700 mb-4" style={{ background: 'var(--bg-surface-3)' }}>
              <SearchIcon sx={{ fontSize: 32 }} />
            </div>
            <p className="text-base font-black text-muted font-['Outfit']">
              {search ? "No results found" : "No candidate records"}
            </p>
            <p className="text-xs text-muted mt-1">
              {search ? `No match for "${search}"` : "Students will appear here once registered."}
            </p>
          </div>
        )}
      </div>

      {/* Footer bar */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
            Showing {filtered.length} of {students.length} records
          </span>
          <div className="flex items-center gap-1">
            {["Allocated", "Locked", "Draft"].map(s => {
              const c = statusConfig[s];
              const count = students.filter(st => (st.status || "Draft") === s).length;
              return (
                <span key={s} className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[8px] font-black uppercase ${c.color} ${c.bg}`}>
                  {c.icon} {count} {s}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Student Details Popup Modal */}
      {expandedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setExpandedId(null)}>
          <div 
            className="w-full max-w-2xl bg-surface-1 border border-subtle rounded-[32px] overflow-hidden shadow-premium"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const student = students.find(s => s.id === expandedId);
              if (!student) return null;
              
              const initials = (student.name || student.id).charAt(0).toUpperCase();
              
              return (
                <div>
                  {/* Modal Header */}
                  <div className="px-8 py-6 border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl font-['Outfit']">
                        {initials}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-primary font-['Outfit'] leading-none mb-1">{student.name || "Anonymous Candidate"}</h3>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">ID: {student.id}</p>
                      </div>
                    </div>
                    <button onClick={() => setExpandedId(null)} className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
                      ✕
                    </button>
                  </div>
                  
                  {/* Modal Body */}
                  <div className="px-8 py-6 space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Current Status</p>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase tracking-widest ${statusConfig[student.status || "Draft"].color} ${statusConfig[student.status || "Draft"].bg}`}>
                            {statusConfig[student.status || "Draft"].icon}
                            {student.status || "Draft"}
                          </span>
                          {student.allocated && student.allocated !== "Not Allocated" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-black text-emerald-400 uppercase tracking-wider">
                              <AllocatedIcon sx={{ fontSize: 14 }} /> {student.allocated}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">Merit Rank</p>
                        <p className="text-2xl font-black text-primary font-['Outfit']">{student.rank || "—"}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Uploaded Documents
                      </h4>
                      {(student.documentStatus === "Sent to Admin" || student.documentStatus === "Verified") && student.documentData?.pdfData ? (
                        <div className="space-y-4">
                          {/* Document Status Badge */}
                          <div className="inline-block px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">
                            {student.documentStatus === "Sent to Admin" ? "✓ Awaiting Verification" : "✓ Verified"}
                          </div>

                          {/* PDF File Info */}
                          <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/10 flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <PdfIcon className="text-blue-400 mt-1" />
                              <div>
                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">PDF Document</p>
                                <p className="text-sm font-black text-primary break-all">{student.documentData.fileName}</p>
                                <p className="text-[10px] text-muted mt-1">
                                  Size: {(student.documentData.fileSize / 1024 / 1024).toFixed(2)} MB • 
                                  Uploaded: {new Date(student.documentData.uploadDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Tooltip title="Download PDF">
                                <IconButton
                                  onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = student.documentData.pdfData;
                                    link.download = student.documentData.fileName || `${student.name}_marksheet.pdf`;
                                    link.click();
                                  }}
                                  size="small"
                                  sx={{
                                    color: '#3b82f6',
                                    background: 'rgba(59,130,246,0.1)',
                                    border: '1px solid rgba(59,130,246,0.2)',
                                    borderRadius: '8px',
                                    '&:hover': { background: '#3b82f6', color: '#fff' },
                                    transition: 'all 0.2s'
                                  }}
                                >
                                  <DownloadIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View PDF">
                                <IconButton
                                  onClick={() => {
                                    window.open(student.documentData.pdfData, '_blank');
                                  }}
                                  size="small"
                                  sx={{
                                    color: '#3b82f6',
                                    background: 'rgba(59,130,246,0.1)',
                                    border: '1px solid rgba(59,130,246,0.2)',
                                    borderRadius: '8px',
                                    '&:hover': { background: '#3b82f6', color: '#fff' },
                                    transition: 'all 0.2s'
                                  }}
                                >
                                  <ViewIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>

                          {/* Admin Verification Actions */}
                          {student.documentStatus === "Sent to Admin" && (
                            <div className="flex gap-4 mt-8 pt-6 border-t border-white/5">
                              <button
                                onClick={() => onVerifyStudent(student.id)}
                                className="flex-1 py-4 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
                              >
                                <ApproveIcon sx={{ fontSize: 18 }} className="group-hover:scale-110 transition-transform" />
                                Approve & Verify
                              </button>
                              <button
                                onClick={() => onRejectStudent(student.id)}
                                className="flex-1 py-4 rounded-2xl bg-rose-600/20 border border-rose-500/30 text-rose-400 font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
                              >
                                <RejectIcon sx={{ fontSize: 18 }} className="group-hover:scale-110 transition-transform" />
                                Reject Application
                              </button>
                            </div>
                          )}

                          {student.documentStatus === "Verified" && (
                             <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">
                               Document has been officially verified
                             </div>
                          )}
                        </div>
                      ) : student.documentStatus === "Pending" ? (
                        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest text-center">
                          <PendingIcon sx={{ fontSize: 14, display: 'inline-block', mr: 1 }} />
                          Awaiting Document Upload
                        </div>
                      ) : student.documentStatus === "Rejected" ? (
                        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest text-center">
                          Document Rejected
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border border-white/5 bg-white/5 text-zinc-500 text-xs font-bold uppercase tracking-widest text-center">
                          No Document Uploaded
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
