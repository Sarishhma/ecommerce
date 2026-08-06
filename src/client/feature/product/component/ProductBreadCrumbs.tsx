import { Link } from 'react-router-dom'

export const ProductBreadcrumbs = ({ productName }: { productName: string }) => (
  <div className="flex items-center space-x-2 text-sm text-stone mb-8">
    <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
    <span>/</span>
    <Link to="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
    <span>/</span>
    <span className="text-charcoal font-medium truncate">{productName}</span>
  </div>
)