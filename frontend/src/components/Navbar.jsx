import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart, FiUser, FiPackage, FiMessageSquare,
  FiMenu, FiX, FiChevronDown, FiLogOut, FiSettings, FiList
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All category");
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const categories = [
    "All category", "Clothes and wear", "Home and outdoor",
    "Consumer electronics and gadgets", "Automobiles", "Tools and equipments",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${search}&category=${category}`);
  };

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/");
  };

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-fit">
            <div className="bg-blue-600 text-white p-1.5 rounded-md">
              <FiPackage size={18} />
            </div>
            <span className="text-blue-600 font-bold text-xl">Brand</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl border border-gray-200 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-l border-gray-200 px-3 py-2 text-sm text-gray-600 bg-white outline-none cursor-pointer"
            >
              {categories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-medium transition-colors">
              Search
            </button>
          </form>

          {/* Nav icons */}
          <div className="hidden md:flex items-center gap-5 ml-auto text-gray-600">
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex flex-col items-center text-xs hover:text-blue-600 transition-colors"
              >
                <FiUser size={20} />
                <span>{user ? (user.name || "User").split(" ")[0] : "Profile"}</span>
              </button>
              {userDropdown && (
                <div className="absolute right-0 top-10 bg-white border border-gray-100 rounded-xl shadow-lg w-48 py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        {user.isAdmin && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full mt-1 inline-block">Admin</span>
                        )}
                      </div>
                      {user.isAdmin && (
                        <Link to="/admin" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                          <FiSettings size={14} /> Admin Panel
                        </Link>
                      )}
                      <Link to="/orders" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                        <FiList size={14} /> My Orders
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-50">
                        <FiLogOut size={14} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                        <FiUser size={14} /> Login
                      </Link>
                      <Link to="/auth?mode=register" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                        <FiUser size={14} /> Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/messages" className="flex flex-col items-center text-xs hover:text-blue-600 transition-colors">
              <FiMessageSquare size={20} />
              <span>Message</span>
            </Link>

            <Link to="/orders" className="flex flex-col items-center text-xs hover:text-blue-600 transition-colors">
              <FiPackage size={20} />
              <span>Orders</span>
            </Link>

            <Link to="/cart" className="flex flex-col items-center text-xs hover:text-blue-600 transition-colors relative">
              <FiShoppingCart size={20} />
              <span>My cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-6 text-sm text-gray-600 overflow-x-auto">
          <button className="flex items-center gap-1 font-medium whitespace-nowrap hover:text-blue-600">
            <FiMenu size={16} /> All category
          </button>
          {["Hot offers", "Gift boxes", "Projects", "Menu item", "Help"].map((item) => (
            <Link key={item} to="/products" className="whitespace-nowrap hover:text-blue-600 transition-colors">
              {item}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-4 text-sm whitespace-nowrap">
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              English, USD <FiChevronDown size={14} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              Ship to 🇩🇪 <FiChevronDown size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 text-sm text-gray-700">
          {user ? (
            <>
              <div className="pb-2 border-b border-gray-100">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              {user.isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600"><FiSettings /> Admin Panel</Link>
              )}
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600"><FiList /> My Orders</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center gap-2 text-red-400"><FiLogOut /> Logout</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600"><FiUser /> Login / Register</Link>
          )}
          <Link to="/messages" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600"><FiMessageSquare /> Message</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
            <FiShoppingCart /> My cart {cartCount > 0 && <span className="bg-orange-500 text-white text-xs rounded-full px-1.5">{cartCount}</span>}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;