import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "@/pages/Products";
import { renderWithProviders } from "@/test-utils";

// TEST 1: Product filtering
describe("Product filtering", () => {
  it("search shows only matching products", async () => {
    renderWithProviders(<Products />);
    await userEvent.type(screen.getByLabelText("Search products"), "yoga");

    expect(screen.getByText("Premium Yoga Mat 6mm")).toBeInTheDocument();
    expect(screen.queryByText("Kettlebell 16kg")).not.toBeInTheDocument();
  });

  it("category filter shows only that category", () => {
    renderWithProviders(<Products />, "/products?category=nutrition");

    expect(screen.getByText("Whey Protein 2kg")).toBeInTheDocument();
    expect(screen.queryByText("Kettlebell 16kg")).not.toBeInTheDocument();
  });

  it("shows a message when nothing matches", async () => {
    renderWithProviders(<Products />);
    await userEvent.type(screen.getByLabelText("Search products"), "zzzzz");

    expect(screen.getByText("No products found")).toBeInTheDocument();
  });
});
