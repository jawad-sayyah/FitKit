import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/utils/format";
import {
  emptyForm,
  generateOrderReference,
  ORDER_ANIMATION_MS,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutForm,
} from "@/utils/checkout";
import type { CartLine } from "@/types";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import { useCart } from "@/providers/CartContext";

interface FieldProps {
  label: string;
  name: keyof CheckoutForm;
  value: string;
  error?: string;
  onChange: (name: keyof CheckoutForm, value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

// One labelled input with its error message right underneath
function Field({
  label,
  name,
  value,
  error,
  onChange,
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
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-ink ${
          error ? "border-flame" : "border-line"
        }`}
      />
      {error && <p className="mt-1 text-xs text-flame">{error}</p>}
    </div>
  );
}

// Snapshot of the finished order (the cart is cleared, so we keep a copy)
interface Order {
  reference: string;
  customer: CheckoutForm;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function Checkout() {
  const { lines, subtotal, shipping, total, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  // pendingOrder = valid form submitted, truck animation playing
  // order        = animation finished, show the confirmation
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  // When the animation time is over: show the confirmation and clear the cart
  useEffect(() => {
    if (!pendingOrder) return;
    const timer = setTimeout(() => {
      setOrder(pendingOrder);
      setPendingOrder(null);
      clearCart(); // wishlist is not touched
    }, ORDER_ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [pendingOrder, clearCart]);

  const handleChange = (name: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error of the field the user is fixing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0 || pendingOrder) return; // empty cart or already placing

    const newErrors = validateCheckout(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // invalid: do not submit

    setPendingOrder({
      reference: generateOrderReference(),
      customer: form,
      lines,
      subtotal,
      shipping,
      total,
    });
  };

  // ---- 1. Order confirmation ----
  if (order) {
    return (
      <>
        <PageHeader title="Order confirmed" subtitle="Thank you for your order!" />
        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="rounded-2xl border border-line p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <CheckCircle size={40} className="text-emerald-600" />
              <div>
                <p className="text-sm text-ink/60">Order reference</p>
                <p className="text-2xl font-extrabold tracking-wide">
                  {order.reference}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-ink/60">
              We'll deliver to {order.customer.fullName},{" "}
              {order.customer.address}, {order.customer.city},{" "}
              {order.customer.postalCode}, {order.customer.country}. A
              confirmation was sent to {order.customer.email}.
            </p>

            <ul className="mt-6 divide-y divide-line border-y border-line">
              {order.lines.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-3 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
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

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/60">Subtotal</dt>
                <dd className="font-semibold">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Shipping</dt>
                <dd className="font-semibold">
                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                </dd>
              </div>
              <div className="flex justify-between text-base">
                <dt className="font-bold">Total</dt>
                <dd className="text-xl font-extrabold">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </dl>

            <Link
              to="/products"
              className="mt-8 block rounded-full bg-volt py-4 text-center font-bold uppercase tracking-wide text-ink transition hover:bg-volt-dark"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  // ---- 2. Empty cart: no checkout ----
  if (lines.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" />
        <div className="px-4 py-16">
          <EmptyState
            icon={<ShoppingBag size={48} />}
            title="Your cart is empty"
            message="Add something to your cart before checking out."
            ctaLabel="Browse products"
            ctaTo="/products"
          />
        </div>
      </>
    );
  }

  // ---- 3. Checkout form ----
  const fieldProps = (name: keyof CheckoutForm) => ({
    name,
    value: form[name],
    error: errors[name],
    onChange: handleChange,
  });

  return (
    <>
      <PageHeader
        title="Checkout"
        subtitle="Enter your delivery details. No real payment is taken."
      />

      <form
        className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="space-y-8">
          <section className="rounded-2xl border border-line p-6">
            <h2 className="mb-5 text-3xl font-bold">Contact</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" placeholder="Jane Doe" {...fieldProps("fullName")} />
              <Field label="Phone" type="tel" placeholder="+1 555 000 0000" {...fieldProps("phone")} />
              <Field label="Email" type="email" placeholder="jane@example.com" className="sm:col-span-2" {...fieldProps("email")} />
            </div>
          </section>

          <section className="rounded-2xl border border-line p-6">
            <h2 className="mb-5 text-3xl font-bold">Delivery address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Street address" placeholder="123 Main Street" className="sm:col-span-2" {...fieldProps("address")} />
              <Field label="City" placeholder="City" {...fieldProps("city")} />
              <Field label="Postal code" placeholder="12345" {...fieldProps("postalCode")} />
              <Field label="Country" placeholder="Country" className="sm:col-span-2" {...fieldProps("country")} />
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
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-3">
                <img
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  src={product.image}
                  alt={product.name}
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

          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Shipping</dt>
              <dd className="font-semibold">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between text-base">
              <dt className="font-bold">Total</dt>
              <dd className="text-xl font-extrabold">{formatPrice(total)}</dd>
            </div>
          </dl>

          <CheckoutButton animating={pendingOrder !== null} />
        </aside>
      </form>
    </>
  );
}
