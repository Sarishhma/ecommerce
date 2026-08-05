import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Heart, User } from 'lucide-react';
import { useAppSelector, selectCartItemCount } from '@/redux';
import { CATEGORIES, PRIMARY_NAV_ITEMS } from '@/config/navigation';
import { TopBar } from '../navigation/TopBar';
import { SearchBar } from '../navigation/SearchBar'; // Ensure this path matches your Search component
import { MobileMenu } from '../navigation/Mobileview';
import { MegaMenu } from '../navigation/Megamenu';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const location = useLocation();
  const cartItemCount = useAppSelector(selectCartItemCount);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHomePage = location.pathname === '/';
  const activeCategoryData = CATEGORIES.find((cat) => cat.name === activeCategory);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleCategoryEnter = (categoryName: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveCategory(categoryName);
  };

  const handleCategoryLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveCategory(null);
      dropdownTimeout.current = null;
    }, 200);
  };

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isHomePage
      ? isScrolled
        ? 'bg-white/98 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
      : 'bg-white shadow-sm'
  }`;

  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-[#1a1a1a]';
  const logoColor = isHomePage && !isScrolled ? 'text-white' : 'text-[#1a1a1a]';
  const hoverColor = 'hover:text-[#b8860b]';
  const borderColor = isHomePage && !isScrolled ? 'border-white/10' : 'border-[#f0ebe5]';

  return (
    <>
      {/* Tier 1: Top Bar */}
      <TopBar
        isHomePage={isHomePage}
        isScrolled={isScrolled}
        borderColor={borderColor}
        hoverColor={hoverColor}
      />

      <header className={`${navClasses} ${isHomePage && !isScrolled ? 'top-0' : 'top-8'}`}>
        {/* Tier 2: Main Header (Logo | Search Bar | Icons) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-black/5">
          <div className="flex justify-between items-center gap-4">
            {/* Logo */}
            <Link
              to="/"
              className={`font-serif font-light text-xl tracking-[0.15em] transition-colors whitespace-nowrap ${logoColor}`}
            >
              CRYSTAL CLAN
            </Link>

            {/* Central Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Icon Actions */}
            <div className="flex items-center space-x-3">
              <Link
                to="/wishlist"
                className={`p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                to="/account"
                className={`hidden sm:block p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                to="/cart"
                className={`relative p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-[#b8860b] rounded-full shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <button
                className={`lg:hidden p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Input (Visible only on small screens) */}
          <div className="mt-2 md:hidden">
            <SearchBar />
          </div>
        </div>

        {/* Tier 3: Category Links Navigation */}
        <nav className="hidden lg:block relative border-b border-black/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 py-2">
              {/* Primary Links */}
              {PRIMARY_NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-xs font-medium uppercase tracking-[0.15em] ${hoverColor} transition-colors duration-200 ${textColor}`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="w-px h-4 bg-[#1a1a1a]/10" />

              {/* Primary Categories */}
              {CATEGORIES.slice(0, 5).map((category) => (
                <div
                  key={category.name}
                  className="static"
                  onMouseEnter={() => handleCategoryEnter(category.name)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <button
                    className={`flex items-center px-2 py-1 text-xs font-medium uppercase tracking-[0.12em] ${hoverColor} transition-colors duration-200 ${textColor}`}
                  >
                    {category.name}
                    <ChevronDown
                      className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                        activeCategory === category.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          {activeCategory && activeCategory !== 'more' && activeCategoryData && (
            <MegaMenu
              activeCategoryData={activeCategoryData}
              dropdownTimeout={dropdownTimeout}
              onClose={() => setActiveCategory(null)}
              onLeave={handleCategoryLeave}
            />
          )}
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <MobileMenu
            primaryItems={PRIMARY_NAV_ITEMS}
            categories={CATEGORIES}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
};