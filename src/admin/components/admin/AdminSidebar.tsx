import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Package, ShoppingCart, Users, Settings, Home } from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { path: '/admin', icon: Home, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/admin/customers', icon: Users, label: 'Customers' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gray-900 text-white transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Logo */}
      <div className="h-16 bg-gray-800 flex items-center justify-center border-b border-gray-700">
        <Link to="/admin" className="font-bold text-xl">
          {isOpen ? 'CC Admin' : 'CA'}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">
          {isOpen ? 'Crystal Clan © 2024' : '© 2024'}
        </p>
      </div>
    </aside>
  );
};
