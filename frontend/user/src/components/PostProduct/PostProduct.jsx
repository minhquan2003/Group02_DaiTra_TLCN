import React, { useState } from 'react';
import { addProduct } from '../../hooks/Products';
import { getCategories } from '../../hooks/Categories';

const ProductUpload = () => {
        const [image, setImage] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [condition, setCondition] = useState('new');
    const [origin, setOrigin] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { categories } = getCategories();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("Vui lòng chọn hình ảnh.");
            return;
        }

        if (!name || !description || !price || !quantity || !brand || !selectedCategory) {
            alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
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
            setImgUrl(uploadedImageUrl.secure_url);
            let partner= false;
            if(userInfo.role == 'partner'){
                partner: true
            }

            const productData = {
                name,
                description,
                price,
                quantity,
                user_id: userInfo._id,
                category_id: selectedCategory,
                image_url: uploadedImageUrl.secure_url,
                brand,
                condition,
                origin,
                partner,
            };
            await addProduct(productData);
            alert("Bạn đã đăng sản phẩm thành công.");

            // Reset các giá trị sau khi thêm sản phẩm
            setImage(null);
            setImgUrl('');
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setBrand('');
            setCondition('new');
            setOrigin('');
            setSelectedCategory('');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Đăng Sản Phẩm Mới</h2>
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/2 p-4 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Chọn Hình Ảnh</h3>
                    <input 
                        type="file" 
                        accept="image/*" 
                        id="image"
                        onChange={handleImageChange} 
                        className="mb-4 border border-gray-300 rounded p-2 w-full"
                    />
                    {image && (
                        <div>
                            <p className="text-sm text-gray-700">Đã chọn: {image.name}</p>
                            <img src={URL.createObjectURL(image)} alt="Product" className="mt-2 w-full h-auto rounded"/>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 p-4 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Thông Tin Sản Phẩm</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                placeholder="Tên sản phẩm" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <textarea 
                                placeholder="Mô tả sản phẩm" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                type="number" 
                                placeholder="Giá" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                type="number" 
                                placeholder="Số lượng" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                placeholder="Hãng" 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <select 
                                value={condition} 
                                onChange={(e) => setCondition(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
                                required
                            >
                                <option value="new">Mới</option>
                                <option value="used">Đã qua sử dụng</option>
                                <option value="refurbished">Tái chế</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                placeholder="Xuất xứ" 
                                value={origin} 
                                onChange={(e) => setOrigin(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)} 
                                className="border border-gray-300 p-2 w-full rounded"
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
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 w-full">
                            Đăng Sản Phẩm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductUpload;