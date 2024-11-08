import React from "react";
import ProductCard from "./ProductCard";
import {getProducts} from '../../../hooks/Products'

const ListProductCard = () => {
    const { products, loading, error } = getProducts();
    
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="inline-block relative w-20 h-20 animate-spin">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-gray-500 rounded-full"></div>
                    </div>
                    <span className="ml-4 text-gray-500">Loading products...</span>
                </div>
            ) : error ? (
                <div className="text-red-500 font-bold">Error: {error}</div>
            ) : (
                <div className="flex flex-wrap mt-2 mb-2">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            quantity={product.quantity}
                            image_url={product.image_url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListProductCard;