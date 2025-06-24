import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="page-container">
      <div className="max-w-md mx-auto text-center py-12">
        <FileQuestion className="h-20 w-20 text-gray-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;