"use client"; 
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/page";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/app/helper/axiosInstance";
import { 
  Package, 
  User, 
  Mail, 
  Hash, 
  CheckCircle, 
  XCircle, 
  Loader2,
  ShoppingCart,
  Award,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function AdminProfile() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all pending requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/points/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data);
    } catch (err) {
      toast.error("Failed to load pending requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Open confirmation modal
  const handleAction = (id, action) => {
    setCurrentId(id);
    setCurrentAction(action);
    setShowModal(true);
  };

  // Confirm action
  const handleConfirm = async () => {
    if (!currentId || !currentAction) return;

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        currentAction === "approve"
          ? `/points/approve/${currentId}` 
          : `/points/reject/${currentId}`;

      await axiosInstance.put(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        currentAction === "approve"
          ? "✅ Request approved successfully!"
          : "❌ Request rejected!"
      );

      // Remove handled request from UI
      setRequests((prev) => prev.filter((r) => r._id !== currentId));
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setShowModal(false);
      setCurrentId(null);
      setCurrentAction(null);
    }
  };

  // Cancel action
  const handleCancel = () => {
    setShowModal(false);
    setCurrentId(null);
    setCurrentAction(null);
  };

  // Calculate statistics
  const totalRequests = requests.length;
  const totalPoints = requests.reduce((sum, req) => sum + (req.points * req.quantity), 0);
  const totalItems = requests.reduce((sum, req) => sum + req.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">
      <Navbar />
      <Toaster position="top-right" toastOptions={{
        success: { duration: 3000 },
        error: { duration: 4000 },
      }} />
      <div className="h-20 w-100" ></div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-[#047F05] rounded-xl shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Pending Requests
              </h1>
              <p className="text-gray-600 mt-1">Review and manage product redemption requests</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900">{totalRequests}</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total Points</p>
                  <p className="text-3xl font-bold text-[#047F05]">{totalPoints.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-green-100 rounded-xl">
                  <Award className="w-8 h-8 text-[#047F05]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total Items</p>
                  <p className="text-3xl font-bold text-purple-600">{totalItems}</p>
                </div>
                <div className="p-4 bg-purple-100 rounded-xl">
                  <ShoppingCart className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-[#047F05] animate-spin mb-4" />
            <p className="text-gray-600 text-lg font-medium">Loading pending requests...</p>
          </div>
        ) : requests.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Requests</h3>
            <p className="text-gray-500">All requests have been processed. Check back later for new submissions.</p>
          </div>
        ) : (
          // Requests Grid - 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large screens
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {requests.map((req) => {
              const totalPoints = req.points * req.quantity;

              return (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group flex flex-col"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-[#047F05] to-[#059607] p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-white flex-shrink-0" />
                        <h2 className="text-lg font-bold text-white line-clamp-1">
                          {req.productName}
                        </h2>
                      </div>
                    </div>
                    <p className="text-green-100 text-xs line-clamp-2 min-h-[2rem]">
                      {req.description}
                    </p>
                    <div className="mt-2">
                      <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                        <p className="text-white text-xs font-medium">Pending</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Points Information */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-2 text-center">
                        <TrendingUp className="w-4 h-4 text-[#047F05] mx-auto mb-1" />
                        <p className="text-[10px] text-green-700 font-medium mb-0.5">Total</p>
                        <p className="text-sm font-bold text-[#047F05]">{totalPoints}</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-2 text-center">
                        <ShoppingCart className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <p className="text-[10px] text-blue-700 font-medium mb-0.5">Qty</p>
                        <p className="text-sm font-bold text-blue-600">{req.quantity}</p>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-2 text-center">
                        <Award className="w-4 h-4 text-yellow-700 mx-auto mb-1" />
                        <p className="text-[10px] text-yellow-700 font-medium mb-0.5">Each</p>
                        <p className="text-sm font-bold text-yellow-700">{req.points}</p>
                      </div>
                    </div>

                    {/* User Information */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                        <span className="text-xs font-medium truncate">
                          {req.userId?.username || "Unknown User"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                        <span className="text-xs truncate">
                          {req.userId?.email || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Hash className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="text-[10px] font-mono truncate">
                          {req._id}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => handleAction(req._id, "approve")}
                        className="flex-1 bg-[#047F05] hover:bg-[#036804] text-white px-3 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 group"
                      >
                        <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Approve</span>
                        <span className="sm:hidden">✓</span>
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "reject")}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 group"
                      >
                        <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Reject</span>
                        <span className="sm:hidden">✗</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm {currentAction === "approve" ? "Accept" : "Reject"}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {currentAction === "approve" ? "accept" : "reject"} this request?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-[#047F05] hover:bg-[#036804] text-white rounded-lg font-semibold transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}