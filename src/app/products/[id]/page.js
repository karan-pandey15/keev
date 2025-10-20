 

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import Navbar from "@/app/components/navbar/page";
import axiosInstance from "@/app/helper/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Footer from "@/app/components/footer/page";

const BACKEND_URL = "https://api.digiente.com"; 

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch single product by ID
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/sunmica"); // Or `/sunmica/${productId}` if endpoint exists
      // Find product by ID
      const foundProduct = res.data.find((p) => p._id === productId);
      setProduct(foundProduct);
      setSelectedImage(
        foundProduct?.images?.[0]
          ? `${BACKEND_URL}/${foundProduct.images[0].replace(/\\/g, "/")}`
          : ""
      );
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const handleBack = () => router.back();

  const handleEarnPoints = async () => {
    if (!product) return;

    try {
      setLoading(true);

      // Add to cart using Redux
      dispatch(
        addToCart({
          id: product._id,
          name: product.name,
          description: product.description,
          image: `${BACKEND_URL}/${product.images?.[0].replace(/\\/g, "/")}`,
          points: product.points,
          quantity: parseInt(quantity) || 1,
          category: product.category,
        })
      );

      toast.success(`Earned ${product.points * quantity} points!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to earn points. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Navbar />

      {/* Back & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#047F05] transition-colors group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hover:text-[#047F05] transition">Products</span>
            <span>/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {product.images.map((img, index) => {
                const imgUrl = `${BACKEND_URL}/${img.replace(/\\/g, "/")}`;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === imgUrl
                        ? "border-[#047F05] ring-2 ring-green-200"
                        : "border-gray-200 hover:border-[#047F05]"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={imgUrl}
                        alt={`${product.name} ${index}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex-1">
              <div className="relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-green-100 text-[#047F05] text-sm font-semibold rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[#047F05]">
              {product.name}
            </h1>
            <p className="text-lg text-black leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <label className="font-semibold text-black">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#047F05] focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleEarnPoints}
                disabled={loading}
                className="w-full lg:w-auto inline-flex items-center justify-center space-x-3 bg-[#047F05] hover:bg-[#036804] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {loading
                    ? "Processing..."
                    : `Earn ${product.points * quantity} Points`}
                </span>
              </button>
          
            </div>
          </div>
        </div>
      </main>
      <div className="h-20 w-100" ></div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
