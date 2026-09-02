import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../config/AdminLayout";
import { AdminDashboard } from "../pages/AdminDashboard";
import { AdminProducts } from "../pages/AdminProducts";
import { AdminOrders } from "../pages/AdminOrders";

import { AdminAnalytics } from "../pages/AdminAnalytics";
import { AdminSettings } from "../pages/AdminSettings";
import { AdminCategories } from "../pages/AdminCategory";
import AdminUser from "../pages/AdminUser";
import AdminCustomers from "../pages/AdminCustomers";


export function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/customers" element={<AdminCustomers />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/categories" element={<AdminCategories />} />
        
        <Route path="/users" element={<AdminUser/>} />
    
      </Route>
    </Routes>
  );
}
