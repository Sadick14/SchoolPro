import React from 'react';

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
  variant = 'solid' 
}) => {
  const baseClasses = "rounded-lg overflow-hidden transition-all duration-200";
  const variants = {
    glass: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
    solid: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
    outline: "bg-transparent border border-gray-300"
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {title && (
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 bg-white">
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;