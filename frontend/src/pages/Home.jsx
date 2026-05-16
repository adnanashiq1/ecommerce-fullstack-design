import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const categories = [
  "Automobiles", "Clothes and wear", "Home interiors",
  "Computer and tech", "Tools, equipments", "Sports and outdoor",
  "Animal and pets", "Machinery tools", "More category",
];

const dealProducts = products.slice(0, 5);
const recommended = products.slice(0, 6);

const homeItems = [
  { name: "Soft chairs", price: "From USD 19", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=160&fit=crop&crop=center" },
  { name: "Sofa & chair", price: "From USD 19", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200&h=160&fit=crop&crop=center" },
  { name: "Kitchen dishes", price: "From USD 19", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=160&fit=crop&crop=center" },
  { name: "Smart watches", price: "From USD 19", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=160&fit=crop&crop=center" },
  { name: "Kitchen mixer", price: "From USD 100", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&h=160&fit=crop&crop=center" },
  { name: "Blenders", price: "From USD 39", img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200&h=160&fit=crop&crop=center" },
  { name: "Home appliance", price: "From USD 19", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=160&fit=crop&crop=center" },
  { name: "Coffee maker", price: "From USD 10", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=160&fit=crop&crop=center" },
];

const electronicsItems = [
  { name: "Smart watches", price: "From USD 19", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=160&fit=crop&crop=center" },
  { name: "Cameras", price: "From USD 89", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=160&fit=crop&crop=center" },
  { name: "Headphones", price: "From USD 10", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=160&fit=crop&crop=center" },
  { name: "Smart watches", price: "From USD 90", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=160&fit=crop&crop=center" },
  { name: "Gaming set", price: "From USD 35", img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&h=160&fit=crop&crop=center" },
  { name: "Laptops & PC", price: "From USD 340", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=160&fit=crop&crop=center" },
  { name: "Smartphones", price: "From USD 240", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=160&fit=crop&crop=center" },
  { name: "Electric kettle", price: "From USD 240", img: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200&h=160&fit=crop&crop=center" },
];

const CategorySection = ({ title, bgColor, items, category }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
    <div className="flex flex-col md:flex-row">
      {/* Left label */}
      <div className={`${bgColor} p-5 flex flex-col justify-between md:w-40 w-full`}>
        <h3 className="font-bold text-gray-800 text-sm leading-snug">{title}</h3>
        <Link
          to={`/products?category=${category}`}
          className="mt-4 inline-block bg-white text-gray-700 text-xs px-3 py-1.5 rounded-md text-center hover:bg-gray-50 shadow-sm transition-colors w-fit"
        >
          Source now
        </Link>
      </div>

      {/* Grid of items */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-gray-100">
        {items.map((item, index) => (
          <Link
            key={index}
            to="/products"
            className="flex flex-col items-center p-3 hover:bg-gray-50 transition-colors group"
          >
            {/* Fixed size image container */}
            <div className="w-full h-28 rounded-lg overflow-hidden mb-2 bg-gray-100">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs font-medium text-gray-700 text-center leading-tight">{item.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [time] = useState({ days: 4, hours: 13, mins: 34, secs: 56 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">

      {/* Hero Section */}
      <div className="flex gap-4 mb-8">
        {/* Sidebar categories */}
        <div className="hidden md:block w-48 bg-white rounded-lg border border-gray-100 p-3 h-fit">
          <ul className="space-y-1 text-sm text-gray-600">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/products?category=${cat}`}
                  className="flex items-center justify-between hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded transition-colors"
                >
                  <span>{cat}</span>
                  {cat !== "More category" && <FiChevronRight size={14} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Banner */}
        <div className="flex-1 bg-teal-50 rounded-xl overflow-hidden relative min-h-56 flex items-center">
          <div className="z-10 p-8">
            <p className="text-gray-500 text-sm mb-1">Latest trending</p>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Electronic<br />items
            </h1>
            <Link
              to="/products"
              className="bg-white text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors inline-block"
            >
              Learn more
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop&crop=center"
              alt="Hero"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right promo cards */}
        <div className="hidden lg:flex flex-col gap-3 w-44">
          <div className="bg-orange-50 rounded-xl p-4 flex-1 flex flex-col justify-between border border-orange-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">Hi, user</p>
              <p className="text-sm font-semibold text-gray-700">let's get started</p>
            </div>
            <button className="bg-orange-400 text-white text-xs px-3 py-1.5 rounded-md mt-2 hover:bg-orange-500 transition-colors">
              Join now
            </button>
          </div>
          <div className="bg-teal-500 rounded-xl p-4 flex-1 flex flex-col justify-between">
            <p className="text-xs text-white opacity-90 leading-relaxed">Get US $10 off with a new supplier</p>
            <button className="bg-white text-teal-600 text-xs px-3 py-1.5 rounded-md mt-2 font-medium hover:bg-gray-50 transition-colors">
              Send quotes
            </button>
          </div>
        </div>
      </div>

      {/* Deals and Offers */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Deals and offers</h2>
            <p className="text-gray-400 text-sm">Hygiene equipments</p>
          </div>
          <div className="flex gap-2">
            {[
              { label: "Days", val: time.days },
              { label: "Hour", val: time.hours },
              { label: "Min", val: time.mins },
              { label: "Sec", val: time.secs },
            ].map(({ label, val }) => (
              <div key={label} className="bg-red-500 text-white rounded-lg px-3 py-1.5 text-center min-w-[52px]">
                <p className="text-lg font-bold leading-none">{String(val).padStart(2, "0")}</p>
                <p className="text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {dealProducts.map((p) => {
            const disc = p.oldPrice
              ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
              : null;
            return (
              <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col items-center text-center group">
                {/* Fixed image box */}
                <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-gray-600 line-clamp-1 font-medium">{p.name}</p>
                {disc && (
                  <span className="mt-1 bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full font-medium">
                    -{disc}%
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Home and Outdoor */}
      <CategorySection
        title="Home and outdoor"
        bgColor="bg-teal-50"
        items={homeItems}
        category="Home and outdoor"
      />

      {/* Consumer Electronics */}
      <CategorySection
        title="Consumer electronics and gadgets"
        bgColor="bg-blue-50"
        items={electronicsItems}
        category="Consumer electronics and gadgets"
      />

      {/* Supplier Inquiry Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-400 rounded-xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="text-white flex-1">
          <h2 className="text-2xl font-bold mb-2">An easy way to send requests to all suppliers</h2>
          <p className="text-blue-100 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
        <div className="bg-white rounded-xl p-5 w-full md:w-80 shadow-lg shrink-0">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Send quote to suppliers</h3>
          <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-blue-400" placeholder="What item you need?" />
          <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-blue-400 resize-none" rows={2} placeholder="Type more details" />
          <div className="flex gap-2 mb-3">
            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="Quantity" />
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
              <option>Pcs</option>
              <option>Kg</option>
              <option>Box</option>
            </select>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
            Send inquiry
          </button>
        </div>
      </div>

      {/* Recommended Items */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended items</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Extra Services */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Our extra services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Source from Industry Hubs", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=200&fit=crop&crop=center" },
            { title: "Customize Your Products", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&crop=center" },
            { title: "Fast, reliable shipping by ocean or air", img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=400&h=200&fit=crop&crop=center" },
            { title: "Product monitoring and inspection", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop&crop=center" },
          ].map((s) => (
            <div key={s.title} className="relative rounded-xl overflow-hidden h-36 group cursor-pointer">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                <p className="text-white text-xs font-medium leading-snug">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 rounded-xl p-8 text-center mb-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Subscribe on our newsletter</h2>
        <p className="text-gray-400 text-sm mb-4">Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="flex max-w-md mx-auto gap-2">
          <div className="flex-1 flex items-center border border-gray-200 rounded-lg bg-white px-3 gap-2">
            <span className="text-gray-400 text-sm">✉</span>
            <input type="email" placeholder="Email" className="flex-1 py-2 text-sm outline-none" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;