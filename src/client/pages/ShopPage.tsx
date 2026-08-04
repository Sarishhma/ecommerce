import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector, addToCart, toggleWishlistItem, selectWishlistIds } from '@/redux';
import { products, categories } from '@/config/data';
import { useScrollReveal } from '@/features/home/hooks/use-scroll-reveal';

export const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  
  const headerReveal = useScrollReveal();
  const filterReveal = useScrollReveal();
  const gridReveal = useScrollReveal();

  const filteredProducts = selectedCategory && selectedCategory !== "All"
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={headerReveal.ref as React.RefObject<HTMLDivElement | null>} className="text-center mb-12">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">Shop All Products</h1>
        <div className="flex items-center justify-center space-x-2 text-sm text-stone">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">Shop</span>
        </div>
      </div>

      <div ref={filterReveal.ref as React.RefObject<HTMLDivElement | null>} className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null 
              ? 'bg-terracotta text-white shadow-md' 
              : 'bg-sand text-charcoal hover:bg-copper/20'
          }`}
        >
          All
        </button>
        {categories.filter(c => c !== "All").map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-terracotta text-white shadow-md' 
                : 'bg-sand text-charcoal hover:bg-copper/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div ref={gridReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          
          return (
            <div key={product.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-sand/50">
              <div className="relative aspect-square overflow-hidden bg-sand/30">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>
                
                {/* Wishlist Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleWishlistItem(product.id));
                  }}
                  className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full text-charcoal hover:text-terracotta transition-colors shadow-sm z-10"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-terracotta text-terracotta' : ''}`} />
                </button>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-xl font-bold text-charcoal hover:text-terracotta transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <span className="font-body font-semibold text-terracotta">${product.price.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center space-x-1 mb-4 text-copper">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-stone">{product.rating}</span>
                </div>
                
                <div className="mt-auto">
                  <button
                    onClick={() => dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }))}
                    className="w-full py-3 px-6 bg-charcoal text-white rounded-xl font-medium hover:bg-terracotta transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
