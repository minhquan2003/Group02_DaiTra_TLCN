import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import MainLayout from "./components/Layout/Main";
import ProductDisplay from "./components/ProductDetail/ProductDetail"
import ProductCardHome from "./pages/Home";
import Cart from '../src/components/Cart/Cart'
import Checkout from '../src/components/Checkout/Checkout'
import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductHome = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/products/category/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    fetchProduct();
  }, [id]);

  return (
    <div>
      <h1>Product Card</h1>
      {product ? (
        <div>
          <p>Category ID: {id}</p>
          {/* Hiển thị thông tin sản phẩm ở đây */}
          <pre>{JSON.stringify(product, null, 2)}</pre> {/* Hiển thị dữ liệu sản phẩm */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/category/:id" element={<ProductHome />} />
          <Route path="/" element={<ProductCardHome />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
