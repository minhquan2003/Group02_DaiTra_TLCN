import React, { useState } from "react";
import useProducts from "../../hooks/useProduct";

const ProductList = () => {
  const { products, loading, error, deleteProduct, hideProduct } =
    useProducts("approved");
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-lg text-red-500">{error}</div>;

  const handleMenuClick = (productId) => {
    setSelectedProduct(productId === selectedProduct ? null : productId);
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-md mt-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        APPROVED PRODUCTS
      </h2>
      {products.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No approved products available.
        </div>
      ) : (
        products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg relative">
            <div className="flex items-center">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Category: {product.category_name}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {product.price.toLocaleString()} VND
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity: {product.quantity}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description.split(" ").slice(0, 10).join(" ")}...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted by: {product.username}
                </p>
              </div>
              <div className="ml-auto relative">
                <button
                  onClick={() => handleMenuClick(product._id)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  &#x22EE;
                </button>
                {selectedProduct === product._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => hideProduct(product._id)}
                      className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
                    >
                      Hide
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
