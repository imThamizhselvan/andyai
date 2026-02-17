import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

const navLinks = [
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Demos', path: '/demos' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/95 backdrop-blur-lg shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-black text-lg">
              A
            </div>
            <span className="text-xl font-bold text-white">
              Andy <span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <Link to="/sign-in" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn-primary text-sm !px-6 !py-3">
                Get Started Free
              </Link>
            </SignedOut>
            <SignedIn>
              <Link to="/app" className="btn-primary text-sm !px-6 !py-3">
                Dashboard
              </Link>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-navy/95 backdrop-blur-lg border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <SignedOut>
            <Link
              to="/sign-in"
              className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="block text-center btn-primary text-sm !py-3 mt-2"
            >
              Get Started Free
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              to="/app"
              className="block text-center btn-primary text-sm !py-3 mt-2"
            >
              Dashboard
            </Link>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}
