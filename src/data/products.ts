export interface Product {
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

const variantLabels = [
  "Prime",
  "Series 2",
  "Series 3",
  "Series 4",
  "Series 5",
  "Series 6",
  "Series 7",
  "Series 8",
  "Series 9",
  "Series 10",
];

export const baseProducts: Product[] = [
  {
    id: 1,
    name: "Vertex Pro 15",
    price: 1899,
    originalPrice: 2199,
    image: "https://via.placeholder.com/560x420/312E81/FFFFFF?text=Vertex+Pro+15",
    rating: 4.8,
    reviews: 264,
    category: "electronics",
    description:
      "Flagship productivity laptop with carbon chassis, 4K display, and studio-grade speakers.",
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
    description:
      "Immersive audio with adaptive ANC, 45-hour battery life, and multi-device pairing.",
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
    description:
      "Swiss movement, sapphire crystal, and interchangeable leather strap in a minimal profile.",
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
    category: "footwear",
    description:
      "Lightweight knit upper with adaptive cushioning engineered for day-to-night comfort.",
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
    category: "footwear",
    description:
      "Responsive running shoe with carbon-infused plate and breathable micro-mesh upper.",
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
    category: "smart-home",
    description:
      "Spatial audio, adaptive lighting ambience, and cross-platform voice assistant integration.",
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
    description:
      "Precision glass surface with multi-gesture support and 90-day battery life.",
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
    description:
      "Water-resistant recycled nylon with magnetic quick-access panels and tech sleeves.",
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
    category: "smart-home",
    description:
      "Energy-optimizing climate control with adaptive schedules and presence detection.",
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
    description:
      "Ultra-portable 4K projector with auto-keystone, autofocus, and 6-hour battery runtime.",
    inStock: true,
    isTrending: true,
    tags: ["projector", "4k", "portable"],
  },
];

const composeVariant = (product: Product, variantIndex: number, productIndex: number): Product => {
  const multiplier = variantIndex * baseProducts.length;
  const variantId = multiplier + product.id;
  const priceDelta = variantIndex * 12;
  const updatedPrice = Number((product.price + priceDelta).toFixed(2));
  const updatedOriginalPrice = product.originalPrice
    ? Number((product.originalPrice + priceDelta + 10).toFixed(2))
    : undefined;

  return {
    ...product,
    id: variantId,
    name: `${product.name} ${variantLabels[variantIndex]}`,
    price: updatedPrice,
    originalPrice: updatedOriginalPrice,
    rating: Math.min(5, Number((product.rating - variantIndex * 0.05).toFixed(1))),
    reviews: Math.max(12, product.reviews - variantIndex * 11),
    isNew:
      variantIndex === 0
        ? product.isNew
        : variantIndex >= variantLabels.length - 2 || product.isNew,
    isTrending: variantIndex % 2 === 0 ? product.isTrending : productIndex % 3 === 0,
    tags: [...(product.tags ?? []), `collection-${variantIndex + 1}`],
  };
};

export const generateProductCatalog = (limit = 100): Product[] => {
  const expanded = variantLabels.flatMap((_, variantIndex) =>
    baseProducts.map((product, productIndex) => composeVariant(product, variantIndex, productIndex))
  );

  return expanded.slice(0, limit);
};

export const getProductById = (id: number): Product | undefined => {
  if (!Number.isFinite(id) || id < 1) {
    return undefined;
  }

  const baseCount = baseProducts.length;
  const variantIndex = Math.floor((id - 1) / baseCount);

  if (variantIndex < 0 || variantIndex >= variantLabels.length) {
    return undefined;
  }

  const baseIndex = (id - 1) % baseCount;
  const baseProduct = baseProducts[baseIndex];

  if (!baseProduct) {
    return undefined;
  }

  return composeVariant(baseProduct, variantIndex, baseIndex);
};
