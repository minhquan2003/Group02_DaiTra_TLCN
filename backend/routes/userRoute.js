import express from 'express';
import {addUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById
} from '../controllers/userController.js';
import authorize from '../middleware/authorize.js';

const userRoute = express.Router();

userRoute.post('/', addUser);
userRoute.post('/email', getUserByEmail);

userRoute.get('/', getUsers);
userRoute.get('/:id', getUserById);

userRoute.put('/:id', updateUserById);
userRoute.delete('/:id', authorize(['admin']), deleteUserById);

export default userRoute;