import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";

/**
 * Component that clears all notifications when the route changes
 * Must be placed inside the Router component
 */
const NotificationClearer = () => {
  const location = useLocation();
  const { clearAllNotifications } = useContext(NotificationContext);

  useEffect(() => {
    // Clear notifications whenever the route changes
    clearAllNotifications();
  }, [location.pathname, clearAllNotifications]);

  return null; // This component doesn't render anything
};

export default NotificationClearer;
