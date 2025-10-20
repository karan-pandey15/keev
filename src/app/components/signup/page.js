"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/helper/axiosInstance";
import { Eye, EyeOff, CheckCircle, XCircle, User, Mail, Phone, Lock, Shield, Key } from "lucide-react";
import Navbar from "../navbar/page";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const ADMIN_SECRET = "mamtahardware@123";

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData({ ...formData, phone: digitsOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isFormValid = () => {
    const { username, email, phone, password, role } = formData;
    const basicValid = username && email && phone.length === 10 && password;
    
    if (role === "admin") {
      return basicValid && secretKey === ADMIN_SECRET;
    }
    
    return basicValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      if (formData.role === "admin" && secretKey !== ADMIN_SECRET) {
        showToast("Invalid admin secret key", "error");
      }
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        phone: "+91" + formData.phone,
      };

      const res = await axiosInstance.post("/users/signup", payload);
      showToast("Signup successful! Redirecting...", "success");

      setTimeout(() => router.push("/components/signin"), 1500);
    } catch (error) {
      showToast(error.response?.data?.error || "Signup failed", "error");
      setIsLoading(false);
    }
  };

  return (
 <div>
  <Navbar />
     <div className="min-h-screen bg-white">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
          toast.type === "success" 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-medium text-sm sm:text-base">{toast.message}</span>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center px-4  ">
        <div className="w-full max-w-md">
        

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <div className="flex">
                    <span className="inline-flex items-center pl-10 pr-3 py-2.5 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 text-sm font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      placeholder="10-digit number"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800 appearance-none bg-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Admin Secret Key (Conditional) */}
            {formData.role === "admin" && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Secret Key
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required
                    placeholder="Enter admin secret key"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition text-gray-800 ${
                      secretKey && secretKey !== ADMIN_SECRET
                        ? "border-red-300 focus:ring-red-500"
                        : secretKey === ADMIN_SECRET
                        ? "border-green-300 focus:ring-green-500"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                  />
                  {secretKey && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {secretKey === ADMIN_SECRET ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {secretKey && secretKey !== ADMIN_SECRET && (
                  <p className="mt-1 text-xs text-red-600">Invalid secret key</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid()}
              className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                isLoading || !isFormValid()
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Already have account */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/components/signin" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
 </div>
  );
}