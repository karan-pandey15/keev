"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, toggleFavorite, selectFavoriteIds } from "../store/cartSlice";
import { useToast } from "../components/Toast";
import { ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react";

const BACKEND_URL = "https://api.digiente.com";

const ProductCarousel = ({ products, title = "Trending Products" }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const scrollContainerRef = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteIds = useSelector(selectFavoriteIds);

  const [loading, setLoading] = useState({});

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const getCartItem = (productId) =>
    cartItems.find((item) => item.id === productId);

  const handleToggleFavorite = (product, e) => {
    e.stopPropagation();
    const productId = product._id;
    const isAlreadyFavorite = favoriteIds.includes(productId);

    const imageUrl = `${BACKEND_URL}/${product.images?.[0]?.replace(/\\/g, "/")}`;
    dispatch(
      toggleFavorite({
        id: productId,
        name: product.name,
        description: product.description,
        image: imageUrl,
        points: product.points,
        category: product.category,
      })
    );

    if (isAlreadyFavorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites ❤️");
    }
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    const productId = product._id;
    setLoading((prev) => ({ ...prev, [productId]: true }));
    
    try {
      const cartItem = getCartItem(productId);
      if (cartItem) {
        dispatch(
          updateQuantity({
            id: productId,
            quantity: cartItem.quantity + 1,
          })
        );
        toast.success(`Quantity updated to ${cartItem.quantity + 1}`);
      } else {
        dispatch(
          addToCart({
            id: product._id,
            name: product.name,
            description: product.description,
            image: `${BACKEND_URL}/${product.images?.[0]?.replace(/\\/g, "/")}`,
            points: product.points,
            quantity: 1,
            category: product.category,
          })
        );
        toast.success("🎉 Product added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    } finally {
      setLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleShare = (product, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.origin + `/products/${product._id}`,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((err) => console.log("Error sharing:", err));
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(
        window.location.origin + `/products/${product._id}`
      );
      toast.success("Link copied to clipboard!");
    }
  };

  // Calculate discount percentage for display
  const calculateDiscount = (points) => {
    // You can adjust this logic based on your pricing strategy
    return Math.floor(Math.random() * 40) + 20; // Random discount between 20-60%
  };

  const calculateOriginalPrice = (points, discount) => {
    return Math.round((points * 100) / (100 - discount));
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full  px-4 relative">
      {/* Section Header */}
   <div className="max-w-7xl mx-auto mb-6 text-center">
  <h2 className="text-2xl md:text-3xl font-bold text-[#047F05] mb-2">
    {title}
  </h2>
  <p className="text-gray-600 text-sm md:text-base">
    Discover our handpicked collection of premium products
  </p>
</div>


      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Products Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => {
            const productId = product._id;
            const cartItem = getCartItem(productId);
            const isInCart = !!cartItem;
            const isLoading = loading[productId];
            const imageUrl = `${BACKEND_URL}/${product.images?.[0]?.replace(
              /\\/g,
              "/"
            )}`;
            const discount = calculateDiscount(product.points);
            const originalPrice = calculateOriginalPrice(product.points, discount);

            return (
              <div
                key={productId}
                onClick={() => handleProductClick(productId)}
                className="flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-pink-200 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-[380px] md:h-[420px] overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product Image"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
 

                  {/* Points Badge (replacing views) */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-white">
                    {product.points} Points
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-3">
                      <button
                        onClick={(e) => handleToggleFavorite(product, e)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favoriteIds.includes(productId)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-700"
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => handleShare(product, e)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Share2 className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Action Icons */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => handleToggleFavorite(product, e)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favoriteIds.includes(productId)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700"
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => handleShare(product, e)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Share2 className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  {/* In Cart Indicator */}
                  {isInCart && (
                    <div className="absolute top-14 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                      In Cart ({cartItem.quantity})
                    </div>
                  )}

                  {/* Favorite Badge */}
                  {favoriteIds.includes(productId) && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current" /> Loved
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  {/* Product Name */}
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[40px] group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Product Description */}
                  {product.description && (
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {product.description}
                    </p>
                  )}

                  {/* Pricing */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl font-bold text-gray-900">
                      Points: {product.points}
                    </span>
                
                     
                  </div>

                  {/* Buy Button or Quantity Controls */}
                  {!isInCart ? (
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={isLoading}
                      className="w-full bg-[#047F05] hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
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
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          {favoriteIds.includes(productId) ? "In Favorites" : "Earn Points"}
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2 border-2 border-green-200">
                        <span className="text-green-800 font-semibold text-xs flex items-center gap-1">
                          <span>✓</span>
                          <span>Added</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (cartItem.quantity > 1) {
                                dispatch(
                                  updateQuantity({
                                    id: productId,
                                    quantity: cartItem.quantity - 1,
                                  })
                                );
                                toast.success(
                                  `Quantity decreased to ${cartItem.quantity - 1}`
                                );
                              }
                            }}
                            className="w-7 h-7 flex items-center justify-center bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 font-bold transform active:scale-90"
                          >
                            −
                          </button>
                          <span className="font-bold text-gray-900 min-w-[1.5rem] text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                updateQuantity({
                                  id: productId,
                                  quantity: cartItem.quantity + 1,
                                })
                              );
                              toast.success(
                                `Quantity increased to ${cartItem.quantity + 1}`
                              );
                            }}
                            className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-bold shadow-md transform active:scale-90"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total Points */}
                      <div className="text-center text-xs bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg py-2 border border-amber-200">
                        <span className="text-gray-600">Total: </span>
                        <span className="font-bold text-amber-700">
                          {product.points * cartItem.quantity} Points 🎯
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;