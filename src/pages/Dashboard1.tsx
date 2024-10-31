import { Card } from '@tremor/react';
import { BarChart, TrendingUp, Sliders } from 'lucide-react';
import { useState } from 'react';

export function Dashboard1() {
  const [filters, setFilters] = useState({
    revenueThreshold: 50000,
    customerSegment: 50,
    marketShare: 25,
    growthRate: 15,
    profitMargin: 30
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard 1</h1>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Business Levers</h3>
          <Sliders className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Revenue Threshold: ${filters.revenueThreshold.toLocaleString()}
            </label>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={filters.revenueThreshold}
              onChange={(e) => handleFilterChange('revenueThreshold', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Customer Segment: {filters.customerSegment}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={filters.customerSegment}
              onChange={(e) => handleFilterChange('customerSegment', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Market Share: {filters.marketShare}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.marketShare}
              onChange={(e) => handleFilterChange('marketShare', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Growth Rate: {filters.growthRate}%
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={filters.growthRate}
              onChange={(e) => handleFilterChange('growthRate', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profit Margin: {filters.profitMargin}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.profitMargin}
              onChange={(e) => handleFilterChange('profitMargin', Number(e.target.value))}
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
            <h3 className="text-lg font-medium">Sales Overview</h3>
            <BarChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue Growth</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </Card>
      </div>
    </div>
  );
}