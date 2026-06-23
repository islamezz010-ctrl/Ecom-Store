// src/lib/adminApi.js
/**
 * Admin-specific API utility functions
 * Extends the main API utility with admin-specific endpoints
 */

import { API } from "./api";

export const AdminAPI = {
  // Dashboard endpoints
  dashboard: {
    getStats: () => API.get("/admin/dashboard/stats"),
    getSalesAnalytics: (period = "30days") =>
      API.get("/admin/dashboard/sales", { params: { period } }),
    getTopProducts: (limit = 10) =>
      API.get("/admin/dashboard/top-products", { params: { limit } }),
    getInventorySummary: () => API.get("/admin/dashboard/inventory-summary"),
  },

  // Products endpoints
  products: {
    getAll: (page = 1, limit = 20, search = "", category = "") =>
      API.get("/admin/products", {
        params: { page, limit, search, category },
      }),
    getById: (productId) => API.get(`/admin/products/${productId}`),
    create: (productData) => API.post("/admin/products", productData),
    update: (productId, productData) =>
      API.put(`/admin/products/${productId}`, productData),
    delete: (productId) => API.delete(`/admin/products/${productId}`),
    updateStock: (productId, stock) =>
      API.put(`/admin/products/${productId}/stock`, { stock }),
    getCategories: () => API.get("/admin/products/categories/list"),
    bulkUpdate: (productIds, updates) =>
      API.post("/admin/products/bulk/update", { productIds, updates }),
  },

  // Orders endpoints
  orders: {
    getAll: (page = 1, limit = 20, status = "", search = "") =>
      API.get("/admin/orders", {
        params: { page, limit, status, search },
      }),
    getById: (orderId) => API.get(`/admin/orders/${orderId}`),
    updateStatus: (orderId, status) =>
      API.put(`/admin/orders/${orderId}/status`, { status }),
    updateShippingAddress: (orderId, address) =>
      API.put(`/admin/orders/${orderId}/shipping-address`, address),
    cancel: (orderId) => API.delete(`/admin/orders/${orderId}`),
    getStats: () => API.get("/admin/orders/stats/summary"),
  },

  // Users endpoints
  users: {
    getAll: (page = 1, limit = 20, search = "", isAdmin = undefined) =>
      API.get("/admin/users", {
        params: { page, limit, search, isAdmin },
      }),
    getById: (userId) => API.get(`/admin/users/${userId}`),
    updateRole: (userId, isAdmin) =>
      API.put(`/admin/users/${userId}/role`, { isAdmin }),
    delete: (userId) => API.delete(`/admin/users/${userId}`),
    getCustomerSegments: () =>
      API.get("/admin/users/reports/customer-segments"),
  },
};

/**
 * Utility function to format currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Utility function to format date
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

/**
 * Utility function to format datetime
 */
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

/**
 * Utility function to get status badge color
 */
export const getStatusBadgeColor = (status) => {
  const colors = {
    pending: "bg-gray-100 text-gray-800",
    paid: "bg-purple-100 text-purple-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    admin: "bg-purple-100 text-purple-800",
    customer: "bg-blue-100 text-blue-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

/**
 * Utility function to calculate percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Utility function to format large numbers with K, M, B suffixes
 */
export const formatNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};
