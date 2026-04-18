import { Tooltip, IconButton } from "@mui/material";
import { 
  AddCircle as AddIcon, 
  PlayCircleFilled as PlayIcon, 
  RestartAlt as ResetIcon, 
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
  Tune as TuneIcon,
} from "@mui/icons-material";

function Controls({
  branchName,
  branchSeats,
  setBranchName,
  setBranchSeats,
  onAddBranch,
  onRunAllocation,
  onResetSystem,
  branches,
  onUpdateSeats,
  onRemoveBranch,
  message,
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* ── Config Panel ─────────────────────────────── */}
      <div className="lg:col-span-2 space-y-5">
        <div className="rounded-2xl border border-subtle p-6 space-y-6 bg-surface-1 shadow-premium">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400">
              <TuneIcon sx={{ fontSize: 18 }} />
            </div>
            <div>
              <h3 className="text-base font-black text-primary tracking-tight font-['Outfit']">System Config</h3>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Branch Parameters</p>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Branch Identifier</label>
              <input
                type="text"
                placeholder="e.g. COMPUTER SCIENCE"
                value={branchName}
                onChange={e => setBranchName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium text-primary outline-none border border-subtle focus:border-blue-600/60 placeholder:text-muted transition-colors bg-surface-2 shadow-inner"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Intake Capacity</label>
              <input
                type="number"
                placeholder="Enter seat count"
                value={branchSeats}
                onChange={e => setBranchSeats(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium text-primary outline-none border border-subtle focus:border-blue-600/60 placeholder:text-muted transition-colors bg-surface-2 shadow-inner"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <button
              onClick={onAddBranch}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
            >
              <AddIcon sx={{ fontSize: 16 }} /> Update Inventory
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={onRunAllocation}
                className="py-3 rounded-xl border border-emerald-500/25 text-emerald-400 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
                style={{ background: 'rgba(16,185,129,0.08)' }}
              >
                <PlayIcon sx={{ fontSize: 16 }} /> Run Cycle
              </button>
              <button
                onClick={onResetSystem}
                className="py-3 rounded-xl border border-subtle text-muted font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/25 transition-all bg-surface-2 shadow-card"
              >
                <ResetIcon sx={{ fontSize: 16 }} /> Reset
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-widest text-center">
              {message}
            </div>
          )}
        </div>

        {/* Audit tip */}
        <div className="rounded-2xl border border-blue-600/20 p-5 relative overflow-hidden" style={{ background: 'rgba(37,99,235,0.08)' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
          <h4 className="text-sm font-black text-primary mb-2 font-['Outfit']">⚠ Audit Requirement</h4>
          <p className="text-xs text-blue-300/70 font-medium leading-relaxed">
            Before executing a new allocation cycle, ensure all candidate files are marked as{" "}
            <span className="text-blue-600 dark:text-blue-300 font-black">"LOCKED"</span>.
          </p>
        </div>
      </div>

      {/* ── Branch Inventory ─────────────────────────── */}
      <div className="lg:col-span-3 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400">
              <InventoryIcon sx={{ fontSize: 18 }} />
            </div>
            <div>
              <h3 className="text-base font-black text-primary tracking-tight font-['Outfit']">Institutional Capacity</h3>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{Object.keys(branches).length} Branches Configured</p>
            </div>
          </div>
        </div>

        {Object.keys(branches).length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(branches).map(([name, info]) => {
              const fillPct = info.total > 0 ? Math.round(((info.total - info.remaining) / info.total) * 100) : 0;
              const isFull = info.remaining === 0;

              return (
                <div key={name} className="rounded-2xl border border-subtle p-5 group transition-all hover:border-blue-500/30 bg-surface-1 shadow-card hover:shadow-premium">
                  {/* Branch header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-black text-primary font-['Outfit'] tracking-tight">{name}</h4>
                      <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Academic Branch</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${
                      isFull
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    }`}>
                      {isFull ? "FULL" : "AVAILABLE"}
                    </span>
                  </div>

                  {/* Seat numbers */}
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-3xl font-black text-primary font-['Outfit'] tracking-tighter">{info.remaining}</span>
                    <span className="text-xs font-bold text-muted uppercase">/ {info.total} seats</span>
                  </div>

                  {/* Fill bar */}
                  <div className="h-1.5 w-full rounded-full mb-4 overflow-hidden bg-surface-3 shadow-inner">
                    <div
                      className={`h-full rounded-full ${isFull ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>

                  {/* Live adjust + delete */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={info.total}
                      onChange={e => onUpdateSeats(name, e.target.value)}
                      className="flex-1 rounded-lg px-3 py-2 text-xs font-black text-primary outline-none border border-subtle focus:border-blue-600/60 transition-colors bg-surface-2"
                    />
                    <Tooltip title="Remove Branch">
                      <IconButton
                        onClick={() => onRemoveBranch(name)}
                        size="small"
                        sx={{
                          color: '#ef4444',
                          background: 'rgba(239,68,68,0.08)',
                          border: '1px solid rgba(239,68,68,0.15)',
                          borderRadius: '8px',
                          width: 34,
                          height: 34,
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
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/8 rounded-2xl">
            <div className="h-14 w-14 rounded-2xl border border-white/8 flex items-center justify-center text-zinc-700 mb-4" style={{ background: '#111' }}>
              <InventoryIcon sx={{ fontSize: 28 }} />
            </div>
            <p className="text-base font-black text-muted font-['Outfit']">Inventory is empty</p>
            <p className="text-xs text-muted mt-1">Add institutional branches to begin allocation cycles.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Controls;
