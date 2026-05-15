import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, GraduationCap, AlertCircle, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('Email is required');
      return;
    }

    if (!password) {
      setFormError('Password is required');
      return;
    }

    await signIn(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden font-sans p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl w-full z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row">
          {/* Left Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Logo Section */}
                <div className="mb-12">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block w-12 h-12 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg mb-4"
                  >
                    <GraduationCap size={24} className="text-white" />
                  </motion.div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">Create an account</h1>
                  <p className="text-gray-600 text-sm mt-2">Sign up and get 30-day free trial</p>
                </div>

                <AnimatePresence mode="wait">
                  {(error || formError) && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start overflow-hidden"
                    >
                      <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{error || formError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full name</label>
                    <input
                      type="text"
                      placeholder="Amelia Stewart"
                      className="w-full bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amelleborg@22.ggmail.com"
                      className="w-full bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••"
                        className="w-full bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <button
                      type="submit"
                      disabled={!email || !password || loading}
                      className="w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg mt-2"
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </motion.div>
                </form>
              </div>

              {/* Demo Accounts Section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl"
              >
                <p className="text-xs font-semibold text-blue-900 mb-3 uppercase tracking-wide">Demo Accounts (for testing):</p>
                <div className="space-y-2 text-xs text-blue-800">
                  <div className="flex justify-between">
                    <span><strong>School Admin:</strong> admin@schoolpro.demo</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Teacher:</strong> teacher@schoolpro.demo</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Parent:</strong> parent@schoolpro.demo</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Student:</strong> student@schoolpro.demo</span>
                  </div>
                  <div className="pt-2 border-t border-blue-200 text-blue-700 font-medium">Password: demo123</div>
                </div>
              </motion.div>

              {/* Footer Links */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-xs">
                <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">Have any account? Sign in</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">Terms & Conditions</a>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="hidden md:block md:w-1/2 relative min-h-96 md:min-h-auto">
            <img src="/login-hero.jpg" alt="School team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;