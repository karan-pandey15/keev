"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleFavorite, selectFavoriteIds } from "@/app/store/cartSlice";
import Navbar from "@/app/components/navbar/page";
import axiosInstance from "@/app/helper/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Footer from "@/app/components/footer/page";
import { Heart, Share2, X } from "lucide-react";

const BACKEND_URL = "https://api.mamtahardware.in";

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorite = favoriteIds.includes(productId);

  // ✅ Fetch single product by ID
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/sunmica");
      const foundProduct = res.data.find((p) => p._id === productId);
      if (!foundProduct) {
        setProduct(null);
        setSelectedImage("");
        return;
      }
      setProduct(foundProduct);
      setSelectedImage(
        foundProduct.images?.[0]
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

  useEffect(() => {
    if (!isFullScreen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setIsFullScreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, currentImageIndex, product]);

  const handleBack = () => router.back();

  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    if (!product) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const getFullScreenImageUrl = () => {
    if (!product || !product.images[currentImageIndex]) return "";
    return `${BACKEND_URL}/${product.images[currentImageIndex].replace(/\\/g, "/")}`;
  };

  const handleEarnPoints = async () => {
    if (!product) return;

    try {
      setLoading(true);

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

  const handleToggleFavorite = () => {
    if (!product) return;

    const imageUrl = `${BACKEND_URL}/${product.images?.[0]?.replace(/\\/g, "/")}`;
    dispatch(
      toggleFavorite({
        id: product._id,
        name: product.name,
        description: product.description,
        image: imageUrl,
        points: product.points,
        category: product.category,
      })
    );

    if (isFavorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites ❤️");
    }
  };

  const handleShare = async () => {
    if (!product) return;
    if (typeof window === "undefined") return;

    const shareUrl = `${window.location.origin}/products/${product._id}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch (err) {
        console.log("Error sharing:", err);
      }
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        return;
      } catch (err) {
        console.error(err);
      }
    }

    toast.error("Sharing not supported on this device");
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
              <div
                className="relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg cursor-pointer"
                onClick={() => {
                  setIsFullScreen(true);
                  setCurrentImageIndex(
                    product.images.findIndex(
                      (img) =>
                        `${BACKEND_URL}/${img.replace(/\\/g, "/")}` ===
                        selectedImage
                    ) || 0
                  );
                }}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite();
                  }}
                  className="absolute top-5 right-6 text-gray-500 hover:text-red-500 transition-transform duration-200"
                >
                  <Heart
                    className={`h-8 w-8 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-current"
                    }`}
                  />
                </button>

                {isFavorite && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Loved</span>
                  </div>
                )}
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
              <div className="flex flex-col gap-6">
                <button
                  onClick={handleEarnPoints}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#047F05] hover:bg-[#036804] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {loading
                      ? "Processing..."
                      : `Earn ${product.points * quantity} Points`}
                  </span>
                </button>
                <div className="flex flex-row items-center gap-6">
                  <button
                    onClick={handleToggleFavorite}
                    className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-2xl border ${
                      isFavorite
                        ? "bg-white text-red-500 border-red-200 hover:border-red-300"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                      }`}
                    />
                    <span>{isFavorite ? "Loved" : "Favorites"}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-2xl bg-gradient-to-r from-emerald-100 via-white to-emerald-50 text-[#047F05] border border-green-200 hover:border-[#047F05]"
                  >
                    <Share2 className="h-6 w-6" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen Image Gallery Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button - Top Right */}
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close gallery"
            >
              <X className="h-10 w-10" />
            </button>

            {/* Previous Button - Left */}
            {product?.images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all hover:scale-110 z-10"
                aria-label="Previous image"
              >
                <svg
                  className="h-12 w-12"
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
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={getFullScreenImageUrl()}
                alt={`${product?.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Next Button - Right */}
            {product?.images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all hover:scale-110 z-10"
                aria-label="Next image"
              >
                <svg
                  className="h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Image Counter - Bottom */}
            {product?.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                {currentImageIndex + 1} / {product?.images.length}
              </div>
            )}

            {/* Thumbnail Navigation - Bottom */}
            {product?.images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-2xl overflow-x-auto px-4 z-10">
                {product?.images.map((img, index) => {
                  const imgUrl = `${BACKEND_URL}/${img.replace(/\\/g, "/")}`;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-[#047F05] ring-2 ring-green-300"
                          : "border-gray-500 hover:border-white"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={imgUrl}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="h-20 w-100"></div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
