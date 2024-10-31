import React from 'react';
import { Moon, Sun, Bell, BellOff } from 'lucide-react';
import { useSettingsStore } from '../lib/store';
import { DashboardCard } from '../components/DashboardCard';

export function Settings() {
  const { theme, setTheme, notifications, setNotifications } = useSettingsStore();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <DashboardCard title="Appearance">
        <div className="mt-4">
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Theme</h3>
              <p className="text-sm text-gray-500">Choose your preferred theme</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-md flex items-center space-x-2 ${
                  theme === 'light'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sun className="h-5 w-5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-md flex items-center space-x-2 ${
                  theme === 'dark'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Moon className="h-5 w-5" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Notifications">
        <div className="mt-4">
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-500">Receive notifications about important updates</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`p-2 rounded-md flex items-center space-x-2 ${
                notifications
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {notifications ? (
                <>
                  <Bell className="h-5 w-5" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <BellOff className="h-5 w-5" />
                  <span>Disabled</span>
                </>
              )}
            </button>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}