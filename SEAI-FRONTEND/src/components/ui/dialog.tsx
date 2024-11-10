import React, { ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string; // className prop'u eklendi
}

export const Dialog: React.FC<DialogProps> = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    {children}
  </div>
);

export const DialogTrigger: React.FC<{ asChild: boolean; children: ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const DialogContent: React.FC<DialogContentProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg p-6 max-w-lg w-full ${className}`}>
    {children}
  </div>
);

export const DialogHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mb-4 border-b pb-2">{children}</div>
);

export const DialogTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 flex justify-end">{children}</div>
);
