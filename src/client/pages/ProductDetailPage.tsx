import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Check, Minus, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector, addToCart, toggleWishlistItem, selectWishlistIds } from '@/redux';
import { products } from '@/config/data';
import { useScrollReveal } from '@/features/home/hooks/use-scroll-reveal';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  
  const contentReveal = useScrollReveal();
  const relatedReveal = useScrollReveal();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
        <h2 className="font-display text-4xl text-charcoal mb-4">Product Not Found</h2>
        <p className="text-stone mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-charcoal transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlistIds.includes(product.id);
  
  // Find related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => prev + 1);

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity }));
  };

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-stone mb-8">
        <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-charcoal font-medium truncate">{product.name}</span>
      </div>

      <div ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Left Column: Images */}
        <div className="flex flex-col space-y-4">
          <div className="aspect-[4/5] bg-sand/30 rounded-3xl overflow-hidden relative">
            <img 
              src={product.images[activeImage] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover object-center animate-fade-in"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-terracotta' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1 text-copper">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current opacity-50" />
            </div>
            <span className="text-sm text-stone">{product.rating} (24 Reviews)</span>
          </div>
          
          <div className="flex items-end space-x-4 mb-8">
            <span className="font-display text-3xl font-bold text-terracotta">${product.price.toFixed(2)}</span>
            {/* If there was a compare price, it would go here */}
          </div>
          
          <p className="text-stone leading-relaxed mb-8">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-6 py-6 border-y border-sand mb-8 text-sm">
            {product.artisan && (
              <div>
                <span className="block text-stone mb-1">Artisan</span>
                <span className="font-medium text-charcoal">{product.artisan}</span>
              </div>
            )}
            {product.origin && (
              <div>
                <span className="block text-stone mb-1">Origin</span>
                <span className="font-medium text-charcoal">{product.origin}</span>
              </div>
            )}
            {product.materials && (
              <div className="col-span-2">
                <span className="block text-stone mb-1">Materials</span>
                <span className="font-medium text-charcoal">{product.materials.join(', ')}</span>
              </div>
            )}
          </div>
          
          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="font-display text-lg font-bold text-charcoal mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-stone">
                    <Check className="w-5 h-5 text-terracotta mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 mt-auto">
            {/* Quantity */}
            <div className="flex items-center justify-between border border-sand rounded-xl px-4 py-3 bg-white w-full sm:w-32">
              <button onClick={handleDecrease} className="text-stone hover:text-terracotta transition-colors"><Minus className="w-4 h-4" /></button>
              <span className="font-medium text-charcoal">{quantity}</span>
              <button onClick={handleIncrease} className="text-stone hover:text-terracotta transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
            
            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-3 px-8 bg-charcoal text-white rounded-xl font-medium hover:bg-terracotta transition-colors flex items-center justify-center shadow-lg"
            >
              Add to Cart
            </button>
            
            {/* Wishlist */}
            <button 
              onClick={() => dispatch(toggleWishlistItem(product.id))}
              className="p-3 border border-sand bg-white rounded-xl text-charcoal hover:border-terracotta hover:text-terracotta transition-all flex-shrink-0"
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-terracotta text-terracotta' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div ref={relatedReveal.ref as React.RefObject<HTMLDivElement | null>} className="pt-16 border-t border-sand">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-10 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <div key={p.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-sand/30">
                  <Link to={`/product/${p.id}`}>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${p.id}`}>
                    <h3 className="font-display text-lg font-bold text-charcoal hover:text-terracotta transition-colors truncate mb-1">
                      {p.name}
                    </h3>
                  </Link>
                  <span className="font-body font-semibold text-terracotta">${p.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
