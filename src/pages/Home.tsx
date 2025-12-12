import { FC } from "react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import { ArrowRight, ShoppingBag, Star, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const { role } = useAuth();

  // Show admin dashboard for admins
  if (role === "admin") {
    return <AdminDashboard />;
  }

  // Show website about page for regular users
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">Welcome to Our Store</h1>
          <p className="text-xl text-slate-300 mb-8">Discover premium products at unbeatable prices</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Shopping <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Premium Quality</h3>
            <p className="text-slate-600">We carefully curate every product to ensure the highest quality standards for our customers.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Latest Trends</h3>
            <p className="text-slate-600">Stay ahead with our constantly updated collection of trending products and exclusive releases.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Service</h3>
            <p className="text-slate-600">Quick checkout, fast shipping, and excellent customer support every step of the way.</p>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="bg-slate-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Electronics", icon: "📱", color: "from-blue-500 to-blue-600" },
              { name: "Accessories", icon: "👜", color: "from-purple-500 to-purple-600" },
              { name: "Shoes", icon: "👟", color: "from-green-500 to-green-600" },
              { name: "All Products", icon: "🛍️", color: "from-orange-500 to-orange-600" },
            ].map((cat) => (
              <Link
                key={cat.name}
                to="/shop"
                className={`bg-gradient-to-br ${cat.color} text-white p-12 rounded-lg text-center hover:shadow-lg transition transform hover:scale-105`}
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-12 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">Browse our extensive collection of high-quality products. Find exactly what you're looking for with our easy-to-use filters and search.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition"
          >
            Visit Shop <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">1000+</p>
              <p className="text-slate-300">Premium Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">50K+</p>
              <p className="text-slate-300">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">24/7</p>
              <p className="text-slate-300">Customer Support</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">100%</p>
              <p className="text-slate-300">Quality Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Stay Updated</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive deals, new arrivals, and special offers.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-600"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
