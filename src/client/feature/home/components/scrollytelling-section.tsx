import { useAppDispatch, useAppSelector, toggleWishlistItem, selectWishlistIds } from "@/redux";
import { Hammer, Leaf, Globe, Star } from "lucide-react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { useAddToCart } from "@/features/product";

const details = [
  {
    icon: Hammer,
    title: "Hand-Hammered",
    text: "Shaped from a single sheet of bronze over several days by a master smith.",
  },
  {
    icon: Leaf,
    title: "Natural Alloy",
    text: "A traditional seven-metal blend, free from synthetic coatings.",
  },
  {
    icon: Globe,
    title: "Ships Worldwide",
    text: "Carbon-considered delivery with 30-day returns on every order.",
  },
];

const mainProduct = {
  id: 1,
  title: "The Resonance Singing Bowl",
  name: "The Resonance Singing Bowl",
  price: 128,
  image: "/images/cc-collection-bowls.png",
  slug: "resonance-singing-bowl"
};

export function ScrollytellingSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const dispatch = useAppDispatch();
  const addToCartMutation = useAddToCart();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const isWishlisted = wishlistIds.some(id => String(id) === String(mainProduct.id));

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="aspect-square relative overflow-hidden rounded-3xl bg-sand">
              <img
                src={mainProduct.image}
                alt={mainProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex items-center space-x-1 mb-4 text-terracotta">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs text-muted-foreground ml-2 font-medium">
                4.9 / 5.0 (312 reviews)
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight mb-6">
              The Resonance Singing Bowl
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
              Forged in a workshop in the Kathmandu Valley, each bowl carries the subtle marks of
              the hands that made it. Struck or circled with the wooden mallet, it releases a
              warm, lingering tone — an invitation to pause.
            </p>

            <div className="space-y-4 border-t border-b border-border py-6">
              {details.map((detail) => (
                <div key={detail.title} className="flex items-start space-x-4">
                  <div className="p-2 rounded-xl bg-secondary text-charcoal">
                    <detail.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-charcoal mb-1">
                      {detail.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {detail.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                type="button"
                disabled={addToCartMutation.isPending}
                onClick={() => addToCartMutation.mutate({ product: mainProduct, quantity: 1 })}
                className="flex-1 min-w-[10rem] bg-charcoal text-ivory py-4 rounded-full text-sm font-medium hover:bg-terracotta transition-colors disabled:opacity-60"
              >
                Add to Cart — Rs{mainProduct.price}
              </button>
              <button
                type="button"
                onClick={() => dispatch(toggleWishlistItem(mainProduct.id))}
                className={`px-6 py-4 rounded-full text-sm font-medium border transition-colors ${
                  isWishlisted
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'border-border text-charcoal hover:bg-secondary'
                }`}
              >
                {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
