'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, XCircle } from 'lucide-react';
import { apiRequest } from '../../../utils/api';
import { useToastStore } from '../../../store/useToastStore';

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToastStore();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        await apiRequest(`/auth/verify?token=${token}`);
        setSuccess(true);
        addToast('Email verified successfully! You can login now.', 'success');
      } catch (err: any) {
        console.error(err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  return (
    <div className="mx-auto max-w-md px-4 py-28 text-center space-y-6">
      {loading ? (
        <div className="flex flex-col items-center space-y-3">
          <RefreshCw className="animate-spin text-luxury-blue" size={32} />
          <p className="text-sm font-semibold">Verifying your signature...</p>
        </div>
      ) : success ? (
        <div className="glass-panel p-8 rounded-3xl border border-card-border space-y-6 animate-scale-up">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mx-auto">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-2xl font-black">Verification Complete</h1>
          <p className="text-xs text-foreground/75 leading-relaxed">
            Your molecular cellular account is fully authorized. You can sign in using your credentials.
          </p>
          <Link href="/auth/login" className="inline-block w-full py-3 rounded-xl bg-foreground text-background font-bold text-xs">
            Login Securely
          </Link>
        </div>
      ) : (
        <div className="glass-panel p-8 rounded-3xl border border-card-border space-y-6">
          <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 mx-auto">
            <XCircle size={40} />
          </div>
          <h1 className="text-2xl font-black">Verification Failed</h1>
          <p className="text-xs text-foreground/75 leading-relaxed">
            The verification token provided is invalid or has expired. Request a new verification token from profile settings.
          </p>
          <Link href="/auth/login" className="inline-block w-full py-3 rounded-xl border border-foreground/10 text-foreground font-bold text-xs">
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}
