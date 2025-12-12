import { FC } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Modal from "./ui/Modal";

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
}

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddToFavorites: (product: Product) => void;
  isFavorited: boolean;
}

const ProductDetailsModal: FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToFavorites,
  isFavorited,
}) => {
  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-sm mb-4">{product.category}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 ml-3">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>
            <p className={product.inStock ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {product.inStock ? "✓ In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Product Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={() => onAddToFavorites(product)}
              className={`px-6 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                isFavorited
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              {isFavorited ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
