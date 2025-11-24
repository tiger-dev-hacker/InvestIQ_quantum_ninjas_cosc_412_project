'use client';

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCommand from "@/components/SearchCommand";

const NavItems = ({ initialStocks }: { initialStocks: StockWithWatchlistStatus[] }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const basePill =
    "px-4 py-1.5 rounded-full text-sm font-medium";
  const activePill =
    "bg-slate-800/80 text-slate-50 shadow-sm border border-slate-700/80";
  const inactivePill =
    "text-slate-300 hover:text-slate-50 hover:bg-slate-800/40 transition-colors";

  return (
    <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
      {NAV_ITEMS.map(({ href, label }) => {
        // Special case: Search uses the command palette
        if (href === "/search") {
          const active = isActive(href);

          return (
            <li key="search-trigger">
              <div className={`${basePill} ${active ? activePill : inactivePill}`}>
                <SearchCommand
                  renderAs="text"
                  label={label}
                  initialStocks={initialStocks}
                />
              </div>
            </li>
          );
        }

        // Normal links (Dashboard, Watchlist, etc.)
        const active = isActive(href);

        return (
          <li key={href}>
            <Link
              href={href}
              className={`${basePill} ${active ? activePill : inactivePill}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
