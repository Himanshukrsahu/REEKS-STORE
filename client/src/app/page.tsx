'use client';

import { useState } from 'react';
import { 
  ArrowRight, Sparkles, ShieldCheck, Zap, Award, Star, ChevronDown, Users, Check, 
  Clock, Gift, Trophy, Bell, Calendar, Flame, Tag, ArrowUpRight, CheckCircle2,
  TrendingUp, Layers, Smartphone, ChevronLeft, ChevronRight, XCircle, SmartphoneNfc,
  Sparkle, SmartphoneCharging, Cpu, Stethoscope, Lightbulb
} from 'lucide-react';

export default function Home() {
  // App Preview Screen State
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  // Single Accordion FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  const appScreens = [
    { id: 'dashboard', label: 'Home Dashboard', icon: '🏠' },
    { id: 'routine', label: 'Daily Routine', icon: '📅' },
    { id: 'progress', label: "Today's Progress", icon: '📊' },
    { id: 'streak', label: 'Streak Tracker', icon: '🔥' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    { id: 'offers', label: 'Brand Offers', icon: '🎟️' },
    { id: 'profile', label: 'User Profile', icon: '👤' }
  ];

  const handlePrevScreen = () => {
    setActiveScreenIndex(prev => (prev === 0 ? appScreens.length - 1 : prev - 1));
  };

  const handleNextScreen = () => {
    setActiveScreenIndex(prev => (prev === appScreens.length - 1 ? 0 : prev + 1));
  };

  const faqs = [
    {
      q: 'Is ReeksStore free?',
      a: 'Yes. The core experience will remain free for all users.'
    },
    {
      q: 'How do rewards work?',
      a: 'Maintain your skincare streak to unlock exclusive offers and rewards from partner brands.'
    },
    {
      q: 'When will the app launch?',
      a: 'The mobile app is currently under development and will be available soon on Google Play Store and Apple App Store.'
    },
    {
      q: 'Which brands partner with ReeksStore?',
      a: 'We collaborate with trusted skincare brands to provide exclusive benefits for our users.'
    },
    {
      q: 'Will premium membership be available?',
      a: 'Yes. Premium memberships will be introduced in the future with additional rewards and exclusive benefits.'
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

              {/* Single Supporting Sentence */}
              <p className="text-base sm:text-lg font-semibold text-foreground/80 leading-relaxed max-w-xl">
                <span className="inline-flex items-center space-x-1 font-light brand-font tracking-[0.18em] text-xs sm:text-sm mr-1"><span className="text-foreground dark:text-white font-normal">REEKS</span><span className="brand-store-gradient font-medium">STORE</span></span> helps you stay consistent with your daily skincare routine through smart reminders, streak tracking, and exclusive brand rewards.
              </p>

              {/* Premium Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#app-preview"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-sm tracking-wide shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>Experience App</span>
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

            {/* Right Column: 3D Visual & 5 Floating UI Cards */}
            <div className="lg:col-span-6 relative">
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

              {/* 1. Daily Streak Floating Card */}
              <div className="absolute -top-4 -left-4 glass-panel p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-3 backdrop-blur-xl animate-float">
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                  <Flame size={20} className="fill-amber-500/30" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Habit Loop</div>
                  <div className="text-xs font-black text-foreground">🔥 28 Day Streak Active</div>
                </div>
              </div>

              {/* 2. Rewards Unlocked Floating Card */}
              <div className="absolute top-1/3 -right-6 glass-panel p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-3 backdrop-blur-xl animate-float [animation-delay:1.5s]">
                <div className="p-2.5 rounded-xl bg-purple-500/15 text-luxury-purple">
                  <Gift size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Reward Status</div>
                  <div className="text-xs font-black text-foreground">🎁 $250 Points Unlocked</div>
                </div>
              </div>

              {/* 3. Daily Reminder Floating Card */}
              <div className="absolute -bottom-4 left-6 glass-panel p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-3 backdrop-blur-xl animate-float [animation-delay:2.5s]">
                <div className="p-2.5 rounded-xl bg-blue-500/15 text-luxury-blue">
                  <Bell size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Daily Alert</div>
                  <div className="text-xs font-black text-foreground">🔔 8:00 PM PM Routine</div>
                </div>
              </div>

              {/* 4. Coupons Code Badge */}
              <div className="absolute bottom-12 -right-4 glass-panel px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center space-x-2 backdrop-blur-xl animate-float [animation-delay:3.5s]">
                <Tag size={14} className="text-luxury-cyan" />
                <span className="text-[11px] font-extrabold text-foreground tracking-wide">🎟️ SkinInspired 20% OFF</span>
              </div>

              {/* 5. Brand Partner Pill */}
              <div className="absolute top-10 left-1/3 glass-panel px-3.5 py-1.5 rounded-full border border-white/20 shadow-md flex items-center space-x-2 backdrop-blur-xl pointer-events-none">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">🤝 Verified Brand Partner</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* NEW SECTION 1: Interactive App Preview */}
      <section id="app-preview" className="py-24 border-t border-card-border relative overflow-hidden scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
              <Smartphone size={12} />
              <span>Interactive Demo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Experience the ReeksStore App</h2>
            <p className="text-xs sm:text-sm text-foreground/60 max-w-xl mx-auto font-medium">
              Explore live mobile screens of our routine tracker, streak monitor, and reward system.
            </p>
          </div>

          {/* Interactive Screen Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-4xl mx-auto">
            {appScreens.map((screen, idx) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreenIndex(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap border ${
                  activeScreenIndex === idx
                    ? 'bg-foreground text-background border-foreground shadow-lg scale-105'
                    : 'glass-panel text-foreground/75 border-card-border hover:bg-foreground/5'
                }`}
              >
                <span>{screen.icon}</span>
                <span>{screen.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Phone Mockup Container */}
          <div className="relative max-w-md mx-auto flex items-center justify-center">
            
            {/* Nav Arrows */}
            <button
              onClick={handlePrevScreen}
              className="absolute -left-12 sm:-left-16 p-3 rounded-full glass-panel border border-card-border text-foreground hover:scale-110 transition-all z-20 shadow-md"
              aria-label="Previous Screen"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={handleNextScreen}
              className="absolute -right-12 sm:-right-16 p-3 rounded-full glass-panel border border-card-border text-foreground hover:scale-110 transition-all z-20 shadow-md"
              aria-label="Next Screen"
            >
              <ChevronRight size={20} />
            </button>

            {/* Smartphone Outer Shell */}
            <div className="w-[300px] sm:w-[340px] h-[600px] rounded-[48px] bg-card-bg border-[8px] border-foreground/20 shadow-2xl p-4 relative flex flex-col justify-between overflow-hidden backdrop-blur-2xl glass-panel animate-float">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-foreground/20 rounded-b-2xl z-30" />

              {/* Dynamic Screen Content */}
              <div className="pt-6 h-full flex flex-col justify-between space-y-4 overflow-y-auto scrollbar-none text-left">
                
                {/* Header inside Phone */}
                <div className="flex items-center justify-between pt-2 border-b border-foreground/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-light brand-font text-xs tracking-wider"><span className="text-foreground font-semibold">REEKS</span><span className="brand-store-gradient">STORE</span></span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Live Demo
                  </span>
                </div>

                {/* Screen Content Switcher */}
                <div className="flex-1 space-y-4 py-2">
                  
                  {activeScreenIndex === 0 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="glass-panel p-4 rounded-2xl border border-card-border space-y-2">
                        <span className="text-[10px] font-bold text-luxury-purple uppercase tracking-widest">Active Routine</span>
                        <h4 className="text-sm font-black text-foreground">Nighttime Radiance Renewal</h4>
                        <div className="w-full bg-foreground/10 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-luxury-purple to-luxury-cyan h-full w-[85%]" />
                        </div>
                        <div className="text-[10px] text-foreground/60 font-semibold text-right">3 of 4 steps completed</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass-panel p-3 rounded-xl border border-card-border space-y-1 text-center">
                          <div className="text-lg">🔥</div>
                          <div className="text-sm font-black text-foreground">28 Days</div>
                          <div className="text-[9px] text-foreground/50 font-bold uppercase">Current Streak</div>
                        </div>
                        <div className="glass-panel p-3 rounded-xl border border-card-border space-y-1 text-center">
                          <div className="text-lg">💎</div>
                          <div className="text-sm font-black text-foreground">1,450</div>
                          <div className="text-[9px] text-foreground/50 font-bold uppercase">Habit Points</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeScreenIndex === 1 && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-xs font-black text-foreground">Today's Skincare Checklist</div>
                      {[
                        { title: 'Hydrating Cleanser Gel', done: true, time: '8:00 AM' },
                        { title: 'Vitamin C 10% Serum', done: true, time: '8:05 AM' },
                        { title: 'Barrier Sunscreen SPF 50', done: true, time: '8:10 AM' },
                        { title: 'Retinol 0.5% Night Oil', done: false, time: '9:30 PM' }
                      ].map((step, i) => (
                        <div key={i} className="glass-panel p-3 rounded-xl border border-card-border flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className={step.done ? 'text-emerald-400' : 'text-foreground/20'} />
                            <span className={`text-xs font-semibold ${step.done ? 'line-through text-foreground/50' : 'text-foreground'}`}>{step.title}</span>
                          </div>
                          <span className="text-[9px] font-mono text-foreground/40">{step.time}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeScreenIndex === 2 && (
                    <div className="space-y-4 animate-fade-in text-center">
                      <div className="text-xs font-black text-foreground text-left">Habit Adherence Score</div>
                      <div className="glass-panel p-6 rounded-2xl border border-card-border flex flex-col items-center justify-center space-y-2">
                        <div className="w-24 h-24 rounded-full border-4 border-luxury-purple flex items-center justify-center text-xl font-black text-foreground bg-luxury-purple/10">
                          96%
                        </div>
                        <div className="text-xs font-bold text-emerald-400">Optimal Skincare Rhythm</div>
                      </div>
                    </div>
                  )}

                  {activeScreenIndex === 3 && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-xs font-black text-foreground">28 Day Streak Heatmap</div>
                      <div className="grid grid-cols-7 gap-1.5 p-3 glass-panel rounded-2xl border border-card-border">
                        {Array.from({ length: 28 }).map((_, i) => (
                          <div
                            key={i}
                            className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-bold ${
                              i < 26 ? 'bg-luxury-purple text-white shadow-sm' : 'bg-foreground/10 text-foreground/40'
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeScreenIndex === 4 && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-xs font-black text-foreground">Unlocked Voucher Rewards</div>
                      <div className="glass-panel p-4 rounded-2xl border border-luxury-purple/30 bg-luxury-purple/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-luxury-purple uppercase">SkinInspired Code</span>
                          <span className="text-xs font-mono font-bold text-foreground">SKIN20</span>
                        </div>
                        <div className="text-sm font-black text-foreground">20% OFF Active Serum</div>
                        <div className="text-[9px] text-foreground/60">Unlocked on 14-Day Streak</div>
                      </div>
                    </div>
                  )}

                  {activeScreenIndex === 5 && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-xs font-black text-foreground">Partner Brand Benefits</div>
                      <div className="glass-panel p-3 rounded-xl border border-card-border flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-foreground">SkinInspired</div>
                          <div className="text-[10px] text-foreground/60">Free Consultation Trial</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-foreground text-background text-[10px] font-bold">Claim</span>
                      </div>
                    </div>
                  )}

                  {activeScreenIndex === 6 && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="glass-panel p-4 rounded-2xl border border-card-border space-y-2 text-center">
                        <div className="w-12 h-12 rounded-full bg-luxury-purple/20 mx-auto flex items-center justify-center text-lg font-bold text-luxury-purple">
                          AP
                        </div>
                        <div className="text-xs font-bold text-foreground">Aarushi Patel</div>
                        <div className="text-[10px] text-foreground/60">Combination & Sensitive Skin</div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Navigation Bar inside Phone */}
                <div className="grid grid-cols-4 gap-1 pt-2 border-t border-foreground/10 text-center">
                  {['🏠', '📅', '🔥', '🎁'].map((icon, i) => (
                    <div key={i} className="text-xs p-1 rounded-lg hover:bg-foreground/5">{icon}</div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* NEW SECTION 2: How ReeksStore Works (Interactive Timeline) */}
      <section className="py-24 border-t border-card-border bg-foreground/[0.01] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
              <Zap size={12} />
              <span>Simple Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">How ReeksStore Works</h2>
          </div>

          {/* 4 Step Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Progress line connector for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan -translate-y-6 z-0 opacity-30" />

            {[
              {
                step: '01',
                title: '📅 Create Your Routine',
                desc: 'Build your personalized skincare routine.',
                icon: <Calendar className="text-luxury-blue" size={22} />
              },
              {
                step: '02',
                title: '⏰ Complete Daily Routine',
                desc: 'Receive reminders and complete your routine every day.',
                icon: <Clock className="text-luxury-purple" size={22} />
              },
              {
                step: '03',
                title: '🔥 Build Your Streak',
                desc: 'Stay consistent and grow your daily streak.',
                icon: <Flame className="text-amber-500" size={22} />
              },
              {
                step: '04',
                title: '🎁 Unlock Rewards',
                desc: 'Earn exclusive offers, discounts, and partner benefits.',
                icon: <Gift className="text-emerald-400" size={22} />
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-card-border space-y-4 hover:border-luxury-purple/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative z-10 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-foreground/20 font-mono">Step {item.step}</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-foreground tracking-tight group-hover:text-luxury-purple transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-foreground/65 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* NEW SECTION 3: Why Choose ReeksStore Comparison */}
      <section className="py-24 border-t border-card-border relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
              <ShieldCheck size={12} />
              <span>Clear Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Why ReeksStore?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: Others */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/20 bg-rose-500/[0.02] space-y-6 hover:border-rose-500/40 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
                  <XCircle size={22} />
                </div>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight">Others</h3>
              </div>

              <div className="space-y-4">
                {[
                  'Only recommend skincare products',
                  'No habit tracking',
                  'No reward system',
                  'No consistency motivation'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-foreground/60">
                    <XCircle size={16} className="text-rose-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: ReeksStore */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.03] space-y-6 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={22} />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight">ReeksStore</h3>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Recommended
                </span>
              </div>

              <div className="space-y-4">
                {[
                  'Personalized skincare routines',
                  'Daily reminders',
                  'Streak tracking',
                  'Real rewards',
                  'Trusted brand partnerships',
                  'Designed to build lasting skincare habits'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm font-bold text-foreground">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* NEW SECTION 4: Future Roadmap */}
      <section className="py-24 border-t border-card-border bg-foreground/[0.01] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
              <Layers size={12} />
              <span>Future Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">What's Coming Next</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Personalized Daily Routine',
                status: 'Completed',
                statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                desc: 'Tailored AM & PM skincare steps.',
                icon: <CheckCircle2 size={20} className="text-emerald-400" />
              },
              {
                title: 'Android App',
                status: 'In Progress',
                statusBg: 'bg-luxury-purple/10 text-luxury-purple border-luxury-purple/20',
                desc: 'Native Android app release.',
                icon: <Smartphone size={20} className="text-luxury-purple" />
              },
              {
                title: 'iOS App',
                status: 'In Progress',
                statusBg: 'bg-luxury-purple/10 text-luxury-purple border-luxury-purple/20',
                desc: 'Native iOS app release.',
                icon: <SmartphoneNfc size={20} className="text-luxury-purple" />
              },
              {
                title: 'Premium Membership',
                status: 'Planned',
                statusBg: 'bg-luxury-blue/10 text-luxury-blue border-luxury-blue/20',
                desc: 'Exclusive VIP rewards tier.',
                icon: <Award size={20} className="text-luxury-blue" />
              },
              {
                title: 'AI Skin Insights',
                status: 'Planned',
                statusBg: 'bg-luxury-blue/10 text-luxury-blue border-luxury-blue/20',
                desc: 'Smart skin analysis engine.',
                icon: <Cpu size={20} className="text-luxury-blue" />
              },
              {
                title: 'Dermatologist Alliances',
                status: 'Planned',
                statusBg: 'bg-luxury-blue/10 text-luxury-blue border-luxury-blue/20',
                desc: 'Direct clinical consultations.',
                icon: <Stethoscope size={20} className="text-luxury-blue" />
              },
              {
                title: 'Smart Product Engine',
                status: 'Planned',
                statusBg: 'bg-luxury-blue/10 text-luxury-blue border-luxury-blue/20',
                desc: 'Personalized ingredient matches.',
                icon: <Lightbulb size={20} className="text-luxury-blue" />
              },
              {
                title: 'More Brand Partners',
                status: 'Planned',
                statusBg: 'bg-luxury-blue/10 text-luxury-blue border-luxury-blue/20',
                desc: 'Expanding partner network.',
                icon: <Tag size={20} className="text-luxury-blue" />
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-card-border space-y-3 hover:border-luxury-purple/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-foreground/5">
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${card.statusBg}`}>
                    {card.status}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-foreground tracking-tight">{card.title}</h3>
                <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Brand Showcase Section */}
      <section id="brands" className="py-24 border-t border-card-border relative overflow-hidden scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
              <Award size={12} />
              <span>Verified Collaborations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Featured Brand Partner</h2>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
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

              <div className="lg:col-span-7 space-y-4">
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

      {/* 6. About Section */}
      <section id="about" className="py-24 border-t border-card-border relative overflow-hidden scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-luxury-blue">Platform Vision</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center justify-center space-x-2">
              <span>About</span>
              <span className="inline-flex items-center space-x-1 font-light brand-font tracking-[0.18em] text-2xl sm:text-3xl"><span className="text-foreground dark:text-white font-normal">REEKS</span><span className="brand-store-gradient font-medium">STORE</span></span>
            </h2>
          </div>

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

      {/* 7. Statistics Section */}
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

      {/* 8. Interactive Single Accordion FAQ Section */}
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
                className="w-full text-left px-6 py-4 flex items-center justify-between text-sm font-bold text-foreground hover:bg-foreground/5 transition-all"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-foreground/50 transition-all ${openFaqIndex === idx ? 'transform rotate-180 text-luxury-purple' : ''}`}
                />
              </button>
              {openFaqIndex === idx && (
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
