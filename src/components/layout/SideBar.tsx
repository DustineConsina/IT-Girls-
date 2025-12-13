import { FC, Dispatch, SetStateAction, Fragment, ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  SettingsIcon,
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  ClipboardList,
  X,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  Sparkles
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

type MenuItem = {
  path: string
  label: string
  description: string
  icon: ReactNode
}

const Sidebar: FC<SidebarProps> = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation()
  const { role } = useAuth()

  const adminMenuItems: MenuItem[] = [
    {
      path: "/",
      label: "Dashboard",
      description: "Sales snapshots & KPIs",
      icon: <HomeIcon size={20} />
    },
    {
      path: "/analytics",
      label: "Analytics",
      description: "Commerce performance insights",
      icon: <BarChart3 size={20} />
    },
    {
      path: "/orders",
      label: "Orders",
      description: "Track fulfillment pipelines",
      icon: <ClipboardList size={20} />
    },
    {
      path: "/products",
      label: "Products",
      description: "Manage listings & stock",
      icon: <Package size={20} />
    },
    {
      path: "/users",
      label: "Users",
      description: "Customer profiles & loyalty tiers",
      icon: <Users size={20} />
    },
    {
      path: "/settings",
      label: "Settings",
      description: "Store settings & automation",
      icon: <SettingsIcon size={20} />
    }
  ]

  const userMenuItems: MenuItem[] = [
    {
      path: "/",
      label: "Home",
      description: "Latest drops & perks",
      icon: <HomeIcon size={20} />
    },
    {
      path: "/shop",
      label: "Shop",
      description: "Curated catalog picks",
      icon: <ShoppingCart size={20} />
    },
    {
      path: "/orders",
      label: "My Orders",
      description: "Delivery timelines & invoices",
      icon: <ClipboardList size={20} />
    },
    {
      path: "/wishlist",
      label: "Wishlist",
      description: "Saved favorites & drops",
      icon: <TrendingUp size={20} />
    },
    {
      path: "/settings",
      label: "Settings",
      description: "Account & preferences",
      icon: <SettingsIcon size={20} />
    }
  ]

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems
  const brandLabel = role === "admin" ? "Merchant Console" : "Shopper Hub"
  const brandSubtitle = role === "admin" ? "Forte Commerce" : "Your curated marketplace"

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 transform bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-white/5 shadow-2xl transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-72 lg:w-24" : "w-72"}`}
      >
        <div className="flex h-full flex-col px-5 py-6">
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} gap-3`}
          >
            <div className={`flex items-center gap-3 ${isCollapsed ? "hidden" : "flex"}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white">
                <Sparkles size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">{brandLabel}</p>
                <p className="text-xs text-slate-300">{brandSubtitle}</p>
              </div>
            </div>
            {isCollapsed && (
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white">
                <Sparkles size={18} />
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-300 transition hover:text-white lg:hidden"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden rounded-xl p-2 text-slate-300 transition hover:text-white lg:flex"
                aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            </div>
          </div>

          <nav className={`mt-10 flex flex-1 flex-col gap-2 ${isCollapsed ? "px-0" : "px-1"}`}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              const IconWrapper = (
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    isActive ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white" : "bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </div>
              )

              return (
                <Fragment key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex w-full items-center rounded-2xl transition ${
                      isCollapsed ? "justify-center px-0 py-3" : "gap-4 px-3 py-3"
                    } ${
                      isActive
                        ? "bg-white/10 text-white shadow-lg shadow-indigo-900/40"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {IconWrapper}
                    {!isCollapsed && (
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight text-white">{item.label}</span>
                        <span className="text-xs text-purple-200/80">{item.description}</span>
                      </div>
                    )}
                  </Link>
                </Fragment>
              )
            })}
          </nav>

          {!isCollapsed && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white">
                    <LifeBuoy size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Need storefront help?</p>
                    <p className="text-xs text-purple-200/80">Our commerce specialists reply within 12 hours.</p>
                  </div>
                </div>
                <Link
                  to="/support"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-indigo-200 hover:text-white"
                >
                  Contact commerce support
                  <ChevronRight size={14} />
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
                <p className="text-sm font-semibold text-slate-200">{role === "admin" ? "Merchant Workspace" : "Shopper Dashboard"}</p>
                <p className="mt-1">© {new Date().getFullYear()} Forte Commerce. All rights reserved.</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar

