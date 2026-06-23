// src/pages/AdminOrders.jsx
import { useEffect, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminTable from "../components/admin/AdminTable";
import { API } from "../lib/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get("/admin/orders", {
        params: {
          page: currentPage,
          limit: 20,
          status: statusFilter || undefined,
        },
      });
      setOrders(response.data.orders);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (order) => {
    try {
      const response = await API.get(`/admin/orders/${order._id}`);
      setSelectedOrder(response.data);
      setNewStatus(response.data.status);
      setShowDetails(true);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  };

  const handleStatusUpdate = async () => {
    if (newStatus === selectedOrder.status) {
      alert("Please select a different status");
      return;
    }

    try {
      await API.put(`/admin/orders/${selectedOrder._id}/status`, {
        status: newStatus,
      });
      setShowDetails(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await API.delete(`/admin/orders/${orderId}`);
        setShowDetails(false);
        setSelectedOrder(null);
        fetchOrders();
      } catch (error) {
        console.error("Failed to cancel order:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-gray-100 text-gray-800",
      paid: "bg-purple-100 text-purple-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getValidTransitions = (status) => {
    const transitions = {
      pending: ["paid", "cancelled"],
      paid: ["shipped", "cancelled"],
      shipped: ["delivered"],
      delivered: [],
      cancelled: [],
    };
    return transitions[status] || [];
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <AdminTable
        columns={[
          {
            key: "_id",
            label: "Order ID",
            render: (v) => v.toString().slice(-8).toUpperCase(),
          },
          { key: "user", label: "Customer", render: (v) => v?.name || "N/A" },
          {
            key: "total",
            label: "Total",
            render: (v) => `$${v.toFixed(2)}`,
          },
          {
            key: "status",
            label: "Status",
            render: (v) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(v)}`}
              >
                {v}
              </span>
            ),
          },
          {
            key: "createdAt",
            label: "Date",
            render: (v) => new Date(v).toLocaleDateString(),
          },
        ]}
        data={orders}
        onEdit={handleViewDetails}
      />

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-white text-gray-900 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-900">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-white text-gray-900 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order #{selectedOrder._id.toString().slice(-8).toUpperCase()}
            </h2>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold text-gray-900">
                    {selectedOrder.user?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.user?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p
                    className={`font-semibold px-3 py-1 rounded-full text-sm inline-block ${getStatusColor(selectedOrder.status)}`}
                  >
                    {selectedOrder.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Items
              </h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between bg-gray-50 p-3 rounded"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Shipping Address
              </h3>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-900">
                  {selectedOrder.shippingAddress.address}
                </p>
                <p className="text-gray-900">
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.state}{" "}
                  {selectedOrder.shippingAddress.zipcode}
                </p>
                <p className="text-gray-900">
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Status Update */}
            {getValidTransitions(selectedOrder.status).length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={selectedOrder.status}>
                    {selectedOrder.status}
                  </option>
                  {getValidTransitions(selectedOrder.status).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300"
              >
                Close
              </button>
              {newStatus !== selectedOrder.status && (
                <button
                  onClick={handleStatusUpdate}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update Status
                </button>
              )}
              {selectedOrder.status !== "delivered" &&
                selectedOrder.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancelOrder(selectedOrder._id)}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
