import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  UsersRound,
  BarChart3,
} from 'lucide-react';

import { useAuth } from '../../shared/lib/auth';

const DEMO_ACCOUNTS = [
  { label: 'System Operator', email: 'operator@schoolpro.demo', password: 'demo123' },
  { label: 'School Admin', email: 'admin@schoolpro.demo', password: 'demo123' },
  { label: 'Teacher', email: 'teacher@schoolpro.demo', password: 'demo123' },
  { label: 'Parent', email: 'parent@schoolpro.demo', password: 'demo123' },
  { label: 'Student', email: 'student@schoolpro.demo', password: 'demo123' },
];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [formError, setFormError] = useState('');

  const { signIn, user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Email and password are required');
      return;
    }

    await signIn(email.trim(), password);
  };

  const fillDemo = (account: typeof DEMO_ACCOUNTS[number]) => {
    setEmail(account.email);
    setPassword(account.password);
    setFormError('');
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-slate-950 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* CENTER WRAPPER */}
      <div className="relative flex h-full w-full items-center justify-center px-4">

        <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl lg:grid-cols-2">

          {/* LEFT PANEL */}
          <section className="hidden lg:flex flex-col justify-between p-10 bg-slate-900">

            <div>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-amber-400 text-slate-900">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <p className="font-black text-lg">SchoolProGH</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">
                    Education ERP
                  </p>
                </div>
              </div>

              <h1 className="mt-10 text-3xl font-black leading-tight">
                Unified school management system
              </h1>

              <p className="mt-4 text-sm text-slate-300 leading-6">
                Multi-tenant SaaS platform for academics, finance, attendance, payroll, LMS, and compliance.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: <ShieldCheck size={16} />, text: 'Secure multi-tenant architecture' },
                { icon: <Smartphone size={16} />, text: 'MoMo & finance integration' },
                { icon: <BarChart3 size={16} />, text: 'Real-time analytics dashboards' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="text-amber-300">{item.icon}</div>
                  <span className="text-sm font-semibold text-slate-200">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="flex items-center justify-center bg-white px-6 py-10 text-slate-900">

            <div className="w-full max-w-md">

              {/* HEADER */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={14} />
                  Secure login
                </div>

                <h2 className="mt-5 text-3xl font-black">Welcome back</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Sign in to your school workspace
                </p>
              </div>

              {/* ERROR */}
              <AnimatePresence>
                {(error || formError) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 flex gap-2"
                  >
                    <AlertCircle size={16} />
                    {error || formError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                {/* EMAIL */}
                <div>
                  <label className="text-sm font-bold">Email</label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-amber-400"
                      placeholder="admin@school.com"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-sm font-bold">Password</label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none focus:border-amber-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-slate-900 py-3 text-sm font-black text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                  <ArrowRight className="ml-2 inline" size={16} />
                </button>
              </form>

              {/* DEMO ACCOUNTS */}
              <div className="mt-6 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowDemo(!showDemo)}
                  className="w-full text-left text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900"
                >
                  {showDemo ? 'Hide demo accounts' : 'Use demo accounts'}
                </button>

                <AnimatePresence>
                  {showDemo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2 overflow-hidden"
                    >
                      {DEMO_ACCOUNTS.map((acc) => (
                        <button
                          key={acc.email}
                          type="button"
                          onClick={() => fillDemo(acc)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:border-amber-300 hover:bg-amber-50"
                        >
                          <p className="text-xs font-black text-slate-900">
                            {acc.label}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {acc.email}
                          </p>
                        </button>
                      ))}

                      <p className="text-[11px] font-semibold text-slate-400">
                        Password: <span className="font-black text-slate-700">demo123</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FOOTNOTE */}
              <p className="mt-6 text-center text-xs text-slate-400">
                Secure multi-tenant authentication with audit logging
              </p>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Login;