import { FC, Dispatch, SetStateAction } from "react"
import { FaBell, FaUserCircle } from "react-icons/fa"
import { LogOutIcon, MenuIcon } from "lucide-react"
import { Link } from "react-router-dom"
import Dropdown from "../ui/DropDown"
import ThemeToggle from "../ui/ThemeToggle"

interface TopNavProps {
  theme: string
  setTheme: (theme: string) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const TopNav: FC<TopNavProps> = ({ theme, setTheme, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 dark:hover:bg-gray-800 transition rounded-lg"
        >
          <MenuIcon size={24} />
        </button>
        <h1 className="text-xl font-bold">Welcome, Admin</h1>
      </div>

      <div className="flex items-center space-x-6">
        <ThemeToggle theme={theme} setTheme={setTheme} />

        <Dropdown buttonContent={<FaBell className="text-2xl cursor-pointer" />}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold">Notifications</h3>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            <li className="px-4 py-3 text-center">No new notifications</li>
          </ul>
        </Dropdown>

        <Dropdown buttonContent={<FaUserCircle className="text-2xl cursor-pointer" />}>
          <ul>
            <li>
              <Link to="/personal-information" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Show Profile
              </Link>
            </li>
            <li>
              <Link
                to="/log-out"
                className="w-full px-4 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOutIcon size={16} /> <span>Logout</span>
              </Link>
            </li>
          </ul>
        </Dropdown>
      </div>
    </header>
  )
}

export default TopNav

