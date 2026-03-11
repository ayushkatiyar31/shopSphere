import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  // Determine if it's dark text visually based on system or explicit theme
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun size={22} className="animate-fade-in" /> : <Moon size={22} className="animate-fade-in" />}
    </button>
  )
}
