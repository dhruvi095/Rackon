import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const isAuthenticated = localStorage.getItem("token"); // 👈 login state check (example)

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12">
          {/* Logo */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white">RACKON</h2>
          </div>

          {/* Links Section */}
          <div className="flex-1 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:ml-40 gap-8 text-center sm:text-left">
            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-3">Get to Know us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#">About</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-white font-semibold mb-3">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#">Activities</a></li>
                <li><a href="#">Locations</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="#">Ambassador</a></li>
                <li><a href="#">Program</a></li>
              </ul>
            </div>

            {/* Countries */}
            <div>
              <h3 className="text-white font-semibold mb-3">Countries</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#">India</a></li>
                <li><a href="#">United Kingdom</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-white font-semibold mb-3">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={isAuthenticated ? "/Contact" : "/login"}>Contact Us</a>
                </li>
                <li>
                  <a href={isAuthenticated ? "/TC" : "/login"}>Terms & Conditions</a>
                </li>
                <li>
                  <a href={isAuthenticated ? "/PP" : "/login"}>Privacy Policy</a>
                </li>
                <li>
                  <a href={isAuthenticated ? "/FAQ" : "/login"}>FAQ's</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-6 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <p className="text-sm text-center md:text-left">© Rackon</p>
        <div className="flex flex-wrap justify-center md:justify-end gap-5 text-xl text-gray-400">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaTwitter className="hover:text-white cursor-pointer" />
          <FaLinkedinIn className="hover:text-white cursor-pointer" />
          <FaPinterestP className="hover:text-white cursor-pointer" />
          <FaTiktok className="hover:text-white cursor-pointer" />
          <FaYoutube className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
