'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award, Star, ChevronDown, Users, Check, Clock, Gift, Trophy, Bell } from 'lucide-react';

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      q: 'How does ReekStore help me stay consistent?',
      a: 'ReekStore provides daily AM & PM reminders, interactive streak tracking, and unlocks real reward vouchers from partner brands as you maintain your routine.'
    },
    {
      q: 'Are the brand rewards free to unlock?',
      a: 'Yes! By simply checking off your daily skincare steps and building your streak, you earn points and discount codes redeemable with our brand partners.'
    },
    {
      q: 'How can skincare brands partner with ReekStore?',
      a: 'Skincare brands can reach out directly via our contact channels to collaborate on co-branded rewards and product discovery campaigns.'
    }
  ];

  return (
    <div className="aurora-bg min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-luxury-blue/10 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-1/10 w-80 h-80 rounded-full bg-luxury-purple/5 blur-3xl animate-float pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Subheading */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
                <Sparkles size={12} />
                <span>Habit Building & Rewards</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-foreground">
                Build Better Skincare Habits. <br />
                <span className="bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">
                  Get Rewarded.
                </span>
              </h1>

              <div className="space-y-3 max-w-2xl">
                <p className="text-base sm:text-lg font-bold text-foreground/90 leading-relaxed">
                  ReekStore helps you stay consistent with your daily skincare routine through reminders, streak tracking, rewards, and trusted brand partnerships.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  ReekStore solves skincare consistency. Build healthy daily habits, track your progress streaks, and unlock exclusive rewards from top skincare brands.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#brands"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#brands"
                  className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-foreground/5 font-semibold text-sm tracking-wide transition-all flex items-center justify-center space-x-2 border border-card-border"
                >
                  <span>Explore Brand Partners</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Dashboard Illustration */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan opacity-20 blur-xl group-hover:opacity-35 transition-all duration-500" />
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-foreground/5 border border-card-border shadow-2xl">
                <img
                  src="/hero_dashboard.jpg"
                  alt="ReekStore Skincare Habit Dashboard"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
                
                {/* Floating metrics glass badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-md flex items-center justify-between shadow-lg">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-luxury-cyan uppercase tracking-widest">Consistency Benchmark</span>
                    <div className="text-sm font-black text-white">🔥 Day 28 Habit Loop Active</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/20">
                    98% Adherence
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Feature Cards Section */}
      <section className="py-20 border-y border-card-border bg-background/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Why ReekStore Works</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Simple Tools for Daily Consistency</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Personalized Skincare Routine',
                desc: 'Customized AM & PM routine guidance tailored to your unique skin type.',
                icon: <Users className="text-luxury-blue" size={20} />
              },
              {
                title: 'Daily Reminders',
                desc: 'Timely alerts and gentle notifications to keep your application habit on track.',
                icon: <Bell className="text-luxury-purple" size={20} />
              },
              {
                title: 'Streak Tracking',
                desc: 'Visual streak analytics and milestone counters to celebrate your daily progress.',
                icon: <Trophy className="text-luxury-cyan" size={20} />
              },
              {
                title: 'Rewards & Coupons',
                desc: 'Unlock authentic discount vouchers and rewards as your consistency grows.',
                icon: <Gift className="text-emerald-500" size={20} />
              },
              {
                title: 'Brand Partnerships',
                desc: 'Discover curated formulations and special releases from top skincare brands.',
                icon: <Award className="text-purple-500" size={20} />
              },
              {
                title: 'Habit Building',
                desc: 'Transform your daily skincare into an effortless, lasting healthy routine.',
                icon: <Clock className="text-luxury-blue" size={20} />
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-card-border hover:border-luxury-purple/30 hover:shadow-lg transition-all space-y-3 group cursor-pointer"
              >
                <div className="inline-flex p-2.5 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-sm text-foreground group-hover:text-luxury-purple transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Platform Statistics Section */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-blue/5 via-luxury-purple/5 to-luxury-cyan/5 pointer-events-none" />
          
          {[
            { value: '15,000+', label: 'Active Users', icon: <Users size={16} className="text-luxury-blue" /> },
            { value: '84%', label: 'Daily Streaks', icon: <Trophy size={16} className="text-luxury-purple" /> },
            { value: '12+', label: 'Partner Brands', icon: <Sparkles size={16} className="text-luxury-cyan" /> },
            { value: '25K+', label: 'Rewards Claimed', icon: <Gift size={16} className="text-amber-500" /> }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2 relative z-10 flex flex-col items-center">
              <div className="inline-flex p-2 rounded-lg bg-foreground/5 mb-1">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Brand Partner Section (SkinInspired Showcase Only) */}
      <section id="brands" className="py-24 border-t border-card-border relative overflow-hidden bg-foreground/[0.01] scroll-mt-24">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-luxury-purple/5 blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
              <Sparkles size={12} />
              <span>Our Collaborations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Our Brand Partners</h2>
            <p className="text-sm text-foreground/60 max-w-xl mx-auto leading-relaxed">
              We collaborate with trusted skincare brands to reward users for staying consistent with their skincare journey.
            </p>
          </div>

          {/* Featured Brand Card: SkinInspired */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-blue/5 blur-3xl rounded-full" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Brand Info & Highlights */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-3 bg-foreground/5 border border-card-border px-5 py-2.5 rounded-2xl">
                    <span className="text-lg font-black tracking-widest text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent uppercase">
                      SkinInspired
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-purple bg-luxury-purple/10 px-2 py-0.5 rounded-full border border-luxury-purple/20">
                      Official Partner
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold tracking-tight text-foreground">Active Clinical Skincare</h3>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    SkinInspired is a modern skincare brand dedicated to creating high-quality skincare solutions that help people achieve healthier and more confident skin. The brand focuses on carefully selected active ingredients and innovative formulations.
                  </p>
                </div>

                {/* Highlights Checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Premium Quality Products',
                    'Trusted Skincare Solutions',
                    'Customer-Focused Science',
                    'High-Quality Ingredients'
                  ].map((hl, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-foreground/80">
                      <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="https://skininspired.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-foreground text-background font-bold text-xs hover:opacity-90 transition-all shadow-md"
                  >
                    <span>Visit SkinInspired Website</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* Right Column: Gallery & Banner */}
              <div className="lg:col-span-7 space-y-6">
                {/* Brand Banner */}
                <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-foreground/5 border border-card-border group">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&auto=format&fit=crop&q=80"
                    alt="SkinInspired Formulations Banner"
                    className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex flex-col justify-end p-5">
                    <span className="text-[10px] font-bold text-luxury-cyan uppercase tracking-widest">Brand Showcase</span>
                    <h4 className="text-sm font-bold text-white tracking-tight">Efficacy Meets Active Science</h4>
                  </div>
                </div>

                {/* Gallery Grid (4 Images) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      title: 'Cleanser Gel',
                      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80'
                    },
                    {
                      title: 'Under Arm Serum',
                      img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80'
                    },
                    {
                      title: 'Green Sunscreen',
                      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=80'
                    },
                    {
                      title: 'Barrier Hydration',
                      img: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&auto=format&fit=crop&q=80'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden aspect-square bg-foreground/5 border border-card-border group shadow-sm">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
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

      {/* 5. About Section */}
      <section id="about" className="py-24 border-t border-card-border relative overflow-hidden scroll-mt-24">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-luxury-blue/5 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Concise Mission Content */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Our Mission</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About ReekStore</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                At ReekStore, we believe healthy skin starts with consistency. Most people don't struggle with buying products—they struggle with using them daily. ReekStore provides daily reminders, streak tracking, and rewards to keep you motivated every step of the way.
              </p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                By partnering with trusted skincare brands, users unlock exclusive rewards for completing daily routines while discovering top formulations.
              </p>
            </div>

            {/* Right Column: Layered Graphic & Anchor Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-foreground/5 border border-card-border">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=60"
                    alt="Consistent skincare habit tracking"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-5 left-5 right-5 glass-panel p-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-md space-y-1 shadow-lg">
                    <span className="text-[10px] font-bold text-luxury-cyan uppercase tracking-wider block">Habits Formed</span>
                    <div className="text-xs font-black text-foreground">🏆 85% Adherence Goal Hit</div>
                  </div>
                </div>
              </div>

              {/* Vision Pillars Grid */}
              <div className="space-y-4">
                <div className="glass-panel p-5 rounded-2xl border border-card-border space-y-2">
                  <div className="inline-flex p-2 rounded-xl bg-luxury-blue/10 text-luxury-blue">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="font-extrabold text-xs text-foreground">Habit Foundations</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Personalized routine cards and daily reminders keep your application habit consistent.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-card-border space-y-2">
                  <div className="inline-flex p-2 rounded-xl bg-luxury-purple/10 text-luxury-purple">
                    <Gift size={16} />
                  </div>
                  <h3 className="font-extrabold text-xs text-foreground">Real Brand Rewards</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Earn exclusive discount codes and rewards by maintaining your daily skincare streaks.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-card-border space-y-2">
                  <div className="inline-flex p-2 rounded-xl bg-luxury-cyan/10 text-luxury-cyan">
                    <ShieldCheck size={16} />
                  </div>
                  <h3 className="font-extrabold text-xs text-foreground">Trusted Collaborations</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Connecting users directly with quality formulations from partner skincare brands.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section id="faq" className="py-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Common Inquiries</div>
          <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
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
                  className={`text-foreground/50 transition-all ${faqOpen[idx] ? 'transform rotate-180 text-luxury-blue' : ''}`}
                />
              </button>
              {faqOpen[idx] && (
                <div className="px-6 pb-4 text-xs text-foreground/75 leading-relaxed border-t border-foreground/5 pt-3 animate-fade-in">
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
