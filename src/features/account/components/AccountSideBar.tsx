import {
  User,
  MapPin,
  Lock,
  LogOut,
  ChevronRight,
  Mail,
} from "lucide-react";

import { useLogout } from "@/auth/hooks/useLogout";

type TabKey = "profile" | "addresses" | "password";

type AccountSidebarProps = {
  user: {
    full_name?: string | null;
    email: string;
  };
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

const tabs = [
  {
    key: "profile" as const,
    label: "Profile",
    description: "Manage personal details",
    icon: User,
  },
  {
    key: "addresses" as const,
    label: "Addresses",
    description: "Saved delivery locations",
    icon: MapPin,
  },
  {
    key: "password" as const,
    label: "Security",
    description: "Password & privacy settings",
    icon: Lock,
    badge: "Protected",
  },
];

export const AccountSidebar = ({
  user,
  activeTab,
  setActiveTab,
}: AccountSidebarProps) => {
  const handleLogout = useLogout();

  const firstName = user.full_name?.split(" ")[0] || "there";

  return (
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

        {/* Navigation */}
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
  );
};