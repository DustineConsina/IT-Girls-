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
    price: 106344,
    originalPrice: 123144,
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
    price: 18424,
    originalPrice: 22344,
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
    price: 26824,
    originalPrice: 30744,
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
    price: 9408,
    originalPrice: 11760,
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
    price: 11088,
    originalPrice: 13944,
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
    price: 10584,
    originalPrice: 12824,
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
    price: 7224,
    originalPrice: 8344,
    image: "/Glide Wireless Trackpad.webp",
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
    price: 13888,
    originalPrice: 16184,
    image: "/Voyager Modular Backpack.webp",
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
    price: 14504,
    originalPrice: 16744,
    image: "/ClimaCore Smart Thermostat.png",
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
    price: 24024,
    originalPrice: 27944,
    image: "/Lumen Micro Projector.avif",
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
    price: 33488,
    originalPrice: 36344,
    image: "/Nimbus Studio Monitors.webp",
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
    price: 16184,
    originalPrice: 17920,
    image: "/Aviator Weekender Duffel.webp",
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
    price: 12264,
    originalPrice: 13944,
    image: "/Solstice Smart Floor Lamp.jpeg",
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
    price: 6608,
    image: "/Atlas Performance Hoodie.png",
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
    price: 10024,
    originalPrice: 11144,
    image: "/Orbit Active Earbuds.webp",
    rating: 4.3,
    reviews: 264,
    category: "electronics",
    description:
      "Secure-fit wireless earbuds with adaptive EQ and IPX5 sweat resistance.",
    inStock: true,
    isNew: true,
    tags: ["audio", "wireless", "fitness"],
  },
  
];

export const generateProductCatalog = (): Product[] => productsCatalog;

export const getProductById = (id: number): Product | undefined =>
  productsCatalog.find((product) => product.id === id);
