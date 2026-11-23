export type CategoryId =
  | "equipment"
  | "apparel"
  | "accessories"
  | "recovery"
  | "nutrition";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: CategoryId;
  rating: number;
  reviews: number;
  stock: number;
  badge?: "New" | "Sale" | "Best Seller";
  image: string;
}

// What we store in the cart: only the product id and how many.
// Full product data is looked up from the products list when needed.
export interface CartItem {
  id: number;
  quantity: number;
}

// A cart item joined with its product data (used by Cart + Checkout pages)
export interface CartLine {
  product: Product;
  quantity: number;
}
