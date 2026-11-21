import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { useFavorites } from "@/providers/FavoritesContext";
interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-volt text-ink",
  Sale: "bg-flame text-white",
  "Best Seller": "bg-ink text-white",
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:shadow-xl">
      <div
        className={`relative aspect-square overflow-hidden bg-linear-to-br ${product.tone}`}
      >
        {/* Placeholder visual; swap for <img src={product.image} /> later */}
        <span className="absolute inset-0 flex items-center justify-center font-display text-6xl font-extrabold uppercase text-white/25 transition group-hover:scale-110">
          {product.category}
        </span>

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white"
        >
          <Heart
            size={18}
            className={isFavorite(product.id) ? "fill-flame text-flame" : ""}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
          {product.category}
        </p>
        <h3 className="mt-1 font-sans text-base font-semibold normal-case leading-snug tracking-normal">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-ink/60">
          <Star size={14} className="fill-volt-dark text-volt-dark" />
          <span className="font-semibold text-ink">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-ink/40 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart?.(product)}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-sm font-semibold text-white transition hover:bg-volt hover:text-ink"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
