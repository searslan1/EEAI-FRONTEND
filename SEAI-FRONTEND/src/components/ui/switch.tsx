import React from 'react';

interface SwitchProps {
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ id, checked = false, onCheckedChange, className = '' }) => {
  return (
    <label htmlFor={id} className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className={`sr-only peer ${className}`}
      />
      <div
        className={`w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 
                    peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
                    after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all`}
      ></div>
    </label>
  );
};
