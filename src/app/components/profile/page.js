"use client"
import React, { useEffect, useState } from "react";
import { Gift, ArrowRight } from "lucide-react";
import Navbar from "../navbar/page"; 
import axiosInstance from "@/app/helper/axiosInstance";
import Footer from "../footer/page";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    coins: 0,
    role: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        // Fetch user data from API
        const res = await axiosInstance.get("/users/userdata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user;

        setUserData({
          name: user.username || "Guest User",
          phone: user.phone || "+91 0000000000",
          coins: user.totalPoints || 0,
          role: user.role || "user",
          email: user.email || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl mt-16 rounded-3xl">
          <div className="p-4 space-y-6 border border-gray-200 rounded-3xl">
            {/* User Info */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{userData.name}</h2>
                  <p className="text-sm text-gray-600">{userData.phone}</p>
                  <p className="text-xs text-gray-500 capitalize">Role: {userData.role}</p>
                  <p className="text-xs text-gray-500">Email: {userData.email}</p>
                </div>
              </div>
            </div>

            {/* Coins Card */}
            <div className="relative bg-gradient-to-br from-cyan-400 via-teal-400 to-green-400 rounded-3xl p-6 overflow-hidden shadow-lg">
              <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
              </div>

              <div className="absolute top-4 right-4">
                <button className="text-white text-sm font-medium bg-white/20 px-4 py-1 rounded-full hover:bg-white/30 transition">
                  Total Coins
                </button>
              </div>

              <div className="mt-8 mb-4">
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="text-5xl font-bold text-white">{userData.coins}</span>
                  <span className="text-xl text-white/90 font-medium">Coins</span>
                </div>
                <p className="text-white/80 text-sm mt-2">
                  These coins can only be used for purchases
                </p>
              </div>

              <div className="bg-cyan-600/40 rounded-xl px-4 py-3 backdrop-blur-sm">
                <p className="text-white text-sm font-medium">50 coin needed to get Value</p>
              </div>

              {/* Coin Icon */}
              <div className="absolute bottom-0 right-0 w-32 h-32">
                <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-tl-full opacity-90 flex items-center justify-center">
                  <Gift className="w-16 h-16 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Coin Benefits */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coin Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fff" }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ borderWidth: "2px", borderColor: "#006400" }}>
                      <span className="text-xs font-bold" style={{ color: "#006400" }}>%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get New Gifts</h4>
                    <p className="text-sm text-gray-500">Use your Coins for Amazing Gifts</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fff" }}>
                    <div className="relative">
                      <div className="w-6 h-2 rounded-full" style={{ backgroundColor: "#006400" }}></div>
                      <div className="w-6 h-2 rounded-full mt-1" style={{ backgroundColor: "#006400" }}></div>
                      <div className="w-6 h-2 rounded-full mt-1" style={{ backgroundColor: "#006400" }}></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Earn more Coins</h4>
                    <p className="text-sm text-gray-500">Get extra coins while making a purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coin History Button */}
            <button className="w-full bg-white rounded-2xl p-5 border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition">
              <h3 className="text-lg font-semibold text-gray-900">Coin History</h3>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
