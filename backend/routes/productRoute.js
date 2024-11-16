import express from 'express';
import {addProduct,
    getAllProducts,
    getProductById,
    getProductsByIdCategory,
    getProductsByUserIdController,
    searchProductsByNameController,
    updateProduct,
    deleteProduct} from '../controllers/productController.js'

const productRoute = express.Router();

productRoute.post('/', addProduct);
productRoute.get('/', getAllProducts);
productRoute.get('/search', searchProductsByNameController);
productRoute.get('/:id', getProductById);
productRoute.get('/category/:categoryId', getProductsByIdCategory);
productRoute.get('/user/:userId', getProductsByUserIdController);
productRoute.put('/:id', updateProduct);
productRoute.delete('/:id', deleteProduct);

export default productRoute;