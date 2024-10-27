import express from 'express';
import {PORT, mongodbconn} from './config.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);

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