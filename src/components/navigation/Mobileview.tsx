

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  ShoppingCart,
  Package,
  HelpCircle,
  Phone,
  Sparkles,
} from 'lucide-react';

import type { Category } from '@/features/category/types/category.types';

import {
  useAppSelector,
  selectCartItemCount,
  selectWishlistCount,
} from '@/redux';

import { selectUser } from '@/redux/slices/authSlice';
import { useLogout } from '@/auth/hooks/useLogout';
import { SearchBar } from './SearchBar';

interface MobileMenuProps {
  primaryItems: {
    name: string;
    href: string;
  }[];

  categories: Category[];

  onClose: () => void;
}

export const MobileMenu = ({
  primaryItems,
  categories,
  onClose,
}: MobileMenuProps) => {
  const user = useAppSelector(selectUser);

  const handleLogout = useLogout();

  const cartItemCount = useAppSelector(selectCartItemCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const canAccessAdmin =
    Array.isArray(user?.roles) &&
    user.roles.includes('admin');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleLogoutAndClose = () => {
    handleLogout();
    onClose();
  };

  return (
    <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">

      {/* =========================================
          Backdrop
      ========================================= */}

      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* =========================================
          Drawer
      ========================================= */}

      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-left">

        {/* =========================================
            Drawer Header
        ========================================= */}

        <div className="p-4 border-b border-[#f0ebe5] flex items-center justify-between bg-[#fcfbfa]">

          <div>
            <Link
              to="/"
              onClick={onClose}
              className="font-serif text-base font-medium tracking-[0.1em] text-[#1a1a1a] uppercase block"
            >
              Bijeshwori Mala Traders
            </Link>

            <p className="text-[10px] text-[#1a1a1a]/50 tracking-wider">
              Himalayan Sacred Crafts
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* =========================================
            Quick Search
        ========================================= */}

        <div className="px-4 py-3 bg-[#fcfbfa] border-b border-[#f0ebe5]">
          <SearchBar
            isHomePage={false}
            isScrolled={true}
            onClose={onClose}
          />
        </div>

        {/* =========================================
            User Account / Auth
        ========================================= */}

        <div className="p-4 bg-[#f9f6f0] border-b border-[#f0ebe5]">

          {user ? (

            <div className="space-y-3">

              {/* User Information */}

              <div className="flex items-center space-x-3">

                <div className="w-9 h-9 rounded-full bg-[#b8860b]/10 text-[#b8860b] flex items-center justify-center font-medium text-sm border border-[#b8860b]/20">
                  {user.full_name ? (
                    user.full_name.charAt(0).toUpperCase()
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs font-semibold text-[#1a1a1a] truncate">
                    {user.full_name || 'My Account'}
                  </p>

                  <p className="text-[11px] text-[#1a1a1a]/60 truncate">
                    {user.email}
                  </p>

                </div>

              </div>

              {/* Account Actions */}

              <div className="grid grid-cols-2 gap-2 pt-1">

                <Link
                  to="/account"
                  onClick={onClose}
                  className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-medium text-[#1a1a1a] hover:bg-[#b8860b] hover:text-white transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Account</span>
                </Link>

                <button
                  onClick={handleLogoutAndClose}
                  className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

              </div>

              {/* Admin Dashboard */}

              {canAccessAdmin && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#b8860b] text-white text-xs font-medium shadow-xs hover:bg-[#a07509] transition-colors"
                >

                  <span className="flex items-center space-x-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </span>

                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
                    Admin
                  </span>

                </Link>
              )}

            </div>

          ) : (

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-xs font-semibold text-[#1a1a1a]">
                  Welcome to Bijeshwori
                </p>

                <p className="text-[11px] text-[#1a1a1a]/60">
                  Sign in to track orders & wishlist
                </p>
              </div>

              <div className="flex items-center space-x-2">

                <Link
                  to="/login"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg bg-[#b8860b] text-white text-xs font-medium hover:bg-[#a07509] transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-medium text-[#1a1a1a] hover:bg-neutral-50 transition-colors"
                >
                  Register
                </Link>

              </div>

            </div>

          )}

        </div>

        {/* =========================================
            Scrollable Navigation
        ========================================= */}

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

          {/* =========================================
              Quick Actions
          ========================================= */}

          <div className="grid grid-cols-2 gap-2">

            {/* Wishlist */}

            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-black/5 hover:border-[#b8860b]/40 transition-colors"
            >

              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-[#b8860b]" />
                <span className="text-xs font-medium text-[#1a1a1a]">
                  Wishlist
                </span>
              </div>

              {wishlistCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#b8860b] rounded-full">
                  {wishlistCount}
                </span>
              )}

            </Link>

            {/* Cart */}

            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-black/5 hover:border-[#b8860b]/40 transition-colors"
            >

              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 text-[#b8860b]" />

                <span className="text-xs font-medium text-[#1a1a1a]">
                  Cart
                </span>
              </div>

              {cartItemCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#b8860b] rounded-full">
                  {cartItemCount}
                </span>
              )}

            </Link>

          </div>

          {/* =========================================
              Primary Links
          ========================================= */}

          <div className="space-y-1">

            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40 px-1 mb-2">
              Menu
            </h4>

            {primaryItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a] hover:bg-[#b8860b]/5 hover:text-[#b8860b] transition-colors"
                onClick={onClose}
              >
                <span>{item.name}</span>

                {item.name.toLowerCase() === 'sale' && (
                  <span className="text-[9px] font-bold text-white bg-red-600 px-1.5 py-0.5 rounded-full tracking-normal uppercase">
                    Hot
                  </span>
                )}
              </Link>
            ))}

          </div>

          <div className="border-t border-[#f0ebe5]" />

          {/* =========================================
              REAL Shop Categories
          ========================================= */}

          <div className="space-y-3">

            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40 px-1">
              Shop Categories
            </h4>

            <div className="space-y-1">

              {categories.length === 0 ? (

                <p className="px-2.5 py-2 text-xs text-[#1a1a1a]/50">
                  No categories available.
                </p>

              ) : (

                categories.map((category) => (

                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 px-2.5 rounded-lg text-xs font-medium text-[#1a1a1a] hover:bg-[#b8860b]/5 hover:text-[#b8860b] transition-colors"
                  >

                    <span>
                      {category.title}
                    </span>

                    <span className="text-[#1a1a1a]/30">
                      →
                    </span>

                  </Link>

                ))

              )}

            </div>

          </div>

          <div className="border-t border-[#f0ebe5]" />

          {/* =========================================
              Customer Care
          ========================================= */}

          <div className="space-y-2">

            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40 px-1">
              Customer Care
            </h4>

            <div className="space-y-1">

              <Link
                to="/track-order"
                onClick={onClose}
                className="flex items-center space-x-2.5 px-2.5 py-1.5 text-xs text-[#1a1a1a]/80 hover:text-[#b8860b] hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <Package className="w-4 h-4 text-[#b8860b]" />
                <span>Track Your Order</span>
              </Link>

              <Link
                to="/help"
                onClick={onClose}
                className="flex items-center space-x-2.5 px-2.5 py-1.5 text-xs text-[#1a1a1a]/80 hover:text-[#b8860b] hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#b8860b]" />
                <span>Help & FAQs</span>
              </Link>

              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center space-x-2.5 px-2.5 py-1.5 text-xs text-[#1a1a1a]/80 hover:text-[#b8860b] hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-[#b8860b]" />
                <span>Contact Us</span>
              </Link>

            </div>

          </div>

        </div>

        {/* =========================================
            Drawer Footer
        ========================================= */}

        <div className="p-4 bg-[#f9f6f0] border-t border-[#f0ebe5] space-y-1">

          <p className="flex items-center text-[11px] text-[#1a1a1a]/70 font-medium">

            <Sparkles className="w-3.5 h-3.5 text-[#b8860b] mr-1.5 flex-shrink-0" />

            <span>
              Free shipping on orders over $150
            </span>

          </p>

          <p className="text-[10px] text-[#1a1a1a]/50 pl-5">
            Complimentary gift wrapping included
          </p>

        </div>

      </div>
    </div>
  );
};