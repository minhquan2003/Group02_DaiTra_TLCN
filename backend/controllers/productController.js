// backend/controllers/productController.js
import {
    createProduct,
    getProducts,
    getOneProductById,
    updateOneProduct,
    deleteOneProduct
} from '../services/productService.js'; // Đảm bảo đường dẫn đúng

// Thêm sản phẩm
const addProduct = async (req, res) => {
    try {
        const product = await createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        return res.status(200).send(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
    try {
        const product = await getOneProductById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const product = await updateOneProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const product = await deleteOneProduct(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct};