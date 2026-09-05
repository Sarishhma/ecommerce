import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { AdminApp } from "./admin/routes/AdminApp";
import { Layout } from "./components/layout/Layout";
import { PublicRoute } from "./auth/components/routes/PublicRoute";
import { ProtectedRoute } from "./auth/components/routes/ProtectedRoute";

// ============================================
// LAZY LOADED PAGES
// ============================================

const HomePage = lazy(() =>
  import("./client/pages/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);

const ShopPage = lazy(() =>
  import("./client/feature/shop/pages/ShopPage").then((module) => ({
    default: module.ShopPage,
  }))
);

const ProductDetailPage = lazy(() =>
  import("./features/product/pages/ProductDetailPage").then((module) => ({
    default: module.ProductDetailPage,
  }))
);

const CartPage = lazy(() =>
  import("./client/pages/CartPage").then((module) => ({
    default: module.CartPage,
  }))
);

const CollectionPage = lazy(() =>
  import("./client/pages/CollectionPage").then((module) => ({
    default: module.CollectionPage,
  }))
);

const WishlistPage = lazy(() =>
  import("./client/pages/WishlistPage").then((module) => ({
    default: module.WishlistPage,
  }))
);

const AccountPage = lazy(() =>
  import("./features/account/pages/AccountPage").then((module) => ({
    default: module.AccountPage,
  }))
);

const HelpPage = lazy(() =>
  import("./client/pages/HelpPage").then((module) => ({
    default: module.HelpPage,
  }))
);

const LoginPage = lazy(() =>
  import("./auth/pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);

const SignupPage = lazy(() =>
  import("./features/account/pages/SignupPage").then((module) => ({
    default: module.SignupPage,
  }))
);

const ContactPage = lazy(() =>
  import("./client/pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  }))
);

const SalePage = lazy(() =>
  import("./client/pages/SalePage").then((module) => ({
    default: module.SalePage,
  }))
);

const TrackOrderPage = lazy(() =>
  import("./features/orders/pages/TrackOrderPage").then((module) => ({
    default: module.TrackOrderPage,
  }))
);

const OrderSuccessPage = lazy(() =>
  import("./features/orders/pages/orderpageSuccess").then((module) => ({
    default: module.OrderSuccessPage,
  }))
);

const CheckoutPage = lazy(() =>
  import("./features/checkout/pages/checkoutPage").then((module) => ({
    default: module.CheckoutPage,
  }))
);

const SearchResultsPage = lazy(() =>
  import("./client/pages/SearchResultsPage").then((module) => ({
    default: module.SearchResultsPage,
  }))
);

const ComingSoon = lazy(() =>
  import("./components/common/ComingSoon").then((module) => ({
    default: module.default,
  }))
);

// ============================================
// LOADING FALLBACK
// ============================================

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-charcoal">Loading...</div>
    </div>
  );
}

// ============================================
// APP
// ============================================

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        richColors={false}
        closeButton={false}
        expand={false}
        duration={3000}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ================================
              ADMIN
          ================================= */}

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminApp />} />
          </Route>

          {/* ================================
              CLIENT
          ================================= */}

          <Route element={<Layout />}>

            {/* Public Pages */}

            <Route path="/" element={<HomePage />} />

            <Route path="/shop" element={<ShopPage />} />

            <Route path="/sale" element={<SalePage />} />

            <Route
              path="/product/:id"
              element={<ProductDetailPage />}
            />

            <Route path="/cart" element={<CartPage />} />

            <Route
              path="/track-order"
              element={<TrackOrderPage />}
            />

            <Route
              path="/wishlist"
              element={<WishlistPage />}
            />

            <Route
              path="/collections/:slug"
              element={<CollectionPage />}
            />

            <Route
              path="/search"
              element={<SearchResultsPage />}
            />

            <Route
              path="/help"
              element={<HelpPage />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />

            {/* ================================
                AUTH
            ================================= */}

            <Route element={<PublicRoute />}>
              <Route
                path="/login"
                element={<LoginPage />}
              />

              <Route
                path="/signup"
                element={<SignupPage />}
              />
            </Route>

            {/* ================================
                PROTECTED USER ROUTES
            ================================= */}

            <Route element={<ProtectedRoute />}>
              <Route
                path="/account"
                element={<AccountPage />}
              />

              <Route
                path="/order-success"
                element={<OrderSuccessPage />}
              />

              <Route
                path="/checkout"
                element={<CheckoutPage />}
              />
            </Route>

            {/* ================================
                COMING SOON
            ================================= */}

            <Route
              path="/incense/tibetan"
              element={<ComingSoon />}
            />

            <Route
              path="/incense/raw-powder"
              element={<ComingSoon />}
            />

            <Route
              path="/prayer-flags/tibetan"
              element={<ComingSoon />}
            />

            <Route
              path="/prayer-flags/nepali"
              element={<ComingSoon />}
            />

            <Route
              path="/statues/buddha"
              element={<ComingSoon />}
            />

            <Route
              path="/statues/bodhisattva"
              element={<ComingSoon />}
            />

            <Route
              path="/thangka/buddha"
              element={<ComingSoon />}
            />

            <Route
              path="/thangka/mandala"
              element={<ComingSoon />}
            />

            <Route
              path="/sound-healing/singing-bowls"
              element={<ComingSoon />}
            />

            <Route
              path="/sound-healing/tingsha"
              element={<ComingSoon />}
            />

          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
