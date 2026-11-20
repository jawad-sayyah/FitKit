import { SlidersHorizontal } from "lucide-react";
import { categories, products } from "../data/products";
import PageHeader from "../components/ui/PageHeader";
import ProductCard from "../components/ui/ProductCard";

/**
 * DESIGN ONLY: the filters below are visual placeholders and the grid shows
 * every product. Search, category/price filters and sorting get wired up in
 * the logic phase (see TODO comments).
 */
export default function Products() {
  return (
    <>
      <PageHeader title="Shop all" subtitle="Everything you need to train, recover and perform." />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[260px_1fr]">
        {/* Filters sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2 font-display text-2xl font-bold uppercase">
            <SlidersHorizontal size={20} /> Filters
          </div>

          {/* TODO: search by name */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider">Search</h3>
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>

          {/* TODO: filter by category */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider">Category</h3>
            <ul className="space-y-2">
              <li>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input type="radio" name="category" defaultChecked className="accent-ink" /> All
                </label>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input type="radio" name="category" className="accent-ink" /> {c.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* TODO: filter by price range */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider">Price range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
              />
              <span className="text-ink/40">–</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
              />
            </div>
          </div>

          <button className="w-full rounded-lg border border-ink py-2.5 text-sm font-semibold hover:bg-ink hover:text-white">
            Reset filters
          </button>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/60">
              Showing <span className="font-semibold text-ink">{products.length}</span> products
            </p>
            {/* TODO: sort by price */}
            <select className="rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-ink">
              <option>Sort: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* TODO: render when no products match, e.g. <p>No products found</p> */}
        </section>
      </div>
    </>
  );
}
