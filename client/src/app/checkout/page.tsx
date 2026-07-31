'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, RefreshCw, CheckCircle, ShieldAlert, Sparkles, MapPin, Plus } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import { apiRequest } from '../../utils/api';
import Link from 'next/link';

interface Address {
  _id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export default function Checkout() {
  const router = useRouter();
  const { items, appliedCoupon, clearCart, getTotals } = useCartStore();
  const { user, token, setAddresses } = useAuthStore();
  const { addToast } = useToastStore();

  const [loading, setLoading] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  // Address State
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    name: '', phone: '', street: '', city: '', state: '', zipCode: '', country: 'United States'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'Stripe' | 'Razorpay' | 'COD'>('Stripe');
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [stripeCardName, setStripeCardName] = useState('');
  const [stripeCardNum, setStripeCardNum] = useState('4242 4242 4242 4242');
  const [stripeExpiry, setStripeExpiry] = useState('12/28');
  const [stripeCvc, setStripeCvc] = useState('321');

  const { subtotal, discount, shipping, tax, total } = getTotals();

  useEffect(() => {
    if (!token) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    if (items.length === 0) {
      router.push('/cart');
      return;
    }

    // Set default address
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find((a: any) => a.isDefault) || user.addresses[0];
      setSelectedAddressId(defaultAddr._id || '');
    }
  }, [token, items]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiRequest('/auth/address', {
        method: 'POST',
        body: JSON.stringify({ ...newAddress, isDefault: user?.addresses?.length === 0 })
      });
      
      setAddresses(response);
      addToast('New address saved.', 'success');
      
      // Select the newly added address
      const newAddr = response[response.length - 1];
      setSelectedAddressId(newAddr._id);
      
      setShowAddressForm(false);
      setNewAddress({ name: '', phone: '', street: '', city: '', state: '', zipCode: '', country: 'United States' });
    } catch (err: any) {
      addToast(err.message || 'Failed to add address', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      addToast('Please select a shipping address.', 'error');
      return;
    }

    const selectedAddress = user?.addresses?.find((a: any) => a._id === selectedAddressId);
    if (!selectedAddress) {
      addToast('Invalid address selection.', 'error');
      return;
    }

    setSubmittingOrder(true);
    try {
      const orderPayload = {
        items: items.map(i => ({ productId: i.productId, name: i.name, quantity: i.quantity })),
        shippingAddress: {
          name: selectedAddress.name,
          phone: selectedAddress.phone,
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          country: selectedAddress.country
        },
        paymentMethod,
        couponCode: appliedCoupon?.code,
        shippingCharges: shipping,
        tax
      };

      const orderData = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload)
      });

      const order = orderData.order;

      if (paymentMethod === 'COD') {
        clearCart();
        addToast('Order placed successfully (Cash on Delivery)!', 'success');
        router.push(`/checkout/success?orderId=$1`);
      } else if (paymentMethod === 'Stripe') {
        // Trigger simulated Stripe modal
        setShowStripeModal(true);
        // Save order details to local storage temporarily to reference in mock payment
        localStorage.setItem('reeksto_pending_order_id', order._id);
      } else if (paymentMethod === 'Razorpay') {
        setShowRazorpayModal(true);
        localStorage.setItem('reeksto_pending_order_id', order._id);
      }

    } catch (err: any) {
      addToast(err.message || 'Failed to place order', 'error');
    } finally {
      setSubmittingOrder(false);
    }
  };

  const handleSimulatedPayment = async (status: 'success' | 'failed') => {
    const orderId = localStorage.getItem('reeksto_pending_order_id');
    if (!orderId) {
      addToast('Pending order reference lost', 'error');
      return;
    }

    setLoading(true);
    try {
      const verifyData = await apiRequest('/orders/verify-payment', {
        method: 'POST',
        body: JSON.stringify({
          orderId,
          paymentId: paymentMethod === 'Stripe' ? 'stripe_ch_' + Date.now() : 'rzp_pay_' + Date.now(),
          status
        })
      });

      if (status === 'success') {
        clearCart();
        addToast('Payment completed successfully!', 'success');
        setShowStripeModal(false);
        setShowRazorpayModal(false);
        localStorage.removeItem('reeksto_pending_order_id');
        router.push(`/checkout/success?orderId=$1`);
      } else {
        addToast('Payment authorization failed. Try again.', 'error');
      }
    } catch (err: any) {
      addToast(err.message || 'Error verifying payment', 'error');
    } finally {
      setLoading(false);
      setShowStripeModal(false);
      setShowRazorpayModal(false);
    }
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <h1 className="text-3xl font-black tracking-tight text-foreground">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Columns: Address & Payment */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Address Container */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-card-border space-y-6">
            <h2 className="text-xl font-bold tracking-tight flex items-center space-x-2">
              <MapPin size={20} className="text-luxury-blue" />
              <span>Shipping Address</span>
            </h2>

            {/* Address List */}
            {user.addresses && user.addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map((addr: any) => (
                  <button
                    key={addr._id}
                    onClick={() => setSelectedAddressId(addr._id || '')}
                    className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      selectedAddressId === addr._id
                        ? 'border-luxury-blue bg-luxury-blue/5 shadow-sm'
                        : 'border-foreground/10 hover:border-foreground/20'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{addr.name}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] font-bold text-luxury-blue uppercase tracking-wider bg-luxury-blue/10 px-2 py-0.5 rounded-full">Default</span>
                        )}
                      </div>
                      <p className="text-xs text-foreground/80 mt-2 leading-relaxed">
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zipCode}<br />
                        {addr.country}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-foreground/50 mt-3 block">{addr.phone}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-foreground/60">No shipping addresses saved on file. Please create one below.</p>
            )}

            {/* Add Address trigger */}
            {!showAddressForm ? (
              <button
                onClick={() => setShowAddressForm(true)}
                className="inline-flex items-center space-x-1.5 text-xs text-luxury-blue font-bold hover:underline"
              >
                <Plus size={14} />
                <span>Add New Shipping Address</span>
              </button>
            ) : (
              <form onSubmit={handleAddAddress} className="border-t border-foreground/5 pt-6 space-y-4">
                <h3 className="font-bold text-sm">Add Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Recipient Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="w-full px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Phone Number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Street Address (Suite, apartment, etc.)"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Zip / Postal"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                  />
                </div>

                <div className="flex space-x-3 text-xs font-bold pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-xl bg-foreground text-background"
                  >
                    {loading ? 'Saving...' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-6 py-2 rounded-xl border border-foreground/10 text-foreground/75"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-card-border space-y-6">
            <h2 className="text-xl font-bold tracking-tight flex items-center space-x-2">
              <CreditCard size={20} className="text-luxury-purple" />
              <span>Payment Details</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('Stripe')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'Stripe'
                    ? 'border-luxury-blue bg-luxury-blue/5'
                    : 'border-foreground/10 hover:border-foreground/20'
                }`}
              >
                <div className="font-extrabold text-sm text-foreground">Stripe Gateway</div>
                <p className="text-[10px] text-foreground/60 leading-relaxed mt-2">Pay securely using Visa, Mastercard, or Apple Pay. Mock verified.</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Razorpay')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'Razorpay'
                    ? 'border-luxury-cyan bg-luxury-cyan/5'
                    : 'border-foreground/10 hover:border-foreground/20'
                }`}
              >
                <div className="font-extrabold text-sm text-foreground">Razorpay Checkout</div>
                <p className="text-[10px] text-foreground/60 leading-relaxed mt-2">Instant checkout using cards, UPI, or net banking systems.</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-luxury-purple bg-luxury-purple/5'
                    : 'border-foreground/10 hover:border-foreground/20'
                }`}
              >
                <div className="font-extrabold text-sm text-foreground">Cash on Delivery</div>
                <p className="text-[10px] text-foreground/60 leading-relaxed mt-2">Pay with physical currency at your doorstep upon express delivery.</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Summary Box */}
        <div className="glass-panel p-6 rounded-3xl border border-card-border space-y-6">
          <h2 className="font-bold text-lg pb-4 border-b border-foreground/5">Your Basket</h2>

          {/* Cart items list */}
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-foreground/5 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-xs text-foreground truncate">{item.name}</h4>
                  <div className="text-[10px] text-foreground/50">Qty: {item.quantity} × ₹{item.price}</div>
                </div>
                <span className="text-xs font-bold text-foreground">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Price lines */}
          <div className="space-y-3 text-xs font-semibold pt-4 border-t border-foreground/5">
            <div className="flex justify-between">
              <span className="text-foreground/75">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            
            {appliedCoupon ? (
              <div className="flex justify-between text-emerald-500">
                <span>Coupon ({appliedCoupon.code})</span>
                <span>-₹{discount}</span>
              </div>
            ) : null}

            <div className="flex justify-between">
              <span className="text-foreground/75">Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-foreground/75">Estimated Tax (5%)</span>
              <span>$1</span>
            </div>

            <div className="flex justify-between text-sm font-extrabold border-t border-foreground/5 pt-4">
              <span>Grand Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={submittingOrder}
            className="w-full py-4 rounded-full bg-foreground text-background font-bold text-sm hover:opacity-95 transition-all flex items-center justify-center space-x-2 shadow-md"
          >
            {submittingOrder ? <RefreshCw size={14} className="animate-spin" /> : null}
            <span>Complete Order (₹{total})</span>
          </button>
        </div>
      </div>

      {/* Simulated Stripe Payment Modal */}
      {showStripeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-card-border space-y-6 relative overflow-hidden animate-scale-up">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-blue to-luxury-purple" />
            <div className="flex justify-between items-center">
              <div className="text-lg font-black tracking-tight text-foreground">STRIPE SECURE CHEKOUT</div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Test Mode</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Amount Charged</label>
                <div className="text-3xl font-black">₹{total}</div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Cardholder Name</label>
                  <input
                    type="text"
                    value={stripeCardName}
                    onChange={(e) => setStripeCardName(e.target.value)}
                    placeholder="Recipient Name"
                    className="w-full px-3 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Card Number</label>
                  <input
                    type="text"
                    value={stripeCardNum}
                    onChange={(e) => setStripeCardNum(e.target.value)}
                    className="w-full px-3 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Expiry Date</label>
                    <input
                      type="text"
                      value={stripeExpiry}
                      onChange={(e) => setStripeExpiry(e.target.value)}
                      className="w-full px-3 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">CVC Code</label>
                    <input
                      type="text"
                      value={stripeCvc}
                      onChange={(e) => setStripeCvc(e.target.value)}
                      className="w-full px-3 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 text-xs font-bold pt-4">
              <button
                onClick={() => handleSimulatedPayment('success')}
                className="w-1/2 py-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center justify-center space-x-1"
              >
                <span>Authorize Pay</span>
              </button>
              <button
                onClick={() => handleSimulatedPayment('failed')}
                className="w-1/2 py-3 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all"
              >
                Simulate Fail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Razorpay Payment Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel max-w-sm w-full p-6 rounded-2xl border border-card-border space-y-6 relative overflow-hidden animate-scale-up">
            <div className="absolute top-0 left-0 w-full h-1 bg-luxury-cyan" />
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black text-luxury-cyan">Razorpay</span>
              <span className="text-[9px] font-bold text-foreground/50 bg-foreground/5 px-2 py-0.5 rounded-full">Secure checkout</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between font-semibold border-b border-foreground/5 pb-2">
                <span className="text-foreground/60">Reference ID:</span>
                <span>pay_rzp_{Date.now().toString().substring(8)}</span>
              </div>
              <div className="flex justify-between font-semibold border-b border-foreground/5 pb-2">
                <span className="text-foreground/60">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2">
                <span>Amount:</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2 text-xs font-bold">
              <button
                onClick={() => handleSimulatedPayment('success')}
                className="w-full py-3 rounded-full bg-foreground text-background hover:opacity-90"
              >
                Complete Payment Gateway
              </button>
              <button
                onClick={() => handleSimulatedPayment('failed')}
                className="px-4 py-3 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500/5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
