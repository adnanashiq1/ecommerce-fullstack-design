import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import { useAuth } from "./context/AuthContext";

const ProtectedAdmin = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.isAdmin) return <Navigate to="/auth" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth - no navbar/footer */}
        <Route path="/auth" element={<Auth />} />

        {/* Admin - no navbar/footer */}
        <Route path="/admin" element={
          <ProtectedAdmin><Admin /></ProtectedAdmin>
        } />

        {/* All other pages - with navbar/footer */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/messages" element={<Messages />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;