"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPoints,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../store/cartSlice";
import axiosInstance from "@/app/helper/axiosInstance";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/page";
import {
  Plus,
  Minus,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/footer/page";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const totalPoints = useSelector(selectTotalPoints);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQtyChange = (id, qty) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, qty) }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleCheckoutClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in before checkout");
      router.push("/components/signin");
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmCheckout = async () => {
    const token = localStorage.getItem("token");
    setIsProcessing(true);

    try {
      const payload = {
        items: items.map((it) => ({
          userId: it.id,
          productName: it.name,
          quantity: it.quantity,
          points: it.points,
          description: it.description,
        })),
      };

      const res = await axiosInstance.post("/points/request", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.status === 200 || res?.status === 201) {
        toast.success("Checkout successful!");
        dispatch(clearCart());
        setShowCheckoutModal(false);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error("Checkout response: " + res.status);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Checkout failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelCheckout = () => {
    setShowCheckoutModal(false);
  };

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />

      <div className="min-h-screen bg-white flex flex-col">
        {/* Cart Sidebar Panel - Full width on mobile, right sidebar on desktop */}
        <div className="fixed right-0 top-16 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col overflow-hidden sm:border-l border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl text-[#047F05] sm:text-2xl font-bold ">Shopping Cart</h2>
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Close cart"
            >
              <X className="w-6 h-6 text-[#047F05]" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 pr-2">
                            {it.name}
                          </h3>
                          <button
                            onClick={() => handleRemove(it.id)}
                            className="flex-shrink-0 p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                          ₹{it.points.toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQtyChange(it.id, (it.quantity || 1) - 1)
                            }
                            className="w-7 h-7 rounded text-white flex items-center justify-center hover:opacity-90 transition-colors"
                            style={{ backgroundColor: "#047F05" }}
                            disabled={it.quantity <= 1}
                            title="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">
                            {it.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQtyChange(it.id, (it.quantity || 1) + 1)
                            }
                            className="w-7 h-7 rounded text-white flex items-center justify-center hover:opacity-90 transition-colors"
                            style={{ backgroundColor: "#047F05" }}
                            title="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

              {/* Checkout Button - Visible on all screen sizes */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 sm:p-6 bg-white  ">
              <button
                onClick={handleCheckoutClick}
                style={{ backgroundColor: "#047F05" }}
                className="w-full text-white py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-lg hover:opacity-90 transition-opacity uppercase tracking-wide shadow-lg"
              >
                CHECK OUT
              </button>
            </div>
          )}
          </div>

         
        </div>

   
      </div>

      {/* Checkout Confirmation Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-3">
              Confirm Checkout
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              Are you sure you want to proceed with checkout for{" "}
              <span className="font-bold" style={{ color: "#047F05" }}>
                ₹{totalPoints.toFixed(2)}
              </span>
              ?
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm text-gray-600">Total Items:</span>
                <span className="text-xs sm:text-sm font-semibold">{items.length}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm text-gray-600">Total Quantity:</span>
                <span className="text-xs sm:text-sm font-semibold">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Total Amount:</span>
                <span
                  className="font-bold text-lg sm:text-xl"
                  style={{ color: "#047F05" }}
                >
                  ₹{totalPoints.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancelCheckout}
                disabled={isProcessing}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-xs sm:text-sm text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleConfirmCheckout}
                disabled={isProcessing}
                style={{ backgroundColor: "#047F05" }}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}