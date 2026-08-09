import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AdminDashboard } from "../pages/AdminDashboard";
import { AdminProducts } from "../pages/AdminProducts";
import { AdminOrders } from "../pages/AdminOrders";
import { AdminCustomers } from "../pages/AdminCustomers";
import { AdminAnalytics } from "../pages/AdminAnalytics";
import { AdminSettings } from "../pages/AdminSettings";

export function AdminApp() {
  return (
    <Routes >
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
