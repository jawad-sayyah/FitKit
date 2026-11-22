
import { useEffect, useRef, useState } from "react";
import "./CheckoutButton.css";

interface CheckoutButtonProps {
  onClick?: () => void;
}

export default function CheckoutButton({
  onClick,
}: CheckoutButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleOrderClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    onClick?.();

    timerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 10000);
  };

  return (
    <button
      type="submit"
      onClick={handleOrderClick}
      disabled={isAnimating}
      className={`order mt-6 w-full rounded-full bg-volt py-4 font-bold uppercase tracking-wide text-ink transition hover:bg-volt-dark cursor-pointer ${
        isAnimating ? "animate" : ""
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
