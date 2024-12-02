import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByIdSeller } from '../../hooks/Products'; // Giả sử bạn đã có hook này
import BackButton from '../../commons/BackButton';
import ListProductCard from '../Home/ListProducts/ListProductCard';

const SellerPage = () => {
    const { sellerId } = useParams();
    const { products, loading, error } = getProductsByIdSeller(sellerId); // Giả định categoryId là sellerId ở đây
    const sellerInfo = {
        _id: "672a65c715ecbf5e871dfbb7",
        email: "user1@example.com",
        username: "user111112",
        name: "Nguyễn Văn A",
        address: "123 Đường A, Quận 1, TP.HCM",
        phone: 1234567890,
        avatar_url: "https://th.bing.com/th/id/OIP.wEsBe2udHBieFeZVmus8qAHaHk?rs=1&pid=ImgDetMain",
    };

    return (
        <div className="p-5">
            <div className="flex items-center mb-4">
                <BackButton />
            </div>
        <div className="flex">
            
            {/* Phần thông tin người bán */}
            <div className="w-1/3 p-4 border-r">
                <img src={sellerInfo.avatar_url} alt="Avatar" className="w-32 h-32 rounded-full mx-auto" />
                <h2 className="text-xl font-semibold mt-4">{sellerInfo.name}</h2>
                <p className="mt-2">Số điện thoại: {sellerInfo.phone}</p>
                <p className="mt-2">Địa chỉ: {sellerInfo.address}</p>
                <p className="mt-2">Email: {sellerInfo.email}</p>
            </div>

            {/* Phần sản phẩm */}
                <div className="w-2/3 p-4">
                    <h2 className="text-2xl font-semibold mb-4">Sản phẩm của {sellerInfo.name}</h2>
                    <div className="w-full h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden">
                {/* <h1>Danh sách các sản phẩm của: {nameCategogy}</h1> */}
                <ListProductCard data={{ products, loading, error }} />
            </div>
            </div>
        </div>
        </div>
    );
};

export default SellerPage;