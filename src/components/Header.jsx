import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Events", href: "/events" },
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 md:px-20 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600">
          SkillLinker
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="hover:text-blue-500 transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="btn btn-sm btn-outline flex items-center gap-2"
          >
            <FaSignInAlt /> Login
          </Link>
          <Link
            to="/register"
            className="btn btn-sm btn-primary flex items-center gap-2"
          >
            <FaUserPlus /> Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-blue-600"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg w-full absolute top-20 left-0">
          <nav className="flex flex-col gap-4 p-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-blue-500 transition-colors font-medium text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="btn btn-outline flex items-center justify-center gap-2 mx-auto mt-4"
              onClick={() => setIsOpen(false)}
            >
              <FaSignInAlt /> Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary flex items-center justify-center gap-2 mx-auto mt-2"
              onClick={() => setIsOpen(false)}
            >
              <FaUserPlus /> Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
