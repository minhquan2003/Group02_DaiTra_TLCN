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
import ProductByName from '../src/components/Search/Search'
import SellerPage from "./components/SellerPage/SellerPage";
import PurchaseOrder from "./components/Order/PurchaseOrder";
import SalesOder from "./components/Order/SalesOder";
import EditSalePage from "./components/EditPageSale/EditPageSale";

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
          <Route path="/search" element={<ProductByName />} />
          <Route path="/seller/:sellerId" element={<SellerPage />} />
          <Route path="/purchaseOrder/:orderId" element={<PurchaseOrder />} />
          <Route path="/salesOder/:orderId" element={<SalesOder />} />
          <Route path="/editSale/:sellerId" element={<EditSalePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
