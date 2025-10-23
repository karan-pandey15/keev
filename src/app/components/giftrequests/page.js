"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/helper/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Gift, CheckCircle, XCircle, Clock, User, Mail, Coins } from "lucide-react";
import Navbar from "../navbar/page";
import Footer from "../footer/page";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchPending = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/gift/pendinggift", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      toast.error("Failed to fetch pending requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id, action) => {
    setProcessingId(id);
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/gift/${action}/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Request ${action === "approvegift" ? "approved" : "rejected"} successfully!`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.error || "Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#147F05] mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading pending requests...</p>
        </div>
      </div>
    );
  }

  return (
 <>
 <Navbar />
 <div className="h-20 w-100" ></div>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="bottom-center" autoClose={3000} />
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#147F05] rounded-2xl mb-4 shadow-lg">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Pending Gift Requests
          </h1>
          <p className="text-gray-600">Review and manage gift redemption requests</p>
        </div>

        {/* Stats Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#147F05]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#147F05]" />
              <span className="text-gray-700 font-medium">Pending Requests</span>
            </div>
            <span className="text-3xl font-bold text-[#147F05]">{requests.length}</span>
          </div>
        </div>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Gift className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pending Requests</h3>
            <p className="text-gray-500">All gift requests have been processed</p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* User Info Section */}
                  <div className="flex-1 space-y-4">
                    {/* User Details */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#147F05] to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{req.userId.username}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-4 h-4" />
                          <span>{req.userId.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Gift Details */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-[#147F05]" />
                          <span className="font-semibold text-gray-800">{req.productName}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg shadow-sm">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-[#147F05]">{req.points}</span>
                          <span className="text-sm text-gray-600">coins</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{req.description}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span>Quantity: {req.quantity}</span>
                        <span>•</span>
                        <span>User Points: {req.userId.totalPoints}</span>
                        <span>•</span>
                        <span>Requested: {new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-36">
                    <button
                      onClick={() => handleAction(req._id, "approvegift")}
                      disabled={processingId === req._id}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#147F05] to-green-600 text-white px-5 py-3 rounded-xl hover:from-green-600 hover:to-[#147F05] transition-all duration-300 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {processingId === req._id ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "rejectgift")}
                      disabled={processingId === req._id}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      {processingId === req._id ? "Processing..." : "Reject"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer />
 </>
  );
};

export default PendingRequests;