// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Público
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Search from "./pages/Search.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

// Auth
import Login from "./pages/auth/Login.jsx";

// Driver
import DriverLogin from "./pages/driver/DriverLogin.jsx";
import DriverDashboard from "./pages/driver/DriverDashboard.jsx";
import DriverOrders from "./pages/driver/DriverOrders.jsx";
import DriverOrderDetail from "./pages/driver/DriverOrderDetail.jsx"; // ✅ importado

// Admin
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Products from "./pages/admin/Products.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Inventory from "./pages/admin/Inventory.jsx";
import Comments from "./pages/admin/Comments.jsx";

// 🔐 Rutas privadas
import PrivateRoute from "./components/PrivateRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:id" element={<Category />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/producto/:id" element={<ProductDetail />} />

        {/* Autenticación */}
        <Route path="/acceso" element={<Login />} />

        {/* Repartidor */}
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/orders" element={<DriverOrders />} />
        <Route path="/driver/orders/:id" element={<DriverOrderDetail />} /> {/* ✅ nueva ruta */}

        {/* Admin protegido */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="productos" element={<Products />} />
            <Route path="categorias" element={<Categories />} />
            <Route path="inventario" element={<Inventory />} />
            <Route path="comentarios" element={<Comments />} />
          </Route>
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 📢 Notificaciones */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </BrowserRouter>
  </StrictMode>
);
