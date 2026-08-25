import { Save } from 'lucide-react';
import { useState } from 'react';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Bijeshwori mala Traders',
    email: 'admin@Bijeshwori.com',
    phone: '+1-800-Bijeshwori',
    address: '123 Artisan Street, Craftville, CA 90210',
    taxRate: 8.5,
    shippingCost: 9.99,
    freeShippingThreshold: 50,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

      {/* Store Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Store Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Pricing Settings */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pricing & Shipping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Cost ($)</label>
            <input
              type="number"
              value={settings.shippingCost}
              onChange={(e) => handleChange('shippingCost', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold ($)</label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => handleChange('freeShippingThreshold', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
