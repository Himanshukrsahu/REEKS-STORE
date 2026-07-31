'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award, Star, Info, ChevronDown } from 'lucide-react';
import SkinQuiz from '../components/SkinQuiz';
import SkeletonLoader from '../components/SkeletonLoader';
import { apiRequest } from '../utils/api';
import { useCartStore } from '../store/useCartStore';
import { useToastStore } from '../store/useToastStore';

export default function Home() {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});

  const [calibratedType, setCalibratedType] = useState<string | null>(null);
  const [recommendedRoutine, setRecommendedRoutine] = useState<any[]>([]);
  const [routineLoading, setRoutineLoading] = useState(false);

  const { addItem } = useCartStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const data = await apiRequest('/products?isBestSeller=true&limit=4');
        setBestSellers(data.products || []);
      } catch (err) {
        console.error('Error fetching best sellers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  useEffect(() => {
    const checkCalibratedSkin = async () => {
      if (typeof window === 'undefined') return;
      const saved = localStorage.getItem('reeksto_skin_type');
      if (saved && saved !== calibratedType) {
        setCalibratedType(saved);
        setRoutineLoading(true);
        try {
          const data = await apiRequest(`/products?skinType=$1&limit=3`);
          setRecommendedRoutine(data.products || []);
        } catch (err) {
          console.error('Error loading routine recommendations:', err);
        } finally {
          setRoutineLoading(false);
        }
      } else if (!saved && calibratedType) {
        setCalibratedType(null);
        setRecommendedRoutine([]);
      }
    };

    const interval = setInterval(checkCalibratedSkin, 2000);
    checkCalibratedSkin();
    return () => clearInterval(interval);
  }, [calibratedType]);

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const ingredients = [
    { name: 'Retinol', desc: 'Cell cellular renewal matrix', detail: 'Accelerates epidermal turnover, fades fine lines, and promotes high-density collagen synthesis.' },
    { name: 'Niacinamide', desc: 'Pore and barrier optimizer', detail: 'Refines pore structure, stabilizes sebum production, and boosts ceramide syntheses.' },
    { name: 'Hyaluronic Acid', desc: 'Deep hydration plumping', detail: 'Multi-molecular weight matrix locks moisture up to 1000x its weight in the cellular layers.' },
    { name: 'Vitamin C', desc: 'Radiance renewal shield', detail: 'High-potency antioxidant defends against UV photo-damage and brightens hyperpigmentation.' }
  ];

  const faqs = [
    { q: 'How does the AI Skin Quiz determine my routine?', a: 'Our diagnostic engine maps your responses against skin barrier indicators (hydration levels, sebum production, reactivity). It calculates your dominant skin profile and queries Swiss formulas designed for that profile.' },
    { q: 'Are Reeks Store products dermatologist approved?', a: 'Yes. 100% of our products undergo rigorous clinical trials and are approved by European dermatological boards for cellular safety and high-efficacy performance.' },
    { q: 'How long before I see results?', a: 'While hydration benefits are immediate, cellular renewal and texture improvements are clinically proven to become visible within 14 to 28 days of daily routine adherence.' },
    { q: 'What is your shipping and return policy?', a: 'We offer free global express shipping on all orders over ₹1,500. If a formula is not compatible with your skin, you can initiate a return within 30 days for a full refund.' }
  ];

  return (
    <div className="aurora-bg min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Floating gradient circles */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-luxury-blue/10 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-1/10 w-80 h-80 rounded-full bg-luxury-purple/5 blur-3xl animate-float pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 text-luxury-blue text-xs font-bold tracking-widest uppercase bg-luxury-blue/10 px-4 py-1.5 rounded-full border border-luxury-blue/20">
            <Sparkles size={12} />
            <span>Cellular Skin Science</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-foreground max-w-4xl mx-auto">
            Healthy Skin <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">Starts Here</span>
          </h1>

          <p className="text-base sm:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Swiss-formulated, bio-engineered active matrices customized to your exact DNA profile. Take our diagnostics skin test to unlock molecular radiance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="#skin-quiz"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-foreground/5 font-semibold text-sm tracking-wide transition-all flex items-center justify-center space-x-2"
            >
              <span>Dermatology Quiz</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-foreground">75+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Molecular Formulas</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-foreground">99.4%</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Dermatologist Approved</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-foreground">120K+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Happy Skin Cycles</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-foreground">15+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Beauty Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured / Best Sellers */}
      <section className="py-20 bg-background/40 backdrop-blur-sm border-y border-card-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Curated Selections</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Best Sellers</h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-bold text-luxury-blue hover:underline flex items-center space-x-1"
            >
              <span>View All Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <SkeletonLoader key={i} className="h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((product) => (
                <div
                  key={product._id}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-card-border relative group hover:shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-foreground/5 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-all duration-300"
                      />
                      {product.discount > 0 && (
                        <span className="absolute top-2.5 right-2.5 bg-luxury-purple text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-luxury-purple uppercase tracking-wider">{product.category}</div>
                      <Link href={`/shop/$1`} className="block">
                        <h3 className="font-bold text-base tracking-tight text-foreground line-clamp-1 hover:text-luxury-blue transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-1 text-amber-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold">{product.rating}</span>
                        <span className="text-[10px] text-foreground/50">({product.numReviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-foreground/5">
                    <div className="flex flex-col">
                      {product.discount > 0 && (
                        <span className="text-xs text-foreground/40 line-through">₹{product.price}</span>
                      )}
                      <span className="font-extrabold text-lg">₹{product.finalPrice}</span>
                    </div>
                    <button
                      onClick={() => {
                        addItem({
                          productId: product._id,
                          sku: product.sku,
                          name: product.name,
                          price: product.finalPrice,
                          image: product.images[0] || '',
                          stock: product.stock
                        }, 1);
                        addToast(`Added $1 to cart.`, 'success');
                      }}
                      className="px-4 py-2 rounded-xl bg-foreground text-background hover:bg-luxury-blue hover:text-white transition-all text-xs font-bold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Skin Quiz */}
      <section className="bg-background/25">
        <SkinQuiz />
      </section>

      {/* AI Recommendations & Routine Builder Section */}
      <section id="ai-recommendations" className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-20">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Custom Diagnostics</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">AI Molecular Routine Builder</h2>
          <p className="text-sm text-foreground/70">
            A bio-engineered, clinical routine calibrated automatically from your cellular skin diagnostics.
          </p>
        </div>

        {calibratedType ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border space-y-8 animate-fade-in relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-luxury-purple/5 blur-3xl rounded-full" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-foreground/5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Skin Profile Active</span>
                <h3 className="text-2xl font-black tracking-tight">{calibratedType} Skin Protocol</h3>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('reeksto_skin_type');
                  setCalibratedType(null);
                  setRecommendedRoutine([]);
                  addToast('Skin profile cleared. You can now retake the quiz.', 'info');
                  const quizEl = document.getElementById('skin-quiz');
                  if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-bold text-foreground/50 hover:text-red-500 hover:underline transition-all"
              >
                Clear & Recalibrate Diagnostic
              </button>
            </div>

            {routineLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-60" />)}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recommendedRoutine.map((product, idx) => {
                    const stepTimeline = idx === 0 ? 'AM & PM' : idx === 1 ? 'AM' : 'PM';
                    const stepTitle = idx === 0 ? 'Step 1: Prep & Purify' : idx === 1 ? 'Step 2: Molecular Treatment' : 'Step 3: Barrier Seal';
                    return (
                      <div key={product._id} className="glass-panel p-6 rounded-2xl border border-card-border flex flex-col justify-between space-y-6 bg-background/30 hover:shadow-md transition-all">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-luxury-purple uppercase tracking-wider">{stepTitle}</span>
                            <span className="bg-luxury-blue/10 text-luxury-blue text-[9px] font-extrabold px-2 py-0.5 rounded-full">{stepTimeline}</span>
                          </div>
                          
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-foreground/5 mx-auto border border-card-border">
                            <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                          </div>

                          <div className="text-center space-y-1">
                            <Link href={`/shop/$1`}>
                              <h4 className="font-extrabold text-sm hover:text-luxury-blue line-clamp-1 transition-colors">{product.name}</h4>
                            </Link>
                            <p className="text-[10px] text-foreground/50 line-clamp-2 leading-relaxed">
                              {product.benefits[0] || 'Targeted molecular delivery for skin barrier recovery.'}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-foreground/5 flex items-center justify-between">
                          <span className="font-black text-sm">₹{product.finalPrice}</span>
                          <button
                            onClick={() => {
                              addItem({
                                productId: product._id,
                                sku: product.sku,
                                name: product.name,
                                price: product.finalPrice,
                                image: product.images[0] || '',
                                stock: product.stock
                              }, 1);
                              addToast(`Added $1 to cart.`, 'success');
                            }}
                            className="text-[10px] font-bold text-luxury-blue hover:underline"
                          >
                            Add Single Step
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      recommendedRoutine.forEach(product => {
                        addItem({
                          productId: product._id,
                          sku: product.sku,
                          name: product.name,
                          price: product.finalPrice,
                          image: product.images[0] || '',
                          stock: product.stock
                        }, 1);
                      });
                      addToast('Entire molecular routine added to your cart!', 'success');
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 bg-foreground text-background font-bold text-sm rounded-full hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles size={16} className="text-luxury-purple animate-pulse" />
                    <span>Add Complete Routine to Bag</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-panel p-10 text-center rounded-3xl border border-card-border max-w-2xl mx-auto space-y-6">
            <div className="inline-flex p-5 rounded-full bg-foreground/5 text-foreground/45">
              <Sparkles size={36} className="animate-pulse text-luxury-purple" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight">No routine calibrated</h3>
              <p className="text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
                Take our molecular diagnostic evaluation above. The system will analyze your responses to assemble a personalized 3-step morning and night regimen.
              </p>
            </div>
            <button
              onClick={() => {
                const quizEl = document.getElementById('skin-quiz');
                if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all"
            >
              <span>Calibrate Your Routine</span>
              <ArrowRight size={12} />
            </button>
          </div>
        )}
      </section>

      {/* 4. Bento Ingredients Showcase */}
      <section id="ingredients" className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-luxury-cyan">Scientific Core</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Active Molecular Ingredients</h2>
          <p className="text-sm text-foreground/70">
            We isolate, refine, and capsule highly potent active elements to deliver dermatological healing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((ing, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-card-border flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-luxury-blue/10 text-luxury-blue font-bold text-sm">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{ing.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-luxury-purple">{ing.desc}</p>
                <p className="text-sm text-foreground/75 leading-relaxed">{ing.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Reeksto */}
      <section className="py-20 bg-background/50 border-t border-card-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Swiss Standards</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why Choose Reeks Store Skincare?</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-luxury-blue/10 text-luxury-blue">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Clinical Efficacy Guarantee</h3>
                  <p className="text-sm text-foreground/75 mt-1 leading-relaxed">Every formula is tested and backtested by independent dermatological institutes. Results are measured down to the micrometer level.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-luxury-purple/10 text-luxury-purple">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Bio-Molecular Vectors</h3>
                  <p className="text-sm text-foreground/75 mt-1 leading-relaxed">Our encapsulation tech routes active agents deep within cell layers, bypassing immediate oxidization for peak recovery power.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-luxury-cyan/10 text-luxury-cyan">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Luxury Design, Clean Footprint</h3>
                  <p className="text-sm text-foreground/75 mt-1 leading-relaxed">All Reeks Store bottles feature ultra-premium frosted glass and are designed for infinite recyclability with Zero carbon packaging.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual before/after card */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-card-border space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-cyan/10 blur-2xl rounded-full" />
            <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center space-x-2">
              <span>Molecular Renewal Trial</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Day 0: Cellular Fatigue</div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-foreground/5 relative">
                  <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=60" alt="Skin Day 0" className="object-cover w-full h-full grayscale" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-luxury-cyan">Day 14: Cellular Radiance</div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-foreground/5 relative">
                  <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=60" alt="Skin Day 14" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
            <p className="text-xs text-foreground/70 text-center leading-relaxed italic">
              "After introducing Reeks Store to my daily routine, my skin redness dropped and the overall radiance went up significantly."
            </p>
          </div>
        </div>
      </section>

      {/* 5a. Collaboration Brands Section */}
      <section id="brands" className="py-20 border-t border-card-border bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-luxury-purple">Global Alliances</div>
            <h2 className="text-3xl font-bold tracking-tight">Collaborating Labs & Science Partners</h2>
            <p className="text-sm text-foreground/60 max-w-lg mx-auto">
              We collaborate with world-leading cellular biochemistry institutes across Europe and Asia to pioneer clean, bio-active dermatology formulations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-70">
            {[
              { name: 'Zurich Cellular Lab', desc: 'Geneva Research' },
              { name: 'Swiss Molecular Bio', desc: 'Alpine Chemistry' },
              { name: 'Tokyo Derma Labs', desc: 'Efficacy Trials' },
              { name: 'Geneva Bio-Labs', desc: 'Formulations' },
              { name: 'Paris Clinical Board', desc: 'Dermatologists' }
            ].map((brand, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-card-border hover:border-foreground/10 hover:bg-foreground/5 hover:opacity-100 transition-all text-center w-full space-y-2 group cursor-pointer"
              >
                <div className="text-luxury-blue font-black tracking-wider text-xs uppercase group-hover:scale-105 transition-transform">{brand.name}</div>
                <div className="text-[10px] text-foreground/40 uppercase tracking-widest">{brand.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5b. About Section */}
      <section id="about" className="py-20 border-t border-card-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-luxury-purple/5 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image / Visuals */}
            <div className="relative group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
              <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square bg-foreground/5 border border-card-border">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60"
                  alt="Swiss Dermatology Lab"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="text-xs font-bold text-luxury-cyan uppercase tracking-wider mb-1">Swiss Research Facility</div>
                  <h3 className="font-extrabold text-xl text-white">Reeks Labs (Geneva, Switzerland)</h3>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-luxury-blue">Our Mission</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Dermatology Redefined Through Molecular Science</h2>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Reeks Store was founded on a simple realization: generic skincare treats symptoms, not individual biology. Using advanced bio-informatics and molecular research, we develop custom cellular regimens that sync directly with your skin barrier.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-panel p-5 rounded-2xl border border-card-border space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center space-x-2">
                    <Sparkles size={16} className="text-luxury-purple" />
                    <span>Bio-Active Clean Formulas</span>
                  </h4>
                  <p className="text-xs text-foreground/60 leading-relaxed">100% free of synthetic parabens, microplastics, and sulfates. Clinically active concentration.</p>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-card-border space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center space-x-2">
                    <ShieldCheck size={16} className="text-luxury-cyan" />
                    <span>Swiss Clinical Standards</span>
                  </h4>
                  <p className="text-xs text-foreground/60 leading-relaxed">Every formula is tested and safety certified by Zurich dermatology boards for cell security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5c. Team Section */}
      <section id="team" className="py-20 border-t border-card-border bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-luxury-cyan">Scientific Board</div>
            <h2 className="text-3xl font-bold tracking-tight">Our Scientific Formulators</h2>
            <p className="text-sm text-foreground/60 max-w-lg mx-auto">
              Meet the co-founders, biochemists, and clinical dermatologists who lead our research and formulation standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Elena Vance',
                role: 'Chief Biochemist & Co-Founder',
                bio: 'PhD in Bio-Molecular Chemistry from Zurich University. Spent 15 years developing cellular skin regeneration vectors.',
                img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=60'
              },
              {
                name: 'Dr. Kabir Mehta',
                role: 'Head of Clinical Dermatology',
                bio: 'Consulting Dermatologist with 12+ years of research in barrier recovery and Indian skin phototypes reactivity.',
                img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=60'
              },
              {
                name: 'Sarah DuPont',
                role: 'Director of Cellular Botany',
                bio: 'Expert in extracting raw bio-actives from Alpine flora. Leads the clean botanical extraction facility in Geneva.',
                img: 'https://images.unsplash.com/photo-1594824813573-246434e33963?w=300&auto=format&fit=crop&q=60'
              }
            ].map((member, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-card-border flex flex-col items-center text-center space-y-4 hover:border-foreground/10 hover:shadow-lg transition-all"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border border-card-border bg-foreground/5 relative shadow-md">
                  <img src={member.img} alt={member.name} className="object-cover w-full h-full" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-foreground">{member.name}</h3>
                  <div className="text-xs text-luxury-purple font-semibold">{member.role}</div>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed px-2">
                  {member.bio}
                </p>
              </div>
            ))}
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
