import React from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 text-white p-1.5 rounded-md">
                <FiPackage size={18} />
              </div>
              <span className="text-blue-600 font-bold text-xl">Brand</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex gap-3 text-gray-400">
              <FiFacebook className="hover:text-blue-600 cursor-pointer" size={18} />
              <FiTwitter className="hover:text-blue-400 cursor-pointer" size={18} />
              <FiLinkedin className="hover:text-blue-700 cursor-pointer" size={18} />
              <FiInstagram className="hover:text-pink-500 cursor-pointer" size={18} />
              <FiYoutube className="hover:text-red-600 cursor-pointer" size={18} />
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">About</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {["About Us", "Find store", "Categories", "Blogs"].map((item) => (
                <li key={item}><Link to="/" className="hover:text-blue-600">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Partnership</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {["About Us", "Find store", "Categories", "Blogs"].map((item) => (
                <li key={item}><Link to="/" className="hover:text-blue-600">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Information</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {["Help Centre", "Money Refund", "Shipping", "Contact us"].map((item) => (
                <li key={item}><Link to="/" className="hover:text-blue-600">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* For users + App */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">For users</h4>
            <ul className="space-y-2 text-sm text-gray-500 mb-4">
              {["Login", "Register", "Settings", "My Orders"].map((item) => (
                <li key={item}><Link to="/" className="hover:text-blue-600">{item}</Link></li>
              ))}
            </ul>
            <h4 className="font-semibold text-gray-800 mb-3">Get app</h4>
            <div className="flex flex-col gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-400">
        © 2023 Ecommerce.
      </div>
    </footer>
  );
};

export default Footer;