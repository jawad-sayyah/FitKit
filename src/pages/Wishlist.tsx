import { Heart } from "lucide-react";
import { products } from "@/data/products";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";

// DESIGN ONLY: dummy saved items. Replace with the wishlist store in the logic phase.
const dummyWishlist = [products[2], products[9], products[12]];

export default function Wishlist() {
  return (
    <>
      <PageHeader
        title="Wishlist"
        subtitle="Your saved gear, all in one place."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        {dummyWishlist.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {dummyWishlist.map((p) => (
              <ProductCard key={p.id} product={p} isWishlisted />
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
