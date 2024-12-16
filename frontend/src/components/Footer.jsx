import React from 'react';
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Logo and Description Section */}
        <div className="flex flex-col justify-center items-center text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src={logo} alt="Rural Empowerment Platform" className="w-12 h-auto invert" />
            <p className="ml-4 text-lg sm:text-xl">Empowering Rural Communities for a Brighter Future</p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-4">
          <p className="text-sm">© 2024 Rural Empowerment Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
