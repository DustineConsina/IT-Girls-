import { useEffect, useState, FC, ReactNode } from "react"
import Sidebar from "./SideBar"
import TopNav from "./TopNav"
import Footer from "./Footer"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [theme])

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${theme === "dark" ? "bg-gray-900 text-black" : "bg-white text-black"}`}
    >
      {/* TopNav for all users */}
      <TopNav
        theme={theme}
        setTheme={setTheme}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout

