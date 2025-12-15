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

export const productsCatalog: Product[] = [
  {
    id: 1,
    name: "Skywalkers Jr.",
    price: 1899,
    originalPrice: 2199,
    image: "/Skywalkers Jr.jpeg",
    rating: 4.8,
    reviews: 264,
    category: "footwear",
    description:
      "Skywalkers Jr. are the perfect blend of style and support for your little adventurer. Crafted with durable materials and a secure fit, they're ready for any playground challenge. The cool gray tones and pop of orange add a touch of fun to every step.",
    inStock: true,
    isTrending: true,
    tags: ["footwear", "workstation", "performance"],
  },
  {
    id: 2,
    name: "Spectre 67",
    price: 329,
    originalPrice: 399,
    image: "/Spectre 67.jpeg",
    rating: 4.7,
    reviews: 188,
    category: "electronics",
    description:
      "Unleash your vision with the Spectre 67. This medium format camera blends bold aesthetics with uncompromising performance. Its all-black design and advanced lens technology deliver striking images with unparalleled depth and clarity.",
    inStock: true,
    isNew: true,
    tags: ["camera", "wearable", "travel"],
  },
  {
    id: 3,
    name: "ProBook Elite",
    price: 479,
    originalPrice: 549,
    image: "/ProBook Elite.jpeg",
    rating: 4.9,
    reviews: 92,
    category: "electronics",
    description:
      "The ProBook Elite delivers uncompromising performance in a sleek, professional design. Featuring a powerful processor, stunning display, and all-day battery life, it's the perfect tool for productivity on the go.",
    inStock: true,
    isTrending: true,
    tags: ["laptop", "premium", "minimal"],
  },
  {
    id: 4,
    name: "Kelly Handbag",
    price: 168,
    originalPrice: 210,
    image: "/Kelly  handbag .jpeg",
    rating: 4.6,
    reviews: 341,
    category: "accessories",
    description:
      " vibrant emerald green color.  made of smooth,  vegan leather, with a structured, trapezoidal silhouette.",
    inStock: true,
    tags: ["handbag", "lifestyle", "comfort"],
  },
  {
    id: 5,
    name: "Aura Prime",
    price: 198,
    originalPrice: 249,
    image: "/Aura Prime.jpeg",
    rating: 4.7,
    reviews: 226,
    category: "electronics",
    description:
      "Capture every moment in style with the Aura Prime smartphone. This sleek device features a vibrant display, powerful camera, and long-lasting battery. Its minimalist design and polished frame make it a true head-turner.",
    inStock: true,
    isNew: true,
    tags: ["phone", "electronics", "performance"],
  },
  {
    id: 6,
    name: "Apex Blanc",
    price: 189,
    originalPrice: 229,
    image: "/Apex Blanc.jpeg",
    rating: 4.5,
    reviews: 176,
    category: "footwear",
    description:
      "Elevate your style with Apex Blanc platform sneakers. These all-white kicks offer a clean, minimalist aesthetic with a modern edge. The smooth upper and chunky sole create a versatile look that pairs effortlessly with any outfit.",
    inStock: true,
    isNew: true,
    tags: ["footwear", "running", "comfort"],
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
  {
    id: 11,
    name: "Nimbus Studio Monitors",
    price: 598,
    originalPrice: 649,
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviews: 131,
    category: "electronics",
    description:
      "Dual-driver reference speakers tuned for producers and creators who need accurate playback.",
    inStock: true,
    tags: ["audio", "studio", "monitoring"],
  },
  {
    id: 12,
    name: "Aviator Weekender Duffel",
    price: 289,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 214,
    category: "accessories",
    description:
      "Vegetable-tanned leather with padded tech sleeve and detachable shoulder strap for travel days.",
    inStock: true,
    isTrending: true,
    tags: ["travel", "leather", "weekender"],
  },
  {
    id: 13,
    name: "Solstice Smart Floor Lamp",
    price: 219,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    rating: 4.4,
    reviews: 98,
    category: "smart-home",
    description:
      "Adaptive color temperature, app presets, and voice assistant support for modern spaces.",
    inStock: true,
    tags: ["lighting", "automation", "decor"],
  },
  {
    id: 14,
    name: "Atlas Performance Hoodie",
    price: 118,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 407,
    category: "accessories",
    description:
      "Moisture-wicking technical fleece with hidden media pocket and scuba hood.",
    inStock: true,
    tags: ["apparel", "athleisure"],
  },
  {
    id: 15,
    name: "Orbit Active Earbuds",
    price: 179,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    rating: 4.3,
    reviews: 264,
    category: "electronics",
    description:
      "Secure-fit wireless earbuds with adaptive EQ and IPX5 sweat resistance.",
    inStock: true,
    isNew: true,
    tags: ["audio", "wireless", "fitness"],
  },
  {
    id: 16,
    name: "Circuit Commuter Bike",
    price: 1290,
    originalPrice: 1490,
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    reviews: 74,
    category: "accessories",
    description:
      "Lightweight aluminum frame with belt drive and integrated lights for city riding.",
    inStock: true,
    tags: ["mobility", "cycling", "urban"],
  },
  {
    id: 17,
    name: "Horizon Studio Desk",
    price: 840,
    originalPrice: 920,
    image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 112,
    category: "smart-home",
    description:
      "Solid oak sit-stand desk with cable passthroughs and wireless charging pad.",
    inStock: true,
    isTrending: true,
    tags: ["workspace", "furniture", "desk"],
  },
  {
    id: 18,
    name: "Pulseform Training Shoes",
    price: 158,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviews: 295,
    category: "footwear",
    description:
      "Hybrid trainer with responsive foam midsole and reinforced lateral support.",
    inStock: true,
    tags: ["training", "gym", "performance"],
  },
  {
    id: 19,
    name: "Cascade Pour-Over Set",
    price: 162,
    originalPrice: 189,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 183,
    category: "smart-home",
    description:
      "Hand-blown borosilicate brewer with precision scale and variable-temp kettle.",
    inStock: true,
    tags: ["coffee", "kitchen", "artisan"],
  },
  {
    id: 20,
    name: "Summit Expedition Parka",
    price: 349,
    originalPrice: 420,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 152,
    category: "accessories",
    description:
      "Waterproof shell with recycled insulation rated for sub-zero adventures.",
    inStock: true,
    isNew: true,
    tags: ["outerwear", "winter", "performance"],
  },
];

export const generateProductCatalog = (): Product[] => productsCatalog;

export const getProductById = (id: number): Product | undefined =>
  productsCatalog.find((product) => product.id === id);
