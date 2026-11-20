import { products } from "@/data/products";
import { formatPrice } from "@/utils/format";
import PageHeader from "@/components/ui/PageHeader";

// DESIGN ONLY: dummy order lines, no validation, no submit logic.
// Logic phase: Zod schema + inline error messages (shown under each field), block when cart is empty.
const dummyCart = [
  { product: products[0], quantity: 1 },
  { product: products[7], quantity: 2 },
];

interface FieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-ink"
      />
      {/* Logic phase: <p className="mt-1 text-xs text-flame">{errors[name]}</p> */}
    </div>
  );
}

export default function Checkout() {
  const subtotal = dummyCart.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0,
  );

  return (
    <>
      <PageHeader
        title="Checkout"
        subtitle="Enter your delivery details. No real payment is taken."
      />

      <form
        className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]"
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <div className="space-y-8">
          <section className="rounded-2xl border border-line p-6">
            <h2 className="mb-5 text-3xl font-bold">Contact</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="fullName" placeholder="Jane Doe" />
              <Field
                label="Phone"
                name="phone"
                placeholder="+1 555 000 0000"
                type="tel"
              />
              <Field
                label="Email"
                name="email"
                placeholder="jane@example.com"
                type="email"
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-line p-6">
            <h2 className="mb-5 text-3xl font-bold">Delivery address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Street address"
                name="address"
                placeholder="123 Main Street"
                className="sm:col-span-2"
              />
              <Field label="City" name="city" placeholder="City" />
              <Field
                label="Postal code"
                name="postalCode"
                placeholder="12345"
              />
              <Field
                label="Country"
                name="country"
                placeholder="Country"
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-line p-6">
            <h2 className="mb-5 text-3xl font-bold">Payment</h2>
            <p className="rounded-lg bg-mist px-4 py-3 text-sm text-ink/60">
              This is a simulated checkout. No payment details are collected.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-mist p-6 lg:sticky lg:top-24">
          <h2 className="text-3xl font-bold">Your order</h2>
          <ul className="mt-5 space-y-4">
            {dummyCart.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-3">
                <div
                  className={`h-14 w-14 shrink-0 rounded-lg bg-linear-to-br ${product.tone}`}
                />
                <div className="flex-1 text-sm">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-ink/60">Qty {quantity}</p>
                </div>
                <p className="text-sm font-bold">
                  {formatPrice(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink/60">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="font-bold">Total</span>
              <span className="text-xl font-extrabold">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-volt py-4 font-bold uppercase tracking-wide text-ink transition hover:bg-volt-dark"
          >
            Place order
          </button>
        </aside>
      </form>
    </>
  );
}
