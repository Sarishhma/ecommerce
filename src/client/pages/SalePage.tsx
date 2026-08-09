import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux';
import {  toggleWishlistItem, selectWishlistIds } from '@/redux';
import { products } from '@/config/data';
import { useAddToCart } from '@/features/product';


export const SalePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wishlistIds = useAppSelector(selectWishlistIds);
    const addToCartMutation = useAddToCart();
  const [sortBy, setSortBy] = useState('popular');

  // Sales products with discount
  const saleProducts = products.slice(0, 8).map((product, index) => ({
    ...product,
    originalPrice: product.price + (product.price * (15 + index * 5)) / 100,
    discount: 15 + index * 5,
  }));

  const sortedProducts = [...saleProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return String(b.id).localeCompare(String(a.id));
    return 0;
  });

  const handleAddToCart = (product: typeof products[0]) => {
   addToCartMutation.mutate({ product, quantity: 1 });
  };

  const isWishlisted = (id: number) => (wishlistIds as number[]).includes(id);

  const handleToggleWishlist = (id: number) => {
    dispatch(toggleWishlistItem(id));
  };

  return (
    <div className="pt-[calc(var(--nav-height)+2rem)] pb-20">
      {/* Sale Banner */}
      <div className="bg-gradient-to-r from-terracotta/20 to-terracotta/10 py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-charcoal mb-4">Exclusive Sale</h1>
            <p className="text-lg text-stone mb-2">Up to 50% off on selected artisan pieces</p>
            <p className="text-sm text-terracotta font-medium">Limited time offer</p>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-sand rounded-lg hover:bg-ivory transition">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-stone">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-sand rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-stone">
          Showing {sortedProducts.length} products
        </p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative bg-ivory rounded-lg overflow-hidden mb-4 aspect-square">
                <img
                  src={product.image ?? undefined}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Sale Badge */}
                {product.discount && (
                  <div className="absolute top-4 right-4 bg-terracotta text-ivory px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discount}%
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWishlist(product.id);
                  }}
                  className={`absolute top-4 left-4 p-2 rounded-full transition-all ${
                    isWishlisted(product.id)
                      ? 'bg-terracotta text-ivory'
                      : 'bg-white/80 text-charcoal hover:bg-white'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="absolute bottom-0 left-0 right-0 bg-charcoal text-ivory py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-charcoal mb-1 group-hover:text-terracotta transition">
                    {product.title}
                  </h3>
                  {/* <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-4 h-4 ${i < Math.floor(product.) ? 'fill-terracotta text-terracotta' : 'text-sand'}`}>
                        ★
                      </div>
                    ))}
                    <span className="text-xs text-stone ml-2">({product.reviewCount})</span>
                  </div> */}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-charcoal">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-stone line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};