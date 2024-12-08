import { getProductByName } from '../../hooks/Products';
import { useLocation, useSearchParams } from 'react-router-dom';
import ListProductCard from '../Home/ListProducts/ListProductCard';
import { getCategories } from '../../hooks/Categories';
import React, { useState, useEffect } from 'react';

const ProductByName = () => {
    const [searchParams] = useSearchParams(); // Gọi useSearchParams ở đây
    const name = searchParams.get('name'); // Lấy tên sản phẩm từ tham số tìm kiếm
    const { products, loading, error } = getProductByName(name);
    const data = products || []; // Đảm bảo data không là undefined
    const [brand, setBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // Giá trị mặc định là '' cho "Tất cả"
    const [minPrice, setMinPrice] = useState(''); // Giá tối thiểu
    const [maxPrice, setMaxPrice] = useState(''); // Giá tối đa
    const [filteredProducts, setFilteredProducts] = useState(data); // Lưu trữ sản phẩm đã lọc
    const { categories } = getCategories();

    // Cập nhật filteredProducts khi dữ liệu sản phẩm thay đổi
    useEffect(() => {
        setFilteredProducts(data);
    }, [data]);

    // Hàm lọc sản phẩm
    const handleFilter = () => {
        const newFilteredProducts = data.filter((product) => {
            const isInPriceRange =
                (minPrice === '' || product.price >= Number(minPrice)) &&
                (maxPrice === '' || product.price <= Number(maxPrice));
            const isInCategory = selectedCategory ? product.categoryId === selectedCategory : true; // Nếu chọn "Tất cả", giá trị sẽ là true
            const isInBrand = brand ? product.brand.toLowerCase().includes(brand.toLowerCase()) : true;

            return isInPriceRange && isInCategory && isInBrand;
        });
        setFilteredProducts(newFilteredProducts); // Cập nhật danh sách sản phẩm đã lọc
    };

    return (
        <div className="p-4">
            <div className="mb-6 bg-white shadow rounded-lg p-4 flex flex-col">
                <h2 className="text-lg font-semibold mb-3 text-center">Lọc sản phẩm</h2>
                <div className="flex flex-wrap gap-2">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium" htmlFor="categorySelect">Danh mục:</label>
                        <select
                            id="categorySelect"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Tất cả</option> {/* Tùy chọn "Tất cả" */}
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium" htmlFor="brandInput">Thương hiệu:</label>
                        <input
                            id="brandInput"
                            type="text"
                            placeholder="Nhập thương hiệu"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium" htmlFor="minPriceInput">Giá tối thiểu:</label>
                        <input
                            id="minPriceInput"
                            type="number"
                            placeholder="Giá tối thiểu"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium" htmlFor="maxPriceInput">Giá tối đa:</label>
                        <input
                            id="maxPriceInput"
                            type="number"
                            placeholder="Giá tối đa"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleFilter}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Lọc
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="w-full flex flex-col justify-center items-center bg-main overflow-x-hidden mt-6">
                <ListProductCard data={{ products: filteredProducts, loading, error }} />
            </div>
        </div>
    );
}

export default ProductByName;