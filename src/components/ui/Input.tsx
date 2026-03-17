'use client';

import { forwardRef, InputHTMLAttributes, ElementType, ReactNode, isValidElement } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  // Accept either a Lucide component class or a pre-rendered JSX element
  icon?: ElementType | ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    const hasIcon = icon !== undefined && icon !== null;

    const renderIcon = () => {
      if (!hasIcon) return null;
      // If it's a valid React element (e.g. <User size={15} />), render as-is
      if (isValidElement(icon)) {
        return (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167] pointer-events-none flex items-center">
            {icon}
          </span>
        );
      }
      // Otherwise it's a component type (e.g. Mail, Lock)
      const IconComp = icon as ElementType;
      return (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167] pointer-events-none flex items-center">
          <IconComp size={16} />
        </span>
      );
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && <label className="text-sm font-medium text-[#1a1208]">{label}</label>}
        <div className="relative">
          {renderIcon()}
          <input
            ref={ref}
            className={`w-full ${hasIcon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 rounded-xl border text-sm outline-none transition-all
              ${error
                ? 'border-red-400 focus:border-red-500 bg-red-50'
                : 'border-[#e8e2d8] focus:border-brand bg-white hover:border-[#c8c0b4]'
              } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
