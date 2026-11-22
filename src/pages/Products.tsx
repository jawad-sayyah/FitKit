import { useMemo, useState } from "react";
import { SlidersHorizontal, ChevronDown, Search } from "lucide-react";
import { categories, products } from "@/data/products";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import { useSearchParams } from "react-router-dom";

type SortKey = "featured" | "price-asc" | "price-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const category = searchParams.get("category") ?? "all";

  const setCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const min = minPrice === "" ? -Infinity : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    const list = products.filter((p) => {
      const matchesSearch = q === "" || p.name.toLowerCase().includes(q);
      const matchesCategory = category === "all" || p.category === category;
      const matchesPrice = p.price >= min && p.price <= max;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [search, category, minPrice, maxPrice, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");
  };

  const selectedSort = sortOptions.find((option) => option.value === sort);

  return (
    <>
      <PageHeader
        title="Shop all"
        subtitle="Everything you need to train, recover and perform."
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[260px_1fr]">
        {/* Filters sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2 font-display text-2xl font-bold uppercase">
            <SlidersHorizontal size={20} /> Filters
          </div>

          {/* Search by name */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider">Search</h3>
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-ink"
              />
            </div>
          </div>

          {/* Filter by category */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider">Category</h3>
            <ul className="space-y-2">
              <li>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="category"
                    checked={category === "all"}
                    onChange={() => setCategory("all")}
                    className="accent-ink"
                  />
                  All
                </label>
              </li>

              {categories.map((c) => (
                <li key={c.id}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="radio"
                      name="category"
                      checked={category === c.id}
                      onChange={() => setCategory(c.id)}
                      className="accent-ink"
                    />
                    {c.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter by price range */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider">
              Price range
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
              />
              <span className="text-ink/40">–</span>
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
              />
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full rounded-lg border border-ink py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-white"
          >
            Reset filters
          </button>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/60">
              Showing{" "}
              <span className="font-semibold text-ink">{filtered.length}</span>{" "}
              product{filtered.length === 1 ? "" : "s"}
            </p>

            {/* Custom sort dropdown */}
            <div className="relative w-52">
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                aria-expanded={sortOpen}
                className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5 text-sm font-semibold transition ${
                  sortOpen ? "border-ink" : "border-line hover:border-ink"
                }`}
              >
                <span>{selectedSort?.label}</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-lg border border-line bg-white p-1.5 shadow-xl">
                  <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">
                    Sort products
                  </p>

                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSort(option.value);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                        sort === option.value
                          ? "bg-volt font-bold text-ink"
                          : "text-ink/70 hover:bg-mist hover:text-ink"
                      }`}
                    >
                      {option.label}

                      {sort === option.value && (
                        <span className="font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-line py-16 text-center">
              <p className="font-display text-xl font-bold uppercase">
                No products found
              </p>
              <p className="mt-2 text-sm text-ink/60">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-lg border border-ink px-5 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-white"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
