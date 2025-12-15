import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import type { Product } from "../data/products";

const categoryLabels: Record<string, string> = {
  electronics: "Signature Tech",
  accessories: "Elevated Essentials",
  footwear: "Performance Footwear",
  "smart-home": "Smart Living",
};

type CartLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

const Cart: FC = () => {
  const { cartIds, addToCart, removeFromCart, removeAllFromCart, clearCart } = useCart();

  const lineItems = useMemo<CartLine[]>(() => {
    const grouped = new Map<number, CartLine>();

    cartIds.forEach((id) => {
      const product = getProductById(id);
      if (!product) {
        return;
      }

      const existing = grouped.get(id);
      if (existing) {
        existing.quantity += 1;
        existing.lineTotal = Number((existing.product.price * existing.quantity).toFixed(2));
      } else {
        grouped.set(id, {
          product,
          quantity: 1,
          lineTotal: Number(product.price.toFixed(2)),
        });
      }
    });

    return Array.from(grouped.values());
  }, [cartIds]);

  const subtotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [lineItems]
  );

  const shipping = lineItems.length ? 12 : 0;
  const tax = lineItems.length ? Number((subtotal * 0.12).toFixed(2)) : 0;
  const total = Number((subtotal + shipping + tax).toFixed(2));
  const itemCount = cartIds.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.35em] text-purple-200/70">Your cart</p>
            <h1 className="text-4xl font-semibold tracking-tight">Ready when you are</h1>
            <p className="text-sm text-purple-100/80">
              Review items you've saved and adjust quantities before a speedy checkout.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <ArrowLeft size={16} /> Continue shopping
          </Link>
        </div>

        {lineItems.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white">
              <ShoppingBag size={32} />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Your bag is feeling light</h2>
            <p className="mt-2 text-sm text-purple-100/80">
              Discover curated drops and add products you love to see them here.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600"
            >
              Browse the catalog
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {lineItems.map(({ product, quantity, lineTotal }) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10 sm:flex-row"
                >
                  <div className="h-40 w-full overflow-hidden rounded-2xl bg-white/5 sm:h-36 sm:w-40">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white line-clamp-2">{product.name}</h3>
                          <p className="text-xs uppercase tracking-wide text-indigo-100/70">
                            {categoryLabels[product.category] ?? product.category}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAllFromCart(product.id)}
                          className="rounded-full bg-white/5 p-2 text-purple-100 transition hover:bg-white/10"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-purple-100/80 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="rounded-full bg-white/10 p-1 text-white transition hover:bg-white/20"
                          aria-label={`Decrease quantity of ${product.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[2ch] text-sm font-semibold">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(product.id)}
                          className="rounded-full bg-white/10 p-1 text-white transition hover:bg-white/20"
                          aria-label={`Increase quantity of ${product.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-purple-100/70">${product.price.toLocaleString()} each</p>
                        <p className="text-lg font-semibold text-white">${lineTotal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Order summary</h2>
                <p className="text-sm text-purple-100/80">{itemCount} item{itemCount === 1 ? "" : "s"} in bag</p>
              </div>
              <div className="space-y-3 text-sm text-purple-100">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>{shipping ? `$${shipping.toLocaleString()}` : "Included"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax (12%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="h-px bg-white/10" aria-hidden />
                <div className="flex items-center justify-between text-base font-semibold text-white">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600"
              >
                Proceed to checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
