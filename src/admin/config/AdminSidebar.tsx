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
  FolderTree
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
}

const menuItems = [
  { path: '/admin', icon: Home, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
   { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
   { path: '/admin/users', icon: Users, label: 'staff' },
  { path: '/admin/customers', icon: Users, label: 'Customers' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();

  const toggleSidebar = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-white border-r border-border/50 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "absolute -right-3 top-20 h-6 w-6 rounded-full border border-border/50 bg-background shadow-sm hover:bg-muted/50",
          "transition-all duration-200 z-10"
        )}
      >
        {isOpen ? (
          <ChevronLeft className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
      </Button>

      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b border-border/50 px-4 shrink-0">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          {isOpen && (
            <span className="font-bold text-lg text-foreground">
              Bijeshwori Mala Traders
              <span className="ml-1 text-xs text-muted-foreground font-normal">Admin</span>
            </span>
          )}
        </Link>
        {isOpen && (
          <Sparkles className="h-3.5 w-3.5 text-primary/60" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                "hover:bg-muted/50 group",
                isActive 
                  ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground"
              )} />
              {isOpen && (
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "group-hover:text-foreground"
                )}>
                  {item.label}
                </span>
              )}
              {!isOpen && (
                <div className="absolute left-16 hidden group-hover:block z-50">
                  <div className="ml-2 px-2.5 py-1.5 rounded-lg bg-popover text-popover-foreground text-xs font-medium shadow-lg border border-border/50 whitespace-nowrap">
                    {item.label}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 px-4 py-3 shrink-0">
        {isOpen ? (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © 2025 Bijeshwori Mala Traders
            </p>
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground">
            © 25
          </p>
        )}
      </div>
    </aside>
  );
};