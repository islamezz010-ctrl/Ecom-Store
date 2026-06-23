// src/components/admin/AdminLayout.jsx
import AdminNavigation from "./AdminNavigation";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminNavigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-12">
        <p>&copy; 2024 Store Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  );
}
