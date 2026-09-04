import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // Import from sonner
import { AdminApp } from "./admin/routes/AdminApp";
import { HomePage } from "./client/pages/HomePage";
import { ShopPage } from "./client/feature/shop/pages/ShopPage";
import { ProductDetailPage } from "./features/product/pages/ProductDetailPage";
import { CartPage } from "./client/pages/CartPage";
import { CollectionPage } from "./client/pages/CollectionPage";
import { WishlistPage } from "./client/pages/WishlistPage";
import { AccountPage } from "./features/account/pages/AccountPage";
import { HelpPage } from "./client/pages/HelpPage";
import { LoginPage } from "./auth/pages/LoginPage";
import { SignupPage } from "./features/account/pages/SignupPage";
import { ContactPage } from "./client/pages/ContactPage";
import { SalePage } from "./client/pages/SalePage";
import { TrackOrderPage } from "./features/orders/pages/TrackOrderPage";
import { Layout } from "./components/layout/Layout";
import ComingSoon from "./components/common/ComingSoon";
import { PublicRoute } from "./auth/components/routes/PublicRoute";
import { ProtectedRoute } from "./auth/components/routes/ProtectedRoute";
import { OrderSuccessPage } from "./features/orders/pages/orderpageSuccess";
import { CheckoutPage } from "./features/checkout/pages/checkoutPage";
import { SearchResultsPage } from "./client/pages/SearchResultsPage";

export default function App() {
  return (
    <>
      {/* Toaster with minimal global config */}
      <Toaster
        position="top-center"
        richColors={false}
        closeButton={false}
        expand={false}
        duration={3000}
      />

      <Routes>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/*" element={<AdminApp />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          <Route path="/incense/tibetan" element={<ComingSoon />} />
          <Route path="/incense/raw-powder" element={<ComingSoon />} />
          <Route path="/prayer-flags/tibetan" element={<ComingSoon />} />
          <Route path="/prayer-flags/nepali" element={<ComingSoon />} />
          <Route path="/statues/buddha" element={<ComingSoon />} />
          <Route path="/statues/bodhisattva" element={<ComingSoon />} />
          <Route path="/thangka/buddha" element={<ComingSoon />} />
          <Route path="/thangka/mandala" element={<ComingSoon />} />
          <Route path="/sound-healing/singing-bowls" element={<ComingSoon />} />
          <Route path="/sound-healing/tingsha" element={<ComingSoon />} />
        </Route>
      </Routes>
    </>
  );
}