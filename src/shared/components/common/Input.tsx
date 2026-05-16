import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors text-gray-500 group-focus-within:text-primary-600">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full backdrop-blur-sm bg-white border-2 ${
              error ? 'border-error-500' : 'border-gray-200 group-focus-within:border-primary-500'
            } transition-all duration-300 rounded-2xl px-5 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 ${
              leftIcon ? 'pl-11' : ''
            } ${rightIcon ? 'pr-11' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 group-focus-within:text-primary-600 transition-colors">
              {rightIcon}
            </div>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 text-xs font-semibold text-error-600 ml-1"
            >
              {error}
            </motion.p>
          )}
          {helperText && !error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs text-gray-600 ml-1 font-medium"
            >
              {helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;