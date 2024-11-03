import express from 'express';
import {PORT, mongodbconn} from './config.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import feedbackRoute from './routes/feedbackRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import regulationRoute from './routes/regulationRoute.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/feedbacks', feedbackRoute);
app.use('/notifications', notificationRoute);
app.use('/regulations', regulationRoute);

mongoose
    .connect(mongodbconn)
    .then(()=>{
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error)
    });