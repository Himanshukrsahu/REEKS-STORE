'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingCart, Check } from 'lucide-react';
import { apiRequest } from '../utils/api';
import { useCartStore } from '../store/useCartStore';

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string; type: string }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: 'How does your skin feel 30 minutes after washing?',
    options: [
      { label: 'Tight, rough, or flaky', value: 'dry', type: 'Dry' },
      { label: 'Shiny or greasy all over', value: 'oily', type: 'Oily' },
      { label: 'Comfortable, smooth, and balanced', value: 'normal', type: 'Normal' },
      { label: 'Shiny in the T-zone, dry on the cheeks', value: 'combination', type: 'Combination' },
      { label: 'Red, itchy, or easily irritated', value: 'sensitive', type: 'Sensitive' }
    ]
  },
  {
    id: 2,
    text: 'What is your primary skincare concern?',
    options: [
      { label: 'Fine lines, wrinkles, and loss of elasticity', value: 'aging', type: 'Anti Aging Cream' },
      { label: 'Frequent breakouts, blackheads, and congestion', value: 'acne', type: 'Acne Care' },
      { label: 'Dullness, uneven tone, or dark spots', value: 'dullness', type: 'Brightening Cream' },
      { label: 'Severe dehydration and dry patches', value: 'dryness', type: 'Moisturizer' },
      { label: 'Persistent redness and burning sensations', value: 'redness', type: 'Sensitive' }
    ]
  },
  {
    id: 3,
    text: 'How visible are your pores?',
    options: [
      { label: 'Virtually invisible', value: 'invisible', type: 'Dry' },
      { label: 'Large and prominent all over my face', value: 'large', type: 'Oily' },
      { label: 'Average size, only visible up close', value: 'average', type: 'Normal' },
      { label: 'Visible mainly on my nose and forehead (T-zone)', value: 't-zone', type: 'Combination' },
      { label: 'Pores are normal but easily get inflamed', value: 'reactive', type: 'Sensitive' }
    ]
  },
  {
    id: 4,
    text: 'How does your skin react to sun exposure?',
    options: [
      { label: 'Burns easily and rarely tans', value: 'burn', type: 'Sunscreen SPF50' },
      { label: 'Tans easily and rarely burns', value: 'tan', type: 'Normal' },
      { label: 'Feels immediately dry and tight', value: 'dry-sun', type: 'Moisturizer' },
      { label: 'Turns red and stings before cooling down', value: 'sensitive-sun', type: 'Sunscreen SPF50' },
      { label: 'No significant reactions', value: 'none', type: 'Normal' }
    ]
  }
];

export default function SkinQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [skinType, setSkinType] = useState<string>('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [addedAll, setAddedAll] = useState(false);

  const { addItem } = useCartStore();

  const handleSelectOption = (type: string) => {
    const updatedAnswers = [...answers, type];
    setAnswers(updatedAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const calculateResults = async (finalAnswers: string[]) => {
    setLoading(true);
    try {
      // Determine dominant skin type based on occurrences in responses
      const frequencyMap: { [key: string]: number } = {};
      finalAnswers.forEach(ans => {
        // Map answer types to main skin categories
        const mapped = ['Dry', 'Oily', 'Normal', 'Combination', 'Sensitive'].includes(ans) ? ans : 'Normal';
        frequencyMap[mapped] = (frequencyMap[mapped] || 0) + 1;
      });

      let dominantType = 'Normal';
      let maxCount = 0;
      Object.keys(frequencyMap).forEach(key => {
        if (frequencyMap[key] > maxCount) {
          maxCount = frequencyMap[key];
          dominantType = key;
        }
      });

      setSkinType(dominantType);
      localStorage.setItem('reeksto_skin_type', dominantType);

      // Fetch recommended products from the API matching the skin type
      const response = await apiRequest(`/products?skinType=$1&limit=3`);
      setRecommendations(response.products || []);
      setCurrentStep(quizQuestions.length); // Results step
    } catch (err) {
      console.error(err);
      // Fallback in case of server connection failure
      setSkinType('Normal');
      localStorage.setItem('reeksto_skin_type', 'Normal');
      setCurrentStep(quizQuestions.length);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setSkinType('');
    setRecommendations([]);
    setAddedAll(false);
    localStorage.removeItem('reeksto_skin_type');
  };

  const handleAddAllToCart = () => {
    recommendations.forEach(product => {
      addItem({
        productId: product._id,
        sku: product.sku,
        name: product.name,
        price: product.finalPrice,
        image: product.images[0] || '',
        stock: product.stock
      }, 1);
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 3000);
  };

  return (
    <div id="skin-quiz" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-luxury-purple/5 to-luxury-blue/5 blur-3xl rounded-3xl pointer-events-none" />
      
      <div className="glass-panel p-8 sm:p-12 rounded-3xl relative z-10 border border-card-border overflow-hidden">
        {/* Progress bar */}
        {currentStep < quizQuestions.length && (
          <div className="w-full bg-foreground/10 h-1.5 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-luxury-blue to-luxury-purple h-full transition-all duration-300"
              style={{ width: `${((currentStep) / quizQuestions.length) * 100}%` }}
            />
          </div>
        )}

        {currentStep < quizQuestions.length ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-luxury-purple text-sm font-semibold tracking-wider uppercase">
              <Sparkles size={16} />
              <span>AI Dermatology Engine</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {quizQuestions[currentStep].text}
            </h2>

            <div className="grid grid-cols-1 gap-4 pt-4">
              {quizQuestions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.type)}
                  className="w-full text-left px-6 py-4 rounded-2xl border border-foreground/10 hover:border-luxury-blue hover:bg-luxury-blue/5 transition-all text-sm sm:text-base font-medium flex items-center justify-between group"
                >
                  <span>{option.label}</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-luxury-blue transform translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center space-x-1.5 text-xs text-foreground/60 hover:text-foreground font-semibold pt-4"
              >
                <ArrowLeft size={14} />
                <span>Go Back</span>
              </button>
            )}
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <RefreshCw className="animate-spin text-luxury-blue" size={32} />
            <p className="text-sm font-medium text-foreground/70">Analyzing response variables, querying molecular matches...</p>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 text-luxury-cyan text-sm font-semibold tracking-wider uppercase bg-luxury-cyan/10 px-4 py-1.5 rounded-full border border-luxury-cyan/20">
                <Sparkles size={14} />
                <span>Quiz Results</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Your Skin Type: <span className="bg-gradient-to-r from-luxury-blue to-luxury-purple bg-clip-text text-transparent">{skinType}</span>
              </h2>
              <p className="text-sm text-foreground/70 max-w-xl mx-auto leading-relaxed">
                Our analysis shows your skin type is dominant in <strong>{skinType}</strong> properties. Below is a custom-engineered molecular routine specifically selected to target your profile.
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {recommendations.map((product) => (
                <div key={product._id} className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-card-border relative group hover:shadow-lg transition-all">
                  <div className="space-y-3">
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-foreground/5 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-luxury-purple uppercase tracking-wider">{product.category}</div>
                      <h4 className="font-bold text-sm tracking-tight text-foreground line-clamp-1">{product.name}</h4>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-foreground/5">
                    <span className="font-extrabold text-sm">₹{product.finalPrice}</span>
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
                      }}
                      className="p-1.5 rounded-lg bg-foreground text-background hover:bg-luxury-blue hover:text-white transition-all"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={handleAddAllToCart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-luxury-blue to-luxury-purple text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg hover:opacity-95 transition-all"
              >
                {addedAll ? (
                  <>
                    <Check size={18} />
                    <span>Added Routine!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    <span>Add Entire Routine to Cart</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-foreground/10 text-foreground/80 hover:text-foreground font-semibold text-sm flex items-center justify-center space-x-2 transition-all bg-transparent"
              >
                <RefreshCw size={16} />
                <span>Retake Diagnostic Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
