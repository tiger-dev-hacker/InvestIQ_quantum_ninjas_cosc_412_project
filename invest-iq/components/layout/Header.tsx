"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/transactions", label: "My Transactions" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">
            InvestIQ
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">
            Quantum Ninjas
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "transition-colors " +
                  (active
                    ? "text-emerald-400"
                    : "text-neutral-400 hover:text-emerald-300")
                }
              >
                {link.label}
              </Link>
            );
          })}

          {/* Auth placeholder */}
        </nav>
      </div>
    </header>
  );
}
