import { FC } from "react"
import { FaBell, FaUserCircle } from "react-icons/fa"
import { LogOutIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Dropdown from "../ui/DropDown"
import ThemeToggle from "../ui/ThemeToggle"

interface TopNavProps {
  theme: string
  setTheme: (theme: string) => void
}

const TopNav: FC<TopNavProps> = ({ theme, setTheme }) => {
  const { role, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = role === "admin"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="p-4 flex justify-between items-center shadow-md bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b border-slate-600">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-white">
          Welcome, {isAdmin ? "Admin" : "User"}
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <ThemeToggle theme={theme} setTheme={setTheme} />

        <Dropdown buttonContent={<FaBell className="text-2xl cursor-pointer text-white hover:text-indigo-400 transition" />}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold">Notifications</h3>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            <li className="px-4 py-3 text-center">No new notifications</li>
          </ul>
        </Dropdown>

        <Dropdown buttonContent={<FaUserCircle className="text-2xl cursor-pointer text-white hover:text-indigo-400 transition" />}>
          <ul>
            <li>
              <Link to="/account" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Show Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
              >
                <LogOutIcon size={16} /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>
    </header>
  )
}

export default TopNav

