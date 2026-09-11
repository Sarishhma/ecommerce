import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/redux";
import { selectUser } from "@/redux/slices/authSlice";

import { ProfileTab } from "@/features/account/components/ProfileTab";
import { AddressesTab } from "@/features/account/components/AddressTab";
import { PasswordTab } from "@/features/account/components/PasswordTab";
import { AccountSidebar } from "../components/AccountSideBar";
import { User } from "lucide-react";

type TabKey = "profile" | "addresses" | "password";

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  /*
   * User is not logged in
   */
  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-ivory via-white to-amber-50/30 flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* Icon */}
          <div className="relative w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 bg-terracotta/10 rounded-full blur-2xl" />

            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-terracotta/20 to-amber-200/30 flex items-center justify-center border border-terracotta/10">
              <User className="w-8 h-8 text-terracotta" strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight text-charcoal">
            Welcome back
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm text-stone/80 leading-relaxed max-w-sm mx-auto">
            Sign in to access your profile, addresses, and account preferences.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-10 py-4 bg-charcoal text-white rounded-full text-sm font-medium hover:bg-terracotta hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-charcoal/10"
          >
            Sign In
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-ivory via-white to-amber-50/20 py-10">

      {/* CONTENT */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 pt-6 pb-24">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-10 lg:gap-16">

            {/* SIDEBAR */}
            <AccountSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* MAIN PANEL */}
            <div className="min-w-0">

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">

                {/* Panel Header */}
                <div className="relative px-6 sm:px-8 lg:px-10 py-6 lg:py-7 border-b border-sand/50">

                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-terracotta to-amber-500" />

                  <div className="flex items-center justify-between">
                    <div>

                      <p className="text-[10px] uppercase tracking-[0.3em] text-black font-medium mb-1">
                        {activeTab === "profile" && "Personal Information"}
                        {activeTab === "addresses" && "Delivery Management"}
                        {activeTab === "password" && "Account Security"}
                      </p>

                      <h2 className="font-display text-2xl lg:text-3xl font-light text-charcoal">
                        {activeTab === "profile" && "Your Profile"}
                        {activeTab === "addresses" && "Saved Addresses"}
                        {activeTab === "password" && "Password & Security"}
                      </h2>

                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6 sm:p-8 lg:p-10 xl:p-12">

                  {activeTab === "profile" && (
                    <ProfileTab user={user} />
                  )}

                  {activeTab === "addresses" && (
                    <AddressesTab />
                  )}

                  {activeTab === "password" && (
                    <PasswordTab />
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
};
