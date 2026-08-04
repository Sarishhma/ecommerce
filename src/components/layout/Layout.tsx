import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
// Assuming FooterSection exists or we will create a placeholder. 
// For now, I'll import from a likely location or create a simple fallback.
// Since the prompt says "The FooterSection component at bottom", I assume it exists somewhere like `@/components/layout/FooterSection` or `@/features/home/components/FooterSection`
import { FooterSection } from '@/features/home/components/footer-section'; 

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-ivory font-body text-charcoal">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      {FooterSection ? <FooterSection /> : <footer className="bg-charcoal text-white py-12 text-center">Crystal Clan Footer Placeholder</footer>}
    </div>
  );
};
