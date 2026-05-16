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
  primary: 'bg-primary-100 text-primary-600',
  success: 'bg-success-100 text-success-600',
  accent: 'bg-accent-100 text-accent-600',
  secondary: 'bg-secondary-100 text-secondary-700',
};

const StatCard: React.FC<StatCardProps> = ({ label, value, trend = '', icon, color = 'primary' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorMap[color]} transition-colors`}>{icon}</div>
        <div className={`flex items-center text-xs font-bold ${trend.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
          {trend.startsWith('+') ? <span className="mr-1">▲</span> : <span className="mr-1">▼</span>}
          {trend}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-black text-gray-900">{value}</p>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
