// src/components/ui/Tabs.jsx
import { useState } from "react";
import { cn } from "../../lib/utils";

export function Tabs({ defaultValue, onValueChange, children, className }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className={className}>
      {typeof children === "function"
        ? children(value, handleChange)
        : children}
    </div>
  );
}

export function TabsList({ children, className }) {
  return <div className={cn("flex gap-1", className)}>{children}</div>;
}

export function TabsTrigger({ value, onClick, active, children, className }) {
  return (
    <button
      onClick={() => onClick?.(value)}
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors text-sm",
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100",
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeValue, children, className }) {
  return value === activeValue ? (
    <div className={className}>{children}</div>
  ) : null;
}
