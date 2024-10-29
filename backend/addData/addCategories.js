import mongoose from 'mongoose';
import Categories from '../models/Categories.js'; // Đảm bảo đường dẫn đúng

const mongodbconn = process.env.MONGODB_URI || 'mongodb://localhost:27017/MuaBanDoCu';

const addCategories = async () => {
    try {
        // Kết nối đến MongoDB
        await mongoose.connect(mongodbconn, { useNewUrlParser: true, useUnifiedTopology: true });

        // Dữ liệu danh mục
        const categoriesData = [
            {
                // category_id: 'category001',
                category_name: 'Electronics',
                status: true,
            },
            {
                // category_id: 'category002',
                category_name: 'Furniture',
                status: true,
            },
        ];

        // Tạo và lưu tất cả danh mục vào cơ sở dữ liệu
        const createdCategories = await Categories.create(categoriesData);

        console.log('Categories added successfully:');
        // console.log(createdCategories);
    } catch (error) {
        console.error('Error adding categories:', error);
    } finally {
        // Ngắt kết nối
        await mongoose.connection.close();
    }
};

// addCategories();

export default addCategories;