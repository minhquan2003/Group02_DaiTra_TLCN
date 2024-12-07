import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByIdSeller } from '../../hooks/Products'; // Giả sử bạn đã có hook này
import BackButton from '../../commons/BackButton';
import ListProductCard from '../Home/ListProducts/ListProductCard';
import { useUserById } from '../../hooks/Users';

const SellerPage = () => {
    const { sellerId } = useParams();
    const { products, loading, error } = getProductsByIdSeller(sellerId);
    const sellerInfo = useUserById(sellerId);

    return (
        <div className="p-5">
            <div className="flex items-center mb-4">
                <BackButton />
            </div>
        <div className="flex">
            <div className="w-1/3 p-4 border-r">
                <img src={sellerInfo.avatar_url} alt="Avatar" className="w-32 h-32 rounded-full mx-auto" />
                <h2 className="text-xl font-semibold mt-4">{sellerInfo.name}</h2>
                <p className="mt-2">Số điện thoại: {sellerInfo.phone}</p>
                <p className="mt-2">Địa chỉ: {sellerInfo.address}</p>
                <p className="mt-2">Email: {sellerInfo.email}</p>
            </div>
                <div className="w-2/3 p-4">
                    <h2 className="text-2xl font-semibold mb-4">Sản phẩm của {sellerInfo.name}</h2>
                    <div className="w-full h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden">
                <ListProductCard data={{ products, loading, error }} />
            </div>
            </div>
        </div>
        </div>
    );
};

export default SellerPage;