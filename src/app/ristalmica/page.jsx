"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../store/cartSlice";
import { useToast } from "../components/Toast";
import axiosInstance from "../helper/axiosInstance";
import Navbar from "../components/navbar/page";
import { Search, X } from "lucide-react";
import Footer from "../components/footer/page"; 
const BACKEND_URL = "https://api.mamtahardware.in1";

const RistalMica = () => {
  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? useSearchParams() : null;
  const dispatch = useDispatch();
  const toast = useToast();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products
  const fetchData = async (category) => {
    try {
      const res = await axiosInstance.get("/sunmica");
      const allProducts = res.data || [];
      const filtered = category
        ? allProducts.filter(
            (item) => item.category?.toLowerCase() === category.toLowerCase()
          )
        : allProducts;
      setProducts(filtered);
      setFilteredProducts(filtered);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products");
    }
  }; 
  useEffect(() => {
    // ✅ Only run this effect on the client
    if (!searchParams) return;
    const categoryFromURL = searchParams.get("category");
    setSelectedCategory(categoryFromURL || "");
    fetchData(categoryFromURL);
  }, [searchParams]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const getCartItem = (productId) =>
    cartItems.find((item) => item.id === productId);

  const handleAddToCart = async (product) => {
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

  const handleIncrement = (productId) => {
    const cartItem = getCartItem(productId);
    if (cartItem) {
      dispatch(
        updateQuantity({
          id: productId,
          quantity: cartItem.quantity + 1,
        })
      );
      toast.success(`Quantity increased to ${cartItem.quantity + 1}`);
    }
  };

  const handleDecrement = (productId) => {
    const cartItem = getCartItem(productId);
    if (cartItem && cartItem.quantity > 1) {
      dispatch(
        updateQuantity({
          id: productId,
          quantity: cartItem.quantity - 1,
        })
      );
      toast.success(`Quantity decreased to ${cartItem.quantity - 1}`);
    }
  };

  const handleImageClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Enhanced Header with gradient text */}
        <div className="text-center mb-6 mt-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 bg-[#047F05] bg-clip-text text-transparent">
            {selectedCategory
              ? `${selectedCategory} Collection`
              : "Discover Premium Products"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Earn rewards with every purchase and unlock exclusive benefits
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products by name, description, or category..."
                className="w-full pl-12 pr-12 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#047F05] focus:ring-2 focus:ring-[#047F05]/20 transition-all duration-300 shadow-sm hover:shadow-md bg-white"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Search Results Counter */}
            {searchQuery && (
              <div className="mt-3 text-sm text-gray-600">
                Found <span className="font-semibold text-[#047F05]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid - 2 columns on small, 4 on large */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map((product) => {
            const productId = product._id;
            const cartItem = getCartItem(productId);
            const isInCart = !!cartItem;
            const isLoading = loading[productId];
            const imageUrl = `${BACKEND_URL}/${product.images?.[0]?.replace(
              /\\/g,
              "/"
            )}`;

            return (
              <div
                key={productId}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1"
              >
                {/* Image Container with Overlay Effect */}
                <div
                  className="relative h-40 sm:h-52 lg:h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => handleImageClick(productId)}
                >
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product Image"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* In Cart Badge */}
                  {isInCart && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                      ✓ In Cart
                    </div>
                  )}

                  {/* View Details Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-teal-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      View Details →
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
                  {/* Product Name */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] group-hover:text-teal-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Product Description */}
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 lg:mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  {/* Points Badge */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold mb-2 sm:mb-3 lg:mb-4 text-amber-700 flex items-center justify-center space-x-1">
                    <span className="text-base sm:text-lg">🌟</span>
                    <span>{product.points} Points</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto">
                    {!isInCart ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={isLoading}
                        className="w-full bg-[#047F05] hover:from-teal-700 hover:to-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Adding...</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center space-x-1">
                            <span>Add to Cart</span>
                            <span>✨</span>
                          </span>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-2 sm:space-y-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border-2 border-teal-200">
                          <span className="text-teal-800 font-semibold text-xs sm:text-sm flex items-center space-x-1">
                            <span className="text-green-600">✓</span>
                            <span>Added</span>
                          </span>
                          <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDecrement(productId);
                              }}
                              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center bg-white border-2 border-teal-600 text-teal-600 rounded-md sm:rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-200 font-bold text-sm sm:text-base transform active:scale-90"
                            >
                              −
                            </button>
                            <span className="font-bold text-gray-900 min-w-[1.5rem] sm:min-w-[2rem] text-center text-sm sm:text-base lg:text-lg">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleIncrement(productId);
                              }}
                              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-md sm:rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-200 font-bold text-sm sm:text-base shadow-md transform active:scale-90"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Total Points Display */}
                        <div className="text-center text-xs sm:text-sm bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg py-1.5 sm:py-2 border border-amber-200">
                          <span className="text-gray-600">Total: </span>
                          <span className="font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                            {product.points * cartItem.quantity} Points 🎯
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-block p-4 sm:p-6 bg-white rounded-2xl shadow-lg mb-4">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 text-base sm:text-lg mb-2">
              {searchQuery ? (
                <>
                  No products found for "<span className="font-semibold text-teal-600">{searchQuery}</span>"
                </>
              ) : (
                <>
                  No products found
                  {selectedCategory && (
                    <span className="block mt-1">
                      for <span className="font-semibold text-teal-600">{selectedCategory}</span>
                    </span>
                  )}
                </>
              )}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              {searchQuery ? "Try a different search term" : "Try selecting a different category"}
            </p>
          </div>
        )}
      </main>

      <div className="h-20 w-100    " >  </div>

      <Footer />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default RistalMica;