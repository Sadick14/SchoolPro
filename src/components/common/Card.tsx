import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  variant?: 'glass' | 'solid' | 'outline';
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  headerAction,
  variant = 'glass' 
}) => {
  const baseClasses = "rounded-[2rem] overflow-hidden transition-all duration-300";
  const variants = {
    glass: "backdrop-blur-sm bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl",
    solid: "bg-white border border-gray-200 shadow-md",
    outline: "bg-transparent border border-gray-300"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {title && (
        <div className="px-8 py-5 flex justify-between items-center border-b border-gray-100 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50">
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h2>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-8">{children}</div>
    </motion.div>
  );
};

export default Card;