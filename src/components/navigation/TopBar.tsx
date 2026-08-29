import { Link } from 'react-router-dom';

interface TopBarProps {
  isHomePage: boolean;
  isScrolled: boolean;
  borderColor: string;
  hoverColor: string;
}

export const TopBar = ({ isHomePage, isScrolled, borderColor, hoverColor }: TopBarProps) => (
  <div
    className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isHomePage && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
    } bg-white/98 backdrop-blur-sm border-b ${borderColor}`}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-8 text-xs text-[#1a1a1a]/60">
        <div className="flex items-center space-x-6">
          <span className="flex items-center">✨ Free shipping on orders over $150</span>
          <span className="hidden sm:flex items-center">🎁 Complimentary gift wrapping</span>
        </div>
        <div className="flex items-center space-x-5">
          <Link to="/help" className={`${hoverColor} transition-colors duration-200`}>Help</Link>
          <Link to="/track-order" className={`${hoverColor} transition-colors duration-200`}>Track Order</Link>
          <Link to="/sale" className={`${hoverColor} transition-colors duration-200 font-medium text-[#b8860b]`}>Sale</Link>
        </div>
      </div>
    </div>
  </div>
);