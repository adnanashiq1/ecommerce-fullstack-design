import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiStar, FiHeart, FiShoppingCart, FiTruck, FiShield, FiRefreshCw, FiChevronRight } from "react-icons/fi";
import { fetchProduct, fetchProducts } from "../api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProduct(id);
        setProduct(data);
        const { data: all } = await fetchProducts("", data.category);
        setRelated(all.filter(p => (p._id || p.id) !== id).slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < qty; i++) addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full md:w-96 h-80 bg-gray-200 rounded-xl" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-24 text-gray-400">
      <p className="text-xl">Product not found</p>
      <Link to="/products" className="text-blue-600 mt-4 inline-block">Back to products</Link>
    </div>
  );

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;
  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <FiChevronRight size={14} />
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <FiChevronRight size={14} />
        <span className="text-gray-700 truncate max-w-xs">{product.name}</span>
      </div>

      <div className="flex gap-6 flex-col md:flex-row mb-8">
        {/* Images */}
        <div className="flex flex-col md:flex-row gap-3 md:w-96">
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImg(i)} className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${selectedImg === i ? "border-blue-500" : "border-gray-200"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 order-1 md:order-2">
            <div className="bg-gray-50 rounded-xl overflow-hidden h-72 md:h-80">
              <img src={images[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={14} className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.reviews} reviews</span>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-500">{product.orders} sold</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-blue-600">${product.price?.toFixed(2)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg">${product.oldPrice?.toFixed(2)}</span>
                  {discount && <span className="bg-red-100 text-red-500 text-sm px-2 py-0.5 rounded">-{discount}%</span>}
                </>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm text-gray-600">
            {[
              ["Condition", product.condition],
              ["Material", product.material],
              ["Category", product.category],
              ["Item num", product.itemNum],
            ].map(([label, val]) => val && (
              <div key={label} className="flex gap-4">
                <span className="text-gray-400 w-24">{label}:</span>
                <span>{val}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-sm mb-4">{product.description}</p>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100">−</button>
              <span className="px-4 py-2 text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
            </div>
            <button onClick={handleAddToCart} className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${added ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              <FiShoppingCart size={16} />
              {added ? "Added to cart!" : "Add to cart"}
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors">
              <FiHeart size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1"><FiShield size={14} className="text-green-500" /> Secure payment</div>
            <div className="flex items-center gap-1"><FiRefreshCw size={14} className="text-blue-500" /> Money back guarantee</div>
            <div className="flex items-center gap-1"><FiTruck size={14} className="text-purple-500" /> Free delivery</div>
          </div>
        </div>

        {/* Supplier */}
        <div className="w-full md:w-56 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">R</div>
              <p className="text-sm font-semibold text-gray-700">Guanjoi Trading LLC</p>
            </div>
            <div className="space-y-1 text-xs text-gray-500 mb-3">
              <p>🇩🇪 Germany</p>
              <p>✅ Verified</p>
              <p>🚚 Shipping</p>
            </div>
            <button className="w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-xs font-medium hover:bg-blue-50 mb-2">Send inquiry</button>
            <button className="w-full border border-gray-200 text-gray-600 rounded-lg py-2 text-xs font-medium hover:bg-gray-50">Seller's profile</button>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-xs text-gray-500 space-y-1">
            <p>✅ {product.stock} items in stock</p>
            <p>📦 Ready to ship in 2-3 days</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 mb-8">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {["description", "reviews", "shipping", "about seller"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors ${tab === t ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-6 text-sm text-gray-600">
          {tab === "description" && <p className="leading-relaxed">{product.description}</p>}
          {tab === "reviews" && <p>{product.reviews} customer reviews — Average: {product.rating}/5</p>}
          {tab === "shipping" && <p>Free shipping on orders over $50. Delivery in 3-7 business days.</p>}
          {tab === "about seller" && <p>Guanjoi Trading LLC — Verified supplier from Germany. Est. 2010.</p>}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Related products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {related.map(p => <ProductCard key={p._id || p.id} product={p} />)}
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white">
          <h3 className="text-xl font-bold mb-1">Super discount on more than 100 USD</h3>
          <p className="text-blue-100 text-sm">Have you ever finally just write dummy info</p>
        </div>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;