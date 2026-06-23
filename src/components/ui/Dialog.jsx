// src/components/ui/Dialog.jsx
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={() => onOpenChange?.(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export function DialogContent({ children, className }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      {children}
    </div>
  );
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function DialogClose({ onClick }) {
  return (
    <button onClick={onClick} className="text-gray-400 hover:text-gray-600">
      <X className="w-5 h-5" />
    </button>
  );
}

export function DialogBody({ children, className }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function DialogFooter({ children }) {
  return (
    <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
      {children}
    </div>
  );
}
