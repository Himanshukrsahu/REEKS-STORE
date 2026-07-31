'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, FileText, ArrowRight, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { apiRequest } from '../../../utils/api';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { useAuthStore } from '../../../store/useAuthStore';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      try {
        const data = await apiRequest(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order for success details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center space-y-6">
        <SkeletonLoader className="h-20 w-20 rounded-full mx-auto" />
        <SkeletonLoader className="h-8 w-3/4 mx-auto" />
        <SkeletonLoader className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-8 animate-scale-up">
      <div className="flex flex-col items-center space-y-4">
        <img src="/logo.jpg" alt="Reeks Store Logo" className="w-24 h-24 rounded-3xl object-cover shadow-md border border-card-border" />
        <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <CheckCircle size={32} />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight">Order Placed successfully!</h1>
        <p className="text-sm text-foreground/70 max-w-md mx-auto">
          We have received your molecular order. A confirmation billing record and shipping update has been sent (simulated).
        </p>
      </div>

      {order && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-card-border text-left space-y-5">
          <div className="flex justify-between items-center pb-4 border-b border-foreground/5 text-xs font-semibold text-foreground/60">
            <span>Tracking Number: <strong className="text-foreground font-bold">{order.trackingNumber}</strong></span>
            <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="font-bold text-foreground">Delivery Destination</div>
            <p className="text-xs text-foreground/75 leading-relaxed">
              <strong>{order.shippingAddress.name}</strong><br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>

          <div className="space-y-3 border-t border-foreground/5 pt-4">
            <div className="flex justify-between text-sm font-bold text-foreground">
              <span>Total Price Paid:</span>
              <span>₹{order.total}</span>
            </div>
            <div className="text-[10px] text-foreground/50">Payment reference method: {order.paymentMethod} ({order.paymentStatus})</div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        {orderId && token && (
          <a
            href={`http://localhost:5000/api/orders/$1/invoice?token=$1`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-foreground text-background font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <FileText size={16} />
            <span>Download HTML Invoice</span>
          </a>
        )}
        
        <Link
          href="/dashboard?tab=orders"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-foreground/10 text-foreground font-semibold text-sm hover:bg-foreground/5 transition-all flex items-center justify-center space-x-2"
        >
          <span>Track Order</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
