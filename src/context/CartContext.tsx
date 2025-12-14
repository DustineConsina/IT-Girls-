import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface CartContextValue {
  cartIds: number[];
  favorites: number[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number) => void;
}

const CART_STORAGE_KEY = "shop_cart_ids";
const FAVORITES_STORAGE_KEY = "shop_favorites_ids";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const readStoredIds = (key: string): number[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is number => typeof value === "number");
  } catch (error) {
    console.error(`Failed to parse stored data for ${key}`, error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartIds, setCartIds] = useState<number[]>(() => readStoredIds(CART_STORAGE_KEY));
  const [favorites, setFavorites] = useState<number[]>(() => readStoredIds(FAVORITES_STORAGE_KEY));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartIds));
  }, [cartIds]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (productId: number) => {
    setCartIds((previous) => [...previous, productId]);
  };

  const removeFromCart = (productId: number) => {
    setCartIds((previous) => previous.filter((id) => id !== productId));
  };

  const clearCart = () => {
    setCartIds([]);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  const value = useMemo(
    () => ({
      cartIds,
      favorites,
      addToCart,
      removeFromCart,
      clearCart,
      toggleFavorite,
    }),
    [cartIds, favorites]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
