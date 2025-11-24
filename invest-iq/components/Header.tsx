import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header
      className="
        sticky top-0 z-40 w-full
        border-b border-slate-800/60
        bg-[#020617]
      "
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.svg"
            alt="InvestIQ logo"
            width={160}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>

        {/* User dropdown on the right */}
        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;
