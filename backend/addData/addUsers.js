import mongoose from 'mongoose';
import Users from '../models/Users.js';
import bcrypt from 'bcrypt';

const mongodbconn = process.env.MONGODB_URI || 'mongodb://localhost:27017/MuaBanDoCu';

const addUsers = async () => {
  try {
    // Kết nối đến MongoDB
    await mongoose.connect(mongodbconn, { useNewUrlParser: true, useUnifiedTopology: true });

    // Dữ liệu người dùng
    const usersData = [
      {
        // user_id: 'user001',
        email: 'user1@example.com',
        username: 'user1',
        password: 'password123', // Mật khẩu gốc
        name: 'User One',
        address: '123 Main St',
        phone: 1234567890,
        avatar_url: 'https://example.com/avatar1.png',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
        status: true,
      },
      {
        // user_id: 'user002',
        email: 'user2@example.com',
        username: 'user2',
        password: 'password456', // Mật khẩu gốc
        name: 'User Two',
        address: '456 Elm St',
        phone: 9876543210,
        avatar_url: 'https://example.com/avatar2.png',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
        status: true,
      },
    ];

    // Mã hóa mật khẩu cho từng người dùng
    for (const user of usersData) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Tạo và lưu tất cả người dùng vào cơ sở dữ liệu
    const createdUsers = await Users.create(usersData);

    console.log('Users added successfully:');
    // console.log(createdUsers);
  } catch (error) {
    console.error('Error adding users:', error);
  } finally {
    // Ngắt kết nối
    await mongoose.connection.close();
  }
};

// addUsers();

export default addUsers;