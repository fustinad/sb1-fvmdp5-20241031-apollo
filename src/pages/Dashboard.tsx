import { useState } from 'react';
import { Download, Printer, Sliders } from 'lucide-react';
import { ZipcodeMap } from '../components/ZipcodeMap';
import { ActivityMetric } from '../components/metrics/ActivityMetric';
import { GrowthMetric } from '../components/metrics/GrowthMetric';
import { PerformanceMetric } from '../components/metrics/PerformanceMetric';
import { DataTable } from '../components/DataTable';
import { logger } from '../lib/logger';

// Sample data - in a real app, this would come from an API
const sampleData = [
  { zipcode: '10001', value: 85, coordinates: [40.7506, -73.9971] },
  { zipcode: '90210', value: 65, coordinates: [34.1030, -118.4105] },
  { zipcode: '60601', value: 45, coordinates: [41.8857, -87.6229] },
  { zipcode: '33139', value: 25, coordinates: [25.7826, -80.1340] },
];

const insights = [
  'High activity in New York area',
  'Moderate growth in Los Angeles',
  'Steady performance in Chicago',
  'Emerging market in Miami',
];

export function Dashboard() {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    confidenceLevel: 95,
    sampleSize: 1000,
    marginOfError: 5,
    responseRate: 50,
    significanceLevel: 0.05
  });
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  const handleFilterChange = (name: string, value: number) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setIsFiltersApplied(false);
  };

  const applyFilters = () => {
    logger.info('Applying filters', filters);
    setIsFiltersApplied(true);
  };

  const handleExport = async () => {
    try {
      logger.info('Starting data export');
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Zipcode,Value\n" +
        sampleData.map(row => `${row.zipcode},${row.value}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "dashboard_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      logger.info('Data export completed successfully');
    } catch (error) {
      logger.error('Data export failed', error);
      setError('Failed to export data. Please try again.');
    }
  };

  const handlePrint = () => {
    try {
      logger.info('Initiating print operation');
      window.print();
      logger.info('Print operation completed');
    } catch (error) {
      logger.error('Print operation failed', error);
      setError('Failed to print. Please try again.');
    }
  };

  const handleInsightSelect = (insight: string) => {
    try {
      logger.info('Selecting insight', { insight });
      setSelectedInsight(insight === selectedInsight ? null : insight);
    } catch (error) {
      logger.error('Insight selection failed', error);
      setError('Failed to select insight. Please try again.');
    }
  };

  const filteredData = selectedInsight
    ? sampleData.filter((_, index) => insights[index] === selectedInsight)
    : sampleData;

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={handleExport}
            className="btn-secondary inline-flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="btn-secondary inline-flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Analysis Levers</h3>
          <Sliders className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confidence Level: {filters.confidenceLevel}%
            </label>
            <input
              type="range"
              min="90"
              max="99"
              step="1"
              value={filters.confidenceLevel}
              onChange={(e) => handleFilterChange('confidenceLevel', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sample Size: {filters.sampleSize}
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={filters.sampleSize}
              onChange={(e) => handleFilterChange('sampleSize', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Margin of Error: {filters.marginOfError}%
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={filters.marginOfError}
              onChange={(e) => handleFilterChange('marginOfError', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Response Rate: {filters.responseRate}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.responseRate}
              onChange={(e) => handleFilterChange('responseRate', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Significance Level: {filters.significanceLevel}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.1"
              step="0.01"
              value={filters.significanceLevel}
              onChange={(e) => handleFilterChange('significanceLevel', Number(e.target.value))}
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
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <button
              key={insight}
              onClick={() => handleInsightSelect(insight)}
              className={`p-4 rounded-md text-left transition-colors ${
                selectedInsight === insight
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-2 border-blue-500'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {insight}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Geographic Distribution</h3>
        <ZipcodeMap 
          data={filteredData} 
          selectedInsight={selectedInsight}
          filters={filters}
          isFiltersApplied={isFiltersApplied}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActivityMetric />
        <GrowthMetric />
        <PerformanceMetric />
      </div>

      <DataTable data={filteredData} />
    </div>
  );
}