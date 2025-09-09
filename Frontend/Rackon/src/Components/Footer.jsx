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
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-white">RACKON</h2>
          <div className="flex-1"></div>
        </div>
        <div className="col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">About</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
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
          <div>
            <h3 className="text-white font-semibold mb-3">Host</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">List your space</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Countries</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Deutschland</a></li>
              <li><a href="#">United Kingdom</a></li>
              <li><a href="#">United States</a></li>
              <li><a href="#">Canada</a></li>
              <li><a href="#">Australia</a></li>
              <li><a href="#">España</a></li>
              <li><a href="#">France</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">FAQ's</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Download</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">App Store</a></li>
              <li><a href="#">Google Play Store</a></li>
            </ul>
          </div>
        </div>
      </div>
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