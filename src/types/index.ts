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
  imge: string; // tailwind bg classes used for placeholder visuals
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
  quantity: number;
  badge?: "New" | "Sale" | "Best Seller";
  imge: string; // tailwind gradient classes used for the placeholder image
}

export interface CartItem {
  product: Product;
  quantity: number;
}
