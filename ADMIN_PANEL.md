# Admin Panel Documentation

## Overview

A comprehensive admin panel has been implemented for the e-commerce store, providing full management capabilities for products, orders, customers, and system settings.

## Features

### 1. Dashboard

**Route:** `/admin`

The main dashboard provides:

- **Overview Statistics:**
  - Total Orders
  - Total Revenue
  - Total Products
  - Total Customers
  - Total Admin Users

- **Performance Metrics:**
  - Today's Orders & Revenue
  - Last 30 Days Orders & Revenue
  - Order Status Breakdown
  - Low Stock Alerts

- **Recent Orders Table:**
  - Shows last 10 orders with customer info
  - Status indicators with color coding
  - Quick action links

### 2. Product Management

**Route:** `/admin/products`

#### Features:

- **View All Products**
  - Pagination with 20 items per page
  - Search by product name or description
  - Sort by various fields
  - Filter by category

- **Create Products**
  - Modal form with fields:
    - Name (required)
    - Price (required)
    - Category
    - Stock Quantity
    - Description
    - Image URL

- **Edit Products**
  - Update any product field
  - Real-time validation
  - Quick stock updates

- **Delete Products**
  - Soft-delete (sets stock to 0)
  - Prevents customer confusion
  - Preserves order history

- **Additional Endpoints:**
  - Get all categories
  - Bulk update multiple products
  - Update stock directly

### 3. Order Management

**Route:** `/admin/orders`

#### Features:

- **View All Orders**
  - Pagination (20 per page)
  - Filter by status: pending, paid, shipped, delivered, cancelled
  - Search by order ID
  - Customer information display

- **Order Details**
  - Full order information
  - Customer details
  - Item list with quantities and prices
  - Shipping address
  - Order timeline

- **Update Order Status**
  - Validated state transitions:
    - pending → paid, cancelled
    - paid → shipped, cancelled
    - shipped → delivered
    - delivered & cancelled → locked
  - Prevents invalid status changes
  - Auto-sets paidAt timestamp

- **Manage Orders**
  - Update shipping address
  - Cancel orders (before delivery)
  - View full order history

### 4. Customer Management

**Route:** `/admin/users`

#### Features:

- **View All Customers**
  - Pagination (20 per page)
  - Search by name or email
  - Filter by role: All, Admin, Customers
  - Display customer statistics:
    - Total orders
    - Total spent
    - Join date

- **Customer Details**
  - Full customer profile
  - Order history
  - Spending statistics:
    - Total orders
    - Total spent
    - Average order value
  - Account creation date

- **User Management**
  - Promote customer to admin
  - Remove admin privileges
  - Delete customer accounts
  - Prevent self-demotion

- **Analytics**
  - Customer segmentation by spend
  - Identify VIP customers
  - Track customer lifetime value

### 5. Settings

**Route:** `/admin/settings`

Configuration options for:

- **Store Information:**
  - Store name
  - Contact email
  - Phone number
  - Physical address

- **Business Settings:**
  - Tax rate
  - Standard shipping cost
  - Minimum order value

- **Notifications:**
  - Email on new orders
  - Email on order shipped
  - Low stock alerts

## Backend API Endpoints

### Dashboard Endpoints

```
GET  /api/admin/dashboard/stats           - Dashboard statistics
GET  /api/admin/dashboard/sales          - Sales analytics
GET  /api/admin/dashboard/top-products   - Best-selling products
GET  /api/admin/dashboard/inventory-summary - Inventory overview
```

### Product Endpoints

```
GET    /api/admin/products                    - List products
GET    /api/admin/products/:id                - Get product
POST   /api/admin/products                    - Create product
PUT    /api/admin/products/:id                - Update product
PUT    /api/admin/products/:id/stock          - Update stock
DELETE /api/admin/products/:id                - Delete product
GET    /api/admin/products/categories/list    - Get categories
POST   /api/admin/products/bulk/update        - Bulk update
```

### Order Endpoints

```
GET    /api/admin/orders                      - List orders
GET    /api/admin/orders/:id                  - Get order
PUT    /api/admin/orders/:id/status           - Update status
PUT    /api/admin/orders/:id/shipping-address - Update address
DELETE /api/admin/orders/:id                  - Cancel order
GET    /api/admin/orders/stats/summary        - Order statistics
```

### User Endpoints

```
GET    /api/admin/users                       - List users
GET    /api/admin/users/:id                   - Get user details
PUT    /api/admin/users/:id/role              - Update user role
DELETE /api/admin/users/:id                   - Delete user
GET    /api/admin/users/reports/customer-segments - Customer analysis
```

## Authentication & Authorization

- **Requirement:** Admin users only (isAdmin flag must be true)
- **Protection:** All admin routes protected by `protect` and `requireAdmin` middleware
- **JWT Tokens:** Validated via httpOnly cookies (30-day expiry)
- **Self-Protection:** Cannot remove own admin status or delete own account

## Data Models

### Query Filters

Most endpoints support:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `search` - Text search on name/email/description
- `status` - Filter by status
- `category` - Filter by category
- `sort` - Sort field (e.g., -createdAt for descending)

### Status Transitions (Orders)

```
pending  ↓ → paid, cancelled
paid     ↓ → shipped, cancelled
shipped  ↓ → delivered
delivered ✓ (locked)
cancelled ✓ (locked)
```

## Frontend Components

### Core Components

- **AdminLayout** - Main layout wrapper with navigation
- **AdminNavigation** - Sidebar/header navigation
- **AdminTable** - Reusable data table with sorting/pagination
- **StatCard** - Statistics card display

### Admin Pages

- **AdminDashboard** - Main analytics dashboard
- **AdminProducts** - Product management
- **AdminOrders** - Order management
- **AdminUsers** - Customer management
- **AdminSettings** - System configuration

## Utility Functions

### AdminAPI (src/lib/adminApi.js)

Provides organized API calls:

```javascript
AdminAPI.dashboard.getStats();
AdminAPI.products.getAll(page, limit, search, category);
AdminAPI.orders.updateStatus(orderId, status);
AdminAPI.users.updateRole(userId, isAdmin);
```

### Helper Functions

```javascript
formatCurrency(amount); // Format as USD
formatDate(date); // Format date
formatDateTime(date); // Format date+time
getStatusBadgeColor(status); // Get CSS class for status
calculatePercentageChange(); // Calculate % change
formatNumber(num); // Format with K/M/B suffixes
```

## Admin Context

**Location:** `src/context/AdminContext.jsx`

Manages admin UI state:

```javascript
const { state, setFilter, setPage, setSort, setLoading, setError, setSuccess } =
  useAdmin();
```

**State:**

- Filters (page, limit, search, status, category)
- Sorting preferences
- UI state (loading, error, success messages)

## Security Considerations

1. **JWT Authentication:** All admin endpoints require valid JWT token
2. **Admin Verification:** Server checks `isAdmin` flag on User model
3. **Route Protection:** React Router AdminRoute wrapper validates client-side
4. **Action Validation:** Server enforces valid state transitions and operations
5. **Data Visibility:** Users only see their own data except admins
6. **Self-Protection:** Admins cannot remove own access or delete own accounts

## Usage Examples

### Access Admin Panel

1. Login with admin account (isAdmin: true)
2. Click "🔧 Admin Panel" in account menu
3. Navigate using sidebar menu

### Create a Product

1. Go to Products page
2. Click "Add Product" button
3. Fill in product details
4. Click "Create"

### Update Order Status

1. Go to Orders page
2. Click "Edit" on an order
3. Select new status from dropdown
4. Click "Update Status"

### Manage Users

1. Go to Customers page
2. Search or filter users
3. Click "Edit" to view details
4. Promote to admin or delete account

## Performance Optimizations

- **Pagination:** Large datasets paginated (20 items default)
- **Lean Queries:** MongoDB `.lean()` for read-only operations
- **Aggregation:** Complex analytics use MongoDB aggregation pipeline
- **Indexing:** Database indexes on frequently filtered fields
- **Caching:** Can be added to dashboard endpoints

## Future Enhancements

1. **Advanced Analytics:**
   - Revenue charts and graphs
   - Customer lifetime value analysis
   - Product performance metrics
   - Seasonal trends

2. **Bulk Operations:**
   - Bulk product imports
   - Batch order status updates
   - Bulk email campaigns

3. **Audit Logging:**
   - Track admin actions
   - Admin activity timeline
   - Change history

4. **Advanced Permissions:**
   - Role-based access control (RBAC)
   - Permission granularity
   - Team management

5. **Integrations:**
   - Third-party analytics
   - Email service integration
   - Inventory sync

## Troubleshooting

### Admin panel not showing

- Verify user has `isAdmin: true` in database
- Check browser console for JavaScript errors
- Clear browser cache and reload

### Orders not updating

- Verify valid status transition
- Check network tab for API errors
- Ensure order exists in database

### Products not saving

- Validate all required fields filled
- Check image URL is valid
- Review server logs for validation errors

### Permissions errors

- Re-authenticate (logout/login)
- Check JWT token expiration
- Verify user role in database

## Support

For issues or questions about the admin panel:

1. Check browser console for errors
2. Review server logs
3. Verify database connectivity
4. Check JWT token validity
