import { products as mockProducts, categories as mockCategories } from "@/config/data";
import { useAppDispatch, useAppSelector, addToCart, toggleWishlistItem, selectWishlistIds } from "@/redux";
import { useState } from "react";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { useScrollReveal } from "@/features/home/hooks/use-scroll-reveal";

export function FeaturedProductsSection({ products = mockProducts, categories = mockCategories }: { products?: any[], categories?: readonly string[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");
  
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlistIds);

  const toggleWishlist = (id: number) => {
    dispatch(toggleWishlistItem(id));
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="shop" ref={ref} className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-terracotta text-xs uppercase tracking-[0.25em] mb-4">
            Featured Products
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal text-balance">
            Handmade favorites, ready to gift
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            A curated selection of our most-loved pieces, each finished by an
            artisan and made to be kept for years.
          </p>
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-2 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? "bg-charcoal text-ivory"
                  : "bg-ivory text-charcoal/70 hover:text-charcoal border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const isWished = wishlist.includes(product.id);
            return (
              <article
                key={product.id}
                className={`group bg-ivory rounded-2xl overflow-hidden border border-border transition-all duration-700 hover:shadow-xl hover:shadow-charcoal/5 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${150 + index * 80}ms` }}
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-sand">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0 w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={isWished}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center hover:bg-ivory transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWished ? "fill-terracotta text-terracotta" : "text-charcoal"
                      }`}
                    />
                  </button>

                  <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      type="button"
                      onClick={() => dispatch(addToCart(product))}
                      className="w-full flex items-center justify-center gap-2 bg-charcoal text-ivory py-3 rounded-full text-sm font-medium hover:bg-terracotta transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3.5 h-3.5 fill-copper text-copper" />
                    <span className="text-xs text-charcoal font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      · {product.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-charcoal">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-charcoal font-medium mt-3">
                    ${product.price}
                    <span className="text-muted-foreground text-xs ml-1">USD</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
