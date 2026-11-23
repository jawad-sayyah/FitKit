# FitKit — Fitness Gear Store

A responsive e-commerce website for fitness equipment, apparel, accessories, recovery tools and nutrition.
Built with React + TypeScript. It runs entirely in the browser: no backend, no database, no login, no real payments.

## Features

- **Home**: hero with shop button, product categories, featured products, footer
- **Products**: responsive grid, search by name, category filter, price range filter, sort by price, "no products found" message
- **Cart**: change quantities, remove items, clear cart, subtotal / shipping / total, empty-cart message, continue shopping, proceed to checkout
- **Wishlist**: add/remove with the heart button (no duplicates), move items to the cart, empty message
- **Checkout**: form with validation errors next to each field, blocked when the cart is empty, order confirmation with reference number and summary, cart cleared afterwards (wishlist is kept)
- Cart and wishlist survive a page refresh (saved in `localStorage`)
- Cart and wishlist counts shown in the header
- Shipping rule: free over $75, otherwise $6.99

## Technologies

React 19, TypeScript, React Router, Tailwind CSS 4, Vite, Lucide icons, Vitest + React Testing Library.

## How the code is organised

```
src/
  pages/        Home, Products, Cart, Wishlist, Checkout, NotFound
  components/   layout (Header, Footer...) and ui (ProductCard...)
  providers/    CartContext and WishlistContext (shared state + localStorage)
  utils/        pure helper functions: cart totals, product filtering, checkout validation
  data/         the product list
  __tests__/    automated tests
```

State is shared with React Context. Each context keeps its data in `useState` and saves it to
`localStorage` in a `useEffect`. The cart stores only `{ id, quantity }`; product details are looked up from `data/products.ts`.

## Setup

```bash
pnpm install     # or: npm install
pnpm dev         # start the dev server (http://localhost:9999)
pnpm test        # run the automated tests
pnpm build       # type-check and build for production
```

## Tests

`pnpm test` runs 17 tests covering product filtering/search/sort, adding to the cart,
quantity updates, order calculations, wishlist add/remove, and checkout validation and confirmation.

## Team

<!-- Add team member names and who built which part -->
