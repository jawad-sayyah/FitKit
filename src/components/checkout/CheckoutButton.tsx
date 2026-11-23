import "./CheckoutButton.css";

interface CheckoutButtonProps {
  /** true = play the truck animation (the parent sets this after the form is valid) */
  animating: boolean;
}

// A submit button. It does no logic of its own:
// the Checkout page validates the form, then sets `animating` to true.
export default function CheckoutButton({ animating }: CheckoutButtonProps) {
  return (
    <button
      type="submit"
      disabled={animating} // block double clicks while the truck drives
      className={`order mt-6 w-full cursor-pointer rounded-full bg-volt py-4 font-bold uppercase tracking-wide text-ink transition hover:bg-volt-dark ${
        animating ? "animate" : ""
      }`}
    >
      <span className="default">Complete Order</span>

      <span className="success">
        Order Placed
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>

      <div className="box"></div>

      <div className="truck">
        <div className="back"></div>
        <div className="front">
          <div className="window"></div>
        </div>
        <div className="light top"></div>
        <div className="light bottom"></div>
      </div>

      <div className="road">
        <div className="road-lines"></div>
      </div>

      <div className="lines"></div>
    </button>
  );
}
