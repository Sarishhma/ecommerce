import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector, selectWishlistIds, addToCart, toggleWishlistItem } from '@/redux';
import { products } from '@/config/data';
import { useScrollReveal } from '@/features/home/hooks/use-scroll-reveal';

export const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const contentReveal = useScrollReveal();
  
  const wishlistItems = products.filter(p => wishlistIds.includes(p.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-24 pb-20">
        <div className="w-24 h-24 bg-sand/30 rounded-full flex items-center justify-center mb-6 text-terracotta">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="font-display text-4xl text-charcoal mb-4">Your Wishlist is Empty</h2>
        <p className="text-stone mb-8 text-center max-w-md">Start adding your favorite products to your wishlist and access them anytime.</p>
        <Link to="/shop" className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-charcoal transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">Your Wishlist</h1>
        <p className="text-stone text-lg">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
      </div>

      <div ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistItems.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-sand/50">
            <div className="relative aspect-square overflow-hidden bg-sand/30">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleWishlistItem(product.id));
                }}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full text-terracotta hover:text-charcoal transition-colors shadow-sm z-10"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <Link to={`/product/${product.id}`} className="font-display text-lg font-bold text-charcoal hover:text-terracotta transition-colors mb-2">
                {product.name}
              </Link>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-terracotta text-terracotta' : 'text-sand'}`}>
                    ★
                  </div>
                ))}
                <span className="text-xs text-stone ml-2">({product.reviewCount} reviews)</span>
              </div>
              
              <p className="text-stone text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="font-display text-xl font-bold text-charcoal">
                  ${product.price.toFixed(2)}
                </span>
                <button 
                  onClick={() => dispatch(addToCart(product))}
                  className="p-3 bg-terracotta text-white rounded-full hover:bg-charcoal transition-colors shadow-sm flex items-center justify-center"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
