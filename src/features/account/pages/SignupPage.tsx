import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSignup } from '../hook/useSignUp'
import { signupSchema, type SignupSchemaValues } from '../schema/signUp.schema'

export const SignupPage = () => {
  const { signup, isLoading, error } = useSignup()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaValues>({ resolver: zodResolver(signupSchema) })

  const onSubmit = (data: SignupSchemaValues) => signup(data)

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl text-charcoal mb-2">Create Account</h1>
          <p className="text-stone">Join our community of conscious collectors</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
              <input
                {...register('firstName')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                  errors.firstName ? 'border-red-500' : 'border-sand'
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
              <input
                {...register('lastName')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                  errors.lastName ? 'border-red-500' : 'border-sand'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Username</label>
            <input
              {...register('username')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                errors.username ? 'border-red-500' : 'border-sand'
              }`}
              placeholder="sarishma"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                errors.email ? 'border-red-500' : 'border-sand'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
            <input
              type="tel"
              {...register('phoneNumber')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                errors.phoneNumber ? 'border-red-500' : 'border-sand'
              }`}
              placeholder="9800000000"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
            <input
              type="password"
              {...register('password')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                errors.password ? 'border-red-500' : 'border-sand'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                errors.confirmPassword ? 'border-red-500' : 'border-sand'
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('agreeToTerms')}
              className="mt-1 w-5 h-5 text-terracotta rounded focus:ring-2 focus:ring-terracotta cursor-pointer"
            />
            <label className="text-sm text-stone cursor-pointer">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-xs">{errors.agreeToTerms.message}</p>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-terracotta text-ivory py-3 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-stone">
            Already have an account?{' '}
            <a href="/login" className="text-terracotta font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}