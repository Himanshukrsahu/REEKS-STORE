'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award, Star, Info, ChevronDown, Users, Check, Loader2, Clock, Gift, Trophy, Bell } from 'lucide-react';
import SkinQuiz from '../components/SkinQuiz';
import SkeletonLoader from '../components/SkeletonLoader';
import { apiRequest } from '../utils/api';
import { useToastStore } from '../store/useToastStore';

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});

  const { addToast } = useToastStore();

  // Collaboration Form State
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    brandName: '',
    contactPerson: '',
    brandEmail: '',
    contactNumber: '',
    companyWebsite: '',
    brandCategory: '',
    monthlyMarketingBudget: '',
    expectedDuration: 'Social Media Promotion',
    retailerBudget: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    // Validation
    if (!partnerForm.brandName.trim() || !partnerForm.contactPerson.trim() || !partnerForm.brandEmail.trim() || !partnerForm.contactNumber.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setFormLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/collaborations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brandName: partnerForm.brandName,
          contactPerson: partnerForm.contactPerson,
          brandEmail: partnerForm.brandEmail,
          contactNumber: partnerForm.contactNumber,
          companyWebsite: partnerForm.companyWebsite,
          brandCategory: partnerForm.brandCategory,
          monthlyPromotionBudget: partnerForm.retailerBudget,
          expectedDuration: partnerForm.expectedDuration,
          collaborationType: partnerForm.expectedDuration,
          additionalMessage: partnerForm.message
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong while saving application.');
      }

      setFormSuccess(true);
      addToast('Brand collaboration application submitted successfully!', 'success');
      // Reset form
      setPartnerForm({
        brandName: '',
        contactPerson: '',
        brandEmail: '',
        contactNumber: '',
        companyWebsite: '',
        brandCategory: '',
        monthlyMarketingBudget: '',
        expectedDuration: 'Social Media Promotion',
        retailerBudget: '',
        message: ''
      });
      // Close modal after delay
      setTimeout(() => {
        setShowCollabModal(false);
        setFormSuccess(false);
      }, 2000);
    } catch (err: any) {
      setFormError(err.message || 'Error connecting to server. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    { q: 'How does ReekStore connect brands with creators?', a: 'ReekStore leverages intelligent profiling to match brand campaigns with creators who share similar values, target audience demographics, and creative style.' },
    { q: 'Is there a fee for joining the platform?', a: 'Creating a profile and browsing partners is completely free for both creators and brand representatives. We offer scalable campaign options for active campaigns.' },
    { q: 'How are collaboration expectations managed?', a: 'We provide formal application structures, budget proposals, and messaging details directly in our platform to ensure clean, professional, and transparent partnerships.' },
    { q: 'Can startups with smaller budgets apply?', a: 'Absolutely. ReekStore supports all tier ranges, allowing brands to set flexible retailer promotion budgets tailored specifically to their marketing scale.' }
  ];

  return (
    <div className="aurora-bg min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Floating gradient circles */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-luxury-blue/10 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-1/10 w-80 h-80 rounded-full bg-luxury-purple/5 blur-3xl animate-float pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
                <Sparkles size={12} />
                <span>Habit Building & Rewards</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-foreground">
                Build Better Skincare Habits. <br />
                <span className="bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">Get Rewarded.</span>
              </h1>

              <div className="space-y-4">
                <p className="text-base sm:text-lg font-bold text-foreground/90 leading-relaxed">
                  ReekStore is India's skincare habit platform that helps you stay consistent with your daily skincare routine through reminders, streak tracking, rewards, and trusted brand partnerships.
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  ReekStore is designed to solve the biggest skincare problem—consistency. Many people invest in premium skincare products but struggle to use them regularly. Our platform helps users build healthy skincare habits through personalized routines, daily reminders, streak tracking, and exciting rewards. By staying consistent, users unlock exclusive discounts, offers, and benefits from trusted skincare brands while improving their skincare journey.
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

            {/* Right Column: Illustration Graphic */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan opacity-20 blur-xl group-hover:opacity-35 transition-all duration-500" />
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-foreground/5 border border-card-border shadow-2xl">
                <img
                  src="/hero_dashboard.jpg"
                  alt="SaaS skincare routine tracking dashboard illustration"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
                
                {/* Floating metrics glass pill */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-md flex items-center justify-between shadow-lg">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-luxury-cyan uppercase tracking-widest">Consistency Benchmark</span>
                    <div className="text-sm font-black text-white">🔥 Day 28 Habit Loop Active</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-extrabold border border-emerald-500/20">
                    98% Adherence
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Highlight Cards Section */}
      <section className="py-16 border-y border-card-border bg-background/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Core Engine</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ecosystem Highlights</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Personalized Skincare Routine',
                desc: 'Create customized AM & PM routines matching your skin type.',
                icon: <Users className="text-luxury-blue" size={20} />
              },
              {
                title: 'Daily Reminders',
                desc: 'Stay alert and build consistent application habits easily.',
                icon: <Bell className="text-luxury-purple" size={20} />
              },
              {
                title: 'Streak Tracking',
                desc: 'Watch your streak grow daily and map your active progress.',
                icon: <Trophy className="text-luxury-cyan" size={20} />
              },
              {
                title: 'Rewards & Coupons',
                desc: 'Unlock authentic discount vouchers and rewards for consistency.',
                icon: <Gift className="text-emerald-500" size={20} />
              },
              {
                title: 'Brand Partnerships',
                desc: 'Discover product releases from top collaborating brands.',
                icon: <Award className="text-purple-500" size={20} />
              },
              {
                title: 'Habit Building',
                desc: 'Transform daily skincare into an unstoppable healthy routine.',
                icon: <Clock className="text-luxury-blue" size={20} />
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-card-border hover:border-luxury-purple/30 hover:shadow-lg transition-all space-y-3 cursor-pointer group"
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

      {/* 4. Brand Collaboration Section */}
      <section id="brands" className="py-24 border-t border-card-border relative overflow-hidden bg-foreground/[0.01] scroll-mt-24">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-luxury-purple/5 blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
                <Sparkles size={12} />
                <span>Our Collaborations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Our Brand Partners</h2>
              <p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                We collaborate with trusted skincare brands to reward users for staying consistent with their skincare journey.
              </p>
            </div>

            {/* Featured Brand: SkinInspired */}
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border space-y-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-blue/5 blur-3xl rounded-full" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Brand Info & Highlights */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-3 bg-foreground/5 border border-card-border px-5 py-3 rounded-2xl">
                      <span className="text-lg font-black tracking-widest text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent uppercase">
                        SkinInspired
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-purple bg-luxury-purple/10 px-2 py-0.5 rounded-full border border-luxury-purple/20">
                        Featured Partner
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">Active Clinical Skincare</h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      SkinInspired is a modern skincare brand dedicated to creating high-quality skincare solutions that help people achieve healthier and more confident skin. The brand focuses on carefully selected ingredients, customer satisfaction, and innovative skincare products designed for everyday use.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Premium Quality Products',
                      'Trusted Skincare Solutions',
                      'Customer-Focused',
                      'High-Quality Ingredients',
                      'Growing Community',
                      'Modern Beauty & Wellness'
                    ].map((hl, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-foreground/80">
                        <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Gallery & Banner */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Brand Banner */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-foreground/5 border border-card-border group">
                    <img
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&auto=format&fit=crop&q=80"
                      alt="SkinInspired product formulations shelf banner"
                      className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent flex flex-col justify-end p-6">
                      <span className="text-[10px] font-bold text-luxury-cyan uppercase tracking-widest mb-0.5">Showcase Gallery</span>
                      <h4 className="text-base font-bold text-white tracking-tight">Active Science, Gentle Formulas</h4>
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

            {/* Centered CTA - Partner With ReekStore */}
            <div className="text-center max-w-xl mx-auto space-y-5 pt-8">
              <h3 className="text-2xl font-bold tracking-tight">Partner With ReekStore</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Invite skincare brands to collaborate with ReekStore to promote their products to highly engaged skincare users.
              </p>
              <button
                onClick={() => setShowCollabModal(true)}
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-xs transition-all shadow-md"
              >
                <span>Apply for Brand Collaboration</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. About Section */}
      <section id="about" className="py-24 border-t border-card-border relative overflow-hidden scroll-mt-24">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-luxury-blue/5 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Our Mission & Vision</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About ReekStore</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                At ReekStore, we believe the path to healthy skin starts with consistency. While millions invest in premium skincare formulas, the greatest obstacle to real skin progress isn't buying the wrong products—it's the struggle to use them daily. We are building India's leading skincare habit and rewards platform to solve this.
              </p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Through daily reminders, custom routines, streak tracking, and tangible rewards, we keep users motivated. By partnering with leading skincare brands, users unlock actual coupons and products for completing their daily routines.
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                In the future, we plan to expand this ecosystem to connect users directly with clinical dermatologists, skin clinics, and cosmetic centers, forming a unified network for skincare success.
              </p>
            </div>

            {/* Right: Graphic Layered Image */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-foreground/5 border border-card-border">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=60"
                    alt="Consistent skincare habit tracking"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glass indicator overlay */}
                  <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-md space-y-1 shadow-lg">
                    <span className="text-[10px] font-bold text-luxury-cyan uppercase tracking-wider block">Habits Formed</span>
                    <div className="text-sm font-black text-foreground">🏆 85% Adherence Goal Hit</div>
                  </div>
                </div>
              </div>

              {/* Core Anchors */}
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-3">
                  <div className="inline-flex p-2.5 rounded-xl bg-luxury-blue/10 text-luxury-blue">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">Habit Foundations</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Personalized routine cards, daily clock alerts, and consistency streak analytics keep you locked in.
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-3">
                  <div className="inline-flex p-2.5 rounded-xl bg-luxury-purple/10 text-luxury-purple">
                    <Gift size={18} />
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">Real Brand Rewards</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Collaborate with quality skincare brands to earn exclusive coupons, discounts, and formulation trials.
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-3">
                  <div className="inline-flex p-2.5 rounded-xl bg-luxury-cyan/10 text-luxury-cyan">
                    <Users size={18} />
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">Future Clinical Alliances</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Expanding directly into dermatological clinical consultations, diagnostic centers, and treatment networks.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Team Section */}
      <section id="team" className="py-24 border-t border-card-border bg-foreground/[0.01] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Meet Our Team</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The passionate people building ReekStore and shaping the future of skincare consistency.</h2>
          </div>

          <div className="space-y-12">
            {/* Leadership Row (Founders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  name: 'Alok Kumar Singh',
                  role: 'Founder',
                  img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
                },
                {
                  name: 'Saumya Papnai',
                  role: 'Co-Founder',
                  img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80'
                }
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-8 rounded-3xl border border-luxury-purple/20 shadow-md shadow-luxury-purple/5 flex flex-col items-center text-center space-y-5 hover:border-luxury-purple/40 hover:shadow-lg hover:shadow-luxury-purple/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-luxury-purple/35 bg-foreground/5 relative shadow-inner">
                    <img
                      src={member.img}
                      alt={`Photo of ${member.name}`}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg text-foreground tracking-tight">{member.name}</h3>
                    <div className="inline-flex px-3 py-1 rounded-full bg-luxury-purple/15 text-luxury-purple text-xs font-bold uppercase tracking-wider">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Development & Marketing Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Aarushi Patel',
                  role: 'Developer',
                  img: '/aarushi_profile.jpg'
                },
                {
                  name: 'Himanshu Kumar',
                  role: 'Developer',
                  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
                },
                {
                  name: 'Aditya Sahani',
                  role: 'Developer',
                  img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'
                },
                {
                  name: 'Ujjwal Prasad Kushwaha',
                  role: 'Marketing & Social Media',
                  img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=60'
                }
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-3xl border border-card-border flex flex-col items-center text-center space-y-4 hover:border-foreground/15 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden border border-card-border bg-foreground/5 relative">
                    <img
                      src={member.img}
                      alt={`Photo of ${member.name}`}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground tracking-tight">{member.name}</h3>
                    <div className="text-xs text-foreground/50 font-semibold uppercase tracking-wider">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Common Inquiries</div>
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-card-border overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between text-base font-semibold text-foreground hover:bg-foreground/5 transition-all"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-foreground/50 transition-all ${faqOpen[idx] ? 'transform rotate-180 text-luxury-blue' : ''}`}
                />
              </button>
              {faqOpen[idx] && (
                <div className="px-6 pb-5 text-sm text-foreground/75 leading-relaxed border-t border-foreground/5 pt-4 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Floating Brand Collaboration Popup Modal */}
      {showCollabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative glass-panel p-8 sm:p-10 rounded-3xl border border-card-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">Apply for Brand Collaboration</h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Invite skincare brands to collaborate with ReekStore to promote their products to highly engaged skincare users.
              </p>
            </div>

            {formError && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-semibold text-center">
                {formError}
              </div>
            )}

            {formSuccess && (
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs font-semibold text-center">
                Application submitted successfully! Our team will contact you shortly.
              </div>
            )}

            <form onSubmit={handlePartnerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Brand Name */}
                <div className="space-y-1.5">
                  <label htmlFor="modalBrandName" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Brand Name *</label>
                  <input
                    type="text"
                    id="modalBrandName"
                    required
                    placeholder="e.g. SkinInspired"
                    value={partnerForm.brandName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, brandName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>

                {/* Contact Person Name */}
                <div className="space-y-1.5">
                  <label htmlFor="modalContactPerson" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Contact Person Name *</label>
                  <input
                    type="text"
                    id="modalContactPerson"
                    required
                    placeholder="e.g. Alok Kumar"
                    value={partnerForm.contactPerson}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>

                {/* Official Brand Email */}
                <div className="space-y-1.5">
                  <label htmlFor="modalBrandEmail" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Official Brand Email *</label>
                  <input
                    type="email"
                    id="modalBrandEmail"
                    required
                    placeholder="e.g. partners@brand.com"
                    value={partnerForm.brandEmail}
                    onChange={(e) => setPartnerForm({ ...partnerForm, brandEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>

                {/* Personal Contact Number */}
                <div className="space-y-1.5">
                  <label htmlFor="modalContactNumber" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Personal Contact Number *</label>
                  <input
                    type="tel"
                    id="modalContactNumber"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={partnerForm.contactNumber}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>

                {/* Company Website */}
                <div className="space-y-1.5">
                  <label htmlFor="modalCompanyWebsite" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Company Website</label>
                  <input
                    type="url"
                    id="modalCompanyWebsite"
                    placeholder="e.g. https://brand.com"
                    value={partnerForm.companyWebsite}
                    onChange={(e) => setPartnerForm({ ...partnerForm, companyWebsite: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>

                {/* Brand Category */}
                <div className="space-y-1.5">
                  <label htmlFor="modalBrandCategory" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Brand Category</label>
                  <input
                    type="text"
                    id="modalBrandCategory"
                    placeholder="e.g. Clinical Skincare"
                    value={partnerForm.brandCategory}
                    onChange={(e) => setPartnerForm({ ...partnerForm, brandCategory: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>

                {/* Monthly Promotion Budget */}
                <div className="space-y-1.5">
                  <label htmlFor="modalRetailerBudget" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Monthly Promotion Budget</label>
                  <input
                    type="text"
                    id="modalRetailerBudget"
                    placeholder="e.g. ₹50,000 - ₹200,000"
                    value={partnerForm.retailerBudget}
                    onChange={(e) => setPartnerForm({ ...partnerForm, retailerBudget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>

                {/* Preferred Promotion Duration */}
                <div className="space-y-1.5">
                  <label htmlFor="modalExpectedDuration" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Preferred Promotion Duration</label>
                  <input
                    type="text"
                    id="modalExpectedDuration"
                    placeholder="e.g. 3 Months, 6 Months"
                    value={partnerForm.expectedDuration}
                    onChange={(e) => setPartnerForm({ ...partnerForm, expectedDuration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all"
                  />
                </div>
              </div>

              {/* Additional Message */}
              <div className="space-y-1.5">
                <label htmlFor="modalMessage" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Additional Message</label>
                <textarea
                  id="modalMessage"
                  rows={3}
                  placeholder="Tell us about your brand, products, marketing goals, and collaboration expectations."
                  value={partnerForm.message}
                  onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-xs outline-none transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCollabModal(false)}
                  className="px-5 py-2.5 rounded-full border border-foreground/10 hover:bg-foreground/5 text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 rounded-full bg-foreground text-background font-bold text-xs hover:opacity-90 disabled:opacity-75 disabled:pointer-events-none transition-all flex items-center space-x-2"
                >
                  {formLoading ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
