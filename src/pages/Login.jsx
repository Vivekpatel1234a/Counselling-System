import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  AutoAwesome as FeatureIcon,
  Timeline as TrendIcon,
  Security as TrustIcon,
  Language as GlobalIcon,
  KeyboardArrowRight as ArrowIcon
} from "@mui/icons-material";

const initialStudentForm = { id: "", password: "" };
const initialAdminForm = { username: "", password: "" };

function Login({ users, setUsers, students, setStudents, setCurrentUser, stats }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [studentForm, setStudentForm] = useState(initialStudentForm);
  const [adminForm, setAdminForm] = useState(initialAdminForm);
  const [error, setError] = useState("");
  // Readonly trick: prevents browser autofill on load
  const [isReadOnly, setIsReadOnly] = useState(true);

  // Force-wipe any browser-autofilled values after component mounts
  useEffect(() => {
    setStudentForm(initialStudentForm);
    setAdminForm(initialAdminForm);
    const timer = setTimeout(() => setIsReadOnly(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event, setForm, field) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const changeTab = (event, newValue) => {
    setActiveTab(newValue);
    setError("");
    setStudentForm(initialStudentForm);
    setAdminForm(initialAdminForm);
    setIsReadOnly(true);
    setTimeout(() => setIsReadOnly(false), 200);
  };

  const handleStudentLogin = (event) => {
    event.preventDefault();
    setError("");
    const id = studentForm.id.trim();
    const password = studentForm.password.trim();
    if (!id || !password) { setError("Please enter student ID and password."); return; }
    const existingUser = users.find((user) => user.id === id);
    if (existingUser && existingUser.password !== password) { setError("Incorrect password for this student ID."); return; }
    if (!existingUser) setUsers((prev) => [...prev, { id, password, role: "student" }]);
    if (!students.some((student) => student.id === id)) {
      setStudents((prev) => [...prev, { id, name: "", rank: "", preferences: [], status: "Draft", allocated: null }]);
    }
    setCurrentUser({ id, role: "student" });
    setStudentForm(initialStudentForm);
    navigate("/student");
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();
    setError("");
    if (adminForm.username === "admin" && adminForm.password === "admin123") {
      setCurrentUser({ id: "admin", role: "admin" });
      setAdminForm(initialAdminForm);
      navigate("/admin");
      return;
    }
    setError("Use admin / admin123 for admin login.");
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      bgcolor: 'var(--bg-surface-1)',
      color: 'var(--text-primary)',
      '& fieldset': { border: '1px solid var(--border-subtle)' },
      '&:hover fieldset': { borderColor: 'var(--border-light)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
    },
    '& .MuiInputBase-input': { color: 'var(--text-primary)' },
    '& .MuiInputBase-input::placeholder': { color: 'var(--text-muted)', opacity: 1 },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px var(--bg-surface-1) inset !important',
      WebkitTextFillColor: 'var(--text-primary) !important',
      caretColor: 'var(--text-primary) !important',
      borderRadius: 'inherit'
    }
  };

  const features = [
    { title: "Discover Best Match", desc: "Simulate your career path using real-world merit data and alumni success stories.", icon: <FeatureIcon sx={{ fontSize: 24 }} />, color: "rgba(37, 99, 235, 0.15)", text: "#3b82f6" },
    { title: "Trend Intelligence", desc: "Stay ahead with verified live updates and cutoff projections for all major branches.", icon: <TrendIcon sx={{ fontSize: 24 }} />, color: "rgba(99, 102, 241, 0.15)", text: "#818cf8" },
    { title: "Trust & Transparency", desc: "A secure, verified portal ensuring meritocratic seat allocation for every student.", icon: <TrustIcon sx={{ fontSize: 24 }} />, color: "rgba(16, 185, 129, 0.15)", text: "#34d399" },
    { title: "Global Reach", desc: "Connect with a global network of alumni representing the world's leading corporations.", icon: <GlobalIcon sx={{ fontSize: 24 }} />, color: "rgba(245, 158, 11, 0.15)", text: "#fbbf24" }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--bg-base)', pb: 12, color: 'var(--text-primary)' }}>
      {/* Hero & Login Section */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: 16, position: 'relative' }}>
        {/* Background glow orbs */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={7}>
              <Box sx={{ pr: { lg: 8 } }}>
                <Chip
                  label="Empowering Academic Journeys"
                  sx={{
                    bgcolor: 'rgba(37, 99, 235, 0.1)',
                    color: '#3b82f6',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    fontSize: '0.7rem',
                    mb: 4,
                    px: 1,
                    border: '1px solid rgba(37, 99, 235, 0.2)'
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', md: '5rem' },
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    lineHeight: 1.1,
                    mb: 3,
                    fontFamily: 'Outfit, sans-serif',
                    letterSpacing: '-0.05em'
                  }}
                >
                  Navigate your Future with <br />
                  <span style={{ color: '#2563eb' }}>Rank2Campus</span>.
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'var(--text-muted)',
                    mb: 8,
                    lineHeight: 1.6,
                    fontWeight: 500,
                    fontSize: '1.2rem',
                    maxWidth: '580px'
                  }}
                >
                  Rank2Campus provides a high-fidelity counseling ecosystem, integrating real-world merit trends with AI-driven branch simulations.
                </Typography>

                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} sm={3} key={stat.label}>
                      <Box sx={{
                        bgcolor: 'var(--bg-surface-1)',
                        p: 3,
                        borderRadius: '24px',
                        border: '1px solid var(--border-subtle)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': { borderColor: 'rgba(37,99,235,0.4)', transform: 'translateY(-4px)' }
                      }}>
                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', bgcolor: index === 3 ? '#10b981' : '#2563eb' }} />
                        <Typography variant="h4" sx={{ fontWeight: 900, color: 'var(--text-primary)', mb: 0.5, fontFamily: 'Outfit' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.62rem', letterSpacing: 0.5, display: 'block' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Card elevation={0} sx={{
                borderRadius: '48px',
                border: '1px solid var(--border-subtle)',
                bgcolor: 'var(--bg-surface-1)',
                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                overflow: 'visible'
              }}>
                <CardContent sx={{ p: { xs: 5, md: 8 } }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>
                    Access Portal
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text-muted)', mb: 6, fontWeight: 500 }}>
                    Enter the smart counseling workspace.
                  </Typography>

                  {error && (
                    <Box sx={{ mb: 3, p: 2, borderRadius: '16px', bgcolor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.85rem', fontWeight: 700 }}>
                      {error}
                    </Box>
                  )}

                  <Tabs
                    value={activeTab}
                    onChange={changeTab}
                    sx={{
                      mb: 5,
                      bgcolor: 'var(--bg-surface-2)',
                      borderRadius: '20px',
                      p: 0.75,
                      border: '1px solid var(--border-subtle)',
                      '& .MuiTabs-indicator': {
                        height: '100%',
                        borderRadius: '16px',
                        bgcolor: 'var(--bg-surface-3)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      },
                      '& .MuiTab-root': {
                        zIndex: 1,
                        minHeight: '52px',
                        textTransform: 'none',
                        fontWeight: 800,
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem',
                        '&.Mui-selected': { color: 'var(--accent)' }
                      }
                    }}
                  >
                    <Tab label="Student" sx={{ flex: 1 }} />
                    <Tab label="Administrator" sx={{ flex: 1 }} />
                  </Tabs>

                  {activeTab === 0 ? (
                    <Box component="form" onSubmit={handleStudentLogin} autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--text-muted)', ml: 1, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Student ID</Typography>
                        <TextField fullWidth name="r2c_uid_x91" id="r2c_uid_x91" placeholder="e.g. STU12345" value={studentForm.id} onChange={(e) => handleChange(e, setStudentForm, 'id')} variant="outlined" sx={inputSx} inputProps={{ autoComplete: 'off', 'aria-label': 'student-id' }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--text-muted)', ml: 1, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Password</Typography>
                        <TextField fullWidth name="r2c_sec_k82" id="r2c_sec_k82" type="password" placeholder="••••••••" value={studentForm.password} onChange={(e) => handleChange(e, setStudentForm, 'password')} variant="outlined" sx={inputSx} inputProps={{ autoComplete: 'off', 'aria-label': 'student-password' }} />
                      </Box>
                      <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: '22px', py: 2.5, fontWeight: 900, fontSize: '1rem', bgcolor: '#2563eb', boxShadow: '0 20px 30px -10px rgba(37,99,235,0.3)', '&:hover': { bgcolor: '#1d4ed8' }, textTransform: 'none' }}>
                        Access Student Portal
                      </Button>
                    </Box>
                  ) : (
                    <Box component="form" onSubmit={handleAdminLogin} autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--text-muted)', ml: 1, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Username</Typography>
                        <TextField fullWidth name="r2c_adm_u47" id="r2c_adm_u47" placeholder="admin" value={adminForm.username} onChange={(e) => handleChange(e, setAdminForm, 'username')} variant="outlined" sx={inputSx} inputProps={{ autoComplete: 'off', 'aria-label': 'admin-username' }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--text-muted)', ml: 1, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Password</Typography>
                        <TextField fullWidth name="r2c_adm_p33" id="r2c_adm_p33" type="password" placeholder="••••••••" value={adminForm.password} onChange={(e) => handleChange(e, setAdminForm, 'password')} variant="outlined" sx={inputSx} inputProps={{ autoComplete: 'off', 'aria-label': 'admin-password' }} />
                      </Box>
                      <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: '22px', py: 2.5, fontWeight: 900, fontSize: '1rem', bgcolor: '#111827', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 30px -10px rgba(0,0,0,0.5)', '&:hover': { bgcolor: '#1f2937' }, textTransform: 'none' }}>
                        Access Control Center
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Feature Cards Section */}
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Box sx={{
                p: 5,
                borderRadius: '40px',
                background: 'var(--bg-surface-1)',
                border: '1px solid var(--border-subtle)',
                height: '100%',
                transition: 'all 0.4s ease',
                '&:hover': {
                  background: 'var(--bg-surface-2)',
                  transform: 'translateY(-10px)',
                  boxShadow: `0 30px 60px -15px rgba(0,0,0,0.1)`,
                  borderColor: feature.text + '44'
                }
              }}>
                <Box sx={{ height: 56, width: 56, borderRadius: '20px', bgcolor: feature.color, color: feature.text, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: 'var(--text-primary)', fontFamily: 'Outfit', fontSize: '1.4rem' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 500, fontSize: '0.95rem' }}>
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA Banner */}
        <Box sx={{
          mt: 12,
          p: { xs: 6, md: 8, lg: 10 },
          borderRadius: '60px',
          background: 'var(--bg-surface-1)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-primary)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 6
        }}>
          <Box sx={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(circle at center, rgba(37,99,235,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, fontFamily: 'Outfit', letterSpacing: '-0.03em' }}>
              Join the Network of Future <br />
              <span style={{ color: '#2563eb' }}>Strategic Leaders.</span>
            </Typography>
            <Typography variant="h6" sx={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '1.1rem' }}>
              Start your journey today with our state-of-the-art counseling tools and verified academic insights.
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              variant="contained"
              size="large"
              endIcon={<ArrowIcon />}
              sx={{ bgcolor: '#2563eb', color: 'white', borderRadius: '20px', px: 6, py: 2.5, fontWeight: 900, textTransform: 'none', fontSize: '1.1rem', boxShadow: '0 20px 40px -10px rgba(37,99,235,0.3)', '&:hover': { bgcolor: '#1d4ed8' } }}
            >
              Register Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
