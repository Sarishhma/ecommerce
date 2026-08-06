import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormData } from '../schema/login.schema';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50/80 border border-red-200/80 rounded-xl transition-all">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}

      {/* Username / Identifier Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-charcoal mb-2">
          Username
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone/70" />
          <input
            id="username"
            type="text"
            {...register('username')}
            placeholder="Enter your username"
            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-sand rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all text-sm text-charcoal placeholder:text-stone/50"
          />
        </div>
        {errors.username && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.username.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-charcoal">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-terracotta hover:text-charcoal transition-colors"
          >
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone/70" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="••••••••"
            className="w-full pl-11 pr-11 py-3 bg-slate-50/50 border border-sand rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all text-sm text-charcoal placeholder:text-stone/50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone/70 hover:text-charcoal transition-colors p-1"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 rounded border-sand text-terracotta focus:ring-terracotta/30 cursor-pointer"
          defaultChecked
        />
        <label htmlFor="remember" className="ml-2.5 text-sm text-stone cursor-pointer select-none">
          Remember me
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-terracotta text-white rounded-xl font-medium hover:bg-charcoal active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};