import { FC } from "react"
import { Bell, LogOut, Menu, Search, ShoppingBag, ShoppingCart, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Dropdown from "../ui/DropDown"
import ThemeToggle from "../ui/ThemeToggle"

interface TopNavProps {
  theme: string
  setTheme: (theme: string) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

const TopNav: FC<TopNavProps> = ({ theme, setTheme, isSidebarOpen, setIsSidebarOpen }) => {
  const { role, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = role === "admin"

  const handleLogout = () => {
    logout()
    navigate("/")
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
              Marketplace HQ
            </span>
            <span className="block text-lg font-semibold text-white">
              Welcome back, {isAdmin ? "Admin" : "Shopper"}
            </span>
          </div>
        </Link>

        <div className="hidden flex-1 items-center gap-8 lg:flex">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search catalog, brands, or SKU codes"
              className="w-full rounded-3xl border border-white/10 bg-white/5 py-3.5 pl-14 pr-5 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none"
            />
          </div>
          <nav className="flex items-center gap-8 text-sm font-medium text-white/70">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/shop" className="transition hover:text-white">
              Catalog
            </Link>
            <Link to="/register" className="transition hover:text-white">
              Membership
            </Link>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4 md:gap-5">
          <Link
            to="/shop"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 lg:inline-flex"
          >
            <ShoppingCart size={18} />
            <span>View cart</span>
          </Link>
          <ThemeToggle theme={theme} setTheme={setTheme} />

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

          <Dropdown
            buttonContent={
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:border-white/30 hover:bg-white/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
                  <User size={18} />
                </div>
                <div className="hidden text-left leading-tight md:block">
                  <span className="block text-xs uppercase tracking-wide text-white/50">Account</span>
                  <span className="text-sm font-semibold text-white">{isAdmin ? "Admin" : "Shopper"} workspace</span>
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

