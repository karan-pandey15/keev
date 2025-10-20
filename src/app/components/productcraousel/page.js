"use client";
import React, { useEffect, useState } from "react"; 
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";  
import axiosInstance from "@/app/helper/axiosInstance";
import ProductCarousel from "@/app/ristalmica/ProductCrousel";
import Navbar from "../navbar/page";
const BACKEND_URL = "https://api.digiente.com";

const ProductCraousel = () => {
  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? useSearchParams() : null;
 
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
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

 

 
 
 

 

  return (
    <div className=" ">
      <Navbar /> 
 
      {products.length > 0 && (
        <div className=" ">
          <ProductCarousel
            products={products.slice(0, 10)} 
            title={selectedCategory ? `${selectedCategory} Collection` : "Trending Products"}
          />
        </div>
      )}
      
    
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProductCraousel;