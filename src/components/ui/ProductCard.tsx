import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { useWishlist } from "@/providers/WishlistContext";
import { useCart } from "@/providers/CartContext";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-volt text-ink",
  Sale: "bg-flame text-white",
  "Best Seller": "bg-ink text-white",
};

// Stock level styling: green in stock, amber low stock, red out of stock
function getStockStyles(stock: number) {
  if (stock <= 0) {
    return { className: "bg-red-600 text-white", label: "Out of stock" };
  }
  if (stock <= 10) {
    return { className: "bg-amber-500 text-ink", label: `${stock} left` };
  }
  return { className: "bg-emerald-600 text-white", label: `${stock} in stock` };
}

export default function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, getQuantity, updateQuantity } = useCart();

  const quantity = getQuantity(product.id);
  const inWishlist = isInWishlist(product.id);
  const stockStyles = getStockStyles(product.stock);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-110"
        />

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={inWishlist}
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white"
        >
          <Heart
            size={18}
            className={inWishlist ? "fill-flame text-flame" : ""}
          />
        </button>

        {/* Diagonal stock tape, bottom-right corner */}
        <span
          className={`pointer-events-none absolute -right-10 bottom-6 z-10 -rotate-45 px-12 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-md ${stockStyles.className}`}
        >
          {stockStyles.label}
        </span>
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
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-ink/40 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {quantity > 0 ? (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-line">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label="Decrease quantity"
              className="flex flex-1 cursor-pointer items-center justify-center py-2.5 transition hover:text-flame"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center text-sm font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Increase quantity"
              disabled={quantity >= product.stock}
              className="flex flex-1 cursor-pointer items-center justify-center py-2.5 transition hover:text-flame disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product.id)}
            disabled={product.stock <= 0}
            className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-sm font-semibold text-white transition hover:bg-volt hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink disabled:hover:text-white"
          >
            <ShoppingBag size={16} />
            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        )}
      </div>
    </article>
  );
}
