// src/components/admin/AdminLayout.jsx
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-64 flex flex-col min-h-screen">
        <div className="flex-1 p-8 max-w-7xl w-full mx-auto">{children}</div>
        <footer className="ml-64 bg-slate-900 text-slate-400 text-center py-4">
          <p>&copy; 2024 Store Admin Panel. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
