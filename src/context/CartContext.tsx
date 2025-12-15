import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "../data/products";

export type OrderStatus =
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface OrderAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  contactNumber: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  reference: string;
  placedAt: string;
  eta?: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  trackingNumber?: string;
  address: OrderAddress;
  items: OrderItem[];
  events: OrderEvent[];
}

export interface PlaceOrderPayload {
  items: OrderItem[];
  shipping?: number;
  taxRate?: number;
  tax?: number;
  paymentMethod: string;
  address: OrderAddress;
  eta?: string;
  note?: string;
  trackingNumber?: string;
}

interface CartContextValue {
  cartIds: number[];
  favorites: number[];
  orders: Order[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  removeAllFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number) => void;
  placeOrder: (payload: PlaceOrderPayload) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
}

const CART_STORAGE_KEY = "shop_cart_ids";
const FAVORITES_STORAGE_KEY = "shop_favorites_ids";
const ORDERS_STORAGE_KEY = "shop_orders";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const createSampleOrderItems = (entries: Array<{ id: number; quantity: number }>): OrderItem[] => {
  return entries
    .map((entry) => {
      const product = getProductById(entry.id);
      if (!product) {
        return null;
      }

      return {
        productId: entry.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: entry.quantity,
      };
    })
    .filter((item): item is OrderItem => item !== null);
};

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

const readStoredOrders = (key: string): Order[] => {
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

    return parsed.filter((order): order is Order => {
      if (!order || typeof order !== "object") {
        return false;
      }
      return Array.isArray((order as Order).items);
    });
  } catch (error) {
    console.error(`Failed to parse stored orders for ${key}`, error);
    return [];
  }
};

const sampleOrders: Order[] = [
  {
    id: "ord-FT-231201",
    reference: "FT-231201",
    placedAt: "2025-12-04T14:30:00Z",
    eta: "2025-12-11",
    status: "shipped",
    subtotal: 527,
    shipping: 12,
    tax: 63.24,
    total: 602.24,
    paymentMethod: "Visa •••• 4242",
    trackingNumber: "TRK-84723910",
    address: {
      fullName: "Mia Bennett",
      line1: "123 Waverly Ave",
      line2: "Brgy. Bagong Pag-asa",
      city: "Quezon City",
      region: "Metro Manila",
      postalCode: "1105",
      country: "Philippines",
      contactNumber: "+63 917 555 2103",
    },
    items: createSampleOrderItems([
      { id: 2, quantity: 1 },
      { id: 5, quantity: 1 },
    ]),
    events: [
      { status: "processing", timestamp: "2025-12-04T14:30:00Z", note: "Order received" },
      { status: "packed", timestamp: "2025-12-05T07:10:00Z", note: "QC passed and packed" },
      { status: "shipped", timestamp: "2025-12-05T19:45:00Z", note: "Handed off to SkyExpress" },
    ],
  },
  {
    id: "ord-FT-231198",
    reference: "FT-231198",
    placedAt: "2025-12-03T06:45:00Z",
    eta: "2025-12-09",
    status: "out_for_delivery",
    subtotal: 2052,
    shipping: 18,
    tax: 246.24,
    total: 2316.24,
    paymentMethod: "GCash •••• 0891",
    trackingNumber: "TRK-84723881",
    address: {
      fullName: "Rafael Cortez",
      line1: "56 Laurel Street",
      line2: "Arca Towers",
      city: "Makati City",
      region: "Metro Manila",
      postalCode: "1223",
      country: "Philippines",
      contactNumber: "+63 915 442 1180",
    },
    items: createSampleOrderItems([
      { id: 21, quantity: 1 },
      { id: 7, quantity: 1 },
    ]),
    events: [
      { status: "processing", timestamp: "2025-12-03T06:45:00Z", note: "Order received" },
      { status: "packed", timestamp: "2025-12-03T19:20:00Z", note: "Packed and sealed" },
      { status: "shipped", timestamp: "2025-12-04T08:05:00Z", note: "Dispatched from fulfillment hub" },
      { status: "out_for_delivery", timestamp: "2025-12-05T06:30:00Z", note: "Courier en route" },
    ],
  },
  {
    id: "ord-FT-231170",
    reference: "FT-231170",
    placedAt: "2025-11-24T12:20:00Z",
    eta: "2025-11-29",
    status: "delivered",
    subtotal: 727,
    shipping: 10,
    tax: 87.24,
    total: 824.24,
    paymentMethod: "Mastercard •••• 3016",
    trackingNumber: "TRK-84721007",
    address: {
      fullName: "Luna Mercado",
      line1: "19 Brookstone Lane",
      line2: "",
      city: "Taguig City",
      region: "Metro Manila",
      postalCode: "1634",
      country: "Philippines",
      contactNumber: "+63 927 882 6612",
    },
    items: createSampleOrderItems([
      { id: 8, quantity: 1 },
      { id: 3, quantity: 1 },
    ]),
    events: [
      { status: "processing", timestamp: "2025-11-24T12:20:00Z", note: "Order received" },
      { status: "packed", timestamp: "2025-11-25T09:45:00Z", note: "Packed and sealed" },
      { status: "shipped", timestamp: "2025-11-25T18:20:00Z", note: "Released to courier" },
      { status: "out_for_delivery", timestamp: "2025-11-28T06:15:00Z", note: "Courier en route" },
      { status: "delivered", timestamp: "2025-11-28T14:02:00Z", note: "Signed by recipient" },
    ],
  },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartIds, setCartIds] = useState<number[]>(() => readStoredIds(CART_STORAGE_KEY));
  const [favorites, setFavorites] = useState<number[]>(() => readStoredIds(FAVORITES_STORAGE_KEY));
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = readStoredOrders(ORDERS_STORAGE_KEY);
    return stored.length ? stored : sampleOrders;
  });

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = useCallback((productId: number) => {
    setCartIds((previous) => [...previous, productId]);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartIds((previous) => {
      const index = previous.indexOf(productId);
      if (index === -1) {
        return previous;
      }

      const updated = [...previous];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const removeAllFromCart = useCallback((productId: number) => {
    setCartIds((previous) => previous.filter((id) => id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartIds([]);
  }, []);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  }, []);

  const placeOrder = useCallback((payload: PlaceOrderPayload): Order | null => {
    if (!payload.items.length) {
      return null;
    }

    let createdOrder: Order | null = null;

    setOrders((previous) => {
      const timestamp = new Date().toISOString();
      const subtotal = Number(
        payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
      );
      const shipping = payload.shipping ?? 0;
      const taxRate = payload.taxRate ?? 0.12;
      const tax = payload.tax ?? Number((subtotal * taxRate).toFixed(2));
      const total = Number((subtotal + shipping + tax).toFixed(2));
      const referenceBase = Math.floor(Math.random() * 900000 + 100000);

      createdOrder = {
        id: `ord-${Date.now()}`,
        reference: `FT-${referenceBase}`,
        placedAt: timestamp,
        eta: payload.eta,
        status: "processing",
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod: payload.paymentMethod,
        trackingNumber: payload.trackingNumber,
        address: payload.address,
        items: payload.items,
        events: [
          {
            status: "processing",
            timestamp,
            note: payload.note ?? "Order received",
          },
        ],
      };

      return [createdOrder, ...previous];
    });

    setCartIds([]);
    return createdOrder;
  }, []);

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus, note?: string) => {
      setOrders((previous) =>
        previous.map((order) => {
          if (order.id !== orderId) {
            return order;
          }

          const timestamp = new Date().toISOString();

          return {
            ...order,
            status,
            events: [
              ...order.events,
              {
                status,
                timestamp,
                note,
              },
            ],
          };
        })
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      cartIds,
      favorites,
      orders,
      addToCart,
      removeFromCart,
      removeAllFromCart,
      clearCart,
      toggleFavorite,
      placeOrder,
      updateOrderStatus,
    }),
    [
      cartIds,
      favorites,
      orders,
      addToCart,
      removeFromCart,
      removeAllFromCart,
      clearCart,
      toggleFavorite,
      placeOrder,
      updateOrderStatus,
    ]
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
