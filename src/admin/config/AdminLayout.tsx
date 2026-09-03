import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LogOut, User as UserIcon, Menu, ChevronLeft } from 'lucide-react'

import { AdminSidebar } from './AdminSidebar'
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
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
        setIsMobile(true)
      } else {
        setIsSidebarOpen(true)
        setIsMobile(false)
      }
    }
    
    // Initial check
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getInitials = (name?: string) => {
    if (!name) return 'A'
    return name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleLogout = () => {
    authService.clearTokens?.()
    dispatch(clearCredentials())
    navigate('/')
  }

  const displayName = user?.full_name || user?.username || 'Admin User'
  const displayEmail = user?.email || 'admin@bijeshwori.com'
  const displayRole = user?.roles || 'Administrator'

  return (
    <div className="flex h-screen bg-sand/10 overflow-hidden font-body selection:bg-terracotta selection:text-ivory">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-ivory/80 backdrop-blur-md border-b border-border shadow-sm shrink-0 z-10 sticky top-0">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(true)}
                  className="mr-1 h-9 w-9 text-charcoal hover:bg-sand/30 hover:text-terracotta"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-display text-charcoal hidden sm:block tracking-wide">
                  Bijeshwori Mala Traders
                </h1>
              </div>
            </div>


<div className="flex items-center gap-3 sm:gap-5">
  <div className="flex flex-col items-end text-right justify-center">
    <span className="font-display text-xs sm:text-[15px] font-semibold text-charcoal tracking-wide leading-tight">
      Hello, {displayName.split(' ')[0]}
    </span>

    <button
      onClick={() => navigate('/')}
      className="group mt-0.5 sm:mt-1 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone transition-all duration-200 hover:text-terracotta"
    >
      <ChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
      Back
    </button>
  </div>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="h-10 gap-2 px-1 sm:px-2 rounded-xl hover:bg-sand/30 transition-all border border-transparent hover:border-border/50"
      >
        <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-1 ring-terracotta/20">
          <AvatarFallback className="bg-gradient-to-br from-terracotta to-amber-200 text-white text-xs font-semibold font-display">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      className="w-56 rounded-xl border-border bg-ivory/95 backdrop-blur-sm shadow-xl p-2"
    >
      <DropdownMenuLabel className="font-normal px-2 py-2.5">
        <div className="flex flex-col space-y-0.5">
          <p className="text-sm font-medium text-charcoal font-display tracking-wide">
            {displayName}
          </p>

          <p className="text-xs text-stone truncate">
            {displayEmail}
          </p>

          <span className="text-[10px] text-terracotta font-semibold uppercase tracking-wider mt-0.5">
            {displayRole}
          </span>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator className="bg-border/50 my-1" />

      <DropdownMenuItem
        onClick={() => navigate('/admin/settings')}
        className="cursor-pointer rounded-lg px-3 py-2 text-charcoal/80 focus:bg-sand/40 focus:text-terracotta transition-colors"
      >
        <UserIcon className="mr-2 h-4 w-4" />
        <span>Profile Settings</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={handleLogout}
        className="cursor-pointer rounded-lg px-3 py-2 text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors mt-1"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>


          </div>
        </header>

        {/* Page Content Area */}
        <main className="flex-1 overflow-auto bg-transparent relative">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-forest/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="p-4 sm:p-6 lg:p-8 relative z-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}