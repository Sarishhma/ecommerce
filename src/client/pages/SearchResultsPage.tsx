import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Search, Sliders } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { toggleWishlistItem, selectWishlistIds } from '@/redux';
import { useAddToCart } from '@/features/product';
import { useGetProducts } from '@/features/product/hook/useProduct';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const addToCartMutation = useAddToCart();
  const { data } = useGetProducts();
  const products = data?.results || [];
  
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Search and filter logic
  const searchResults = useMemo(() => {
    let filtered = products.filter(product => {
      const nameStr = product.title || product.name || '';
      return (
        nameStr.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
    });

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Category filter
    if (selectedCategory !== null) {
      filtered = filtered.filter(p => String(p.category) === String(selectedCategory));
    }

    // Sorting
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') filtered.sort((a, b) => a.id - b.id);
    else if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return filtered;
  }, [query, priceRange, selectedCategory, sortBy]);

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCartMutation.mutate({ product, quantity: 1 });
  };

  const isWishlisted = (id: number | string) => wishlistIds.some(wId => String(wId) === String(id));

  const handleToggleWishlist = (id: number | string) => {
    dispatch(toggleWishlistItem(id));
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header with search results info */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-stone text-sm">
            Found {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-lg border border-sand p-6 space-y-6 sticky top-24">
              <h2 className="font-serif font-bold text-lg text-charcoal border-b border-sand pb-3">
                Filters
              </h2>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">
                  Price Range (${priceRange[0]} - ${priceRange[1]})
                </label>
                <div className="flex gap-3 mb-3">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-3 py-2 border border-sand rounded text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                    className="w-full px-3 py-2 border border-sand rounded text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === null
                        ? 'bg-terracotta text-ivory'
                        : 'hover:bg-ivory text-charcoal'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={String(cat)}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === cat
                          ? 'bg-terracotta text-ivory'
                          : 'hover:bg-ivory text-charcoal'
                      }`}
                    >
                      {String(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== null || priceRange[0] > 0 || priceRange[1] < 500) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 500]);
                  }}
                  className="w-full px-4 py-2 border border-terracotta text-terracotta rounded hover:bg-ivory transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 pb-6 border-b border-sand">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-sand rounded hover:bg-ivory transition"
                >
                  <Sliders className="w-4 h-4" />
                  Filters
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-stone font-medium">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-sand rounded bg-white text-charcoal cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showMobileFilters && (
              <div className="lg:hidden mb-8 bg-white rounded-lg border border-sand p-4 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Price Range</label>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="flex-1 px-3 py-2 border border-sand rounded text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                      className="flex-1 px-3 py-2 border border-sand rounded text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Category</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                        selectedCategory === null
                          ? 'bg-terracotta text-ivory'
                          : 'hover:bg-ivory text-charcoal'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={String(cat)}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowMobileFilters(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                          selectedCategory === cat
                            ? 'bg-terracotta text-ivory'
                            : 'hover:bg-ivory text-charcoal'
                        }`}
                      >
                        {String(cat)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="relative mb-4 overflow-hidden rounded-lg bg-sand h-64 sm:h-56">
                      <img
                        src={product.image || ''}
                        alt={product.title || product.name || 'Product'}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition z-10"
                      >
                        <Heart
                          className={`w-5 h-5 transition ${
                            isWishlisted(product.id)
                              ? 'fill-terracotta text-terracotta'
                              : 'text-charcoal'
                          }`}
                        />
                      </button>

                      {/* Add to Cart Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="opacity-0 group-hover:opacity-100 px-6 py-3 bg-terracotta text-ivory rounded-lg font-semibold flex items-center gap-2 hover:bg-opacity-90 transition"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <h3 className="font-serif font-bold text-charcoal text-lg mb-2 group-hover:text-terracotta transition">
                      {product.title || product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(product.rating || 0)
                                ? 'text-terracotta'
                                : 'text-sand'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-stone">({product.reviewCount || 0})</span>
                    </div>

                    {/* Description */}
                    <p className="text-stone text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-charcoal">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-sand mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
                  No products found
                </h3>
                <p className="text-stone mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    navigate('/shop');
                  }}
                  className="px-6 py-3 bg-terracotta text-ivory rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Browse All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
