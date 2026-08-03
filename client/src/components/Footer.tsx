'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background/50 backdrop-blur-md relative overflow-hidden mt-auto">
      {/* Aurora blur dot in footer */}
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-luxury-blue/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Column 1: Logo & Tagline (Colspan 4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <img src="/logo.jpg" alt="ReekStore Logo" className="w-12 h-12 rounded-xl object-cover border border-card-border shadow-md" />
              <span className="text-xl font-light brand-font tracking-[0.2em] flex items-center space-x-1.5">
                <span className="text-foreground dark:text-white font-normal">REEKS</span>
                <span className="brand-store-gradient font-medium">STORE</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed max-w-sm">
              Building better skincare habits through consistency, rewards, and trusted brand partnerships.
            </p>
          </div>

          {/* Column 2: Quick Links (Colspan 3) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-foreground/70">
              <li>
                <Link href="/" className="hover:text-luxury-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#brands" className="hover:text-luxury-blue transition-colors">Brand Partners</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-luxury-blue transition-colors">About</Link>
              </li>
              <li>
                <a href="mailto:reekstore14@gmail.com" className="hover:text-luxury-blue transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Follow Us (Colspan 3) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Contact Us</h3>
            <div className="text-xs sm:text-sm font-semibold text-foreground/70">
              <a href="mailto:reekstore14@gmail.com" className="hover:text-luxury-blue transition-colors break-all">
                reekstore14@gmail.com
              </a>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Follow Us</h4>
              <div className="flex items-center space-x-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/reeksstore?igsh=cjNqa2wzbmg2ejhp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-foreground/5 text-foreground/60 hover:text-luxury-purple hover:bg-luxury-purple/10 border border-card-border transition-all"
                  title="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                
                {/* YouTube */}
                <a
                  href="https://youtube.com/@reeksstore?si=UW8g8dPxfCL9V1l4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-foreground/5 text-foreground/60 hover:text-red-500 hover:bg-red-500/10 border border-card-border transition-all"
                  title="YouTube"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                    <polygon points="10 15 15 12 10 9" fill="currentColor"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1EbdnpVsXv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-foreground/5 text-foreground/60 hover:text-luxury-blue hover:bg-luxury-blue/10 border border-card-border transition-all"
                  title="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Suggestions & Feedback (Colspan 2) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-cyan">Suggestions & Feedback</h3>
            <p className="text-[11px] text-foreground/60 leading-relaxed">
              Have an idea or feedback to make ReekStore better? We'd love to hear from you!
            </p>
            <a
              href="mailto:reekstore14@gmail.com"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 transition-all shadow-sm"
            >
              Send Feedback
            </a>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
          <div>
            © 2026 ReekStore. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
