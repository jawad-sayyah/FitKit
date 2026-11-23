import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkout from "@/pages/Checkout";
import { renderWithProviders } from "@/test-utils";

function fill(label: string, value: string) {
  return userEvent.type(screen.getByLabelText(label), value);
}

// TEST 3: Checkout validation
describe("Checkout", () => {
  it("shows validation errors next to the fields for an invalid form", async () => {
    localStorage.setItem("cart", JSON.stringify([{ id: 4, quantity: 1 }]));
    renderWithProviders(<Checkout />);

    await userEvent.click(
      screen.getByRole("button", { name: /complete order/i }),
    );

    expect(screen.getByText("Full name is required.")).toBeInTheDocument();
    expect(screen.getByText("Phone is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Country is required.")).toBeInTheDocument();
    // The form was not submitted: still on the form, cart untouched
    expect(screen.queryByText("Order confirmed")).not.toBeInTheDocument();
    expect(localStorage.getItem("cart")).toContain('"id":4');
  });

  it("rejects an invalid email", async () => {
    localStorage.setItem("cart", JSON.stringify([{ id: 4, quantity: 1 }]));
    renderWithProviders(<Checkout />);

    await fill("Email", "not-an-email");
    await userEvent.click(
      screen.getByRole("button", { name: /complete order/i }),
    );

    expect(
      screen.getByText("Enter a valid email address."),
    ).toBeInTheDocument();
  });

  it("does not allow checkout with an empty cart", () => {
    renderWithProviders(<Checkout />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /complete order/i }),
    ).not.toBeInTheDocument();
  });
});
