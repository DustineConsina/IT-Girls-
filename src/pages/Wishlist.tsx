import { FC, useMemo } from "react";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import type { Product } from "../data/products";
import { useAddToCartAnimation } from "../hooks/useAddToCartAnimation.ts";
import AddToCartToast from "../components/ui/AddToCartToast";

const categoryLabels: Record<string, string> = {
  electronics: "Signature Tech",
  accessories: "Elevated Essentials",
  footwear: "Performance Footwear",
  "smart-home": "Smart Living",
};

const Wishlist: FC = () => {
  const { favorites, addToCart, toggleFavorite } = useCart();
  const {
    activeProductId,
    bannerProduct,
    triggerAddToCartAnimation,
    dismissBanner,
  } = useAddToCartAnimation();

  const favoriteProducts = useMemo(() => {
    return favorites
      .map((id) => getProductById(id))
      .filter((product): product is Product => Boolean(product));
  }, [favorites]);

  const handleAddToCart = (product: Product) => {
    addToCart(product.id);
    triggerAddToCartAnimation(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 text-white">
      {bannerProduct && (
        <div className="pointer-events-none fixed inset-x-0 top-24 z-40 flex justify-end px-4 sm:px-6 lg:px-8">
          <AddToCartToast product={bannerProduct} onDismiss={dismissBanner} />
        </div>
      )}
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-100/70">Wishlist</p>
            <h1 className="text-4xl font-semibold tracking-tight">Saved for later</h1>
            <p className="text-sm text-purple-100/80">
              Curate products you love, keep tabs on restocks, and drop them into your bag when you are ready.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
          >
            <ArrowLeft size={16} /> Back to shop
          </Link>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white">
              <Heart size={34} />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-purple-100/80">
              Tap the heart on any product to save it here. We will keep everything synced across your devices.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600"
            >
              <ShoppingCart size={16} /> Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="h-5 w-5 fill-current text-rose-400" />
                  </button>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="space-y-2">
                    <h3 className="line-clamp-2 text-lg font-semibold text-white">{product.name}</h3>
                    <p className="text-xs uppercase tracking-wide text-indigo-100/80">
                      {categoryLabels[product.category] ?? product.category}
                    </p>
                    <p className="text-sm text-purple-100/80 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold text-white">₱{product.price.toLocaleString()}</p>
                    {product.originalPrice && (
                      <span className="text-sm text-purple-200/80 line-through">
                        ₱{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600 ${
                      activeProductId === product.id ? "cart-cta-animate" : ""
                    }`}
                  >
                    <ShoppingCart size={16} />
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
