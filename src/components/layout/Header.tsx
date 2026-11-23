import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useWishlist } from "@/providers/WishlistContext";
import { useCart } from "@/providers/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop All" },
  { to: "/products?category=equipment", label: "Equipment" },
  { to: "/products?category=apparel", label: "Apparel" },
  { to: "/products?category=accessories", label: "Accessories" },
];

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
  const { wishlist } = useWishlist();
  const { itemCount } = useCart();

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

        <div className="ml-auto flex items-center gap-5">
          <Link to="/wishlist" className="relative" aria-label="Wishlist">
            <Heart size={22} />
            <CountBadge count={wishlist.length} tone="bg-flame text-white" />
          </Link>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag size={22} />
            <CountBadge count={itemCount} tone="bg-volt text-ink" />
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
