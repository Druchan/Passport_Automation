import React from 'react';
import { Link } from 'react-router-dom';
import { Import as Passport } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <Passport className="h-8 w-8 text-primary-800" />
            <span className="ml-2 text-xl font-bold text-primary-800">PassportEase</span>
          </div>
          
          <div className="mt-8 md:mt-0">
            <nav className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link to="/" className="text-sm text-gray-600 hover:text-primary-800 transition-colors">
                Home
              </Link>
              <Link to="/register" className="text-sm text-gray-600 hover:text-primary-800 transition-colors">
                Apply
              </Link>
              <Link to="/status" className="text-sm text-gray-600 hover:text-primary-800 transition-colors">
                Check Status
              </Link>
              <Link to="/admin/login" className="text-sm text-gray-600 hover:text-primary-800 transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} PassportEase. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center mt-2">
            This is a demo application and not for official use.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;