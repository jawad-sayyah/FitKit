import { products } from "@/data/products";
import type { CartItem, CartLine } from "@/types";

export const FREE_SHIPPING_OVER = 75;
export const SHIPPING_FEE = 6.99;

// Join cart items with product data. Unknown product ids are skipped.
export function getCartLines(cart: CartItem[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of cart) {
    const product = products.find((p) => p.id === item.id);
    if (product) lines.push({ product, quantity: item.quantity });
  }
  return lines;
}

// All the numbers the Cart and Checkout pages need, in one place.
export function getCartSummary(lines: CartLine[]) {
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const shipping = subtotal === 0 || subtotal > FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  return { itemCount, subtotal, shipping, total: subtotal + shipping };
}
