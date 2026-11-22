import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useFavorites } from "@/providers/FavoritesContext";
import { useCart } from "@/providers/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop All" },
  { to: "/products?category=equipment", label: "Equipment" },
  { to: "/products?category=apparel", label: "Apparel" },
  { to: "/products?category=accessories", label: "Accessories" },
];

// TODO (logic phase): replace these dummy counts with the cart / wishlist store.

function CountBadge({ count, tone }: { count: number; tone: string }) {
  if (count === 0) return null;
  return (
    <span
      className={`absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold ${tone}`}
    >
      {count}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const CART_COUNT = cart.length;
  const WISHLIST_COUNT = favorites.length;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <button
          className="rounded p-2 hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          to="/"
          className="font-display text-3xl font-extrabold uppercase tracking-tight"
        >
          Fit<span className="text-volt">Kit</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              className="text-sm font-medium text-white/70 transition hover:text-volt"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* <div className="ml-auto hidden w-64 items-center gap-2 rounded-full bg-white/10 px-4 py-2 md:flex">
          <Search size={16} className="text-white/60" />
          <input
            type="text"
            placeholder="Search gear..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
          />
        </div> */}

        <div className="ml-auto flex items-center gap-5">
          <Link to="/wishlist" className="relative" aria-label="Wishlist">
            <Heart size={22} />
            <CountBadge count={WISHLIST_COUNT} tone="bg-flame text-white" />
          </Link>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag size={22} />
            <CountBadge count={CART_COUNT} tone="bg-volt text-ink" />
          </Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-charcoal px-4 py-3 lg:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-white/80 hover:text-volt"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
