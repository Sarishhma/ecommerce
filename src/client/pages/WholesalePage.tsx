import React, { useRef } from 'react';
import { Check, Mail } from 'lucide-react';
import { useScrollReveal } from '../feature/home/hooks/use-scroll-reveal';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitWholesaleInquiry } from '../feature/wholesale/hooks/use-wholesale';
import { useToast } from '@/components/ui/use-toast';
import type { WholesaleFormValues } from '../feature/wholesale/types/wholesale.types';
import { wholesaleSchema } from '../feature/wholesale/schema/wholesale.schema';

export const WholesalePage = () => {
  const headerReveal = useScrollReveal();
  const benefitsReveal = useScrollReveal();
  const formReveal = useScrollReveal();
  const idempotencyKeyRef = useRef(crypto.randomUUID());
  const { toast } = useToast();

  const { mutate: submitInquiry, isPending, isSuccess } = useSubmitWholesaleInquiry();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WholesaleFormValues>({
    resolver: zodResolver(wholesaleSchema),
  });

  const onSubmit = (data: WholesaleFormValues) => {
    submitInquiry(
      { data, idempotencyKey: idempotencyKeyRef.current },
      {
        onSuccess: (response) => {
          toast({
            title: "Inquiry Submitted",
            description: response.message,
          });
          reset();
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
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-sand/30 py-20 lg:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center" ref={headerReveal.ref as React.RefObject<HTMLDivElement | null>}>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-charcoal mb-6">Partner With Us</h1>
          <p className="text-xl text-stone font-body max-w-2xl mx-auto">
            Bring the beauty of authentic, handcrafted design to your retail space, boutique, or design project.
          </p>
        </div>
      </div>

      <div className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div ref={benefitsReveal.ref as React.RefObject<HTMLDivElement | null>}>
            <h2 className="font-display text-4xl font-bold text-charcoal mb-8">Wholesale Benefits</h2>
            <ul className="space-y-6">
              {[
                'Exclusive wholesale pricing across all collections',
                'Dedicated account manager for personalized support',
                'Early access to new collections and limited editions',
                'Custom collaboration opportunities for volume orders',
                'Marketing materials and product education support'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="mt-1 bg-terracotta/10 p-1 rounded-full mr-4">
                    <Check className="w-5 h-5 text-terracotta" />
                  </div>
                  <span className="text-lg text-charcoal font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-auto lg:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Wholesale products display" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Inquiry Form */}
        <div ref={formReveal.ref as React.RefObject<HTMLDivElement | null>} className="bg-white border border-sand rounded-3xl p-8 lg:p-12 max-w-3xl mx-auto shadow-sm">
          <div className="text-center mb-10">
            <Mail className="w-12 h-12 text-terracotta mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-charcoal mb-2">Apply for a Wholesale Account</h2>
            <p className="text-stone">Tell us a bit about your business, and our team will get back to you within 48 hours.</p>
          </div>

          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-display text-2xl font-bold text-charcoal mb-2">Inquiry Received</h3>
              <p className="text-stone">Thank you for your interest. Our team will review your application and respond within 48 hours.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
                  <input 
                    type="text" 
                    {...register("firstName")}
                    className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors bg-ivory" 
                    disabled={isPending}
                  />
                  {errors.firstName && <span className="text-sm text-terracotta mt-1 block">{errors.firstName.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
                  <input 
                    type="text" 
                    {...register("lastName")}
                    className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors bg-ivory" 
                    disabled={isPending}
                  />
                  {errors.lastName && <span className="text-sm text-terracotta mt-1 block">{errors.lastName.message}</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                  <input 
                    type="email" 
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors bg-ivory" 
                    disabled={isPending}
                  />
                  {errors.email && <span className="text-sm text-terracotta mt-1 block">{errors.email.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Business Name</label>
                  <input 
                    type="text" 
                    {...register("businessName")}
                    className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors bg-ivory" 
                    disabled={isPending}
                  />
                  {errors.businessName && <span className="text-sm text-terracotta mt-1 block">{errors.businessName.message}</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Business Type</label>
                <select 
                  {...register("businessType")}
                  className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors bg-ivory appearance-none"
                  disabled={isPending}
                >
                  <option value="Retail Store / Boutique">Retail Store / Boutique</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Hospitality / Hotel">Hospitality / Hotel</option>
                  <option value="Online Retailer">Online Retailer</option>
                  <option value="Other">Other</option>
                </select>
                {errors.businessType && <span className="text-sm text-terracotta mt-1 block">{errors.businessType.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Message or Inquiry Details</label>
                <textarea 
                  rows={4} 
                  {...register("message")}
                  className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors bg-ivory"
                  disabled={isPending}
                ></textarea>
                {errors.message && <span className="text-sm text-terracotta mt-1 block">{errors.message.message}</span>}
              </div>
              
              <button 
                type="submit" 
                disabled={isPending}
                className="w-full py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-terracotta transition-colors text-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
