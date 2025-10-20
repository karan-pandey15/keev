"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavorites,
  toggleFavorite,
  addToCart,
  selectCartItems,
  hydrateCart,
} from "../../store/cartSlice";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function FavoritePage() {
  const favorites = useSelector(selectFavorites);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    dispatch(hydrateCart());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);

    if (cartItem) {
      toast.success(`${product.name} quantity increased!`);
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          points: product.points,
          quantity: 1,
          category: product.category,
        })
      );
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleRemoveFromFavorites = (product) => {
    dispatch(
      toggleFavorite({
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        points: product.points,
        category: product.category,
      })
    );
    toast.success(`${product.name} removed from favorites`);
  };

  const handleViewProduct = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <div className="h-20 w-100" ></div>

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                My Favorites
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              {favorites.length === 0
                ? "You haven't added any favorites yet"
                : `${favorites.length} favorite product${
                    favorites.length !== 1 ? "s" : ""
                  } saved`}
            </p>
          </div>

          {/* Favorites Grid */}
          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  No favorites yet
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                  Start building your collection by clicking the heart icon on
                  any product you love!
                </p>
                <button
                  onClick={() => router.push("/productdisplay")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {favorites.map((product) => {
                const isInCart = cartItems.some((item) => item.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100 hover:border-pink-200"
                  >
                    {/* Image Container */}
                    <div
                      className="relative h-72 sm:h-80 bg-gray-100 overflow-hidden cursor-pointer"
                      onClick={() => handleViewProduct(product.id)}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-125"
                        unoptimized
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                          <Heart className="w-4 h-4 fill-white" /> Loved
                        </span>
                        {isInCart && (
                          <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" /> In Cart
                          </span>
                        )}
                      </div>

                      {/* Remove from Favorites Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromFavorites(product);
                        }}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 hover:bg-red-50 group/remove"
                        title="Remove from favorites"
                      >
                        <Heart className="h-6 w-6 fill-red-500 text-red-500 group-hover/remove:scale-125 transition-transform" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold rounded-full uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      {/* Price Section */}
                      <div className="mb-6 flex-grow">
                        <p className="text-sm text-gray-500 mb-1">Product Value</p>
                        <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ₹{product.points}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 ${
                          isInCart
                            ? "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200"
                            : "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800"
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>
                          {isInCart ? "Already in Cart" : "Add to Cart"}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}