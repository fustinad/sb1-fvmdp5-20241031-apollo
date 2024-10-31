import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  ChevronDown, 
  ChevronRight,
  PieChart, 
  Map, 
  FileText,
  FolderOpen
} from 'lucide-react';

export function Sidebar() {
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false);

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          <button
            onClick={() => setIsDashboardExpanded(!isDashboardExpanded)}
            className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            <span className="flex-1 text-left">Dashboard</span>
            {isDashboardExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {isDashboardExpanded && (
            <div className="pl-11 space-y-1">
              <Link
                to="/"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Main Dashboard
              </Link>
              <Link
                to="/dash1"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Dash 1
              </Link>
              <Link
                to="/dash2"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Dash 2
              </Link>
              <Link
                to="/dash3"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Dash 3
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/charts"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <PieChart className="mr-3 h-5 w-5" />
          Charts
        </Link>
        
        <Link
          to="/maps"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Map className="mr-3 h-5 w-5" />
          Maps
        </Link>
        
        <Link
          to="/reports"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <FileText className="mr-3 h-5 w-5" />
          Reports
        </Link>

        <Link
          to="/files"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <FolderOpen className="mr-3 h-5 w-5" />
          File Management
        </Link>
      </nav>
    </aside>
  );
}