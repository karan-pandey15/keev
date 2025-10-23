"use client";
import React, { useState } from "react";
import "./banner1.css";

const options = [
   
  "Ristal 0.8mm",
  "Ristal Door Skin",
  "Ristal 1mm",
  "Adalam",
  "Membrane Door",
  "Laminate Door",
  "Fevicol"
];
const Banner1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    console.log("Navigating to", option);
    // Here, you can navigate to the respective page using Next.js routing
    switch (option) { 
         case "Ristal 0.8mm":
        window.location.href = "https://mamtahardware.in/ristalmica?category=Ristal%200.8mm";
        break;
         case "Ristal Door Skin":
        window.location.href = "https://mamtahardware.in/ristalmica?category=Ristal%20Door%20Skin";
        break;
         case "Ristal 1mm":
        window.location.href = "https://mamtahardware.in/ristalmica?category=Ristal%201mm";
        break;
         case "Adalam":
        window.location.href = "https://mamtahardware.in/ristalmica?category=Adalam";
        break;
         case "Membrane Door":
        window.location.href = "https://mamtahardware.in/ristalmica?category=Membrane%20Door";
        break;
           case "Laminate Door":
        window.location.href = "https://mamtahardware.in/ristalmica?category=Laminate%20Door";
        break;
           case "Fevicol":
        window.location.href = "https://mamtahardware.in/ristalmica?category=Fevicol";
         break;
        
      default:
        break;
    }
  };

  return (
    <>
      <div
        className="h-screen bg-white bg-cover bg-bottom md:pl-[150px] rounded-b-[30px] flex flex-col items-start justify-center items-left smallhero_section relative"
        style={{
          backgroundImage: "linear-gradient(rgba(80, 78, 78, 0.3), rgba(0, 0, 0, 0.3)), url(/images/background.jpg)",
        }}
      >
        <div className="max-w-[1008px] space-y-[54px] flex flex-col p-4 md:p-0 text-center md:text-left relative z-10">
         <h1 className="font-[700] text-[22px] md:text-[48px] leading-[40px] md:leading-[68px] font-Playfair mt-[6rem] md:mt-0 text-center md:text-left drop-shadow-sm"
             style={{ color: '#018001' }}>
  Door, Plywood, Laminate sheets & furniture related items supplier
</h1>


          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none shadow-lg"
              value={searchTerm}
              onChange={handleInputChange}
            />
            {searchTerm && (
              <ul className="absolute w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto z-20">
                {filteredOptions.map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="font-[400] text-[18px] md:text-[24px] leading-[23px] md:leading-[32.68px] font-OpenSans drop-shadow-sm"
             style={{ color: '#018001' }}>
            Explore different categories. Find the best deals.
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner1;