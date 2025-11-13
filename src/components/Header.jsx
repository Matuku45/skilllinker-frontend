// src/components/Header.jsx
import React, { useState } from "react";
import { FaBars, FaTimes, FaUser, FaSignInAlt } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 md:px-20 flex justify-between items-center h-20">
        <div className="text-2xl font-bold text-blue-600">
          SkillLinker
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          <Fade cascade direction="right">
            <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            <button className="btn btn-sm btn-outline flex items-center gap-2">
              <FaSignInAlt /> Login
            </button>
          </Fade>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col gap-4 p-6 text-center">
            <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            <button className="btn btn-outline flex items-center justify-center gap-2 mx-auto mt-4">
              <FaSignInAlt /> Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
