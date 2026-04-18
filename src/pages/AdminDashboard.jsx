import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  Chip,
  Alert,
} from "@mui/material";
import { 
  AdminPanelSettings as AdminIcon,
  Groups as GroupsIcon,
  AccountTree as AllocationIcon,
  SettingsSuggest as SettingsIcon,
  CheckCircle as SuccessIcon,
  BarChart as StatsIcon,
  Layers as LayersIcon
} from "@mui/icons-material";
import Controls from "../components/Admin/Controls";
import StudentList from "../components/Admin/StudentList";

function AdminDashboard({
  setCurrentUser,
  students,
  setStudents,
  branches,
  setBranches,
  defaultBranches,
}) {
  const navigate = useNavigate();
  const [branchName, setBranchName] = useState("");
  const [branchSeats, setBranchSeats] = useState("");
  const [message, setMessage] = useState("");

  const handleAddBranch = () => {
    const name = branchName.trim().toUpperCase();
    const totalSeats = Number(branchSeats);
    if (!name || !totalSeats) {
      setMessage("Enter a branch name and seat count.");
      return;
    }
    setBranches((prev) => ({
      ...prev,
      [name]: { total: totalSeats, remaining: prev[name]?.remaining ?? totalSeats },
    }));
    setBranchName("");
    setBranchSeats("");
    setMessage("Branch configuration updated successfully.");
  };

  const updateSeats = (name, value) => {
    const totalSeats = Number(value);
    if (!totalSeats && value !== "0") return;
    setBranches((prev) => {
      const current = prev[name];
      const allocatedCount = current.total - current.remaining;
      const safeRemaining = Math.max(totalSeats - allocatedCount, 0);
      return { ...prev, [name]: { total: totalSeats, remaining: safeRemaining } };
    });
  };

  const removeBranch = (name) => {
    setBranches((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
    setStudents((prev) =>
      prev.map((student) => {
        const updatedPreferences = (student.preferences || []).filter(p => p !== name);
        const removedAllocated = student.allocated === name;
        return {
          ...student,
          preferences: updatedPreferences,
          allocated: removedAllocated ? null : student.allocated,
          status: removedAllocated ? (updatedPreferences.length ? "Locked" : "Draft") : student.status,
        };
      })
    );
    setMessage(`${name} removed from system inventory.`);
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter(s => s.id !== id));
    setMessage("Student record purged from database.");
  };

  const runAllocation = () => {
    const branchState = JSON.parse(JSON.stringify(branches));
    Object.keys(branchState).forEach(b => branchState[b].remaining = branchState[b].total);
    const sorted = [...students]
      .map(s => ({ ...s, allocated: null, status: s.preferences?.length ? "Locked" : s.status }))
      .sort((a, b) => Number(a.rank || Infinity) - Number(b.rank || Infinity));

    const result = sorted.map(s => {
      // Allow students who have sent documents to be allocated
      const isEligible = s.documentStatus === "Verified" || s.documentStatus === "Sent to Admin";
      if (!isEligible) return { ...s, allocated: "Not Allocated", status: "Allocated" };
      if (!s.preferences?.length || !s.rank) return { ...s, allocated: "Not Allocated", status: "Allocated" };
      
      let allocated = "Not Allocated";
      for (const pref of s.preferences) {
        if (branchState[pref]?.remaining > 0) {
          allocated = pref;
          branchState[pref].remaining -= 1;
          break;
        }
      }
      return { ...s, allocated, status: "Allocated" };
    });
    setStudents(result);
    setBranches(branchState);
    setMessage("Neural allocation cycle completed successfully.");
  };

  const handleVerifyStudent = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, documentStatus: "Verified" } : s))
    );
    setMessage("Student document verified successfully.");
  };

  const handleRejectStudent = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, documentStatus: "Rejected" } : s))
    );
    setMessage("Student document rejected.");
  };

  const resetSystem = () => {
    setStudents(prev => prev.map(s => ({ ...s, allocated: null, status: s.preferences?.length ? "Locked" : "Draft" })));
    const reset = Object.fromEntries(Object.entries(branches).map(([n, i]) => [n, { ...i, remaining: i.total }]));
    setBranches(Object.keys(reset).length ? reset : defaultBranches);
    setMessage("System state restored to default.");
  };

  const adminStats = [
    { label: "Active Students", value: students.length, icon: <GroupsIcon />, color: "from-blue-600 to-indigo-700" },
    { label: "Branch Capacity", value: Object.keys(branches).length, icon: <LayersIcon />, color: "from-emerald-500 to-teal-600" },
    { label: "Locked Files", value: students.filter(s => s.status === "Locked").length, icon: <StatsIcon />, color: "from-amber-500 to-orange-600" },
    { label: "Allocated", value: students.filter(s => s.status === "Allocated").length, icon: <SuccessIcon />, color: "from-rose-500 to-pink-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in font-['Inter'] pb-20 text-primary bg-base">
      {/* Header Info */}
      <header className="flex items-center justify-between mb-4 px-4">
        <div>
          <h2 className="text-[11px] font-black text-muted uppercase tracking-[0.3em] font-['Outfit']">Administrative Control</h2>
          <div className="flex items-center gap-2 mt-1">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-bold text-muted">System Priority: High</span>
          </div>
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-surface-1 px-10 py-16 text-primary mx-2 rounded-[56px] shadow-premium border border-subtle">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-600/20 via-indigo-500/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
             <Chip 
              icon={<AdminIcon sx={{ color: 'white !important' }} />} 
              label="Root Administrator" 
              className="bg-surface-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] border border-subtle"
             />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight font-['Outfit'] leading-tight">
             Allocation <span className="text-blue-500">Control</span> Center
          </h1>
          <p className="text-muted font-medium text-xl leading-relaxed max-w-xl">
             Manage institutional branches, monitor real-time student activity, and execute the final allocation cycle with precision.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <button 
              onClick={runAllocation}
              className="px-10 py-5 rounded-[24px] bg-blue-600 text-white font-black flex items-center gap-3 hover:bg-blue-500 transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-blue-600/30"
            >
              <AllocationIcon /> Execute Allocation
            </button>
            <button 
              onClick={() => navigate("/admin/controls")}
              className="px-10 py-5 rounded-[24px] bg-surface-2 text-primary border border-subtle font-black flex items-center gap-3 hover:bg-surface-3 transition-all shadow-card"
            >
              <SettingsIcon /> Capacity Management
            </button>
          </div>
        </div>
      </section>

      {/* Message Banner */}
      {message && (
        <div className={`mx-4 p-5 rounded-xl border flex items-center gap-4 ${
          message.includes("success") || message.includes("completed")
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
          : "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
        }`}>
          <SuccessIcon sx={{ fontSize: 20 }} />
          <span className="font-bold text-sm">{message}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 px-2">
        {adminStats.map((stat) => (
          <div key={stat.label} className="bg-surface-1 rounded-2xl p-7 group border border-subtle shadow-card hover:shadow-premium transition-all">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-3xl font-black text-primary mt-2 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mx-2">
        <Routes>
          <Route path="/" element={
            <div className="space-y-12">
               <div className="bg-surface-1 rounded-[48px] p-10 flex flex-col items-center justify-center min-h-[300px] text-center border border-subtle shadow-premium">
                  <div className="h-16 w-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                    <GroupsIcon sx={{ fontSize: 32 }} />
                  </div>
                  <h3 className="text-2xl font-black text-primary font-['Outfit'] mb-3">System Overview</h3>
                  <p className="text-muted max-w-md mx-auto">Welcome to the Administration Dashboard. Select 'Student List' from the sidebar to view detailed candidate records, or 'Controls' to manage branch capacities.</p>
               </div>
            </div>
          } />
          <Route path="/controls" element={
            <div className="bg-surface-1 rounded-[48px] p-10 border border-subtle shadow-premium">
              <Controls
                branchName={branchName}
                branchSeats={branchSeats}
                setBranchName={setBranchName}
                setBranchSeats={setBranchSeats}
                onAddBranch={handleAddBranch}
                onRunAllocation={runAllocation}
                onResetSystem={resetSystem}
                branches={branches}
                onUpdateSeats={updateSeats}
                onRemoveBranch={removeBranch}
                message=""
              />
            </div>
          } />
          <Route path="/students" element={
            <div className="bg-surface-1 rounded-[48px] p-10 border border-subtle shadow-premium">
               <StudentList 
                 students={students} 
                 onRemoveStudent={removeStudent} 
                 onVerifyStudent={handleVerifyStudent}
                 onRejectStudent={handleRejectStudent}
               />
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
