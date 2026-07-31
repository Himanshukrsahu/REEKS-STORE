'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="border-t border-card-border bg-background/50 backdrop-blur-md relative overflow-hidden mt-auto">
      {/* Aurora blur dot in footer */}
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-luxury-blue/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <img src="/logo.jpg" alt="Reeks Store Logo" className="w-14 h-14 rounded-xl object-cover border border-card-border shadow-md" />
              <span className="text-xl font-black tracking-tight text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">
                REEKS STORE.
              </span>
            </div>
            <p className="text-sm text-foreground/75 max-w-xs leading-relaxed">
              Swiss-formulated, bio-engineered cellular skincare designed to protect, restore, and illuminate. Elevate your daily routine to molecular perfection.
            </p>
            <div className="text-xs text-foreground/50 space-y-1">
              <div>© {new Date().getFullYear()} Reeks Store Inc. All rights reserved.</div>
              <div className="text-foreground/45 mt-1 select-all font-sans">Contact: reekstore14@gmail.com</div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-4 pt-3">
              <a href="https://www.instagram.com/reeksstore?igsh=cjNqa2wzbmg2ejhp" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-foreground/5 text-foreground/60 hover:text-luxury-purple hover:bg-luxury-purple/10 border border-card-border transition-all" title="Instagram">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://youtube.com/@reeksstore?si=UW8g8dPxfCL9V1l4" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-foreground/5 text-foreground/60 hover:text-red-500 hover:bg-red-500/10 border border-card-border transition-all" title="YouTube">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="10 15 15 12 10 9" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1EbdnpVsXv/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-foreground/5 text-foreground/60 hover:text-luxury-blue hover:bg-luxury-blue/10 border border-card-border transition-all" title="Facebook">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li><Link href="/shop?category=Day Cream" className="hover:text-luxury-blue">Day Care</Link></li>
              <li><Link href="/shop?category=Night Cream" className="hover:text-luxury-blue">Night Recovery</Link></li>
              <li><Link href="/shop?category=Vitamin C Serum" className="hover:text-luxury-blue">Vitamin C Renewal</Link></li>
              <li><Link href="/shop?category=Sunscreen SPF50" className="hover:text-luxury-blue">Sun Protection</Link></li>
            </ul>
          </div>

          {/* Company info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Science & Brand</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li><a href="#dermatologist" className="hover:text-luxury-blue">Dermatologist Approved</a></li>
              <li><a href="#ingredients" className="hover:text-luxury-blue">Our Ingredients</a></li>
              <li><a href="#quiz" className="hover:text-luxury-blue">AI Skin Quiz</a></li>
              <li><a href="#faq" className="hover:text-luxury-blue">FAQ & Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Newsletter</h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              Subscribe to unlock early collections access and receiving dermatologist tips.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-sm text-emerald-500 font-medium bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <CheckCircle size={18} />
                <span>Subscription successful!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  required
                  className="px-4 py-2 text-sm rounded-xl border border-foreground/10 bg-foreground/5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-luxury-blue flex-grow"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-foreground text-background hover:opacity-90 transition-all flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-xs text-foreground/50">
            <Link href="#privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#accessibility" className="hover:text-foreground">Accessibility (WCAG 2.1)</Link>
          </div>
          {/* Payment Badges */}
          <div className="flex items-center space-x-4 opacity-40 grayscale hover:opacity-80 transition-all">
            <span className="text-xs font-bold text-foreground">STRIPE</span>
            <span className="text-xs font-bold text-foreground">RAZORPAY</span>
            <span className="text-xs font-bold text-foreground">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
