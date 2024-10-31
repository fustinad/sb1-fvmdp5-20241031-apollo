import { Activity } from 'lucide-react';

const metrics = [
  { name: 'Conversion', value: '8.2%', change: '+2.1%', positive: true },
  { name: 'Engagement', value: '74%', change: '+5.3%', positive: true },
  { name: 'Bounce Rate', value: '21%', change: '-1.4%', positive: true },
];

export function PerformanceMetric() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance Metrics</h3>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">{metric.name}</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{metric.value}</span>
              <span className={`text-sm ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}