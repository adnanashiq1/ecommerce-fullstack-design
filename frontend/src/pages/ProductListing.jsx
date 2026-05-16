import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiFilter, FiGrid, FiList, FiX, FiStar } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api";

const categories = ["All", "Clothes and wear", "Home and outdoor", "Consumer electronics and gadgets", "Automobiles", "Tools and equipments"];
const brands = ["Huawei", "Apple", "Samsung", "Xiaomi", "Nokia"];
const features = ["Metalic", "Plastic", "8GB RAM", "Super power", "Large Memory"];
const ratings = [5, 4, 3, 2, 1];

const useQuery = () => new URLSearchParams(useLocation().search);

const ProductListing = () => {
  const query = useQuery();
  const searchQ = query.get("search") || "";
  const categoryQ = query.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryQ);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1200]);
  const [sortBy, setSortBy] = useState("Newest");
  const [viewMode, setViewMode] = useState("list");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProducts(
          searchQ,
          selectedCategory === "All" ? "" : selectedCategory
        );
        let result = [...data];
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        if (selectedRating) result = result.filter(p => p.rating >= selectedRating);
        if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
        if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
        setProducts(result);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchQ, selectedCategory, priceRange, selectedRating, sortBy]);

  const toggleBrand = (brand) =>
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);

  const Sidebar = () => (
    <div className="w-56 shrink-0">
      <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4">
        <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
        <ul className="space-y-1">
          {categories.map(cat => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm w-full text-left px-2 py-1.5 rounded transition-colors ${selectedCategory === cat ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4">
        <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
        <ul className="space-y-2">
          {brands.map(brand => (
            <li key={brand} className="flex items-center gap-2">
              <input type="checkbox" id={brand} checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-blue-600" />
              <label htmlFor={brand} className="text-sm text-gray-600 cursor-pointer">{brand}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4">
        <h3 className="font-semibold text-gray-800 mb-3">Price range</h3>
        <div className="flex gap-2 mb-2">
          <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full border border-gray-200 rounded px-2 py-1 text-sm outline-none" placeholder="Min" />
          <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full border border-gray-200 rounded px-2 py-1 text-sm outline-none" placeholder="Max" />
        </div>
        <button onClick={() => setPriceRange([...priceRange])} className="w-full bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700 transition-colors">Apply</button>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Ratings</h3>
        <ul className="space-y-2">
          {ratings.map(r => (
            <li key={r}>
              <button
                onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                className={`flex items-center gap-1 text-sm w-full text-left ${selectedRating === r ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
              >
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={12} className={i < r ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
                <span className="ml-1">& up</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-blue-600">Home</Link> &rsaquo;{" "}
        <span className="text-gray-700">{selectedCategory !== "All" ? selectedCategory : "All Products"}</span>
      </div>

      <div className="flex gap-6">
        <div className="hidden md:block"><Sidebar /></div>

        <div className="flex-1">
          {/* Toolbar */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 mb-4 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{products.length}</span> items found
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {selectedBrands.map(b => (
                <span key={b} className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">
                  {b} <FiX size={12} className="cursor-pointer" onClick={() => toggleBrand(b)} />
                </span>
              ))}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 rounded px-2 py-1 text-sm outline-none">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="flex items-center gap-1">
                <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-blue-600"}`}>
                  <FiList size={16} />
                </button>
                <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-blue-600"}`}>
                  <FiGrid size={16} />
                </button>
              </div>
              <button className="md:hidden flex items-center gap-1 text-sm text-blue-600 border border-blue-200 px-3 py-1 rounded" onClick={() => setShowFilter(!showFilter)}>
                <FiFilter size={14} /> Filter
              </button>
            </div>
          </div>

          {showFilter && <div className="md:hidden mb-4"><Sidebar /></div>}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 flex gap-4 animate-pulse">
                  <div className="w-28 h-24 bg-gray-200 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {!loading && viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.map(p => <ProductCard key={p._id || p.id} product={p} />)}
            </div>
          )}

          {!loading && viewMode === "list" && (
            <div className="space-y-3">
              {products.map(p => (
                <div key={p._id || p.id} className="bg-white rounded-lg border border-gray-100 p-4 flex gap-4 hover:shadow-sm transition-shadow">
                  <Link to={`/products/${p._id || p.id}`} className="shrink-0">
                    <img src={p.image} alt={p.name} className="w-28 h-24 object-cover rounded-lg" />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/products/${p._id || p.id}`} className="text-gray-700 font-medium hover:text-blue-600 text-sm">{p.name}</Link>
                    <div className="flex items-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} size={12} className={i < p.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                      ))}
                      <span className="text-xs text-gray-400">{p.reviews} reviews · {p.orders} orders</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{p.description}</p>
                    {p.shipping && <p className="text-green-600 text-xs">{p.shipping}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-blue-600 font-bold">${p.price?.toFixed(2)}</p>
                    {p.oldPrice && <p className="text-gray-400 text-xs line-through">${p.oldPrice?.toFixed(2)}</p>}
                    <Link to={`/products/${p._id || p.id}`} className="mt-2 block bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 text-xs px-3 py-1.5 rounded transition-all">
                      View detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No products found</p>
              <p className="text-sm mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;