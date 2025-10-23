"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Gift, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Star,
  TrendingUp,
  Check,
  Loader2
} from "lucide-react";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import axiosInstance from "@/app/helper/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    coins: 0,
    role: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemingId, setRedeemingId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get("/users/userdata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.user;
        setUserData({
          name: user.username,
          phone: user.phone,
          coins: user.totalPoints,
          role: user.role,
          email: user.email,
        });
      } catch (err) {
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const gifts = [
    { 
      id: 1, 
      name: "Small Gift", 
      points: 20, 
      desc: "Get a small surprise",
      icon: "🎁",
      color: "from-green-400 to-green-600"
    },
    { 
      id: 2, 
      name: "Medium Gift", 
      points: 40, 
      desc: "Get a medium gift pack",
      icon: "🎀",
      color: "from-lime-400 to-lime-600"
    },
    { 
      id: 3, 
      name: "Premium Gift", 
      points: 100, 
      desc: "Get a premium reward",
      icon: "💎",
      color: "from-emerald-400 to-emerald-600"
    },
  ];

  const handleRedeem = async (gift) => {
    try {
      setRedeeming(true);
      setRedeemingId(gift.id);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axiosInstance.post(
        "/gift/redeem",
        {
          productName: gift.name,
          description: gift.desc,
          points: gift.points,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("🎉 Gift request sent successfully!");
      
      // Update user coins locally
      setUserData(prev => ({
        ...prev,
        coins: prev.coins - gift.points
      }));
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to redeem gift");
    } finally {
      setRedeeming(false);
      setRedeemingId(null);
    }
  };

  const handleEarnMoreCoins = () => router.push("/productdisplay");

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: '#147F05' }} />
        <p className="text-gray-600 font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 min-h-screen">
      <Navbar />
      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#147F05' }}>
              My Profile
            </h1>
            <p className="text-gray-600">Manage your rewards and redeem gifts</p>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 hover:shadow-2xl transition-shadow duration-300" style={{ borderColor: '#147F05' }}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg" style={{ background: '#147F05' }}>
                  {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white" style={{ backgroundColor: '#147F05' }}></div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold" style={{ color: '#147F05' }}>{userData.name}</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <span>📞 {userData.phone}</span>
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium capitalize text-white" style={{ backgroundColor: '#147F05' }}>
                    {userData.role}
                  </span>
                  <span className="text-sm text-gray-500">✉️ {userData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coins Display Card */}
          <div className="relative rounded-3xl p-8 overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #147F05 0%, #1a9d06 50%, #20b507 100%)' }}>
            {/* Animated background effects */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  <span className="text-white/90 font-medium">Your Balance</span>
                </div>
                <Trophy className="w-8 h-8 text-yellow-300" />
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-bold text-white drop-shadow-lg">
                    {userData.coins}
                  </span>
                  <span className="text-2xl text-white/90 font-semibold">Coins</span>
                </div>
                <p className="text-white/80 text-sm mt-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300" />
                  Redeem your coins for amazing gifts below
                </p>
              </div>

              {/* Progress bar */}
              <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <div 
                  className="bg-gradient-to-r from-yellow-300 to-amber-400 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((userData.coins / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Redeemable Gifts Section */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2" style={{ borderColor: '#147F05' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: '#147F05' }}>Available Gifts</h3>
                <p className="text-gray-600 text-sm">Choose your reward</p>
              </div>
              <Gift className="w-8 h-8" style={{ color: '#147F05' }} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gifts.map((gift) => {
                const canRedeem = userData.coins >= gift.points;
                const isRedeeming = redeeming && redeemingId === gift.id;
                
                return (
                  <div
                    key={gift.id}
                    className={`relative group rounded-2xl p-6 border-2 transition-all duration-300 ${
                      canRedeem 
                        ? 'hover:shadow-xl hover:-translate-y-1 bg-white' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    style={canRedeem ? { borderColor: '#147F05' } : {}}
                  >
                    {/* Gift Icon */}
                    <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${gift.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {gift.icon}
                    </div>
                    
                    {/* Gift Details */}
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{gift.name}</h4>
                    <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{gift.desc}</p>
                    
                    {/* Points Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: '#147F0520' }}>
                        <Star className="w-4 h-4" style={{ color: '#147F05' }} />
                        <span className="text-sm font-bold" style={{ color: '#147F05' }}>{gift.points}</span>
                      </div>
                      <span className="text-xs text-gray-500">coins</span>
                    </div>
                    
                    {/* Redeem Button */}
                    <button
                      onClick={() => handleRedeem(gift)}
                      disabled={!canRedeem || isRedeeming}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        canRedeem
                          ? 'text-white shadow-lg hover:shadow-xl hover:opacity-90'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      style={canRedeem ? { backgroundColor: '#147F05' } : {}}
                    >
                      {isRedeeming ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Redeeming...</span>
                        </>
                      ) : canRedeem ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Redeem Now</span>
                        </>
                      ) : (
                        <span>Insufficient Coins</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earn More Coins CTA */}
          <button
            onClick={handleEarnMoreCoins}
            className="w-full rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:opacity-90 group"
            style={{ background: 'linear-gradient(135deg, #147F05 0%, #1a9d06 100%)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Earn More Coins</h3>
                  <p className="text-white/80 text-sm">Complete tasks and get rewards</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </button>

        </div>
      </div>
      
      <div className="h-20 w-100" ></div>
      <Footer />
    </div>
  );
};

export default Profile;