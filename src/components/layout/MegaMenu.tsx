import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const MegaMenu = ({ isOpen, onClose, isDark }: MegaMenuProps) => {
  const textColor = isDark ? 'text-charcoal' : 'text-ivory';
  const bgColor = isDark ? 'bg-ivory' : 'bg-charcoal';
  const hoverBg = isDark ? 'hover:bg-sand' : 'hover:bg-charcoal/80';

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-40 ${bgColor} pt-20`}>
      <div className="container mx-auto px-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-4 p-2 rounded-lg ${hoverBg} transition`}
        >
          <X className={`w-6 h-6 ${textColor}`} />
        </button>

        {/* Mega Menu Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          {/* Featured Column */}
          <div>
            <h3 className={`font-bold ${textColor} mb-6 text-lg`}>Featured</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition font-semibold text-terracotta`}
                >
                  ✨ New Sale Items
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/artisan-bowls"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/seasonal"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/story"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections Column */}
          <div>
            <h3 className={`font-bold ${textColor} mb-6 text-lg`}>Collections</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/collections/artisan-bowls"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Artisan Bowls
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/seasonal"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Seasonal Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/heirloom"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Heirloom Pieces
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/minimalist"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Minimalist
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/bold-statement"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Bold Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Materials Column */}
          <div>
            <h3 className={`font-bold ${textColor} mb-6 text-lg`}>Materials</h3>
            <ul className="space-y-3">
              <li>
                <span className={`${textColor} opacity-80`}>Ceramic</span>
              </li>
              <li>
                <span className={`${textColor} opacity-80`}>Stoneware</span>
              </li>
              <li>
                <span className={`${textColor} opacity-80`}>Handwoven Textiles</span>
              </li>
              <li>
                <span className={`${textColor} opacity-80`}>Sustainably Sourced</span>
              </li>
              <li>
                <span className={`${textColor} opacity-80`}>Artisan Crafted</span>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className={`font-bold ${textColor} mb-6 text-lg`}>Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/wholesale"
                  onClick={onClose}
                  className={`${textColor} opacity-80 hover:opacity-100 transition`}
                >
                  Wholesale Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Images Column */}
          <div>
            <div className="space-y-4">
              <Link
                to="/sale"
                onClick={onClose}
                className="block"
              >
                <div className="bg-gradient-to-br from-terracotta/30 to-terracotta/10 aspect-square rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition">
                  <span className={`font-bold text-center ${textColor}`}>
                    Sale Up to 50%
                  </span>
                </div>
              </Link>
              <Link
                to="/collections/seasonal"
                onClick={onClose}
                className="block"
              >
                <div className="bg-gradient-to-br from-sand to-sand/20 aspect-square rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition">
                  <span className={`font-bold text-center ${textColor}`}>
                    New Collection
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className={`py-8 border-t ${isDark ? 'border-sand' : 'border-charcoal/20'}`}>
          <p className={`text-center ${textColor} opacity-80`}>
            🎁 Free shipping on orders over $50
          </p>
        </div>
      </div>
    </div>
  );
};
