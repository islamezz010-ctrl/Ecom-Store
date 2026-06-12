import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api";
import { getCurrentUser, isAuthenticated } from "../lib/user";
import { Package, ChevronRight, AlertCircle } from "lucide-react";

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const user = getCurrentUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated()) return;

      try {
        setLoading(true);
        const response = await fetch(
          `${API}/api/orders?page=${page}&limit=10`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
        setTotalPages(data.pages);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 rounded bg-gray-200"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-gray-200"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Your Orders
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Hi {user?.name || "User"}, here are your orders
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-300">
              Error loading orders
            </h3>
            <p className="mt-1 text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 py-16 px-4 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No orders yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't placed any orders yet. Start shopping to see them here!
          </p>
          <a
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      page === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          )}

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
            Showing {orders.length} of {total} orders
          </p>
        </div>
      )}
    </main>
  );
};

// Order Card Component
function OrderCard({ order }) {
  const statusColors = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    paid: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    shipped:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    delivered:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const createdDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const statusColor = statusColors[order.status] || "bg-gray-100 text-gray-800";

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
          <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
            {order._id.substring(0, 12)}...
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Order Date
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {createdDate}
            </p>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColor}`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4 space-y-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Subtotal:</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Shipping:</span>
          <span>${order.shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <div className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-3">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
            Shipping Address
          </p>
          <p className="text-sm text-gray-900 dark:text-white font-medium">
            {order.shippingAddress.fullName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {order.shippingAddress.street}
            {order.shippingAddress.building &&
              `, ${order.shippingAddress.building}`}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {order.shippingAddress.cityArea},{" "}
            {order.shippingAddress.governorate}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {order.shippingAddress.mobile}
          </p>
        </div>
      )}

      {/* Action Button */}
      <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium">
        View Order Details
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Order;
