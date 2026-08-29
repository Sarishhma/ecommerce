import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Search, Sliders } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { toggleWishlistItem, selectWishlistIds } from '@/redux';
import { useAddToCart } from '@/features/product';
import { useGetProducts } from '@/features/product/hook/useProduct';
import { useGetCategories } from '@/features/category/hooks/useCategories';


export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const addToCartMutation = useAddToCart();

  const query = searchParams.get('search') || '';

  // 1. Normal text search
  const { data: textData, isFetching: isFetchingText } = useGetProducts(
    query ? { search: query } : undefined
  );

  // 2. Check if the query matches a category name
  const { data: categoriesResponse } = useGetCategories();
  const allCategories = categoriesResponse?.results ?? [];
  const matchedCategory = query
    ? allCategories.find((c) => c.title.toLowerCase().includes(query.toLowerCase()))
    : undefined;

  // 3. If matched, fetch that category's products too
  const { data: categoryData, isFetching: isFetchingCategory } = useGetProducts(
    matchedCategory ? { category: matchedCategory.id } : undefined
  );

  const isFetching = isFetchingText || (!!matchedCategory && isFetchingCategory);

  // Merge + dedupe both result sets
  const products = useMemo(() => {
    const fromText = textData?.results ?? [];
    const fromCategory = matchedCategory ? categoryData?.results ?? [] : [];

    const seen = new Set<number>();
    return [...fromCategory, ...fromText].filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [textData, categoryData, matchedCategory]);

  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string | number | null  | undefined>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const searchResults = useMemo(() => {
    let filtered = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedCategory !== null) {
      filtered = filtered.filter((p) => String(p.category) === String(selectedCategory));
    }

    if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') filtered = [...filtered].sort((a, b) => b.id - a.id);

    return filtered;
  }, [products, priceRange, selectedCategory, sortBy]);

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCartMutation.mutate({ product, quantity: 1 });
  };

  const isWishlisted = (id: number | string) =>
    wishlistIds.some((wId) => String(wId) === String(id));

  const handleToggleWishlist = (id: number | string) => {
    dispatch(toggleWishlistItem(id));
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-stone text-sm">
            {isFetching
              ? 'Searching...'
              : `Found ${searchResults.length} ${searchResults.length === 1 ? 'product' : 'products'}`}
            {matchedCategory && !isFetching && (
              <span className="ml-1 text-terracotta">— including matches in "{matchedCategory.title}"</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-lg border border-sand p-6 space-y-6 sticky top-24">
              <h2 className="font-serif font-bold text-lg text-charcoal border-b border-sand pb-3">
                Filters
              </h2>

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

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === null ? 'bg-terracotta text-ivory' : 'hover:bg-ivory text-charcoal'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={String(cat)}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === cat ? 'bg-terracotta text-ivory' : 'hover:bg-ivory text-charcoal'
                      }`}
                    >
                      {String(cat)}
                    </button>
                  ))}
                </div>
              </div>

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

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 pb-6 border-b border-sand">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-sand rounded hover:bg-ivory transition"
              >
                <Sliders className="w-4 h-4" />
                Filters
              </button>

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
                </select>
              </div>
            </div>

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
                        selectedCategory === null ? 'bg-terracotta text-ivory' : 'hover:bg-ivory text-charcoal'
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
                          selectedCategory === cat ? 'bg-terracotta text-ivory' : 'hover:bg-ivory text-charcoal'
                        }`}
                      >
                        {String(cat)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="relative mb-4 overflow-hidden rounded-lg bg-sand h-64 sm:h-56">
                      <img
                        src={product.image || ''}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition z-10"
                      >
                        <Heart
                          className={`w-5 h-5 transition ${
                            isWishlisted(product.id) ? 'fill-terracotta text-terracotta' : 'text-charcoal'
                          }`}
                        />
                      </button>

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

                    <h3 className="font-serif font-bold text-charcoal text-lg mb-2 group-hover:text-terracotta transition">
                      {product.title}
                    </h3>

                    <p className="text-stone text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-charcoal">
                        Rs. {product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-sand mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
                  {isFetching ? 'Searching...' : 'No products found'}
                </h3>
                {!isFetching && (
                  <>
                    <p className="text-stone mb-6">Try adjusting your search or filters</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="px-6 py-3 bg-terracotta text-ivory rounded-lg font-semibold hover:bg-opacity-90 transition"
                    >
                      Browse All Products
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};