import Link from "next/link";
import { Home, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { href: "/explore", label: "Find PG" },
    { href: "/about", label: "About Us" },
  ],
  Support: [
    { href: "/auth", label: "Sign In" },
    { href: "/explore", label: "Browse Listings" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-foreground">
                Gharpayy
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Smarter PG matching for Bangalore. Find verified paying guest
              accommodations near your workplace or college.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span>Bangalore, Karnataka</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={14} />
            <span>hello@gharpayy.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone size={14} />
            <span>+91 90000 00000</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gharpayy. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
