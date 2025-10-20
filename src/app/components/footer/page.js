"use client"
import { Home, Heart , User, Facebook, Twitter, Instagram, Linkedin, Grid, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Footer = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('/');

  const handleNavigation = (path) => {
    setActiveTab(path);
    router.push(path);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {/* Home Button */}
          <button
            onClick={() => handleNavigation('/')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === '/' ? 'text-[#047F05]' : 'text-[#047F05]'
            }`}
          >
            <Home size={22} />
            <span className="text-xs mt-1">Home</span>
          </button>

          {/*  favorite Button */}
          <button
            onClick={() => handleNavigation('/components/favrorite')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === '/components/favrorite' ? 'text-red-500' : 'text-[#047F05]'
            }`}
          >
            <Heart
              size={22}
              className={activeTab === '/components/favrorite' ? 'fill-red-500' : ''}
            />
            <span className="text-xs mt-1">Favorites</span>
          </button>

          {/* Categories Button */}
          <button
            onClick={() => handleNavigation('/components/categories')}
            className={`text-[#047F05] flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === '/categories' ? 'text-[#047F05]' : 'text-[#047F05]'
            }`}
          >
            <Grid size={22} />
            <span className="text-xs mt-1">Categories</span>
          </button>

          {/* About Us Button */}
          <button
            onClick={() => handleNavigation('/components/about')}
            className={`text-[#047F05] flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === '/about' ? 'text-[#047F05]' : 'text-[#047F05]'
            }`}
          >
            <Info size={22} />
            <span className="text-xs mt-1">About</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => handleNavigation('/components/profile')}
            className={`text-[#047F05] flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === '/profile' ? 'text-[#047F05]' : 'text-[#047F05]'
            }`}
          >
            <User size={22} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 All rights reserved</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;