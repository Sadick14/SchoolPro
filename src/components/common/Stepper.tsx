import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  variant?: 'horizontal' | 'vertical';
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick, variant = 'horizontal' }) => {
  if (variant === 'vertical') {
    return (
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isComplete = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isComplete
                      ? 'bg-green-600 text-white'
                      : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isComplete ? <Check size={18} /> : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-1 h-12 ${isComplete || isCurrent ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
                )}
              </div>

              {/* Step content */}
              <div className="pt-1 flex-1">
                <h3
                  className={`font-semibold text-lg ${
                    isCurrent ? 'text-blue-600' : isComplete ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal stepper
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, idx) => {
          const isComplete = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isClickable = onStepClick && idx <= currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step dot */}
              <button
                onClick={() => isClickable && onStepClick?.(idx)}
                disabled={!isClickable}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  isComplete
                    ? 'bg-green-600 text-white'
                    : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                      : 'bg-gray-200 text-gray-600'
                } ${isClickable ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'}`}
              >
                {isComplete ? <Check size={18} /> : idx + 1}
              </button>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    isComplete || (isCurrent && idx < currentStep) ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step labels */}
      <div className="flex items-start justify-between">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex-1">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-700">
              {step.title}
            </h4>
            {step.description && (
              <p className="text-xs text-gray-500 mt-1">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
