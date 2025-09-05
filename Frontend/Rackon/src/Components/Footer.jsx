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
     <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
  {/* Logo */}
  <div className="col-span-2 md:col-span-1">
    <h2 className="text-2xl font-bold text-white">RACKON</h2>
  </div>

  {/* Company */}
  <div>
    <h3 className="text-white font-semibold mb-3">Company</h3>
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
      <li><a href="#">program</a></li>
    </ul>
  </div>

  {/* Host */}
  <div>
    <h3 className="text-white font-semibold mb-3">Host</h3>
    <ul className="space-y-2 text-sm">
      <li><a href="#">List your space</a></li>
      <li><a href="#">Community</a></li>
    </ul>
  </div>

  {/* Countries */}
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

  {/* Support */}
  <div>
    <h3 className="text-white font-semibold mb-3">Support</h3>
    <ul className="space-y-2 text-sm">
      <li><a href="#">Help Center</a></li>
      <li><a href="#">Trust and Safety</a></li>
      <li><a href="#">Terms</a></li>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">California Privacy</a></li>
    </ul>
  </div>

  {/* Download (now in same upper row) */}
  <div>
    <h3 className="text-white font-semibold mb-3">Download</h3>
    <ul className="space-y-2 text-sm">
      <li><a href="#">App Store</a></li>
      <li><a href="#">Google Play Store</a></li>
    </ul>
  </div>
</div>


      <div className="border-t border-gray-700 py-6 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <p className="text-sm">© Rackon</p>
        <div className="flex space-x-5 mt-4 md:mt-0 text-xl text-gray-400">
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
