'use client';

import { useToastStore } from '../store/useToastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="glass-panel p-4 rounded-2xl flex items-start space-x-3 shadow-xl border border-card-border animate-[slideIn_0.3s_ease-out] relative"
            role="alert"
          >
            {isSuccess && <CheckCircle className="text-emerald-500 flex-shrink-0" size={18} />}
            {isError && <AlertCircle className="text-red-500 flex-shrink-0" size={18} />}
            {!isSuccess && !isError && <Info className="text-luxury-blue flex-shrink-0" size={18} />}

            <div className="flex-grow text-xs font-semibold text-foreground/90 pr-4">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-3 right-3 text-foreground/40 hover:text-foreground transition-all"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
