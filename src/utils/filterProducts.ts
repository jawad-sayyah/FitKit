import type { Product } from "@/types";

export type SortKey = "featured" | "price-asc" | "price-desc";

export interface Filters {
  search: string;
  category: string; // "all" or a category id
  minPrice: string; // empty string = no limit
  maxPrice: string;
  sort: SortKey;
}

export function filterProducts(list: Product[], f: Filters): Product[] {
  const q = f.search.trim().toLowerCase();
  const min = f.minPrice === "" ? 0 : Number(f.minPrice);
  const max = f.maxPrice === "" ? Infinity : Number(f.maxPrice);

  const result = list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) &&
      (f.category === "all" || p.category === f.category) &&
      p.price >= min &&
      p.price <= max,
  );

  if (f.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}
