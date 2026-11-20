import { Link } from "react-router-dom";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/products" },
      { label: "Equipment", to: "/products?category=equipment" },
      { label: "Apparel", to: "/products?category=apparel" },
      { label: "Accessories", to: "/products?category=accessories" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & Delivery", to: "/" },
      { label: "Returns", to: "/" },
      { label: "Size Guide", to: "/" },
      { label: "Contact Us", to: "/" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Wishlist", to: "/wishlist" },
      { label: "Cart", to: "/cart" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-4xl font-extrabold uppercase">
            Fit<span className="text-volt">Kit</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Gear built for the grind. Equipment, apparel and accessories to help you train harder and recover
            smarter.
          </p>
          <form className="mt-6 flex max-w-sm overflow-hidden rounded-full bg-white/10" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Join the newsletter"
              className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/50"
            />
            <button className="bg-volt px-5 text-sm font-bold uppercase text-ink hover:bg-volt-dark">Join</button>
          </form>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-lg font-bold tracking-wide text-volt">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 FitKit. Student project, no real payments are processed.
      </div>
    </footer>
  );
}
