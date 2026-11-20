import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { products } from "../data/products";
import { formatPrice } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";

// DESIGN ONLY: hard-coded dummy cart. Replace with the cart store in the logic phase.
const dummyCart = [
  { product: products[0], quantity: 1 },
  { product: products[7], quantity: 2 },
];

export default function Cart() {
  const subtotal = dummyCart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <>
      <PageHeader title="Your cart" subtitle={`${dummyCart.length} items ready for checkout`} />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Items</h2>
            <button className="flex items-center gap-1 text-sm font-semibold text-flame hover:underline">
              <Trash2 size={16} /> Clear cart
            </button>
          </div>

          <ul className="divide-y divide-line rounded-2xl border border-line">
            {dummyCart.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-4 p-4 sm:gap-6 sm:p-5">
                <div className={`h-24 w-24 shrink-0 rounded-xl bg-gradient-to-br sm:h-28 sm:w-28 ${product.tone}`} />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{product.category}</p>
                      <h3 className="font-sans text-base font-semibold normal-case tracking-normal">{product.name}</h3>
                      <p className="text-sm text-ink/60">{formatPrice(product.price)} each</p>
                    </div>
                    <p className="text-lg font-bold">{formatPrice(product.price * quantity)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-line">
                      <button className="p-2 hover:text-flame" aria-label="Decrease quantity">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                      <button className="p-2 hover:text-flame" aria-label="Increase quantity">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="text-sm text-ink/50 hover:text-flame">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link to="/products" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4 hover:text-volt-dark">
            ← Continue shopping
          </Link>
        </section>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl bg-mist p-6 lg:sticky lg:top-24">
          <h2 className="text-3xl font-bold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Shipping</dt>
              <dd className="font-semibold">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-base">
              <dt className="font-bold">Total</dt>
              <dd className="text-xl font-extrabold">{formatPrice(total)}</dd>
            </div>
          </dl>

          <Link
            to="/checkout"
            className="mt-6 block rounded-full bg-ink py-4 text-center font-bold uppercase tracking-wide text-white transition hover:bg-volt hover:text-ink"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </>
  );
}
