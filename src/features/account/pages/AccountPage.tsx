import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  Lock,
  LogOut,
  ChevronRight,
  Mail,
} from "lucide-react";

import { useAppSelector } from "@/redux";
import { selectUser } from "@/redux/slices/authSlice";
import { useLogout } from "@/auth/hooks/useLogout";
import { ProfileTab } from "@/features/account/components/ProfileTab";
import { AddressesTab } from "@/features/account/components/AddressTab";
import { PasswordTab } from "@/features/account/components/PasswordTab";

type TabKey = "profile" | "addresses" | "password";

const tabs: {
  key: TabKey;
  label: string;
  description: string;
  icon: typeof User;
  badge?: string;
}[] = [
  {
    key: "profile",
    label: "Profile",
    description: "Manage personal details",
    icon: User,
  },
  {
    key: "addresses",
    label: "Addresses",
    description: "Saved delivery locations",
    icon: MapPin,
  },
  {
    key: "password",
    label: "Security",
    description: "Password & privacy settings",
    icon: Lock,
    badge: "Protected",
  },
];

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const handleLogout = useLogout();

  /* ───────────────── NOT LOGGED IN ───────────────── */

if (!user) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-ivory via-white to-amber-50/30 flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Icon */}
        <div className="relative w-20 h-20 mx-auto mb-5">
          <div className="absolute inset-0 bg-terracotta/10 rounded-full blur-2xl" />

          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-terracotta/20 to-amber-200/30 flex items-center justify-center border border-terracotta/10">
            <User
              className="w-8 h-8 text-terracotta"
              strokeWidth={1.5}
            />
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

  const firstName = user.full_name?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-gradient-to-br from-ivory via-white to-amber-50/20">

    
{/* ───────────────── HEADER ───────────────── */}
<section className="relative pt-10 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden">
  {/* Decorative gradient blob */}
  <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

  <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto relative">

    {/* Welcome */}
    <div className="flex justify-center text-center">
      <div className="max-w-3xl">

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.03em] text-charcoal leading-[1.05]">
          Welcome back,{" "}
          <span className="font-normal bg-gradient-to-r from-terracotta to-amber-600 bg-clip-text text-transparent">
            {firstName}
          </span>
        </h1>

        <p className="mt-3 mx-auto max-w-xl text-sm lg:text-base text-stone/70 leading-relaxed">
          Manage your personal information, addresses, and security
          settings all in one place.
        </p>

      </div>
    </div>

    {/* Divider */}
    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-sand/60 to-transparent" />

  </div>
</section>


      {/* ───────────────── CONTENT ───────────────── */}
      <section className="px-6 sm:px-10 lg:px-16 pt-6 pb-24">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-10 lg:gap-16">

            {/* ───────── SIDEBAR ───────── */}
            <aside>
              <div className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)]">

                {/* Account Identity */}
                <div className="relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full blur-2xl" />

                  <div className="relative flex items-center gap-4">

                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta/20 to-amber-200/30 flex items-center justify-center border-2 border-white shadow-sm">
                        <span className="font-display text-2xl font-light text-terracotta">
                          {firstName.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    {/* User Info */}
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg font-medium text-charcoal truncate">
                        {user.full_name || "My Account"}
                      </p>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-black" />

                        <p className="text-xs text-black truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Account Navigation */}
                <div className="mt-6">

                  <p className="text-[9px] uppercase tracking-[0.3em] text-stone/40 font-medium px-1 mb-3">
                    Manage Account
                  </p>

                  <nav className="space-y-1">
                    {tabs.map(
                      ({
                        key,
                        label,
                        description,
                        icon: Icon,
                        badge,
                      }) => {
                        const active = activeTab === key;

                        return (
                          <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`
                              group relative w-full text-left
                              flex items-center gap-3.5
                              px-4 py-3.5
                              rounded-xl
                              transition-all duration-300
                              ${
                                active
                                  ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-terracotta/10"
                                  : "hover:bg-white/50"
                              }
                            `}
                          >
                            {/* Active Indicator */}
                            <span
                              className={`
                                absolute left-0 top-1/2 -translate-y-1/2
                                w-1 rounded-full
                                transition-all duration-300
                                ${
                                  active
                                    ? "h-8 bg-terracotta"
                                    : "h-0 bg-transparent"
                                }
                              `}
                            />

                            {/* Icon */}
                            <div
                              className={`
                                w-9 h-9 rounded-lg
                                flex items-center justify-center
                                flex-shrink-0
                                transition-all duration-300
                                ${
                                  active
                                    ? "bg-terracotta text-white shadow-sm shadow-terracotta/20"
                                    : "bg-sand/30 text-stone/60 group-hover:text-charcoal group-hover:bg-sand/50"
                                }
                              `}
                            >
                              <Icon
                                className={`w-4 h-4 ${
                                  active
                                    ? "text-white"
                                    : "text-stone/60 group-hover:text-terracotta"
                                }`}
                                strokeWidth={1.5}
                              />
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`
                                    text-sm font-medium transition-colors
                                    ${
                                      active
                                        ? "text-charcoal"
                                        : "text-charcoal/70 group-hover:text-charcoal"
                                    }
                                  `}
                                >
                                  {label}
                                </p>

                                {badge && (
                                  <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium border border-emerald-100/50">
                                    {badge}
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-black mt-0.5">
                                {description}
                              </p>
                            </div>

                            {/* Arrow */}
                            <ChevronRight
                              className={`
                                w-4 h-4 flex-shrink-0
                                transition-all duration-300
                                ${
                                  active
                                    ? "text-terracotta translate-x-0 opacity-100"
                                    : "text-black -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                }
                              `}
                              strokeWidth={1.5}
                            />
                          </button>
                        );
                      }
                    )}
                  </nav>
                </div>

                {/* Logout */}
                <div className="mt-8 pt-6 border-t border-sand/60">
                  <button
                    onClick={handleLogout}
                    className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-red-50/70 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50 group-hover:bg-red-100 transition-colors duration-300">
                      <LogOut
                        className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>

                    <span className="text-xs uppercase tracking-[0.15em] font-medium text-red-400 group-hover:text-red-500 transition-colors duration-300">
                      Sign out
                    </span>
                  </button>
                </div>

              </div>
            </aside>

            {/* ───────── MAIN PANEL ───────── */}
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

                  {activeTab === "addresses" && <AddressesTab />}

                  {activeTab === "password" && <PasswordTab />}
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
};
