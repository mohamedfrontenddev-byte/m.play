import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Ecommerce
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <NavLink to="/store" label="Store" />
            <CartLink to="/cart" totalItems={totalItems} />
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <>
                <NavLink to="/profile" label="Profile" />
                <button 
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" label="Login" />
                <NavLink to="/register" label="Register" />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <MobileNavLink to="/store" label="Store" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/cart" label={`Cart (${totalItems})`} onClick={() => setMobileMenuOpen(false)} />
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/profile" label="Profile" onClick={() => setMobileMenuOpen(false)} />
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" label="Login" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/register" label="Register" onClick={() => setMobileMenuOpen(false)} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <Link 
    to={to}
    className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
  >
    {label}
  </Link>
);

const CartLink = ({ to, totalItems }) => (
  <Link 
    to={to}
    className="relative px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
  >
    Cart
    {totalItems > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-2 py-0.5 font-bold">
        {totalItems}
      </span>
    )}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link 
    to={to}
    onClick={onClick}
    className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
  >
    {label}
  </Link>
);

export default Navbar;