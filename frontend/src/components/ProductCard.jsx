import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200 group overflow-hidden">
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:text-red-500 transition-colors">
          <FiHeart size={16} />
        </button>
      </div>

      <div className="p-3">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2 mb-1 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={12}
              className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">{product.reviews}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600 font-semibold">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-gray-400 text-xs line-through">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        {product.shipping && (
          <p className="text-green-600 text-xs mb-2">{product.shipping}</p>
        )}

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 text-sm py-1.5 rounded transition-all duration-200"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;