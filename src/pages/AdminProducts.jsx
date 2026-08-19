// src/pages/AdminProducts.jsx
import { useCallback, useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import { API } from "../lib/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
} from "../components/ui/Dialog";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/admin/products", {
        params: { page: currentPage, limit: 20, search },
      });
      setProducts(response.data.products || []);
      setTotalPages(response.data.pages || 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchProducts, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Delete product "${product.name}"?`)) {
      try {
        await API.delete(`/admin/products/${product._id}`);
        fetchProducts();
        // Trigger event to refresh home page
        window.dispatchEvent(new Event("products:updated"));
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      image: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaveLoading(true);
      if (selectedProduct) {
        await API.put(`/admin/products/${selectedProduct._id}`, formData);
      } else {
        const response = await API.post("/admin/products", formData);
        console.log("Product created:", response.data);
      }
      // Trigger event for other components to refresh
      window.dispatchEvent(new Event("products:updated"));
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert(error.message || "Failed to save product");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-2">Manage your product inventory</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border-none focus:ring-0"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No products found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 font-semibold">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogClose onClick={handleCloseModal} />
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <DialogBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Product Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Price *
                  </label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Stock *
                  </label>
                  <Input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleFormChange}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Category *
                </label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  placeholder="e.g., Electronics, Fashion"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Image URL
                </label>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  placeholder="https://..."
                />
                {formData.image && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={formData.image}
                      alt="preview"
                      className="max-w-xs max-h-48 rounded-lg object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Enter product description..."
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </DialogBody>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                disabled={saveLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saveLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saveLoading
                  ? "Saving..."
                  : selectedProduct
                    ? "Update Product"
                    : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
