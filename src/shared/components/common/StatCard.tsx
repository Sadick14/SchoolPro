import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'accent' | 'secondary';
}

const colorMap = {
  primary: 'bg-blue-50 text-blue-600',
  success: 'bg-green-50 text-green-600',
  accent: 'bg-amber-50 text-amber-600',
  secondary: 'bg-gray-50 text-gray-600',
};

const trendMap = {
  positive: 'text-green-600',
  negative: 'text-red-600',
  neutral: 'text-gray-600',
};

const StatCard: React.FC<StatCardProps> = ({ label, value, trend = '', icon, color = 'primary' }) => {
  const trendTone = trend.startsWith('+') ? 'positive' : trend.startsWith('-') ? 'negative' : 'neutral';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div className={`rounded-lg p-2 ${colorMap[color]}`}>{icon}</div>
        {trend && (
          <div className={`text-xs font-semibold ${trendMap[trendTone]}`}>
            {trendTone === 'positive' ? '↑' : trendTone === 'negative' ? '↓' : '●'} {trend}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="mt-1 text-xs font-medium text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
