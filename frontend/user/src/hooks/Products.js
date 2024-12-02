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

const getProductsByIdSeller = (idSeller) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/products/user/${idSeller}`);
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

const getProductByName = (product) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching products for:", product); // Ghi nhận giá trị của product
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/products/search`, { params: { name: product } });
                setProducts(response.data.data); // Đảm bảo rằng response.data.data là chính xác
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (product) { // Chỉ gọi fetchProducts nếu product không rỗng
            fetchProducts();
        }
    }, [product]); // Thêm product vào dependency array

    console.log("Products:", products); // Ghi nhận sản phẩm đã lấy
    return { products, loading, error };
};

export {getProducts, useProduct, updateProduct, getProductByCategory, addProduct, getProductByName, getProductsByIdSeller};