'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, ShoppingBag, Heart, MapPin, Bell, Key, RefreshCw, FileText, ArrowRight, Trash2, CheckCircle } from 'lucide-react';
import { apiRequest } from '../../utils/api';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import SkeletonLoader from '../../components/SkeletonLoader';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const { user, token, setAddresses, logout, updateUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);

  // Tab Data States
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '', phone: '', street: '', city: '', state: '', zipCode: '', country: 'United States'
  });

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch User orders
        const ordersData = await apiRequest('/orders/myorders');
        setOrders(ordersData || []);

        // Fetch Wishlist
        const wishlistData = await apiRequest('/products/wishlist');
        setWishlist(wishlistData || []);

        // Fetch Notifications
        const notificationsData = await apiRequest('/notifications');
        setNotifications(notificationsData || []);
      } catch (err) {
        console.error('Error fetching dashboard content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const updated = await apiRequest('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ name, password })
      });
      updateUser({ name: updated.name });
      addToast('Profile updated successfully!', 'success');
      setPassword('');
    } catch (err: any) {
      addToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

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
      setShowAddressForm(false);
      setNewAddress({ name: '', phone: '', street: '', city: '', state: '', zipCode: '', country: 'United States' });
    } catch (err: any) {
      addToast(err.message || 'Failed to add address', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    try {
      const response = await apiRequest(`/auth/address/${addressId}`, {
        method: 'DELETE'
      });
      setAddresses(response);
      addToast('Address deleted.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to delete address', 'error');
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    try {
      await apiRequest(`/notifications/${id}/read`, { method: 'PUT' });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      await apiRequest('/notifications/read-all', { method: 'PUT' });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      addToast('All notifications marked as read', 'success');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'orders', name: 'Order History', icon: ShoppingBag, count: orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length },
    { id: 'wishlist', name: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'notifications', name: 'Alerts', icon: Bell, count: notifications.filter(n => !n.read).length }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">User Dashboard</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage your Swiss skincare records and molecular routine packages.</p>
        </div>
        <button
          onClick={() => {
            logout();
            router.push('/auth/login');
          }}
          className="px-5 py-2.5 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all text-xs font-bold bg-transparent"
        >
          Sign Out of Account
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Sidebar Tabs */}
        <aside className="glass-panel p-4 rounded-2xl border border-card-border space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between text-sm transition-all whitespace-nowrap lg:whitespace-normal ${
                  activeTab === tab.id
                    ? 'bg-foreground/5 text-foreground font-bold'
                    : 'hover:bg-foreground/5 text-foreground/75'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Icon size={16} className={activeTab === tab.id ? 'text-luxury-blue' : ''} />
                  <span>{tab.name}</span>
                </span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-2 bg-luxury-blue text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Display */}
        <main className="lg:col-span-3 min-h-80">
          {loading ? (
            <div className="space-y-6">
              <SkeletonLoader className="h-10 w-1/3" />
              <SkeletonLoader className="h-40" />
            </div>
          ) : (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-card-border">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold tracking-tight">Profile Details</h2>
                  <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Email Address (Locked)</label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full px-3.5 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm opacity-50 cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">Update Password</label>
                      <input
                        type="password"
                        placeholder="Leave blank to keep current password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="px-6 py-2.5 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 flex items-center justify-center space-x-1.5"
                    >
                      {updatingProfile ? <RefreshCw size={12} className="animate-spin" /> : null}
                      <span>Save Updates</span>
                    </button>
                  </form>
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold tracking-tight">Order Logs</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-10 text-xs text-foreground/60">
                      No molecular orders logged yet.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order._id} className="border border-foreground/5 rounded-2xl p-5 space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-foreground/5 pb-3">
                            <div>
                              <div className="text-xs font-bold">SKU Ref: {order.trackingNumber}</div>
                              <div className="text-[10px] text-foreground/50">{new Date(order.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div className="flex items-center space-x-3 text-xs">
                              <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[9px] ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-emerald-500/10 text-emerald-500'
                                  : order.orderStatus === 'Cancelled'
                                  ? 'bg-red-500/10 text-red-500'
                                  : 'bg-luxury-blue/10 text-luxury-blue'
                              }`}>
                                {order.orderStatus}
                              </span>
                              {token && (
                                <a
                                  href={`http://localhost:5000/api/orders/${order._id}/invoice?token=${token}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded bg-foreground/5 text-foreground/75 hover:text-foreground flex items-center"
                                  title="Download HTML Invoice"
                                >
                                  <FileText size={14} />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Items */}
                          <div className="space-y-2">
                            {order.items.map((item: any, i: number) => (
                              <div key={i} className="flex justify-between items-center text-xs">
                                <span className="truncate pr-4">{item.name} <strong className="text-foreground/50">× {item.quantity}</strong></span>
                                <span className="font-semibold">${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-foreground/5 text-xs">
                            <span className="text-foreground/50">Total Billing (incl. tax & shipping):</span>
                            <span className="font-extrabold">${order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* WISHLIST TAB */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold tracking-tight">Wishlist</h2>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-10 text-xs text-foreground/60">
                      Your wishlist is currently empty.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {wishlist.map((prod) => (
                        <div key={prod._id} className="border border-foreground/5 rounded-2xl p-4 flex flex-col justify-between relative group">
                          <div>
                            <div className="w-full aspect-square rounded-xl overflow-hidden bg-foreground/5">
                              <img src={prod.images[0]} alt={prod.name} className="object-cover w-full h-full" />
                            </div>
                            <h3 className="font-bold text-xs mt-3 line-clamp-1">{prod.name}</h3>
                            <span className="text-xs font-semibold text-foreground/50 block mt-1">${prod.finalPrice}</span>
                          </div>
                          
                          <Link href={`/shop/${prod.sku}`} className="mt-4 py-2 text-center rounded-xl bg-foreground text-background font-bold text-[10px] hover:opacity-90 flex items-center justify-center space-x-1">
                            <ShoppingBag size={10} />
                            <span>Inspect Formula</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
                    <h2 className="text-xl font-bold tracking-tight">Saved Addresses</h2>
                    <button
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="px-4 py-2 rounded-xl bg-foreground text-background font-bold text-xs"
                    >
                      {showAddressForm ? 'Close Form' : 'Add Address'}
                    </button>
                  </div>

                  {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="space-y-4 max-w-md border-b border-foreground/5 pb-6">
                      <h3 className="font-bold text-sm">Create New Address</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Recipient Name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Phone Number"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Street Address"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        className="w-full px-3.5 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-xs"
                      />
                      <div className="grid grid-cols-2 gap-4">
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
                      </div>
                      <div className="grid grid-cols-2 gap-4">
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
                      <button type="submit" className="px-6 py-2 rounded-xl bg-foreground text-background font-bold text-xs">
                        Save Address
                      </button>
                    </form>
                  )}

                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.addresses.map((addr: any) => (
                        <div key={addr._id} className="border border-foreground/5 rounded-2xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="font-bold text-sm flex justify-between items-center">
                              <span>{addr.name}</span>
                              <button onClick={() => handleDeleteAddress(addr._id)} className="text-red-500 hover:text-red-600">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-xs text-foreground/80 mt-2 leading-relaxed">
                              {addr.street}<br />
                              {addr.city}, {addr.state} {addr.zipCode}<br />
                              {addr.country}
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold text-foreground/50 mt-3 block">{addr.phone}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-foreground/60">No address profiles saved on file.</p>
                  )}
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
                    <h2 className="text-xl font-bold tracking-tight">Active Alerts</h2>
                    {notifications.some(n => !n.read) && (
                      <button
                        onClick={handleMarkAllNotificationsRead}
                        className="text-xs text-luxury-blue hover:underline font-bold"
                      >
                        Mark All Read
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="text-center py-10 text-xs text-foreground/60">
                      No system notifications logged.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div
                          key={notif._id}
                          onClick={() => !notif.read && handleMarkNotificationRead(notif._id)}
                          className={`p-4 rounded-xl border transition-all text-xs ${
                            notif.read
                              ? 'border-foreground/5 bg-foreground/2 opacity-65'
                              : 'border-luxury-blue/20 bg-luxury-blue/5 font-semibold cursor-pointer'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="font-bold">{notif.title}</div>
                            {!notif.read && <span className="w-1.5 h-1.5 bg-luxury-blue rounded-full" />}
                          </div>
                          <p className="text-foreground/75 mt-1">{notif.message}</p>
                          <span className="text-[9px] text-foreground/40 mt-2 block">{new Date(notif.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
