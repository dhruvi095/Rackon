import React, { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">Rackon</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-gray-700">
            <a href="#" className="hover:text-black">Magazine</a>
            <a href="#" className="hover:text-black">Help</a>
            <a href="/Sign" className="hover:text-black">Sign up</a>
            <a href="/Login" className="hover:text-black">Log in</a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-sm">
          <nav className="flex flex-col space-y-2 px-4 py-3 text-gray-700">
            <a href="#" className="hover:text-black">Magazine</a>
            <a href="#" className="hover:text-black">Help</a>
            <a href="#" className="hover:text-black">Sign up</a>
            <a href="#" className="hover:text-black">Log in</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
