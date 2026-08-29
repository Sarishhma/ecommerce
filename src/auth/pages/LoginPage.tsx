import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/Login/LoginForm';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/account');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[calc(var(--nav-height,0px)+2rem)] pb-20 bg-sand/10">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-sand/20 border border-sand/60 p-8 sm:p-10">
          
          {/* Header with Cursive Accent */}
          <div className="text-center mb-8">
            <span className="font-cursive text-2xl text-terracotta block mb-1">
              Welcome back
            </span>
            <h1 className="font-display text-3xl font-bold text-charcoal tracking-tight mb-2">
              Sign In
            </h1>
            <p className="text-sm text-stone">
              Access your Bijeshwori Mala Traders account
            </p>
          </div>

          {/* Form Module */}
          <LoginForm onSuccess={handleSuccess} />

          {/* Divider */}
          <div className="my-7 flex items-center">
            <div className="flex-1 border-t border-sand/70"></div>
            <span className="px-3 text-xs font-semibold tracking-wider text-stone/70 uppercase">OR</span>
            <div className="flex-1 border-t border-sand/70"></div>
          </div>

          {/* Social Action */}
          <button
            type="button"
            className="w-full py-3 border border-sand rounded-xl font-medium text-sm text-charcoal hover:bg-sand/20 active:scale-[0.99] transition-all"
          >
            Continue with Google
          </button>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-stone">
              Dont have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-terracotta hover:text-charcoal transition-colors ml-1"
              >
                Create one
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;