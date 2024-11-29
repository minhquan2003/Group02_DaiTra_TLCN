import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import MainLayout from "./components/Layout/Main";
import ProductDisplay from "./components/ProductDetail/ProductDetail"
import ProductCardHome from "./pages/Home";
import Cart from '../src/components/Cart/Cart'
import Checkout from '../src/components/Checkout/Checkout';
import ProductByCategogy from "./components/Home/ProductByCategory/ProductByCategogy";
import EditProfile from "./components/Profile/EditProfile";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ProductCardHome />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route path="/product/category/:categoryId" element={<ProductByCategogy />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/:id" element={<EditProfile />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
