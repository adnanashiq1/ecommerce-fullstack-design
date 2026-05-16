import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiTrash2, FiArrowLeft, FiShield, FiHeadphones,
  FiTruck, FiTag, FiCheck, FiCreditCard
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [step, setStep] = useState("cart"); // cart | checkout | success
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "",
    address: "", city: "", zip: "",
    cardNumber: "", cardExpiry: "", cardCVV: "",
  });
  const [placing, setPlacing] = useState(false);

  const shipping = cart.length > 0 ? 10.00 : 0;
  const tax = cart.length > 0 ? 7.00 : 0;
  const total = cartTotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      setDiscount(cartTotal * 0.1);
      setCouponMsg("✅ 10% discount applied!");
    } else {
      setCouponMsg("❌ Invalid code. Try SAVE10");
    }
    setTimeout(() => setCouponMsg(""), 3000);
  };

  const handleCheckout = () => {
    if (!user) { navigate("/auth"); return; }
    setStep("checkout");
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    // Simulate order placement
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    setStep("success");
    setPlacing(false);
    window.scrollTo(0, 0);
  };

  // Success screen
  if (step === "success") return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck size={32} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-400 mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-left space-y-2">
          <div className="flex justify-between"><span className="text-gray-500">Order number</span><span className="font-semibold">#{Math.floor(Math.random() * 90000) + 10000}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-semibold">{form.email}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className="font-semibold capitalize">{paymentMethod}</span></div>
        </div>
        <Link to="/" className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );

  // Checkout screen
  if (step === "checkout") return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-sm text-blue-600 mb-6 hover:text-blue-800">
        <FiArrowLeft size={16} /> Back to cart
      </button>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="flex gap-6 flex-col lg:flex-row">
        <form onSubmit={handlePlaceOrder} className="flex-1 space-y-4">
          {/* Shipping info */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Full Name", key: "name", type: "text", required: true, col: 2 },
                { label: "Email", key: "email", type: "email", required: true, col: 2 },
                { label: "Address", key: "address", type: "text", required: true, col: 2 },
                { label: "City", key: "city", type: "text", required: true, col: 1 },
                { label: "ZIP Code", key: "zip", type: "text", required: true, col: 1 },
              ].map(({ label, key, type, required, col }) => (
                <div key={key} className={col === 2 ? "sm:col-span-2" : ""}>
                  <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required={required}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { id: "card", label: "💳 Credit Card" },
                { id: "paypal", label: "🅿️ PayPal" },
                { id: "cod", label: "💵 Cash on Delivery" },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${paymentMethod === m.id ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={form.cardNumber}
                    onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                    maxLength={19}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={form.cardExpiry}
                      onChange={e => setForm({ ...form, cardExpiry: e.target.value })}
                      maxLength={5}
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={form.cardCVV}
                      onChange={e => setForm({ ...form, cardCVV: e.target.value })}
                      maxLength={3}
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-600 text-center">
                You will be redirected to PayPal after placing your order.
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="bg-green-50 rounded-xl p-4 text-sm text-green-600 text-center">
                Pay when your order arrives at your doorstep.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={placing}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <FiCreditCard size={16} />
            {placing ? "Placing order..." : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        {/* Order summary sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
            <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id || item._id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 shrink-0">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-500"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Cart screen
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">My cart ({cart.length} items)</h1>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-xl border border-gray-100">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
          <Link to="/products" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
              {cart.map((item, index) => (
                <div key={item.id || item._id} className={`flex gap-4 p-4 ${index < cart.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <Link to={`/products/${item._id || item.id}`} className="shrink-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item._id || item.id}`} className="text-sm font-medium text-gray-700 hover:text-blue-600 line-clamp-2">
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                    <button onClick={() => removeFromCart(item.id || item._id)} className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1 mt-2 transition-colors">
                      <FiTrash2 size={12} /> Remove
                    </button>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="font-bold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(item.id || item._id, item.qty - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm">−</button>
                      <span className="px-3 py-1 text-sm font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.id || item._id, item.qty + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <Link to="/products" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                <FiArrowLeft size={16} /> Back to shop
              </Link>
              <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 flex items-center gap-1">
                <FiTrash2 size={14} /> Remove all
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <FiShield className="text-blue-600" size={20} />, title: "Secure payment", desc: "Your payment info is always safe" },
                { icon: <FiHeadphones className="text-blue-600" size={20} />, title: "Customer support", desc: "We're here to help 24/7" },
                { icon: <FiTruck className="text-blue-600" size={20} />, title: "Free delivery", desc: "On orders over $50" },
              ].map(b => (
                <div key={b.title} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                  {b.icon}
                  <p className="text-xs font-semibold text-gray-700 mt-2">{b.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-72 shrink-0">
            {/* Coupon */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FiTag size={14} /> Have a coupon?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder='Try "SAVE10"'
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
                <button onClick={applyCoupon} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  Apply
                </button>
              </div>
              {couponMsg && <p className="text-xs mt-2">{couponMsg}</p>}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span><span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800 text-base">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-semibold mt-4 transition-colors"
              >
                {user ? `Checkout — $${total.toFixed(2)}` : "Login to Checkout"}
              </button>
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                {["VISA", "MC", "PayPal", "Apple Pay"].map(p => (
                  <div key={p} className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-500">{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;