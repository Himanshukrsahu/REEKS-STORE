'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award, Star, Info, ChevronDown, Users, Check, Loader2 } from 'lucide-react';
import SkinQuiz from '../components/SkinQuiz';
import SkeletonLoader from '../components/SkeletonLoader';
import { apiRequest } from '../utils/api';
import { useToastStore } from '../store/useToastStore';

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});

  const { addToast } = useToastStore();

  // Collaboration Form State
  const [partnerForm, setPartnerForm] = useState({
    brandName: '',
    contactPerson: '',
    brandEmail: '',
    contactNumber: '',
    companyWebsite: '',
    brandCategory: '',
    monthlyMarketingBudget: '',
    expectedDuration: '',
    collaborationType: 'Social Media Promotion',
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

    // Basic Validation
    if (!partnerForm.brandName.trim()) {
      setFormError('Brand Name is required.');
      return;
    }
    if (!partnerForm.contactPerson.trim()) {
      setFormError('Contact Person Name is required.');
      return;
    }
    if (!partnerForm.brandEmail.trim() || !partnerForm.brandEmail.includes('@')) {
      setFormError('A valid Official Brand Email is required.');
      return;
    }
    if (!partnerForm.contactNumber.trim()) {
      setFormError('Personal Contact Number is required.');
      return;
    }

    setFormLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      // Reset form
      setPartnerForm({
        brandName: '',
        contactPerson: '',
        brandEmail: '',
        contactNumber: '',
        companyWebsite: '',
        brandCategory: '',
        monthlyMarketingBudget: '',
        expectedDuration: '',
        collaborationType: 'Social Media Promotion',
        retailerBudget: '',
        message: ''
      });
    }, 1500);
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
              <div className="inline-flex items-center space-x-2 text-luxury-blue text-xs font-bold tracking-widest uppercase bg-luxury-blue/10 px-4 py-1.5 rounded-full border border-luxury-blue/20">
                <Sparkles size={12} />
                <span>Creator & Brand Synergy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-foreground">
                Connecting Brands <br />
                <span className="bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">with the Right Creators</span>
              </h1>

              <div className="space-y-4">
                <p className="text-base sm:text-lg font-bold text-foreground/90 leading-relaxed">
                  ReekStore is a modern influencer marketing platform that helps brands discover the right creators, build meaningful partnerships, and launch successful promotional campaigns with confidence.
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  ReekStore simplifies brand and creator collaborations by providing a trusted platform where businesses can discover talented influencers and content creators for authentic marketing campaigns. Whether you're a growing startup, an established brand, or a creator looking for exciting opportunities, ReekStore makes collaboration simple, transparent, and effective.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#brands"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explore Brands</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#partner"
                  className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-foreground/5 font-semibold text-sm tracking-wide transition-all flex items-center justify-center space-x-2 border border-card-border"
                >
                  <span>Become a Partner</span>
                </a>
              </div>
            </div>

            {/* Right Column: Illustration Graphic */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan opacity-20 blur-xl group-hover:opacity-35 transition-all duration-500" />
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-foreground/5 border border-card-border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d1?w=600&auto=format&fit=crop&q=80"
                  alt="SaaS creative campaign analytics dashboard"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
                
                {/* Floating metrics glass pill */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-md flex items-center justify-between shadow-lg">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-luxury-cyan uppercase tracking-widest">Co-Branding Reach</span>
                    <div className="text-sm font-black text-white">🔥 1.2M+ Views Reached</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-extrabold border border-emerald-500/20">
                    +320% ROI
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Discover Creators',
                desc: 'Find influencers and creators across different categories that match your brand\'s goals.',
                icon: <Users className="text-luxury-blue" size={20} />
              },
              {
                title: 'Trusted Brand Partnerships',
                desc: 'Build genuine collaborations that drive engagement and long-term growth.',
                icon: <Award className="text-luxury-purple" size={20} />
              },
              {
                title: 'Campaign Management',
                desc: 'Manage collaboration requests and promotional campaigns from one platform.',
                icon: <Zap className="text-luxury-cyan" size={20} />
              },
              {
                title: 'Secure & Professional',
                desc: 'A reliable platform focused on transparency, professionalism, and quality partnerships.',
                icon: <ShieldCheck className="text-emerald-500" size={20} />
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-card-border hover:border-luxury-blue/30 hover:shadow-lg transition-all space-y-3 cursor-pointer group"
              >
                <div className="inline-flex p-2.5 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-sm text-foreground group-hover:text-luxury-blue transition-colors">
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
            { value: '500+', label: 'Active Creators', icon: <Users size={16} className="text-luxury-blue" /> },
            { value: '100+', label: 'Brand Collaborations', icon: <Sparkles size={16} className="text-luxury-purple" /> },
            { value: '1,000+', label: 'Campaign Applications', icon: <Zap size={16} className="text-luxury-cyan" /> },
            { value: '95%', label: 'Partner Satisfaction', icon: <Star size={16} className="text-amber-500" /> }
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

      {/* 4. Why Choose ReekStore Section */}
      <section className="py-20 border-t border-card-border bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Value Proposition</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Choose ReekStore?</h2>
            <p className="text-sm text-foreground/60 max-w-md mx-auto">
              Connecting creator creativity with clear target brand demographics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Smart Matching',
                desc: 'Helping brands connect with creators that fit their campaign objectives.',
                icon: <Sparkles className="text-luxury-purple" size={24} />
              },
              {
                title: 'Easy Collaboration',
                desc: 'A simple process for managing partnership requests and campaign communication.',
                icon: <Zap className="text-luxury-blue" size={24} />
              },
              {
                title: 'Growth Focused',
                desc: 'Supporting both brands and creators in building successful long-term collaborations.',
                icon: <Award className="text-luxury-cyan" size={24} />
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-card-border flex flex-col justify-between space-y-6 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-2xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-luxury-purple transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5a. Collaboration Brands & Partnerships Section */}
      <section id="brands" className="py-24 border-t border-card-border relative overflow-hidden bg-foreground/[0.01]">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-luxury-purple/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-luxury-blue/5 blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          
          {/* SECTION 1: Brand Collaboration */}
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 text-luxury-purple text-xs font-bold tracking-widest uppercase bg-luxury-purple/10 px-4 py-1.5 rounded-full border border-luxury-purple/20">
                <Sparkles size={12} />
                <span>Featured Collaboration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Trusted Brand Collaborations</h2>
              <p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                We proudly collaborate with innovative brands that share our vision of quality, creativity, and customer satisfaction.
              </p>
            </div>

            {/* Featured Brand: SkinInspired */}
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border space-y-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-blue/5 blur-3xl rounded-full" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Brand Info & Highlights */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    {/* Brand Logo Placeholder */}
                    <div className="inline-flex items-center space-x-3 bg-foreground/5 border border-card-border px-5 py-3 rounded-2xl">
                      <span className="text-lg font-black tracking-widest text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent uppercase">
                        SkinInspired
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-purple bg-luxury-purple/10 px-2 py-0.5 rounded-full border border-luxury-purple/20">
                        Official Partner
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">Scientific Skincare Redefined</h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      SkinInspired is a modern skincare brand dedicated to creating high-quality skincare solutions designed for healthy, glowing skin. The brand focuses on carefully selected active ingredients, innovative formulations, and clinical customer satisfaction. With a commitment to quality and authenticity, SkinInspired continues to inspire confidence through effective skincare products suitable for everyday routines.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Premium Quality Products',
                      'Trusted Skincare Solutions',
                      'Customer-Centric Approach',
                      'Quality Ingredients',
                      'Growing Brand Presence',
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
                      alt="SkinInspired Skincare shelf banner"
                      className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent flex flex-col justify-end p-6">
                      <span className="text-[10px] font-bold text-luxury-cyan uppercase tracking-widest mb-0.5">Brand Showcase</span>
                      <h4 className="text-base font-bold text-white tracking-tight">Efficacy Meets Active Science</h4>
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      {
                        title: 'Under Arm Mist',
                        img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80'
                      },
                      {
                        title: 'Green Sunscreen',
                        img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=80'
                      },
                      {
                        title: 'Shield Spray',
                        img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&auto=format&fit=crop&q=80'
                      },
                      {
                        title: 'Barrier Recovery',
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

                  {/* Small Action Prompt */}
                  <div className="pt-4 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-foreground/60">Interested in exploring SkinInspired products?</span>
                    <a
                      href="https://skininspired.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-foreground/10 hover:border-foreground hover:bg-foreground/5 transition-all text-xs font-bold"
                    >
                      Visit SkinInspired Website
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* SECTION 2: Become Our Brand Partner */}
          <div id="partner" className="space-y-12 border-t border-card-border pt-20">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 text-luxury-blue text-xs font-bold tracking-widest uppercase bg-luxury-blue/10 px-4 py-1.5 rounded-full border border-luxury-blue/20">
                <Users size={12} />
                <span>Growth & Co-Branding</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Partner With Us</h2>
              <p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                Interested in promoting your brand? We'd love to collaborate and create impactful campaigns together.
              </p>
            </div>

            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border max-w-4xl mx-auto shadow-xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-luxury-purple/5 blur-3xl rounded-full" />
              
              <form onSubmit={handlePartnerSubmit} className="space-y-8 relative z-10">
                {formError && (
                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-semibold text-center">
                    {formError}
                  </div>
                )}
                {formSuccess && (
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs font-semibold text-center">
                    Thank you! Your brand collaboration application has been submitted successfully. Our marketing team will connect with you shortly.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brand Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="brandName" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Brand Name *</label>
                    <input
                      type="text"
                      id="brandName"
                      required
                      placeholder="e.g. SkinInspired"
                      value={partnerForm.brandName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, brandName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Contact Person Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contactPerson" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Contact Person Name *</label>
                    <input
                      type="text"
                      id="contactPerson"
                      required
                      placeholder="e.g. Alok Kumar"
                      value={partnerForm.contactPerson}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Official Brand Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="brandEmail" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Official Brand Email *</label>
                    <input
                      type="email"
                      id="brandEmail"
                      required
                      placeholder="e.g. partners@brand.com"
                      value={partnerForm.brandEmail}
                      onChange={(e) => setPartnerForm({ ...partnerForm, brandEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Personal Contact Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="contactNumber" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Personal Contact Number *</label>
                    <input
                      type="tel"
                      id="contactNumber"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={partnerForm.contactNumber}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Company Website */}
                  <div className="space-y-1.5">
                    <label htmlFor="companyWebsite" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Company Website (Optional)</label>
                    <input
                      type="url"
                      id="companyWebsite"
                      placeholder="e.g. https://brand.com"
                      value={partnerForm.companyWebsite}
                      onChange={(e) => setPartnerForm({ ...partnerForm, companyWebsite: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Brand Category */}
                  <div className="space-y-1.5">
                    <label htmlFor="brandCategory" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Brand Category</label>
                    <input
                      type="text"
                      id="brandCategory"
                      placeholder="e.g. Active Clinical Skincare"
                      value={partnerForm.brandCategory}
                      onChange={(e) => setPartnerForm({ ...partnerForm, brandCategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Monthly Marketing Budget */}
                  <div className="space-y-1.5">
                    <label htmlFor="monthlyMarketingBudget" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Monthly Marketing Budget</label>
                    <input
                      type="text"
                      id="monthlyMarketingBudget"
                      placeholder="e.g. ₹50,000 - ₹2,000,000"
                      value={partnerForm.monthlyMarketingBudget}
                      onChange={(e) => setPartnerForm({ ...partnerForm, monthlyMarketingBudget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Expected Promotion Duration */}
                  <div className="space-y-1.5">
                    <label htmlFor="expectedDuration" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Expected Promotion Duration</label>
                    <input
                      type="text"
                      id="expectedDuration"
                      placeholder="e.g. 3 Months, 6 Months"
                      value={partnerForm.expectedDuration}
                      onChange={(e) => setPartnerForm({ ...partnerForm, expectedDuration: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Preferred Collaboration Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="collaborationType" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Preferred Collaboration Type</label>
                    <select
                      id="collaborationType"
                      value={partnerForm.collaborationType}
                      onChange={(e) => setPartnerForm({ ...partnerForm, collaborationType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-background focus:border-luxury-blue text-sm outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Social Media Promotion">Social Media Promotion</option>
                      <option value="Product Review">Product Review</option>
                      <option value="Brand Partnership">Brand Partnership</option>
                      <option value="Website Promotion">Website Promotion</option>
                      <option value="Campaign Collaboration">Campaign Collaboration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Monthly Retailer Promotion Budget */}
                  <div className="space-y-1.5">
                    <label htmlFor="retailerBudget" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Monthly Retailer Promotion Budget</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-sm font-bold text-foreground/45">₹</span>
                      <input
                        type="text"
                        id="retailerBudget"
                        placeholder="Enter your monthly promotion budget"
                        value={partnerForm.retailerBudget}
                        onChange={(e) => setPartnerForm({ ...partnerForm, retailerBudget: e.target.value })}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Budget Retail Note */}
                <p className="text-[11px] text-foreground/50 leading-relaxed italic">
                  * We offer flexible promotional plans tailored to your marketing goals and campaign requirements.
                </p>

                {/* Additional Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Additional Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your brand, products, marketing goals, and collaboration expectations."
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] focus:border-luxury-blue focus:bg-foreground/[0.04] text-sm outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background font-bold text-sm tracking-wide hover:opacity-90 disabled:opacity-75 disabled:pointer-events-none transition-all flex items-center justify-center space-x-2.5 shadow-md shadow-foreground/5"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Apply for Brand Collaboration</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 5b. About Section */}
      <section id="about" className="py-20 border-t border-card-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-luxury-blue/5 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Brand Vision Statement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Our Vision</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Making Skincare an Unstoppable Daily Habit</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                The biggest problem in skincare is not finding the right products—it is using them consistently. Many purchase premium products but forget to apply them regularly or lose motivation.
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                <strong>Reeks Store</strong> is India's first skincare habit and consistency platform. By turning daily skincare into an interactive streak-based routine, we motivate users to achieve real skin progress while unlocking authentic brand rewards.
              </p>
              <div className="pt-2">
                <div className="glass-panel p-4 rounded-2xl border border-card-border flex items-center space-x-4">
                  <div className="text-3xl font-black text-luxury-purple">85%</div>
                  <div className="text-xs text-foreground/60 leading-normal">
                    Average increase in user consistency within the first 30 days of streak calibration.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Layered Image / Visual Composite */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-foreground/5 border border-card-border">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=60"
                    alt="Daily Skincare Consistency Habit"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating glass card overlay */}
                  <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-md space-y-1 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-luxury-cyan uppercase tracking-wider">Routine Progress</span>
                      <span className="text-[10px] font-bold text-emerald-500">Active Streak</span>
                    </div>
                    <div className="text-sm font-black text-foreground">🔥 Day 18 Consistency Streak</div>
                    <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div className="bg-gradient-to-r from-luxury-blue to-luxury-purple h-full w-[85%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Pillars Grid */}
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-3">
                  <div className="inline-flex p-2.5 rounded-xl bg-luxury-blue/10 text-luxury-blue">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">Skincare Streaks</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Build AM/PM routines, check them off daily to grow consistency streaks.
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-3">
                  <div className="inline-flex p-2.5 rounded-xl bg-luxury-purple/10 text-luxury-purple">
                    <Award size={18} />
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">Real Brand Rewards</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Unlock exclusive codes and samples from premium brands (like Skininspired).
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-3">
                  <div className="inline-flex p-2.5 rounded-xl bg-luxury-cyan/10 text-luxury-cyan">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">Clinical Partners</h3>
                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                    Earn consultation credits and analysis offers at dermatology clinics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5c. Team Section */}
      <section id="team" className="py-20 border-t border-card-border bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Meet Our Team</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">The people behind our vision, technology, and growth.</h2>
          </div>

          <div className="space-y-12">
            {/* Leadership Row (Founder & Co-Founder) */}
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
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-lg text-foreground tracking-tight">{member.name}</h3>
                    <div className="inline-flex px-3 py-1 rounded-full bg-luxury-purple/15 text-luxury-purple text-xs font-bold uppercase tracking-wider">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Development & Operations Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Himanshu Kumar',
                  role: 'CTO & Developer',
                  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
                },
                {
                  name: 'Aditya Sahani',
                  role: 'CTO & Developer',
                  img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80'
                },
                {
                  name: 'Ujjwal Prasad Kushwaha',
                  role: 'Marketing Head',
                  img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
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

      {/* 6. FAQ Section */}
      <section id="faq" className="py-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
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
    </div>
  );
}
