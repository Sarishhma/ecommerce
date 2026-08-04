import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./admin/components/admin/AdminLayout";
import { AdminDashboard } from "./admin/pages/AdminDashboard";
import { AdminProducts } from "./admin/pages/AdminProducts";
import { AdminOrders } from "./admin/pages/AdminOrders";
import { AdminCustomers } from "./admin/pages/AdminCustomers";
import { AdminAnalytics } from "./admin/pages/AdminAnalytics";
import { AdminSettings } from "./admin/pages/AdminSettings";

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
