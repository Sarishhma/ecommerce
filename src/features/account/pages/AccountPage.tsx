import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, MapPin, Lock, LogOut, Settings } from "lucide-react"
import { useAppSelector } from "@/redux"
import { selectUser,  } from "@/redux/slices/authSlice"

import { useLogout } from "@/auth/hooks/useLogout"
import { ProfileTab } from "@/features/account/components/ProfileTab"
import { AddressesTab } from "@/features/account/components/AddressTab"
import { PasswordTab } from "@/features/account/components/PasswordTab"
// import { PreferencesTab } from "@/features/account/components/PreferenceTab"

type TabKey = "profile" | "addresses" | "password" | "preferences"

const tabs: { key: TabKey; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "password", label: "Password", icon: Lock },
  // { key: "preferences", label: "Preferences", icon: Settings },
]

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("profile")
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const handleLogout = useLogout()

  if (!user) {
    return (
      <div className="pt-[calc(var(--nav-height)+2rem)] pb-20 text-center min-h-screen">
        <h2 className="text-2xl font-bold text-charcoal mb-4">
          Please sign in to view your account
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-terracotta text-ivory rounded-lg font-medium hover:bg-opacity-90"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
<div className="pt-[calc(var(--nav-height)+2rem)] pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">     
   <div className="text-center mb-12">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
          My Account
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
<div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6 space-y-2 sticky top-[calc(var(--nav-height)+1rem)]">            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center space-x-3 ${
                  activeTab === key
                    ? "bg-terracotta text-white"
                    : "text-charcoal hover:bg-sand/30"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}

            <div className="border-t border-sand my-4"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center space-x-3 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-8">
            {activeTab === "profile" && <ProfileTab user={user} />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "password" && <PasswordTab />}
            {/* {activeTab === "preferences" && <PreferencesTab />} */}
          </div>
        </div>
      </div>
    </div>
  )
}