import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login/index";
import SignupPage from "./pages/SignUp/index";
import MainLayout from "./components/Layout/Main";
import ProductDetailPage from "./pages/ProductDetail/index"
import ProductCardHome from "./pages/Home/index";
import CartPage from './pages/Cart/index'
import CheckoutPage from './pages/Checkout/index';
import ProductByCategogyPage from "./pages/ProductByCategogy/index";
import EditProfilePage from "./pages/EditProfile/index";
import PostProductPage from './pages/PostProduct/index'
import Order from "./components/Order/Order";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ProductCardHome />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product/category/:categoryId" element={<ProductByCategogyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/:id" element={<EditProfilePage />} />
          <Route path="/post" element={<PostProductPage />} />
          <Route path="/order/:id" element={<Order />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
