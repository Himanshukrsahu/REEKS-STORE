'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Sparkles, RefreshCw } from 'lucide-react';
import { apiRequest } from '../../../utils/api';
import { useToastStore } from '../../../store/useToastStore';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }
    if (!token) {
      addToast('Reset token missing from URL.', 'error');
      return;
    }

    setLoading(true);
    try {
      await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password })
      });
      addToast('Password updated successfully. Please login.', 'success');
      router.push('/auth/login');
    } catch (err: any) {
      addToast(err.message || 'Failed to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 relative">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-card-border space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex flex-col items-center space-y-3 mb-4">
            <img src="/logo.jpg" alt="Reeks Store Logo" className="w-24 h-24 rounded-3xl object-cover shadow-md border border-card-border" />
            <span className="text-sm font-bold uppercase tracking-wider text-luxury-purple flex items-center justify-center space-x-1.5">
              <Sparkles size={14} />
              <span>Reeks Store Molecular</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Reset Password</h1>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Specify a new secure cellular passcode to access your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">New Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-foreground/30" />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Verify password..."
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
            <span>Save Password</span>
          </button>
        </form>
      </div>
    </div>
  );
}
