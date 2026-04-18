import { useEffect, useState, useMemo } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box, Container, Paper, Typography, Grid, Card, CardContent, Avatar, Chip, Button } from "@mui/material";
import { 
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  ListAlt as ListIcon,
  TravelExplore as DiscoverIcon,
  Flag as FlagIcon,
  SmartToy as SmartToyIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import NotificationsPage from "./pages/NotificationsPage";
import AICounsellor from "./pages/AICounsellor";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./utils/ThemeContext";
import counsellingLogo from "./assets/logo.webp";

const DEFAULT_BRANCHES = {
  CSE: { total: 2, remaining: 2 },
  IT: { total: 3, remaining: 3 },
  ECE: { total: 3, remaining: 3 },
  ME: { total: 2, remaining: 2 },
  CE: { total: 2, remaining: 2 },
  CHE: { total: 2, remaining: 2 },
  AE: { total: 2, remaining: 2 },
  BT: { total: 2, remaining: 2 },
};

const STORAGE_KEYS = {
  users: "smart-counselling-users",
  students: "smart-counselling-students",
  branches: "smart-counselling-branches",
};

const readStorage = (key, fallbackValue) => {
  const savedValue = localStorage.getItem(key);

  if (!savedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(savedValue);
  } catch {
    return fallbackValue;
  }
};

function AppLayout() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState(() => readStorage(STORAGE_KEYS.users, []));
  const [students, setStudents] = useState(() =>
    readStorage(STORAGE_KEYS.students, []),
  );
  const [branches, setBranches] = useState(() =>
    readStorage(STORAGE_KEYS.branches, DEFAULT_BRANCHES),
  );
  const [currentUser, setCurrentUser] = useState(null); // Always start logged out on refresh
  const isStudent = currentUser?.role === "student";
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.branches, JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem("smart-counselling-user", JSON.stringify(currentUser));
  }, [currentUser]);

  const dashboardLink = isAdmin ? "/admin" : isStudent ? "/student" : "/";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/notifications", label: "Notifications" },
    { to: "/about", label: "About Us" },
  ];

  const homeStats = [
    { label: "Registered Students", value: students.length },
    { label: "Active Branches", value: Object.keys(branches).length },
    {
      label: "Locked Preferences",
      value: students.filter((student) => student.status === "Locked").length,
    },
    {
      label: "Allocated Results",
      value: students.filter(
        (student) => student.allocated && student.allocated !== "Not Allocated",
      ).length,
    },
  ];

  const studentNavLinks = [
    { to: "/student", label: "Dashboard", icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
    { to: "/student/preferences", label: "Preferences", icon: <ListIcon sx={{ fontSize: 20 }} /> },
    { to: "/student/discover", label: "Discover", icon: <DiscoverIcon sx={{ fontSize: 20 }} /> },
    { to: "/student/result", label: "Result", icon: <FlagIcon sx={{ fontSize: 20 }} /> },
    { to: "/ai", label: "AI Counsellor", icon: <SmartToyIcon sx={{ fontSize: 20 }} /> },
  ];
  const adminNavLinks = [
    { to: "/admin", label: "Dashboard", icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
    { to: "/admin/students", label: "Student List", icon: <PeopleIcon sx={{ fontSize: 20 }} /> },
    { to: "/admin/controls", label: "Controls", icon: <SettingsIcon sx={{ fontSize: 20 }} /> },
  ];

  const roleLinks = isStudent ? studentNavLinks : adminNavLinks;

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#2563eb',
      },
      secondary: {
        main: '#f43f5e',
      },
      background: {
        default: theme === 'dark' ? '#000000' : '#f9fafb',
        paper: theme === 'dark' ? '#0a0a0a' : '#ffffff',
      },
      text: {
        primary: theme === 'dark' ? '#ffffff' : '#111827',
        secondary: theme === 'dark' ? '#a0a0a0' : '#6b7280',
      },
    },
    typography: {
      fontFamily: '"Inter", "Outfit", sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  }), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-base lg:flex font-['Inter'] text-primary">
        {currentUser && (
          <aside className="hidden lg:flex w-80 flex-col p-8 sticky top-0 h-screen overflow-y-auto z-40">
            <div className="flex items-center gap-4 px-2 mb-12">
              <img 
                src={counsellingLogo}
                alt="Rank2Campus" 
                className="h-12 w-12 rounded-2xl object-contain shadow-2xl bg-white border-2 border-white"
              />
              <span className="text-2xl font-black text-primary tracking-tighter font-['Outfit']">rank2campus</span>
            </div>

            <nav className="flex-1 space-y-3">
              {roleLinks.map((link) => {
                const isActive = location.pathname === link.to || (link.to === "/student" && location.pathname === "/student/dashboard");

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/student" || link.to === "/admin"}
                    className={() =>
                      `w-full flex items-center gap-4 px-4 py-4 rounded-[20px] font-bold transition-all duration-300 ${
                        isActive 
                        ? "bg-blue-600 text-white shadow-2xl scale-[1.02]" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                      isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-500"
                    }`}>
                      {link.icon}
                    </span>
                    <span className="text-[15px]">{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-auto space-y-2 pt-8 border-t border-subtle">
              <ThemeToggle showLabel />
              <div className="mb-4 p-5 rounded-[24px] bg-surface-2 border border-subtle shadow-card">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">Authenticated As</p>
                <p className="text-base font-black text-primary capitalize">{currentUser.role}</p>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  navigate("/");
                }}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-[20px] font-bold text-rose-500 hover:bg-rose-500/10 transition-all duration-300 group"
              >
                <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <LogoutIcon sx={{ fontSize: 20 }} />
                </div>
                <span className="text-[15px]">Sign Out</span>
              </button>
            </div>
          </aside>
        )}

        <div className="min-w-0 flex-1 flex flex-col">
          {!currentUser && (
            <header className="sticky top-0 z-50 glass-effect">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
                <Link to="/" className="flex items-center gap-4 group">
                  <img 
                    src={counsellingLogo}
                    alt="Rank2Campus" 
                    className="h-10 w-10 rounded-xl object-contain bg-white transition-transform group-hover:scale-110"
                  />
                  <div>
                    <strong className="block text-2xl font-black text-primary tracking-tighter font-['Outfit']">
                      Rank2Campus
                    </strong>
                  </div>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-black uppercase tracking-widest transition-all ${
                          isActive
                            ? "text-blue-500"
                            : "text-muted hover:text-primary"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <div className="w-12">
                    <ThemeToggle />
                  </div>
                </nav>
              </div>
            </header>
          )}

          <main
            className={
              currentUser ? "p-6 lg:p-12 bg-base min-h-screen" : "flex-1 bg-base"
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  currentUser ? (
                    <Navigate to={isAdmin ? "/admin" : "/student"} replace />
                  ) : (
                    <Login
                      users={users}
                      setUsers={setUsers}
                      students={students}
                      setStudents={setStudents}
                      setCurrentUser={setCurrentUser}
                      stats={homeStats}
                    />
                  )
                }
              />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/student/*"
                element={
                  isStudent ? (
                    <StudentDashboard
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      students={students}
                      setStudents={setStudents}
                      branches={branches}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/admin/*"
                element={
                  isAdmin ? (
                    <AdminDashboard
                      setCurrentUser={setCurrentUser}
                      students={students}
                      setStudents={setStudents}
                      branches={branches}
                      setBranches={setBranches}
                      defaultBranches={DEFAULT_BRANCHES}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/ai"
                element={
                  isStudent ? (
                    <AICounsellor
                      currentUser={currentUser}
                      students={students}
                      branches={branches}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </main>

          {!currentUser && (
            <footer className="mt-8 bg-surface-1 border-t border-subtle py-10 text-primary shadow-premium">
              <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={counsellingLogo}
                      alt="Rank2Campus" 
                      className="h-10 w-10 rounded-xl object-contain bg-white"
                    />
                    <div>
                      <strong className="block text-lg text-primary">Rank2Campus</strong>
                      <span className="block text-sm text-muted">
                        A unified portal for registration, preference locking, and transparent seat allocation.
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                    Student Services
                  </h4>
                  <div className="space-y-2 text-sm text-muted">
                    {navLinks.map((link) => (
                      <a key={link.to} href={link.to} className="block hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                    Contact
                  </h4>
                  <p>Admissions Cell, City Campus, New Delhi 110001</p>
                  <p>support@rank2campus.edu.in</p>
                  <p>+91 1800 123 4567</p>
                </div>
              </div>

              <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-subtle px-4 pt-6 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <span>&copy; 2026 Rank2Campus. All rights reserved.</span>
                <span>Privacy Policy</span>
              </div>
            </footer>
          )}
        </div>
      </div>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
