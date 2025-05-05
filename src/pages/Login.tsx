import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, School, AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/auth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <School size={40} className="text-primary-800" />
            <h1 className="text-2xl font-bold ml-2 text-primary-800">SchoolMS</h1>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
            Sign in to your account
          </h2>

          {(error || formError) && (
            <div className="bg-error-50 border border-error-100 text-error-700 px-4 py-3 rounded-md mb-4 flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error || formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              leftIcon={<Mail size={18} />}
              autoComplete="email"
              required
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              leftIcon={<Lock size={18} />}
              autoComplete="current-password"
              required
            />

            <Button
              type="submit"
              className="w-full mt-4"
              isLoading={loading}
              disabled={!email || !password}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Having trouble signing in? Contact your administrator.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              <span className="opacity-75">Offline mode available when signed in.</span>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SchoolMS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;