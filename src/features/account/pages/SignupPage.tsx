import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-amber-50/30 pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl lg:text-5xl font-light tracking-tight text-charcoal">
            Create Account
          </h1>

          <p className="mt-3 text-sm text-stone/80">
            Join our community of conscious collectors
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                First Name
              </label>

              <input
                {...register("firstName")}
                placeholder="John"
                className={`w-full px-4 py-3 bg-white/70 border rounded-xl text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all ${
                  errors.firstName ? "border-red-500" : "border-sand"
                }`}
              />

              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Last Name
              </label>

              <input
                {...register("lastName")}
                placeholder="Doe"
                className={`w-full px-4 py-3 bg-white/70 border rounded-xl text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all ${
                  errors.lastName ? "border-red-500" : "border-sand"
                }`}
              />

              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Username
            </label>

            <input
              {...register("username")}
              placeholder="sarishma"
              className={`w-full px-4 py-3 bg-white/70 border rounded-xl text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all ${
                errors.username ? "border-red-500" : "border-sand"
              }`}
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className={`w-full px-4 py-3 bg-white/70 border rounded-xl text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all ${
                errors.email ? "border-red-500" : "border-sand"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Phone Number
            </label>

            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="9800000000"
              className={`w-full px-4 py-3 bg-white/70 border rounded-xl text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all ${
                errors.phoneNumber ? "border-red-500" : "border-sand"
              }`}
            />

            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-white/70 border rounded-xl text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all ${
                errors.password ? "border-red-500" : "border-sand"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Confirm Password
            </label>

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-white/70 border rounded-xl text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all ${
                errors.confirmPassword ? "border-red-500" : "border-sand"
              }`}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="mt-0.5 w-4 h-4 accent-terracotta rounded cursor-pointer"
              />

              <label className="text-xs leading-relaxed text-stone cursor-pointer">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>

          {/* Server Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 bg-charcoal text-white rounded-full text-sm font-medium hover:bg-terracotta hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-charcoal/10 disabled:opacity-50 disabled:hover:bg-charcoal disabled:hover:scale-100 cursor-pointer"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-stone">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-terracotta font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};