import { Link } from 'react-router-dom';
import { Settings, User, LogOut } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export function Navbar() {
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {user?.email}
            </div>
            <Link
              to="/settings"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </Link>
            
            <Link
              to="/profile"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <User className="h-5 w-5" />
            </Link>
            
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}