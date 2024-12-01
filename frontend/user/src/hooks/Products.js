import { useState, useEffect } from "react";
import axios from "axios";

const getProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5555/products");
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

const useProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                const response = await axios.get(`http://localhost:5555/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product. Please try again later.");
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};

const updateProduct = async ({id, quanlity}) => {
    try {
        const response = await axios.put(`http://localhost:5555/products/quanlity`, {id, quanlity});
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error update product:', error);
        throw error;
    }
};

const addProduct = async (product) => {
    try {
        const response = await axios.post(`http://localhost:5555/products`, product);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error add product:', error);
        throw error;
    }
};

const getProductByCategory = (id) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/products/category/${id}`);
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export {getProducts, useProduct, updateProduct, getProductByCategory, addProduct};