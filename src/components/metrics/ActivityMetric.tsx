import { BarChart } from 'lucide-react';

const activityData = [
  { region: 'North', value: 85 },
  { region: 'South', value: 65 },
  { region: 'East', value: 45 },
  { region: 'West', value: 75 },
];

export function ActivityMetric() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Activity by Region</h3>
        <BarChart className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {activityData.map((item) => (
          <div key={item.region} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{item.region}</span>
              <span className="font-medium">{item.value}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}