'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, User, Shield, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useThemeStore } from '../store/useThemeStore';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const { wishlistIds } = useWishlistStore();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Brands', href: '/#brands' },
    { name: 'About', href: '/#about' },
    { name: 'Team', href: '/#team' }
  ];

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-transparent bg-transparent" />
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel h-16 border-b border-card-border shadow-md'
          : 'bg-transparent h-20 border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2.5">
            <img src="/logo.jpg" alt="Reeks Store Logo" className="w-12 h-12 rounded-xl object-cover border border-card-border shadow-sm" />
            <span className="text-xl font-black tracking-tight text-foreground bg-gradient-to-r from-luxury-blue via-luxury-purple to-luxury-cyan bg-clip-text text-transparent">
              REEKS STORE.
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-luxury-blue ${
                pathname === link.href ? 'text-luxury-blue font-semibold' : 'text-foreground/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground/80 hover:text-luxury-blue hover:bg-foreground/5 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>



          {/* Admin badge */}
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="p-2 rounded-full text-foreground/80 hover:text-luxury-purple hover:bg-foreground/5 transition-all flex items-center"
              title="Admin Dashboard"
            >
              <Shield size={20} className="text-luxury-purple" />
            </Link>
          )}

          {/* Profile / Login */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground/80 hover:text-luxury-blue flex items-center space-x-1"
              >
                <User size={18} />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-foreground/10 hover:border-red-500 hover:text-red-500 transition-all bg-transparent"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/auth/login"
                className="text-sm font-semibold px-4 py-2 rounded-full border border-foreground/10 hover:border-foreground/20 text-foreground transition-all"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-semibold px-5 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition-all shadow-sm"
              >
                Join Member
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Dark Mode */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground/80 hover:text-luxury-blue"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>



          {/* Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col p-6 animate-fade-in">
          <nav className="flex flex-col space-y-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-luxury-blue border-b border-foreground/5 pb-2"
              >
                {link.name}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-luxury-purple flex items-center space-x-2 border-b border-foreground/5 pb-2"
              >
                <Shield size={20} />
                <span>Admin Console</span>
              </Link>
            )}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 border-b border-foreground/5 pb-2"
                >
                  <User size={20} />
                  <span>My Profile ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-left text-red-500 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-4">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-center rounded-full border border-foreground/10 text-foreground font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-center font-semibold rounded-full bg-foreground text-background"
                >
                  Join Member
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
