import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

/**
 * Hook to use notifications throughout the app
 * Usage: const notify = useNotification();
 * notify.success('Item added to cart');
 * notify.error('Failed to update profile');
 * notify.warning('This action cannot be undone');
 * notify.info('Your order is being processed');
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return context;
};
