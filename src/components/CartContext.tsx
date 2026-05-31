"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/lib/types";
import {
  CartItem,
  loadCart,
  saveCart,
  cartCount,
  cartTotal,
  lineKey,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product, quantity?: number, size?: string) => void;
  remove: (productId: string, size?: string) => void;
  setQty: (productId: string, quantity: number, size?: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on mount. localStorage isn't available during SSR, so
  // hydration has to happen in an effect after the first client render.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Persist whenever the cart changes (after initial hydration).
  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const add = useCallback(
    (product: Product, quantity: number = 1, size?: string) => {
      setItems((prev) => {
        const key = lineKey(product.id, size);
        const existing = prev.find(
          (i) => lineKey(i.product.id, i.size) === key
        );
        if (existing) {
          return prev.map((i) =>
            lineKey(i.product.id, i.size) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { product, quantity, size }];
      });
    },
    []
  );

  const remove = useCallback((productId: string, size?: string) => {
    const key = lineKey(productId, size);
    setItems((prev) =>
      prev.filter((i) => lineKey(i.product.id, i.size) !== key)
    );
  }, []);

  const setQty = useCallback(
    (productId: string, quantity: number, size?: string) => {
      const key = lineKey(productId, size);
      setItems((prev) =>
        prev
          .map((i) =>
            lineKey(i.product.id, i.size) === key
              ? { ...i, quantity: Math.max(1, quantity || 1) }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: cartCount(items),
      total: cartTotal(items),
      add,
      remove,
      setQty,
      clear,
    }),
    [items, add, remove, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart, CartProvider içinde kullanılmalıdır.");
  }
  return ctx;
}
