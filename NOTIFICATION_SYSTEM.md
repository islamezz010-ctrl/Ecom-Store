# Custom Notification System

A modern, customizable toast notification system that replaces browser `alert()` popups.

## Features

✅ Success, Error, Warning, and Info notification types  
✅ Dark mode support  
✅ Auto-dismiss with customizable duration  
✅ Smooth animations  
✅ Accessible with ARIA labels  
✅ Easy to use hook-based API

## Setup

The notification system is already integrated in your app:

1. **NotificationProvider** wraps the entire app (see App.jsx)
2. **Toast component** displays notifications (at top-right)
3. **useNotification hook** provides access to the API

## Usage

### Basic Example

```jsx
import { useNotification } from "../hooks/useNotification";

function MyComponent() {
  const notify = useNotification();

  return (
    <button onClick={() => notify.success("Item added!")}>Add to Cart</button>
  );
}
```

### Notification Types

```jsx
const notify = useNotification();

// Success notification (green)
notify.success("Profile updated successfully");

// Error notification (red)
notify.error("Failed to load products");

// Warning notification (yellow)
notify.warning("This action cannot be undone");

// Info notification (blue)
notify.info("Your order is being processed");
```

### Custom Duration

```jsx
// Auto-dismiss after 3 seconds (default: 4000ms)
notify.success("Quick notification", 3000);

// Keep visible indefinitely (pass 0 or negative number)
notify.warning("Important message", 0);

// Close after 10 seconds
notify.info("Long notification", 10000);
```

## Replacing alert() Calls

### Before (Browser Alert)

```jsx
alert("Item added to cart");
alert("Error: Invalid email");
alert("Are you sure?");
```

### After (Custom Notifications)

```jsx
notify.success("Item added to cart");
notify.error("Error: Invalid email");
notify.warning("This action cannot be undone");
```

## Examples from Your App

### In Cart.jsx

**Before:**

```jsx
alert("Checkout failed: " + (errorData.message || "Unknown error"));
```

**After:**

```jsx
const notify = useNotification();
notify.error("Checkout failed: " + (errorData.message || "Unknown error"));
```

### In Login.jsx

**Before:**

```jsx
alert("Login successful!");
alert("Login failed");
```

**After:**

```jsx
const notify = useNotification();
notify.success("Login successful!");
notify.error("Login failed");
```

## API Reference

### useNotification() Hook

Returns an object with:

| Method                                      | Parameters                | Description                   |
| ------------------------------------------- | ------------------------- | ----------------------------- |
| `success(message, duration?)`               | `string, number?`         | Show success notification     |
| `error(message, duration?)`                 | `string, number?`         | Show error notification       |
| `warning(message, duration?)`               | `string, number?`         | Show warning notification     |
| `info(message, duration?)`                  | `string, number?`         | Show info notification        |
| `addNotification(message, type, duration?)` | `string, string, number?` | Manual control                |
| `removeNotification(id)`                    | `number`                  | Manually close a notification |

## Customization

### Change Toast Position

Edit [Toast.jsx](../components/Toast.jsx), change the `fixed` classes:

```jsx
// Top-right (current)
<div className="fixed top-24 right-4 z-50 ...">

// Top-left
<div className="fixed top-24 left-4 z-50 ...">

// Bottom-right
<div className="fixed bottom-4 right-4 z-50 ...">
```

### Modify Colors

Edit `getStyles()` function in [Toast.jsx](../components/Toast.jsx):

```jsx
success: {
  bg: 'bg-green-50 dark:bg-green-900/30',
  border: 'border-green-200 dark:border-green-700',
  // ... customize colors
}
```

### Change Animation

Edit the `animate-in` classes:

```jsx
// Currently: fade-in + slide-in-from-right
// Options: fade-out, slide-out-to-right, etc.
className = "... animate-in fade-in slide-in-from-right-4 ...";
```

## Keyboard Support

- **ESC key**: Planned feature to dismiss all notifications
- **Click X button**: Manually dismiss individual notifications

## Browser Support

Works in all modern browsers that support:

- React 16.8+ (Hooks)
- ES6+
- CSS animations

## Tips

1. **For async operations**, show a loading state first, then success/error:

```jsx
notify.info("Loading...");
// ... fetch data
notify.success("Data loaded");
```

2. **For form validation**, use warnings:

```jsx
if (!email) notify.warning("Email is required");
```

3. **For important errors**, use longer duration:

```jsx
notify.error("Payment failed. Please try again.", 6000);
```

4. **Group related notifications** for better UX:

```jsx
notify.success("Added 3 items to cart");
// Instead of showing 3 separate notifications
```

## Files Modified

- `src/App.jsx` - Added NotificationProvider and Toast
- `src/context/NotificationContext.jsx` - Context for state management
- `src/components/Toast.jsx` - Visual component
- `src/hooks/useNotification.js` - Hook for easy access
- `src/hooks/notificationHelpers.js` - Helper utilities

## Next Steps

1. Replace all `alert()` calls with custom notifications
2. Test notifications on different pages
3. Adjust colors/position to match your design
4. Add keyboard shortcuts (ESC to dismiss)
