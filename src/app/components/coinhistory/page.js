"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/helper/axiosInstance";
import Navbar from "../navbar/page";
import Footer from "../footer/page";

const CoinHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/coin-history/my-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getStatusColor = (status) => {
    if (status === "approved") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">🪙 Coin History</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : history.length === 0 ? (
            <p className="text-center text-gray-500">No coin history yet.</p>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {item.productName || "Gift Action"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                    <p className={`text-sm font-semibold ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        item.coinsChanged < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item.coinsChanged > 0 ? "+" : ""}
                      {item.coinsChanged}
                    </p>
                    <p className="text-xs text-gray-500">
                      Balance: {item.balanceAfter}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoinHistory;
