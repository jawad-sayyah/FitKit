import { Heart } from "lucide-react";
import { products } from "@/data/products";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import { useWishlist } from "@/providers/WishlistContext";

export default function Wishlist() {
  const { isInWishlist } = useWishlist();
  const savedProducts = products.filter((p) => isInWishlist(p.id));

  return (
    <>
      <PageHeader
        title="Wishlist"
        subtitle="Your saved gear, all in one place."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Heart size={48} />}
            title="No saved items yet"
            message="Tap the heart on any product to save it for later."
            ctaLabel="Browse products"
            ctaTo="/products"
          />
        )}
      </div>
    </>
  );
}
