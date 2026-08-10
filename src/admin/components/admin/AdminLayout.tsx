import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, X, LogOut, User as UserIcon, Sparkles } from 'lucide-react'

import { AdminSidebar } from './AdminSidebar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'


import { authService } from '@/auth/services/auth.service'
import { clearCredentials, selectUser } from '@/redux/slices/authSlice'

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Select current logged in user from Redux store
  const user = useSelector(selectUser)

  // Compute initials or fallback to 'A'
  const getInitials = (name?: string) => {
    if (!name) return 'A'
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = () => {
    authService.clearTokens?.()
    dispatch(clearCredentials())
    navigate('/')
  }

  const displayName = user?.full_name || user?.username || 'Admin User'
  const displayEmail = user?.email || 'admin@crystalclan.com'
  const displayRole = user?.roles|| 'Administrator'

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 overflow-hidden',
          isSidebarOpen ? 'ml-0' : 'ml-0'
        )}
      >
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm shrink-0">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-900 hidden sm:block">
                  Crystal Clan Admin
                </h1>
                <Sparkles className="h-3.5 w-3.5 text-blue-500/60 hidden sm:block" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-9 gap-2 px-2 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                      <AvatarFallback className="bg-blue-50 text-blue-600 text-xs font-semibold">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex sm:flex-col items-start">
                      <p className="text-sm font-medium text-slate-900 leading-none">
                        {displayName}
                      </p>
                      <p className="text-xs text-slate-500 leading-none mt-1 capitalize">
                        {displayRole}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-slate-900">
                        {displayName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {displayEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem className="cursor-pointer rounded-lg text-slate-700 focus:bg-slate-100 focus:text-slate-900">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={()=>navigate('/')}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all hidden sm:flex"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}