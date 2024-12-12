import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByIdSeller } from '../../hooks/Products'; // Giả sử bạn đã có hook này
import BackButton from '../../commons/BackButton';
import { useUserById } from '../../hooks/Users';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { deleteProductById } from '../../hooks/Products';

const EditSalePage = () => {
    const { sellerId } = useParams();
    const { products, loading, error } = getProductsByIdSeller(sellerId);
    const sellerInfo = useUserById(sellerId);
    const navigate = useNavigate();

    const handleDeleteProduct = async (idPro) => {
        const confirmed = window.confirm("Bạn có muốn xóa sản phẩm ra khỏi danh sách sản phẩm của bạn không?");
        
        if (confirmed) {
            try {
                await deleteProductById(idPro);
                // Load lại trang sau khi xóa thành công
                navigate(0); // Điều hướng lại trang hiện tại
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const ProductCard = ({ id, name, description, price, quantity, image_url, partner }) => {
        return (
            <div className="flex mt-2 mb-2 justify-center items-center" style={{ width: '300px', height: '450px' }}>
                <div className="bg-white h-full border rounded-lg shadow-md p-2 m-2 transition-shadow duration-300">
                    <div className="w-full h-[55%] overflow-hidden rounded-t-lg">
                        <img 
                            src={image_url} 
                            alt={name} 
                            className="object-cover" 
                            style={{ width: '250px', height: '200px' }} 
                        />
                    </div>
                    <div className="w-full h-[45%] p-4">
                        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                        {String(partner) === "true" ? (
                            <p className="text-sm text-green-600 mt-1 flex items-center">
                                <FaCheckCircle className="mr-1" />
                                Đảm bảo
                            </p>
                        ) : null}
                        <p className="text-lg font-bold text-gray-800 mt-2">{price.toLocaleString('vi-VN')} VNĐ</p>
                        <p className="text-gray-500">Số lượng: {quantity}</p>
                        <div className="flex justify-between mt-4">
                            <Link to={`/edit/product/${id}`} className="bg-gray-100 border border-blue-500 text-blue-600 underline rounded p-2 hover:bg-gray-300 transition duration-300">
                                Chỉnh sửa
                            </Link>
                            <button 
                            onClick={()=>handleDeleteProduct(id)}
                            className="bg-gray-100 border border-red-600 text-red-600 underline rounded p-2 hover:bg-red-300 transition duration-300">
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-5 bg-gray-100">
            <div className="flex items-center mb-4">
                <BackButton />
            </div>
            <div className="flex">
                <div className="w-1/4 p-4 border-r">
                    <img src={sellerInfo.avatar_url} alt="Avatar" className="w-32 h-32 rounded-full mx-auto" />
                    <h2 className="text-xl font-semibold mt-4">{sellerInfo.name}</h2>
                    <p className="mt-2">Số điện thoại: {sellerInfo.phone}</p>
                    <p className="mt-2">Địa chỉ: {sellerInfo.address}</p>
                    <p className="mt-2">Email: {sellerInfo.email}</p>
                    <button 
                        onClick={() => navigate(`/profile/${sellerId}`)}
                        className="bg-gray-100 mt-6 border border-blue-500 text-blue-600 underline rounded p-2 hover:bg-gray-300 transition duration-300"
                    >
                        Cập nhật thông tin cá nhân
                    </button>
                </div>
                <div className="w-3/4 p-4">
                    <div className="w-full h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden">
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
                                {Array.isArray(products) && products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        quantity={product.quantity}
                                        image_url={product.image_url}
                                        partner={product.partner}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSalePage;