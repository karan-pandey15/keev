// import React from 'react';
// import { MapPin, Phone, Clock, Star, Award, Users, Package } from 'lucide-react';
// import Footer from '../footer/page';
// import Navbar from '../navbar/page';

// export default function AboutUs() {
//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen   to-white">
//                 <div className='h-10' > </div>
//                 {/* Main Content */}
//                 <main className="max-w-6xl mx-auto px-4 py-12">
//                     <section className="mb-16">
//                         <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
//                         <div className="bg-white rounded-lg shadow-lg p-8">
//                             <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                                 Welcome to <span className="font-semibold" style={{ color: '#047F05' }}>Mamta Hardware</span>, your premier destination for high-quality plywood and hardware supplies in Bela Pratapgarh, Uttar Pradesh. Located conveniently near Durga Mandir in Balipur, we have been serving our community with dedication and excellence.
//                             </p>
//                             <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                                 With an outstanding <span className="font-semibold">4.9-star rating</span> on Google, we take pride in being one of the most trusted plywood supplier in the region. Our commitment to quality products, competitive pricing, and exceptional customer service has made us the go-to choice for builders, contractors, and homeowners alike.
//                             </p>
//                             <p className="text-lg text-gray-700 leading-relaxed">
//                                 Whether you're working on a small home improvement project or a large-scale construction, Mamta Hardware is here to provide you with the finest materials and expert guidance to bring your vision to life.
//                             </p>
//                         </div>
//                     </section>

//                     {/* Features Grid */}
//                     <section className="mb-16">
//                         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Us</h2>
//                         <div className="grid md:grid-cols-3 gap-6">
//                             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
//                                 <Award className="w-12 h-12 mb-4" style={{ color: '#047F05' }} />
//                                 <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
//                                 <p className="text-gray-600">We stock only the finest quality plywood and hardware materials from trusted brands.</p>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
//                                 <Users className="w-12 h-12 mb-4" style={{ color: '#047F05' }} />
//                                 <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Service</h3>
//                                 <p className="text-gray-600">Our knowledgeable team provides personalized guidance for all your project needs.</p>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
//                                 <Package className="w-12 h-12 mb-4" style={{ color: '#047F05' }} />
//                                 <h3 className="text-xl font-bold text-gray-800 mb-2">Wide Selection</h3>
//                                 <p className="text-gray-600">Extensive inventory of plywood varieties, hardware, and construction materials.</p>
//                             </div>
//                         </div>
//                     </section>

//                     {/* Contact Information */}
//                     <section className="mb-16">
//                         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Visit Us</h2>
//                         <div className="grid md:grid-cols-2 gap-6">
//                             {/* Location Card */}
//                             <div className="text-white rounded-lg shadow-lg p-8" style={{ background: 'linear-gradient(to bottom right, #047F05, #036304)' }}>
//                                 <MapPin className="w-10 h-10 mb-4" />
//                                 <h3 className="text-2xl font-bold mb-4">Location</h3>
//                                 <p className="text-lg leading-relaxed mb-2">
//                                     Near Durga Mandir, Balipur<br />
//                                     Bela Pratapgarh, Uttar Pradesh<br />
//                                     PIN: 230001
//                                 </p>
//                                 <p className="text-green-100 mt-4">📍 Just 8 minutes away from city center</p>
//                             </div>

//                             {/* Contact Card */}
//                             <div className="bg-white rounded-lg shadow-lg p-8 border-2" style={{ borderColor: '#047F05' }}>
//                                 <div className="mb-6">
//                                     <Phone className="w-10 h-10 mb-4" style={{ color: '#047F05' }} />
//                                     <h3 className="text-2xl font-bold text-gray-800 mb-2">Contact Us</h3>
//                                     <a href="tel:07275759000" className="text-xl font-semibold hover:underline" style={{ color: '#047F05' }}>
//                                         072757 59000
//                                     </a>
//                                 </div>

//                                 <div>
//                                     <Clock className="w-10 h-10 mb-4" style={{ color: '#047F05' }} />
//                                     <h3 className="text-2xl font-bold text-gray-800 mb-2">Business Hours</h3>
//                                     <p className="text-lg text-gray-700">
//                                         <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
//                                         Open Now
//                                     </p>
//                                     <p className="text-gray-600 mt-2">Closes at 8:00 PM</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>  
//                 </main> 
//             </div>
//             <Footer />
//         </>
//     );
// }

import React from 'react';
import { Phone, MapPin, Award, Heart, Users, Package, Layers, Box, Wrench, Droplet, Square, Grid3x3 } from 'lucide-react';
import Navbar from '../navbar/page';
import Footer from '../footer/page';

export default function AboutUs() {
  const brands = {
    plywood: ['Century', 'Kalpataru', 'Greenply'],
    laminates: ['Ristal Laminates', 'Virgo Laminates'],
    adhesives: ['Fevicol', 'Kaarigar']
  };

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "We deal only with trusted brands ensuring top-notch quality for your projects"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Wide Range",
      description: "From plywood to laminates, doors to hardware - everything under one roof"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Honest Service",
      description: "Building relationships based on trust and transparency since 2021"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Advice",
      description: "Our experienced team helps you choose the right materials for your needs"
    }
  ];

  const products = [
    { name: 'Doors', icon: <Square className="w-8 h-8" /> },
    { name: 'Plywood', icon: <Layers className="w-8 h-8" /> },
    { name: 'Mouldings', icon: <Box className="w-8 h-8" /> },
    { name: 'Laminates', icon: <Grid3x3 className="w-8 h-8" /> },
    { name: 'Furniture Hardware', icon: <Wrench className="w-8 h-8" /> },
    { name: 'Adhesives', icon: <Droplet className="w-8 h-8" /> }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section (UNCHANGED) */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 sm:py-20 lg:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10 mt-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight px-4">
            Welcome to Mamta Hardware
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 text-gray-300 px-4">
            Your Trusted Partner for Wood, Design & Quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <a href="tel:7275759000" className="flex items-center gap-2 bg-white text-gray-900 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto justify-center">
              <Phone className="w-5 h-5" />
              72757 59000
            </a>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#047F05] leading-tight">
              Our Story
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Our story began on <span className="font-semibold text-[#047F05]">21st January 2021</span> in the heart of Balipur, Bela, Pratapgarh with a simple dream — to make premium furniture materials easily available to everyone, at prices that don't burn a hole in your pocket.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              What started as a small hardware store near Jagwanti Petrol Pump quickly grew into a one-stop destination for carpenters, interior designers, and homeowners who believe in quality craftsmanship.
            </p>
            <div className="flex items-start gap-3 bg-gray-50 p-4 sm:p-5 rounded-lg border-l-4 border-[#047F05]">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#047F05] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#047F05] text-sm sm:text-base">Visit Us</p>
                <p className="text-gray-600 text-sm sm:text-base">Balipur, Bela, Pratapgarh<br />Uttar Pradesh 230001<br />Near Jagwanti Petrol Pump</p>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-[#047F05] to-green-700 rounded-2xl transform rotate-3"></div>
            <img
              src="/images/ourstoryimag.jpeg"
              alt="Hardware Store"
              className="relative rounded-2xl shadow-2xl w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#047F05] mb-8 sm:mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#047F05] to-green-700 text-white rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#047F05] mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#047F05] mb-8 sm:mb-12">
          Trusted Brands We Deal With
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-shadow border-t-4 border-[#047F05]">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-[#047F05]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#047F05]">Plywood</h3>
            </div>
            <ul className="space-y-3">
              {brands.plywood.map((brand, index) => (
                <li key={index} className="flex items-center gap-2 text-[#047F05] text-base sm:text-lg">
                  <span className="w-2 h-2 bg-[#047F05] rounded-full"></span>
                  {brand}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-shadow border-t-4 border-[#047F05]">
            <div className="flex items-center gap-3 mb-4">
              <Grid3x3 className="w-7 h-7 sm:w-8 sm:h-8 text-[#047F05]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#047F05]">Laminates</h3>
            </div>
            <ul className="space-y-3">
              {brands.laminates.map((brand, index) => (
                <li key={index} className="flex items-center gap-2 text-[#047F05] text-base sm:text-lg">
                  <span className="w-2 h-2 bg-[#047F05] rounded-full"></span>
                  {brand}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-shadow border-t-4 border-[#047F05]">
            <div className="flex items-center gap-3 mb-4">
              <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-[#047F05]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#047F05]">Adhesives</h3>
            </div>
            <ul className="space-y-3">
              {brands.adhesives.map((brand, index) => (
                <li key={index} className="flex items-center gap-2 text-[#047F05] text-base sm:text-lg">
                  <span className="w-2 h-2 bg-[#047F05] rounded-full"></span>
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#047F05] mb-8 sm:mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg p-5 sm:p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#047F05] to-green-700 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {product.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#047F05]">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promise Section */}
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#047F05] mb-6 sm:mb-8 text-center">
          Our Promise
        </h2>
        <div className="bg-gradient-to-r from-[#047F05] to-green-700 text-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
            Better Quality. Affordable Price. Honest Service.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 text-center">
            We're proud to have become a part of countless homes and projects, and we continue to grow — one satisfied customer at a time.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
            Building Trust, One Home at a Time. 🏡
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#047F05] text-white py-12 sm:py-16 px-4 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Need Expert Advice?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 px-4">
            Whether you need product details or furniture design ideas, we're always happy to help!
          </p>
          <a href="tel:7275759000" className="inline-flex items-center gap-3 bg-white text-[#047F05] px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            Call Us: 72757 59000
          </a>
        </div>
      </div>
    </div>
    <Footer />
     </>
  );
}
