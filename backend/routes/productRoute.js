import express from 'express';
import {addProduct,
    getAllProducts,
    getProductById,
    getProductsByIdCategory,
    updateProduct,
    deleteProduct} from '../controllers/productController.js'

const productRoute = express.Router();

productRoute.post('/', addProduct);
productRoute.get('/', getAllProducts);
productRoute.get('/:id', getProductById);
productRoute.get('/category/:categoryId', getProductsByIdCategory);
productRoute.put('/:id', updateProduct);
productRoute.delete('/:id', deleteProduct);

export default productRoute;