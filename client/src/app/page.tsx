'use client';

import { useState } from 'react';
import { 
  ArrowRight, Sparkles, ShieldCheck, Zap, Award, Star, ChevronDown, Users, Check, 
  Clock, Gift, Trophy, Bell, Calendar, Flame, Tag, Compass, ArrowUpRight, CheckCircle2,
  TrendingUp, Layers, Heart
} from 'lucide-react';

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      q: 'How does REEKS STORE help me stay consistent?',
      a: 'REEKS STORE provides automated AM & PM reminders, visual streak tracking, and rewards you for keeping your daily skincare routine active.'
    },
    {
      q: 'Are the brand rewards free to unlock?',
      a: 'Yes! Simply check off your daily routine, maintain your consistency streak, and unlock exclusive vouchers from partner brands.'
    },
    {
      q: 'How can skincare brands collaborate with REEKS STORE?',
      a: 'Skincare brands can join our partner network to feature their formulations directly to thousands of consistent skincare users.'
    }
  ];

  return (
    <div className="aurora-bg min-h-screen">
      
      {/* 1. Hero Section (Hyper-Minimal & Visual First) */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Ambient Gradient Blur Orbs */}
        <div className="absolute top-1/4 left-1/10 w-[30rem] h-[30rem] rounded-full bg-luxury-purple/15 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-1/10 w-[24rem] h-[24rem] rounded-full bg-luxury-blue/10 blur-3xl animate-float pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Minimal Text & Actions */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20 shadow-sm">
                <Sparkles size={12} />
                <span>Next-Gen Skincare Habits</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-foreground">
                Build Better Skincare Habits. <br />
                <span className="brand-store-gradient">
                  Get Rewarded.
                </span>
              </h1>

              {/* Single Supporting Sentence (Minimal & Direct) */}
              <p className="text-base sm:text-lg font-semibold text-foreground/80 leading-relaxed max-w-xl">
                <span className="inline-flex items-center space-x-1 font-light brand-font tracking-[0.18em] text-xs sm:text-sm mr-1"><span className="text-foreground dark:text-white font-normal">REEKS</span><span className="brand-store-gradient font-medium">STORE</span></span> helps you stay consistent with your daily skincare routine through smart reminders, streak tracking, and exclusive brand rewards.
              </p>

              {/* Premium Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#brands"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-sm tracking-wide shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#brands"
                  className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-foreground/5 font-semibold text-sm tracking-wide transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 border border-card-border"
                >
                  <span>Explore Brand Partners</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Visual & Floating SaaS UI Cards */}
            <div className="lg:col-span-6 relative">
              
              {/* Outer Glow Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-luxury-purple via-luxury-blue to-luxury-cyan opacity-25 blur-2xl animate-pulse pointer-events-none" />

              {/* Main Visual Image Container */}
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-foreground/5 border border-card-border shadow-2xl">
                <img
                  src="/hero_dashboard.jpg"
                  alt="REEKS STORE Skincare Habit Platform"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating UI Widget 1: Daily Streak */}
              <div className="absolute -top-4 -left-4 glass-panel p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-3 backdrop-blur-xl animate-float">
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                  <Flame size={20} className="fill-amber-500/30" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Habit Loop</div>
                  <div className="text-xs font-black text-foreground">🔥 28 Day Streak Active</div>
                </div>
              </div>

              {/* Floating UI Widget 2: Rewards Unlocked */}
              <div className="absolute top-1/3 -right-6 glass-panel p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-3 backdrop-blur-xl animate-float [animation-delay:1.5s]">
                <div className="p-2.5 rounded-xl bg-purple-500/15 text-luxury-purple">
                  <Gift size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Reward Status</div>
                  <div className="text-xs font-black text-foreground">🎁 $250 Points Unlocked</div>
                </div>
              </div>

              {/* Floating UI Widget 3: Reminder Alert */}
              <div className="absolute -bottom-4 left-6 glass-panel p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-3 backdrop-blur-xl animate-float [animation-delay:2.5s]">
                <div className="p-2.5 rounded-xl bg-blue-500/15 text-luxury-blue">
                  <Bell size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Daily Alert</div>
                  <div className="text-xs font-black text-foreground">🔔 8:00 PM PM Routine</div>
                </div>
              </div>

              {/* Floating UI Widget 4: Brand Partner Code Badge */}
              <div className="absolute bottom-12 -right-4 glass-panel px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center space-x-2 backdrop-blur-xl">
                <Tag size={14} className="text-luxury-cyan" />
                <span className="text-[11px] font-extrabold text-foreground tracking-wide">🎟️ SkinInspired 20% OFF</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Features Section (Minimal Bento Cards with 1-Line Descriptions) */}
      <section className="py-24 border-y border-card-border bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-luxury-purple">Core Ecosystem</div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Everything You Need for Skin Consistency</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Calendar className="text-luxury-blue" size={22} />,
                title: '📅 Daily Routine',
                desc: 'Stay consistent with custom AM & PM skincare steps every day.'
              },
              {
                icon: <Flame className="text-amber-500" size={22} />,
                title: '🔥 Build Streaks',
                desc: 'Maintain your daily skincare habit and watch your streak grow.'
              },
              {
                icon: <Gift className="text-luxury-purple" size={22} />,
                title: '🎁 Earn Rewards',
                desc: 'Unlock exclusive brand offers and vouchers for staying on track.'
              },
              {
                icon: <Trophy className="text-luxury-cyan" size={22} />,
                title: '🏆 Brand Partnerships',
                desc: 'Claim rewards and products from verified, trusted skincare brands.'
              },
              {
                icon: <Bell className="text-emerald-500" size={22} />,
                title: '🔔 Smart Reminders',
                desc: 'Timely automated notifications so you never miss your routine.'
              },
              {
                icon: <TrendingUp className="text-purple-400" size={22} />,
                title: '📊 Habit Analytics',
                desc: 'Visual progress metrics tracking your long-term skin adherence.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-panel p-7 rounded-3xl border border-card-border hover:border-luxury-purple/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer space-y-3"
              >
                <div className="p-3 rounded-2xl bg-foreground/5 w-fit group-hover:bg-foreground/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-extrabold text-base text-foreground group-hover:text-luxury-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-foreground/65 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Brand Showcase Section (Visual-First, Concise Content) */}
      <section id="brands" className="py-24 border-b border-card-border relative overflow-hidden scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
              <Award size={12} />
              <span>Verified Collaborations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Featured Brand Partner</h2>
          </div>

          {/* Featured Brand Card: SkinInspired */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Concise Brand Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-3 bg-foreground/5 border border-card-border px-5 py-2.5 rounded-2xl">
                    <span className="text-lg font-black tracking-widest text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent uppercase">
                      SkinInspired
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Official Partner
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">Active Clinical Formulations</h3>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-medium">
                    SkinInspired is a modern skincare brand dedicated to high-performance, dermatologist-crafted formulas designed for everyday skin health.
                  </p>
                </div>

                {/* Brand Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {[
                    'Dermatologist Tested',
                    'Active Ingredients',
                    'Cruelty Free',
                    'Fast Absorption'
                  ].map((hl, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-foreground/80">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="https://skininspired.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-foreground text-background font-bold text-xs hover:opacity-90 transition-all hover:scale-[1.02] shadow-md"
                  >
                    <span>Visit SkinInspired Website</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Product Showcase */}
              <div className="lg:col-span-7 space-y-4">
                {/* Main Banner */}
                <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-foreground/5 border border-card-border group">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&auto=format&fit=crop&q=80"
                    alt="SkinInspired Formulations Banner"
                    className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[10px] font-bold text-luxury-cyan uppercase tracking-widest">Brand Showcase</span>
                    <h4 className="text-sm font-bold text-white tracking-tight">Active Science for Daily Radiance</h4>
                  </div>
                </div>

                {/* 4 Product Gallery Images */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { title: 'Cleanser Gel', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80' },
                    { title: 'Under Arm Serum', img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80' },
                    { title: 'Green Sunscreen', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=80' },
                    { title: 'Barrier Hydration', img: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&auto=format&fit=crop&q=80' }
                  ].map((item, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden aspect-square bg-foreground/5 border border-card-border group shadow-sm">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                        <span className="text-[10px] font-extrabold text-foreground uppercase tracking-wider">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. About Section (Problem ➔ Solution ➔ Rewards ➔ Vision Flow) */}
      <section id="about" className="py-24 border-b border-card-border relative overflow-hidden scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-luxury-blue">Platform Vision</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center justify-center space-x-2">
              <span>About</span>
              <span className="inline-flex items-center space-x-1 font-light brand-font tracking-[0.18em] text-2xl sm:text-3xl"><span className="text-foreground dark:text-white font-normal">REEKS</span><span className="brand-store-gradient font-medium">STORE</span></span>
            </h2>
          </div>

          {/* 4 Step Problem ➔ Solution ➔ Rewards ➔ Vision Card Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                badge: 'The Problem',
                badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                title: 'The Consistency Gap',
                desc: 'Millions buy premium skincare products, but 85% fail to get results due to lack of daily application consistency.',
                icon: <Clock size={20} className="text-rose-400" />
              },
              {
                step: '02',
                badge: 'The Solution',
                badgeBg: 'bg-luxury-blue/10 text-luxury-blue border-luxury-blue/20',
                title: 'Routine Automation',
                desc: 'REEKS STORE transforms routines into daily habits through automated alerts, checklists, and streak tracking.',
                icon: <Zap size={20} className="text-luxury-blue" />
              },
              {
                step: '03',
                badge: 'The Rewards',
                badgeBg: 'bg-purple-500/10 text-luxury-purple border-purple-500/20',
                title: 'Tangible Incentives',
                desc: 'Unlock exclusive discount vouchers, product trials, and rewards from verified partner skincare brands.',
                icon: <Gift size={20} className="text-luxury-purple" />
              },
              {
                step: '04',
                badge: 'The Vision',
                badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                title: 'Unified Ecosystem',
                desc: 'Expanding into a holistic network connecting daily habits, partner brands, and clinical dermatological care.',
                icon: <Layers size={20} className="text-emerald-400" />
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-card-border space-y-4 hover:border-foreground/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${card.badgeBg}`}>
                    {card.badge}
                  </span>
                  <span className="text-2xl font-black text-foreground/15 font-mono">{card.step}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-foreground/5 w-fit">
                    {card.icon}
                  </div>
                  <h3 className="font-extrabold text-base text-foreground tracking-tight">{card.title}</h3>
                  <p className="text-xs text-foreground/65 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Statistics Section (Glassmorphic Counters) */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-card-border grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-blue/5 via-luxury-purple/5 to-luxury-cyan/5 pointer-events-none" />
          
          {[
            { value: '10K+', label: 'Future Users', icon: <Users size={18} className="text-luxury-blue" /> },
            { value: '100+', label: 'Brand Partners', icon: <Award size={18} className="text-luxury-purple" /> },
            { value: '365', label: 'Habit Days', icon: <Calendar size={18} className="text-luxury-cyan" /> },
            { value: '∞', label: 'Growth Vision', icon: <TrendingUp size={18} className="text-emerald-400" /> }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2 relative z-10 flex flex-col items-center">
              <div className="p-2.5 rounded-xl bg-foreground/5 mb-1">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight font-sans">
                {stat.value}
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-foreground/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section id="faq" className="py-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-luxury-purple">Common Inquiries</div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-card-border overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between text-sm font-semibold text-foreground hover:bg-foreground/5 transition-all"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-foreground/50 transition-all ${faqOpen[idx] ? 'transform rotate-180 text-luxury-purple' : ''}`}
                />
              </button>
              {faqOpen[idx] && (
                <div className="px-6 pb-4 text-xs text-foreground/75 leading-relaxed border-t border-foreground/5 pt-3 animate-fade-in font-medium">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
