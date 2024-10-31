import { Card } from '@tremor/react';
import { Globe, Clock, Sliders } from 'lucide-react';
import { useState } from 'react';

export function Dashboard3() {
  const [filters, setFilters] = useState({
    timeWindow: 24,
    dataFrequency: 60,
    anomalyThreshold: 2,
    predictionInterval: 12,
    confidenceLevel: 95
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard 3</h1>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Time Series Levers</h3>
          <Sliders className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Window (hours): {filters.timeWindow}
            </label>
            <input
              type="range"
              min="1"
              max="168"
              step="1"
              value={filters.timeWindow}
              onChange={(e) => handleFilterChange('timeWindow', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Frequency (seconds): {filters.dataFrequency}
            </label>
            <input
              type="range"
              min="1"
              max="3600"
              step="1"
              value={filters.dataFrequency}
              onChange={(e) => handleFilterChange('dataFrequency', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Anomaly Threshold (σ): {filters.anomalyThreshold}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={filters.anomalyThreshold}
              onChange={(e) => handleFilterChange('anomalyThreshold', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prediction Interval (hours): {filters.predictionInterval}
            </label>
            <input
              type="range"
              min="1"
              max="72"
              step="1"
              value={filters.predictionInterval}
              onChange={(e) => handleFilterChange('predictionInterval', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confidence Level: {filters.confidenceLevel}%
            </label>
            <input
              type="range"
              min="80"
              max="99"
              step="1"
              value={filters.confidenceLevel}
              onChange={(e) => handleFilterChange('confidenceLevel', Number(e.target.value))}
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
            <h3 className="text-lg font-medium">Global Metrics</h3>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Real-time Data</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </Card>
      </div>
    </div>
  );
}