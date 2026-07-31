'use client';

export default function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-foreground/5 rounded-2xl relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}
