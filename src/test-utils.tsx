import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "@/providers/CartContext";
import { WishlistProvider } from "@/providers/WishlistContext";

// Render a component with the router and both providers, like the real app
export function renderWithProviders(ui: ReactElement, route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <WishlistProvider>
        <CartProvider>{ui}</CartProvider>
      </WishlistProvider>
    </MemoryRouter>,
  );
}
