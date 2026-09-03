import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Home,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  FolderTree,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  isMobile?: boolean;
}

const menuItems = [
  { path: '/admin', icon: Home, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/admin/users', icon: Users, label: 'Staff' },
  { path: '/admin/customers', icon: Users, label: 'Customers' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
];

export const AdminSidebar = ({
  isOpen,
  setIsOpen,
  isMobile,
}: AdminSidebarProps) => {
  const location = useLocation();

  const toggleSidebar = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
  };

  const isSettingsActive = location.pathname === '/admin/settings';

  return (
    <aside
      className={cn(
        'flex flex-col bg-ivory/95 backdrop-blur-xl border-r border-border transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none z-50',
        isMobile ? 'fixed inset-y-0 left-0' : 'relative',
        isOpen
          ? 'w-64 translate-x-0'
          : isMobile
            ? '-translate-x-full w-64'
            : 'w-20 translate-x-0'
      )}
    >
      {/* Toggle / Close Button */}
      {isMobile ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen && setIsOpen(false)}
          className="absolute right-4 top-4 h-8 w-8 rounded-full bg-sand/50 text-charcoal hover:bg-terracotta hover:text-ivory transition-colors z-50 lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            'absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-ivory shadow-sm hover:bg-sand hover:text-terracotta text-stone',
            'transition-all duration-200 z-10 hidden lg:flex items-center justify-center'
          )}
        >
          {isOpen ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </Button>
      )}

      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4 shrink-0">
        <Link
          to="/admin"
          className="flex items-center gap-2.5 overflow-hidden"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-terracotta to-copper text-ivory shadow-sm border border-copper/20">
            <Package className="h-4 w-4" />
          </div>

          {isOpen && (
            <span className="font-display font-medium text-lg text-charcoal tracking-wide whitespace-nowrap">
              Admin
            </span>
          )}
        </Link>

        {isOpen && !isMobile && (
          <Sparkles className="h-3.5 w-3.5 text-copper opacity-60" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1.5 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() =>
                isMobile && setIsOpen && setIsOpen(false)
              }
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300',
                'group relative',
                isActive
                  ? 'bg-terracotta text-ivory shadow-md shadow-terracotta/20'
                  : 'text-charcoal/80 hover:bg-sand/80 hover:text-charcoal'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 flex-shrink-0 transition-colors',
                  isActive
                    ? 'text-ivory'
                    : 'text-charcoal/60 group-hover:text-terracotta'
                )}
              />

              {isOpen && (
                <span
                  className={cn(
                    'text-[15px] font-display transition-colors tracking-wide',
                    isActive
                      ? 'text-ivory font-medium'
                      : 'group-hover:text-charcoal'
                  )}
                >
                  {item.label}
                </span>
              )}

              {/* Tooltip when sidebar is collapsed */}
              {!isOpen && !isMobile && (
                <div className="absolute left-16 hidden group-hover:block z-50">
                  <div className="ml-2 px-3 py-1.5 rounded-lg bg-charcoal text-ivory text-xs font-display tracking-wide shadow-xl whitespace-nowrap">
                    {item.label}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border bg-sand/10 px-3 py-3 shrink-0">
        {isOpen ? (
          <div className="space-y-2">
            {/* Settings */}
            <Link
              to="/admin/settings"
              onClick={() =>
                isMobile && setIsOpen && setIsOpen(false)
              }
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                isSettingsActive
                  ? 'bg-terracotta text-ivory shadow-md shadow-terracotta/20'
                  : 'text-charcoal/80 hover:bg-sand/80 hover:text-charcoal'
              )}
            >
              <Settings
                className={cn(
                  'h-5 w-5 flex-shrink-0 transition-colors',
                  isSettingsActive
                    ? 'text-ivory'
                    : 'text-charcoal/60 group-hover:text-terracotta'
                )}
              />
              <span
                className={cn(
                  'text-[15px] font-display transition-colors tracking-wide',
                  isSettingsActive ? 'text-ivory font-medium' : 'group-hover:text-charcoal'
                )}
              >
                Settings
              </span>
            </Link>

            {/* Bottom Status */}
            <div className="flex items-center justify-between px-3 pt-2.5 border-t border-border/60">
              {/* Online Status */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-forest opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
                </span>

                <span className="text-[10px] text-forest font-semibold uppercase tracking-widest">
                  Online
                </span>
              </div>

              {/* Copyright */}
              <span className="text-[10px] text-stone font-medium tracking-wider">
                © 2025 BMT
              </span>
            </div>
          </div>
        ) : (
          /* Collapsed Footer */
          <div className="flex flex-col items-center gap-3">
            {/* Settings */}
            <Link
              to="/admin/settings"
              onClick={() =>
                isMobile && setIsOpen && setIsOpen(false)
              }
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group',
                isSettingsActive
                  ? 'bg-terracotta text-ivory shadow-sm'
                  : 'text-charcoal/60 hover:bg-sand/80 hover:text-terracotta'
              )}
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>

            {/* Online Indicator */}
            <div
              className="relative flex h-2 w-2"
              title="Online"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-forest opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
            </div>

            {/* Brand */}
            <span className="text-[9px] text-stone font-semibold tracking-widest">
              BMT
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
