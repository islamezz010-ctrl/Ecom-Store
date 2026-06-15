import { createContext, useState, useCallback, useRef } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const timersRef = useRef({});

  const removeNotification = useCallback((id) => {
    // Clear the timer for this notification
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const addNotification = useCallback(
    (message, type = "info", duration = 4000) => {
      // Check if a notification with the same message and type already exists
      setNotifications((prev) => {
        const existingNotification = prev.find(
          (notif) => notif.message === message && notif.type === type,
        );

        // If it exists, remove it first (clear its timer too)
        if (existingNotification) {
          if (timersRef.current[existingNotification.id]) {
            clearTimeout(timersRef.current[existingNotification.id]);
            delete timersRef.current[existingNotification.id];
          }
        }

        // Filter out the existing notification and add the new one
        const filtered = prev.filter(
          (notif) => !(notif.message === message && notif.type === type),
        );

        const id = Date.now() + Math.random(); // Ensure unique IDs even with rapid clicks
        const notification = { id, message, type };

        if (duration > 0) {
          timersRef.current[id] = setTimeout(() => {
            removeNotification(id);
          }, duration);
        }

        return [...filtered, notification];
      });
    },
    [removeNotification],
  );

  const success = useCallback(
    (message, duration) => addNotification(message, "success", duration),
    [addNotification],
  );
  const error = useCallback(
    (message, duration) => addNotification(message, "error", duration),
    [addNotification],
  );
  const warning = useCallback(
    (message, duration) => addNotification(message, "warning", duration),
    [addNotification],
  );
  const info = useCallback(
    (message, duration) => addNotification(message, "info", duration),
    [addNotification],
  );

  const clearAllNotifications = useCallback(() => {
    // Clear all timers
    Object.keys(timersRef.current).forEach((id) => {
      clearTimeout(timersRef.current[id]);
    });
    timersRef.current = {};
    // Clear all notifications
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
