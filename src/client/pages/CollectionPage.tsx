import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector, addToCart, toggleWishlistItem, selectWishlistIds } from '@/redux';
import { products, collections } from '@/config/data';
import { useScrollReveal } from '@/features/home/hooks/use-scroll-reveal';

export const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find(c => c.slug === slug);
  
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  
  const headerReveal = useScrollReveal();
  const gridReveal = useScrollReveal();

  if (!collection) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
        <h2 className="font-display text-4xl text-charcoal mb-4">Collection Not Found</h2>
        <p className="text-stone mb-8">We couldn't find the collection you're looking for.</p>
        <Link to="/shop" className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-charcoal transition-colors">
          Explore Shop
        </Link>
      </div>
    );
  }

  // Filter products by collection category slug
  const collectionProducts = products.filter(p => p.categorySlug === collection.slug);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-charcoal overflow-hidden">
        <img 
          src={collection.image} 
          alt={collection.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div ref={headerReveal.ref as React.RefObject<HTMLDivElement | null>} className="relative z-10 text-center px-4 max-w-3xl">
          <Link to="/shop" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{collection.name}</h1>
          <p className="text-lg text-white/90 font-body max-w-2xl mx-auto">{collection.blurb}</p>
        </div>
      </div>

      <div className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {collectionProducts.length === 0 ? (
          <div className="text-center text-stone">No products currently available in this collection.</div>
        ) : (
          <div ref={gridReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              
              return (
                <div 
                  key={product.id}
                  className="group flex flex-col bg-white rounded-2xl border border-sand overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-sand/30 overflow-hidden">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => dispatch(toggleWishlistItem(product.id))}
                      className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-charcoal hover:text-red-500"}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6">
                    <span className="text-xs font-semibold text-terracotta tracking-wider uppercase mb-2">
                      {product.category}
                    </span>
                    
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <Link to={`/product/${product.id}`} className="font-display text-lg font-bold text-charcoal hover:text-terracotta transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      <span className="font-body font-bold text-charcoal">${product.price}</span>
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
        )}
      </div>
    </div>
  );
};
