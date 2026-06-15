import { useContext } from "react";
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { NotificationContext } from "../context/NotificationContext";

const Toast = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  const getStyles = (type) => {
    const styles = {
      success: {
        bg: "bg-green-50 dark:bg-green-900/30",
        border: "border-green-200 dark:border-green-700",
        icon: CheckCircle,
        iconColor: "text-green-600 dark:text-green-400",
        text: "text-green-800 dark:text-green-300",
      },
      error: {
        bg: "bg-red-50 dark:bg-red-900/30",
        border: "border-red-200 dark:border-red-700",
        icon: AlertCircle,
        iconColor: "text-red-600 dark:text-red-400",
        text: "text-red-800 dark:text-red-300",
      },
      warning: {
        bg: "bg-yellow-50 dark:bg-yellow-900/30",
        border: "border-yellow-200 dark:border-yellow-700",
        icon: AlertTriangle,
        iconColor: "text-yellow-600 dark:text-yellow-400",
        text: "text-yellow-800 dark:text-yellow-300",
      },
      info: {
        bg: "bg-blue-50 dark:bg-blue-900/30",
        border: "border-blue-200 dark:border-blue-700",
        icon: Info,
        iconColor: "text-blue-600 dark:text-blue-400",
        text: "text-blue-800 dark:text-blue-300",
      },
    };

    return styles[type] || styles.info;
  };

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 max-w-md pointer-events-none">
      {notifications.map((notification) => {
        const style = getStyles(notification.type);
        const IconComponent = style.icon;

        return (
          <div
            key={notification.id}
            className={`
              flex items-start gap-3 rounded-lg border p-4
              ${style.bg} ${style.border}
              shadow-lg backdrop-blur-sm
              pointer-events-auto animate-slideInRight
            `}
            role="alert"
            aria-live="polite"
          >
            <IconComponent
              className={`h-5 w-5 mt-0.5 shrink-0 ${style.iconColor}`}
            />

            <p className={`text-sm font-medium ${style.text} flex-1`}>
              {notification.message}
            </p>

            <button
              onClick={() => removeNotification(notification.id)}
              className={`shrink-0 mt-0.5 transition-opacity hover:opacity-70 ${style.text}`}
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
