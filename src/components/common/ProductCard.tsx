import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector, addToCart, toggleWishlistItem, selectWishlistIds } from '@/redux';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  categorySlug?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const isWishlisted = wishlistIds.includes(Number(product.id));

  return (
    <div className="group flex flex-col bg-white border border-[#E5E5E5] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#1A1A1A]">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F9F9F9]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Minimal Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleWishlistItem(Number(product.id)));
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#1A1A1A] hover:text-[#000000] transition-colors shadow-sm"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-[#1A1A1A] text-[#1A1A1A]' : 'text-[#1A1A1A]/60'
            }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase block mb-1">
            {product.category}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="text-sm font-medium text-[#1A1A1A] hover:underline line-clamp-1 mb-2 block"
          >
            {product.name}
          </Link>

          <p className="text-sm font-semibold text-[#1A1A1A]">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Clean Action Button */}
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: Number(product.id),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            )
          }
          className="mt-4 w-full py-2.5 bg-[#1A1A1A] text-white text-xs font-medium tracking-wide rounded hover:bg-neutral-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};