"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, toggleFavorite, selectFavoriteIds } from "../store/cartSlice";
import { useToast } from "../components/Toast";
import axiosInstance from "../helper/axiosInstance"; 
import { Search, X, Heart, ShoppingCart } from "lucide-react"; 
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
const BACKEND_URL = "https://api.digiente.com";

const ProductDisplay = () => {
  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? useSearchParams() : null;
  const dispatch = useDispatch();
  const toast = useToast();
  const cartItems = useSelector((state) => state.cart.items); 
  const favoriteIds = useSelector(selectFavoriteIds);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);

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
      const imageUrl = `${BACKEND_URL}/${product.images?.[0]?.replace(/\\/g, "/")}`;
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
            image: imageUrl,
            points: product.points,
            quantity: 1,
            category: product.category,
          })
        );
        toast.success("Product added to cart!");
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

  const handleToggleFavorite = (product, e) => {
    if (e) {
      e.stopPropagation();
    }
    const productId = product._id;
    const isFavorite = favoriteIds.includes(productId);
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

    if (isFavorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites ❤️");
    }
  };

  const handleImageClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
   <>
   <Navbar />
     <div className="h-20 w-100" ></div>
    <div className="bg-white"> 
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const productId = product._id;
            const cartItem = getCartItem(productId);
            const isInCart = !!cartItem;
            const isLoading = loading[productId];
            const imageUrl = `${BACKEND_URL}/${product.images?.[0]?.replace(/\\/g, "/")}`;
            const isHovered = hoveredProduct === productId;

            return (
              <div
                key={productId}
                className="group bg-white rounded-lg overflow-hidden flex flex-col relative transition-all duration-300"
                onMouseEnter={() => setHoveredProduct(productId)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div
                  className="relative h-64 sm:h-80 lg:h-96 bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => handleImageClick(productId)}
                >
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product Image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  
                  {/* Wishlist Icon */}
                  <button
                    onClick={(e) => handleToggleFavorite(product, e)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favoriteIds.includes(productId)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                  </button>

                  {/* Quick Buy Button - Shows on Hover */}
                  {isHovered && !isInCart && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={isLoading}
                        className="w-full bg-white text-gray-900 py-3 rounded-md text-sm font-semibold hover:bg-gray-100 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <span className="flex items-center space-x-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Adding...</span>
                          </span>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4" />
                            <span>QUICK BUY</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* In Cart Overlay */}
                  {favoriteIds.includes(productId) && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current" /> Loved
                    </div>
                  )}

                  {isInCart && isHovered && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="bg-white rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900">In Cart</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDecrement(productId);
                              }}
                              className="w-7 h-7 flex items-center justify-center bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-all font-bold"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="font-bold text-gray-900 min-w-[1.5rem] text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleIncrement(productId);
                              }}
                              className="w-7 h-7 flex items-center justify-center bg-gray-900 text-white rounded hover:bg-gray-800 transition-all font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 text-center">
                          Total: <span className="font-bold text-gray-900">{product.points * cartItem.quantity} Points</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  {/* Product Name */}
                  <h3 className="text-sm sm:text-base font-normal text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] hover:text-gray-600 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">54 reviews</span>
                  </div>

                  {/* Price */}
                  <div className="text-lg font-bold text-gray-900">
                    Points: {product.points}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-block p-6 bg-gray-50 rounded-2xl mb-4">
              <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">
              {searchQuery ? (
                <>No products found for "{searchQuery}"</>
              ) : (
                <>No products found</>
              )}
            </p>
            <p className="text-gray-400 text-sm">
              {searchQuery ? "Try a different search term" : "Check back later for new products"}
            </p>
          </div>
        )}
      </main>  
    </div>

    <Footer />
   
   </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDisplay;