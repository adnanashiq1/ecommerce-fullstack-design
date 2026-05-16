import axios from "axios";

const API = axios.create({ baseURL: "https://ecommerce-fullstack-design-snzu.vercel.app/api" });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

// Products
export const fetchProducts = (search = "", category = "") =>
  API.get(`/products?search=${search}&category=${category}`);
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Auth
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// Orders
export const createOrder = (data) => API.post("/orders", data);
export const fetchMyOrders = () => API.get("/orders/myorders");
export const fetchAllOrders = () => API.get("/orders");