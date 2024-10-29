import Users from '../models/Users.js';
import bcrypt from 'bcrypt';

const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
        ...userData,
        password: hashedPassword,
    };
    return await Users.create(newUser);
};

const findUserByEmail = async (email) => {
    return await Users.findOne({ email });
};

const findUserById = async (userId) => {
    return await Users.findById(userId);
};

const updateUser = async (userId, updateData) => {
    if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        updateData.password = hashedPassword;
    }
    return await Users.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUser = async (userId) => {
    return await Users.findByIdAndDelete(userId);
};

const getAllUsers = async () => {
    return await Users.find();
};

export {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
    getAllUsers,
};