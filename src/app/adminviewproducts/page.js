"use client";

import { useEffect, useState } from "react"; 
import { Edit2, Trash2, Save, X, Package, Search, Filter, AlertTriangle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../helper/axiosInstance";
import Navbar from "../components/navbar/page";

export default function SunmicaList() {
  const [sunmicas, setSunmicas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch all products
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/sunmica");
      setSunmicas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditData({
      name: item.name,
      points: item.points,
      description: item.description,
      category: item.category,
    });
  };

  // Handle update
  const handleUpdate = async (id) => {
    try {
      await axiosInstance.put(`/sunmica/${id}`, editData);
      setEditingId(null);
      fetchData();
      toast.success("✅ Updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed!");
    }
  };

  // Handle open delete modal
  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axiosInstance.delete(`/sunmica/${deleteId}`);
      fetchData();
      toast.success("🗑️ Deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Delete failed!");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Handle change for inline edit
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Get unique categories
  const categories = ["all", ...new Set(sunmicas.map(item => item.category))];

  // Filter products
  const filteredSunmicas = sunmicas.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        success: { duration: 3000 },
        error: { duration: 4000 },
      }} />
      <Navbar />
        <div className="h-20 w-100" ></div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    All Products
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage your product inventory
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-blue-600">{sunmicas.length}</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="space-y-4">
            {filteredSunmicas.length > 0 ? (
              filteredSunmicas.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-48 h-48 md:h-auto flex-shrink-0 bg-gray-100">
                      <img
                        src={`https://api.mamtahardware.in/${item.images[0]}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      {editingId === item._id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Points
                              </label>
                              <input
                                type="number"
                                name="points"
                                value={editData.points}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                              </label>
                              <input
                                type="text"
                                name="category"
                                value={editData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <input
                                type="text"
                                name="description"
                                value={editData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => handleUpdate(item._id)}
                              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2.5 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-bold text-gray-800">
                                {item.name}
                              </h3>
                              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                {item.points} pts
                              </span>
                            </div>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2">
                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium">
                                  {item.category}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description || "No description available"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                              onClick={() => handleEdit(item)}
                              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleOpenDelete(item._id)}
                              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2.5 rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-500">
                  {searchTerm || filterCategory !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Start by adding your first product"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="text-center mb-6">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure?</h3>
              <p className="text-gray-600">You want to delete this item? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}