import { FC, Dispatch, SetStateAction } from "react"
import { Link, useLocation } from "react-router-dom"
import { HomeIcon, SettingsIcon } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation()

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <HomeIcon size={24} /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon size={24} /> },
  ]

  if (!isOpen) {
    return null
  }

  return (
    <aside className="h-screen shadow-lg transition-all fixed top-0 left-0 z-50 w-64 overflow-y-auto p-2">
      <div className="flex items-center justify-between p-3">
        <span className="text-xl font-bold">AdminLTE</span>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-gray-200 dark:bg-gray-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12">{item.icon}</div>
            <span className="ml-3 text-lg font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

