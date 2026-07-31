'use client';

import Link from 'next/link';
import { Trash2, ShoppingCart, Star, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useCompareStore } from '../../store/useCompareStore';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';

export default function Compare() {
  const { items, removeItem, clearCompare } = useCompareStore();
  const { addItem: addCartItem } = useCartStore();
  const { addToast } = useToastStore();

  const handleAddToCart = (product: any) => {
    addCartItem({
      productId: product._id,
      sku: product.sku,
      name: product.name,
      price: product.finalPrice,
      image: product.images[0] || '',
      stock: product.stock
    }, 1);
    addToast(`Added $1 to cart.`, 'success');
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in">
        <div className="inline-flex p-6 rounded-full bg-foreground/5 text-foreground/40">
          <Sparkles size={48} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">No products selected for comparison</h2>
        <p className="text-sm text-foreground/60 max-w-sm mx-auto">
          Add up to 3 products from our molecular shop browser to view side-by-side spec diagnostics.
        </p>
        <Link href="/shop" className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-foreground text-background font-bold text-sm hover:opacity-90 shadow-md transition-all">
          <span>Explore Apothecary</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      <div className="flex justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Molecular Comparer</h1>
          <p className="text-xs text-foreground/60 mt-1">Diagnose structural and price matrices across selected Switzerland elixirs.</p>
        </div>
        <button
          onClick={clearCompare}
          className="text-xs font-bold text-red-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr className="border-b border-foreground/10">
              <th className="py-6 pr-6 w-1/4 text-xs font-bold uppercase tracking-wider text-foreground/40">Spec Matrix</th>
              {items.map((product) => (
                <th key={product._id} className="py-6 px-6 w-1/4 relative group">
                  <button
                    onClick={() => removeItem(product._id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/5 text-foreground/50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    title="Remove item"
                  >
                    <Trash2 size={12} />
                  </button>
                  
                  <div className="space-y-4">
                    <div className="w-32 h-32 rounded-2xl bg-foreground/5 overflow-hidden mx-auto border border-card-border">
                      <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-[10px] font-bold text-luxury-purple uppercase tracking-wider">{product.category}</div>
                      <Link href={`/shop/$1`}>
                        <h3 className="font-extrabold text-sm line-clamp-2 hover:text-luxury-blue transition-colors">{product.name}</h3>
                      </Link>
                      <div className="font-black text-sm pt-1">₹{product.finalPrice}</div>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full py-2 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center space-x-1"
                    >
                      <ShoppingCart size={12} />
                      <span>{product.stock > 0 ? 'Add to Bag' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </th>
              ))}
              {/* Fill remaining empty headers up to 3 */}
              {items.length < 3 && [...Array(3 - items.length)].map((_, i) => (
                <th key={i} className="py-6 px-6 w-1/4 border-l border-dashed border-foreground/5 text-center">
                  <div className="text-xs text-foreground/45 border border-dashed border-foreground/10 rounded-3xl p-16">
                    <Link href="/shop" className="text-luxury-blue font-bold hover:underline">Add product</Link> to compare
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-foreground/5 text-xs">
            {/* Price */}
            <tr>
              <td className="py-5 font-bold text-foreground/60 uppercase tracking-wider">Original Price</td>
              {items.map(product => (
                <td key={product._id} className="py-5 px-6 font-semibold">₹{product.price}</td>
              ))}
              {items.length < 3 && [...Array(3 - items.length)].map((_, i) => <td key={i} className="py-5 px-6" />)}
            </tr>

            {/* Rating */}
            <tr>
              <td className="py-5 font-bold text-foreground/60 uppercase tracking-wider">Clinical Rating</td>
              {items.map(product => (
                <td key={product._id} className="py-5 px-6">
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <span className="font-bold">{product.rating} / 5.0</span>
                  </div>
                </td>
              ))}
              {items.length < 3 && [...Array(3 - items.length)].map((_, i) => <td key={i} className="py-5 px-6" />)}
            </tr>

            {/* Skin Type */}
            <tr>
              <td className="py-5 font-bold text-foreground/60 uppercase tracking-wider">Compatible Skin</td>
              {items.map(product => (
                <td key={product._id} className="py-5 px-6">
                  <div className="flex flex-wrap gap-1">
                    {product.skinType.map((type, idx) => (
                      <span key={idx} className="bg-luxury-purple/5 border border-luxury-purple/10 text-luxury-purple text-[9px] px-2 py-0.5 rounded-full font-semibold">
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
              {items.length < 3 && [...Array(3 - items.length)].map((_, i) => <td key={i} className="py-5 px-6" />)}
            </tr>

            {/* Ingredients */}
            <tr>
              <td className="py-5 font-bold text-foreground/60 uppercase tracking-wider">Molecular Assets</td>
              {items.map(product => (
                <td key={product._id} className="py-5 px-6 max-w-xs">
                  <div className="flex flex-wrap gap-1 leading-relaxed">
                    {product.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-luxury-blue/5 border border-luxury-blue/10 text-luxury-blue text-[9px] px-2 py-0.5 rounded-full font-semibold">
                        {ing}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
              {items.length < 3 && [...Array(3 - items.length)].map((_, i) => <td key={i} className="py-5 px-6" />)}
            </tr>

            {/* Benefits */}
            <tr>
              <td className="py-5 font-bold text-foreground/60 uppercase tracking-wider">Biological Efficacy</td>
              {items.map(product => (
                <td key={product._id} className="py-5 px-6 max-w-xs leading-relaxed text-foreground/80">
                  <ul className="list-disc pl-4 space-y-1">
                    {product.benefits.map((ben, idx) => (
                      <li key={idx}>{ben}</li>
                    ))}
                  </ul>
                </td>
              ))}
              {items.length < 3 && [...Array(3 - items.length)].map((_, i) => <td key={i} className="py-5 px-6" />)}
            </tr>

            {/* Stock */}
            <tr>
              <td className="py-5 font-bold text-foreground/60 uppercase tracking-wider">Stock Availability</td>
              {items.map(product => (
                <td key={product._id} className="py-5 px-6 font-semibold">
                  <span className={product.stock > 0 ? 'text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full' : 'text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full'}>
                    {product.stock > 0 ? `$1 units` : 'Out of Stock'}
                  </span>
                </td>
              ))}
              {items.length < 3 && [...Array(3 - items.length)].map((_, i) => <td key={i} className="py-5 px-6" />)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
