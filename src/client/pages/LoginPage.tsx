import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch } from '@/redux';
import { setUser } from '@/redux/slices/authSlice';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // TODO: Replace with real authentication API call
    // This is a mock implementation - connect to your auth backend
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (!email || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // Mock successful login - dispatch to Redux
      const user = {
        id: Math.random().toString(),
        email,
        firstName: email.split('@')[0],
        lastName: 'User',
      };
      dispatch(setUser(user));
      
      // Redirect to account page
      navigate('/account');
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-20 bg-sand/10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-sand/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-charcoal mb-2">Welcome Back</h1>
            <p className="text-stone">Sign in to your Crystal Clan account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-charcoal">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-terracotta hover:text-charcoal transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-sand cursor-pointer"
                defaultChecked
              />
              <label htmlFor="remember" className="ml-2 text-sm text-stone cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-sand"></div>
            <span className="px-3 text-xs text-stone">OR</span>
            <div className="flex-1 border-t border-sand"></div>
          </div>

          {/* Social Login - Placeholder */}
          <div className="space-y-3">
            <button className="w-full py-3 border-2 border-sand rounded-lg font-medium text-charcoal hover:bg-sand/20 transition-colors">
              Continue with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-stone">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-medium text-terracotta hover:text-charcoal transition-colors">
                Create one
              </Link>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-terracotta/10 rounded-lg border border-terracotta/20">
            <p className="text-xs text-charcoal">
              <span className="font-medium">Demo:</span> Use any email and password (min 6 chars) to test the auth flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
