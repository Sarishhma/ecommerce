import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

export function FooterSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const navLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/story", label: "Our Story" },
    { to: "/help", label: "Help" },
  ];

  const socials = [
    {
      href: "https://facebook.com/bijeshworimalatraders",
      label: "Facebook",
      Icon: Facebook,
    },
    {
      href: "https://instagram.com/bijeshworimalatraders",
      label: "Instagram",
      Icon: Instagram,
    },
    {
      href: "mailto:hello@bijeshworimala.com",
      label: "Email",
      Icon: Mail,
    },
  ];

  const contacts = [
    {
      href: "mailto:hello@bijeshworimala.com",
      label: "hello@bijeshworimala.com",
      Icon: Mail,
    },
    {
      href: "tel:+9779800000000",
      label: "+977 98-0000-0000",
      Icon: Phone,
    },
    {
      href: "https://maps.google.com/?q=Kathmandu,Nepal",
      label: "Kathmandu, Nepal",
      Icon: MapPin,
      external: true,
    },
  ];

  return (
    <footer
      ref={ref}
      className="relative bg-charcoal text-ivory overflow-hidden"
    >
      {/* Subtle warm radial glow — adds depth without noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(184,134,11,0.10) 0%, transparent 55%)",
        }}
      />

      {/* Thin gold top edge — signature detail */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Top grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <Link
                to="/"
                className="inline-block font-display text-2xl font-medium tracking-tight text-gold transition-opacity hover:opacity-80"
              >
                Bijeshwori Mala Traders
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
                Authentic Nepalese craftsmanship, handmade with care.
              </p>

              {/* Socials */}
              <div className="mt-7 flex items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:bg-gold/5"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div className="md:col-span-3">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold/80">
                Explore
              </h3>
              <nav className="mt-5 flex flex-col gap-3.5">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="group relative w-fit text-sm text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold/80">
                Get in touch
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {contacts.map(({ href, label, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 text-sm text-ivory/70 transition-colors duration-300 hover:text-gold"
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-gold/60 transition-colors duration-300 group-hover:text-gold"
                        strokeWidth={1.75}
                      />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-6 sm:flex-row">
            <p className="text-[11px] tracking-wide text-ivory/40">
              © {new Date().getFullYear()} Bijeshwori Mala Traders. All rights
              reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-[11px] tracking-wide text-ivory/40 transition-colors hover:text-gold"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-[11px] tracking-wide text-ivory/40 transition-colors hover:text-gold"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}