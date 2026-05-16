import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchMyOrders } from "../api";
import { FiPackage, FiArrowLeft } from "react-icons/fi";

const statusColors = {
  Delivered: "bg-green-100 text-green-600",
  Shipped: "bg-blue-100 text-blue-600",
  Processing: "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-500",
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const load = async () => {
      try {
        const { data } = await fetchMyOrders();
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (!user) return (
    <div className="text-center py-24">
      <FiPackage size={48} className="text-gray-300 mx-auto mb-4" />
      <p className="text-gray-400 mb-4">Please login to view your orders</p>
      <Link to="/auth" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Login</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center gap-2 text-sm text-blue-600 mb-6 hover:text-blue-800 transition-colors">
        <FiArrowLeft size={16} /> Back to home
      </Link>
      <h1 className="text-xl font-bold text-gray-800 mb-6">My Orders</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <FiPackage size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No orders yet</p>
          <Link to="/products" className="text-blue-600 text-sm hover:underline">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FiPackage size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()} · {order.items?.length} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                  <p className="font-bold text-gray-800">${order.total?.toFixed(2)}</p>
                </div>
              </div>
              {/* Items preview */}
              <div className="flex gap-2 flex-wrap">
                {order.items?.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                    <img src={item.image} alt={item.name} className="w-6 h-6 object-cover rounded" />
                    <span className="text-xs text-gray-600">{item.name?.slice(0, 20)}...</span>
                    <span className="text-xs text-gray-400">×{item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Shipped to: {order.city}, {order.zip}</span>
                <span>Payment: <span className="capitalize font-medium text-gray-600">{order.paymentMethod}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;