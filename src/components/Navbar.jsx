import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../App'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass border-b border-fog/50 dark:border-stone-dark/30 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <img 
                src="/images/kidalogo2_1.jpg" 
                alt="KIDA Logo" 
                className="h-12 w-12 object-contain rounded-full"
              />
              <span className="font-display font-bold text-xl text-stanford-black dark:text-fog-light group-hover:text-cardinal transition-colors">
                KIDA
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-cardinal/10 text-cardinal dark:text-cardinal-light' 
                      : 'text-stanford-black dark:text-fog-light hover:bg-fog/50 dark:hover:bg-stone-dark/30'
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="ml-4 p-2 rounded-full hover:bg-fog/50 dark:hover:bg-stone-dark/30 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-fog-light" />
                ) : (
                  <Moon className="w-5 h-5 text-stanford-black" />
                )}
              </button>
              
              {/* CTA Button */}
              <a 
                href="https://www.instagram.com/stanford.kida/" 
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 btn btn-primary text-sm"
              >
                Follow Us
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-fog/50 dark:hover:bg-stone-dark/30 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-fog-light" />
                ) : (
                  <Moon className="w-5 h-5 text-stanford-black" />
                )}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-fog/50 dark:hover:bg-stone-dark/30 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-stanford-black dark:text-fog-light" />
                ) : (
                  <Menu className="w-6 h-6 text-stanford-black dark:text-fog-light" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-stanford-charcoal shadow-2xl"
            >
              <div className="p-6 pt-24">
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) => `
                          block px-4 py-3 rounded-xl text-lg font-medium transition-all
                          ${isActive 
                            ? 'bg-cardinal/10 text-cardinal' 
                            : 'text-stanford-black dark:text-fog-light hover:bg-fog/50 dark:hover:bg-stone-dark/30'
                          }
                        `}
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <a 
                    href="https://www.instagram.com/stanford.kida/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                  >
                    Follow Us on Instagram
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
