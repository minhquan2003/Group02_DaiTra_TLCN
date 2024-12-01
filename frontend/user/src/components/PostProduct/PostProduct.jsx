import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {addProduct} from '../../hooks/Products'

const ProductUpload = () => {
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const [image, setImage] = useState(null);
    const [imgUrl, setimgUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5555/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("Vui lòng chọn hình ảnh.");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "images_preset");
        formData.append("cloud_name", "dd6pnq2is");

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dd6pnq2is/image/upload', {
                method: "POST",
                body: formData
            });
            const uploadedImageUrl = await response.json();
            setimgUrl(uploadedImageUrl.secure_url); // Lưu URL vào state

            const productData = {
                name,
                description,
                price,
                quantity,
                user_id: userInfo._id,
                category_id: selectedCategory,
                image_url: uploadedImageUrl.secure_url, // Sử dụng URL đã tải lên
            };
            addProduct(productData);
            alert("Bạn đã đăng sản phẩm thành công. Chờ xét duyệt! " + JSON.stringify(productData))
            setImage(null);
            setimgUrl('');
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setSelectedCategory('');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="flex p-4">
            <div className="w-1/2 p-4">
                <h2 className="text-xl font-bold mb-2">Chọn Hình Ảnh</h2>
                <input 
                    type="file" 
                    accept="image/*" 
                    id="image"
                    onChange={handleImageChange} 
                    className="mb-4"
                />
                {image && <p>Đã chọn: {image.name}</p>}
                {image && <img src={image} alt="Product" className="w-full h-auto mb-4" />}
            </div>
            <div className="w-1/2 p-4">
                <h2 className="text-xl font-bold mb-2">Thông Tin Sản Phẩm</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            placeholder="Tên sản phẩm" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea 
                            placeholder="Mô tả sản phẩm" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                    <input 
                        type="text" // Chuyển sang text để dễ dàng định dạng
                        placeholder="Giá" 
                        value={price} // Định dạng giá trị
                        onChange={(e) => setPrice(e.target.value)} // Loại bỏ dấu phẩy
                        className="border p-2 w-full"
                        required
                    />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="number" 
                            placeholder="Số lượng" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                            className="border text-red p-2 w-full"
                            required
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Đăng Sản Phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductUpload;