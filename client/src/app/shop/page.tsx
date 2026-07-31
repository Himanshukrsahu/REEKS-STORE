'use client';

import { useState, useEffect } from 'react';
import { Search, Star, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X, Heart, ShoppingBag, GitCompare, Sparkles } from 'lucide-react';
import { apiRequest } from '../../utils/api';
import SkeletonLoader from '../../components/SkeletonLoader';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCompareStore } from '../../store/useCompareStore';
import { useToastStore } from '../../store/useToastStore';
import { useAuthStore } from '../../store/useAuthStore';
import Link from 'next/link';

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkinType, setSelectedSkinType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sort, setSort] = useState('newest');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { addItem } = useCartStore();
  const { wishlistIds, toggleWishlistLocal } = useWishlistStore();
  const { items: compareItems, addItem: addToCompare, removeItem: removeFromCompare, clearCompare } = useCompareStore();
  const { addToast } = useToastStore();
  const { token } = useAuthStore();

  const handleToggleCompare = (product: any) => {
    const exists = compareItems.find(i => i._id === product._id);
    if (exists) {
      removeFromCompare(product._id);
      addToast('Removed from comparison list.', 'info');
    } else {
      addToCompare({
        _id: product._id,
        sku: product.sku,
        name: product.name,
        price: product.price,
        finalPrice: product.finalPrice,
        rating: product.rating,
        category: product.category,
        images: product.images,
        skinType: product.skinType,
        ingredients: product.ingredients,
        benefits: product.benefits,
        stock: product.stock
      });
      addToast('Added to comparison list.', 'success');
    }
  };

  const categories = [
    'Day Cream', 'Night Cream', 'Moisturizer', 'Sunscreen SPF50', 'Face Wash', 'Face Cleanser', 'Toner',
    'Vitamin C Serum', 'Niacinamide Serum', 'Retinol Serum', 'Hyaluronic Acid Serum', 'Salicylic Acid Serum',
    'Eye Cream', 'Lip Balm', 'Face Mask', 'Clay Mask', 'Acne Care', 'Brightening Cream', 'Anti Aging Cream',
    'Body Lotion', 'Body Wash', 'Shampoo', 'Conditioner', 'Hair Serum', 'Hair Oil'
  ];

  const skinTypes = ['Dry', 'Oily', 'Sensitive', 'Combination', 'Normal'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', '9');
      
      if (search) queryParams.append('search', search);
      if (selectedCategory) queryParams.append('category', selectedCategory);
      if (selectedSkinType) queryParams.append('skinType', selectedSkinType);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);
      if (selectedRating) queryParams.append('rating', selectedRating);
      
      // Sort mapping
      let sortVal = 'newest';
      if (sort === 'price_asc') sortVal = 'price_asc';
      if (sort === 'price_desc') sortVal = 'price_desc';
      if (sort === 'rating') sortVal = 'rating';
      queryParams.append('sort', sortVal);

      const data = await apiRequest(`/products?$1`);
      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
      setTotalProductsCount(data.totalProducts || 0);
    } catch (err) {
      console.error('Error fetching shop products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, selectedSkinType, selectedRating, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handlePriceFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedSkinType('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedRating('');
    setSort('newest');
    setCurrentPage(1);
  };

  const handleToggleWishlist = async (product: any) => {
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
        console.error('Failed to sync wishlist with backend:', err);
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Molecular Apothecary</h1>
        <p className="text-sm text-foreground/75 max-w-xl mx-auto">
          Browse Switzerland\'s premier collection of active skincare formulas designed for cell repair, protection, and deep gloss renewal.
        </p>
      </div>

      {/* Control Panel: Search & Sorting */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-background/50 glass-panel p-4 rounded-2xl mb-8 border border-card-border">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search molecular formulas..."
            className="w-full pl-10 pr-4 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-sm focus:outline-none focus:border-luxury-blue"
          />
          <button type="submit" className="absolute left-3 top-2.5 text-foreground/40 hover:text-foreground">
            <Search size={16} />
          </button>
        </form>

        {/* Buttons */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-foreground/10 text-sm font-semibold hover:bg-foreground/5"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>

          <div className="flex items-center space-x-2">
            <ArrowUpDown size={16} className="text-foreground/50" />
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-sm border-none focus:outline-none font-semibold text-foreground"
            >
              <option value="newest" className="bg-background text-foreground">Newest Arrivals</option>
              <option value="price_asc" className="bg-background text-foreground">Price: Low to High</option>
              <option value="price_desc" className="bg-background text-foreground">Price: High to Low</option>
              <option value="rating" className="bg-background text-foreground">Dermatologist Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-card-border space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
              <h2 className="font-bold text-base">Filters</h2>
              <button onClick={clearAllFilters} className="text-xs text-luxury-blue hover:underline font-semibold">
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Category</h3>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === cat ? '' : cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left text-sm py-1 px-2 rounded-lg transition-all ${selectedCategory === cat
                        ? 'bg-luxury-blue/10 text-luxury-blue font-bold'
                        : 'hover:bg-foreground/5 text-foreground/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Type */}
            <div className="space-y-3 pt-4 border-t border-foreground/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Skin Type</h3>
              <div className="space-y-1.5">
                {skinTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedSkinType(selectedSkinType === type ? '' : type);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left text-sm py-1 px-2 rounded-lg transition-all ${selectedSkinType === type
                        ? 'bg-luxury-purple/10 text-luxury-purple font-bold'
                        : 'hover:bg-foreground/5 text-foreground/80'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-foreground/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Price Matrix</h3>
              <form onSubmit={handlePriceFilterSubmit} className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-3 py-1.5 border border-foreground/10 bg-foreground/5 rounded-lg text-xs text-center focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-3 py-1.5 border border-foreground/10 bg-foreground/5 rounded-lg text-xs text-center focus:outline-none"
                />
                <button type="submit" className="hidden" />
              </form>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3 pt-4 border-t border-foreground/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Clinical Rating</h3>
              <div className="space-y-1.5">
                {['4', '3', '2'].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setSelectedRating(selectedRating === star ? '' : star);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left text-sm py-1 px-2 rounded-lg flex items-center space-x-2 transition-all ${selectedRating === star
                        ? 'bg-luxury-cyan/10 text-luxury-cyan font-bold'
                        : 'hover:bg-foreground/5 text-foreground/80'
                    }`}
                  >
                    <span className="flex items-center text-amber-500">
                      <Star size={12} fill="currentColor" />
                    </span>
                    <span>{star}.0+ Stars & Up</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonLoader key={i} className="h-80" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-card-border space-y-4">
              <h3 className="text-xl font-bold">No active formulas match</h3>
              <p className="text-sm text-foreground/60 max-w-sm mx-auto">
                Try widening your price range or clearing filters to locate other cellular items.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-foreground text-background font-bold text-xs rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => {
                  const isWish = wishlistIds.includes(product._id);
                  const isCompared = compareItems.some(i => i._id === product._id);
                  return (
                    <div
                      key={product._id}
                      className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-card-border relative group hover:shadow-lg transition-all"
                    >
                      <div className="space-y-4">
                        <div className="w-full aspect-square rounded-xl overflow-hidden bg-foreground/5 relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-all duration-300"
                          />
                          {/* Wishlist Icon */}
                          <button
                            onClick={() => handleToggleWishlist(product)}
                            className="absolute top-2.5 left-2.5 p-1.5 rounded-full glass-panel border-card-border bg-background/50 hover:text-red-500 transition-all"
                            aria-label="Wishlist"
                          >
                            <Heart size={14} fill={isWish ? 'red' : 'none'} className={isWish ? 'text-red-500' : ''} />
                          </button>
                          {/* Compare Icon */}
                          <button
                            onClick={() => handleToggleCompare(product)}
                            className={`absolute top-11 left-2.5 p-1.5 rounded-full glass-panel border-card-border bg-background/50 transition-all ${isCompared ? 'text-luxury-purple' : 'hover:text-luxury-purple text-foreground/70'
                            }`}
                            aria-label="Compare"
                          >
                            <GitCompare size={14} />
                          </button>
                          {product.discount > 0 && (
                            <span className="absolute top-2.5 right-2.5 bg-luxury-purple text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-luxury-purple uppercase tracking-wider">{product.category}</div>
                          <Link href={`/shop/$1`}>
                            <h3 className="font-bold text-sm tracking-tight text-foreground line-clamp-1 hover:text-luxury-blue transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-1 text-amber-500">
                            <Star size={10} fill="currentColor" />
                            <span className="text-xs font-bold">{product.rating}</span>
                            <span className="text-[10px] text-foreground/50">({product.numReviews})</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between pt-3 border-t border-foreground/5">
                        <div className="flex flex-col">
                          {product.discount > 0 && (
                            <span className="text-[10px] text-foreground/40 line-through">₹{product.price}</span>
                          )}
                          <span className="font-extrabold text-sm">₹{product.finalPrice}</span>
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
                          className="p-2 rounded-xl bg-foreground text-background hover:bg-luxury-blue hover:text-white transition-all text-xs font-semibold flex items-center space-x-1"
                        >
                          <ShoppingBag size={12} />
                          <span>Buy</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-6 pt-8 border-t border-foreground/5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-2 rounded-xl border border-foreground/10 hover:bg-foreground/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-bold text-foreground/80">
                    Page {currentPage} of {totalPages} ({totalProductsCount} Formulas)
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-2 rounded-xl border border-foreground/10 hover:bg-foreground/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-80 bg-background h-full p-6 space-y-6 overflow-y-auto animate-[slideInRight_0.2s_ease-out]">
            <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-1 rounded-full hover:bg-foreground/5">
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Category</h3>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === cat ? '' : cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left text-sm py-1.5 px-2 rounded-lg ${selectedCategory === cat
                        ? 'bg-luxury-blue/10 text-luxury-blue font-bold'
                        : 'hover:bg-foreground/5 text-foreground/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Type */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Skin Type</h3>
              <div className="space-y-1">
                {skinTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedSkinType(selectedSkinType === type ? '' : type);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left text-sm py-1.5 px-2 rounded-lg ${selectedSkinType === type
                        ? 'bg-luxury-purple/10 text-luxury-purple font-bold'
                        : 'hover:bg-foreground/5 text-foreground/80'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearAllFilters}
              className="w-full py-2.5 text-center text-xs font-semibold text-red-500 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-xl"
            >
              Reset All
            </button>
          </div>
        </div>
      )}

      {/* Compare Sticky Bar */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-background/80 glass-panel border border-card-border px-6 py-4 rounded-2xl flex items-center justify-between space-x-8 shadow-2xl animate-[slideUp_0.3s_ease-out]">
          <div className="flex items-center space-x-2 text-xs font-bold">
            <Sparkles size={14} className="text-luxury-purple animate-pulse" />
            <span>Selected {compareItems.length} elixirs for diagnostics</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/compare" className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90">
              Compare Now
            </Link>
            <button onClick={clearCompare} className="text-xs text-foreground/45 hover:text-red-500 font-bold">
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
