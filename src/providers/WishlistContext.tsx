import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const KEY = "wishlist";

interface WishlistContextType {
  wishlist: number[]; // product ids
  isInWishlist: (id: number) => boolean;
  toggleWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

function readWishlist(): number[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) && parsed.every((id) => typeof id === "number")
      ? parsed
      : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>(readWishlist);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (id: number) => wishlist.includes(id);

  // Add if missing, remove if present, so duplicates are impossible
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
