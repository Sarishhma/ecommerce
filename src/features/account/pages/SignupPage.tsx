import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useSignup } from "../hook/useSignUp";
import {
  signupSchema,
  type SignupSchemaValues,
} from "../schema/signUp.schema";

export const SignupPage = () => {
  const { signup, isLoading, error } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupSchemaValues) => signup(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-amber-50/20 pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        
        {/* Main Card Container matching AccountPage style */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Header Accent Panel */}
          <div className="relative px-8 sm:px-10 lg:px-12 py-8 border-b border-sand/50">
            <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-terracotta to-amber-500" />

            <div className="flex items-center gap-4">
            
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium mb-1">
                  New Membership
                </p>
                <h1 className="font-display text-3xl lg:text-4xl font-light text-charcoal">
                  Create Account
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm text-stone/80">
              Join our exclusive community of conscious collectors. Fill out the details below to get started.
            </p>
          </div>

          {/* Form Content Body */}
          <div className="p-8 sm:p-10 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    placeholder="John"
                    className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-xl text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta focus:bg-white transition-all ${
                      errors.firstName ? "border-red-500 bg-red-50/10" : "border-stone-200"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    placeholder="Doe"
                    className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-xl text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta focus:bg-white transition-all ${
                      errors.lastName ? "border-red-500 bg-red-50/10" : "border-stone-200"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Username & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    placeholder="johndoe"
                    className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-xl text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta focus:bg-white transition-all ${
                      errors.username ? "border-red-500 bg-red-50/10" : "border-stone-200"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-xl text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta focus:bg-white transition-all ${
                      errors.email ? "border-red-500 bg-red-50/10" : "border-stone-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="9800000000"
                  className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-xl text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta focus:bg-white transition-all ${
                    errors.phoneNumber ? "border-red-500 bg-red-50/10" : "border-stone-200"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-xl text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta focus:bg-white transition-all ${
                      errors.password ? "border-red-500 bg-red-50/10" : "border-stone-200"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-xl text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta focus:bg-white transition-all ${
                      errors.confirmPassword ? "border-red-500 bg-red-50/10" : "border-stone-200"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("agreeToTerms")}
                    className="mt-1 w-4 h-4 accent-charcoal rounded border-stone-300 cursor-pointer"
                  />
                  <label className="text-xs leading-relaxed text-stone-600 cursor-pointer">
                    I agree to the{" "}
                    <span className="underline font-medium text-charcoal">Terms of Service</span>{" "}
                    and{" "}
                    <span className="underline font-medium text-charcoal">Privacy Policy</span>
                  </label>
                </div>

                {errors.agreeToTerms && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {errors.agreeToTerms.message}
                  </p>
                )}
              </div>

              {/* Server Error */}
              {error && (
                <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-red-600 text-xs text-center font-medium">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 py-4 px-6 bg-amber-600 text-white rounded-full text-sm font-medium hover:bg-terracotta hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-charcoal/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin font-bold" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Navigation */}
            <div className="mt-8 text-center border-t border-stone-100 pt-6">
              <p className="text-sm text-stone-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-800 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};