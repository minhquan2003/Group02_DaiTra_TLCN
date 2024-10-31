import React from "react";
import ProductCard from "./ProductCard";
import {getProducts} from '../../hooks/getProductHome'

const ListProductCard = () => {
    const product1s = [
        {
            name: "Product 1",
            description: "This is a great product.",
            price: 99.99,
            quantity: 10,
                image_url: "https://th.bing.com/th/id/OIP.cZm7JOorS1oYJ0KXuM7AHQHaHa?w=193&h=194&c=7&r=0&o=5&pid=1.7",
        },
        {
            name: "Product 2",
            description: "Another amazing product.",
            price: 79.99,
            quantity: 15,
            image_url: "https://th.bing.com/th/id/OIP.U6nypwIrPc6kgUXB2KG5ewHaIg?w=171&h=196&c=7&r=0&o=5&pid=1.7",
        },
        {
            name: "Product 3",
            description: "This product is highly versatile.",
            price: 129.99,
            quantity: 8,
            image_url: "https://th.bing.com/th/id/OIP.TN8V_lKCHPGkzX34xcWDagHaLH?w=146&h=219&c=7&r=0&o=5&pid=1.7",
        },
        {
            name: "Product 4",
            description: "A must-have for your collection.",
            price: 59.99,
            quantity: 20,
            image_url: "https://th.bing.com/th/id/OIP.WlbMG3DtUbg3hXCf24tz2wHaFJ?w=297&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            name: "Product 5",
            description: "This product will change your life.",
            price: 149.99,
            quantity: 5,
            image_url: "https://th.bing.com/th/id/OIP.aHmEw38MJ-CD9n7RB35sbQHaFE?w=273&h=187&c=7&r=0&o=5&pid=1.7",
        },
        {
            name: "Product 6",
            description: "This product will change your life.",
            price: 149.99,
            quantity: 5,
            image_url: "https://th.bing.com/th/id/OIP._B0kUaGBqsEQSzTDCDERLgHaGa?w=196&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            name: "Product 1",
            description: "This is a great product.",
            price: 90,
            quantity: 10,
                image_url: "https://th.bing.com/th/id/OIP.cZm7JOorS1oYJ0KXuM7AHQHaHa?w=193&h=194&c=7&r=0&o=5&pid=1.7",
        },
        {
            name: "Product 2",
            description: "Another amazing product.",
            price: 79.99,
            quantity: 15,
            image_url: "https://th.bing.com/th/id/OIP.U6nypwIrPc6kgUXB2KG5ewHaIg?w=171&h=196&c=7&r=0&o=5&pid=1.7",
        },
    ];

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
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