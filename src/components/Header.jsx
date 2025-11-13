import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Events", href: "/events" },
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 flex justify-between items-center h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          SkillLinker
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-medium transition-all duration-200 hover:text-blue-600 ${
                isActive(link.href)
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center space-x-3 ml-4">
            <Link
              to="/login"
              className="btn btn-sm btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <FaSignInAlt /> Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center gap-2"
            >
              <FaUserPlus /> Sign Up
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-blue-600 hover:text-blue-700 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-xl w-full absolute top-16 md:top-20 left-0 border-t border-gray-100">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-6 py-3 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive(link.href)
                    ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-6 pt-4 space-y-3">
              <Link
                to="/login"
                className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 w-full"
                onClick={() => setIsOpen(false)}
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center gap-2 w-full"
                onClick={() => setIsOpen(false)}
              >
                <FaUserPlus /> Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
