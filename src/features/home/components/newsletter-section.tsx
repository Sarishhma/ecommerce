import { useRef } from "react";
import { useScrollReveal } from "@/features/home/hooks/use-scroll-reveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema } from "@/features/newsletter/schema/newsletter.schema";
import type { NewsletterFormValues } from "@/features/newsletter/types/newsletter.types";
import { useSubscribeNewsletter } from "@/features/newsletter/hooks/use-newsletter";
import { useToast } from "@/features/home/hooks/use-toast";

export function NewsletterSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const idempotencyKeyRef = useRef(crypto.randomUUID());
  const { toast } = useToast();
  
  const { mutate: subscribe, isPending, isSuccess } = useSubscribeNewsletter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterFormValues) => {
    subscribe(
      { data, idempotencyKey: idempotencyKeyRef.current },
      {
        onSuccess: (response) => {
          toast({
            title: "Subscribed",
            description: response.message,
          });
          reset();
          // Generate new key for potential future submissions
          idempotencyKeyRef.current = crypto.randomUUID();
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-16 lg:py-24">
          <div className="relative max-w-2xl mx-auto text-center">
            <p
              className={`text-ivory/60 text-xs uppercase tracking-[0.25em] mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Join the Clan
            </p>

            <h2
              className={`font-display text-4xl sm:text-5xl text-ivory mb-6 text-balance transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              New arrivals, maker stories, and 10% off your first order
            </h2>

            <p
              className={`text-ivory/70 leading-relaxed mb-10 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Be the first to see new collections and hear from the artisans
              behind them. No noise—just craft worth sharing.
            </p>

            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {isSuccess ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-ivory/30 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-ivory"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-ivory/80 text-sm">
                    Welcome to Crystal Clan.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2 max-w-md mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your email address"
                      className="flex-1 bg-ivory/10 border border-ivory/20 rounded-full py-4 px-6 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-ivory/50 transition-colors"
                      disabled={isPending}
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="bg-ivory text-forest px-8 py-4 rounded-full text-sm font-medium hover:bg-terracotta hover:text-ivory transition-colors disabled:opacity-70"
                    >
                      {isPending ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>
                  {errors.email && (
                    <span className="text-sm text-terracotta text-left pl-6">{errors.email.message}</span>
                  )}
                </form>
              )}
            </div>

            <p
              className={`text-xs text-ivory/40 mt-6 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
