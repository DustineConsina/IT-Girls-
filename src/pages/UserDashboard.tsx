import { FC, useMemo, useState } from "react";
import { ArrowUpRight, Heart, Search, Sparkles, Star, TrendingUp } from "lucide-react";
import ProductDetailsModal from "../components/ProductDetailsModal";
import AddToCartToast from "../components/ui/AddToCartToast";
import { useCart } from "../context/CartContext";
import { generateProductCatalog } from "../data/products";
import type { Product } from "../data/products";
import { useAddToCartAnimation } from "../hooks/useAddToCartAnimation.ts";

type Category = {
  id: string;
  label: string;
  count: number;
};

const categoryLabels: Record<string, string> = {
  electronics: "Signature Tech",
  "smart-home": "Smart Living",
  accessories: "Modern Accessories",
  footwear: "Performance Footwear",
};

const categoryOrder = ["electronics", "smart-home", "accessories", "footwear"];

const curatedCollections = [
  {
    tag: "Community Picks",
    title: "Crowd favorites with 4.8+ ratings",
    description: "Fan-endorsed pieces that balance premium craftsmanship with everyday practicality.",
  },
  {
    tag: "Fresh Drop",
    title: "Seasonal drops that just landed",
    description: "Limited-run releases curated for this month's most requested upgrades.",
  },
  {
    tag: "Smart Living",
    title: "Automate your home in style",
    description: "Connected essentials engineered to sync seamlessly with your daily routines.",
  },
];

const UserDashboard: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartIds, favorites, addToCart: addCartItem, toggleFavorite: toggleFavoriteId } = useCart();
  const productsCatalog = useMemo(() => generateProductCatalog(), []);
  const {
    activeProductId,
    bannerProduct,
    triggerAddToCartAnimation,
    dismissBanner,
  } = useAddToCartAnimation();

  const statHighlights = [
    {
      label: "Products tracked",
      value: productsCatalog.length.toLocaleString(),
      helper: "Updated weekly",
    },
    {
      label: "Items in cart",
      value: cartIds.length.toString(),
      helper: "Saved for checkout",
    },
    {
      label: "Favorites",
      value: favorites.length.toString(),
      helper: "Curated by you",
    },
  ];

  const categories: Category[] = useMemo(() => {
    const counts = productsCatalog.reduce<Record<string, number>>((accumulator, product) => {
      return {
        ...accumulator,
        [product.category]: (accumulator[product.category] || 0) + 1,
      };
    }, {});

    return [
      { id: "all", label: "All curated picks", count: productsCatalog.length },
      ...categoryOrder
        .filter((id) => counts[id])
        .map((id) => ({
          id,
          label: categoryLabels[id] ?? id,
          count: counts[id] || 0,
        })),
    ];
  }, [productsCatalog]);

  const trendingProducts = useMemo(
    () => productsCatalog.filter((product) => product.isTrending).slice(0, 4),
    [productsCatalog]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return productsCatalog.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchable = [product.name, product.category, ...(product.tags ?? [])]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedSearch);
    });
  }, [productsCatalog, searchTerm, selectedCategory]);

  const toggleFavorite = (productId: number) => {
    toggleFavoriteId(productId);
  };

  const addToCart = (product: Product) => {
    addCartItem(product.id);
    triggerAddToCartAnimation(product);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 text-white">
      {bannerProduct && (
        <div className="pointer-events-none fixed inset-x-0 top-24 z-40 flex justify-end px-4 sm:px-6 lg:px-8">
          <AddToCartToast product={bannerProduct} onDismiss={dismissBanner} />
        </div>
      )}
      <div className="mx-auto max-w-7xl space-y-24 px-6 py-20">
        <section className="grid gap-10 lg:grid-cols-[1.6fr_minmax(320px,1fr)] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
            <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="absolute -bottom-24 left-16 h-40 w-40 rounded-full bg-indigo-400/20 blur-2xl" />
            <div className="relative z-10 space-y-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-purple-100">
                <Sparkles size={14} /> Tailored for you
              </span>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Design your shopping experience
                </h1>
                <p className="max-w-xl text-sm text-purple-100 sm:text-base">
                  Explore curated collections, discover community favorites, and track the products that matter most to you—all from a dashboard engineered for calm productivity.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-purple-100 focus-within:border-white/30 focus-within:bg-white/10">
                  <Search size={18} className="text-purple-200" />
                  <input
                    type="text"
                    placeholder="Search products, brands, or collections"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-purple-200/70 focus:outline-none"
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-purple-600">
                  Explore collection
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[32px] bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-12 shadow-2xl">
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold">Trending this week</h3>
              <p className="text-sm text-indigo-100">
                Hand-picked items our community cannot stop talking about.
              </p>
            </div>
            <div className="space-y-5 overflow-hidden">
              {trendingProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => openProductDetails(product)}
                  className="w-full rounded-3xl border border-white/20 bg-white/10 px-5 py-4 text-left transition hover:border-white/40 hover:bg-white/15"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{product.name}</p>
                      <p className="text-xs text-indigo-100">{categoryLabels[product.category] ?? product.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-white">${product.price.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
            <button className="mt-10 inline-flex items-center justify-center gap-2 rounded-3xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              View full collection
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {statHighlights.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">{stat.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-purple-200/80">{stat.helper}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {curatedCollections.map((collection) => (
            <div
              key={collection.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-100">
                {collection.tag}
              </span>
              <h3 className="text-lg font-semibold text-white">{collection.title}</h3>
              <p className="mt-2 text-sm text-purple-100">{collection.description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Browse by category</h2>
              <p className="text-sm text-purple-200">Switch categories to view curated edits.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-100">
              Updated weekly
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-[24px] border px-7 py-6 text-left transition ${
                  selectedCategory === category.id
                    ? "border-white/40 bg-white/15 text-white shadow-xl"
                    : "border-white/10 bg-white/5 text-purple-100 hover:border-white/25 hover:bg-white/10"
                }`}
              >
                <p className="text-sm font-semibold">{category.label}</p>
                <p className="text-xs text-purple-200">{category.count} items</p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Featured products</h2>
              <p className="text-sm text-purple-200">Based on your interests and latest arrivals.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-purple-100">
              {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center text-purple-100">
              No products match your current filters. Try a different category or search term.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetails(product)}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.isNew && (
                        <span className="rounded-full bg-indigo-500/90 px-3 py-1 text-xs font-semibold uppercase text-white">
                          New
                        </span>
                      )}
                      {product.isTrending && (
                        <span className="flex items-center gap-1 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-semibold uppercase text-white">
                          <TrendingUp size={12} /> Trending
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className="absolute right-3 top-3 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40"
                    >
                      <Heart
                        className={`h-5 w-5 transition ${
                          favorites.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div className="space-y-2">
                      <h3 className="line-clamp-2 text-lg font-semibold text-white">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1 text-yellow-300">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`h-3.5 w-3.5 ${
                                index < Math.floor(product.rating)
                                  ? "fill-yellow-400"
                                  : "fill-purple-200/40 text-purple-200/40"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-purple-200">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-semibold text-white">${product.price.toLocaleString()}</p>
                      {product.originalPrice && (
                        <span className="text-sm text-purple-200 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        addToCart(product);
                      }}
                      className={`mt-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-purple-600 ${
                        activeProductId === product.id ? "cart-cta-animate" : ""
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 p-12 shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="text-3xl font-semibold">Ready for your next upgrade?</h3>
                <p className="text-sm text-indigo-100">
                  Join thousands of members building curated wishlists and tracking drops in real time.
                </p>
              </div>
              <button className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
                Build your wishlist
              </button>
            </div>
          </div>
        </section>
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onAddToFavorites={(product) => toggleFavorite(product.id)}
        isFavorited={selectedProduct ? favorites.includes(selectedProduct.id) : false}
      />
    </div>
  );
};

export default UserDashboard;
