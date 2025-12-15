import { FC, useEffect, useRef, useState } from "react"
import { BarChart3, Bell, LogOut, Menu, ShoppingBag, ShoppingCart, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Dropdown from "../ui/DropDown"
import ThemeToggle from "../ui/ThemeToggle"
import { useCart } from "../../context/CartContext"

interface TopNavProps {
  theme: string
  setTheme: (theme: string) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

const TopNav: FC<TopNavProps> = ({ theme, setTheme, isSidebarOpen, setIsSidebarOpen }) => {
  const { role, userName, logout } = useAuth()
  const { cartIds } = useCart()
  const navigate = useNavigate()
  const isAdmin = role === "admin"
  const adminNavLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/analytics", label: "Analytics" },
    { path: "/products", label: "Products" },
    { path: "/users", label: "Users" },
    { path: "/settings", label: "Settings" }
  ]
  const resolvedName = userName ?? (isAdmin ? "Admin" : "Shopper")
  const cartCount = cartIds.length
  const [cartPulse, setCartPulse] = useState(false)
  const previousCountRef = useRef(cartCount)

  useEffect(() => {
    let timeoutId: number | undefined

    if (cartCount > previousCountRef.current) {
      setCartPulse(true)
      timeoutId = window.setTimeout(() => setCartPulse(false), 600)
    }

    previousCountRef.current = cartCount

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [cartCount])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const renderNotificationDropdown = () => (
    <Dropdown
      buttonContent={
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
        </div>
      }
      className="bg-slate-900/95 text-white border-white/10"
    >
      <div className="space-y-2 px-4 py-3 border-b border-white/10">
        <p className="text-sm font-semibold">Marketplace updates</p>
        <p className="text-xs text-white/60">We’ll notify you when sellers drop new inventory or orders ship.</p>
      </div>
      <ul className="max-h-72 overflow-y-auto text-sm text-white/70">
        <li className="px-4 py-4 text-center text-white/50">You’re all caught up.</li>
      </ul>
    </Dropdown>
  )

  const renderAccountDropdown = () => (
    <Dropdown
      buttonContent={
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:border-white/30 hover:bg-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
            <User size={18} />
          </div>
          <div className="hidden text-left leading-tight md:block">
            <span className="block text-xs uppercase tracking-wide text-white/50">Account</span>
            <span className="text-sm font-semibold text-white">{resolvedName} workspace</span>
          </div>
        </div>
      }
      className="bg-slate-900/95 text-white border-white/10"
    >
      <ul className="text-sm">
        <li>
          <Link
            to="/account"
            className="flex items-start justify-between gap-4 px-4 py-3 transition hover:bg-white/5"
          >
            <span className="font-medium text-white">Profile &amp; settings</span>
            <span className="text-xs uppercase tracking-wide text-white/40">Manage</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-3 text-left font-medium text-rose-400 transition hover:bg-white/5"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </li>
      </ul>
    </Dropdown>
  )

  if (isAdmin) {
    return (
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-8 py-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white">
              <ShoppingBag size={20} />
            </div>
            <div className="hidden space-y-1 leading-tight sm:block">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-100/80">
                Merchant Console
              </span>
              <span className="block text-lg font-semibold text-white">
                Running ops, {resolvedName}
              </span>
            </div>
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-8 lg:flex">
            <nav className="flex items-center gap-8 text-sm font-medium text-white/70">
              {adminNavLinks.map((link) => (
                <Link key={link.path} to={link.path} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-3 sm:gap-4 md:gap-5">
            <Link
              to="/analytics"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 lg:inline-flex"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <BarChart3 size={18} />
              </span>
              <span>Insights</span>
            </Link>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            {renderNotificationDropdown()}
            {renderAccountDropdown()}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
              aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-8 py-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
            <ShoppingBag size={20} />
          </div>
          <div className="hidden space-y-1 leading-tight sm:block">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-200/80">
              Syntax Sisters
            </span>
            <span className="block text-lg font-semibold text-white">
              Welcome back, {resolvedName}
            </span>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-8 lg:flex">
          <nav className="flex items-center gap-8 text-sm font-medium text-white/70">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/shop" className="transition hover:text-white">
              Shop
            </Link>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4 md:gap-5">
          <Link
            to="/cart"
            className={`hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 lg:inline-flex ${cartPulse ? "cart-icon-animate" : ""}`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="cart-count-badge absolute -top-1 -right-1 min-w-[1.4rem] rounded-full bg-emerald-500 px-1 text-xs font-semibold leading-5 text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </span>
            <span>Cart</span>
          </Link>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          {renderNotificationDropdown()}
          {renderAccountDropdown()}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
            aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNav

