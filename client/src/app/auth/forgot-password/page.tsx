'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';
import { apiRequest } from '../../../utils/api';
import { useToastStore } from '../../../store/useToastStore';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      setSuccess(true);
      addToast('Simulated email reset link sent successfully.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to request reset link', 'error');
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
          <h1 className="text-3xl font-extrabold tracking-tight">Forgot Password</h1>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Specify your registered email address to receive password update instructions.
          </p>
        </div>

        {success ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-500">
              Reset recovery instructions sent! Check your developer console logs for simulated links.
            </div>
            <Link href="/auth/login" className="inline-flex items-center space-x-1.5 text-xs text-luxury-blue font-bold hover:underline">
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
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
                <Mail size={16} className="absolute left-3.5 top-3.5 text-foreground/30" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center space-x-1.5"
            >
              {loading ? <RefreshCw size={14} className="animate-spin" /> : null}
              <span>Send Recovery Code</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
