import { FC } from "react";
import { ShoppingCart, Heart, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
}

const Navbar: FC<NavbarProps> = ({ cartCount, favoritesCount }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/shop" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Shop
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              About
            </a>
          </div>

          {/* Icons and Actions */}
          <div className="flex items-center gap-6">
            {/* Favorites */}
            <div className="relative">
              <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500 transition" />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-500 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
