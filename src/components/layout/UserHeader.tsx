import { FC } from "react";
import { ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface UserHeaderProps {
  cartCount: number;
  favoritesCount: number;
}

const UserHeader: FC<UserHeaderProps> = ({ cartCount, favoritesCount }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Shop
            </h1>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-6">
            {/* Favorites */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-300 hover:text-white transition group"
            >
              <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:text-red-500 transition" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition group">
              <ShoppingCart className="w-6 h-6 group-hover:text-indigo-400 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Link
                to="/account"
                className="p-2 text-slate-300 hover:text-white hover:bg-white hover:bg-opacity-5 rounded-lg transition"
              >
                <User className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-300 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10 rounded-lg transition"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
