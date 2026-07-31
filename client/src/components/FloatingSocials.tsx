'use client';

export default function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 p-1.5 rounded-full bg-background/60 backdrop-blur-lg border border-card-border shadow-xl shadow-foreground/5 animate-fade-in">
      <a
        href="https://www.instagram.com/reeksstore?igsh=cjNqa2wzbmg2ejhp"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-foreground/5 text-foreground/75 hover:text-luxury-purple hover:bg-luxury-purple/10 transition-all hover:scale-110"
        title="Instagram"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </a>
      <a
        href="https://youtube.com/@reeksstore?si=UW8g8dPxfCL9V1l4"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-foreground/5 text-foreground/75 hover:text-red-500 hover:bg-red-500/10 transition-all hover:scale-110"
        title="YouTube"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
          <polygon points="10 15 15 12 10 9" fill="currentColor"/>
        </svg>
      </a>
      <a
        href="https://www.facebook.com/share/1EbdnpVsXv/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-foreground/5 text-foreground/75 hover:text-luxury-blue hover:bg-luxury-blue/10 transition-all hover:scale-110"
        title="Facebook"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </a>
    </div>
  );
}
