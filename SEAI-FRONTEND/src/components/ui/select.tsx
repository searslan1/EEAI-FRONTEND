import React, { createContext, useContext, ReactNode } from 'react';

interface SelectContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className }) => (
  <button className={`w-full py-2 px-4 border border-gray-300 rounded ${className || ''}`}>
    {children}
  </button>
);

interface SelectValueProps {
  placeholder: string;
  className?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder, className }) => (
  <span className={className}>{placeholder}</span>
);

interface SelectContentProps {
  children: ReactNode;
  className?: string;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => (
  <div className={`absolute mt-1 bg-white border border-gray-300 rounded w-full ${className || ''}`}>
    {children}
  </div>
);

interface SelectItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, className }) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("SelectItem must be used within a Select component");
  }

  const { onValueChange } = context;

  return (
    <div
      onClick={() => onValueChange(value)}
      className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${className || ''}`}
    >
      {children}
    </div>
  );
};
