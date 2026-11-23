import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import type { CartItem, CartLine } from "@/types";
import { getCartLines, getCartSummary } from "@/utils/cart";

const KEY = "cart";

interface CartContextType {
  cart: CartItem[];
  lines: CartLine[]; // cart items joined with product data
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  getQuantity: (id: number) => number;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

// Read the saved cart. Ignore anything that is broken or no longer a real product.
function readCart(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.id === "number" &&
        typeof item?.quantity === "number" &&
        item.quantity > 0 &&
        products.some((p) => p.id === item.id),
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart);

  // Save to localStorage every time the cart changes
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(cart));
  }, [cart]);

  const lines = getCartLines(cart);
  const summary = getCartSummary(lines);

  const getQuantity = (id: number) =>
    cart.find((item) => item.id === id)?.quantity ?? 0;

  const addToCart = (id: number) => {
    setCart((prev) =>
      prev.some((item) => item.id === id)
        ? prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...prev, { id, quantity: 1 }],
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        lines,
        ...summary,
        getQuantity,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
