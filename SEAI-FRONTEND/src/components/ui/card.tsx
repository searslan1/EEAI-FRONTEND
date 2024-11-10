export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={`border border-gray-200 rounded-lg ${className}`}>{children}</div>;
  };
  
  export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={`p-4 border-b ${className}`}>{children}</div>;
  };
  
  export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
  };
  
  export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={`p-4 border-t ${className}`}>{children}</div>;
  };
  
  export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
  };
  
  export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
  };
  