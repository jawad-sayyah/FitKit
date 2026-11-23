import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WishlistProvider } from "./providers/WishlistContext.tsx";
import { CartProvider } from "./providers/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>,
);
