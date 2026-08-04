import { footerColumns as mockColumns } from "@/config/data";

import { Link } from "react-router-dom";
import { useScrollReveal } from "@/features/home/hooks/use-scroll-reveal";




export function FooterSection({ footerColumns = mockColumns }: { footerColumns?: any[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <footer ref={ref} className="bg-charcoal text-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div
            className={`lg:col-span-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link to="/" className="font-display text-3xl text-ivory block mb-6">
              Crystal Clan
            </Link>
            <p className="text-ivory/60 leading-relaxed mb-6 max-w-sm">
              Authentic Nepalese craftsmanship, handmade by skilled artisans and
              carried with care to homes around the world.
            </p>
            <div className="flex items-center gap-4">
              {["Instagram", "Pinterest", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="/"
                  className="text-sm text-ivory/60 hover:text-copper transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerColumns.map((column, columnIndex) => (
              <div
                key={column.title}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${100 + columnIndex * 100}ms` }}
              >
                <h3 className="text-sm text-ivory font-medium mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link: { name: string; href: string }) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-ivory/60 hover:text-copper transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} Crystal Clan. Handmade in Nepal. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <Link
                key={link}
                to="/"
                className="text-xs text-ivory/50 hover:text-copper transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
