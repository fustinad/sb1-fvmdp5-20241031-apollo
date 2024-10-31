import { TrendingUp } from 'lucide-react';

const growthData = [
  { month: 'Jan', value: 45 },
  { month: 'Feb', value: 52 },
  { month: 'Mar', value: 48 },
  { month: 'Apr', value: 58 },
  { month: 'May', value: 62 },
];

export function GrowthMetric() {
  const maxValue = Math.max(...growthData.map(d => d.value));
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Growth Trends</h3>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>
      <div className="h-48 flex items-end justify-between space-x-2">
        {growthData.map((item) => (
          <div key={item.month} className="flex flex-col items-center space-y-2">
            <div
              className="w-8 bg-blue-600 rounded-t"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.month}</span>
            <span className="text-sm font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}