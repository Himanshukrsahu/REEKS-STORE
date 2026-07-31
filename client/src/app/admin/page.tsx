'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Package, Ticket, ShoppingBag, ShieldCheck, RefreshCw, Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';
import { apiRequest } from '../../utils/api';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import SkeletonLoader from '../../components/SkeletonLoader';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(true);

  // Data States
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Product Create/Edit Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '', sku: '', category: 'Day Cream', price: 0, discount: 0, stock: 10,
    description: 'Swiss active cellular shield...', skinType: 'Dry, Normal',
    ingredients: 'Hyaluronic Acid, Squalane', benefits: 'Deep hydration',
    usage: 'Apply drops on cleansed skin', images: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600'
  });

  // Coupon Form State
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '', discountPercentage: 10, minOrderAmount: 0, maxDiscountAmount: 30,
    usageLimit: 100, expiryDate: '2028-12-31'
  });

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const statsData = await apiRequest('/dashboard/stats');
        setStats(statsData);

        const prodData = await apiRequest('/products?limit=50');
        setProducts(prodData.products || []);

        const couponData = await apiRequest('/coupons');
        setCoupons(couponData || []);

        const orderData = await apiRequest('/orders');
        setOrders(orderData || []);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [token]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        discount: Number(productForm.discount),
        stock: Number(productForm.stock),
        images: [productForm.images]
      };

      if (editingProductId) {
        const updated = await apiRequest(`/products/${editingProductId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        setProducts(prev => prev.map(p => p._id === editingProductId ? updated : p));
        addToast('Product updated successfully.', 'success');
      } else {
        const created = await apiRequest('/products', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        setProducts(prev => [created, ...prev]);
        addToast('Product created successfully.', 'success');
      }

      setShowProductForm(false);
      setEditingProductId(null);
      setProductForm({
        name: '', sku: '', category: 'Day Cream', price: 0, discount: 0, stock: 10,
        description: 'Swiss active cellular shield...', skinType: 'Dry, Normal',
        ingredients: 'Hyaluronic Acid, Squalane', benefits: 'Deep hydration',
        usage: 'Apply drops on cleansed skin', images: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600'
      });
    } catch (err: any) {
      addToast(err.message || 'Failed to submit product form', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (prod: any) => {
    setEditingProductId(prod._id);
    setProductForm({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      price: prod.price,
      discount: prod.discount,
      stock: prod.stock,
      description: prod.description,
      skinType: prod.skinType.join(', '),
      ingredients: prod.ingredients.join(', '),
      benefits: prod.benefits.join(', '),
      usage: prod.usage,
      images: prod.images[0] || ''
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await apiRequest(`/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p._id !== id));
      addToast('Product deleted.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to delete product', 'error');
    }
  };

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await apiRequest('/coupons', {
        method: 'POST',
        body: JSON.stringify(couponForm)
      });
      setCoupons(prev => [created, ...prev]);
      addToast('Coupon created successfully.', 'success');
      setShowCouponForm(false);
      setCouponForm({
        code: '', discountPercentage: 10, minOrderAmount: 0, maxDiscountAmount: 30,
        usageLimit: 100, expiryDate: '2028-12-31'
      });
    } catch (err: any) {
      addToast(err.message || 'Failed to create coupon', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await apiRequest(`/coupons/${id}`, { method: 'DELETE' });
      setCoupons(prev => prev.filter(c => c._id !== id));
      addToast('Coupon deleted successfully.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to delete coupon', 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const updated = await apiRequest(`/orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      setOrders(prev => prev.map(o => o._id === orderId ? updated : o));
      addToast(`Order updated status to: ${status}`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to update order status', 'error');
    }
  };

  if (!user || user.role !== 'admin') return null;

  const tabs = [
    { id: 'analytics', name: 'Dashboard Analytics', icon: BarChart3 },
    { id: 'products', name: 'Product Inventory', icon: Package },
    { id: 'coupons', name: 'Coupon Engine', icon: Ticket },
    { id: 'orders', name: 'Customer Orders', icon: ShoppingBag }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="flex items-center space-x-3 pb-6 border-b border-foreground/5">
        <ShieldCheck size={28} className="text-luxury-purple animate-pulse" />
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin Operations Console</h1>
          <p className="text-xs text-foreground/60">Configure products, coupon codes, and track fulfillment schedules.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Navigation Tabs */}
        <aside className="glass-panel p-4 rounded-2xl border border-card-border space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 text-sm transition-all whitespace-nowrap lg:whitespace-normal ${
                  activeTab === tab.id
                    ? 'bg-foreground/5 text-foreground font-bold'
                    : 'hover:bg-foreground/5 text-foreground/75'
                }`}
              >
                <Icon size={16} className={activeTab === tab.id ? 'text-luxury-purple' : ''} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab View */}
        <main className="lg:col-span-3 min-h-80">
          {loading ? (
            <div className="space-y-6">
              <SkeletonLoader className="h-10 w-1/3" />
              <SkeletonLoader className="h-48" />
            </div>
          ) : (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-card-border">
              
              {/* ANALYTICS TAB */}
              {activeTab === 'analytics' && stats && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-xl font-bold tracking-tight">Analytics Summary</h2>
                  
                  {/* Grid summary cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="glass-panel p-5 rounded-2xl border border-card-border">
                      <div className="text-xs font-bold text-foreground/50 uppercase">Total Revenue</div>
                      <div className="text-2xl font-black text-foreground mt-1">${stats.summary.totalRevenue}</div>
                    </div>
                    <div className="glass-panel p-5 rounded-2xl border border-card-border">
                      <div className="text-xs font-bold text-foreground/50 uppercase">Sales Orders</div>
                      <div className="text-2xl font-black text-foreground mt-1">{stats.summary.totalOrders}</div>
                    </div>
                    <div className="glass-panel p-5 rounded-2xl border border-card-border">
                      <div className="text-xs font-bold text-foreground/50 uppercase">Avg Basket Value</div>
                      <div className="text-2xl font-black text-foreground mt-1">${stats.summary.avgOrderValue}</div>
                    </div>
                    <div className="glass-panel p-5 rounded-2xl border border-card-border">
                      <div className="text-xs font-bold text-foreground/50 uppercase">User Accounts</div>
                      <div className="text-2xl font-black text-foreground mt-1">{stats.summary.totalUsers}</div>
                    </div>
                  </div>

                  {/* Monthly sales charts (pure CSS/HTML layout) */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50">Revenue Distribution Trend</h3>
                    <div className="glass-panel p-6 rounded-2xl border border-card-border flex items-end justify-between h-48 pt-10">
                      {stats.chartData.map((item: any, i: number) => {
                        const maxVal = Math.max(...stats.chartData.map((d: any) => d.revenue));
                        const pct = maxVal > 0 ? (item.revenue / maxVal) * 100 : 50;
                        return (
                          <div key={i} className="flex flex-col items-center flex-grow space-y-2 h-full justify-end">
                            <div className="text-[10px] font-bold text-luxury-purple">${item.revenue}</div>
                            <div
                              className="w-10 sm:w-16 bg-gradient-to-t from-luxury-blue to-luxury-purple rounded-t-lg transition-all duration-500"
                              style={{ height: `${Math.max(5, pct - 20)}%` }}
                            />
                            <div className="text-[9px] font-semibold text-foreground/60">{item.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Low Stock Alerts */}
                  {stats.lowStockProducts?.length > 0 && (
                    <div className="space-y-3 pt-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-red-500">Low Stock Alert Checklist</h3>
                      <div className="space-y-2">
                        {stats.lowStockProducts.map((prod: any) => (
                          <div key={prod._id} className="flex justify-between items-center text-xs p-3 border border-red-500/10 bg-red-500/5 rounded-xl">
                            <span>{prod.name} (SKU: {prod.sku})</span>
                            <span className="font-bold text-red-500">{prod.stock} left in stock</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PRODUCTS TAB */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-foreground/5 pb-4">
                    <h2 className="text-xl font-bold tracking-tight">Product Inventory</h2>
                    <button
                      onClick={() => {
                        setEditingProductId(null);
                        setShowProductForm(!showProductForm);
                      }}
                      className="px-4 py-2 rounded-xl bg-foreground text-background font-bold text-xs flex items-center space-x-1.5"
                    >
                      <Plus size={14} />
                      <span>Create Product</span>
                    </button>
                  </div>

                  {/* Create / Edit Form */}
                  {showProductForm && (
                    <form onSubmit={handleProductSubmit} className="space-y-4 border-b border-foreground/5 pb-6">
                      <h3 className="font-bold text-sm">{editingProductId ? 'Edit Product SKU' : 'Create Product SKU'}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Product Name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                        <input
                          type="text"
                          required
                          disabled={!!editingProductId}
                          placeholder="SKU Code"
                          value={productForm.sku}
                          onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs font-mono uppercase disabled:opacity-50"
                        />
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs text-foreground"
                        >
                          <option value="Day Cream">Day Cream</option>
                          <option value="Night Cream">Night Cream</option>
                          <option value="Moisturizer">Moisturizer</option>
                          <option value="Sunscreen SPF50">Sunscreen SPF50</option>
                          <option value="Vitamin C Serum">Vitamin C Serum</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="number"
                          required
                          placeholder="MRP Price"
                          value={productForm.price || ''}
                          onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                        <input
                          type="number"
                          placeholder="Discount Percentage"
                          value={productForm.discount || ''}
                          onChange={(e) => setProductForm({ ...productForm, discount: Number(e.target.value) })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                        <input
                          type="number"
                          required
                          placeholder="Stock Quantity"
                          value={productForm.stock || ''}
                          onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Image URL"
                        value={productForm.images}
                        onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                        className="w-full px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                      />

                      <div className="flex space-x-3 text-xs font-bold pt-2">
                        <button type="submit" className="px-6 py-2 rounded-xl bg-foreground text-background">
                          Save Product
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowProductForm(false)}
                          className="px-6 py-2 rounded-xl border border-foreground/10 text-foreground/75 animate-fade-in"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Products List Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-foreground/5 text-foreground/50 uppercase tracking-wider">
                          <th className="py-3">Name</th>
                          <th>SKU</th>
                          <th>Stock</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((prod) => (
                          <tr key={prod._id} className="border-b border-foreground/2">
                            <td className="py-3 font-semibold">{prod.name}</td>
                            <td className="font-mono text-foreground/60">{prod.sku}</td>
                            <td>{prod.stock}</td>
                            <td>${prod.finalPrice}</td>
                            <td className="space-x-3">
                              <button onClick={() => handleEditProduct(prod)} className="text-luxury-blue hover:text-luxury-blue/70">
                                <Edit2 size={12} />
                              </button>
                              <button onClick={() => handleDeleteProduct(prod._id)} className="text-red-500 hover:text-red-600">
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* COUPONS TAB */}
              {activeTab === 'coupons' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-foreground/5 pb-4">
                    <h2 className="text-xl font-bold tracking-tight">Coupon Engine</h2>
                    <button
                      onClick={() => setShowCouponForm(!showCouponForm)}
                      className="px-4 py-2 rounded-xl bg-foreground text-background font-bold text-xs flex items-center space-x-1.5"
                    >
                      <Plus size={14} />
                      <span>Create Coupon</span>
                    </button>
                  </div>

                  {showCouponForm && (
                    <form onSubmit={handleCouponSubmit} className="space-y-4 border-b border-foreground/5 pb-6">
                      <h3 className="font-bold text-sm">Add Coupon Code</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Coupon Code"
                          value={couponForm.code}
                          onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs uppercase font-bold"
                        />
                        <input
                          type="number"
                          required
                          placeholder="Discount Percentage"
                          value={couponForm.discountPercentage || ''}
                          onChange={(e) => setCouponForm({ ...couponForm, discountPercentage: Number(e.target.value) })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                        <input
                          type="number"
                          placeholder="Min Order Requirement"
                          value={couponForm.minOrderAmount || ''}
                          onChange={(e) => setCouponForm({ ...couponForm, minOrderAmount: Number(e.target.value) })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                      </div>
                      <button type="submit" className="px-6 py-2 rounded-xl bg-foreground text-background font-bold text-xs">
                        Save Coupon
                      </button>
                    </form>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-foreground/5 text-foreground/50 uppercase tracking-wider">
                          <th className="py-3">Code</th>
                          <th>Discount</th>
                          <th>Min Order</th>
                          <th>Usage Count</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((coup) => (
                          <tr key={coup._id} className="border-b border-foreground/2">
                            <td className="py-3 font-bold text-luxury-purple">{coup.code}</td>
                            <td>{coup.discountPercentage}%</td>
                            <td>${coup.minOrderAmount}</td>
                            <td>{coup.usageCount} / {coup.usageLimit}</td>
                            <td>
                              <button onClick={() => handleDeleteCoupon(coup._id)} className="text-red-500 hover:text-red-600">
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold tracking-tight">Fulfillment Orders</h2>
                  
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div key={ord._id} className="border border-foreground/5 rounded-2xl p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-foreground/5">
                          <div>
                            <div className="text-xs font-bold text-foreground">Order Ref: {ord.trackingNumber}</div>
                            <div className="text-[10px] text-foreground/50">Date: {new Date(ord.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                              className="px-3 py-1.5 rounded-lg border border-foreground/10 bg-foreground/5 text-xs text-foreground font-semibold"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer */}
                        <div className="text-xs text-foreground/80 space-y-1">
                          <div>Customer: <strong>{ord.user?.name}</strong> ({ord.user?.email})</div>
                          <div>Address: {ord.shippingAddress?.street}, {ord.shippingAddress?.city}, {ord.shippingAddress?.state}</div>
                          <div>Payment Method: {ord.paymentMethod} ({ord.paymentStatus})</div>
                        </div>

                        {/* Items */}
                        <div className="space-y-1.5 pt-2">
                          {ord.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span>{item.name} × {item.quantity}</span>
                              <span className="font-semibold">${item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-foreground/5 text-xs font-extrabold">
                          <span>Total Amount Collected:</span>
                          <span>${ord.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
