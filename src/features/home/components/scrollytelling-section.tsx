import { useAppDispatch, addToCart } from "@/redux";
import { useScrollReveal } from "@/features/home/hooks/use-scroll-reveal";
import { Hammer, Leaf, Globe, Star } from "lucide-react";

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
  name: "The Resonance Singing Bowl",
  price: 128,
  image: "/images/cc-collection-bowls.png"
};

export function ScrollytellingSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const dispatch = useAppDispatch();

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
                alt="Signature hand-hammered Himalayan singing bowl set"
                className="object-cover absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 lg:right-8 bg-ivory rounded-2xl border border-border shadow-xl shadow-charcoal/5 px-6 py-4 animate-float-slow">
              <p className="font-display text-2xl text-charcoal">Signature</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Bestselling piece
              </p>
            </div>
          </div>

          <div
            className={`flex flex-col justify-center transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="text-terracotta text-xs uppercase tracking-[0.25em] mb-4">
              Artisan Spotlight
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal text-balance">
              {mainProduct.name}
            </h2>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-copper text-copper" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.9 · 312 reviews
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Forged in a workshop in the Kathmandu Valley, each bowl carries the
              subtle marks of the hands that made it. Struck or circled with the
              wooden mallet, it releases a warm, lingering tone—an invitation to
              pause.
            </p>

            <p className="text-2xl text-charcoal font-medium mt-6">
              ${mainProduct.price} <span className="text-muted-foreground text-sm">USD</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {details.map((detail) => (
                <div key={detail.title} className="bg-secondary rounded-2xl p-4">
                  <detail.icon
                    className="w-6 h-6 mb-3 text-terracotta"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-sm font-medium text-charcoal mb-1">
                    {detail.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {detail.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                type="button"
                onClick={() => dispatch(addToCart(mainProduct))}
                className="flex-1 min-w-[10rem] bg-charcoal text-ivory py-4 rounded-full text-sm font-medium hover:bg-terracotta transition-colors"
              >
                Add to Cart — ${mainProduct.price}
              </button>
              <button
                type="button"
                className="px-6 py-4 rounded-full text-sm font-medium border border-border text-charcoal hover:bg-secondary transition-colors"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
