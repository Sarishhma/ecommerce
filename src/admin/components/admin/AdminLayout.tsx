import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Sparkles } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement actual logout
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 overflow-hidden",
        isSidebarOpen ? "ml-0" : "ml-0"
      )}>
        {/* Top Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-sm shrink-0">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
      
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-foreground hidden sm:block">
                  Crystal Clan Admin
                </h1>
                <Sparkles className="h-3.5 w-3.5 text-primary/60 hidden sm:block" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 gap-2 px-2 rounded-xl hover:bg-muted/50 transition-all">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-medium">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex sm:flex-col items-start">
                      <p className="text-sm font-medium text-foreground leading-none">Admin User</p>
                      <p className="text-xs text-muted-foreground leading-none mt-1">Administrator</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/50 bg-card/95 backdrop-blur-sm shadow-lg">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-foreground">Admin User</p>
                      <p className="text-xs text-muted-foreground">admin@crystalclan.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer rounded-lg">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-9 w-9 rounded-xl border border-border/30 bg-background/50 hover:bg-destructive/10 hover:text-destructive transition-all hidden sm:flex"
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
  );
};