import { FC, useMemo, useState } from "react";
import { ArrowUpRight, Heart, Search, Sparkles, Star, TrendingUp } from "lucide-react";
import ProductDetailsModal from "../components/ProductDetailsModal";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  tags?: string[];
}

const categoryLabels: Record<string, string> = {
  electronics: "Signature Tech",
  accessories: "Elevated Essentials",
  shoes: "Performance Footwear",
};

const categoryOrder = ["electronics", "accessories", "shoes"];

const storeHighlights = [
  {
    label: "Curated brands",
    value: "25+",
    description: "Premium makers we partner with for quality-first releases.",
  },
  {
    label: "Average rating",
    value: "4.7★",
    description: "Community-verified across thousands of detailed reviews.",
  },
  {
    label: "Next-day dispatch",
    value: "180 cities",
    description: "Express delivery network covering major hubs worldwide.",
  },
];

const Shop: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Vertex Pro 15",
      price: 1899,
      originalPrice: 2199,
      image: "https://via.placeholder.com/560x420/312E81/FFFFFF?text=Vertex+Pro+15",
      rating: 4.8,
      reviews: 264,
      category: "electronics",
      description: "Flagship productivity laptop with carbon chassis, 4K display, and studio-grade speakers.",
      inStock: true,
      isTrending: true,
      tags: ["laptop", "workstation", "performance"],
    },
    {
      id: 2,
      name: "AuraSync Noise Cancelling Headphones",
      price: 329,
      originalPrice: 399,
      image: "https://via.placeholder.com/560x420/4C1D95/FFFFFF?text=AuraSync+Headphones",
      rating: 4.7,
      reviews: 188,
      category: "electronics",
      description: "Immersive audio with adaptive ANC, 45-hour battery life, and multi-device pairing.",
      inStock: true,
      isNew: true,
      tags: ["audio", "wireless", "travel"],
    },
    {
      id: 3,
      name: "Nordic Atlas Chrono",
      price: 479,
      originalPrice: 549,
      image: "https://via.placeholder.com/560x420/1F2937/FFFFFF?text=Nordic+Atlas+Chrono",
      rating: 4.9,
      reviews: 92,
      category: "accessories",
      description: "Swiss movement, sapphire crystal, and interchangeable leather strap in a minimal profile.",
      inStock: true,
      isTrending: true,
      tags: ["watch", "premium", "minimal"],
    },
    {
      id: 4,
      name: "Flux Knit Sneakers",
      price: 168,
      originalPrice: 210,
      image: "https://via.placeholder.com/560x420/047857/FFFFFF?text=Flux+Knit+Sneakers",
      rating: 4.6,
      reviews: 341,
      category: "shoes",
      description: "Lightweight knit upper with adaptive cushioning engineered for day-to-night comfort.",
      inStock: true,
      tags: ["sneakers", "lifestyle", "comfort"],
    },
    {
      id: 5,
      name: "PulseRunner Elite",
      price: 198,
      originalPrice: 249,
      image: "https://via.placeholder.com/560x420/0EA5E9/FFFFFF?text=PulseRunner+Elite",
      rating: 4.7,
      reviews: 226,
      category: "shoes",
      description: "Responsive running shoe with carbon-infused plate and breathable micro-mesh upper.",
      inStock: true,
      isNew: true,
      tags: ["running", "training", "performance"],
    },
    {
      id: 6,
      name: "Halo Home Smart Speaker",
      price: 189,
      originalPrice: 229,
      image: "https://via.placeholder.com/560x420/7C3AED/FFFFFF?text=Halo+Smart+Speaker",
      rating: 4.5,
      reviews: 176,
      category: "electronics",
      description: "Spatial audio, adaptive lighting ambience, and cross-platform voice assistant integration.",
      inStock: true,
      isNew: true,
      tags: ["smart home", "speaker", "automation"],
    },
    {
      id: 7,
      name: "Glide Wireless Trackpad",
      price: 129,
      originalPrice: 149,
      image: "https://via.placeholder.com/560x420/4338CA/FFFFFF?text=Glide+Wireless+Trackpad",
      rating: 4.4,
      reviews: 138,
      category: "electronics",
      description: "Precision glass surface with multi-gesture support and 90-day battery life.",
      inStock: true,
      tags: ["peripheral", "office", "wireless"],
    },
    {
      id: 8,
      name: "Voyager Modular Backpack",
      price: 248,
      originalPrice: 289,
      image: "https://via.placeholder.com/560x420/1E293B/FFFFFF?text=Voyager+Backpack",
      rating: 4.8,
      reviews: 158,
      category: "accessories",
      description: "Water-resistant recycled nylon with magnetic quick-access panels and tech sleeves.",
      inStock: true,
      tags: ["travel", "bag", "organization"],
    },
    {
      id: 9,
      name: "ClimaCore Smart Thermostat",
      price: 259,
      originalPrice: 299,
      image: "https://via.placeholder.com/560x420/0F172A/FFFFFF?text=ClimaCore+Thermostat",
      rating: 4.6,
      reviews: 201,
      category: "electronics",
      description: "Energy-optimizing climate control with adaptive schedules and presence detection.",
      inStock: true,
      isTrending: true,
      tags: ["climate", "automation", "energy"],
    },
    {
      id: 10,
      name: "Lumen Micro Projector",
      price: 429,
      originalPrice: 499,
      image: "https://via.placeholder.com/560x420/1E1B4B/FFFFFF?text=Lumen+Micro+Projector",
      rating: 4.5,
      reviews: 117,
      category: "electronics",
      description: "Ultra-portable 4K projector with auto-keystone, autofocus, and 6-hour battery runtime.",
      inStock: true,
      isTrending: true,
      tags: ["projector", "4k", "portable"],
    },
  ];

  const categories = useMemo(() => {
    const counts = products.reduce<Record<string, number>>((accumulator, product) => {
      accumulator[product.category] = (accumulator[product.category] || 0) + 1;
      return accumulator;
    }, {});

    return [
      { id: "all", label: "All curated products", count: products.length },
      ...categoryOrder
        .filter((id) => counts[id])
        .map((id) => ({
          id,
          label: categoryLabels[id] ?? id,
          count: counts[id] ?? 0,
        })),
    ];
  }, [products]);

  const trendingProducts = useMemo(
    () => products.filter((product) => product.isTrending).slice(0, 4),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchable = [
        product.name,
        categoryLabels[product.category] ?? product.category,
        ...(product.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedSearch);
    });
  }, [products, searchTerm, selectedCategory]);

  const toggleFavorite = (productId: number) => {
    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCart((previous) => [...previous, product]);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 text-white">
      <div className="max-w-6xl mx-auto space-y-16 px-4 py-16">
        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
            <div className="absolute -top-28 right-0 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="absolute -bottom-32 left-16 h-48 w-48 rounded-full bg-indigo-400/25 blur-3xl" />
            <div className="relative z-10 space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-100">
                <Sparkles size={14} /> Flagship store
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Shop premium drops without the guesswork
                </h1>
                <p className="max-w-xl text-sm text-purple-100 sm:text-base">
                  Every product is hand-verified for quality, performance, and everyday versatility. Browse by category, filter by what matters, and keep favorites one tap away.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-purple-100 focus-within:border-white/30 focus-within:bg-white/10">
                  <Search size={18} className="text-purple-200" />
                  <input
                    type="text"
                    placeholder="Search products, categories, or tags"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-purple-200/70 focus:outline-none"
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-purple-600">
                  Explore collections
                  <ArrowUpRight size={18} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-purple-200">Curated products</p>
                  <p className="text-2xl font-semibold">{products.length}</p>
                  <p className="text-xs text-purple-200/80">Updated weekly</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-purple-200">In your cart</p>
                  <p className="text-2xl font-semibold">{cart.length}</p>
                  <p className="text-xs text-purple-200/80">Saved for checkout</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-purple-200">Wishlist</p>
                  <p className="text-2xl font-semibold">{favorites.length}</p>
                  <p className="text-xs text-purple-200/80">Pinned favorites</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-8 shadow-2xl">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Trending right now</h3>
              <p className="text-sm text-indigo-100">
                Picks the community cannot stop adding to their carts this week.
              </p>
            </div>
            <div className="space-y-4">
              {trendingProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => openProductDetails(product)}
                  className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-left transition hover:border-white/40 hover:bg-white/15"
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
            <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              View all drops
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {storeHighlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-wide text-purple-200">{highlight.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{highlight.value}</p>
              <p className="mt-3 text-sm text-purple-100">{highlight.description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Browse by category</h2>
              <p className="text-sm text-purple-200">Dial into what you are looking for with curated collections.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-100">
              Updated weekly
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-2xl border px-6 py-5 text-left transition ${
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

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">
                {selectedCategory === "all"
                  ? "Featured products"
                  : categoryLabels[selectedCategory] ?? "Curated picks"}
              </h2>
              <p className="text-sm text-purple-200">Premium stock refreshed daily. Tap any product to view full specs.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-purple-100">
              {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center text-purple-100">
              No products match your filters yet. Try another category or search term.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetails(product)}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
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
                  <div className="flex flex-1 flex-col gap-4 p-5">
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
                      className="mt-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-purple-600"
                    >
                      Add to bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 p-10 shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="text-3xl font-semibold">Stay ahead of the next drop</h3>
                <p className="text-sm text-indigo-100">
                  Join the insider list for early access, limited stock alerts, and exclusive bundles.
                </p>
              </div>
              <button className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
                Get notified
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

export default Shop;
