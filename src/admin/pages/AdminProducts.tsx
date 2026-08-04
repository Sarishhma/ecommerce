import { useState } from 'react';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import { products } from '@/config/data';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  artisanName?: string;
  stock?: number;
}

export const AdminProducts = () => {
  const [productList, setProductList] = useState<Product[]>(products.slice(0, 8).map(p => ({
    id: String(p.id),
    name: p.name,
    price: p.price,
    image: p.image,
    artisanName: 'Local Artisan',
    stock: Math.floor(Math.random() * 100) + 10,
  })));

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    image: '',
    artisanName: '',
    stock: 0,
  });

  const filteredProducts = productList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!formData.name || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingProduct) {
      setProductList(productList.map(p =>
        p.id === editingProduct.id ? { ...editingProduct, ...formData } : p
      ));
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...formData,
      };
      setProductList([...productList, newProduct]);
    }

    setFormData({ name: '', price: 0, image: '', artisanName: '', stock: 0 });
    setIsAddingProduct(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAddingProduct(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProductList(productList.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => {
            setIsAddingProduct(!isAddingProduct);
            setEditingProduct(null);
            setFormData({ name: '', price: 0, image: '', artisanName: '', stock: 0 });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAddingProduct && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Artisan Name</label>
              <input
                type="text"
                value={formData.artisanName}
                onChange={(e) => setFormData({ ...formData, artisanName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter artisan name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
            <button
              onClick={() => setIsAddingProduct(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Product Name</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Artisan</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Price</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Stock</th>
              <th className="text-center py-3 px-4 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-4 px-4 text-gray-800 font-medium">{product.name}</td>
                <td className="py-4 px-4 text-gray-600">{product.artisanName || 'N/A'}</td>
                <td className="py-4 px-4 text-gray-800 font-medium">${product.price.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    (product.stock || 0) > 20 ? 'bg-green-100 text-green-800' :
                    (product.stock || 0) > 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock || 0} units
                  </span>
                </td>
                <td className="py-4 px-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-4">Total Products: {filteredProducts.length}</p>
    </div>
  );
};
