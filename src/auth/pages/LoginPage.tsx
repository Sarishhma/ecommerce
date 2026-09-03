import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "../components/Login/LoginForm";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/account");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ivory via-white to-amber-50/40 px-6 pt-4 pb-12">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-md flex-col justify-center">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 ">
      

        

           
          </div>

          <span className="font-cursive text-2xl text-terracotta">
            Welcome back
          </span>

          <h1 className="mt-1 font-display text-4xl font-light tracking-tight text-charcoal">
            Sign In
          </h1>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone/75">
            Welcome back to Bijeshwori Mala Traders. Sign in to continue.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-sand/70 bg-white/80 p-6 shadow-xl shadow-charcoal/5 backdrop-blur-md sm:p-8">

          {/* Small card heading */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10">
              <ShieldCheck
                className="h-4 w-4 text-terracotta"
                strokeWidth={1.5}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-charcoal">
                Your account
              </p>
              <p className="text-xs text-stone/70">
                Enter your details below
              </p>
            </div>
          </div>

          <LoginForm onSuccess={handleSuccess} />
        </div>

        {/* Signup */}
        <div className="mt-5 text-center">
          <p className="text-sm text-stone">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-terracotta transition-colors hover:text-charcoal"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Trust text */}
        <p className="mt-4 text-center text-[11px] tracking-wide text-stone/50">
          Secure access · Your information stays private
        </p>
      </div>
    </div>
  );
};

export default LoginPage;