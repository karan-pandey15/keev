// "use client";

// import axiosInstance from "@/app/helper/axiosInstance";
// import { useState } from "react";
// import Navbar from "../navbar/page";
 
// const Toast = ({ message, type, onClose }) => {
//   const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
//   const icon = type === "success" ? (
//     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//     </svg>
//   ) : (
//     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//     </svg>
//   );

//   return (
//     <div className={`fixed top-4 left-4 z-50 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in max-w-md`}>
//       {icon}
//       <span className="font-medium">{message}</span>
//       <button onClick={onClose} className="ml-4 hover:opacity-80">
//         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//           <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default function AddProductPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     points: "",
//     description: "",
//     category: "",
//   });
//   const [images, setImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [toast, setToast] = useState(null);
// const categories = [
//   "Ristal 0.8mm",
//   "Ristal Door Skin",
//   "Ristal 1mm",
//   "Adalam",
//   "Membrane Door",
//   "Laminate Door",
//   "Fevicol",
// ];


//   const showToast = (message, type) => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 5000);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 5) {
//       showToast("You can upload a maximum of 5 images!", "error");
//       return;
//     }
//     setImages(files);
    
//     // Create preview URLs
//     const urls = files.map(file => URL.createObjectURL(file));
//     setPreviewUrls(urls);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.points || !formData.category) {
//       showToast("Please fill in all required fields!", "error");
//       return;
//     }

//     if (images.length === 0) {
//       showToast("Please upload at least one image!", "error");
//       return;
//     }

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//     images.forEach((file) => data.append("images", file));

//     try {
//       setUploading(true);
      
//       // API call to backend
//       const res = await axiosInstance.post("/sunmica", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       setResult(res.data);
//       showToast("✅ Uploaded successfully!", "success");
      
//       // Reset form
//       setFormData({ name: "", points: "", description: "", category: "" });
//       setImages([]);
//       setPreviewUrls([]);
      
//       // Clear file input
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = '';
      
//     } catch (err) {
//       console.error(err);
//       showToast("❌ Upload failed! Please try again.", "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes slide-in {
//           from {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }
//       `}</style>

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <Navbar /> 

//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        
//         <div className="h-20 w-100" ></div>
//         <div className="container mx-auto px-4 py-8 lg:py-12">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
//               {/* Left Side - Image & Info */}
//               <div className="order-2 lg:order-1 space-y-6">
//                 <div className="relative">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-20"></div>
//                   <div className="relative bg-white rounded-3xl p-8 shadow-xl">
//                     <div className="mb-6">
//                       <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                         Product Upload
//                       </h2>
//                       <p className="text-gray-600">
//                         Add your products with beautiful images and detailed information
//                       </p>
//                     </div>
                    
//                     {previewUrls.length > 0 ? (
//                       <div className="space-y-4">
//                         <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
//                           <img 
//                             src={previewUrls[0]} 
//                             alt="Preview" 
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         {previewUrls.length > 1 && (
//                           <div className="grid grid-cols-4 gap-3">
//                             {previewUrls.slice(1).map((url, idx) => (
//                               <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-md">
//                                 <img 
//                                   src={url} 
//                                   alt={`Preview ${idx + 2}`}
//                                   className="w-full h-full object-cover"
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-inner">
//                         <div className="text-center">
//                           <svg className="mx-auto h-24 w-24 text-indigo-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           <p className="text-indigo-400 font-medium">Upload images to preview</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="bg-white rounded-2xl p-4 shadow-md text-center">
//                     <div className="text-3xl font-bold text-indigo-600 mb-1">5</div>
//                     <div className="text-sm text-gray-600">Max Images</div>
//                   </div>
//                   <div className="bg-white rounded-2xl p-4 shadow-md text-center">
//                     <div className="text-3xl font-bold text-purple-600 mb-1">7</div>
//                     <div className="text-sm text-gray-600">Categories</div>
//                   </div>
//                   <div className="bg-white rounded-2xl p-4 shadow-md text-center">
//                     <div className="text-3xl font-bold text-pink-600 mb-1">Fast</div>
//                     <div className="text-sm text-gray-600">Upload</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Side - Form */}
//               <div className="order-1 lg:order-2">
//                 <div className="relative">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25"></div>
//                   <div className="relative bg-white rounded-3xl shadow-2xl p-8">
//                     <form onSubmit={handleSubmit} className="space-y-6">
                      
//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                           <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                           </svg>
//                           Product Name
//                         </label>
//                         <input
//                           type="text"
//                           name="name"
//                           placeholder="Enter product name"
//                           value={formData.name}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
//                           required
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                           <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                           </svg>
//                           Points
//                         </label>
//                         <input
//                           type="number"
//                           name="points"
//                           placeholder="Enter points"
//                           value={formData.points}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
//                           required
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                           <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
//                           </svg>
//                           Category
//                         </label>
//                         <select
//                           name="category"
//                           value={formData.category}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
//                           required
//                         >
//                           <option value="">Select a category</option>
//                           {categories.map((cat) => (
//                             <option key={cat} value={cat}>
//                               {cat}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                           <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                           </svg>
//                           Description
//                         </label>
//                         <textarea
//                           name="description"
//                           placeholder="Enter product description (optional)"
//                           value={formData.description}
//                           onChange={handleChange}
//                           rows={3}
//                           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                           <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           Upload Images (Max 5, At Least 1 Required)
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="file"
//                             multiple
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white hover:file:opacity-90"
//                             required
//                           />
//                         </div>
//                         {images.length > 0 && (
//                           <div className="flex items-center gap-2 text-sm text-gray-600 bg-indigo-50 px-4 py-2 rounded-lg">
//                             <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             <span className="font-medium">{images.length} file(s) selected</span>
//                           </div>
//                         )}
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={uploading}
//                         className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all transform ${
//                           uploading
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:scale-105 active:scale-95"
//                         }`}
//                       >
//                         {uploading ? (
//                           <span className="flex items-center justify-center gap-2">
//                             <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Uploading...
//                           </span>
//                         ) : (
//                           "Upload Product"
//                         )}
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import axiosInstance from "@/app/helper/axiosInstance";
import { useState, useRef } from "react";
import Navbar from "../navbar/page";

const Toast = ({ message, type, onClose }) => {
  const bg = type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div
      className={`fixed top-5 left-5 ${bg} text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 font-bold">×</button>
    </div>
  );
};

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    points: "",
    description: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    "Ristal 0.8mm",
    "Ristal Door Skin",
    "Ristal 1mm",
    "Adalam",
    "Membrane Door",
    "Laminate Door",
    "Fevicol",
  ];

  const showToast = (msg, type) => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // ✅ Prevent duplicates by file name
    const uniqueFiles = files.filter(
      (f) => !images.some((img) => img.name === f.name && img.size === f.size)
    );

    if (uniqueFiles.length + images.length > 5) {
      showToast("You can upload up to 5 images only!", "error");
      return;
    }

    setImages([...images, ...uniqueFiles]);
    setPreviewUrls([
      ...previewUrls,
      ...uniqueFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.points || !formData.category)
      return showToast("Please fill all required fields", "error");
    if (images.length === 0)
      return showToast("Please select at least one image", "error");

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    images.forEach((file) => data.append("images", file)); // ✅ correct field

    try {
      setUploading(true);
      await axiosInstance.post("/sunmica", data, {
        headers: { "Content-Type": "multipart/form-data" },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });
      showToast("✅ Uploaded successfully!", "success");

      setFormData({ name: "", points: "", description: "", category: "" });
      setImages([]);
      setPreviewUrls([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      showToast("❌ Upload failed!", "error");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">
            Upload Sunmica Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
              required
            />
            <input
              name="points"
              value={formData.points}
              onChange={handleChange}
              type="number"
              placeholder="Points"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
            />

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full border-2 border-dashed border-gray-400 p-4 rounded-xl"
            />

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {previewUrls.map((url, i) => (
                  <div key={i} className="relative">
                    <img
                      src={url}
                      alt="preview"
                      className="rounded-xl w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl"
            >
              {uploading ? "Uploading..." : "Upload Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
