import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigation } from './Navigation'
import { FooterSection } from '@/client/feature/home/components/footer-section'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-ivory font-body text-charcoal">
      <ScrollToTop />

      <Navigation />

      <main className="flex flex-1 flex-col pt-24 sm:pt-28">
        <Outlet />
      </main>

      {FooterSection ? (
        <FooterSection />
      ) : (
        <footer className="bg-charcoal py-12 text-center text-white">
          Crystal Clan Footer Placeholder
        </footer>
      )}
    </div>
  )
}
