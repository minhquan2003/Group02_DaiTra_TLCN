import express from 'express';
import {PORT, mongodbconn} from './config.js';
import userRoute from './routes/userRoute.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', userRoute);

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