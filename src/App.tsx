import { Routes, Route } from "react-router-dom";
import { AdminApp } from "./AdminApp";
import { HomePage } from "./client/pages/HomePage";
import { ShopPage } from "./client/pages/ShopPage";
import { ProductDetailPage } from "./client/pages/ProductDetailPage";
import { CartPage } from "./client/pages/CartPage";
import { CollectionPage } from "./client/pages/CollectionPage";
import { StoryPage } from "./client/pages/StoryPage";
import { WholesalePage } from "./client/pages/WholesalePage";
import { JournalPage } from "./client/pages/JournalPage";
import { WishlistPage } from "./client/pages/WishlistPage";
import { AccountPage } from "./client/pages/AccountPage";
import { OrdersPage } from "./client/pages/OrdersPage";
import { SearchResultsPage } from "./client/pages/SearchResultsPage";
import { HelpPage } from "./client/pages/HelpPage";
import { LoginPage } from "./client/pages/LoginPage";
import { SignupPage } from "./client/pages/SignupPage";
import { ContactPage } from "./client/pages/ContactPage";
import { SalePage } from "./client/pages/SalePage";
import { TrackOrderPage } from "./client/pages/TrackOrderPage";
import { Layout } from "./components/layout/Layout";


export default function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Customer Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/collections/:slug" element={<CollectionPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/wholesale" element={<WholesalePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
