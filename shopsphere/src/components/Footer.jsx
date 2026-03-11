import { Link } from "react-router-dom"
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Button } from "./ui/Button"
import { useContext, useState } from "react"
import { ToastContext } from "../context/ToastContext"

export default function Footer() {
  const { addToast } = useContext(ToastContext)
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    addToast({
      title: "Subscribed Successfully!",
      description: "Welcome to the ShopSphere newsletter.",
      type: "success"
    })
    setEmail("")
  }

  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group shrink-0 w-max">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] transition">
                <ShoppingBag size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                ShopSphere
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              Experience the pinnacle of premium e-commerce. Curated products designed to elevate your everyday lifestyle.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md pt-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <Button type="submit" className="shrink-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100">Subscribe</Button>
            </form>
          </div>

          {/* Links: Shop */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Shop</h3>
            <ul className="space-y-3">
              {['New Arrivals', 'Best Sellers', 'Electronics', 'Fashion', 'Accessories'].map(link => (
                <li key={link}>
                  <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(link => (
                <li key={link}>
                  <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}