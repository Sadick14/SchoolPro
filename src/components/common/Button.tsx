import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'glass' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-400/30',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm',
    success: 'bg-success-500 hover:bg-success-600 text-white shadow-lg shadow-success-500/30',
    danger: 'bg-error-500 hover:bg-error-600 text-white shadow-lg shadow-error-500/30',
    warning: 'bg-warning-500 hover:bg-warning-600 text-white shadow-lg shadow-warning-500/30',
    glass: 'backdrop-blur-sm bg-white/70 hover:bg-white/80 border border-gray-200 text-gray-800',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-xl',
    md: 'px-6 py-3 text-sm rounded-2xl',
    lg: 'px-8 py-4 text-base rounded-3xl',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center font-bold transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100
        ${variantClasses[variant]} ${sizeClasses[size]} 
        ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;