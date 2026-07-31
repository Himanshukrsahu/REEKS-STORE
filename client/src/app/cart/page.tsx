'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2, Heart, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';
import { useAuthStore } from '../../store/useAuthStore';
import { apiRequest } from '../../utils/api';

export default function Cart() {
  const {
    items,
    savedItems,
    appliedCoupon,
    removeItem,
    updateQuantity,
    applyCoupon,
    saveForLater,
    moveToCart,
    removeSavedItem,
    getTotals
  } = useCartStore();

  const { addToast } = useToastStore();
  const { token } = useAuthStore();

  const [couponCode, setCouponCode] = useState(appliedCoupon?.code || '');
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

  const { subtotal, discount, shipping, tax, total } = getTotals();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    if (!token) {
      addToast('Please login to apply coupon codes.', 'error');
      return;
    }

    setValidatingCoupon(true);
    setCouponError('');
    try {
      const data = await apiRequest('/coupons/validate', {
        method: 'POST',
        body: JSON.stringify({ code: couponCode, cartTotal: subtotal })
      });

      applyCoupon({
        code: data.code,
        discountPercentage: data.discountPercentage,
        discountAmount: data.discountAmount
      });
      addToast(`Coupon ${data.code} applied! Saved ₹${data.discountAmount}.`, 'success');
    } catch (err: any) {
      setCouponError(err.message || 'Invalid coupon code');
      applyCoupon(null);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    applyCoupon(null);
    setCouponCode('');
    setCouponError('');
    addToast('Coupon code removed.', 'info');
  };

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex p-6 rounded-full bg-foreground/5 text-foreground/40">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">Your bag is empty</h2>
        <p className="text-sm text-foreground/60 max-w-sm mx-auto">
          Explore Swiss cellular skin matrices and select high-potency items to start your skin recovery.
        </p>
        <Link href="/shop" className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-foreground text-background font-bold text-sm hover:opacity-90 shadow-md transition-all">
          <span>Start Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <h1 className="text-3xl font-black tracking-tight text-foreground">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left: Cart Items & Save for Later */}
        <div className="lg:col-span-2 space-y-8">
          {items.length === 0 ? (
            <div className="glass-panel p-8 text-center rounded-2xl border border-card-border text-foreground/60 text-sm">
              Your bag is empty. Check your saved list below!
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="glass-panel p-5 rounded-2xl border border-card-border flex gap-6 relative group hover:shadow-md transition-all"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-foreground/5 flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>

                  {/* Info */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="space-y-1 pr-6">
                      <Link href={`/shop/$1`}>
                        <h3 className="font-bold text-sm tracking-tight text-foreground hover:text-luxury-blue transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">SKU: {item.sku}</div>
                      <div className="font-extrabold text-sm">₹{item.price}</div>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center space-x-6 mt-3">
                      <div className="flex items-center border border-foreground/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-xs font-bold hover:bg-foreground/5"
                        >
                          -
                        </button>
                        <span className="px-3.5 py-1 text-xs font-semibold text-foreground/80">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-xs font-bold hover:bg-foreground/5"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center space-x-3 text-xs font-bold">
                        <button
                          onClick={() => {
                            saveForLater(item.productId);
                            addToast('Item saved for later.', 'info');
                          }}
                          className="text-luxury-purple hover:underline"
                        >
                          Save for Later
                        </button>
                        <span className="text-foreground/20">|</span>
                        <button
                          onClick={() => {
                            removeItem(item.productId);
                            addToast('Item removed from bag.', 'info');
                          }}
                          className="text-red-500 hover:text-red-600 flex items-center space-x-1"
                        >
                          <Trash2 size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save For Later Section */}
          {savedItems.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-bold tracking-tight flex items-center space-x-2">
                <Heart size={16} className="text-luxury-purple" />
                <span>Saved For Later</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedItems.map((item) => (
                  <div
                    key={item.productId}
                    className="glass-panel p-4 rounded-2xl border border-card-border flex gap-4 hover:shadow-sm transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-foreground/5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-xs line-clamp-1">{item.name}</h4>
                        <div className="font-bold text-xs mt-0.5">₹{item.price}</div>
                      </div>
                      <div className="flex space-x-3 text-[10px] font-bold mt-2">
                        <button
                          onClick={() => {
                            moveToCart(item.productId);
                            addToast('Item moved to bag.', 'success');
                          }}
                          className="text-luxury-blue hover:underline"
                        >
                          Move to Bag
                        </button>
                        <button
                          onClick={() => {
                            removeSavedItem(item.productId);
                            addToast('Saved item deleted.', 'info');
                          }}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary Box */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-card-border space-y-6">
            <h2 className="font-bold text-lg pb-4 border-b border-foreground/5">Order Summary</h2>

            {/* Price lines */}
            <div className="space-y-3.5 text-sm font-semibold">
              <div className="flex justify-between">
                <span className="text-foreground/75">Bag Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              
              {appliedCoupon ? (
                <div className="flex justify-between text-emerald-500">
                  <span className="flex items-center space-x-1">
                    <Sparkles size={12} />
                    <span>Coupon ({appliedCoupon.code})</span>
                  </span>
                  <span>-₹{discount}</span>
                </div>
              ) : null}

              <div className="flex justify-between">
                <span className="text-foreground/75">Shipping Charges</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-foreground/75">Est. Tax (5%)</span>
                <span>$1</span>
              </div>

              <div className="flex justify-between text-base font-extrabold border-t border-foreground/5 pt-4">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Coupon input */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-foreground/5 space-y-3">
                <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Promo Coupon</label>
                {appliedCoupon ? (
                  <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <div>
                      <div className="font-bold text-emerald-500">{appliedCoupon.code}</div>
                      <div className="text-[10px] text-foreground/60">Saved {appliedCoupon.discountPercentage}% off items</div>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-xs text-red-500 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow px-3 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs uppercase focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={validatingCoupon || !couponCode.trim()}
                      className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold disabled:opacity-30 flex items-center justify-center space-x-1"
                    >
                      {validatingCoupon ? <RefreshCw size={10} className="animate-spin" /> : null}
                      <span>Apply</span>
                    </button>
                  </form>
                )}
                {couponError && (
                  <div className="text-[10px] text-red-500 font-semibold flex items-center space-x-1">
                    <AlertCircle size={10} />
                    <span>{couponError}</span>
                  </div>
                )}
              </div>
            )}

            {/* CTA checkout button */}
            {items.length > 0 ? (
              <Link
                href="/checkout"
                className="w-full py-4 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>

          {/* Quick tips */}
          <div className="glass-panel p-5 rounded-2xl border border-card-border text-[11px] text-foreground/75 leading-relaxed space-y-1">
            <div className="font-bold uppercase tracking-wider text-luxury-purple">Free Shipping Guarantee</div>
            <p>We provide free express global shipping on all order baskets over ₹1,500.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
