import React from 'react';
import { Card, Title, Text } from '@tremor/react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  onExport?: () => void;
  onPrint?: () => void;
}

export function DashboardCard({ title, children, onExport, onPrint }: DashboardCardProps) {
  return (
    <Card className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <Title>{title}</Title>
        <div className="space-x-2">
          {onExport && (
            <button
              onClick={onExport}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Export CSV
            </button>
          )}
          {onPrint && (
            <button
              onClick={onPrint}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Print PDF
            </button>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
}