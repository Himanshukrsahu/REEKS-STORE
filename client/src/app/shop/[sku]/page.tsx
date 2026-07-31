'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, ShieldCheck, Heart, ArrowRight, ShoppingCart, RefreshCw, MessageSquare } from 'lucide-react';
import { apiRequest } from '../../../utils/api';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { useToastStore } from '../../../store/useToastStore';
import { useAuthStore } from '../../../store/useAuthStore';
import Link from 'next/link';

export default function ProductDetail() {
  const { sku } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addItem } = useCartStore();
  const { wishlistIds, toggleWishlistLocal } = useWishlistStore();
  const { addToast } = useToastStore();
  const { user, token } = useAuthStore();

  const fetchProductDetails = async () => {
    if (!sku) return;
    setLoading(true);
    try {
      const prodData = await apiRequest(`/products/sku/${sku}`);
      setProduct(prodData);
      setActiveImage(prodData.images[0] || '');
      
      // Fetch reviews
      const reviewData = await apiRequest(`/reviews/product/${prodData._id}`);
      setReviews(reviewData || []);

      // Fetch related
      const relatedData = await apiRequest(`/products?category=${prodData.category}&limit=3`);
      setRelated(relatedData.products?.filter((p: any) => p._id !== prodData._id) || []);
    } catch (err) {
      console.error(err);
      addToast('Error loading product details', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [sku]);

  const handleToggleWishlist = async () => {
    if (!product) return;
    toggleWishlistLocal(product._id);
    const isWish = wishlistIds.includes(product._id);
    addToast(isWish ? 'Removed from wishlist' : 'Added to wishlist', 'success');

    if (token) {
      try {
        await apiRequest('/products/wishlist', {
          method: 'POST',
          body: JSON.stringify({ productId: product._id })
        });
      } catch (err) {
        console.error('Failed to sync wishlist:', err);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product._id,
      sku: product.sku,
      name: product.name,
      price: product.finalPrice,
      image: product.images[0] || '',
      stock: product.stock
    }, quantity);
    addToast(`Added $1 of $1 to cart.`, 'success');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      addToast('Please login to add a review', 'error');
      return;
    }
    if (!comment.trim()) {
      addToast('Please enter review comment', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      const newReview = await apiRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id,
          rating,
          title,
          comment
        })
      });

      addToast('Review submitted successfully!', 'success');
      setReviews(prev => [newReview, ...prev]);
      setTitle('');
      setComment('');
      
      // Refresh rating counts
      const updated = await apiRequest(`/products/sku/$1`);
      setProduct(updated);
    } catch (err: any) {
      addToast(err.message || 'Failed to submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <SkeletonLoader className="aspect-square" />
          <div className="space-y-4">
            <SkeletonLoader className="h-10 w-3/4" />
            <SkeletonLoader className="h-6 w-1/4" />
            <SkeletonLoader className="h-20" />
            <SkeletonLoader className="h-12 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl font-extrabold">Formula Not Discovered</h2>
        <p className="text-sm text-foreground/60">This SKU is not mapped to any Reeks Store product.</p>
        <Link href="/shop" className="inline-block px-6 py-2.5 bg-foreground text-background font-bold rounded-xl text-xs">
          Return to Apothecary
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlistIds.includes(product._id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Images */}
        <div className="space-y-6">
          <div className="w-full aspect-square rounded-3xl overflow-hidden bg-foreground/5 border border-card-border relative group">
            <img
              src={activeImage}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 right-4 bg-luxury-purple text-white text-[10px] font-extrabold px-3 py-1 rounded-full">
                -{product.discount}% OFF
              </span>
            )}
          </div>

          <div className="flex space-x-4">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-24 aspect-square rounded-2xl overflow-hidden bg-foreground/5 border transition-all ${activeImage === img ? 'border-luxury-blue border-2 scale-95' : 'border-card-border hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Specs & Cart Buttons */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-luxury-purple uppercase tracking-wider">{product.category}</span>
              <span className="text-[10px] font-bold text-foreground/40 bg-foreground/5 px-2.5 py-1 rounded-full uppercase tracking-wider">SKU: {product.sku}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{product.name}</h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-amber-500 space-x-1">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-xs text-foreground/50">({product.numReviews} clinical reviews)</span>
              </div>
              <span className="text-xs text-foreground/30">|</span>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                {product.stock > 0 ? `In Stock ($1 units)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed border-t border-b border-foreground/5 py-6">
            {product.description}
          </p>

          <div className="flex items-baseline space-x-4">
            <span className="text-3xl font-black">₹{product.finalPrice}</span>
            {product.discount > 0 && (
              <span className="text-sm text-foreground/40 line-through">₹{product.price}</span>
            )}
          </div>

          {/* Quantity & CTA */}
          {product.stock > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border border-foreground/10 rounded-xl overflow-hidden w-full sm:w-auto">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 hover:bg-foreground/5 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-6 py-2 text-sm font-bold text-foreground/80">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  className="px-4 py-2 hover:bg-foreground/5 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-foreground text-background font-bold text-sm tracking-wide hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <ShoppingCart size={16} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-full border transition-all ${isWishlisted ? 'border-red-500/30 text-red-500 bg-red-500/5' : 'border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? 'red' : 'none'} />
              </button>
            </div>
          )}

          {/* Details Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Ingredients Matrix</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing: string, i: number) => (
                  <span key={i} className="text-[10px] font-semibold bg-luxury-blue/5 border border-luxury-blue/10 text-luxury-blue px-2.5 py-1 rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Compatible Skin</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.skinType.map((type: string, i: number) => (
                  <span key={i} className="text-[10px] font-semibold bg-luxury-purple/5 border border-luxury-purple/10 text-luxury-purple px-2.5 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Dermatologist Benefits</h4>
              <ul className="text-xs text-foreground/80 space-y-1 pl-4 list-disc">
                {product.benefits.slice(0, 3).map((ben: string, i: number) => (
                  <li key={i}>{ben}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-16 border-t border-foreground/5">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center space-x-2">
            <MessageSquare size={20} className="text-luxury-blue" />
            <span>Clinical Feedback</span>
          </h2>
          <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-4 text-center">
            <div className="text-5xl font-black text-foreground">{product.rating}</div>
            <div className="flex justify-center text-amber-500 space-x-1">
              <Star size={18} fill="currentColor" />
            </div>
            <div className="text-xs font-bold text-foreground/60 uppercase tracking-wider">Based on {reviews.length} reviews</div>
          </div>

          {/* Add Review Form */}
          {token ? (
            <form onSubmit={handleReviewSubmit} className="glass-panel p-6 rounded-2xl border border-card-border space-y-4">
              <h3 className="font-bold text-sm">Submit Molecular Feedback</h3>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground/60">Rating Score</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-amber-500 transition-all focus:outline-none"
                    >
                      <Star size={20} fill={rating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground/60">Feedback Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skin barrier recovery"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs focus:outline-none focus:border-luxury-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground/60">Dermatological Comments</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain formula efficacy, application feel, and texture results..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs focus:outline-none focus:border-luxury-blue"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="w-full py-2.5 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center space-x-1.5"
              >
                {submittingReview ? <RefreshCw size={12} className="animate-spin" /> : null}
                <span>Submit Clinical Review</span>
              </button>
            </form>
          ) : (
            <div className="glass-panel p-6 rounded-2xl border border-card-border text-center">
              <p className="text-xs text-foreground/60 mb-3">Please login to write a clinical evaluation.</p>
              <Link href="/auth/login" className="text-xs font-bold text-luxury-blue hover:underline">
                Login / Register Now
              </Link>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.length === 0 ? (
            <div className="glass-panel p-10 text-center rounded-3xl border border-card-border text-foreground/50 text-sm">
              No clinical evaluations submitted yet for this molecular SKU.
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="glass-panel p-6 rounded-2xl border border-card-border space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-foreground pr-2">{rev.userName}</div>
                      <div className="flex items-center space-x-2 text-amber-500">
                        <span className="flex text-amber-500 space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill={rev.rating > i ? 'currentColor' : 'none'} />
                          ))}
                        </span>
                        <span className="text-[10px] font-bold text-foreground/60">{rev.title}</span>
                      </div>
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                        <ShieldCheck size={10} />
                        <span>Verified Purchase</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Related Products */}
      {related.length > 0 && (
        <div className="space-y-8 pt-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Molecular Alternatives</h2>
            <p className="text-xs text-foreground/60">Similar products in the {product.category} category.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.map((prod) => (
              <div
                key={prod._id}
                className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-card-border relative group hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-foreground/5 relative">
                    <img src={prod.images[0]} alt={prod.name} className="object-cover w-full h-full group-hover:scale-105 transition-all duration-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-luxury-purple uppercase tracking-wider">{prod.category}</div>
                    <Link href={`/shop/$1`}>
                      <h3 className="font-bold text-sm tracking-tight text-foreground line-clamp-1 hover:text-luxury-blue transition-colors">
                        {prod.name}
                      </h3>
                    </Link>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between pt-3 border-t border-foreground/5">
                  <span className="font-extrabold text-sm">₹{prod.finalPrice}</span>
                  <Link href={`/shop/$1`} className="text-xs font-bold text-luxury-blue hover:underline flex items-center space-x-1">
                    <span>Inspect</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
