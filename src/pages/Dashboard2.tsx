import { Card } from '@tremor/react';
import { Users, ShoppingCart, Sliders } from 'lucide-react';
import { useState } from 'react';

export function Dashboard2() {
  const [filters, setFilters] = useState({
    customerLifetime: 36,
    acquisitionCost: 1000,
    churnRate: 5,
    satisfactionScore: 85,
    engagementLevel: 70
  });
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  const handleFilterChange = (name: string, value: number) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setIsFiltersApplied(false);
  };

  const applyFilters = () => {
    setIsFiltersApplied(true);
    // In a real app, this would update the data
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard 2</h1>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Customer Levers</h3>
          <Sliders className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Customer Lifetime (months): {filters.customerLifetime}
            </label>
            <input
              type="range"
              min="1"
              max="120"
              step="1"
              value={filters.customerLifetime}
              onChange={(e) => handleFilterChange('customerLifetime', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Acquisition Cost: ${filters.acquisitionCost}
            </label>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={filters.acquisitionCost}
              onChange={(e) => handleFilterChange('acquisitionCost', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Churn Rate: {filters.churnRate}%
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="0.5"
              value={filters.churnRate}
              onChange={(e) => handleFilterChange('churnRate', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Satisfaction Score: {filters.satisfactionScore}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={filters.satisfactionScore}
              onChange={(e) => handleFilterChange('satisfactionScore', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Engagement Level: {filters.engagementLevel}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.engagementLevel}
              onChange={(e) => handleFilterChange('engagementLevel', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={applyFilters}
            className={`btn-primary ${!isFiltersApplied ? 'animate-pulse' : ''}`}
          >
            Apply Filters
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Customer Analytics</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Order Statistics</h3>
            <ShoppingCart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </Card>
      </div>
    </div>
  );
}