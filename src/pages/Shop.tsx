import { FC, useState, useMemo } from "react";
import { Star, Heart, TrendingUp } from "lucide-react";
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
}

const Shop: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Laptop",
      price: 899.99,
      originalPrice: 1299.99,
      image: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Premium+Laptop",
      rating: 4.8,
      reviews: 245,
      category: "electronics",
      description: "High-performance laptop with latest technology",
      inStock: true,
      isTrending: true,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 129.99,
      originalPrice: 199.99,
      image: "https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Headphones",
      rating: 4.5,
      reviews: 128,
      category: "electronics",
      description: "Premium sound quality with noise cancellation",
      inStock: true,
      isNew: true,
    },
    {
      id: 3,
      name: "Designer Watch",
      price: 249.99,
      originalPrice: 399.99,
      image: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Designer+Watch",
      rating: 4.9,
      reviews: 89,
      category: "accessories",
      description: "Luxury timepiece with elegant design",
      inStock: true,
      isTrending: true,
    },
    {
      id: 4,
      name: "Fashion Sneakers",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Fashion+Sneakers",
      rating: 4.7,
      reviews: 342,
      category: "shoes",
      description: "Comfortable and stylish sneakers for everyday wear",
      inStock: true,
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 99.99,
      originalPrice: 159.99,
      image: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Running+Shoes",
      rating: 4.6,
      reviews: 215,
      category: "shoes",
      description: "Professional running shoes with advanced support",
      inStock: true,
      isNew: true,
    },
    {
      id: 6,
      name: "Smart Speaker",
      price: 59.99,
      originalPrice: 99.99,
      image: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Smart+Speaker",
      rating: 4.4,
      reviews: 176,
      category: "electronics",
      description: "Voice-controlled smart speaker for your home",
      inStock: true,
      isNew: true,
    },
    {
      id: 7,
      name: "Wireless Mouse",
      price: 34.99,
      originalPrice: 59.99,
      image: "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Wireless+Mouse",
      rating: 4.3,
      reviews: 89,
      category: "electronics",
      description: "Ergonomic wireless mouse for productivity",
      inStock: true,
    },
    {
      id: 8,
      name: "Premium Backpack",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://via.placeholder.com/300x200/6366F1/FFFFFF?text=Premium+Backpack",
      rating: 4.8,
      reviews: 156,
      category: "accessories",
      description: "Durable backpack with multiple compartments",
      inStock: true,
    },
  ];

  const categories = [
    { id: "all", label: "All Products", count: 8 },
    { id: "electronics", label: "Electronics", count: 4 },
    { id: "accessories", label: "Accessories", count: 2 },
    { id: "shoes", label: "Shoes", count: 2 },
  ];

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          selectedCategory === "all" || product.category === selectedCategory
      ),
    [selectedCategory]
  );

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Shop Our Collection</h1>
          <p className="text-xl text-slate-300">Browse our premium selection of products</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Filter by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-lg transition font-semibold ${
                  selectedCategory === category.id
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white text-slate-900 border border-slate-200 hover:border-slate-400"
                }`}
              >
                <p>{category.label}</p>
                <p className="text-sm mt-1 opacity-75">{category.count} items</p>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {selectedCategory === "all"
              ? "All Products"
              : categories.find((c) => c.id === selectedCategory)?.label}
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
              <p className="text-slate-500 text-lg">No products found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetails(product)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden group cursor-pointer border border-slate-200"
                >
                  {/* Product Image */}
                  <div className="relative bg-slate-100 aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.isNew && (
                        <span className="text-xs font-bold bg-indigo-600 text-white px-3 py-1 rounded">
                          NEW
                        </span>
                      )}
                      {product.isTrending && (
                        <span className="text-xs font-bold bg-orange-600 text-white px-3 py-1 rounded flex items-center gap-1">
                          <TrendingUp size={12} /> TRENDING
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition"
                    >
                      <Heart
                        className={`w-5 h-5 transition ${
                          favorites.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-slate-400"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-slate-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition text-sm"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
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
