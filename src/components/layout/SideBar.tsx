import { FC } from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  HomeIcon, 
  SettingsIcon, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp,
  ClipboardList
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"

interface SidebarProps {
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
}

const Sidebar: FC<SidebarProps> = () => {
  const location = useLocation()
  const { role } = useAuth()

  const adminMenuItems = [
    { path: "/", label: "Dashboard", icon: <HomeIcon size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { path: "/orders", label: "Orders", icon: <ClipboardList size={20} /> },
    { path: "/products", label: "Products", icon: <Package size={20} /> },
    { path: "/users", label: "Users", icon: <Users size={20} /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon size={20} /> },
  ]

  const userMenuItems = [
    { path: "/", label: "Home", icon: <HomeIcon size={20} /> },
    { path: "/shop", label: "Shop", icon: <ShoppingCart size={20} /> },
    { path: "/orders", label: "My Orders", icon: <ClipboardList size={20} /> },
    { path: "/wishlist", label: "Wishlist", icon: <TrendingUp size={20} /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon size={20} /> },
  ]

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 h-[calc(100vh-64px)] transition-all duration-300 ease-in-out overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <span className="text-2xl font-bold text-white whitespace-nowrap">
          {role === "admin" ? "🔧 Admin" : "🛍️ Shop"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 whitespace-nowrap ${
              location.pathname === item.path
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "text-slate-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">{item.icon}</div>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-700 bg-slate-800 mt-auto">
        <div className="text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1 whitespace-nowrap">
            {role === "admin" ? "Admin Panel" : "User Dashboard"}
          </p>
          <p>© 2024 All rights reserved</p>
        </div>
      </div>
      </aside>
    </>
  )
}

export default Sidebar

