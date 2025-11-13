// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-12 px-6 md:px-20 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">SkillLinker</h3>
          <p className="text-gray-100">
            Connect with verified practitioners and SDPs. Find opportunities, grow your network, and trust the platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="#home" className="hover:text-gray-200 transition-colors">Home</a></li>
            <li><a href="#features" className="hover:text-gray-200 transition-colors">Features</a></li>
            <li><a href="#about" className="hover:text-gray-200 transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-gray-200 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-200 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-200 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200 transition-colors"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-gray-200 transition-colors"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-200">
        &copy; {new Date().getFullYear()} SkillLinker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
