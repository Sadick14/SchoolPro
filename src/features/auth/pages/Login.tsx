import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from 'lucide-react';
import { useAuth } from '../../../lib/auth';

const DEMO_ACCOUNTS = [
  { label: 'School Admin', email: 'admin@schoolpro.demo', role: 'Operations owner' },
  { label: 'Teacher', email: 'teacher@schoolpro.demo', role: 'Classroom portal' },
  { label: 'Parent', email: 'parent@schoolpro.demo', role: 'Family portal' },
  { label: 'Student', email: 'student@schoolpro.demo', role: 'Learner portal' },
];

const platformHighlights = [
  { icon: <ShieldCheck size={18} />, label: 'Tenant-secure SaaS ERP' },
  { icon: <Smartphone size={18} />, label: 'MoMo-ready finance workflows' },
  { icon: <BarChart3 size={18} />, label: 'GES-ready reporting dashboards' },
];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { signIn, user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError('');

    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }

    if (!password) {
      setFormError('Password is required');
      return;
    }

    await signIn(email.trim(), password);
  };

  const selectDemoAccount = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setFormError('');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 font-sans text-white sm:px-6 lg:px-8">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.8),rgba(2,6,23,1))]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden overflow-hidden bg-slate-900 p-10 lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-blue-500/10" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-lg shadow-amber-500/20">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-tight">SchoolPro<span className="text-amber-300">GH</span></p>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Education ERP</p>
                  </div>
                </div>

                <div className="mt-16 max-w-xl">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">Multi-tenant school operations</p>
                  <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-white">
                    Manage academics, finance, people, and compliance from one command center.
                  </h1>
                  <p className="mt-6 text-base font-medium leading-8 text-slate-300">
                    Professional school management software for Ghanaian institutions: admissions, attendance, fees, payroll, LMS,
                    reporting, transport, hostel, library, clinic, and operator-level tenant controls.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {platformHighlights.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="rounded-xl bg-amber-300/15 p-2 text-amber-200">{item.icon}</div>
                    <span className="text-sm font-bold text-slate-100">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 text-slate-950 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="mx-auto flex min-h-full max-w-xl flex-col justify-center"
            >
              <div className="mb-10 lg:hidden">
                <div className="inline-flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-white">
                    <GraduationCap size={24} />
                  </div>
                  <p className="text-xl font-black tracking-tight">SchoolPro<span className="text-amber-600">GH</span></p>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-100">
                  <CheckCircle2 size={14} /> Secure sign in
                </div>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Welcome back</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                  Sign in to access your school workspace, operator console, and role-based portals.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {(error || formError) && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mt-6 overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 shrink-0" size={18} />
                      <span className="text-sm font-bold">{error || formError}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-black text-slate-700">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@schoolpro.demo"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-black text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex cursor-pointer items-center gap-3 font-bold text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                    />
                    Remember this device
                  </label>
                  <button type="button" className="text-left font-black text-amber-700 hover:text-amber-800 sm:text-right">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!email || !password || loading}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in to workspace'}
                  <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </button>
              </form>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-slate-900">Demo workspaces</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">Select a portal to prefill demo credentials.</p>
                  </div>
                  <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                    <UsersRound size={18} />
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => selectDemoAccount(account.email)}
                      className="rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-amber-300 hover:bg-amber-50"
                    >
                      <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-900">{account.label}</span>
                      <span className="mt-1 block text-xs font-semibold text-slate-500">{account.role}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-xs font-bold text-slate-500">
                  Password for all demo accounts: <span className="font-black text-slate-900">demo123</span>
                </p>
              </div>

              <p className="mt-8 text-center text-xs font-semibold leading-6 text-slate-500">
                By continuing, you agree to SchoolPro GH workspace security, audit logging, and data protection policies.
              </p>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
