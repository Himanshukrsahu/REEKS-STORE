'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Sparkles, RefreshCw, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { apiRequest } from '../../../utils/api';
import { useAuthStore } from '../../../store/useAuthStore';
import { useToastStore } from '../../../store/useToastStore';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, token } = useAuthStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    // If already logged in, redirect
    if (token) {
      router.push(redirect);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      login(data, data.token);
      addToast(`Welcome back, ${data.name}!`, 'success');
      router.push(redirect);
    } catch (err: any) {
      addToast(err.message || 'Login failed. Verify credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const googlePayload = {
        email: 'google_dev@reeksstore.com',
        name: 'Google Developer User'
      };
      
      const data = await apiRequest('/auth/google-login', {
        method: 'POST',
        body: JSON.stringify(googlePayload)
      });

      login(data, data.token);
      addToast(`Signed in with Google as ${data.name}!`, 'success');
      router.push(redirect);
    } catch (err: any) {
      addToast('Google login simulation failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-luxury-blue/5 to-luxury-purple/5 blur-3xl pointer-events-none" />

      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-card-border space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex flex-col items-center space-y-3 mb-4">
            <img src="/logo.jpg" alt="Reeks Store Logo" className="w-24 h-24 rounded-3xl object-cover shadow-md border border-card-border" />
            <span className="text-sm font-bold uppercase tracking-wider text-luxury-purple flex items-center justify-center space-x-1.5">
              <Sparkles size={14} />
              <span>Reeks Store Molecular</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Access Account</h1>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Enter your credentials to manage addresses, routines, and order lists.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. user@reeksto.com"
                className="w-full pl-10 pr-4 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
              />
              <Mail size={16} className="absolute left-3.5 top-3 text-foreground/30" />
            </div>
          </div>

          <div className="space-y-1 relative">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Password</label>
              <Link href="/auth/forgot-password" className="text-[10px] text-luxury-blue hover:underline font-bold">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-10 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
              />
              <Lock size={16} className="absolute left-3.5 top-3 text-foreground/30" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-foreground/30 hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-xs text-foreground/75 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-foreground/10 text-luxury-blue focus:ring-luxury-blue"
              />
              <span>Remember Me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center space-x-1.5"
          >
            {loading ? <RefreshCw size={14} className="animate-spin" /> : null}
            <span>Login Securely</span>
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-foreground/5"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-foreground/40 uppercase tracking-wider">or continue with</span>
          <div className="flex-grow border-t border-foreground/5"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl border border-foreground/10 hover:bg-foreground/5 font-semibold text-xs transition-all flex items-center justify-center space-x-2 bg-transparent text-foreground"
        >
          <ShieldCheck size={14} className="text-luxury-blue" />
          <span>Simulated Google Account</span>
        </button>

        <p className="text-xs text-center text-foreground/70">
          New to cellular skincare?{' '}
          <Link href="/auth/register" className="text-luxury-blue font-bold hover:underline">
            Register Account
          </Link>
        </p>
      </div>
    </div>
  );
}
