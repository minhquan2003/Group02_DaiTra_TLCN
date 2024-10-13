import express from 'express';
import {addUser} from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/', addUser);

export default userRoute;