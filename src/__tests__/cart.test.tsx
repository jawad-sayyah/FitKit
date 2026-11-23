import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import { renderWithProviders } from "@/test-utils";

// Shows both pages at once so we can see the cart react to the product list
function Both() {
  return (
    <>
      <Products />
      <Cart />
    </>
  );
}

// TEST 2: Shopping cart
describe("Shopping cart", () => {
  it("adding a product updates the cart", async () => {
    renderWithProviders(<Both />);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();

    const card = screen
      .getByText("Kettlebell 16kg", { selector: "h3" })
      .closest("article")!;
    await userEvent.click(
      within(card).getByRole("button", { name: "Add to Cart" }),
    );

    expect(screen.queryByText("Your cart is empty.")).not.toBeInTheDocument();
    expect(screen.getByText("$59.00 each")).toBeInTheDocument();
    expect(localStorage.getItem("cart")).toBe('[{"id":4,"quantity":1}]');
  });

  it("increases, decreases and removes quantities", async () => {
    localStorage.setItem("cart", JSON.stringify([{ id: 4, quantity: 1 }]));
    renderWithProviders(<Cart />);

    await userEvent.click(
      screen.getByRole("button", { name: "Increase quantity" }),
    );
    expect(screen.getByText("2")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Decrease quantity" }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Decrease quantity" }),
    );
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("cart is restored after a refresh (localStorage)", () => {
    localStorage.setItem("cart", JSON.stringify([{ id: 4, quantity: 3 }]));
    renderWithProviders(<Cart />);

    expect(screen.getByText("Kettlebell 16kg")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
/*
getBy vs queryBy vs findBy (important)
Method	If not found	Use for
getBy…	throws an error	"this must exist"
queryBy…	returns null	"this must NOT exist"
findBy…	waits up to 1s, then throws	things that appear later (async)

That's why we use queryBy with .not.toBeInTheDocument(). getBy would throw before the expect ran.

toBeInTheDocument() isn't built into Vitest. It comes from jest-dom, which test-setup.ts loads.
*/
