import { useEffect, useState, FC, ReactNode } from "react"
import Sidebar from "./SideBar"
import TopNav from "./TopNav"
import Footer from "./Footer"
import { useAuth } from "../../context/AuthContext"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { role } = useAuth()
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const isAdmin = role === "admin"

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
      className={`flex flex-col h-screen overflow-hidden transition-colors ${theme === "dark" ? "bg-gray-900 text-black" : "bg-white text-black"}`}
    >
      {/* TopNav for all users */}
      <TopNav theme={theme} setTheme={setTheme} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Show sidebar only for users, not admin */}
        {!isAdmin && <Sidebar />}
        
        <div className="flex flex-col flex-1 overflow-auto">
          <main className="flex-1 overflow-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout

