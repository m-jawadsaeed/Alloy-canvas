import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SITE_CONTENT } from "../../data/content";
import { Marquee } from "../shared/Marquee";
import { Logo } from "./Navbar";

const footerLinks = {
  Menu: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Why Buggcy", href: "/why-buggcy" },
  ],
  More: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      {/* big marquee band */}
      <div className="border-y border-blue-100 py-10 sm:py-14">
        <Marquee duration={32}>
          {["Let's Talk", "Let's Talk", "Let's Talk", "Let's Talk", "Let's Talk"].map((t, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              <span className="font-display text-5xl font-medium tracking-tight text-blue-950/15 sm:text-7xl lg:text-8xl">
                {t}
              </span>
              <span className="text-3xl text-blue-400 sm:text-5xl">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-blue-950/55">
              {SITE_CONTENT.company.description}
            </p>
            <a
              href={`mailto:${SITE_CONTENT.contact.email}`}
              className="link-underline mt-6 inline-block font-display text-xl font-medium text-blue-950"
            >
              {SITE_CONTENT.contact.email}
            </a>
            <p className="mt-3 text-sm text-blue-950/50">{SITE_CONTENT.company.location}</p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:justify-items-end">
            {Object.entries(footerLinks).map(([cat, links]) => (
              <div key={cat}>
                <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  {cat}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-blue-950/70 transition-colors hover:text-blue-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Social
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Facebook", href: SITE_CONTENT.contact.social.facebook },
                  { label: "Instagram", href: SITE_CONTENT.contact.social.instagram },
                  { label: "LinkedIn", href: SITE_CONTENT.contact.social.linkedin },
                  { label: "Twitter", href: SITE_CONTENT.contact.social.twitter },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-950/70 transition-colors hover:text-blue-600"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-blue-100 pt-8 sm:flex-row"
        >
          <p className="text-sm text-blue-950/40">
            ©{new Date().getFullYear()} All Rights Reserved By buggcy
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-sm text-blue-950/40 transition-colors hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-sm text-blue-950/40 transition-colors hover:text-blue-600">
              Terms &amp; Conditions
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
