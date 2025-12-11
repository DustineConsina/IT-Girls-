import { FC } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 p-2 rounded-md transition"
    >
      {theme === "light" ? <Moon size={20} className="text-black" /> : <Sun size={20} className="text-white" />}
    </button>
  );
};

export default ThemeToggle;
