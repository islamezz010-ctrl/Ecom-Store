// src/pages/AdminUsers.jsx
import { useEffect, useState } from "react";
import { Search, Eye, Shield, ShieldOff } from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminTable from "../components/admin/AdminTable";
import { API } from "../lib/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/admin/users", {
        params: {
          page: currentPage,
          limit: 20,
          search: search || undefined,
          isAdmin: roleFilter ? roleFilter === "admin" : undefined,
        },
      });
      setUsers(response.data.users);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (user) => {
    try {
      const response = await API.get(`/admin/users/${user._id}`);
      setSelectedUser(response.data.user);
      setShowDetails(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    try {
      await API.put(`/admin/users/${userId}/role`, {
        isAdmin: !currentIsAdmin,
      });
      fetchUsers();
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser({ ...selectedUser, isAdmin: !currentIsAdmin });
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user account?")) {
      try {
        await API.delete(`/admin/users/${userId}`);
        setShowDetails(false);
        setSelectedUser(null);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">
          Manage customer accounts and permissions
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 outline-none text-gray-900"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Users</option>
          <option value="admin">Admin Users</option>
          <option value="customer">Customers</option>
        </select>
      </div>

      {/* Users Table */}
      <AdminTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          {
            key: "isAdmin",
            label: "Role",
            render: (v) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  v
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {v ? "Admin" : "Customer"}
              </span>
            ),
          },
          { key: "orders", label: "Orders" },
          {
            key: "totalSpent",
            label: "Total Spent",
            render: (v) => `$${v.toFixed(2)}`,
          },
          {
            key: "createdAt",
            label: "Joined",
            render: (v) => new Date(v).toLocaleDateString(),
          },
        ]}
        data={users}
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
      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedUser.name}
            </h2>

            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {selectedUser.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p
                    className={`font-semibold px-3 py-1 rounded-full text-sm inline-block ${
                      selectedUser.isAdmin
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedUser.isAdmin ? "Admin" : "Customer"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Joined</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {selectedUser.picture && (
                  <div>
                    <p className="text-sm text-gray-600">Profile</p>
                    <img
                      src={selectedUser.picture}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Customer Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedUser.orders || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${selectedUser.totalSpent?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-purple-600">
                    $
                    {selectedUser.orders > 0
                      ? (selectedUser.totalSpent / selectedUser.orders).toFixed(
                          2,
                        )
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() =>
                  handleToggleAdmin(selectedUser._id, selectedUser.isAdmin)
                }
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white ${
                  selectedUser.isAdmin
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {selectedUser.isAdmin ? (
                  <>
                    <ShieldOff className="w-4 h-4" />
                    Remove Admin
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Make Admin
                  </>
                )}
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser._id)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
