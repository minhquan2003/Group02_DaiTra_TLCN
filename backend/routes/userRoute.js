import express from 'express';
import {addUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/', addUser);
userRoute.get('/', getUsers);
userRoute.get('/:id', getUserById);
userRoute.put('/:id', updateUserById);
userRoute.delete('/:id', deleteUserById);

export default userRoute;