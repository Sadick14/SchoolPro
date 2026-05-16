import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'accent' | 'secondary';
}

const colorMap = {
  primary: 'bg-amber-50 text-amber-700 ring-amber-100',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  accent: 'bg-blue-50 text-blue-700 ring-blue-100',
  secondary: 'bg-slate-50 text-slate-700 ring-slate-100',
};

const trendMap = {
  positive: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  negative: 'bg-red-50 text-red-700 ring-red-100',
  neutral: 'bg-slate-50 text-slate-600 ring-slate-100',
};

const StatCard: React.FC<StatCardProps> = ({ label, value, trend = '', icon, color = 'primary' }) => {
  const trendTone = trend.startsWith('+') ? 'positive' : trend.startsWith('-') ? 'negative' : 'neutral';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`rounded-2xl p-3 ring-1 ${colorMap[color]}`}>{icon}</div>
        {trend && (
          <div className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${trendMap[trendTone]}`}>
            {trendTone === 'positive' ? '▲' : trendTone === 'negative' ? '▼' : '●'} {trend}
          </div>
        )}
      </div>
      <div className="mt-5">
        <p className="text-3xl font-black tracking-tight text-gray-950">{value}</p>
        <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-gray-500">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
