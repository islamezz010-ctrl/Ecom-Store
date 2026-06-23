// src/components/ui/Input.jsx
import { cn } from "../../lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}) {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        className
      )}
      {...props}
    />
  );
}
