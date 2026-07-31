'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Sparkles, RefreshCw } from 'lucide-react';
import { apiRequest } from '../../../utils/api';
import { useAuthStore } from '../../../store/useAuthStore';
import { useToastStore } from '../../../store/useToastStore';

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });

      login(data, data.token);
      addToast('Registration successful! Verification email sent (simulated).', 'success');
      router.push('/dashboard');
    } catch (err: any) {
      addToast(err.message || 'Registration failed. Try again.', 'error');
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
          <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Create an account to start tracking cellular skincare routines.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Recipient Name"
                className="w-full pl-10 pr-4 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
              />
              <User size={16} className="absolute left-3.5 top-3.5 text-foreground/30" />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. user@reeksstore.com"
                className="w-full pl-10 pr-4 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-foreground/30" />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Secure Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters..."
                className="w-full pl-10 pr-4 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-foreground/30" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center space-x-1.5"
          >
            {loading ? <RefreshCw size={14} className="animate-spin" /> : null}
            <span>Register Account</span>
          </button>
        </form>

        <p className="text-xs text-center text-foreground/70">
          Already registered?{' '}
          <Link href="/auth/login" className="text-luxury-blue font-bold hover:underline">
            Login Account
          </Link>
        </p>
      </div>
    </div>
  );
}
