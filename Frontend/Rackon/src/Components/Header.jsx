import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [helpOpen, setHelpOpen] = useState(false); // help dropdown
  const [isAuthenticated, setIsAuthenticated] = useState(false); // login/register check

  const toggleHelp = () => {
    if (isAuthenticated) {
      setHelpOpen(!helpOpen);
    }
  };

  // Dummy logout (real ma backend thi handle karjo)
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">Rackon</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-black font-medium">
            <a href="#" className="hover:text-green-600">Magazine</a>

            {/* Help Dropdown (always visible, only opens if logged in) */}
            <div className="relative group">
              <button
                onClick={toggleHelp}
                className={`flex items-center ${
                  isAuthenticated ? "hover:text-green-600" : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Help
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Dropdown Menu (only if logged in) */}
              {isAuthenticated && helpOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <a href="/Contact" className="block px-4 py-2 text-black hover:bg-gray-100">Contact Us</a>
                  <a href="/TC" className="block px-4 py-2 text-black hover:bg-gray-100">Terms & Conditions</a>
                  <a href="/PP" className="block px-4 py-2 text-black hover:bg-gray-100">Privacy Policy</a>
                  <a href="/FAQ" className="block px-4 py-2 text-black hover:bg-gray-100">FAQ’s</a>
                </div>
              )}
            </div>

            {/* Show Sign up / Log in only if NOT authenticated */}
            {!isAuthenticated ? (
              <>
                <a href="/Sign" className="hover:text-green-600">Sign up</a>
                <a href="/Login" className="hover:text-green-600">Log in</a>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
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
          <nav className="flex flex-col space-y-2 px-4 py-3 text-black font-medium">
            <a href="#" className="hover:text-green-600">Magazine</a>

            {/* Help (always visible, only expands if logged in) */}
            <details className="group" open={false}>
              <summary
                className={`flex items-center cursor-pointer ${
                  isAuthenticated ? "hover:text-green-600" : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => {
                  if (!isAuthenticated) e.preventDefault();
                }}
              >
                Help
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </summary>
              {isAuthenticated && (
                <div className="pl-4 mt-2 flex flex-col space-y-1">
                  <a href="/Contact" className="block px-2 py-1 text-black hover:bg-gray-100 rounded">Contact Us</a>
                  <a href="/TC" className="block px-2 py-1 text-black hover:bg-gray-100 rounded">Terms & Conditions</a>
                  <a href="/PP" className="block px-2 py-1 text-black hover:bg-gray-100 rounded">Privacy Policy</a>
                  <a href="/FAQ" className="block px-2 py-1 text-black hover:bg-gray-100 rounded">FAQ’s</a>
                </div>
              )}
            </details>

            {/* Show Sign up / Log in only if NOT authenticated */}
            {!isAuthenticated ? (
              <>
                <a href="/Sign" className="hover:text-green-600">Sign up</a>
                <a href="/Login" className="hover:text-green-600">Log in</a>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-1 mt-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
