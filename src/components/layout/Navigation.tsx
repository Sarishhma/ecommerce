import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Search, Heart, User } from 'lucide-react';
import { useAppSelector } from '@/redux';
import { selectCartItemCount } from '@/redux';

// Full category data
const categories = [
  {
    name: "Incense",
    href: "/incense",
    subcategories: [
      { name: "Tibetan Incense", href: "/incense/tibetan" },
      { name: "Bhutanese Incense", href: "/incense/bhutanese" },
      { name: "Japanese Incense", href: "/incense/japanese" },
      { name: "Raw Powder Incense", href: "/incense/raw-powder" },
      { name: "Himalayan Incense Sticks", href: "/incense/himalayan-sticks" },
      { name: "Cone Incense", href: "/incense/cone" },
      { name: "Rope Incense", href: "/incense/rope" },
      { name: "Flora Incense Sticks", href: "/incense/flora" },
      { name: "Incense Gift Set", href: "/incense/gift-set" },
      { name: "Incense Burner", href: "/incense/burner" },
    ]
  },
  {
    name: "Prayer Flags",
    href: "/prayer-flags",
    subcategories: [
      { name: "Tibetan Prayer Flags", href: "/prayer-flags/tibetan" },
      { name: "Nepali Prayer Flags", href: "/prayer-flags/nepali" },
      { name: "Windhorse Flags", href: "/prayer-flags/windhorse" },
    ]
  },
  {
    name: "Statues",
    href: "/statues",
    subcategories: [
      { name: "Buddha Statues", href: "/statues/buddha" },
      { name: "Bodhisattva Statues", href: "/statues/bodhisattva" },
      { name: "Tara Statues", href: "/statues/tara" },
      { name: "Monk Statues", href: "/statues/monk" },
    ]
  },
  {
    name: "Thangka",
    href: "/thangka",
    subcategories: [
      { name: "Buddha Thangka", href: "/thangka/buddha" },
      { name: "Mandala Thangka", href: "/thangka/mandala" },
      { name: "Wheel of Life Thangka", href: "/thangka/wheel-of-life" },
    ]
  },
  {
    name: "Sound Healing",
    href: "/sound-healing",
    subcategories: [
      { name: "Singing Bowls", href: "/sound-healing/singing-bowls" },
      { name: "Tingsha Bells", href: "/sound-healing/tingsha" },
      { name: "Gongs", href: "/sound-healing/gongs" },
    ]
  },
  {
    name: "Ritual Items",
    href: "/ritual-items",
    subcategories: [
      { name: "Mala Beads", href: "/ritual-items/mala" },
      { name: "Prayer Wheels", href: "/ritual-items/prayer-wheels" },
      { name: "Offerings", href: "/ritual-items/offerings" },
    ]
  },
  {
    name: "Home & Living",
    href: "/home-living",
    subcategories: [
      { name: "Cushions", href: "/home-living/cushions" },
      { name: "Wall Hangings", href: "/home-living/wall-hangings" },
      { name: "Rugs", href: "/home-living/rugs" },
    ]
  },
  {
    name: "Wellness",
    href: "/wellness",
    subcategories: [
      { name: "Herbal Teas", href: "/wellness/teas" },
      { name: "Essential Oils", href: "/wellness/oils" },
      { name: "Herbal Remedies", href: "/wellness/remedies" },
    ]
  },
  {
    name: "Clothing",
    href: "/clothing",
    subcategories: [
      { name: "Tibetan Jewelry", href: "/clothing/jewelry" },
      { name: "Scarves", href: "/clothing/scarves" },
      { name: "Hats", href: "/clothing/hats" },
    ]
  },
  {
    name: "Jewelry",
    href: "/jewelry",
    subcategories: [
      { name: "Beaded Jewelry", href: "/jewelry/beaded" },
      { name: "Pearl Jewelry", href: "/jewelry/pearl" },
      { name: "Zodiac Jewelry", href: "/jewelry/zodiac" },
      { name: "Diamond Jewelry", href: "/jewelry/diamond" },
    ]
  },
  {
    name: "Books",
    href: "/books",
    subcategories: [
      { name: "Buddhist Teachings", href: "/books/buddhist" },
      { name: "Meditation Guides", href: "/books/meditation" },
      { name: "Culture & History", href: "/books/culture" },
    ]
  },
  {
    name: "Gifts",
    href: "/gifts",
    subcategories: [
      { name: "Gift Sets", href: "/gifts/sets" },
      { name: "Corporate Gifts", href: "/gifts/corporate" },
      { name: "Wedding Gifts", href: "/gifts/wedding" },
    ]
  },
];

const primaryNavItems = [
  { name: "shop", href: "/shop" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const cartItemCount = useAppSelector(selectCartItemCount);
  
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHomePage = location.pathname === '/';
  
  const activeCategoryData = categories.find(
    category => category.name === activeCategory
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

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
        ? 'bg-white/98 backdrop-blur-md shadow-sm py-2' 
        : 'bg-transparent py-4'
      : 'bg-white shadow-sm py-2'
  }`;

  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-[#1a1a1a]';
  const logoColor = isHomePage && !isScrolled ? 'text-white' : 'text-[#1a1a1a]';
  const hoverColor = 'hover:text-[#b8860b]';
  const borderColor = isHomePage && !isScrolled ? 'border-white/10' : 'border-[#f0ebe5]';

  return (
    <>
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHomePage && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } bg-white/98 backdrop-blur-sm border-b ${borderColor}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-xs text-[#1a1a1a]/60">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                ✨ Free shipping on orders over $150
              </span>
              <span className="hidden sm:flex items-center">
                🎁 Complimentary gift wrapping
              </span>
            </div>
            <div className="flex items-center space-x-5">
              <Link to="/help" className={`${hoverColor} transition-colors duration-200`}>
                Help
              </Link>
              <Link to="/track-order" className={`${hoverColor} transition-colors duration-200`}>
                Track Order
              </Link>
              <Link to="/sale" className={`${hoverColor} transition-colors duration-200 font-medium text-[#b8860b]`}>
                Sale
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Wrapper - relative anchor for full-width mega menu */}
      <nav className={`${navClasses} ${isHomePage && !isScrolled ? 'top-0' : 'top-8'} relative`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className={`font-serif font-light tracking-[0.15em] transition-colors ${logoColor}`}
            >
              CRYSTAL CLAN
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="flex items-center space-x-6 mr-2">
                {primaryNavItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.href}
                    className={`text-xs font-medium uppercase tracking-[0.15em] ${hoverColor} transition-colors duration-200 ${textColor}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="w-px h-6 bg-[#1a1a1a]/10 mx-1"></div>

              {/* Main 5 Categories */}
              {categories.slice(0, 5).map((category) => (
                <div 
                  key={category.name}
                  className="static" // Keep static so mega menu positions relative to nav element
                  onMouseEnter={() => handleCategoryEnter(category.name)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <button
                    className={`flex items-center px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] ${hoverColor} transition-colors duration-200 ${textColor}`}
                  >
                    {category.name}
                    <ChevronDown className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                      activeCategory === category.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                </div>
              ))}

              {/* More Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleCategoryEnter('more')}
                onMouseLeave={handleCategoryLeave}
              >
                <button className={`flex items-center px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] ${hoverColor} transition-colors duration-200 ${textColor}`}>
                  More
                  <ChevronDown className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                    activeCategory === 'more' ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Submenu for "More" */}
                {activeCategory === 'more' && (
                  <div 
                    className="absolute top-full right-0 mt-0 min-w-[260px] bg-white shadow-xl rounded-b-lg border border-[#f0ebe5] py-2 animate-slide-down"
                    onMouseEnter={() => {
                      if (dropdownTimeout.current) {
                        clearTimeout(dropdownTimeout.current);
                        dropdownTimeout.current = null;
                      }
                    }}
                    onMouseLeave={handleCategoryLeave}
                  >
                    {categories.slice(5).map((category) => (
                      <div key={category.name} className="relative group/sub">
                        <Link
                          to={category.href}
                          className="flex justify-between items-center px-5 py-2.5 text-sm text-[#1a1a1a] hover:bg-[#f8f6f4] hover:text-[#b8860b] transition-colors duration-150"
                          onClick={() => setActiveCategory(null)}
                        >
                          {category.name}
                          {category.subcategories && (
                            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                          )}
                        </Link>
                        {category.subcategories && (
                          <div className="absolute top-0 left-full ml-1 min-w-[200px] bg-white shadow-xl rounded-lg border border-[#f0ebe5] py-2 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/sub:pointer-events-auto">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className="block px-5 py-2.5 text-sm text-[#1a1a1a] hover:bg-[#f8f6f4] hover:text-[#b8860b] transition-colors duration-150"
                                onClick={() => setActiveCategory(null)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link 
                to="/wishlist" 
                className={`p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link 
                to="/account" 
                className={`hidden sm:block p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
              >
                <User className="w-5 h-5" />
              </Link>

              <Link 
                to="/cart" 
                className={`relative p-2 rounded-full transition-all duration-200 ${hoverColor} ${textColor} hover:bg-black/5`}
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
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown Panel (Full Screen Width across navbar) */}
        {activeCategory && activeCategory !== 'more' && activeCategoryData && (
          <div 
            className="absolute left-0 top-full w-full bg-white shadow-xl border-t border-[#f0ebe5] animate-slide-down"
            onMouseEnter={() => {
              if (dropdownTimeout.current) {
                clearTimeout(dropdownTimeout.current);
                dropdownTimeout.current = null;
              }
            }}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="container mx-auto px-8 py-8">
              <div className="grid grid-cols-4 gap-8">
                {/* Category Header Info */}
                <div className="col-span-1 border-r border-[#f0ebe5] pr-6">
                  <h3 className="text-xl font-serif text-[#1a1a1a] mb-2">
                    {activeCategoryData.name}
                  </h3>
                  <p className="text-xs text-[#1a1a1a]/60 mb-4">
                    Explore our handcrafted collection of authentic {activeCategoryData.name.toLowerCase()}.
                  </p>
                  <Link 
                    to={activeCategoryData.href}
                    className="inline-flex items-center text-xs font-medium text-[#b8860b] hover:underline uppercase tracking-wider"
                    onClick={() => setActiveCategory(null)}
                  >
                    View All {activeCategoryData.name} →
                  </Link>
                </div>

                {/* Subcategories Grid */}
                <div className="col-span-3 grid grid-cols-3 gap-3">
                  {activeCategoryData.subcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="px-4 py-3 text-sm text-[#1a1a1a] hover:bg-[#f8f6f4] hover:text-[#b8860b] rounded-md transition-colors duration-150 flex items-center justify-between group"
                      onClick={() => setActiveCategory(null)}
                    >
                      <span>{sub.name}</span>
                      <span className="text-[#b8860b] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-[#f0ebe5] max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-6 space-y-6">
              <div className="space-y-3">
                {primaryNavItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.href}
                    className="block text-sm font-medium uppercase tracking-[0.15em] text-[#1a1a1a] hover:text-[#b8860b] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-[#f0ebe5]"></div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                  Shop Categories
                </h4>
                {categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <Link 
                      to={category.href}
                      className="block text-sm font-medium text-[#1a1a1a] hover:text-[#b8860b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories && (
                      <div className="pl-4 space-y-1.5">
                        {category.subcategories.map((sub) => (
                          <Link 
                            key={sub.name} 
                            to={sub.href}
                            className="block text-sm text-[#1a1a1a]/60 hover:text-[#b8860b] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-[#f0ebe5]"></div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};