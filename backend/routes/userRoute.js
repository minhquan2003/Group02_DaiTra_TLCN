import express from 'express';
import {addUser} from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post('/', addUser);

export default userRoute;