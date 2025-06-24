import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Import as Passport, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AppContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <Passport className="h-8 w-8 text-primary-800" />
              <span className="ml-2 text-xl font-bold text-primary-800">PassportEase</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/') ? 'text-primary-800' : 'text-gray-700 hover:text-primary-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/register" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/register') ? 'text-primary-800' : 'text-gray-700 hover:text-primary-600'}`}
            >
              Apply
            </Link>
            <Link 
              to="/status" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/status') ? 'text-primary-800' : 'text-gray-700 hover:text-primary-600'}`}
            >
              Check Status
            </Link>
            
            {isAdmin ? (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/admin/dashboard') ? 'text-primary-800' : 'text-gray-700 hover:text-primary-600'}`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/admin/login') ? 'text-primary-800' : 'text-gray-700 hover:text-primary-600'}`}
              >
                Admin
              </Link>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-primary-800 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/register"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/register') ? 'text-primary-800 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={closeMenu}
            >
              Apply
            </Link>
            <Link
              to="/status"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/status') ? 'text-primary-800 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={closeMenu}
            >
              Check Status
            </Link>
            
            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin/dashboard') ? 'text-primary-800 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin/login') ? 'text-primary-800 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={closeMenu}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;